import type { Context, Config } from '@netlify/edge-functions';

// Deploy Preview·Branch Deploy에만 Basic Auth를 건다. 프로덕션은 절대 건드리지 않는다.
// 자격증명은 Netlify 대시보드 환경변수(PREVIEW_AUTH_USER/PASS, Functions 스코프 필요)로 주입 —
// 저장소가 Public이라 코드에 직접 넣을 수 없다.
export default async (request: Request, context: Context) => {
	if (context.deploy?.context === 'production') {
		return context.next();
	}

	const user = Netlify.env.get('PREVIEW_AUTH_USER');
	const pass = Netlify.env.get('PREVIEW_AUTH_PASS');
	if (!user || !pass) {
		// 환경변수 미설정 시엔 보호를 강제하지 않고 통과(설정 전까지는 기존과 동일하게 동작).
		return context.next();
	}

	const expected = `Basic ${btoa(`${user}:${pass}`)}`;
	if (request.headers.get('authorization') === expected) {
		return context.next();
	}

	return new Response('인증이 필요합니다.', {
		status: 401,
		headers: { 'WWW-Authenticate': 'Basic realm="EasyMD Preview"' },
	});
};

export const config: Config = { path: '/*' };
