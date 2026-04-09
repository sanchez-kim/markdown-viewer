import { marked } from 'marked';
import {
	Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
	HeadingLevel, AlignmentType, WidthType, BorderStyle
} from 'docx';
import { saveAs } from 'file-saver';
import { toastStore } from '$lib/stores/toast';

function htmlToMarkdown(html: string): string {
	return html
		.replace(/<strong>(.*?)<\/strong>/g, '**$1**')
		.replace(/<b>(.*?)<\/b>/g, '**$1**')
		.replace(/<em>(.*?)<\/em>/g, '*$1*')
		.replace(/<i>(.*?)<\/i>/g, '*$1*')
		.replace(/<code>(.*?)<\/code>/g, '`$1`')
		.replace(/<[^>]*>/g, '');
}

function parseInlineText(text: string): TextRun[] {
	const boldPattern = /\*\*(.+?)\*\*/g;
	const italicPattern = /\*(.+?)\*/g;
	const codePattern = /`(.+?)`/g;

	let lastIndex = 0;
	const segments: { text: string; bold?: boolean }[] = [];

	let match;
	while ((match = boldPattern.exec(text)) !== null) {
		const before = text.substring(lastIndex, match.index);
		if (before) segments.push({ text: before });
		segments.push({ text: match[1], bold: true });
		lastIndex = match.index + match[0].length;
	}
	const remaining = text.substring(lastIndex);
	if (remaining) segments.push({ text: remaining });

	const finalRuns: TextRun[] = [];
	for (const seg of segments) {
		if (seg.bold) {
			finalRuns.push(new TextRun({ text: seg.text, bold: true }));
		} else {
			const hasItalicOrCode = italicPattern.test(seg.text) || codePattern.test(seg.text);
			italicPattern.lastIndex = 0;
			codePattern.lastIndex = 0;

			if (hasItalicOrCode) {
				const parts = seg.text.split(/(\*[^*]+\*|`[^`]+`)/);
				for (const part of parts) {
					if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
						finalRuns.push(new TextRun({ text: part.slice(1, -1), italics: true }));
					} else if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
						finalRuns.push(new TextRun({ text: part.slice(1, -1), font: 'Courier New' }));
					} else if (part) {
						finalRuns.push(new TextRun({ text: part }));
					}
				}
			} else {
				finalRuns.push(new TextRun({ text: seg.text }));
			}
		}
	}

	return finalRuns.length > 0 ? finalRuns : [new TextRun({ text: text })];
}

export async function exportAsDocx(markdownText: string, fileName: string): Promise<void> {
	try {
		const tokens = marked.lexer(markdownText);
		const children: (Paragraph | Table)[] = [];

		for (const token of tokens) {
			switch (token.type) {
				case 'heading': {
					const levels = [
						HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3,
						HeadingLevel.HEADING_4, HeadingLevel.HEADING_5, HeadingLevel.HEADING_6
					];
					children.push(new Paragraph({
						children: parseInlineText(token.text),
						heading: levels[(token.depth as number) - 1] || HeadingLevel.HEADING_1,
						spacing: { before: 200, after: 100 }
					}));
					break;
				}
				case 'paragraph':
					children.push(new Paragraph({
						children: parseInlineText(token.text),
						spacing: { after: 100 }
					}));
					break;

				case 'list':
					for (const item of (token.items || [])) {
						const cellText = htmlToMarkdown(item.text);
						children.push(new Paragraph({
							children: parseInlineText(cellText),
							bullet: token.ordered ? undefined : { level: 0 },
							numbering: token.ordered ? { reference: 'default-numbering', level: 0 } : undefined,
							spacing: { after: 50 }
						}));
					}
					break;

				case 'table': {
					if (!token.header || !token.rows) break;
					const tableRows: TableRow[] = [];

					const headerCells = token.header.map((cell: any) =>
						new TableCell({
							children: [new Paragraph({
								children: parseInlineText(htmlToMarkdown(cell.text)),
								alignment: AlignmentType.CENTER
							})],
							shading: { fill: 'E8E8E8' },
							width: { size: Math.floor(100 / token.header.length), type: WidthType.PERCENTAGE }
						})
					);
					tableRows.push(new TableRow({ children: headerCells }));

					for (const row of token.rows) {
						const cells = row.map((cell: any) =>
							new TableCell({
								children: [new Paragraph({ children: parseInlineText(htmlToMarkdown(cell.text)) })],
								width: { size: Math.floor(100 / row.length), type: WidthType.PERCENTAGE }
							})
						);
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
					break;
				}
				case 'code':
					children.push(new Paragraph({
						text: token.text,
						style: 'code',
						spacing: { before: 100, after: 100 }
					}));
					break;

				case 'blockquote': {
					const quoteText = htmlToMarkdown(token.text);
					children.push(new Paragraph({
						children: parseInlineText(quoteText),
						indent: { left: 720 },
						spacing: { before: 100, after: 100 }
					}));
					break;
				}
				case 'space':
					children.push(new Paragraph({ text: '' }));
					break;
			}
		}

		const doc = new Document({
			sections: [{ properties: {}, children }],
			numbering: {
				config: [{
					reference: 'default-numbering',
					levels: [{
						level: 0,
						format: 'decimal',
						text: '%1.',
						alignment: AlignmentType.LEFT
					}]
				}]
			}
		});

		const blob = await Packer.toBlob(doc);
		const docxFileName = fileName.replace(/\.md$/, '') + '.docx';
		saveAs(blob, docxFileName);
		toastStore.show(`${docxFileName} 다운로드 완료`, 'success');

	} catch (error) {
		console.error('DOCX 생성 중 오류:', error);
		toastStore.show(
			'DOCX 생성 중 오류가 발생했습니다: ' + (error instanceof Error ? error.message : String(error)),
			'error'
		);
	}
}
