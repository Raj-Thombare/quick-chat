import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	  extend: {
		  colors: {
			  background: 'hsl(var(--background))',
			  foreground: 'hsl(var(--foreground))',
			  card: {
				  DEFAULT: 'hsl(var(--card))',
				  foreground: 'hsl(var(--card-foreground))'
			  },
			  popover: {
				  DEFAULT: 'hsl(var(--popover))',
				  foreground: 'hsl(var(--popover-foreground))'
			  },
			  primary: {
				  DEFAULT: 'hsl(var(--primary))',
				  foreground: 'hsl(var(--primary-foreground))'
			  },
			  secondary: {
				  DEFAULT: 'hsl(var(--secondary))',
				  foreground: 'hsl(var(--secondary-foreground))'
			  },
			  muted: {
				  DEFAULT: 'hsl(var(--muted))',
				  foreground: 'hsl(var(--muted-foreground))'
			  },
			  accent: {
				  DEFAULT: 'hsl(var(--accent))',
				  foreground: 'hsl(var(--accent-foreground))'
			  },
			  destructive: {
				  DEFAULT: 'hsl(var(--destructive))',
				  foreground: 'hsl(var(--destructive-foreground))'
			  },
			  border: 'hsl(var(--border))',
			  input: 'hsl(var(--input))',
			  ring: 'hsl(var(--ring))',
			  chart: {
				  '1': 'hsl(var(--chart-1))',
				  '2': 'hsl(var(--chart-2))',
				  '3': 'hsl(var(--chart-3))',
				  '4': 'hsl(var(--chart-4))',
				  '5': 'hsl(var(--chart-5))'
			  },
			  'color-1': 'hsl(var(--color-1))',
			  'color-2': 'hsl(var(--color-2))',
			  'color-3': 'hsl(var(--color-3))',
			  'color-4': 'hsl(var(--color-4))',
			  'color-5': 'hsl(var(--color-5))'
		  },
		  borderRadius: {
			  lg: 'var(--radius)',
			  md: 'calc(var(--radius) - 2px)',
			  sm: 'calc(var(--radius) - 4px)'
		  },
		  keyframes: {
			  marquee: {
				  from: {
					  transform: 'translateX(0)'
				  },
				  to: {
					  transform: 'translateX(calc(-100% - var(--gap)))'
				  }
			  },
			  'marquee-vertical': {
				  from: {
					  transform: 'translateY(0)'
				  },
				  to: {
					  transform: 'translateY(calc(-100% - var(--gap)))'
				  }
			  },
			  rainbow: {
				  '0%': {
					  'background-position': '0%'
				  },
				  '100%': {
					  'background-position': '200%'
				  }
			  }
		  },
		  animation: {
			  marquee: 'marquee var(--duration) infinite linear',
			  'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
			  rainbow: 'rainbow var(--speed, 2s) infinite linear'
			}
		}
	},
	plugins: [animatePlugin],
} satisfies Config;
