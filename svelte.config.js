import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for Electron builds
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			base: '',
			assets: '',
			relative: true
		},
		appDir: '_app',
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore favicon.png 404 error
				if (path === '/favicon.png') {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
