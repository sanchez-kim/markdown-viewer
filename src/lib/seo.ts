// 경로별 SEO/내비게이션 메타를 한 곳에서 관리한다.
// 새 정적 페이지를 추가하면 여기에 한 줄만 더하면 BreadcrumbList와 공용 푸터에 자동 반영된다.
import { SITE_URL } from './config';
import { availableIn, dict, localizePath, stripLocale, type Locale } from './i18n';
import type { Dict } from './i18n/ko';

export interface PageMeta {
	/** i18n 사전의 pages 키. BreadcrumbList 마지막 항목과 푸터 링크 이름이 된다. */
	nameKey: keyof Dict['pages'];
	/** 공용 푸터에 노출할지 (정책 페이지는 별도 그룹) */
	footer?: 'main' | 'legal';
	/** 한국어판만 있는 페이지. 영어 푸터에서는 빼고 hreflang도 걸지 않는다. */
	koOnly?: true;
}

/** 키는 로케일 접두사를 뗀 정규 경로다. */
export const PAGE_META: Record<string, PageMeta> = {
	'/editor': { nameKey: 'editor' },
	'/blog': { nameKey: 'blog', footer: 'main', koOnly: true },
	'/guide': { nameKey: 'guide', footer: 'main' },
	'/templates': { nameKey: 'templates', footer: 'main' },
	'/use-cases': { nameKey: 'useCases', footer: 'main' },
	'/compare': { nameKey: 'compare', footer: 'main' },
	'/shortcuts': { nameKey: 'shortcuts', footer: 'main' },
	'/about': { nameKey: 'about', footer: 'main' },
	'/faq': { nameKey: 'faq', footer: 'main' },
	'/changelog': { nameKey: 'changelog', footer: 'main' },
	'/privacy': { nameKey: 'privacy', footer: 'legal' },
	'/terms': { nameKey: 'terms', footer: 'legal' }
};

/**
 * 공용 푸터 링크. 링크 주소는 해당 로케일 경로로 바뀐다.
 *
 * 아직 번역하지 않은 페이지는 내보내지 않는다. 영어 사용자를 한국어 본문으로
 * 보내면 바로 이탈하고, 애초에 없는 경로를 링크하면 전체 prerender(strict)
 * 빌드가 실패한다. 영어판을 추가하면 TRANSLATED_PATHS 등록만으로 다시 나타난다.
 */
export const footerLinks = (group: 'main' | 'legal', locale: Locale) =>
	Object.entries(PAGE_META)
		.filter(
			([path, m]) =>
				m.footer === group && !(m.koOnly && locale !== 'ko') && availableIn(path, locale)
		)
		.map(([path, m]) => ({
			path: localizePath(path, locale),
			name: dict(locale).pages[m.nameKey]
		}));

/**
 * 정적 페이지용 BreadcrumbList JSON-LD 문자열. 해당 없으면 null.
 * 블로그 글(/blog/*)은 글 제목이 필요해서 각 페이지가 직접 만든다 — 여기서 만들면 중복된다.
 */
export function breadcrumbLd(pathname: string, locale: Locale): string | null {
	const meta = PAGE_META[stripLocale(pathname)];
	if (!meta) return null;

	const t = dict(locale);

	return JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: t.pages.home,
				item: `${SITE_URL}${localizePath('/', locale)}`
			},
			{ '@type': 'ListItem', position: 2, name: t.pages[meta.nameKey] }
		]
	});
}
