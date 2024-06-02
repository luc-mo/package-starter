import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	tsconfig: './tsconfig.json',
	clean: true,
	minify: true,
	treeshake: true,
	dts: true,
	format: ['esm', 'cjs'],
})
