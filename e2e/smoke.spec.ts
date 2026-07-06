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
