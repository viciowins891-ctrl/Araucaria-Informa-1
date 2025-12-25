/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./context/**/*.{js,ts,jsx,tsx}",
        "./hooks/**/*.{js,ts,jsx,tsx}",
        "./services/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                'slow-zoom': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                }
            },
            animation: {
                'slow-zoom': 'slow-zoom 15s ease-in-out infinite alternate',
            },
            colors: {
                primary: {
                    DEFAULT: "#0D6EFD", // Blue from news page header
                    dark: "#1d4ed8" // Blue from home page
                },
                "background-light": "#F9FAFB", // A very light gray
                "background-dark": "#111827", // A dark blue-gray
                "surface-light": "#FFFFFF",
                "surface-dark": "#1F2937",
                "text-light": "#111827",
                "text-dark": "#F3F4F6",
                "text-secondary-light": "#6B7280",
                "text-secondary-dark": "#9CA3AF",
            },
            fontFamily: {
                display: ["Inter", "sans-serif"],
                body: ["Roboto", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem", // 8px
            },
        },
    },
    plugins: [],
}
