const colors = require('tailwindcss/colors');
module.exports = {
    content:
        [
            './Components/**/*.razor',
        ],
    theme: {
        extend: {

            colors: {

                primary: colors.sky

            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}


