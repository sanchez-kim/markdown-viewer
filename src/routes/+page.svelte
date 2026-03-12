<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { marked } from 'marked';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github.min.css';
	import DOMPurify from 'dompurify';
	import { browser } from '$app/environment';
	import Toast from '$lib/components/Toast.svelte';
	import { toastStore } from '$lib/stores/toast';
	import { themeStore } from '$lib/stores/theme';
	import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle } from 'docx';
	import { saveAs } from 'file-saver';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Image from '@tiptap/extension-image';
	import Link from '@tiptap/extension-link';
	import BubbleMenuExt from '@tiptap/extension-bubble-menu';
		import { Table as TiptapTable } from '@tiptap/extension-table';
	import TableRowExt from '@tiptap/extension-table-row';
	import TableCellExt from '@tiptap/extension-table-cell';
	import TableHeaderExt from '@tiptap/extension-table-header';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import Placeholder from '@tiptap/extension-placeholder';
	import { Markdown as MarkdownExt } from 'tiptap-markdown';
	import { TextStyle, Color } from '@tiptap/extension-text-style';
	import Highlight from '@tiptap/extension-highlight';
	import Underline from '@tiptap/extension-underline';

	let markdownText = `# 🎉 이지 마크다운에 오신 것을 환영합니다!

이곳에서 **마크다운 문서**를 쉽고 편리하게 작성해보세요. 왼쪽에 글을 쓰면 오른쪽에서 바로 결과를 확인할 수 있어요!

## ✏️ 사용 방법

### 1️⃣ 기본 글쓰기
- **굵게** 하려면 \`**텍스트**\` 
- *기울임* 글씨는 \`*텍스트*\`
- [링크는 이렇게](https://github.com)

### 2️⃣ 목록 만들기
- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목

1. 번호가 있는 목록
2. 이렇게 만들어요
3. 간단하죠?

### 3️⃣ 코드 입력
\`\`\`javascript
// Code blocks work like this!
function hello() {
    console.log("안녕하세요!");
}
\`\`\`

### 4️⃣ 인용구
> 인용하고 싶은 글이나 중요한 내용은
> 이렇게 표시할 수 있어요.

## 💡 이런 것들을 해보세요!

- 🔄 **스크롤 연동**: 위쪽 버튼으로 에디터와 미리보기 스크롤을 함께 움직일 수 있어요
- 💾 **자동 저장**: 5분마다 자동으로 저장되니까 걱정 마세요
- 📁 **파일명 변경**: 위쪽의 파일명을 클릭하면 이름을 바꿀 수 있어요
- 🖼️ **이미지 추가**: 드래그해서 이미지를 넣을 수 있어요 (곧 추가 예정!)

지금 바로 이 글을 지우고 새로운 문서를 만들어보세요! 🚀`;

	let renderedHtml = '';
	let previewElement: HTMLDivElement | undefined;
	let lastSaved = '';
	let saveStatus = 'saved'; // 'saved', 'saving', 'unsaved'
	let currentFileName = 'untitled.md';
	let isEditingFilename = false;
	let tempFileName = '';
	let showExportDropdown = false;
	let imageIdCounter = 0; // Unique ID counter for images
	let showMobileMenu = false;
	let showShortcutsModal = false;

	// ===== TIPTAP EDITOR STATE =====
	let tiptapEditor: Editor | null = null;
	let editorContainer: HTMLDivElement;
	let bubbleMenuElement: HTMLDivElement;
	let tableBubbleMenuElement: HTMLDivElement;

	// ===== SLASH COMMAND STATE =====
	let slashMenuVisible = false;
	let slashMenuPos = { x: 0, y: 0 };
	let slashMenuFilter = '';

	// ===== TABLE PICKER STATE =====
	let tablePickerVisible = false;
	let tablePickerHover = { rows: 0, cols: 0 };

	// ===== DOCUMENT WIDTH STATE =====
	let documentWidth: 'normal' | 'wide' | 'full' = 'normal';
	const WIDTH_MAP: Record<string, string> = { normal: '800px', wide: '1100px', full: '100%' };

	// ===== COLOR PICKER STATE =====
	let showColorPicker = false;
	let showHighlightPicker = false;

	const TEXT_COLORS = [
		{ label: '기본', value: '' },
		{ label: '빨강', value: '#e03131' },
		{ label: '주황', value: '#e8590c' },
		{ label: '노랑', value: '#f08c00' },
		{ label: '초록', value: '#2f9e44' },
		{ label: '청록', value: '#0c8599' },
		{ label: '파랑', value: '#1971c2' },
		{ label: '보라', value: '#7048e8' },
		{ label: '분홍', value: '#c2255c' },
		{ label: '회색', value: '#868e96' },
	];

	const HIGHLIGHT_COLORS = [
		{ label: '없음', value: '' },
		{ label: '노랑', value: '#fff3bf' },
		{ label: '초록', value: '#d3f9d8' },
		{ label: '파랑', value: '#d0ebff' },
		{ label: '분홍', value: '#ffdeeb' },
		{ label: '주황', value: '#ffe8cc' },
		{ label: '보라', value: '#e5dbff' },
	];

	// Configure marked with highlight.js - with proper typing
	marked.setOptions({
		highlight: function(code: string, lang: string): string {
			if (lang && hljs.getLanguage(lang)) {
				return hljs.highlight(code, { language: lang }).value;
			}
			return hljs.highlightAuto(code).value;
		},
		breaks: true,
		gfm: true
	});

	// ===== MARKDOWN RENDERING =====
	function updatePreview() {
		const result = marked(markdownText);
		const raw = typeof result === 'string' ? result : result.toString();
		renderedHtml = browser ? DOMPurify.sanitize(raw) : raw;
	}

	// ===== INLINE IMAGE FOLDING =====
	let displayText = '';
	let imageMap = new Map<string, string>(); // Store original images with proper typing
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	let previewDebounceTimer: ReturnType<typeof setTimeout> | null = null;

	function schedulePreviewUpdate() {
		if (previewDebounceTimer) clearTimeout(previewDebounceTimer);
		previewDebounceTimer = setTimeout(updatePreview, 150);
	}
	
	// Debounced processing to improve performance
	$: {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => processMarkdownDisplay(markdownText), 100);
	}
	
	function processMarkdownDisplay(text: string) {
		// Clear previous data to prevent memory leaks
		imageMap.clear();
		imageIdCounter = 0; // Reset counter for each processing
		const base64Pattern = /!\[([^\]]*)\]\((data:image\/[^;]+;base64,)([A-Za-z0-9+/]+=*)\)/g;
		
		displayText = text.replace(base64Pattern, (match, altText, prefix, base64) => {
			// Auto-fold Base64 strings longer than 200 characters
			if (base64.length > 200) {
				const imageId = `img-${imageIdCounter++}`; // Use counter for unique ID
				imageMap.set(imageId, match); // Store original image
				
				const size = Math.round(base64.length / 1024);
				const preview = base64.substring(0, 30) + '...' + base64.substring(base64.length - 10);
				return `![${altText}](${prefix}${preview}) 📷[${size}KB]`;
			}
			return match;
		});
	}

	// ===== LOCAL STORAGE & AUTO-SAVE =====
	function saveToLocal() {
		if (!browser || typeof localStorage === 'undefined') return;
		try {
			saveStatus = 'saving';
			localStorage.setItem('markdown-viewer-content', markdownText);
			localStorage.setItem('markdown-viewer-filename', currentFileName);
			localStorage.setItem('markdown-viewer-timestamp', new Date().toISOString());
			lastSaved = new Date().toLocaleTimeString();
			saveStatus = 'saved';
			previousText = markdownText; // Update previous text after saving
		} catch (error) {
			console.error('저장 실패:', error);
			saveStatus = 'unsaved';
			// QuotaExceededError 감지
			const isQuotaError = error instanceof DOMException && (
				error.name === 'QuotaExceededError' ||
				error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
			);
			if (isQuotaError) {
				toastStore.show(
					'저장 공간이 부족합니다. 이미지를 줄이거나 브라우저 캐시를 정리해주세요.',
					'error',
					6000
				);
			} else {
				toastStore.show('저장에 실패했습니다.', 'error');
			}
		}
	}

	// Load from localStorage
	function loadFromLocal() {
		if (!browser || typeof localStorage === 'undefined') return;
		try {
			const savedContent = localStorage.getItem('markdown-viewer-content');
			const savedFilename = localStorage.getItem('markdown-viewer-filename');
			const savedTimestamp = localStorage.getItem('markdown-viewer-timestamp');

			if (savedContent) {
				// Auto-restore saved draft silently
				markdownText = savedContent;
				currentFileName = savedFilename || 'untitled.md';
				previousText = savedContent;
				saveStatus = 'saved';

				// Show non-blocking info toast with "새 문서" action
				const savedTime = savedTimestamp
					? new Date(savedTimestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
					: '';
				toastStore.show(
					`이전 작업을 불러왔습니다${savedTime ? ` (${savedTime})` : ''}`,
					'info',
					0, // persistent until dismissed
					{ label: '새 문서로 시작', onClick: newDocument }
				);
			}
		} catch (error) {
			console.error('불러오기 실패:', error);
		}
	}

	function newDocument() {
		if (saveStatus === 'unsaved') {
			if (!confirm('저장되지 않은 내용이 있습니다. 새 문서를 시작하면 사라집니다. 계속하시겠습니까?')) return;
		}
		markdownText = '';
		currentFileName = 'untitled.md';
		saveStatus = 'saved';
		previousText = '';
		if (tiptapEditor) {
			tiptapEditor.commands.setContent('');
		}
		localStorage.removeItem('markdown-viewer-content');
		localStorage.removeItem('markdown-viewer-filename');
		localStorage.removeItem('markdown-viewer-timestamp');
	}

	// Auto-save every 5 minutes
	let autoSaveInterval: NodeJS.Timeout;
	function startAutoSave() {
		if (!browser) return;
		if (autoSaveInterval) clearInterval(autoSaveInterval);
		autoSaveInterval = setInterval(() => {
			if (markdownText && saveStatus !== 'saving') {
				saveToLocal();
			}
		}, 5 * 60 * 1000); // Auto-save every 5 minutes
	}

	function stopAutoSave() {
		if (autoSaveInterval) {
			clearInterval(autoSaveInterval);
		}
	}

	// Manual save function
	function manualSave() {
		saveToLocal();
		toastStore.show('로컬스토리지에 저장되었습니다!', 'success');
	}

	// ===== FILE I/O OPERATIONS =====
	
	// Type definitions for File System Access API
	interface FilePickerOptions {
		types?: Array<{
			description: string;
			accept: Record<string, string[]>;
		}>;
	}
	
	interface FileSystemFileHandle {
		getFile(): Promise<File>;
		createWritable(): Promise<FileSystemWritableFileStream>;
	}
	
	interface FileSystemWritableFileStream {
		write(data: string): Promise<void>;
		close(): Promise<void>;
	}
	
	interface WindowWithFileSystem extends Window {
		showOpenFilePicker(options: FilePickerOptions): Promise<FileSystemFileHandle[]>;
		showSaveFilePicker(options: FilePickerOptions & { suggestedName?: string }): Promise<FileSystemFileHandle>;
	}
	
	function handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file && (file.type === 'text/markdown' || file.name.endsWith('.md'))) {
			const reader = new FileReader();
			reader.onload = (e) => {
				markdownText = e.target?.result as string;
				currentFileName = file.name;
				updatePreview();
				saveToLocal(); // Auto-save after file load
			};
			reader.readAsText(file);
		}
	}

	// Local file system access (experimental)
	async function openLocalFile() {
		try {
			// File System Access API with proper typing
			if ('showOpenFilePicker' in window) {
				const [fileHandle] = await (window as WindowWithFileSystem).showOpenFilePicker({
					types: [{
						description: 'Markdown files',
						accept: {
							'text/markdown': ['.md', '.markdown']
						}
					}],
					multiple: false
				});
				
				const file = await fileHandle.getFile();
				const content = await file.text();
				
				markdownText = content;
				currentFileName = file.name;
				updatePreview();
				saveToLocal();
			} else {
				// Fallback: trigger file input
				document.getElementById('file-input')?.click();
			}
		} catch (error) {
			// 파일 선택 취소 시 아무 처리 없음
		}
	}

	// Save file to local system
	async function saveFileToLocal() {
		try {
			// File System Access API with proper typing
			if ('showSaveFilePicker' in window) {
				const fileHandle = await (window as WindowWithFileSystem).showSaveFilePicker({
					suggestedName: currentFileName,
					types: [{
						description: 'Markdown files',
						accept: {
							'text/markdown': ['.md']
						}
					}]
				});
				
				const writable = await fileHandle.createWritable();
				await writable.write(markdownText);
				await writable.close();

				currentFileName = fileHandle.name;
				toastStore.show('파일이 저장되었습니다!', 'success');
			} else {
				// Fallback: download
				downloadMarkdown();
			}
		} catch (error) {
			// 파일 저장 취소 시 아무 처리 없음
		}
	}

	function downloadMarkdown() {
		const blob = new Blob([markdownText], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = currentFileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	// ===== FILENAME EDITING =====
	function startEditingFilename() {
		isEditingFilename = true;
		tempFileName = currentFileName;
	}

	function finishEditingFilename() {
		if (tempFileName.trim()) {
			// Add .md extension if not present
			const newFileName = tempFileName.trim().endsWith('.md') 
				? tempFileName.trim() 
				: tempFileName.trim() + '.md';
			currentFileName = newFileName;
			saveToLocal(); // Save after filename change
		}
		isEditingFilename = false;
		tempFileName = '';
	}

	function cancelEditingFilename() {
		isEditingFilename = false;
		tempFileName = '';
	}

	function handleFilenameKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			finishEditingFilename();
		} else if (event.key === 'Escape') {
			cancelEditingFilename();
		}
	}

	// ===== TIPTAP IMAGE INSERTION =====
	async function insertImageToTiptap(file: File) {
		if (!tiptapEditor) return;

		if (!file.type.startsWith('image/')) {
			toastStore.show('이미지 파일만 업로드할 수 있습니다.', 'error');
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			toastStore.show('이미지 크기는 5MB 이하로 제한됩니다.', 'warning');
			return;
		}

		try {
			// 이미지 압축 (최대 1280px 폭으로 리사이즈, JPEG 85% 품질)
			const base64 = await compressImageToBase64(file);
			tiptapEditor.chain().focus().setImage({ src: base64, alt: file.name }).run();
			toastStore.show('이미지가 추가되었습니다!', 'success');
		} catch (error) {
			console.error('이미지 삽입 실패:', error);
			toastStore.show('이미지 삽입에 실패했습니다.', 'error');
		}
	}

	async function compressImageToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const img = new window.Image();
			const objectUrl = URL.createObjectURL(file);

			img.onload = () => {
				URL.revokeObjectURL(objectUrl);
				const MAX_WIDTH = 1280;
				const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;
				const canvas = document.createElement('canvas');
				canvas.width = Math.round(img.width * scale);
				canvas.height = Math.round(img.height * scale);
				const ctx = canvas.getContext('2d');
				if (!ctx) { reject(new Error('canvas context 없음')); return; }
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

				// PNG는 PNG로, 나머지는 JPEG로
				const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
				const quality = mimeType === 'image/jpeg' ? 0.85 : undefined;
				resolve(canvas.toDataURL(mimeType, quality));
			};
			img.onerror = reject;
			img.src = objectUrl;
		});
	}

	// ===== 이미지 리사이즈 NodeView =====
	function createResizableImageNodeView({ node, getPos, editor }: any) {
		// 컨테이너
		const wrapper = document.createElement('div');
		wrapper.className = 'image-wrapper';
		wrapper.setAttribute('draggable', 'true');

		// 이미지
		const img = document.createElement('img');
		img.src = node.attrs.src;
		img.alt = node.attrs.alt || '';
		img.className = 'tiptap-image';
		if (node.attrs.width) img.style.width = typeof node.attrs.width === 'number' ? node.attrs.width + 'px' : node.attrs.width;

		// 왼쪽 핸들
		const handleLeft = document.createElement('div');
		handleLeft.className = 'resize-handle resize-handle-left';

		// 오른쪽 핸들
		const handleRight = document.createElement('div');
		handleRight.className = 'resize-handle resize-handle-right';

		wrapper.appendChild(img);
		wrapper.appendChild(handleLeft);
		wrapper.appendChild(handleRight);

		// 리사이즈 로직
		function makeResizer(direction: 'left' | 'right') {
			return (e: MouseEvent) => {
				e.preventDefault();
				e.stopPropagation();
				const startX = e.clientX;
				const startWidth = img.offsetWidth;

				function onMove(e: MouseEvent) {
					const dx = e.clientX - startX;
					const newWidth = direction === 'right'
						? Math.max(80, startWidth + dx)
						: Math.max(80, startWidth - dx);
					img.style.width = newWidth + 'px';
				}

				function onUp() {
					document.removeEventListener('mousemove', onMove);
					document.removeEventListener('mouseup', onUp);
					// 변경된 너비를 노드 attrs에 저장
					if (typeof getPos === 'function') {
						(editor as Editor).chain()
							.setNodeSelection(getPos())
							.updateAttributes('image', { width: img.style.width })
							.run();
					}
				}

				document.addEventListener('mousemove', onMove);
				document.addEventListener('mouseup', onUp);
			};
		}

		handleLeft.addEventListener('mousedown', makeResizer('left'));
		handleRight.addEventListener('mousedown', makeResizer('right'));

		return {
			dom: wrapper,
			update: (updatedNode: any) => {
				if (updatedNode.type.name !== 'image') return false;
				img.src = updatedNode.attrs.src;
				img.alt = updatedNode.attrs.alt || '';
				if (updatedNode.attrs.width) {
					img.style.width = typeof updatedNode.attrs.width === 'number'
						? updatedNode.attrs.width + 'px'
						: updatedNode.attrs.width;
				}
				return true;
			},
			selectNode: () => { wrapper.classList.add('image-selected'); },
			deselectNode: () => { wrapper.classList.remove('image-selected'); },
			stopEvent: (event: Event) => {
				// mousedown on resize handles: stop propagation to editor
				return (event.target as Element)?.classList?.contains('resize-handle');
			},
		};
	}

	// ===== TIPTAP EDITOR =====
	function initTiptap() {
		if (!browser || !editorContainer) return;
		if (tiptapEditor) return; // already initialized

		tiptapEditor = new Editor({
			element: editorContainer,
			extensions: [
				StarterKit,
				TextStyle,
				Color,
				Highlight.configure({ multicolor: true }),
				Underline,
				Image.extend({
					addAttributes() {
						return {
							...this.parent?.(),
							width: { default: null, parseHTML: (el: HTMLElement) => el.getAttribute('width') || (el as HTMLElement).style.width || null },
						};
					},
					addNodeView() {
						return (props: any) => createResizableImageNodeView({ ...props, editor: this.editor });
					},
				}).configure({ allowBase64: true }),
				Link.configure({
					openOnClick: false,
					HTMLAttributes: {
						class: 'tiptap-link',
						rel: 'noopener noreferrer',
						target: '_blank',
					},
					autolink: true,
				}),
				MarkdownExt.configure({
					html: false,
					transformPastedText: true,
					transformCopiedText: true,
				}),
				BubbleMenuExt.configure({
					element: bubbleMenuElement,
					tippyOptions: { duration: 100 },
					shouldShow: ({ state }) => {
						const { selection } = state;
						// NodeSelection(이미지 등 블록 선택)이면 표시 안 함
						if (selection.constructor.name === 'NodeSelection') return false;
						// 텍스트가 실제로 선택된 경우에만 표시
						const { from, to } = selection;
						return from !== to;
					},
				}),
				TiptapTable.configure({ resizable: false }),
				TableRowExt,
				TableHeaderExt,
				TableCellExt,
				TaskList,
				TaskItem.configure({ nested: true }),
				BubbleMenuExt.configure({
					element: tableBubbleMenuElement,
					tippyOptions: { duration: 100 },
					shouldShow: ({ editor }) => editor.isActive('table'),
				}),
				Placeholder.configure({
					placeholder: '여기를 클릭하여 작성을 시작하세요... (/ 를 입력하면 블록을 추가할 수 있어요)',
				}),
			],
			content: markdownText,
			onUpdate: ({ editor }) => {
				// Tiptap → markdownText 동기화
				const md = (editor.storage as any).markdown.getMarkdown();
				if (md !== markdownText) {
					markdownText = md;
				}
			},
			editorProps: {
				attributes: {
					class: 'tiptap-editor-content',
				},
				handleKeyDown: (view, event) => {
					// "/" 입력 시 slash command 메뉴 표시
					if (event.key === '/') {
						const { state } = view;
						const selFrom = state.selection.$from;
						const isEmptyParagraph = selFrom.node().type.name === 'paragraph' && selFrom.node().textContent === '';
						if (isEmptyParagraph) {
							const coords = view.coordsAtPos(selFrom.pos);
							const containerRect = editorContainer?.getBoundingClientRect();
							slashMenuPos = {
								x: coords.left - (containerRect?.left ?? 0),
								y: coords.bottom - (containerRect?.top ?? 0) + 8
							};
							slashMenuFilter = '';
							slashMenuVisible = true;
							return false; // "/" 문자는 그대로 입력되도록 허용
						}
					}
					// 슬래시 메뉴가 열려 있을 때
					if (slashMenuVisible) {
						if (event.key === 'Escape') {
							slashMenuVisible = false;
							// "/" 삭제
							view.dispatch(view.state.tr.delete(view.state.selection.from - 1, view.state.selection.from));
							return true;
						}
						if (event.key === 'Backspace') {
							slashMenuVisible = false;
							return false;
						}
					}
					return false;
				},
				handleDOMEvents: {
					drop: (view, event) => {
						const files = Array.from((event as DragEvent).dataTransfer?.files || []);
						const imageFiles = files.filter(f => f.type.startsWith('image/'));
						if (imageFiles.length === 0) return false;

						event.preventDefault();

						imageFiles.forEach(file => {
							insertImageToTiptap(file);
						});
						return true;
					},
					paste: (view, event) => {
						const clipboardData = (event as ClipboardEvent).clipboardData;
						const items = Array.from(clipboardData?.items || []);
						const imageItem = items.find(item => item.type.startsWith('image/'));
						if (imageItem) {
							event.preventDefault();
							const file = imageItem.getAsFile();
							if (file) insertImageToTiptap(file);
							return true;
						}
						// Only override when HTML is also present (VS Code/editor HTML bleeding).
						// Plain-text-only pastes are handled natively by tiptap-markdown —
						// calling view.pasteText() on those causes '\' to appear on every line.
						const types = clipboardData?.types ?? [];
						if (types.includes('text/html') && types.includes('text/plain')) {
							const text = clipboardData!.getData('text/plain');
							if (text) {
								event.preventDefault();
								view.pasteText(text);
								return true;
							}
						}
						return false;
					},
				},
			},
		});
	}

	function destroyTiptap() {
		if (tiptapEditor) {
			tiptapEditor.destroy();
			tiptapEditor = null;
		}
	}

	function handleLinkToggle() {
		if (!tiptapEditor) return;
		if (tiptapEditor.isActive('link')) {
			tiptapEditor.chain().focus().unsetLink().run();
		} else {
			const url = window.prompt('링크 URL을 입력하세요:', 'https://');
			if (url && url !== 'https://') {
				tiptapEditor.chain().focus().setLink({ href: url }).run();
			}
		}
	}

	// ===== SLASH COMMAND =====
	function executeSlashCommand(action: () => void) {
		if (!tiptapEditor) return;
		// "/" 문자 삭제 후 명령 실행
		const { from } = tiptapEditor.state.selection;
		tiptapEditor.chain()
			.focus()
			.deleteRange({ from: from - 1, to: from })
			.run();
		action();
		slashMenuVisible = false;
	}

	const slashCommands = [
		{ label: '제목 1', icon: 'H1', action: () => tiptapEditor?.chain().focus().toggleHeading({ level: 1 }).run() },
		{ label: '제목 2', icon: 'H2', action: () => tiptapEditor?.chain().focus().toggleHeading({ level: 2 }).run() },
		{ label: '제목 3', icon: 'H3', action: () => tiptapEditor?.chain().focus().toggleHeading({ level: 3 }).run() },
		{ label: '글머리 기호', icon: '•', action: () => tiptapEditor?.chain().focus().toggleBulletList().run() },
		{ label: '번호 목록', icon: '1.', action: () => tiptapEditor?.chain().focus().toggleOrderedList().run() },
		{ label: '체크리스트', icon: '☑', action: () => tiptapEditor?.chain().focus().toggleTaskList().run() },
		{ label: '코드 블록', icon: '</>', action: () => tiptapEditor?.chain().focus().toggleCodeBlock().run() },
		{ label: '인용구', icon: '❝', action: () => tiptapEditor?.chain().focus().toggleBlockquote().run() },
		{ label: '표 삽입', icon: '⊞', action: () => {
			tablePickerVisible = true;
			tablePickerHover = { rows: 0, cols: 0 };
		}},
		{ label: '구분선', icon: '—', action: () => tiptapEditor?.chain().focus().setHorizontalRule().run() },
	];

	$: filteredSlashCommands = slashCommands.filter(cmd =>
		cmd.label.toLowerCase().includes(slashMenuFilter.toLowerCase())
	);

	function insertTableFromPicker(rows: number, cols: number) {
		if (!tiptapEditor) return;
		const { from } = tiptapEditor.state.selection;
		tiptapEditor.chain()
			.focus()
			.deleteRange({ from: from - 1, to: from })
			.insertTable({ rows, cols, withHeaderRow: true })
			.run();
		tablePickerVisible = false;
		slashMenuVisible = false;
	}

	function cycleDocumentWidth() {
		const widths: Array<'normal' | 'wide' | 'full'> = ['normal', 'wide', 'full'];
		const idx = widths.indexOf(documentWidth);
		documentWidth = widths[(idx + 1) % widths.length];
	}

	// ===== VIEW MODE =====
	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	// ===== EXPORT FUNCTIONS =====
	function toggleExportDropdown() {
		showExportDropdown = !showExportDropdown;
	}

	function closeExportDropdown() {
		showExportDropdown = false;
	}

	function exportAsMarkdown() {
		saveFileToLocal();
		closeExportDropdown();
	}

	function exportAsPDF() {
		downloadPDF();
		closeExportDropdown();
	}

	function openImagePicker() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.multiple = true;
		input.onchange = async (e) => {
			const files = Array.from((e.target as HTMLInputElement).files || []);
			for (const file of files) {
				await insertImageToTiptap(file);
			}
		};
		input.click();
	}

	async function downloadPDF() {
		if (!browser) return;

		try {
			saveStatus = 'saving';

			// Get the rendered HTML content — always render from markdownText source of truth
			// (in document mode, Tiptap manages DOM so we re-render from markdown)
			if (tiptapEditor) {
				markdownText = (tiptapEditor.storage as any).markdown.getMarkdown();
			}
			const rawHtml = marked(markdownText);
			const previewContent = browser ? DOMPurify.sanitize(typeof rawHtml === 'string' ? rawHtml : String(rawHtml)) : String(rawHtml);
			
			// Create a new window for printing
			const printWindow = window.open('', '_blank');
			
			if (!printWindow) {
				toastStore.show('팝업이 차단되었습니다. 팝업을 허용해주세요.', 'error');
				saveStatus = 'saved';
				return;
			}
			
			// Create complete HTML document with exact preview styles
			// Create cleaner PDF title by removing .md extension
			const pdfTitle = currentFileName.replace(/\.md$/, '').replace(/^untitled$/, '마크다운 문서');
			const htmlContent = '<!DOCTYPE html>' +
				'<html>' +
				'<head>' +
				'<title>' + pdfTitle + '</title>' +
				'<meta charset="utf-8">' +
				'<style>' +
				// Basic settings
				'* { box-sizing: border-box; }' +
				'body { margin: 20px; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; background: white; color: #000; }' +
				
				// Title styles matching preview
				'h1, h2, h3, h4, h5, h6 { color: #2c3e50; margin-top: 1.5em; margin-bottom: 0.5em; }' +
				'h1 { border-bottom: 2px solid #3498db; padding-bottom: 0.3em; }' +
				'h2 { border-bottom: 1px solid #bdc3c7; padding-bottom: 0.3em; }' +
				
				// Blockquote styles (matching preview)
				'blockquote { border-left: 4px solid #3498db; padding-left: 1rem; margin: 1rem 0; color: #7f8c8d; background: #f8f9fa; padding: 0.5rem 1rem; }' +
				
				// Code styles (matching preview)
				'code { background: #f1f2f6; padding: 0.2em 0.4em; border-radius: 3px; font-family: "Monaco", "Menlo", monospace; font-size: 0.9em; }' +
				'pre { background: #2c3e50; color: #ecf0f1; padding: 1rem; border-radius: 4px; overflow-x: auto; margin: 1rem 0; }' +
				'pre code { background: none; padding: 0; color: inherit; }' +
				
				// Table styles (matching preview)
				'table { border-collapse: collapse; width: 100%; margin: 1rem 0; }' +
				'th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }' +
				'th { background-color: #f8f9fa !important; font-weight: 600; }' +
				'td[colspan] { text-align: center; font-weight: bold; background-color: #f8f9fa !important; }' +
				'td[style*="background-color"] { -webkit-print-color-adjust: exact !important; }' +
				
				// Link styles (matching preview)
				'a { color: #3498db; text-decoration: none; }' +
				'a:hover { text-decoration: underline; }' +
				
				// List styles (matching preview)
				'ul, ol { padding-left: 1.5rem; }' +
				'li { margin: 0.25rem 0; }' +
				
				// Image and Figure styles
				'img { max-width: 100%; height: auto; display: block; }' +
				'figure { margin: 1rem 0; text-align: center; }' +
				'figcaption { font-size: 0.9em; color: #666; margin-top: 0.5rem; font-style: italic; }' +
				'div[align="center"] { text-align: center; margin: 1rem 0; }' +
				
				// Print-specific styles
				'@media print {' +
				'@page { margin: 10mm; size: A4; }' +
				'body { margin: 0; padding: 0; -webkit-print-color-adjust: exact; orphans: 3; widows: 3; line-height: 1.4; }' +
				'h1, h2, h3, h4, h5, h6 { margin-top: 0.8em; margin-bottom: 0.3em; page-break-after: avoid; page-break-inside: avoid; orphans: 3; widows: 3; }' +
				'h1 { padding-bottom: 0.2em; }' +
				'h2 { padding-bottom: 0.2em; }' +
				'p { margin: 0.4em 0; orphans: 3; widows: 3; }' +
				'blockquote { margin: 0.6em 0; padding: 0.3em 0.8em; page-break-inside: avoid; }' +
				'pre { margin: 0.6em 0; padding: 0.6em; page-break-inside: avoid; }' +
				'code { padding: 0.1em 0.3em; }' +
				'table { margin: 0.6em 0; page-break-inside: avoid; }' +
				'tr { page-break-inside: avoid; page-break-after: auto; }' +
				'th, td { padding: 0.3em; }' +
				'ul, ol { margin: 0.4em 0; padding-left: 1.2em; page-break-before: avoid; }' +
				'li { margin: 0.1em 0; page-break-inside: avoid; }' +
				'img { page-break-inside: avoid; max-height: 85vh; }' +
				'figure { margin: 0.6em 0; page-break-inside: avoid; }' +
				'.print-buttons { display: none !important; }' +
				'}' +
				'</style>' +
				'</head>' +
				'<body>' +
				previewContent +
				'<script>' +
				'window.onload = function() {' +
				'document.title = "' + pdfTitle + '";' +
				'};' +
				'function printDocument() {' +
				'window.print();' +
				'}' +
				'function closeWindow() {' +
				'window.close();' +
				'}' +
				'</' + 'script>' +
				'<div class="print-buttons" style="position: fixed; top: 10px; right: 10px; z-index: 1000; background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">' +
				'<button onclick="printDocument()" style="background: #3498db; color: white; border: none; padding: 8px 16px; margin-right: 8px; border-radius: 4px; cursor: pointer;">📄 인쇄/PDF로 저장</button>' +
				'<button onclick="closeWindow()" style="background: #e74c3c; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">❌ 닫기</button>' +
				'</div>' +
				'</body>' +
				'</html>';
			
			printWindow.document.write(htmlContent);
			printWindow.document.close();
			
			saveStatus = 'saved';
			
		} catch (error) {
			console.error('PDF 생성 중 오류가 발생했습니다:', error);
			toastStore.show('PDF 생성 중 오류가 발생했습니다: ' + (error instanceof Error ? error.message : String(error)), 'error');
			saveStatus = 'saved';
		}
	}

	// ===== DOCX EXPORT =====
	async function exportAsDocx() {
		try {
			saveStatus = 'saving';

			// Parse markdown into tokens
			const tokens = marked.lexer(markdownText);
			const children: any[] = [];

			// Helper function to convert HTML back to markdown for parsing
			function htmlToMarkdown(html: string): string {
				return html
					.replace(/<strong>(.*?)<\/strong>/g, '**$1**')
					.replace(/<b>(.*?)<\/b>/g, '**$1**')
					.replace(/<em>(.*?)<\/em>/g, '*$1*')
					.replace(/<i>(.*?)<\/i>/g, '*$1*')
					.replace(/<code>(.*?)<\/code>/g, '`$1`')
					.replace(/<[^>]*>/g, ''); // Remove remaining HTML tags
			}

			// Helper function to parse inline text (bold, italic, links, etc.)
			function parseInlineText(text: string): TextRun[] {
				const runs: TextRun[] = [];

				// Simple regex patterns for inline formatting
				const boldPattern = /\*\*(.+?)\*\*/g;
				const italicPattern = /\*(.+?)\*/g;
				const codePattern = /`(.+?)`/g;

				let lastIndex = 0;
				let segments: {text: string, bold?: boolean, italic?: boolean, code?: boolean}[] = [];

				// Split by bold
				let match;
				let tempText = text;

				// Extract bold text
				while ((match = boldPattern.exec(text)) !== null) {
					const before = text.substring(lastIndex, match.index);
					if (before) segments.push({text: before});
					segments.push({text: match[1], bold: true});
					lastIndex = match.index + match[0].length;
				}
				const remaining = text.substring(lastIndex);
				if (remaining) segments.push({text: remaining});

				// Process each segment for italic and code
				const finalRuns: TextRun[] = [];
				for (const seg of segments) {
					if (seg.bold) {
						finalRuns.push(new TextRun({text: seg.text, bold: true}));
					} else {
						// Check for italic and code in non-bold segments
						const italicMatches = seg.text.match(italicPattern);
						const codeMatches = seg.text.match(codePattern);

						if (italicMatches || codeMatches) {
							// For simplicity, just handle basic cases
							const parts = seg.text.split(/(\*[^*]+\*|`[^`]+`)/);
							for (const part of parts) {
								if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
									finalRuns.push(new TextRun({text: part.slice(1, -1), italics: true}));
								} else if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
									finalRuns.push(new TextRun({text: part.slice(1, -1), font: 'Courier New'}));
								} else if (part) {
									finalRuns.push(new TextRun({text: part}));
								}
							}
						} else {
							finalRuns.push(new TextRun({text: seg.text}));
						}
					}
				}

				return finalRuns.length > 0 ? finalRuns : [new TextRun({text: text})];
			}

			// Process tokens
			for (const token of tokens) {
				switch (token.type) {
					case 'heading':
						const headingLevels = [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3, HeadingLevel.HEADING_4, HeadingLevel.HEADING_5, HeadingLevel.HEADING_6];
						const headingRuns = parseInlineText(token.text);
						children.push(new Paragraph({
							children: headingRuns,
							heading: headingLevels[token.depth - 1] || HeadingLevel.HEADING_1,
							spacing: { before: 200, after: 100 }
						}));
						break;

					case 'paragraph':
						const runs = parseInlineText(token.text);
						children.push(new Paragraph({
							children: runs,
							spacing: { after: 100 }
						}));
						break;

					case 'list':
						const listItems = token.items || [];
						for (const item of listItems) {
							const cellText = htmlToMarkdown(item.text);
							const runs = parseInlineText(cellText);
							children.push(new Paragraph({
								children: runs,
								bullet: token.ordered ? undefined : { level: 0 },
								numbering: token.ordered ? { reference: 'default-numbering', level: 0 } : undefined,
								spacing: { after: 50 }
							}));
						}
						break;

					case 'table':
						if (token.header && token.rows) {
							const tableRows: TableRow[] = [];

							// Header row
							const headerCells = token.header.map((cell: any) => {
								const cellText = htmlToMarkdown(cell.text);
								const runs = parseInlineText(cellText);
								return new TableCell({
									children: [new Paragraph({
										children: runs,
										alignment: AlignmentType.CENTER
									})],
									shading: { fill: 'E8E8E8' },
									width: { size: 100 / token.header.length, type: WidthType.PERCENTAGE }
								});
							});
							tableRows.push(new TableRow({ children: headerCells }));

							// Data rows
							for (const row of token.rows) {
								const cells = row.map((cell: any) => {
									const cellText = htmlToMarkdown(cell.text);
									const runs = parseInlineText(cellText);
									return new TableCell({
										children: [new Paragraph({
											children: runs
										})],
										width: { size: 100 / row.length, type: WidthType.PERCENTAGE }
									});
								});
								tableRows.push(new TableRow({ children: cells }));
							}

							children.push(new Table({
								rows: tableRows,
								width: { size: 100, type: WidthType.PERCENTAGE },
								borders: {
									top: { style: BorderStyle.SINGLE, size: 1 },
									bottom: { style: BorderStyle.SINGLE, size: 1 },
									left: { style: BorderStyle.SINGLE, size: 1 },
									right: { style: BorderStyle.SINGLE, size: 1 },
									insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
									insideVertical: { style: BorderStyle.SINGLE, size: 1 }
								}
							}));
						}
						break;

					case 'code':
						children.push(new Paragraph({
							text: token.text,
							style: 'code',
							spacing: { before: 100, after: 100 }
						}));
						break;

					case 'blockquote':
						const quoteText = htmlToMarkdown(token.text);
						const quoteRuns = parseInlineText(quoteText);
						children.push(new Paragraph({
							children: quoteRuns,
							indent: { left: 720 }, // 0.5 inch
							spacing: { before: 100, after: 100 }
						}));
						break;

					case 'space':
						children.push(new Paragraph({ text: '' }));
						break;
				}
			}

			// Create document
			const doc = new Document({
				sections: [{
					properties: {},
					children: children
				}],
				numbering: {
					config: [{
						reference: 'default-numbering',
						levels: [
							{
								level: 0,
								format: 'decimal',
								text: '%1.',
								alignment: AlignmentType.LEFT
							}
						]
					}]
				}
			});

			// Generate and download
			const blob = await Packer.toBlob(doc);
			const docxFileName = currentFileName.replace(/\.md$/, '') + '.docx';
			saveAs(blob, docxFileName);

			toastStore.show(`${docxFileName} 다운로드 완료`, 'success');
			saveStatus = 'saved';
			closeExportDropdown();

		} catch (error) {
			console.error('DOCX 생성 중 오류:', error);
			toastStore.show('DOCX 생성 중 오류가 발생했습니다: ' + (error instanceof Error ? error.message : String(error)), 'error');
			saveStatus = 'saved';
		}
	}

	onMount(() => {
		updatePreview();
		loadFromLocal(); // Check saved content on page load
		startAutoSave(); // Start auto-save with 5-minute interval
		themeStore.init(); // Initialize theme
		// Initialize Tiptap for the default document mode
		setTimeout(() => initTiptap(), 50);

		// Handle Ctrl+S to save to localStorage
		const handleKeydown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault();
				manualSave();
			}
			if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
				e.preventDefault();
				openLocalFile();
			}
			if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
				const target = e.target as HTMLElement;
				if (target.tagName !== 'TEXTAREA' && target.tagName !== 'INPUT') {
					e.preventDefault();
					showShortcutsModal = !showShortcutsModal;
				}
			}
			if (e.key === 'Escape') {
				showShortcutsModal = false;
			}
		};

		// Close dropdown when clicking outside
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element;
			if (!target.closest('.export-dropdown')) {
				showExportDropdown = false;
			}
			if (!target.closest('.bubble-color-group')) {
				showColorPicker = false;
				showHighlightPicker = false;
			}
		};

		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('click', handleClickOutside);
			stopAutoSave(); // Cleanup auto-save on component unmount
		};
	});

	// Track previous text to only change to unsaved state on actual changes
	let previousText = markdownText;
	
	$: if (markdownText !== undefined) {
		schedulePreviewUpdate();
		// Only change to unsaved if text actually changed and currently saved
		if (markdownText !== previousText && saveStatus === 'saved') {
			saveStatus = 'unsaved';
			previousText = markdownText;
		}
	}
	
	// Cleanup function to prevent memory leaks
	onDestroy(() => {
		destroyTiptap();
		// Clear imageMap on component destruction
		imageMap.clear();
		// Clear debounce timers
		if (debounceTimer) clearTimeout(debounceTimer);
		if (previewDebounceTimer) clearTimeout(previewDebounceTimer);
		// Stop any running intervals
		stopAutoSave();
	});
</script>

<svelte:head>
	<title>이지 마크다운 - EasyMD | 무료 실시간 마크다운 에디터</title>

	<!-- SEO Meta Tags -->
	<meta name="description" content="브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원. 로그인 불필요, 개인정보 수집 없음." />
	<meta name="keywords" content="마크다운, 마크다운 에디터, markdown, markdown editor, 실시간 미리보기, 무료 에디터, 온라인 에디터, PDF 변환" />
	<meta name="author" content="Sanchez Kim" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://easymd.netlify.app/" />
	<meta property="og:title" content="이지 마크다운 - EasyMD | 무료 실시간 마크다운 에디터" />
	<meta property="og:description" content="브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원." />
	<meta property="og:image" content="https://easymd.netlify.app/og-image.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://easymd.netlify.app/" />
	<meta property="twitter:title" content="이지 마크다운 - EasyMD | 무료 실시간 마크다운 에디터" />
	<meta property="twitter:description" content="브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원." />
	<meta property="twitter:image" content="https://easymd.netlify.app/og-image.png" />

</svelte:head>

<Toast />

{#if showShortcutsModal}
	<div class="modal-overlay" on:click={() => showShortcutsModal = false} role="dialog" aria-modal="true">
		<div class="modal-content" on:click|stopPropagation role="document">
			<div class="modal-header">
				<h2>⌨️ 키보드 단축키</h2>
				<button class="modal-close" on:click={() => showShortcutsModal = false} aria-label="닫기">
					×
				</button>
			</div>
			<div class="modal-body">
				<div class="shortcut-section">
					<h3>파일 작업</h3>
					<div class="shortcut-item">
						<kbd>Ctrl</kbd> + <kbd>S</kbd>
						<span>저장</span>
					</div>
					<div class="shortcut-item">
						<kbd>Ctrl</kbd> + <kbd>O</kbd>
						<span>파일 열기</span>
					</div>
					<div class="shortcut-item">
						<kbd>Ctrl</kbd> + <kbd>V</kbd>
						<span>이미지 붙여넣기</span>
					</div>
				</div>
				<div class="shortcut-section">
					<h3>편집</h3>
					<div class="shortcut-item">
						<kbd>Enter</kbd>
						<span>파일명 변경 완료</span>
					</div>
					<div class="shortcut-item">
						<kbd>Escape</kbd>
						<span>변경 취소 / 모달 닫기</span>
					</div>
				</div>
				<div class="shortcut-section">
					<h3>도움말</h3>
					<div class="shortcut-item">
						<kbd>?</kbd>
						<span>이 가이드 열기/닫기</span>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="app">
	<header class="header">
		<div class="title-section">
			<h1>
				<img src="/logo.svg" alt="EasyMD Logo" class="logo-icon" />
				이지 마크다운
			</h1>
			<div class="status-info">
				{#if isEditingFilename}
					<input 
						type="text" 
						bind:value={tempFileName}
						on:keydown={handleFilenameKeydown}
						on:blur={finishEditingFilename}
						class="filename-input"
						placeholder="파일명을 입력하세요"
						autofocus
					>
				{:else}
					<span 
						class="filename clickable" 
						on:click={startEditingFilename}
						on:keydown={(e) => e.key === 'Enter' && startEditingFilename()}
						title="클릭하여 파일명 변경"
						tabindex="0"
						role="button"
					>
						{currentFileName}
					</span>
				{/if}
				<span class="save-status" class:unsaved={saveStatus === 'unsaved'} class:saving={saveStatus === 'saving'}>
					{#if saveStatus === 'saved'}
						✅ 저장됨 {lastSaved ? `(${lastSaved})` : ''}
					{:else if saveStatus === 'saving'}
						💾 저장 중...
					{:else}
						⚠️ 저장되지 않음
					{/if}
				</span>
			</div>
		</div>
		<button class="mobile-menu-toggle" on:click={toggleMobileMenu} aria-label="메뉴 열기">
			{showMobileMenu ? '✕' : '☰'}
		</button>
		<div class="controls" class:mobile-open={showMobileMenu}>
			<input
				type="file"
				accept=".md,.markdown"
				on:change={handleFileUpload}
				id="file-input"
				style="display: none;"
			>
			<button on:click={newDocument} title="새 문서 시작">
				🆕 새 문서
			</button>
			<button on:click={openLocalFile} title="마크다운 파일 불러오기 (Ctrl+O)">
				📂 불러오기
			</button>
			<button on:click={manualSave} title="로컬스토리지에 저장 (Ctrl+S)">
				💾 저장
			</button>
			<button on:click={openImagePicker} title="이미지 파일 추가">
				🖼️ 이미지
			</button>
			<div class="export-dropdown" class:show={showExportDropdown}>
				<button on:click={toggleExportDropdown} class="dropdown-toggle" title="문서 내보내기">
					📁 내보내기 ▼
				</button>
				{#if showExportDropdown}
					<div class="dropdown-menu">
						<button on:click={exportAsMarkdown} class="dropdown-item">
							📝 마크다운 파일 (.md)
						</button>
						<button on:click={exportAsPDF} class="dropdown-item">
							📄 PDF 문서 (.pdf)
						</button>
						<button on:click={exportAsDocx} class="dropdown-item">
							📘 한글 문서 (.docx)
						</button>
					</div>
				{/if}
			</div>
			<button on:click={cycleDocumentWidth} class="width-button" title="문서 너비 변경">
				{documentWidth === 'normal' ? '↔ 보통' : documentWidth === 'wide' ? '↔ 넓게' : '↔ 전체'}
			</button>
			<button
				on:click={() => themeStore.toggle()}
				class="theme-button"
				title="다크 모드 {$themeStore === 'dark' ? '끄기' : '켜기'}"
			>
				{$themeStore === 'dark' ? '☀️' : '🌙'} 테마
			</button>
			<a
				href="https://buymeacoffee.com/sanchezkim7"
				target="_blank"
				rel="noopener noreferrer"
				class="sponsor-button"
				title="개발자에게 커피 한 잔 사주기"
			>
				☕ 후원
			</a>
		</div>
	</header>

	<main class="main">
		<!-- Bubble Menu (텍스트 선택 시 표시) -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div bind:this={bubbleMenuElement} class="bubble-menu">
			<!-- 그룹 1: 기본 서식 -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleBold().run()}
					class:active={tiptapEditor?.isActive('bold')} title="굵게">
				<strong>B</strong>
			</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleItalic().run()}
					class:active={tiptapEditor?.isActive('italic')} title="기울임">
				<em>I</em>
			</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleUnderline().run()}
					class:active={tiptapEditor?.isActive('underline')} title="밑줄"
					style="text-decoration: underline;">
				U
			</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleStrike().run()}
					class:active={tiptapEditor?.isActive('strike')} title="취소선"
					style="text-decoration: line-through;">
				S
			</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleCode().run()}
					class:active={tiptapEditor?.isActive('code')} title="인라인 코드">
				<code>`</code>
			</button>

			<div class="bubble-separator"></div>

			<!-- 그룹 2: 색상 -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="bubble-color-group">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button
					class="bubble-color-btn"
					class:active={showColorPicker}
					title="글자 색상"
					on:click|stopPropagation={() => { showColorPicker = !showColorPicker; showHighlightPicker = false; }}
				>
					<span class="color-icon" style="border-bottom: 3px solid {tiptapEditor?.getAttributes('textStyle').color || '#ecf0f1'};">A</span>
				</button>
				{#if showColorPicker}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="color-picker-popup" on:click|stopPropagation>
						{#each TEXT_COLORS as color}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<button
								class="color-swatch"
								style="background: {color.value || 'transparent'}; {color.value === '' ? 'border: 2px solid #ccc;' : ''}"
								title={color.label}
								on:click={() => {
									if (color.value) {
										tiptapEditor?.chain().focus().setColor(color.value).run();
									} else {
										tiptapEditor?.chain().focus().unsetColor().run();
									}
									showColorPicker = false;
								}}
							>
								{#if color.value === ''}✕{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="bubble-color-group">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button
					class="bubble-color-btn"
					class:active={showHighlightPicker}
					title="글자 배경색"
					on:click|stopPropagation={() => { showHighlightPicker = !showHighlightPicker; showColorPicker = false; }}
				>
					<span class="highlight-icon" style="background: {tiptapEditor?.getAttributes('highlight').color || 'transparent'};">H</span>
				</button>
				{#if showHighlightPicker}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="color-picker-popup" on:click|stopPropagation>
						{#each HIGHLIGHT_COLORS as color}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<button
								class="color-swatch"
								style="background: {color.value || 'transparent'}; {color.value === '' ? 'border: 2px solid #ccc;' : ''}"
								title={color.label}
								on:click={() => {
									if (color.value) {
										tiptapEditor?.chain().focus().setHighlight({ color: color.value }).run();
									} else {
										tiptapEditor?.chain().focus().unsetHighlight().run();
									}
									showHighlightPicker = false;
								}}
							>
								{#if color.value === ''}✕{/if}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="bubble-separator"></div>

			<!-- 그룹 3: 헤딩 -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleHeading({level: 1}).run()}
					class:active={tiptapEditor?.isActive('heading', {level: 1})}>H1</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleHeading({level: 2}).run()}
					class:active={tiptapEditor?.isActive('heading', {level: 2})}>H2</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleHeading({level: 3}).run()}
					class:active={tiptapEditor?.isActive('heading', {level: 3})}>H3</button>

			<div class="bubble-separator"></div>

			<!-- 그룹 4: 기타 -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().toggleBulletList().run()}
					class:active={tiptapEditor?.isActive('bulletList')} title="글머리 기호">•</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={handleLinkToggle}
					class:active={tiptapEditor?.isActive('link')} title="링크">🔗</button>
		</div>

		<!-- Table Bubble Menu (표 셀 안에 커서가 있을 때 표시) -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div bind:this={tableBubbleMenuElement} class="table-bubble-menu">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().addRowBefore().run()} title="위에 행 추가">↑행</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().addRowAfter().run()} title="아래에 행 추가">↓행</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().deleteRow().run()} title="행 삭제" class="danger">행✕</button>
			<div class="bubble-separator"></div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().addColumnBefore().run()} title="왼쪽에 열 추가">←열</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().addColumnAfter().run()} title="오른쪽에 열 추가">열→</button>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().deleteColumn().run()} title="열 삭제" class="danger">열✕</button>
			<div class="bubble-separator"></div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<button on:click={() => tiptapEditor?.chain().focus().deleteTable().run()} title="표 삭제" class="danger">표 삭제</button>
		</div>

		<!-- Slash Command Menu (/를 빈 줄에서 입력 시 표시) -->
		{#if slashMenuVisible}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="slash-menu" style="left: {slashMenuPos.x}px; top: {slashMenuPos.y}px;"
				 on:mousedown|preventDefault>
				{#if tablePickerVisible}
					<div class="table-picker">
						<div class="table-picker-label">
							{tablePickerHover.rows > 0 ? `${tablePickerHover.rows} × ${tablePickerHover.cols}` : '크기 선택'}
						</div>
						<div class="table-picker-grid">
							{#each {length: 6} as _, r}
								<div class="table-picker-row">
									{#each {length: 6} as _, c}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<div
											class="table-picker-cell"
											class:highlighted={r < tablePickerHover.rows && c < tablePickerHover.cols}
											on:mouseenter={() => tablePickerHover = { rows: r + 1, cols: c + 1 }}
											on:click={() => insertTableFromPicker(r + 1, c + 1)}
											role="button"
											tabindex="0"
										/>
									{/each}
								</div>
							{/each}
						</div>
					</div>
				{:else}
					<div class="slash-menu-header">블록 추가</div>
					{#each filteredSlashCommands as cmd}
						{#if cmd.label === '표 삽입'}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<button class="slash-menu-item" on:click={() => { tablePickerVisible = true; tablePickerHover = { rows: 0, cols: 0 }; }}>
								<span class="slash-menu-icon">{cmd.icon}</span>
								<span>{cmd.label}</span>
							</button>
						{:else}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<button class="slash-menu-item" on:click={() => executeSlashCommand(cmd.action)}>
								<span class="slash-menu-icon">{cmd.icon}</span>
								<span>{cmd.label}</span>
							</button>
						{/if}
					{/each}
				{/if}
			</div>
		{/if}

		<!-- Tiptap 에디터 컨테이너 -->
		<div bind:this={editorContainer} class="document-view tiptap-container" style="max-width: {WIDTH_MAP[documentWidth]}"></div>
	</main>

	<!-- Legal Footer -->
	<footer class="legal-footer">
		<div class="footer-content">
			<div class="footer-links">
				<a href="/about">소개</a>
				<span class="separator">|</span>
				<a href="/privacy">개인정보처리방침</a>
				<span class="separator">|</span>
				<a href="/terms">이용약관</a>
				<span class="separator">|</span>
				<a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">GitHub</a>
			</div>
			<div class="footer-copyright">
				© 2025 이지 마크다운 (EasyMD)
			</div>
		</div>
	</footer>
</div>

<style>
	:global(:root) {
		--bg-primary: #f5f5f5;
		--bg-secondary: #ffffff;
		--bg-tertiary: #fefefe;
		--bg-quaternary: #ecf0f1;
		--bg-header: #2c3e50;
		--text-primary: #000000;
		--text-secondary: #1f2937;
		--text-tertiary: #7f8c8d;
		--text-header: #2c3e50;
		--border-color: #ddd;
		--border-color-light: #bdc3c7;
		--code-bg: #f1f2f6;
		--code-text: #2c3e50;
		--blockquote-bg: #f8f9fa;
		--table-header-bg: #f8f9fa;
		--ad-bg: #f8f9fa;
	}

	:global(html.dark) {
		--bg-primary: #1a1a1a;
		--bg-secondary: #242424;
		--bg-tertiary: #2a2a2a;
		--bg-quaternary: #333333;
		--bg-header: #1a1a1a;
		--text-primary: #e0e0e0;
		--text-secondary: #d0d0d0;
		--text-tertiary: #a0a0a0;
		--text-header: #e0e0e0;
		--border-color: #404040;
		--border-color-light: #505050;
		--code-bg: #2a2a2a;
		--code-text: #e0e0e0;
		--blockquote-bg: #2a2a2a;
		--table-header-bg: #2a2a2a;
		--ad-bg: #242424;
	}

	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background-color: var(--bg-primary);
		color: var(--text-primary);
		transition: background-color 0.3s, color 0.3s;
	}

	.app {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.header {
		background: var(--bg-header);
		color: white;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
		transition: background-color 0.3s;
	}

	.title-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.header h1 {
		margin: 0;
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.logo-icon {
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
	}

	.status-info {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		font-size: 0.85rem;
	}

	.filename {
		font-weight: 600;
		color: #ecf0f1;
	}

	.filename.clickable {
		cursor: pointer;
		padding: 2px 6px;
		border-radius: 4px;
		transition: background-color 0.2s ease;
		display: inline-block;
	}

	.filename.clickable:hover {
		background-color: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.filename.clickable:focus {
		outline: 2px solid #3498db;
		outline-offset: 2px;
	}

	.filename-input {
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid #3498db;
		color: #ffffff;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.85rem;
		font-weight: 600;
		font-family: inherit;
		min-width: 150px;
	}

	.filename-input:focus {
		outline: none;
		border-color: #ffffff;
		background: rgba(255, 255, 255, 0.15);
	}

	.filename-input::placeholder {
		color: rgba(255, 255, 255, 0.6);
	}

	.save-status {
		color: #a8d5a8;
		font-size: 0.8rem;
	}

	.save-status.unsaved {
		color: #ffb3b3;
	}

	.save-status.saving {
		color: #ffd700;
	}

	.mobile-menu-toggle {
		display: none;
		background: #3498db;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1.2rem;
		transition: background-color 0.2s;
	}

	.mobile-menu-toggle:hover {
		background: #2980b9;
	}

	.controls {
		display: flex;
		gap: 0.5rem;
	}

	.controls button {
		background: #3498db;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.controls button:hover {
		background: #2980b9;
	}


	.theme-button {
		transition: all 0.3s ease;
	}

	.theme-button:hover {
		transform: scale(1.05);
	}

	.sponsor-button {
		background: #FFDD00;
		color: #000000;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.sponsor-button:hover {
		background: #FFED4E;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	.sponsor-button:active {
		transform: translateY(0);
	}

	.export-dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-toggle {
		background: #3498db;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background-color 0.2s;
	}

	.dropdown-toggle:hover {
		background: #2980b9;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		min-width: 200px;
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 1000;
		margin-top: 4px;
	}

	.dropdown-item {
		width: 100%;
		padding: 0.75rem 1rem;
		background: none;
		border: none;
		text-align: left;
		cursor: pointer;
		font-size: 0.9rem;
		color: #333;
		transition: background-color 0.2s;
		display: block;
	}

	.dropdown-item:first-child {
		border-radius: 4px 4px 0 0;
	}

	.dropdown-item:last-child {
		border-radius: 0 0 4px 4px;
	}

	.dropdown-item:hover {
		background: #f8f9fa;
		color: #2980b9;
	}

	.dropdown-item:not(:last-child) {
		border-bottom: 1px solid #eee;
	}

	.main {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
		overflow-y: auto;
		background: var(--bg-secondary);
	}

	/* Document view (Notion-style) */
	.document-view {
		max-width: 800px;
		margin: 0 auto;
		padding: 40px 60px;
		min-height: calc(100vh - 64px);
		cursor: text;
		font-size: 16px;
		line-height: 1.8;
		color: var(--text-secondary);
		background: var(--bg-secondary);
		transition: background-color 0.3s, color 0.3s;
		width: 100%;
		box-sizing: border-box;
	}

	/* Markdown styling for document-view */
	.document-view :global(h1),
	.document-view :global(h2),
	.document-view :global(h3),
	.document-view :global(h4),
	.document-view :global(h5),
	.document-view :global(h6) {
		color: var(--text-header);
		margin-top: 1.5em;
		margin-bottom: 0.5em;
		transition: color 0.3s;
	}

	.document-view :global(h1) {
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.3em;
	}

	.document-view :global(h2) {
		border-bottom: 1px solid #bdc3c7;
		padding-bottom: 0.3em;
	}

	.document-view :global(blockquote) {
		border-left: 4px solid #3498db;
		padding-left: 1rem;
		margin: 1rem 0;
		color: var(--text-tertiary);
		background: var(--blockquote-bg);
		padding: 0.5rem 1rem;
		transition: background-color 0.3s, color 0.3s;
	}

	.document-view :global(code) {
		background: var(--code-bg);
		color: var(--code-text);
		padding: 0.2em 0.4em;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.9em;
		transition: background-color 0.3s, color 0.3s;
	}

	.document-view :global(pre) {
		background: #2c3e50;
		color: #ecf0f1;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.document-view :global(pre code) {
		background: none;
		padding: 0;
		color: inherit;
	}

	.document-view :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: 1rem 0;
	}

	.document-view :global(th),
	.document-view :global(td) {
		border: 1px solid #ddd;
		padding: 0.5rem;
		text-align: left;
	}

	.document-view :global(th) {
		background-color: #f8f9fa;
		font-weight: 600;
	}

	.document-view :global(a) {
		color: #3498db;
		text-decoration: none;
	}

	.document-view :global(a:hover) {
		text-decoration: underline;
	}

	.document-view :global(ul),
	.document-view :global(ol) {
		padding-left: 1.5rem;
	}

	.document-view :global(li) {
		margin: 0.25rem 0;
	}

	.document-view :global(img) {
		max-width: 100%;
		height: auto;
	}

	/* Modal Styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10000;
		animation: fadeIn 0.2s;
	}

	.modal-content {
		background: var(--bg-secondary);
		border-radius: 12px;
		max-width: 600px;
		width: 90%;
		max-height: 80vh;
		overflow-y: auto;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		animation: slideUp 0.3s;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		border-bottom: 1px solid var(--border-color);
	}

	.modal-header h2 {
		margin: 0;
		color: var(--text-primary);
		font-size: 1.5rem;
	}

	.modal-close {
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: var(--text-tertiary);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.2s;
	}

	.modal-close:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.modal-body {
		padding: 1.5rem;
	}

	.shortcut-section {
		margin-bottom: 1.5rem;
	}

	.shortcut-section h3 {
		color: var(--text-primary);
		margin: 0 0 1rem 0;
		font-size: 1.1rem;
		font-weight: 600;
	}

	.shortcut-item {
		display: flex;
		align-items: center;
		padding: 0.75rem;
		margin-bottom: 0.5rem;
		background: var(--bg-tertiary);
		border-radius: 6px;
		gap: 0.5rem;
		transition: background-color 0.2s;
	}

	.shortcut-item:hover {
		background: var(--bg-quaternary);
	}

	.shortcut-item kbd {
		background: var(--bg-quaternary);
		border: 1px solid var(--border-color);
		border-radius: 4px;
		padding: 0.3rem 0.6rem;
		font-family: monospace;
		font-size: 0.9rem;
		color: var(--text-primary);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.shortcut-item span {
		flex: 1;
		color: var(--text-secondary);
		font-size: 0.95rem;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	/* Legal Footer */
	.legal-footer {
		background: var(--bg-header);
		color: var(--text-tertiary);
		padding: 1.5rem 2rem;
		border-top: 1px solid var(--border-color);
		transition: background-color 0.3s, color 0.3s;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.footer-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.footer-links a {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s;
	}

	.footer-links a:hover {
		color: rgba(255, 255, 255, 1);
		text-decoration: underline;
	}

	.footer-links .separator {
		color: rgba(255, 255, 255, 0.4);
		user-select: none;
	}

	.footer-copyright {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.85rem;
		text-align: center;
	}

	/* ===== TIPTAP EDITOR STYLES ===== */
	.tiptap-container {
		cursor: text;
		position: relative; /* slash menu 절대 위치 기준점 */
	}

	:global(.tiptap-editor-content) {
		outline: none;
		min-height: 100%;
	}

	/* Heading styles in Tiptap */
	:global(.tiptap-editor-content h1) {
		font-size: 2em;
		font-weight: 700;
		margin: 1.5em 0 0.5em;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.3em;
		color: var(--text-header);
	}
	:global(.tiptap-editor-content h2) {
		font-size: 1.5em;
		font-weight: 600;
		margin: 1.3em 0 0.4em;
		border-bottom: 1px solid var(--border-color-light);
		padding-bottom: 0.2em;
		color: var(--text-header);
	}
	:global(.tiptap-editor-content h3) {
		font-size: 1.25em;
		font-weight: 600;
		margin: 1.2em 0 0.3em;
		color: var(--text-header);
	}
	:global(.tiptap-editor-content p) {
		margin: 0.5em 0;
	}
	:global(.tiptap-editor-content ul),
	:global(.tiptap-editor-content ol) {
		padding-left: 1.5em;
	}
	:global(.tiptap-editor-content li) {
		margin: 0.25em 0;
	}
	:global(.tiptap-editor-content code) {
		background: var(--code-bg);
		color: var(--code-text);
		padding: 0.2em 0.4em;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.9em;
	}
	:global(.tiptap-editor-content pre) {
		background: #2c3e50;
		color: #ecf0f1;
		padding: 1em;
		border-radius: 4px;
		overflow-x: auto;
		margin: 1rem 0;
	}
	:global(.tiptap-editor-content pre code) {
		background: none;
		padding: 0;
		color: inherit;
	}
	:global(.tiptap-editor-content blockquote) {
		border-left: 4px solid #3498db;
		padding: 0.5rem 1rem;
		margin: 1em 0;
		color: var(--text-tertiary);
		background: var(--blockquote-bg);
	}
	:global(.tiptap-editor-content table) {
		border-collapse: collapse;
		width: 100%;
		margin: 1em 0;
		table-layout: fixed;
	}
	:global(.tiptap-editor-content th),
	:global(.tiptap-editor-content td) {
		border: 1px solid var(--border-color);
		padding: 0.5em;
		text-align: left;
		word-break: break-word;
		overflow-wrap: break-word;
	}
	:global(.tiptap-editor-content th) {
		background: var(--table-header-bg);
		font-weight: 600;
	}
	:global(.tiptap-editor-content hr) {
		border: none;
		border-top: 2px solid var(--border-color);
		margin: 1.5em 0;
	}
	:global(.tiptap-editor-content a) {
		color: #3498db;
		text-decoration: none;
	}
	:global(.tiptap-editor-content a:hover) {
		text-decoration: underline;
	}
	:global(.tiptap-editor-content img) {
		max-width: 100%;
		height: auto;
	}

	/* Tiptap 에디터 내 이미지 스타일 */
	:global(.tiptap-image) {
		max-width: 100%;
		height: auto;
		border-radius: 4px;
		display: block;
		margin: 0; /* wrapper가 margin을 처리 */
		cursor: default;
	}
	:global(.tiptap-image.ProseMirror-selectednode) {
		outline: 2px solid var(--accent-color, #667eea);
		border-radius: 4px;
	}

	/* 이미지 래퍼 */
	:global(.image-wrapper) {
		position: relative;
		display: inline-block;
		max-width: 100%;
		margin: 1em 0;
		line-height: 0;
		cursor: default;
	}

	/* 이미지 선택 상태 */
	:global(.image-wrapper.image-selected img) {
		outline: 2px solid var(--accent-color, #667eea);
		border-radius: 3px;
	}
	:global(.image-wrapper.image-selected .resize-handle) {
		opacity: 1;
		pointer-events: auto;
	}

	/* 리사이즈 핸들 */
	:global(.resize-handle) {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 10px;
		height: 40px;
		background: var(--accent-color, #667eea);
		border-radius: 4px;
		cursor: ew-resize;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s;
		z-index: 10;
	}
	:global(.image-wrapper:hover .resize-handle),
	:global(.image-wrapper.image-selected .resize-handle) {
		opacity: 0.7;
		pointer-events: auto;
	}
	:global(.resize-handle:hover) {
		opacity: 1 !important;
	}
	:global(.resize-handle-left) {
		left: -5px;
	}
	:global(.resize-handle-right) {
		right: -5px;
	}
	:global(.tiptap-editor-content p.is-editor-empty:first-child::before) {
		content: attr(data-placeholder);
		float: left;
		color: var(--text-tertiary);
		pointer-events: none;
		height: 0;
	}

	/* Bubble menu */
	.bubble-menu {
		display: flex;
		align-items: center;
		gap: 2px;
		background: var(--bg-header, #2c3e50);
		border-radius: 8px;
		padding: 4px 6px;
		box-shadow: 0 4px 16px rgba(0,0,0,0.2);
		z-index: 100;
		/* Tippy.js 초기화 전 DOM 노출 방지 — Tippy가 visibility를 직접 제어함 */
		visibility: hidden;
	}
	.bubble-menu button {
		background: transparent;
		border: none;
		color: white;
		padding: 4px 8px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 13px;
		transition: background 0.15s;
	}
	.bubble-menu button:hover,
	.bubble-menu button.active {
		background: rgba(255,255,255,0.2);
	}
	.bubble-separator {
		width: 1px;
		height: 18px;
		background: rgba(255,255,255,0.3);
		margin: 0 4px;
	}


	/* 색상 버튼 그룹 */
	.bubble-color-group {
		position: relative;
	}
	.bubble-color-btn {
		background: transparent;
		border: none;
		color: white;
		padding: 4px 7px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		font-weight: 700;
		transition: background 0.15s;
		display: flex;
		align-items: center;
	}
	.bubble-color-btn:hover,
	.bubble-color-btn.active {
		background: rgba(255,255,255,0.2);
	}
	.color-icon {
		display: inline-block;
		line-height: 1;
		padding-bottom: 1px;
	}
	.highlight-icon {
		display: inline-block;
		padding: 1px 3px;
		border-radius: 2px;
		line-height: 1;
		min-width: 16px;
		text-align: center;
	}

	/* 색상 팝업 */
	.color-picker-popup {
		position: absolute;
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		background: var(--bg-secondary, white);
		border: 1px solid var(--border-color, #ddd);
		border-radius: 8px;
		padding: 8px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.15);
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		width: 140px;
		z-index: 300;
		animation: slashFadeIn 0.1s ease;
	}
	.color-swatch {
		width: 22px;
		height: 22px;
		border-radius: 4px;
		border: 1px solid rgba(0,0,0,0.1);
		cursor: pointer;
		transition: transform 0.1s, box-shadow 0.1s;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		color: #999;
		padding: 0;
	}
	.color-swatch:hover {
		transform: scale(1.2);
		box-shadow: 0 2px 8px rgba(0,0,0,0.2);
	}
	/* Slash Command Menu */
	.slash-menu {
		position: absolute;
		z-index: 200;
		display: flex;
		flex-direction: column;
		background: var(--bg-secondary, white);
		border: 1px solid var(--border-color, #ddd);
		border-radius: 10px;
		padding: 6px;
		box-shadow: 0 8px 24px rgba(0,0,0,0.14);
		min-width: 200px;
		max-height: 320px;
		overflow-y: auto;
		animation: slashFadeIn 0.12s ease;
	}
	@keyframes slashFadeIn {
		from { opacity: 0; transform: translateY(-6px); }
		to   { opacity: 1; transform: translateY(0); }
	}
	.slash-menu-header {
		font-size: 11px;
		font-weight: 600;
		color: var(--text-tertiary, #999);
		padding: 4px 10px 6px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.slash-menu-icon {
		font-size: 12px;
		font-weight: 700;
		color: var(--text-tertiary, #888);
		width: 26px;
		text-align: center;
		flex-shrink: 0;
	}
	.slash-menu-item {
		display: flex;
		align-items: center;
		gap: 8px;
		background: transparent;
		border: none;
		padding: 8px 10px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		color: var(--text-primary, #333);
		text-align: left;
		transition: background 0.15s;
	}
	.slash-menu-item:hover {
		background: var(--bg-quaternary, #f5f5f5);
	}

	/* Table Bubble Menu */
	.table-bubble-menu {
		display: flex;
		align-items: center;
		gap: 2px;
		background: var(--bg-header, #2c3e50);
		border-radius: 8px;
		padding: 4px 6px;
		box-shadow: 0 4px 16px rgba(0,0,0,0.2);
		z-index: 100;
		visibility: hidden;
	}
	.table-bubble-menu button {
		background: transparent;
		border: none;
		color: white;
		padding: 4px 8px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 12px;
		font-weight: 600;
		transition: background 0.15s;
		white-space: nowrap;
	}
	.table-bubble-menu button:hover {
		background: rgba(255,255,255,0.2);
	}
	.table-bubble-menu button.danger:hover {
		background: rgba(231, 76, 60, 0.6);
	}

	/* Task list styles */
	:global(.tiptap-editor-content ul[data-type="taskList"]) {
		list-style: none;
		padding-left: 0.5em;
	}
	:global(.tiptap-editor-content ul[data-type="taskList"] li) {
		display: flex;
		align-items: flex-start;
		gap: 0.5em;
	}
	:global(.tiptap-editor-content ul[data-type="taskList"] li > label) {
		flex-shrink: 0;
		margin-top: 0.15em;
	}
	:global(.tiptap-editor-content ul[data-type="taskList"] li > div) {
		flex: 1;
	}
	:global(.tiptap-editor-content ul[data-type="taskList"] input[type="checkbox"]) {
		cursor: pointer;
		width: 15px;
		height: 15px;
		accent-color: #3498db;
	}

	/* Tiptap Link styles */
	:global(.tiptap-link) {
		color: var(--accent-color, #667eea);
		text-decoration: underline;
		cursor: pointer;
	}
	:global(.tiptap-link:hover) {
		opacity: 0.8;
	}

	/* Width button */
	.width-button {
		background: rgba(255, 255, 255, 0.15);
		color: white;
		border: 1px solid rgba(255,255,255,0.25);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.85rem;
		transition: background-color 0.2s;
	}
	.width-button:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	/* Table picker inside slash menu */
	.table-picker {
		padding: 8px;
	}
	.table-picker-label {
		font-size: 12px;
		color: var(--text-tertiary, #888);
		margin-bottom: 8px;
		text-align: center;
		font-weight: 600;
		min-height: 18px;
	}
	.table-picker-grid {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
	.table-picker-row {
		display: flex;
		gap: 3px;
	}
	.table-picker-cell {
		width: 26px;
		height: 26px;
		border: 1px solid var(--border-color, #ddd);
		border-radius: 3px;
		cursor: pointer;
		background: var(--bg-quaternary, #f5f5f5);
		transition: background 0.1s, border-color 0.1s;
	}
	.table-picker-cell.highlighted {
		background: #3498db;
		border-color: #2980b9;
	}
	.table-picker-cell:hover {
		border-color: #3498db;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.document-view {
			padding: 20px;
		}

		.mobile-menu-toggle {
			display: block;
		}

		.controls {
			position: absolute;
			top: 100%;
			right: 0;
			background: var(--bg-header);
			flex-direction: column;
			width: 200px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			border-radius: 0 0 0 8px;
			padding: 0.5rem;
			max-height: 0;
			overflow: hidden;
			opacity: 0;
			transition: max-height 0.3s ease, opacity 0.3s ease;
			z-index: 1000;
		}

		.controls.mobile-open {
			max-height: 500px;
			opacity: 1;
		}

		.controls button {
			width: 100%;
			text-align: left;
		}

		.header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
			position: relative;
		}

		.title-section {
			align-items: center;
			text-align: center;
		}

		.status-info {
			align-items: center;
		}

		.legal-footer {
			padding: 1rem;
		}

		.footer-links {
			font-size: 0.85rem;
		}

		.footer-copyright {
			font-size: 0.8rem;
		}
	}
</style>