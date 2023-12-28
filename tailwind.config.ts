import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                '3xl': '1750px',
                '4xl': '2100px',
                '5xl': '2600px'
            }
        }
    },
    plugins: []
};
export default config;
