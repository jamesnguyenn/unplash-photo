module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#000",
        secondary: "#fff",
        danger: "#e3342f",
      },
      fontFamily: {
        body: ["Poppins"],
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        "spin-fast": "spin 0.4s linear infinite",
      },
    },
  },
  plugins: [],
};
