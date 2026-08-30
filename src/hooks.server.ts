import type { Handle } from '@sveltejs/kit';
import { HTML_LANG, localeFromPath } from '$lib/i18n';

// `<html lang>`을 경로에 맞춰 바꾼다. app.html에 %lang% 자리표시자를 두고 여기서 치환한다.
//
// 전체 prerender + adapter-static 조합이라 이 훅은 런타임이 아니라 빌드 시점에
// 각 경로마다 한 번씩 실행된다. 즉 결과물 HTML에 언어가 그대로 박혀 나간다.
//
// lang 속성은 화면 낭독기의 발음, 브라우저 번역 제안, 검색엔진의 언어 판별에
// 쓰인다. 영어 페이지를 ko로 두면 셋 다 틀린 판단을 하게 된다.
export const handle: Handle = async ({ event, resolve }) => {
	const lang = HTML_LANG[localeFromPath(event.url.pathname)];

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
