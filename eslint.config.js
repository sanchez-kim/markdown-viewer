import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default ts.config(
	{
		ignores: ['build/', '.svelte-kit/', 'node_modules/', 'src/lib/posts/', 'static/']
	},
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: { parser: ts.parser }
		}
	},
	{
		// 초기에 빠르게 개발된 코드베이스 — 실제 버그 위주로 잡고, 스타일/사소한 경고는 완화
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			// `_` 접두는 의도적 미사용(예: each의 미사용 항목 자리표시자) — 무시
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }
			],
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'no-unused-vars': 'off',
			'no-undef': 'off',
			'svelte/no-at-html-tags': 'off',
			'svelte/require-each-key': 'warn',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/no-useless-mustaches': 'off',
			// 가드된 반응형 저장 로직에 대한 휴리스틱 오탐 — 끔
			'svelte/infinite-reactive-loop': 'off',
			'svelte/prefer-svelte-reactivity': 'off',
			'svelte/no-unused-svelte-ignore': 'warn',
			// JSON-LD의 `<\/script>`는 프리렌더 HTML 안전을 위한 의도적 이스케이프 — 오탐이라 끔
			'no-useless-escape': 'off',
			'no-useless-assignment': 'off',
			'no-empty': 'warn'
		}
	}
);
