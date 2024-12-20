/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/ui/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                thirdary: "var(--thirdary)",
                success: "var(--success)",
                warn: "var(--warn)",
                danger: "var(--danger)",
                "text-secondary": "var(--text-secondary)",
                "stroke-primary": "var(--stroke-primary)",
            },
            textColor: {
                success: "var(--success)",
                warn: "var(--warn)",
                danger: "var(--danger)",
                primary: "var(--text-primary)",
                secondary: "var(--text-secondary)",
            },
            borderColor: {
                success: "var(--success)",
                warn: "var(--warn)",
                danger: "var(--danger)",
            },
        },
    },
    plugins: [],
};
