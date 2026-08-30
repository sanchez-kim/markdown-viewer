import { test, expect } from '@playwright/test';

// 이 스모크 테스트들은 이번까지 실제로 발생했던 회귀(에디터 편집 불가, 랜딩→에디터 단절 등)를
// 자동으로 잡기 위한 것이다. 빌드는 통과하지만 동작이 망가지는 류의 버그가 대상.

test('에디터에서 타이핑이 동작한다 (편집 불가 회귀 방지)', async ({ page }) => {
	await page.goto('/editor');
	await page.evaluate(() => localStorage.clear());
	await page.reload();

	const editor = page.locator('.tiptap-container .ProseMirror');
	await expect(editor).toBeVisible();
	await editor.click();
	await page.keyboard.type('스모크 테스트 입력');
	await expect(editor).toContainText('스모크 테스트 입력');
});

test('목록의 첫 항목에서 Tab을 눌러도 포커스가 에디터 밖으로 빠지지 않는다', async ({ page }) => {
	await page.goto('/editor');
	await page.evaluate(() => localStorage.clear());
	await page.reload();

	const editor = page.locator('.tiptap-container .ProseMirror');
	await expect(editor).toBeVisible();
	await editor.click();
	await page.keyboard.type('- 첫 항목');
	await page.keyboard.press('Tab');

	await expect(editor).toBeFocused();
});

test('랜딩에서 "지금 바로 써보기"로 에디터에 진입한다', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('.lp-hero')).toBeVisible();
	// 랜딩에는 에디터가 없어야 한다
	await expect(page.locator('.tiptap-container')).toHaveCount(0);

	await page.locator('a.lp-cta[href="/editor"]').first().click();
	await expect(page).toHaveURL(/\/editor$/);
	await expect(page.locator('.tiptap-container .ProseMirror')).toBeVisible();
});

test('블로그 목록과 카테고리 필터가 동작한다', async ({ page }) => {
	await page.goto('/blog');
	const cards = page.locator('.post-card');
	await expect(cards.first()).toBeVisible();
	expect(await cards.count()).toBeGreaterThan(15);

	// '빠른 팁' 카테고리로 필터
	await page.getByRole('button', { name: /빠른 팁/ }).click();
	await expect(page.locator('.post-card')).toHaveCount(8);
});

test('블로그 글이 정상 렌더된다', async ({ page }) => {
	await page.goto('/blog/markdown-linebreak');
	await expect(page.locator('.post-content')).toBeVisible();
	await expect(page.locator('.post-content')).toContainText('줄바꿈');
});

// 분석·광고 스크립트가 프로덕션 도메인 밖에서 로드되면 GA4에 우리 테스트가
// 실제 방문자로 잡힌다(실제로 그랬다). localhost에서는 한 건도 나가면 안 된다.
test('localhost에서는 분석·광고 스크립트를 로드하지 않는다', async ({ page }) => {
	const thirdParty: string[] = [];
	page.on('request', (r) => {
		const url = r.url();
		if (/googletagmanager|google-analytics|googlesyndication|cloudflareinsights/.test(url)) {
			thirdParty.push(url);
		}
	});
	await page.goto('/');
	await page.waitForLoadState('networkidle');
	expect(thirdParty).toEqual([]);
});

// JS를 실행하지 않은 원본 HTML을 본다 — 크롤러가 보는 것과 같은 상태.
// page.goto()는 하이드레이션 후를 보므로 이 회귀를 잡지 못한다.
// <script>를 걷어내는 것이 핵심: FAQ JSON-LD에도 답변 텍스트가 들어 있어서,
// 그냥 검사하면 본문에 답변이 없어도 통과해버린다.
const visibleHtml = (html: string) => html.replace(/<script[\s\S]*?<\/script>/g, '');

test('FAQ 답변이 JS 없이도 본문 HTML에 들어 있다', async ({ request }) => {
	const html = visibleHtml(await (await request.get('/faq')).text());
	expect(html).toContain('완전히 무료입니다');
	expect(html).toContain('localStorage');
});

test('블로그 글 본문이 JS 없이도 본문 HTML에 들어 있다', async ({ request }) => {
	const html = visibleHtml(await (await request.get('/blog/markdown-linebreak')).text());
	expect(html).toContain('줄바꿈');
});

test('없는 URL은 200이 아니라 404를 반환한다 (소프트 404 회귀 방지)', async ({ page }) => {
	const res = await page.goto('/this-page-does-not-exist');
	expect(res?.status()).toBe(404);
	await expect(page.locator('.error-page')).toBeVisible();
});

test('콘텐츠 페이지에 통일 브랜드 헤더와 로고가 있다', async ({ page }) => {
	await page.goto('/guide');
	const brand = page.locator('.site-header .site-brand');
	await expect(brand).toBeVisible();
	await expect(brand.locator('img')).toBeVisible();
	// 로고 클릭 시 홈으로
	await expect(brand).toHaveAttribute('href', '/');
});

test('탭으로 여러 문서를 전환할 수 있다', async ({ page }) => {
	await page.goto('/editor');
	await page.evaluate(() => localStorage.clear());
	await page.reload();

	const editor = page.locator('.tiptap-container .ProseMirror');
	await expect(editor).toBeVisible();

	// 문서 1개일 땐 닫기 버튼이 없어야 한다(마지막 탭은 닫을 수 없음)
	await expect(page.locator('.tab-bar .tab')).toHaveCount(1);
	await expect(page.locator('.tab-bar .tab-close')).toHaveCount(0);

	await editor.click();
	await page.keyboard.type('문서 A');
	await page.waitForTimeout(1500); // 자동저장 디바운스 대기

	// 새 탭 생성
	await page.locator('.new-tab-btn').click();
	await expect(page.locator('.tab-bar .tab')).toHaveCount(2);
	await editor.click();
	await page.keyboard.type('문서 B');
	await page.waitForTimeout(1500);

	// 첫 번째 탭으로 전환하면 문서 A 내용이 복원되어야 한다
	await page.locator('.tab-bar .tab').first().click();
	await expect(editor).toContainText('문서 A');

	// 활성 탭을 닫으면 남은 탭(문서 B)으로 전환된다
	await page.locator('.tab-bar .tab.active .tab-close').click();
	await expect(page.locator('.tab-bar .tab')).toHaveCount(1);
	await expect(editor).toContainText('문서 B');
});

test('공유 링크로 열면 에디터가 초기화되고 내용이 복원된다', async ({ page }) => {
	// 공유 링크 분기가 onMount에서 early return 하는 바람에 initTiptap()에 도달하지 못해,
	// 공유 링크를 열면 빈 화면만 나오던 회귀가 있었다. 조용히 깨지는 종류라 스모크로 감시한다.
	// lz-string으로 압축한 "# Shared\n\nhello" 의 인코딩 결과.
	const hash = 'MQAgygFghgTgpgEwFBInANug9kA';

	await page.goto(`/editor#share=${hash}`);
	const editor = page.locator('.tiptap-container .ProseMirror');
	await expect(editor).toBeVisible();
	await expect(editor).toContainText('Shared');

	// 영어판도 같은 경로를 쓴다
	await page.goto(`/en/editor#share=${hash}`);
	await expect(page.locator('.tiptap-container .ProseMirror')).toContainText('Shared');
});

test('영어판이 lang=en 으로 렌더되고 hreflang이 양방향으로 연결된다', async ({ page }) => {
	await page.goto('/en');
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');

	// 한국어 페이지는 lang=ko 를 유지한다
	await page.goto('/faq');
	await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
	const koAlt = page.locator('link[rel="alternate"][hreflang="en"]');
	await expect(koAlt).toHaveAttribute('href', /\/en\/faq$/);

	// 영어판이 한국어판을 되가리켜야 짝으로 인식된다
	await page.goto('/en/faq');
	const enAlt = page.locator('link[rel="alternate"][hreflang="ko"]');
	await expect(enAlt).toHaveAttribute('href', /easy-md\.com\/faq$/);
});
