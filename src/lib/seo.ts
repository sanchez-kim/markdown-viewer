// 경로별 SEO/내비게이션 메타를 한 곳에서 관리한다.
// 새 정적 페이지를 추가하면 여기에 한 줄만 더하면 BreadcrumbList와 공용 푸터에 자동 반영된다.
import { SITE_URL } from './config';

export interface PageMeta {
	/** BreadcrumbList의 마지막 항목 이름 */
	name: string;
	/** 공용 푸터에 노출할지 (정책 페이지는 별도 그룹) */
	footer?: 'main' | 'legal';
}

export const PAGE_META: Record<string, PageMeta> = {
	'/editor': { name: '에디터' },
	'/blog': { name: '블로그', footer: 'main' },
	'/guide': { name: '마크다운 문법 가이드', footer: 'main' },
	'/templates': { name: '템플릿 모음', footer: 'main' },
	'/use-cases': { name: '활용 사례', footer: 'main' },
	'/compare': { name: '에디터 비교', footer: 'main' },
	'/shortcuts': { name: '단축키', footer: 'main' },
	'/about': { name: '소개', footer: 'main' },
	'/faq': { name: '자주 묻는 질문', footer: 'main' },
	'/changelog': { name: '업데이트 내역', footer: 'main' },
	'/privacy': { name: '개인정보처리방침', footer: 'legal' },
	'/terms': { name: '이용약관', footer: 'legal' }
};

export const footerLinks = (group: 'main' | 'legal') =>
	Object.entries(PAGE_META)
		.filter(([, m]) => m.footer === group)
		.map(([path, m]) => ({ path, name: m.name }));

/**
 * 정적 페이지용 BreadcrumbList JSON-LD 문자열. 해당 없으면 null.
 * 블로그 글(/blog/*)은 글 제목이 필요해서 각 페이지가 직접 만든다 — 여기서 만들면 중복된다.
 */
export function breadcrumbLd(pathname: string): string | null {
	const meta = PAGE_META[pathname];
	if (!meta) return null;

	return JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: meta.name }
		]
	});
}
