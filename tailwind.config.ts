import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        dark: '#111111',
        green_primary: '#52F2B9',
        green_full: 'rgba(81, 255, 161, 1)',
        green_translucent: 'rgba(81, 255, 161, 0.08)',
        white_primary: '#FFFFFF',
        white_secondary: 'rgba(255, 255, 255, 0.6)',
        link: '#52F2B9',
        titanium: 'rgba(255, 255, 255, 0.1)',
        translucent: 'rgba(255, 255, 255, 0.02)',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
  variants: {
    backdropBlur: ['responsive'],
  },
};
export default config;
