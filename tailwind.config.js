/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "var(--primary-700)",
            h1: {
              color: "var(--primary-800)",
            },
            h2: {
              color: "var(--primary-800)",
            },
            h3: {
              color: "var(--primary-800)",
            },
            strong: {
              color: "var(--primary-800)",
            },
            a: {
              color: "var(--secondary-500)",
              "&:hover": {
                color: "var(--secondary-600)",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
