<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { marked } from 'marked';
	import hljs from 'highlight.js';
	import { browser } from '$app/environment';

	// Electron API detection
	interface ElectronAPI {
		onFileOpened: (callback: (data: {content: string, fileName: string}) => void) => void;
		onSaveFile: (callback: () => void) => void;
		onExportPDF: (callback: () => void) => void;
		platform: string;
		isElectron: boolean;
		removeAllListeners: (channel: string) => void;
	}
	
	declare global {
		interface Window {
			electronAPI?: ElectronAPI;
		}
	}

	const isElectron = typeof window !== 'undefined' && window.electronAPI?.isElectron;

	let markdownText = `# 🎉 마크다운 뷰어에 오신 것을 환영합니다!

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

### 5️⃣ 페이지 나누기 (PDF 출력용)
PDF로 출력할 때 페이지를 나누려면 다음 중 하나를 사용하세요:
- \`--- pagebreak ---\`
- \`\\newpage\`
- \`<pb>\`

## 💡 이런 것들을 해보세요!

- 🔄 **스크롤 연동**: 위쪽 버튼으로 에디터와 미리보기 스크롤을 함께 움직일 수 있어요
- 💾 **자동 저장**: 5분마다 자동으로 저장되니까 걱정 마세요
- 📁 **파일명 변경**: 위쪽의 파일명을 클릭하면 이름을 바꿀 수 있어요
- 🖼️ **이미지 추가**: 드래그해서 이미지를 넣을 수 있어요
- 📄 **PDF 출력**: 페이지 나누기를 지원하며 코드도 잘리지 않습니다

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
		// Process markdown with page break support
		let processedMarkdown = markdownText;

		// Replace page break markers with HTML
		processedMarkdown = processedMarkdown.replace(/^---\s*pagebreak\s*---$/gm, '<div class="page-break"></div>');
		processedMarkdown = processedMarkdown.replace(/^\\newpage$/gm, '<div class="page-break"></div>');
		processedMarkdown = processedMarkdown.replace(/^<pb>$/gm, '<div class="page-break"></div>');

		const result = marked(processedMarkdown);
		renderedHtml = typeof result === 'string' ? result : result.toString();
	}

	// ===== INLINE IMAGE HANDLING =====
	let displayText = '';
	let imageMap = new Map<string, { markdown: string, dataUrl: string, altText: string, size: number }>(); // Enhanced image storage
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
			// Store image data for folding
			if (base64.length > 200) {
				const imageId = `img-${imageIdCounter++}`; // Use counter for unique ID
				const fullDataUrl = `${prefix}${base64}`;
				const size = Math.round(base64.length / 1024);

				imageMap.set(imageId, {
					markdown: match,
					dataUrl: fullDataUrl,
					altText: altText || 'image',
					size: size
				});

				// Return shortened version for display in textarea
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
		alert('로컬스토리지에 저장되었습니다!');
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
				alert('파일이 저장되었습니다!');
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

	// Function to resize image
	async function resizeImage(file: File, maxWidth: number = 400): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
					const canvas = document.createElement('canvas');
					let width = img.width;
					let height = img.height;

					// Calculate new dimensions if image is larger than maxWidth
					if (width > maxWidth) {
						height = (maxWidth / width) * height;
						width = maxWidth;
					}

					canvas.width = width;
					canvas.height = height;

					const ctx = canvas.getContext('2d');
					if (!ctx) {
						reject(new Error('Canvas context not available'));
						return;
					}

					// Draw resized image
					ctx.drawImage(img, 0, 0, width, height);

					// Convert to base64 with quality compression for JPEG
					const quality = file.type === 'image/jpeg' ? 0.8 : 1.0;
					const dataUrl = canvas.toDataURL(file.type, quality);
					resolve(dataUrl);
				};
				img.onerror = reject;
				img.src = e.target?.result as string;
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	async function handleImageUpload(file: File) {
		try {
			if (!file.type.startsWith('image/')) {
				alert('이미지 파일만 업로드할 수 있습니다.');
				return;
			}

			if (file.size > 5 * 1024 * 1024) { // 5MB limit
				alert('이미지 크기는 5MB 이하로 제한됩니다.');
				return;
			}

			// Resize image if needed (max width: 400px)
			const base64 = await resizeImage(file, 400);
			const fileName = file.name.replace(/\s+/g, '_'); // Replace spaces with underscores
			const imageMarkdown = `\n![${fileName}](${base64})\n`;

			insertImageAtCursor(imageMarkdown);
		} catch (error) {
			console.error('이미지 업로드 실패:', error);
			alert('이미지 업로드에 실패했습니다.');
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
			alert('이미지 파일을 드롭해주세요.');
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

	// Function to toggle image folding
	function toggleImageFold(imageId: string) {
		if (foldedImages.has(imageId)) {
			foldedImages.delete(imageId);
		} else {
			foldedImages.add(imageId);
		}
		foldedImages = foldedImages; // Trigger reactivity
	}

	// Function to update image preview size
	function updateImagePreviewSize(imageId: string, size: string) {
		const container = document.querySelector(`[data-image-id="${imageId}"]`);
		if (container) {
			const img = container.querySelector('.thumbnail-image') as HTMLImageElement;
			if (img) {
				img.style.maxWidth = size + 'px';
			}
		}
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
				alert('팝업이 차단되었습니다. 팝업을 허용해주세요.');
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
				
				// Enhanced code block styles for PDF
				'pre { ' +
				'background: #2c3e50; ' +
				'color: #ecf0f1; ' +
				'padding: 1rem; ' +
				'border-radius: 4px; ' +
				'margin: 1rem 0; ' +
				'white-space: pre-wrap !important; ' +
				'word-wrap: break-word !important; ' +
				'overflow-wrap: break-word !important; ' +
				'max-width: 100%; ' +
				'font-size: 0.85em; ' +
				'}' +

				// Page break styles
				'.page-break { ' +
				'page-break-after: always; ' +
				'break-after: always; ' +
				'height: 0; ' +
				'margin: 0; ' +
				'border: none; ' +
				'display: block; ' +
				'}' +

				// Screen display of page breaks
				'@media screen { ' +
				'.page-break { ' +
				'height: 2px; ' +
				'background: repeating-linear-gradient(90deg, #ccc 0, #ccc 5px, transparent 5px, transparent 10px); ' +
				'margin: 2rem 0; ' +
				'position: relative; ' +
				'}' +
				'.page-break::after { ' +
				'content: "페이지 나누기"; ' +
				'position: absolute; ' +
				'left: 50%; ' +
				'top: 50%; ' +
				'transform: translate(-50%, -50%); ' +
				'background: white; ' +
				'padding: 0 1rem; ' +
				'color: #999; ' +
				'font-size: 0.8rem; ' +
				'}' +
				'}' +

				// Print-specific styles with better page break control
				'@media print {' +
				'@page { ' +
				'margin: 15mm 15mm 20mm 15mm; ' +
				'size: A4; ' +
				'}' +
				'body { ' +
				'margin: 0; ' +
				'padding: 0; ' +
				'-webkit-print-color-adjust: exact; ' +
				'print-color-adjust: exact; ' +
				'font-size: 11pt; ' +
				'}' +

				// Prevent breaking inside elements
				'pre, code, blockquote, table, img, figure { ' +
				'page-break-inside: avoid !important; ' +
				'break-inside: avoid !important; ' +
				'}' +

				// Keep headings with their content
				'h1, h2, h3, h4, h5, h6 { ' +
				'page-break-after: avoid !important; ' +
				'break-after: avoid !important; ' +
				'page-break-inside: avoid !important; ' +
				'}' +

				// Keep at least 2 lines together
				'p { ' +
				'orphans: 3; ' +
				'widows: 3; ' +
				'}' +

				// Keep list items together
				'li { ' +
				'page-break-inside: avoid !important; ' +
				'break-inside: avoid !important; ' +
				'}' +

				// Handle long code blocks
				'pre { ' +
				'white-space: pre-wrap !important; ' +
				'word-wrap: break-word !important; ' +
				'}' +

				// Force page breaks
				'.page-break { ' +
				'page-break-after: always !important; ' +
				'break-after: page !important; ' +
				'height: 0 !important; ' +
				'display: block !important; ' +
				'border: none !important; ' +
				'}' +

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
			alert('PDF 생성 중 오류가 발생했습니다: ' + (error instanceof Error ? error.message : String(error)));
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
		
		// Add global event listeners for mouse events
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		
		// Setup Electron IPC listeners
		if (isElectron && window.electronAPI) {
			window.electronAPI.onFileOpened((data) => {
				markdownText = data.content;
				fileName = data.fileName;
				updatePreview();
			});

			window.electronAPI.onSaveFile(() => {
				saveAsMarkdown();
			});

			window.electronAPI.onExportPDF(() => {
				exportToPDF();
			});
		}
		
		// Handle Ctrl+S to save to localStorage
		const handleKeydown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 's') {
				e.preventDefault();
				if (isElectron) {
					saveAsMarkdown();
				} else {
					manualSave();
				}
			}
			if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
				e.preventDefault();
				if (!isElectron) {
					openLocalFile();
				}
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
		// Clean up Electron listeners
		if (isElectron && window.electronAPI) {
			window.electronAPI.removeAllListeners('file-opened');
			window.electronAPI.removeAllListeners('save-file');
			window.electronAPI.removeAllListeners('export-pdf');
		}
	});
</script>

<svelte:head>
	<title>마크다운 뷰어</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
</svelte:head>

<div class="app">
	<header class="header">
		<div class="title-section">
			<h1>📝 마크다운 뷰어</h1>
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
		<div class="controls">
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
					<span class="image-indicator">📷 이미지 미리보기 표시</span>
				{/if}
			</h2>
			<textarea
				value={displayText}
				on:input={(e) => {
					const newValue = e.currentTarget.value;
					const base64ShortPattern = /!\[([^\]]*)\]\((data:image\/[^;]+;base64,)[^)]+\.\.\.\.[^)]+\) 📷\[\d+KB\]/g;

					// Check if there are compressed image patterns
					let hasShortImages = false;
					let restoreCount = 0;

					const restoredText = newValue.replace(base64ShortPattern, (match) => {
						hasShortImages = true;
						// Find original image in imageMap with proper error handling
						const imageId = `img-${restoreCount}`;
						const imageData = imageMap.get(imageId);
						restoreCount++;

						if (!imageData) {
							console.warn(`Failed to restore original image for ID: ${imageId}`);
							// Return match as fallback
							return match;
						}

						return imageData.markdown;
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
			{#if imageMap.size > 0}
				<div class="image-thumbnails">
					{#each Array.from(imageMap.entries()) as [imageId, imageData]}
						<div class="image-thumbnail" data-image-id={imageId}>
							<div class="thumbnail-header">
								<span>📷 {imageData.altText} ({imageData.size}KB)</span>
								<select
									class="size-select"
									on:change={(e) => updateImagePreviewSize(imageId, e.currentTarget.value)}
								>
									<option value="100">100px</option>
									<option value="200">200px</option>
									<option value="400" selected>400px</option>
									<option value="600">600px</option>
								</select>
							</div>
							{#if !foldedImages.has(imageId)}
								<img
									src={imageData.dataUrl}
									alt={imageData.altText}
									class="thumbnail-image"
									style="max-width: 400px;"
								/>
							{/if}
							<button
								class="toggle-btn"
								on:click={() => toggleImageFold(imageId)}
							>
								{foldedImages.has(imageId) ? '👁️ 보기' : '🙈 숨기기'}
							</button>
						</div>
					{/each}
				</div>
			{/if}
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
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background-color: #f5f5f5;
	}

	.app {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.header {
		background: #2c3e50;
		color: white;
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}

	.title-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.header h1 {
		margin: 0;
		font-size: 1.5rem;
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

	.image-indicator {
		font-size: 0.75rem;
		color: #7f8c8d;
		margin-left: 1rem;
		font-weight: normal;
		opacity: 0.8;
	}

	.image-thumbnails {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		max-width: 450px;
		max-height: 40%;
		overflow-y: auto;
		background: white;
		border: 1px solid #ddd;
		border-radius: 4px;
		box-shadow: 0 2px 10px rgba(0,0,0,0.1);
		padding: 0.5rem;
		z-index: 100;
	}

	.image-thumbnail {
		margin-bottom: 0.75rem;
		padding: 0.5rem;
		background: #f9f9f9;
		border-radius: 4px;
		border: 1px solid #e0e0e0;
	}

	.image-thumbnail:last-child {
		margin-bottom: 0;
	}

	.thumbnail-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
		font-size: 0.85rem;
		color: #666;
	}

	.size-select {
		padding: 0.2rem 0.4rem;
		border: 1px solid #ddd;
		border-radius: 3px;
		background: white;
		font-size: 0.75rem;
		cursor: pointer;
	}

	.size-select:hover {
		border-color: #3498db;
	}

	.thumbnail-image {
		width: 100%;
		height: auto;
		border-radius: 3px;
		margin-bottom: 0.5rem;
	}

	.toggle-btn {
		width: 100%;
		background: #3498db;
		color: white;
		border: none;
		padding: 0.3rem;
		border-radius: 3px;
		cursor: pointer;
		font-size: 0.8rem;
		transition: background-color 0.2s;
	}

	.toggle-btn:hover {
		background: #2980b9;
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
		background: #ecf0f1;
		border-bottom: 1px solid #ddd;
		font-size: 1rem;
		font-weight: 600;
		color: #2c3e50;
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
		background: #fefefe;
		transition: all 0.2s ease;
	}

	.editor.drag-over {
		border: 2px dashed #3498db;
		background: #f8fbff;
		box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
	}

	.preview {
		flex: 1;
		padding: 1rem;
		background: white;
		overflow-y: auto;
		line-height: 1.6;
	}

	/* Markdown styling */
	.preview :global(h1),
	.preview :global(h2),
	.preview :global(h3),
	.preview :global(h4),
	.preview :global(h5),
	.preview :global(h6) {
		color: #2c3e50;
		margin-top: 1.5em;
		margin-bottom: 0.5em;
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
		color: #7f8c8d;
		background: #f8f9fa;
		padding: 0.5rem 1rem;
	}

	.preview :global(code) {
		background: #f1f2f6;
		padding: 0.2em 0.4em;
		border-radius: 3px;
		font-family: 'Monaco', 'Menlo', monospace;
		font-size: 0.9em;
	}

	.preview :global(pre) {
		background: #2c3e50;
		color: #ecf0f1;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		margin: 1rem 0;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	/* Page break indicator in preview */
	.preview :global(.page-break) {
		height: 2px;
		background: repeating-linear-gradient(
			90deg,
			#ccc 0,
			#ccc 5px,
			transparent 5px,
			transparent 10px
		);
		margin: 2rem 0;
		position: relative;
	}

	.preview :global(.page-break::after) {
		content: "페이지 나누기";
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 0 1rem;
		color: #999;
		font-size: 0.8rem;
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

		.controls {
			flex-wrap: wrap;
		}

		.header {
			flex-direction: column;
			gap: 1rem;
			align-items: stretch;
		}

		.title-section {
			align-items: center;
			text-align: center;
		}

		.status-info {
			align-items: center;
		}
	}
</style>