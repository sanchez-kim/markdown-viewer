// 영어 사전. ko.ts의 Dict 타입을 만족해야 한다 — 키를 빠뜨리면 타입 에러가 난다.
//
// 직역이 아니라 영어권 독자를 위해 다시 쓴 문장이다. 예를 들어 추천 대상의
// 티스토리·벨로그·브런치는 영어권에서 아무 의미가 없으므로 Medium·Dev.to로 바꿨다.
import type { Dict } from './ko';

const en: Dict = {
	brand: {
		name: 'EasyMD',
		full: 'EasyMD',
		homeAria: 'EasyMD home',
		logoAlt: 'EasyMD logo'
	},

	nav: {
		guide: 'Guide',
		blog: 'Blog',
		openEditor: 'Open editor',
		openEditorArrow: 'Open editor →',
		mainMenuAria: 'Main menu',
		siteMenuAria: 'Site menu',
		policyAria: 'Policies',
		languageAria: 'Select language'
	},

	footer: {
		contact: 'Contact help@easy-md.com',
		copyright: '© 2026 EasyMD'
	},

	pages: {
		home: 'Home',
		editor: 'Editor',
		blog: 'Blog',
		guide: 'Markdown syntax guide',
		templates: 'Templates',
		useCases: 'Use cases',
		compare: 'Editor comparison',
		shortcuts: 'Shortcuts',
		about: 'About',
		faq: 'FAQ',
		changelog: 'Changelog',
		privacy: 'Privacy policy',
		terms: 'Terms of service'
	},

	landing: {
		title: 'EasyMD | Free online Markdown editor — no install, no login',
		description:
			'A free Markdown editor that runs in your browser. Formatting appears as you type, your work saves itself, and you can export to Markdown, PDF, or Word. No account required, and your documents never leave your browser.',
		ogDescription:
			'A free Markdown editor that runs in your browser. Formatting as you type, automatic saving, and export to Markdown, PDF, or Word.',
		keywords:
			'markdown editor, online markdown editor, free markdown editor, markdown to pdf, markdown to word, wysiwyg markdown, browser markdown editor',
		jsonLdDescription:
			'A free Markdown editor that runs in your browser. Formatting as you type, automatic saving, and export to Markdown, PDF, or Word. No account required.',
		jsonLdFeatures: [
			'Live Markdown formatting',
			'Automatic saving',
			'Export to PDF',
			'Export to DOCX',
			'Image paste and resize',
			'Table editing'
		],

		badge: 'Free · No install · Runs in your browser',
		heroTitle: 'Write like a document.<br>Keep it as Markdown.',
		heroSub:
			'Formatting appears the moment you type it.<br>Saving is automatic. Export to Markdown, PDF, or Word.',
		heroCta: 'Start writing →',
		bottomCta: 'Open the editor →',

		features: [
			{ icon: '✏️', label: 'Formats as you type' },
			{ icon: '💾', label: 'Saves automatically' },
			{ icon: '📁', label: 'MD / PDF / Word export' },
			{ icon: '🌙', label: 'Dark mode' },
			{ icon: '🔒', label: 'Stays on your device' }
		],

		introAria: 'About EasyMD',
		introHeading: 'EasyMD — a free Markdown editor that runs in your browser',
		introBody:
			'EasyMD is a free Markdown editor you can use straight from your browser, with nothing to install and no account to create. Type a Markdown symbol and the formatting appears right there, the way it does in a normal document editor, and what you write is saved as you go. When the document is done you can take it with you as Markdown (.md), PDF, or Word (.docx) — which covers README files, meeting notes, blog drafts, and technical documentation alike. Nothing you write is sent to a server; it stays in your own browser.',

		whatIsHeading: 'What is Markdown?',
		whatIsBodyBefore:
			'Markdown is a lightweight markup language created by John Gruber in 2004. Instead of HTML tags, it uses plain characters like ',
		whatIsBodyAfter:
			' to express headings, lists, emphasis, tables, and code blocks. The raw text stays readable on its own but converts cleanly into a formatted document, which is why GitHub, Notion, Slack, Obsidian, Reddit, and countless other platforms adopted it as a default way to write.',

		featuresHeading: 'What it does',
		featureList: [
			{
				term: 'Formatting as you type',
				desc: 'Markdown symbols turn into real formatting the moment you type them — no split-screen preview to read.'
			},
			{
				term: 'Automatic saving',
				desc: 'Your document is stored in the browser as you write, so a refresh or a closed tab does not lose it.'
			},
			{
				term: 'Export where you need it',
				desc: 'Save as Markdown, PDF, or Word (DOCX) in one step.'
			},
			{
				term: 'Tables, checklists, code',
				desc: 'Edit tables directly, track to-dos with checkboxes, and get syntax highlighting for around 200 languages.'
			},
			{
				term: 'Dark mode',
				desc: 'A darker theme for long writing sessions, following your system setting if you prefer.'
			},
			{
				term: 'Private by design',
				desc: 'There is no account to create and no server storing your documents — they live in your browser.'
			}
		],

		audienceHeading: 'Who it is for',
		audienceList: [
			'Developers writing README files and open-source documentation',
			'Anyone turning meeting notes, specs, or reports into something shareable',
			'Writers drafting posts for Medium, Dev.to, Ghost, or their own blog',
			'Students structuring lecture notes and assignments'
		],

		moreHeading: 'Learn more',
		moreAria: 'Browse the site',
		moreLinks: [
			{ path: '/guide', label: 'Markdown syntax guide' },
			{ path: '/templates', label: 'Markdown templates' },
			{ path: '/use-cases', label: 'Use cases' },
			{ path: '/compare', label: 'Compared with Notion, Typora, and Obsidian' },
			{ path: '/shortcuts', label: 'Keyboard shortcuts' },
			{ path: '/faq', label: 'Frequently asked questions' }
		],

		footerLinks: [
			{ path: '/about', label: 'About' },
			{ path: '/guide', label: 'Guide' },
			{ path: '/changelog', label: 'Changelog' },
			{ path: '/privacy', label: 'Privacy' },
			{ path: '/terms', label: 'Terms' }
		]
	},

	editor: {
		meta: {
			title: 'Markdown Editor | EasyMD',
			description:
				'Write Markdown with formatting that appears as you type, then export to PDF, Word, or Markdown. Saves automatically, no account needed.',
			keywords:
				'markdown editor, online markdown editor, free markdown editor, markdown to pdf, markdown to word, wysiwyg markdown, browser markdown editor',
			ogTitle: 'Markdown Editor | EasyMD',
			ogDescription:
				'Write Markdown with formatting that appears as you type, then export to PDF, Word, or Markdown. Saves automatically, no account needed.',
			jsonLdDescription:
				'A free Markdown editor that runs in your browser. Formatting as you type, automatic saving, and export to PDF. No account required.',
			jsonLdFeatures: [
				'Live Markdown formatting',
				'Automatic saving',
				'Export to PDF',
				'Export to DOCX',
				'Image paste and resize',
				'Table editing'
			]
		},

		chrome: {
			home: 'Home',
			menuOpen: 'Open menu',
			docList: 'Documents',
			file: 'File',
			fileTitle: 'New document, open, export',
			newDoc: 'New document',
			openFile: 'Open file…',
			exportLabel: 'Export',
			exportMd: 'Markdown (.md)',
			exportPdf: 'PDF (.pdf)',
			exportDocx: 'Word (.docx)',
			docWidth: 'Width',
			widthNormal: 'Normal',
			widthWide: 'Wide',
			widthFull: 'Full',
			theme: 'Theme',
			themeToggle: 'Toggle theme',
			lightMode: 'Light mode',
			darkMode: 'Dark mode',
			more: 'More',
			headerAlwaysShow: 'Always show header',
			headerAutoHide: 'Auto-hide header',
			sponsor: '☕ Support the developer',
			close: 'Close',
			saving: 'Saving…',
			saved: 'Saved',
			filenamePlaceholder: 'Enter a file name',
			filenameEdit: 'Click to rename'
		},

		table: {
			addColLeft: '← Add column left',
			addColRight: '→ Add column right',
			deleteRow: 'Delete row',
			deleteCol: 'Delete column',
			deleteTable: 'Delete table'
		},

		format: {
			italic: 'Italic',
			underline: 'Underline',
			strike: 'Strikethrough',
			textColor: 'Text color',
			highlight: 'Highlight',
			bulletList: 'Bulleted list',
			link: 'Link'
		},

		status: {
			lastSaved: 'Last saved',
			restored: 'Restored your previous work'
		},

		blocks: {
			h1: 'Heading 1',
			h2: 'Heading 2',
			h3: 'Heading 3',
			bulletList: 'Bulleted list',
			orderedList: 'Numbered list',
			checklist: 'Checklist',
			codeBlock: 'Code block',
			blockquote: 'Quote',
			table: 'Table',
			divider: 'Divider'
		},

		colors: {
			default: 'Default',
			none: 'None',
			red: 'Red',
			orange: 'Orange',
			yellow: 'Yellow',
			green: 'Green',
			teal: 'Teal',
			blue: 'Blue',
			purple: 'Purple',
			pink: 'Pink',
			gray: 'Gray'
		},

		misc: {
			placeholder: 'Click here and start writing… (type / to add a block)',
			linkPrompt: 'Enter the link URL:',
			untitledPdf: 'Markdown document',
			sharedDocName: 'shared-document.md',
			startNewDoc: 'Start a new document',
			printOrSavePdf: '📄 Print / Save as PDF',
			closeWindow: '❌ Close'
		},

		history: {
			manualSave: 'Manual save',
			autoSave: 'Autosave',
			beforeRestore: 'Autosave before restore',
			versionRestore: 'Version restore'
		},
		toolbar: {
			bold: 'Bold',
			inlineCode: 'Inline code',
			tableOptions: 'Table options',
			addRowAbove: '↑ Add row above',
			addRowBelow: '↓ Add row below'
		},

		slash: {
			header: 'Add a block',
			hint: '↑↓ to select, Enter to insert'
		},

		shortcuts: {
			title: '⌨️ Keyboard shortcuts',
			fileSection: 'File',
			save: 'Save',
			openFile: 'Open file',
			pasteImage: 'Paste image',
			editSection: 'Editing',
			filenameDone: 'Confirm file name',
			cancelOrClose: 'Cancel / close dialog',
			helpSection: 'Help',
			toggleGuide: 'Open or close this guide'
		},

		toast: {
			saved: 'Saved.',
			saveFailed: 'Could not save.',
			fileSaved: 'File saved.',
			imageAdded: 'Image added.',
			imageOnly: 'Only image files can be uploaded.',
			imageTooLarge: 'Images must be 5MB or smaller.',
			imageFailed: 'Could not insert the image.',
			storageFull:
				'Your browser storage is full. Try removing some images or clearing site data.',
			popupBlocked: 'The popup was blocked. Please allow popups for this site.',
			sharedOpened: 'Opened the document from a shared link.',
			pdfError: 'Something went wrong while creating the PDF: ',
			confirmNewDoc:
				'You have unsaved changes. Starting a new document will discard them. Continue?'
		}
	}
};

export default en;
