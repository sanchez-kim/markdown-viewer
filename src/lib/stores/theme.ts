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

	if (theme === 'auto') {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		root.classList.toggle('dark', prefersDark);
	} else {
		root.classList.toggle('dark', theme === 'dark');
	}
}

export const themeStore = createThemeStore();
