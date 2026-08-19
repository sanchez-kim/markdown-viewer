import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Use static adapter for SPA deployment on Netlify
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// 모든 라우트가 prerender되므로 fallback은 "존재하지 않는 URL" 전용이다.
			// 200.html로 두면 없는 주소도 HTTP 200 + 빈 셸을 반환해 소프트 404가 된다.
			// Netlify는 publish 루트의 404.html을 404 상태로 서빙하므로 이 이름이어야 한다.
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, message }) => {
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
