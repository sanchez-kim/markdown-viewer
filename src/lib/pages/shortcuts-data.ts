// 단축키 목록. 페이지 마크업이 이 배열에서 나온다.
//
// 한국어판은 "굵게 (Bold)"처럼 영문을 병기해 왔는데, 영어판에서는 그 병기가
// 의미가 없으므로 영어 이름만 남긴다.
import type { Locale } from '$lib/i18n';

export interface ShortcutItem {
	keys: string[];
	label: string;
	desc?: string;
}

export interface ShortcutGroup {
	icon: string;
	title: string;
	items: ShortcutItem[];
}

const ko: ShortcutGroup[] = [
	{
		icon: '✏️',
		title: '서식 (Formatting)',
		items: [
			{ keys: ['Ctrl/⌘', 'B'], label: '굵게 (Bold)', desc: '**텍스트**' },
			{ keys: ['Ctrl/⌘', 'I'], label: '기울임 (Italic)', desc: '*텍스트*' },
			{ keys: ['Ctrl/⌘', 'U'], label: '밑줄 (Underline)', desc: '<u>텍스트</u>' },
			{ keys: ['Ctrl/⌘', 'K'], label: '링크 삽입 (Link)', desc: '[텍스트](url)' },
			{ keys: ['Ctrl/⌘', '`'], label: '인라인 코드 (Inline Code)', desc: '`코드`' },
			{ keys: ['Ctrl/⌘', 'Shift', 'S'], label: '취소선 (Strikethrough)', desc: '~~텍스트~~' }
		]
	},
	{
		icon: '📦',
		title: '블록 (Block)',
		items: [
			{ keys: ['Ctrl/⌘', 'Shift', 'H'], label: '제목 순환 (Heading)', desc: 'H1 → H2 → H3 → 본문' },
			{ keys: ['Ctrl/⌘', 'Alt', 'C'], label: '코드 블록 (Code Block)', desc: '```언어' },
			{ keys: ['Ctrl/⌘', 'Shift', 'B'], label: '인용구 (Blockquote)', desc: '> 인용' },
			{ keys: ['Ctrl/⌘', 'Shift', '7'], label: '번호 목록 (Ordered List)', desc: '1. 항목' },
			{ keys: ['Ctrl/⌘', 'Shift', '8'], label: '글머리 목록 (Bullet List)', desc: '- 항목' },
			{ keys: ['Ctrl/⌘', 'Shift', '9'], label: '체크리스트 (Task List)', desc: '- [ ] 항목' }
		]
	},
	{
		icon: '💾',
		title: '파일 (File)',
		items: [
			{ keys: ['Ctrl/⌘', 'S'], label: '저장 (Save)', desc: '마크다운 파일(.md) 저장' },
			{ keys: ['Ctrl/⌘', 'O'], label: '열기 (Open)', desc: '마크다운 파일(.md) 불러오기' },
			{ keys: ['Ctrl/⌘', 'Shift', 'E'], label: '내보내기 (Export)', desc: 'PDF / DOCX 내보내기 메뉴' }
		]
	},
	{
		icon: '⚙️',
		title: '편집기 (Editor)',
		items: [
			{ keys: ['/'], label: '슬래시 메뉴 (Slash Menu)', desc: '빈 줄에서 / 입력 → 블록 삽입 메뉴' },
			{ keys: ['Ctrl/⌘', 'Z'], label: '실행 취소 (Undo)' },
			{ keys: ['Ctrl/⌘', 'Shift', 'Z'], label: '다시 실행 (Redo)' },
			{ keys: ['Ctrl/⌘', 'A'], label: '전체 선택 (Select All)' },
			{ keys: ['Ctrl/⌘', 'C'], label: '복사 (Copy)' },
			{ keys: ['Ctrl/⌘', 'X'], label: '잘라내기 (Cut)' },
			{ keys: ['Ctrl/⌘', 'V'], label: '붙여넣기 (Paste)', desc: '이미지 붙여넣기도 지원' },
			{ keys: ['Tab'], label: '들여쓰기 (Indent)', desc: '목록 항목 내에서 사용' },
			{ keys: ['Shift', 'Tab'], label: '내어쓰기 (Outdent)', desc: '목록 항목 내에서 사용' }
		]
	}
];

const en: ShortcutGroup[] = [
	{
		icon: '✏️',
		title: 'Formatting',
		items: [
			{ keys: ['Ctrl/⌘', 'B'], label: 'Bold', desc: '**text**' },
			{ keys: ['Ctrl/⌘', 'I'], label: 'Italic', desc: '*text*' },
			{ keys: ['Ctrl/⌘', 'U'], label: 'Underline', desc: '<u>text</u>' },
			{ keys: ['Ctrl/⌘', 'K'], label: 'Insert link', desc: '[text](url)' },
			{ keys: ['Ctrl/⌘', '`'], label: 'Inline code', desc: '`code`' },
			{ keys: ['Ctrl/⌘', 'Shift', 'S'], label: 'Strikethrough', desc: '~~text~~' }
		]
	},
	{
		icon: '📦',
		title: 'Blocks',
		items: [
			{ keys: ['Ctrl/⌘', 'Shift', 'H'], label: 'Cycle heading', desc: 'H1 → H2 → H3 → body' },
			{ keys: ['Ctrl/⌘', 'Alt', 'C'], label: 'Code block', desc: '```language' },
			{ keys: ['Ctrl/⌘', 'Shift', 'B'], label: 'Blockquote', desc: '> quote' },
			{ keys: ['Ctrl/⌘', 'Shift', '7'], label: 'Numbered list', desc: '1. item' },
			{ keys: ['Ctrl/⌘', 'Shift', '8'], label: 'Bulleted list', desc: '- item' },
			{ keys: ['Ctrl/⌘', 'Shift', '9'], label: 'Checklist', desc: '- [ ] item' }
		]
	},
	{
		icon: '💾',
		title: 'File',
		items: [
			{ keys: ['Ctrl/⌘', 'S'], label: 'Save', desc: 'save as a Markdown (.md) file' },
			{ keys: ['Ctrl/⌘', 'O'], label: 'Open', desc: 'open a Markdown (.md) file' },
			{ keys: ['Ctrl/⌘', 'Shift', 'E'], label: 'Export', desc: 'PDF / DOCX export menu' }
		]
	},
	{
		icon: '⚙️',
		title: 'Editor',
		items: [
			{ keys: ['/'], label: 'Slash menu', desc: 'type / on an empty line to insert a block' },
			{ keys: ['Ctrl/⌘', 'Z'], label: 'Undo' },
			{ keys: ['Ctrl/⌘', 'Shift', 'Z'], label: 'Redo' },
			{ keys: ['Ctrl/⌘', 'A'], label: 'Select all' },
			{ keys: ['Ctrl/⌘', 'C'], label: 'Copy' },
			{ keys: ['Ctrl/⌘', 'X'], label: 'Cut' },
			{ keys: ['Ctrl/⌘', 'V'], label: 'Paste', desc: 'images can be pasted too' },
			{ keys: ['Tab'], label: 'Indent', desc: 'inside a list item' },
			{ keys: ['Shift', 'Tab'], label: 'Outdent', desc: 'inside a list item' }
		]
	}
];

export function shortcutGroups(locale: Locale): ShortcutGroup[] {
	return locale === 'ko' ? ko : en;
}
