<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { marked } from 'marked';
	import hljs from 'highlight.js';
	import { browser } from '$app/environment';
	import Toast from '$lib/components/Toast.svelte';
	import { toastStore } from '$lib/stores/toast';
	import { themeStore } from '$lib/stores/theme';

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
	let previewElement: HTMLDivElement;
	let splitterElement: HTMLDivElement;
	let mainElement: HTMLElement;
	let isDragging = false;
	let editorWidth = 50; // percentage
	let lastSaved = '';
	let saveStatus = 'saved'; // 'saved', 'saving', 'unsaved'
	let currentFileName = 'untitled.md';
	let isEditingFilename = false;
	let tempFileName = '';
	let isScrollSyncEnabled = true;
	let isScrolling = false;
	let showExportDropdown = false;
	let isDragOverImage = false;
	let foldedImages = new Set<string>(); // Folded image IDs
	let imageIdCounter = 0; // Unique ID counter for images
	let showMobileMenu = false;
	let showShortcutsModal = false;

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
		renderedHtml = typeof result === 'string' ? result : result.toString();
	}

	// ===== INLINE IMAGE FOLDING =====
	let displayText = '';
	let imageMap = new Map<string, string>(); // Store original images with proper typing
	let debounceTimer: ReturnType<typeof setTimeout> | null = null;
	
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
			console.log('로컬스토리지 저장 완료:', markdownText.substring(0, 50) + '...');
		} catch (error) {
			console.error('저장 실패:', error);
			saveStatus = 'unsaved';
		}
	}

	// Load from localStorage
	function loadFromLocal() {
		if (!browser || typeof localStorage === 'undefined') return;
		try {
			const savedContent = localStorage.getItem('markdown-viewer-content');
			const savedFilename = localStorage.getItem('markdown-viewer-filename');
			const savedTimestamp = localStorage.getItem('markdown-viewer-timestamp');
			
			console.log('로컬스토리지에서 불러온 내용:', savedContent?.substring(0, 50) + '...');
			
			if (savedContent && savedContent !== markdownText) {
				if (confirm(`저장된 초안이 있습니다 (${new Date(savedTimestamp || '').toLocaleString()}). 불러오시겠습니까?`)) {
					markdownText = savedContent;
					currentFileName = savedFilename || 'untitled.md';
					previousText = savedContent; // Update previous text after loading
					updatePreview();
					saveStatus = 'saved'; // Loaded content is in saved state
				}
			} else if (savedContent) {
				// Set to saved state even when current text matches saved content
				saveStatus = 'saved';
				previousText = markdownText;
			}
		} catch (error) {
			console.error('불러오기 실패:', error);
		}
	}

	// Auto-save every 5 minutes
	let autoSaveInterval: NodeJS.Timeout;
	function startAutoSave() {
		if (!browser) return;
		if (autoSaveInterval) clearInterval(autoSaveInterval);
		autoSaveInterval = setInterval(() => {
			if (markdownText && saveStatus !== 'saving') {
				console.log('자동 저장 실행 중...');
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
			console.log('파일 선택이 취소되었습니다.');
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
			console.log('파일 저장이 취소되었습니다.');
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

	// ===== SCROLL SYNCHRONIZATION =====
	function toggleScrollSync() {
		isScrollSyncEnabled = !isScrollSyncEnabled;
	}

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	function syncEditorScroll(event: Event) {
		if (!isScrollSyncEnabled || isScrolling || !previewElement) return;
		
		const editor = event.target as HTMLTextAreaElement;
		const scrollPercent = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
		
		isScrolling = true;
		previewElement.scrollTop = scrollPercent * (previewElement.scrollHeight - previewElement.clientHeight);
		
		setTimeout(() => {
			isScrolling = false;
		}, 50);
	}

	function syncPreviewScroll(event: Event) {
		if (!isScrollSyncEnabled || isScrolling) return;
		
		const preview = event.target as HTMLDivElement;
		const editorTextarea = document.querySelector('.editor') as HTMLTextAreaElement;
		if (!editorTextarea) return;
		
		const scrollPercent = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
		
		isScrolling = true;
		editorTextarea.scrollTop = scrollPercent * (editorTextarea.scrollHeight - editorTextarea.clientHeight);
		
		setTimeout(() => {
			isScrolling = false;
		}, 50);
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

	// ===== IMAGE INSERTION =====
	function convertImageToBase64(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	function insertImageAtCursor(imageMarkdown: string) {
		const textarea = document.querySelector('.editor') as HTMLTextAreaElement;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const before = markdownText.substring(0, start);
		const after = markdownText.substring(end);
		
		markdownText = before + imageMarkdown + after;
		
		// Move cursor to after the image markdown
		setTimeout(() => {
			textarea.focus();
			const newPosition = start + imageMarkdown.length;
			textarea.setSelectionRange(newPosition, newPosition);
		}, 50);
	}

	async function handleImageUpload(file: File) {
		try {
			if (!file.type.startsWith('image/')) {
				toastStore.show('이미지 파일만 업로드할 수 있습니다.', 'error');
				return;
			}

			if (file.size > 5 * 1024 * 1024) { // 5MB limit
				toastStore.show('이미지 크기는 5MB 이하로 제한됩니다.', 'warning');
				return;
			}

			const base64 = await convertImageToBase64(file);
			const fileName = file.name.replace(/\s+/g, '_'); // Replace spaces with underscores
			const imageMarkdown = `\n![${fileName}](${base64})\n`;
			
			insertImageAtCursor(imageMarkdown);
			toastStore.show('이미지가 추가되었습니다!', 'success');
		} catch (error) {
			console.error('이미지 업로드 실패:', error);
			toastStore.show('이미지 업로드에 실패했습니다.', 'error');
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		event.dataTransfer!.dropEffect = 'copy';
		isDragOverImage = true;
	}

	function handleDragLeave() {
		isDragOverImage = false;
	}

	async function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragOverImage = false;
		
		const files = Array.from(event.dataTransfer?.files || []);
		const imageFiles = files.filter(file => file.type.startsWith('image/'));

		if (imageFiles.length === 0) {
			toastStore.show('이미지 파일을 드롭해주세요.', 'warning');
			return;
		}

		for (const file of imageFiles) {
			await handleImageUpload(file);
		}
	}

	async function handlePaste(event: ClipboardEvent) {
		const items = Array.from(event.clipboardData?.items || []);
		const imageItem = items.find(item => item.type.startsWith('image/'));
		
		if (imageItem) {
			event.preventDefault();
			const file = imageItem.getAsFile();
			if (file) {
				await handleImageUpload(file);
			}
		}
	}

	function openImagePicker() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.multiple = true;
		input.onchange = async (e) => {
			const files = Array.from((e.target as HTMLInputElement).files || []);
			for (const file of files) {
				await handleImageUpload(file);
			}
		};
		input.click();
	}

	async function downloadPDF() {
		if (!previewElement || !browser) return;

		try {
			saveStatus = 'saving';
			
			// Get the preview content
			const previewContent = previewElement.innerHTML;
			
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

	// ===== SPLITTER RESIZE HANDLING =====
	function handleMouseDown(event: MouseEvent) {
		if (event.target === splitterElement) {
			isDragging = true;
			event.preventDefault();
		}
	}

	function handleMouseMove(event: MouseEvent) {
		if (!isDragging || !mainElement) return;
		
		const rect = mainElement.getBoundingClientRect();
		const newWidth = ((event.clientX - rect.left) / rect.width) * 100;
		
		// Limit width between 20% and 80%
		if (newWidth >= 20 && newWidth <= 80) {
			editorWidth = newWidth;
		}
	}

	function handleMouseUp() {
		isDragging = false;
	}

	onMount(() => {
		updatePreview();
		loadFromLocal(); // Check saved content on page load
		startAutoSave(); // Start auto-save with 5-minute interval
		themeStore.init(); // Initialize theme
		
		// Add global event listeners for mouse events
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		
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
		};
		
		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('click', handleClickOutside);

		// Initialize AdSense
		try {
			((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
		} catch (error) {
			console.error('AdSense initialization error:', error);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('click', handleClickOutside);
			stopAutoSave(); // Cleanup auto-save on component unmount
		};
	});

	// Track previous text to only change to unsaved state on actual changes
	let previousText = markdownText;
	
	$: if (markdownText !== undefined) {
		updatePreview();
		// Only change to unsaved if text actually changed and currently saved
		if (markdownText !== previousText && saveStatus === 'saved') {
			saveStatus = 'unsaved';
			previousText = markdownText;
		}
	}
	
	// Cleanup function to prevent memory leaks
	onDestroy(() => {
		// Clear imageMap on component destruction
		imageMap.clear();
		// Clear debounce timer
		if (debounceTimer) clearTimeout(debounceTimer);
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

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
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
					</div>
				{/if}
			</div>
			<button
				on:click={toggleScrollSync}
				class="sync-button"
				class:active={isScrollSyncEnabled}
				title="스크롤 연동 {isScrollSyncEnabled ? '끄기' : '켜기'}"
			>
				{isScrollSyncEnabled ? '📍' : '🔓'} 스크롤 연동
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

	<main bind:this={mainElement} class="main" style="cursor: {isDragging ? 'col-resize' : 'default'}">
		<div 
			class="editor-section" 
			style="width: {editorWidth}%"
		>
			<h2>
				에디터
				{#if markdownText.includes('data:image')}
					<span class="image-indicator">📷 긴 Base64 이미지 자동 축약</span>
				{/if}
			</h2>
			<textarea 
				value={displayText}
				on:input={(e) => {
					const newValue = e.currentTarget.value;
					const base64ShortPattern = /!\[([^\]]*)\]\((data:image\/[^;]+;base64,)[^)]+\.\.\.[^)]+\) 📷\[\d+KB\]/g;
					
					// Check if there are compressed image patterns
					let hasShortImages = false;
					let restoreCount = 0;
					
					const restoredText = newValue.replace(base64ShortPattern, (match) => {
						hasShortImages = true;
						// Find original image in imageMap with proper error handling
						const imageId = `img-${restoreCount}`;
						const original = imageMap.get(imageId);
						restoreCount++;
						
						if (!original) {
							console.warn(`Failed to restore original image for ID: ${imageId}`);
							// Return match as fallback, but this should not happen in normal usage
							return match;
						}
						
						return original;
					});
					
					// Use restored text if compressed images were found, otherwise use as-is
					markdownText = hasShortImages ? restoredText : newValue;
				}}
				placeholder="마크다운을 입력하세요..."
				class="editor"
				class:drag-over={isDragOverImage}
				on:scroll={syncEditorScroll}
				on:dragover={handleDragOver}
				on:dragleave={handleDragLeave}
				on:drop={handleDrop}
				on:paste={handlePaste}
			></textarea>
		</div>
		
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div 
			bind:this={splitterElement}
			class="splitter"
			on:mousedown={handleMouseDown}
			role="separator"
			aria-orientation="vertical"
			tabindex="0"
		></div>
		
		<div 
			class="preview-section" 
			style="width: {100 - editorWidth}%"
		>
			<h2>미리보기</h2>
			<div 
				bind:this={previewElement}
				class="preview"
				on:scroll={syncPreviewScroll}
			>
				{@html renderedHtml}
			</div>
		</div>
	</main>

	<!-- Google AdSense Bottom Banner -->
	<div class="ad-footer">
		<ins class="adsbygoogle"
		     style="display:block"
		     data-ad-client="ca-pub-4776602848700794"
		     data-ad-format="auto"
		     data-full-width-responsive="true"></ins>
	</div>

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

	.sync-button {
		position: relative;
		transition: all 0.3s ease;
	}

	.sync-button.active {
		background: rgba(52, 152, 219, 0.8) !important;
		border: 1px solid #3498db;
		box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
	}

	.sync-button.active:hover {
		background: rgba(52, 152, 219, 0.9) !important;
	}

	.sync-button:not(.active) {
		background: rgba(231, 76, 60, 0.8) !important;
		border: 1px solid #e74c3c;
	}

	.sync-button:not(.active):hover {
		background: rgba(231, 76, 60, 0.9) !important;
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

	.image-indicator {
		font-size: 0.75rem;
		color: #7f8c8d;
		margin-left: 1rem;
		font-weight: normal;
		opacity: 0.8;
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
		min-height: 0;
	}

	.editor-section,
	.preview-section {
		display: flex;
		flex-direction: column;
		min-width: 0;
		transition: width 0.1s ease;
	}

	.splitter {
		width: 4px;
		background: #ddd;
		cursor: col-resize;
		position: relative;
		transition: background-color 0.2s;
	}

	.splitter:hover {
		background: #3498db;
	}

	.splitter:active {
		background: #2980b9;
	}

	.splitter::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 2px;
		height: 30px;
		background: repeating-linear-gradient(
			to bottom,
			transparent 0px,
			transparent 2px,
			#999 2px,
			#999 4px
		);
		opacity: 0.5;
	}

	.editor-section h2,
	.preview-section h2 {
		margin: 0;
		padding: 1rem;
		background: var(--bg-quaternary);
		border-bottom: 1px solid var(--border-color);
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-header);
		transition: background-color 0.3s, color 0.3s, border-color 0.3s;
	}

	.editor {
		flex: 1;
		border: none;
		padding: 1rem;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 14px;
		line-height: 1.6;
		resize: none;
		outline: none;
		background: var(--bg-tertiary);
		color: var(--text-primary);
		transition: all 0.3s ease;
	}

	.editor.drag-over {
		border: 2px dashed #3498db;
		background: #f8fbff;
		box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
	}

	.preview {
		flex: 1;
		padding: 1rem;
		background: var(--bg-secondary);
		color: var(--text-secondary);
		overflow-y: auto;
		line-height: 1.6;
		transition: background-color 0.3s, color 0.3s;
	}

	/* Markdown styling */
	.preview :global(h1),
	.preview :global(h2),
	.preview :global(h3),
	.preview :global(h4),
	.preview :global(h5),
	.preview :global(h6) {
		color: var(--text-header);
		margin-top: 1.5em;
		margin-bottom: 0.5em;
		transition: color 0.3s;
	}

	.preview :global(h1) {
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.3em;
	}

	.preview :global(h2) {
		border-bottom: 1px solid #bdc3c7;
		padding-bottom: 0.3em;
	}

	.preview :global(blockquote) {
		border-left: 4px solid #3498db;
		padding-left: 1rem;
		margin: 1rem 0;
		color: var(--text-tertiary);
		background: var(--blockquote-bg);
		padding: 0.5rem 1rem;
		transition: background-color 0.3s, color 0.3s;
	}

	.preview :global(code) {
		background: var(--code-bg);
		color: var(--code-text);
		padding: 0.2em 0.4em;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.9em;
		transition: background-color 0.3s, color 0.3s;
	}

	.preview :global(pre) {
		background: #2c3e50;
		color: #ecf0f1;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin: 1rem 0;
	}

	.preview :global(pre code) {
		background: none;
		padding: 0;
		color: inherit;
	}

	.preview :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: 1rem 0;
	}

	.preview :global(th),
	.preview :global(td) {
		border: 1px solid #ddd;
		padding: 0.5rem;
		text-align: left;
	}

	.preview :global(th) {
		background-color: #f8f9fa;
		font-weight: 600;
	}

	.preview :global(a) {
		color: #3498db;
		text-decoration: none;
	}

	.preview :global(a:hover) {
		text-decoration: underline;
	}

	.preview :global(ul),
	.preview :global(ol) {
		padding-left: 1.5rem;
	}

	.preview :global(li) {
		margin: 0.25rem 0;
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

	/* Ad Footer */
	.ad-footer {
		background: var(--ad-bg);
		padding: 1rem;
		text-align: center;
		border-top: 1px solid var(--border-color);
		min-height: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.3s, border-color 0.3s;
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

	/* Responsive design */
	@media (max-width: 768px) {
		.main {
			flex-direction: column;
		}

		.splitter {
			display: none;
		}

		.editor-section,
		.preview-section {
			width: 100% !important;
			height: 50vh;
		}

		.editor-section {
			border-bottom: 1px solid #ddd;
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