import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	build: {
		copyPublicDir: false,
		lib: {
			entry: 'src/lib/index.ts',
			fileName: 'index',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['react'],
			output: {
				globals: {
					react: 'React',
				},
				dir: 'dist',
			},
		},
	},
	plugins: [react(), libInjectCss()],
})
