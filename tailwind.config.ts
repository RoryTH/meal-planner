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
                xs: '370px', // custom breakpoint for 350px
                'between-lg-xl': { min: '1024px', max: '1040px' }, // custom range used for recipe card resizing
                '3xl': '1750px',
                '4xl': '2100px',
                '5xl': '2600px'
            }
        }
    },
    plugins: []
};
export default config;
