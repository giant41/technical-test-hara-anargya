/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      brightness: {},
      colors:{
        'layout':'#F7F8FA',
        'btn-active':'#E3F2FD',
        'status-card':'#727272',
        'icon-card':'#F2F4F7',
        'positive':'#4CBF93',
        'negative':'#EE7C85',
        'content-table':'#686868',
        'black':{
          50:'#9A9A9A',
          100:'#152544',
          200:'#424242',
          300:'#080808'
        }
      },
      boxShadow: {
        'sm': '0px 0px 4px 0px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
};