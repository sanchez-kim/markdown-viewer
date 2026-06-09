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
			'@typescript-eslint/no-unused-vars': 'warn',
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
			'no-useless-escape': 'warn',
			'no-useless-assignment': 'off',
			'no-empty': 'warn'
		}
	}
);
