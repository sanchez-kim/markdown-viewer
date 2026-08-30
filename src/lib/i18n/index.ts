// 다국어 기반. 한국어는 루트 경로(`/faq`), 영어는 `/en` 접두 경로(`/en/faq`)를 쓴다.
//
// 한국어를 `/ko/*`로 옮기지 않은 이유: 기존 URL이 이미 색인·공유되어 있어서
// 경로를 바꾸면 그동안 쌓인 신호를 버리게 된다. 새 언어만 접두사를 갖는다.
import ko from './ko';
import en from './en';
import type { Dict } from './ko';

export type Locale = 'ko' | 'en';

export const LOCALES: Locale[] = ['ko', 'en'];
export const DEFAULT_LOCALE: Locale = 'ko';

/** `<html lang>`과 hreflang에 쓰는 값 */
export const HTML_LANG: Record<Locale, string> = { ko: 'ko', en: 'en' };
/** og:locale에 쓰는 값 */
export const OG_LOCALE: Record<Locale, string> = { ko: 'ko_KR', en: 'en_US' };
/** 언어 전환 버튼에 표시할 이름 (해당 언어 자체 표기) */
export const LOCALE_NAME: Record<Locale, string> = { ko: '한국어', en: 'English' };

const DICTS: Record<Locale, Dict> = { ko, en };

export function dict(locale: Locale): Dict {
	return DICTS[locale];
}

/** 경로에서 로케일을 판별한다. `/en`·`/en/...`만 영어, 나머지는 한국어. */
export function localeFromPath(pathname: string): Locale {
	return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ko';
}

/** 로케일 접두사를 뗀 정규 경로를 돌려준다. `/en/faq` → `/faq`, `/en` → `/` */
export function stripLocale(pathname: string): string {
	if (pathname === '/en') return '/';
	if (pathname.startsWith('/en/')) return pathname.slice(3);
	return pathname;
}

/** 정규 경로를 해당 로케일의 실제 경로로 바꾼다. (`/faq`, 'en') → `/en/faq` */
export function localizePath(path: string, locale: Locale): string {
	if (locale === DEFAULT_LOCALE) return path;
	return path === '/' ? '/en' : `/en${path}`;
}

/** 지금 보고 있는 경로의 다른 언어판 경로. 언어 전환 버튼과 hreflang에 쓴다. */
export function switchLocalePath(pathname: string, target: Locale): string {
	return localizePath(stripLocale(pathname), target);
}

/**
 * 영어판이 **실제로 존재하는** 정규 경로 목록. 여기서 hreflang과 sitemap이 함께 나온다.
 *
 * 반드시 실제 라우트와 일치시킬 것. 아직 만들지 않은 경로를 넣으면 hreflang과
 * sitemap이 404를 가리키게 되고, 그건 없는 대체 문서를 검색엔진에 알리는 것이라
 * 아예 안 거느니만 못하다. `src/routes/en/<경로>` 를 추가할 때 같이 추가한다.
 *
 * 블로그(`/blog`, `/blog/*`)는 한국어 전용이라 계획에 없다 — 상품화된 how-to
 * 주제를 영어로 옮겨봐야 포화된 시장에서 중복 콘텐츠만 된다.
 */
export const TRANSLATED_PATHS = new Set<string>(['/', '/editor', '/privacy', '/terms', '/faq', '/about', '/shortcuts']);

export function hasTranslation(pathname: string): boolean {
	return TRANSLATED_PATHS.has(stripLocale(pathname));
}

/**
 * 해당 로케일에 이 페이지가 실제로 있는지. 링크를 내보내기 전에 확인한다.
 *
 * 한국어는 모든 페이지가 있으므로 항상 true다. 영어는 TRANSLATED_PATHS에 있는
 * 경로만 존재한다. 전체 prerender + strict 설정이라 없는 경로를 링크하면
 * 빌드가 실패하므로, 이 함수로 걸러서 링크 목록을 만든다.
 */
export function availableIn(path: string, locale: Locale): boolean {
	return locale === DEFAULT_LOCALE || TRANSLATED_PATHS.has(path);
}
