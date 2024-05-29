import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/lib/index.ts'],
	dts: true,
	minify: true,
	sourcemap: true,
	treeshake: true,
	external: ['react'],
	format: ['esm'],
	tsconfig: './tsconfig.build.json',
})
