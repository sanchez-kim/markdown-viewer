import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'auto';

function createThemeStore() {
	// Get initial theme from localStorage or default to 'auto'
	const getInitialTheme = (): Theme => {
		if (!browser) return 'auto';
		const stored = localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark' || stored === 'auto') {
			return stored;
		}
		return 'auto';
	};

	const { subscribe, set, update } = writable<Theme>(getInitialTheme());

	return {
		subscribe,
		setTheme: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				applyTheme(theme);
			}
			set(theme);
		},
		toggle: () => {
			update((current) => {
				const newTheme = current === 'light' ? 'dark' : 'light';
				if (browser) {
					localStorage.setItem('theme', newTheme);
					applyTheme(newTheme);
				}
				return newTheme;
			});
		},
		init: () => {
			if (browser) {
				const theme = getInitialTheme();
				applyTheme(theme);
				set(theme);
			}
		}
	};
}

function applyTheme(theme: Theme) {
	if (!browser) return;

	const root = document.documentElement;

	const dark =
		theme === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches : theme === 'dark';

	root.classList.toggle('dark', dark);

	// 다크 스타일이 두 가지 셀렉터로 나뉘어 작성돼 있다. 에디터·레이아웃·랜딩은 `html.dark`를,
	// about·blog·blog/[slug]·DocList·TabBar는 `[data-theme='dark']`를 쓴다. 여기서 클래스만
	// 토글하던 탓에 후자 34개 규칙이 한 번도 적용되지 않았고, 다크 모드에서 헤더·푸터만
	// 어두워지고 블로그 본문은 흰 배경으로 남는 상태였다. 둘 다 반영한다.
	if (dark) {
		root.setAttribute('data-theme', 'dark');
	} else {
		root.setAttribute('data-theme', 'light');
	}
}

export const themeStore = createThemeStore();
