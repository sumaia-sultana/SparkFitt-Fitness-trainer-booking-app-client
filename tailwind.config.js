
  // @type {import('tailwindcss').config}
 export default  {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend:{
      container: {
        center: true,
        padding: "1.25 rem"
      },
      colors:{
        primary: ""
      }
    }
  },
   plugin: [],
};
