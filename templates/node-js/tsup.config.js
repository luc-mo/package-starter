import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.js'],
	tsconfig: './jsconfig.json',
	clean: true,
	minify: true,
	treeshake: true,
	format: ['esm', 'cjs'],
})
