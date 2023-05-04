/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }

  //npx tailwindcss -i ./src/tw.css -o ./src/style.css --watch