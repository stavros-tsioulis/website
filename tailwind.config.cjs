/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				"primary-translucent": 'var(--primary-translucent)',
				secondary: 'var(--secondary)',
				background: 'var(--background)',
				accent: 'var(--accent)',
			}
		},
	},
	plugins: [],
}
