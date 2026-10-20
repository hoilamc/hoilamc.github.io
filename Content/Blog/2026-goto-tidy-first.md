---
title: Tidy First? Notes from Kent Beck's workshop
lead: Shipping under money pressure while keeping the future open — my learning notes from Kent Beck's "Tidy First" workshop at GOTO 2026.
published: 2026-10-20
tags: [tidy-first, kent-beck, goto-2026, software-design, refactoring, testing, agile, ai]
authors:
    - name: "Lily Chan"
      gitHubUserName: "hoilamc"
---

You're under money pressure, and you still have to keep the future open. That's the theme I took away from Kent Beck's "Tidy First" workshop at GOTO 2026: design is an economic decision about *timing*, not about cleanliness.

The notes below follow five questions:

1. [The tension: deliver now, or invest for later?](#1-the-tension-deliver-now-or-invest-for-later)
2. [Where does the cost actually hide?](#2-where-does-the-cost-actually-hide)
3. [How do we invest cheaply, in tiny steps?](#3-how-do-we-invest-cheaply-in-tiny-steps)
4. [How do we know what's worth doing?](#4-how-do-we-know-whats-worth-doing)
5. [What does AI change?](#5-what-does-ai-change)

🤖 marks the places where I tried to connect things to AI. They're collected in section 5.

## 1. The tension: deliver now, or invest for later?

*Scope: why we can't just "do the right thing" first, and why we can't just ship features forever either.*

### Features vs. futures

How to match software design with an economic sense? How many things can one economically do next?

![Hand-drawn graph with Features on the x-axis and Futures on the y-axis. A blue curve falls steadily as features are delivered; a black zigzag stays high by alternating feature work with work that restores futures.](media/futures-vs-features.jpg)

Source: <https://newsletter.kentbeck.com/p/mathematicians-heres-a-way-to-think>

Visible vs invisible, how we need invisible work in small chunks. We also need to let people keep investing into our team after all.

### Survival: balancing strategically

> I honestly don’t remember well — was probably sleepy after lunch :(

The software should survive, meaning we encourage sponsors to invest more “money” into the project. And we do that by delivering features. It increases our Net Present Value (NPV). The other half of survival is *optionality*: keeping our future choices open.

![Survival splits into two branches: Net Present Value (Feature) and Optionality (Future).](media/survival-npv-optionality.png)

So less design, more features at the start.

But be careful not to over-investing into a project too early on!

**If we want to earn more, we have to pay less.**
(e.g.: Delivering more features without minding too much on reusability, duplication, etc. That’s when small habits count! But don’t be afraid to fail and make mistakes.)

**We can earn earlier, then pay later.**
(e.g.: After getting investment from our sponsors and proving that our features have value, we then have the optionality and can clean up the code)

Like we could use a ContextProvider right from the start (see the cohesion example in section 2), then we avoid maintaining messy code later as our codebase grow, meaning we have more optionality, more freedom to do other things. But there could also a risk that it’s expensive to maintain without much usage.

## 2. Where does the cost actually hide?

*Scope: what makes a change expensive, and the two lenses for spotting it: coupling and cohesion.*

### Coupling

= Propagation of Change
I.e. Dependency when a change occurs.

“When I change this, what other things need to be changed too?”

⚠ The “Change” event is required to trigger the propagation.

💰 Because it only cost you when you make the change.

Larger size of change === larger cost of change === coupling seriousness.

![Tree of nodes joined by arrows, labelled "Arrows: Coupling". Changing the orange node propagates along yellow arrows to the three nodes that depend on it; the black nodes are unaffected.](media/coupling-arrows.png)

In Math formula, it will be COUPLE(E1, E2, Delta)

💡 Is our test too coupled right now? Or can we investigate with Graphify?

### Conditions are power-law distributed

This concept exists in code: 貧者越貧，富者越富。A condition on the far right are like the top of a tree — many conditions go through there first. Whilst those on the top are like special cases. One needs to pass through many conditions in order to reach there. BUT that doesn’t mean they’re not important!

![Log-log scatter plot titled "Conditions by Appearance": a few conditions appear many times, while the vast majority appear only once, following a power-law distribution.](media/conditions-by-appearance.jpg)

Source: <https://medium.com/@kentbeck_7670/conditions-are-power-law-distributed-an-example-61fa4e0d3500>

Or, with the coffee analogy from the workshop:

![The same "Conditions by Appearance" plot annotated with coffee orders: "pumpkin spice maple syrup macchiato with oat milk" is a one-off at the top left, while "espresso" is the single most frequent condition at the far right.](media/conditions-by-appearance-espresso.png)

Key takeaways:

- Consolidation candidates / reduce duplication (Where’s our “espresso”? Air pressure, how many grams…)
- Test prioritization: “Which logic, if broken, breaks the most places” it’s like if the espresso is not good, then the latte won’t be good too :( (opinionated)
- 🤖 What’s the espresso for AI? What’s a micro-structure that AI adopt when writing code? E.g.: comments and tests it generates — are they duplicates?

### Cohesiveness

So the previous one (coupling) is about consolidating separate functions into one. This one is about putting things of the same / similar context into the same place — the same plugin, folder, or even file.

Why? Because when we need to change, there’s less risk that we forget to change other related things.

ContextProvider lol

![Two dependency trees for updating a field value. Left: changing the field in the side panel propagates through the side panel and overview tab down to Card A's updated value. Right: both the change and the update go through a shared ContextProvider instead.](media/cohesion-context-provider.png)

### Beneficial Relationships (BRE)

BRE = Beneficial Related Elements, from his *Tidy First* book.

<!-- TODO: expand — what is a "beneficial" relationship vs. a harmful one? -->

### Why are design patterns used?

<!-- TODO: expand — my take: patterns as packaged ways to manage coupling and cohesion? -->

## 3. How do we invest cheaply, in tiny steps?

*Scope: the habits and techniques that make "pay later" and "pay a little now" affordable and safe.*

### Little tricks down the sleeves

They are small habits like how chefs wipe their knives after every cut. As professional software engineers, we need to have different little tricks ready down our sleeves. We don’t need to use them all the time, but we need to have them ready when needed.

It helps us balance between “Feature: Delivering” and “Future: Addressing Technical Debt”.

Archi-tasks should be small habits. Small jumps, so we don’t need to justify them — then no one would notice.

### Parallel: migrate without a big bang

It's a technique for migration. If we want to migrate from A to B, we create an "AB" form so that both can coexist at the same time. Then we can gradually update, without a big bang.

### Trade duplication for always-on + safety

<!-- TODO: expand — what exactly is the trade? (duplication in exchange for the old path staying live and safe?) -->

### Tests: cover behavior, not 100%

- Tests should cover *behavioral* changes (BDD?).
- Test coverage doesn't need to be 100%.
- 💡 A thought while listening: maybe we should write it into our spec / instructions / existing code that tests should only test behaviors, and follow the *desiderata*. (Kent Beck's "Test Desiderata" is a list of properties good tests should have, including "behavioral" and "structure-insensitive".)

<!-- TODO: verify the Test Desiderata wording against Kent's post before publishing -->

## 4. How do we know what's worth doing?

*Scope: deciding when to act, and when to wait for feedback.*

### The art of waiting

It’s not realistic to make things right the first time. Things are always changing anyways. Just get frequent feedback, a strong feedback loop. Small incrementals, fail fast, learn fast.

💡 How do we judge if we really need to do something (e.g.: a feature, a refactor)?
A: Experience lol

1. Play and experiment with the idea
2. Identify pattern, or have a feeling that there’s just gonna be more, then pull out a little trick from down the sleeve (future)

Just make sure it’s reversible if someone is using it already.

### Grow software, don't assemble it

"Empirical design": respect constraints. So just work on top of our current code. We can go fast if we understand our constraints.

### Extreme Programming

<!-- TODO: expand — what did Kent say about XP at the workshop? -->

If you're just guessing and asking no users, that's not agile, even though you're doing daily standups!

## 5. What does AI change?

*Scope: how AI sharpens the tension from section 1, and what to do about it.*

AI tends to deliver visible Features (<https://newsletter.kentbeck.com/i/216656928/genies-hate-the-invisible>), but without tidy code and expandable architecture, we’re only reducing the amount of future we could deliver — Technical Debt will increase. ⚠

🤖 **We're not learning anymore.** With AI, we’re not learning about our code and the art of software engineering anymore, so our need isn’t met! (^ Kent’s opinion)

![Flow from Problem to Struggle to (Aha!) Insight to Solve. The insight step is marked "went missing :(", and a blue arrow shows AI bringing us from Problem straight to Solve.](media/problem-struggle-insight-solve.png)

🤖 **Use AI for optionality, not just output.** So maybe use AI for experimenting alternatives and learning (optionality), not shipping more code.

🤖 **Document by intent, not implementation.** Maybe this can give us insight on how to use AI more effectively today.

<!-- TODO: expand — what does "documenting by intent" look like in our specs / prompts? -->

🤖 **Tell AI what good tests look like.** Put the "test behaviors, not structure" rule from section 3 into our specs and instructions.

🤖 **Find the espresso.** What’s the espresso for AI-written code? (See section 2.)

## Books

- Structured Design: <https://vtda.org/books/Computing/Programming/StructuredDesign_EdwardYourdonLarryConstantine.pdf>
- Tidy First: <https://www.oreilly.com/library/view/tidy-first/9781098151232/>
