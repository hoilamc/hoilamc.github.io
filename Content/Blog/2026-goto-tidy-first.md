---
title: Tidy First? Workshop Notes
lead: Shipping under money pressure while keeping the future open — my learning notes from Kent Beck’s "Tidy First" workshop at GOTO 2026.
published: 2026-10-21
tags: [tidy-first, kent-beck, goto-2026, software-design, refactoring, testing, agile, ai]
authors:
    - name: "Lily Chan"
      gitHubUserName: "hoilamc"
---

## The money tension

We’re always under money pressure: features pay the bills, and sponsors keep investing only if we keep delivering. But the invisible work (tidying, restructuring, keeping the code easy to change) is what keeps us able to experiment and deliver *next* quarter too.

So the question I took away from Kent Beck’s "Tidy First" workshop at GOTO 2026 is: **when do we deliver, and when do we do the invisible work?** Being a professional in this area means having the habits and experience to balance both. We should take pride in that.

The notes below go in this order:

1. [What are we balancing?](#what-are-we-balancing): features vs. futures, and what it takes for software to survive
2. [How do we strike the balance?](#how-do-we-strike-the-balance): small habits, and when to wait
3. [Where does the cost hide?](#where-does-the-cost-hide): coupling and cohesion, to spot what’s worth tidying
4. A few shorter topics from the afternoon vote: BRE, design patterns, parallel migration, tests, growing software and XP

🤖 marks the places where I tried to connect things to AI. They’re spread through the post, next to the ideas they relate to.

## What are we balancing?

As geeks, it’s easy for us to over-engineer, and that burns through the patience our stakeholders have before they stop investing. But if we ignore good software practices and architectural design, our code will eventually get so smelly that we can no longer add new features.

This is where Kent introduces the concept of "F v F" (Features vs. Futures).

### Features vs. futures

In the chart below, the x-axis is the features we’ve delivered, and the y-axis is the futures (options) we still have.

![Hand-drawn graph with Features on the x-axis and Futures on the y-axis. A blue curve falls steadily as features are delivered; a black zigzag stays high by alternating feature work with work that restores futures.](media/futures-vs-features.jpg)

Source: <https://newsletter.kentbeck.com/p/mathematicians-heres-a-way-to-think>

The blue line shows what happens when we focus solely on delivering features: every feature moves us right, but eats into our future options, until there’s nothing left.

The black line is a more sustainable approach. We balance feature delivery with small spikes of "Future" tasks, such as tidying code and improving the architecture, which forms a sawtooth shape. These tasks are often invisible: they move us up, not right. But those small spikes keep the future of our product open.

Of course, the opposite is also a trap. If we spend all our time doing things right, we keep moving up but never right, and people will stop investing in our team.

🤖 AI tends to deliver visible Features (<https://newsletter.kentbeck.com/i/216656928/genies-hate-the-invisible>), but without tidy code and expandable architecture, we’re only reducing the amount of future we could deliver — Technical Debt will increase.

So we always have to ask ourselves:

> *How do we match software design with an economic sense? How many things can one economically do next?*

The feature we deliver increases our Net Present Value (NPV).
The future we strive for provides *optionality*: keeping our future choices open.

![Survival splits into two branches: Net Present Value (Feature) and Optionality (Future).](media/survival-npv-optionality.png)

## How do we strike the balance?

### Little tricks up our sleeves

They are small habits like how chefs wipe their knives after every cut. As professional software engineers, we need to have different little tricks ready up our sleeves. We don’t need to use them all the time, but we need to have them ready when needed.
It helps us balance between “Feature: Delivering” and “Future: Addressing Technical Debt”.

Design tasks like refactoring and restructuring should be small habits: small jumps that we don’t need to justify, so they don’t need a negotiation each time.

### Earn first, pay later

Survival needs both NPV and optionality, so:

**When we want to earn more, we invest less in design.**
🤖 That’s kinda like what AI does. When we deliver more features, we might prioritize speed over reusability, duplication, etc. That’s when our little tricks count, so that we sustain as much optionality as possible. But at this point, don’t be afraid to fail and make mistakes.

**We can earn earlier, then pay later.**
After getting investment from our sponsors and proving that our features have value, we then have the optionality and can clean up the code.

So less design, more features at the start. Be careful — don’t over-invest in a project too early on!

For example, we could use one of our little tricks early on: a ContextProvider (React’s way of sharing state across components) right from the start (see the cohesion example further below). That saves us from maintaining messy code as our codebase grows, which gives us more freedom to do other things. But there’s no silver bullet. Depending on the codebase, it could be a small trick or a big commitment, and it’s costly to maintain if it sees little use. Knowing when to use it is where an engineer’s professionalism is tested.

### The art of waiting

It’s not realistic to make things right the first time, and things are always changing anyway.

So how do we judge if we really need to do something (e.g.: a feature, a refactor)?
Short answer: Experience lol

But nah, there’re actually some clues:

1. Play and experiment with the idea
2. Spot a pattern, or foresee one coming (a feeling that there’s just gonna be more). Then pull out a little trick from our sleeves.

And if someone is already using it, make sure the change is reversible, so we keep our options open.

If we focus too much on doing things the right way from the start, we risk building a system for every case before we even know if anyone will use it. Until then, get frequent feedback early on and build a strong feedback loop. Small increments, fail fast, learn fast.

🤖 On experience: for some people, it might seem like **we’re not learning anymore.** With AI, we can skip the struggle of learning about our code and the art of software engineering, so our need to learn might not be met.

![Flow from Problem to Struggle to (Aha!) Insight to Solve. The insight step is marked "went missing :(", and a blue arrow shows AI bringing us from Problem straight to Solve.](media/problem-struggle-insight-solve.png)

Maybe use AI for experimenting with alternatives and learning (optionality), not shipping more code.

## Where does the cost hide?

Tidy in tiny steps, and wait until feedback tells us it’s worth it. But tidy **what**? We can’t polish every line. Kent gives us two lenses for spotting what’s *expensive* to change: coupling and cohesion.

### Coupling

Coupling is the *propagation of change*, i.e. the dependencies that show up when a change occurs.

“When I change this, what other things need to be changed too?”

In the diagram below, changing the orange node forces changes in the yellow ones. The black nodes aren’t affected by this particular change, so they cost us nothing here.

![Tree of nodes joined by arrows, labelled "Arrows: Coupling". Changing the orange node propagates along yellow arrows to the three nodes that depend on it; the black nodes are unaffected.](media/coupling-arrows.png)

A couple of things to note:

- ⚠ Coupling needs a **change** to trigger the propagation. Two pieces of code can be tangled together, but if we never touch them, nothing propagates.
- 💰 That’s why it only costs us when we make the change. The more serious the coupling, the larger the change it forces, and the larger the cost.

As a formula:

`COUPLE(E1, E2, Δ)`

E1 and E2 are two elements, and Δ is a change. They are coupled with respect to Δ if changing E1 by Δ forces us to change E2.

#### Find your espresso: where to spend effort first

This is my personal summary after digesting what Kent shared on this topic: "espresso" is the kind of element that decides the quality of the drink built on top of it. Just like how we have some conditions in our code that need extra attention to ensure the overall quality and maintainability.

Think of a café menu as code. Each drink’s recipe is full of little `if`s: *if it has coffee, pull an espresso shot*, *if it’s pumpkin spice, add the syrup*. The drinks are the places in our code, and each of these yes/no questions is a condition. Whatever you order, the barista almost always asks "does it need espresso?" first, so espresso sits at the top of the tree and most drinks depend on it:

![Dependency tree with espresso at the top, pointing to americano, cortado, latte and cappuccino. Latte in turn points to dirty chai and pumpkin spice latte.](media/espresso-dependency-tree.png)

This is coupling again. If we change the espresso (say, new beans), every drink that uses it changes too. That’s the propagation of change, so the espresso is where a change (or a mistake) costs us the most. The "is it pumpkin spice?" check is the opposite: only one drink has it, so changing it affects just that drink.

So coupling isn’t spread evenly across a codebase, and we don’t need to treat every line equally. A few elements carry most of the weight.

#### The power law behind it

In code, Kent observed that conditions (`if ...`) are power-law distributed: one condition is used more than any other (like the espresso), a couple are used about half as much, and so on, until there’s a long tail of conditions used only once.

On the chart below:

- **x-axis (Appearances):** how many times a condition shows up in the code.
- **y-axis (Count):** how many *different* conditions show up that many times.

So each dot is a group of conditions with the same number of appearances. Top left is a huge crowd of special cases used once; far right is a single condition used over and over.

![Log-log scatter plot titled "Conditions by Appearance": a few conditions appear many times, while the vast majority appear only once, following a power-law distribution.](media/conditions-by-appearance.jpg)

Source: <https://medium.com/@kentbeck_7670/conditions-are-power-law-distributed-an-example-61fa4e0d3500>

Now map the menu back to the chart. Each check is a condition, and each drink that has it is one appearance:

- **"Needs espresso?":** there’s only one espresso check (or a few, in a specialty café), so y (count) is 1. But it appears in drink after drink, so x (appearances) is huge. It’s the lone dot on the far right.
- **Flavor checks ("needs pumpkin spice?", "needs caramel syrup?"...):** each appears in just one drink, so x is 1. A menu is full of checks like these, so lots of different conditions land on x = 1, and that’s why the dot is way up at the top left.

![The same "Conditions by Appearance" plot annotated with café checks: "flavor checks" such as "needs pumpkin spice?" or "needs caramel syrup?" sit at the top left, each appearing in only one drink but with loads of them, while "needs espresso?" is the lone dot at the far right, appearing in nearly every drink.](media/conditions-by-appearance-espresso.png)

#### What we can do with this

- **Test the espresso harder.** Ask: "Which logic, if broken, breaks the most places?" If the espresso is not good, the latte won’t be good either :( The conditions at the bottom right of the chart are the candidates for the heaviest testing. (opinionated)
- **Consolidate the espresso.** The popular conditions are where duplication hurts most, so they’re the best candidates to pull into one place. Where’s our “espresso”?
- **Don’t ignore the one-offs.** They’re cheap to change, but that doesn’t mean they’re not important. When it’s in season, the pumpkin spice latte is a highlight of the menu and deserves attention too.
- 🤖 **Teach AI how to spot them.** What’s a micro-structure that helps AI recognize repeated patterns when writing tests and generating comments?

### Cohesiveness

Coupling tells us *what changes together*. Cohesiveness is about keeping those things close: we put things of the same or similar context in the same place — the same plugin, folder, or even file.

Why? Because when we need to change, there’s less risk that we forget to change other related things.

Here’s the ContextProvider example from earlier:

![Two dependency trees for updating a field value. Left: changing the field in the side panel propagates through the side panel and overview tab down to Card A’s updated value. Right: both the change and the update go through a shared ContextProvider instead.](media/cohesion-context-provider.png)

On the left, when we change a field value in the side panel, the change has to travel up through the overview tab and back down to Card A to update the value it shows. Every hop in between is a place where we could forget something. On the right, both the change and the update go through a shared ContextProvider, so the related logic lives in one place.

Maintaining cohesiveness is an example of the little spikes from the “Features vs. futures” section — it’s the kind of little habit that we can use to keep our codebase tidy and manageable over time.

<!-- TODO: add a real example from my own work? -->

### 💡 Opportunity for a workshop

Is our test too coupled right now? Can we investigate with [Graphify](https://github.com/Graphify-Labs/graphify)?

Let's try to look at **cyclomatic complexity**: roughly 1 + the number of decision points (`if`, loops, `&&`, `case`...) in a function, i.e. how many independent paths run through it. It’s a cheap way to build a shortlist of places to look at:

- A high score means lots of branches in one place, which often means one function doing several unrelated jobs (low cohesion, which we’ll get to below).
- It only looks inside one function, so it can’t see what else has to change when we change it. That’s still the coupling question we have to ask for each candidate: "when I change this, what else needs to change too?"
- It’s a pointer, not a target. Pushing the number down without making the code easier to change just moves the branches around.

<!-- TODO: add anything else Kent said about how to use it in the exercise -->
<!-- TODO: add tools I actually use (e.g. radon, lizard, ESLint’s complexity rule, IDE metrics) -->

Cyclomatic complexity is not the same as Big O: it measures how hard code is to understand and test, not how fast it runs.

## Quick notes

Here are some other topics touched during the workshop. But to be fair it was after lunch, so my energy dropped a lot :(

- **Beneficial Related Elements (BRE):** from Kent’s *Tidy First* book.
<!-- TODO: expand — what is a "beneficial" relationship vs. a harmful one? -->
- **Why design patterns exist:** A design pattern is a reusable answer to a problem that keeps showing up under the same set of external forces: the same situation, limitations, and resources. The concept originated in architecture. For example, doors are usually rectangular because people facing the same situation, limitations, and resources keep arriving at the same answer.
- **Parallel: migrate without a big bang:** To migrate from A to B, we create an "AB" form so that both can coexist at the same time, then gradually update without a big bang. In a sentence, we are trading duplication for always-on + safety.
- **Tests: cover behavior, not 100%:** Maybe this is more about the concept of Behavior-Driven Development (BDD). Kent mentioned that tests should cover *behavioral* changes. The coverage doesn’t need to be 100%.
  - 🤖 A thought while listening: maybe we should write it into our spec / instructions / existing code that tests should only test behaviors, and follow the [*desiderata*](https://testdesiderata.com/).
- **Document by intent, not implementation:** Tests and documentation should describe what the code is for, not how it does it. 🤖 Maybe we could add this to our AI’s instruction files. It could also help reduce code size.
- **Grow software, don’t assemble it:** "Empirical design": respect constraints. Work on top of our current code. We can go fast if we understand our constraints.
- **Extreme Programming:** If you’re just guessing and asking no users, that’s not agile, even though you’re doing daily standups!
<!-- TODO: expand — what did Kent say about XP at the workshop? -->

## Books

- Structured Design, by Edward Yourdon and Larry Constantine
- Tidy First: <https://www.oreilly.com/library/view/tidy-first/9781098151232/>
