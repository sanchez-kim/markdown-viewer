// FAQ 문항. 페이지 마크업과 JSON-LD가 모두 이 배열에서 나온다.
//
// 영어판은 한국어판의 직역이 아니다. 티스토리·벨로그처럼 영어권에서 의미 없는
// 항목은 빼고, 대신 영어권 사용자가 실제로 묻는 것(오픈소스 여부, 데이터 위치)에
// 무게를 뒀다. 문항 수가 달라도 되도록 타입은 배열로만 고정한다.
import type { Locale } from '$lib/i18n';

export interface FaqItem {
	question: string;
	answer: string;
}

const ko: FaqItem[] = [
	{
		question: 'EasyMD는 무료인가요?',
		answer:
			'네, 완전히 무료입니다. 유료 플랜이나 기능 제한, 무료 체험 기간 같은 것이 없고 모든 기능을 처음부터 끝까지 쓸 수 있습니다. 운영 비용은 페이지에 표시되는 광고로 충당하고 있습니다. 문서 개수나 글자 수에도 별도의 상한을 두지 않았습니다.'
	},
	{
		question: '로그인이나 회원가입이 필요한가요?',
		answer:
			'필요 없습니다. 주소창에 easy-md.com을 입력하고 에디터를 열면 그 순간부터 바로 쓸 수 있습니다. 이메일 인증도, 소셜 로그인도 받지 않습니다. 작성한 문서를 서버에 보관하지 않기 때문에 사용자를 구분할 계정 자체가 필요하지 않은 구조입니다.'
	},
	{
		question: '작성한 내용이 서버에 저장되나요?',
		answer:
			'아니요. 작성한 모든 내용은 지금 사용 중인 브라우저의 저장 공간(localStorage)에만 기록되며, EasyMD 서버로 전송되지 않습니다. 애초에 문서를 받아 보관하는 서버가 없습니다. 다만 이 방식은 장점과 단점이 함께 있습니다. 남이 볼 수 없다는 것이 장점이고, 브라우저 데이터를 지우면 문서도 함께 사라진다는 것이 단점입니다.'
	},
	{
		question: '브라우저를 닫거나 컴퓨터를 껐다 켜도 문서가 남아 있나요?',
		answer:
			'네, 같은 브라우저로 다시 접속하면 마지막 상태 그대로 열립니다. localStorage는 브라우저를 종료해도 유지되는 저장 공간이기 때문입니다. 단, 시크릿 모드(인코그니토)에서 작성한 문서는 창을 닫는 순간 사라지고, 브라우저 설정에서 "쿠키 및 사이트 데이터 삭제"를 실행하면 저장된 문서도 함께 지워집니다.'
	},
	{
		question: '실수로 지운 내용을 되돌릴 수 있나요?',
		answer:
			'두 가지 방법이 있습니다. 방금 한 작업이라면 Ctrl+Z로 되돌리면 됩니다. 되돌리기 범위를 넘어섰다면 버전 이력을 쓰세요. EasyMD는 5분마다 문서의 스냅샷을 자동으로 남기고 최대 20개까지 보관합니다. 문서 목록의 이력 탭에서 원하는 시점을 골라 클릭 한 번으로 복원할 수 있습니다.'
	},
	{
		question: '저장 버튼을 안 눌러도 되나요?',
		answer:
			'누르지 않아도 됩니다. 타이핑을 멈추고 약 1.2초가 지나면 자동으로 저장됩니다. 헤더의 표시가 "저장 중…"에서 "저장됨"으로 바뀌면 반영이 끝난 것입니다. 여기에 더해 5분마다 버전 이력용 스냅샷이 따로 기록됩니다. 특정 시점을 직접 남겨두고 싶을 때만 Ctrl+S를 누르면 됩니다.'
	},
	{
		question: '오프라인에서도 사용할 수 있나요?',
		answer:
			'페이지를 이미 열어둔 상태라면 인터넷이 끊겨도 계속 작성할 수 있고 저장도 정상 동작합니다. 편집과 저장이 모두 브라우저 안에서 이뤄지기 때문입니다. 다만 EasyMD는 오프라인 전용 설치(PWA)를 지원하지 않으므로, 인터넷이 끊긴 상태에서 새로 접속하거나 새로고침하면 페이지가 열리지 않습니다. 비행기나 지하철처럼 연결이 끊기는 환경이라면 미리 탭을 열어두고 새로고침하지 않는 편이 안전합니다.'
	},
	{
		question: '어떤 파일 형식으로 내보낼 수 있나요?',
		answer:
			'마크다운(.md), PDF, 워드(.docx) 세 가지입니다. 마크다운은 원문 그대로 저장되어 GitHub이나 Obsidian 같은 다른 도구로 그대로 옮길 수 있습니다. PDF는 브라우저 인쇄 창을 거치는 방식이라, 인쇄 대상에서 "PDF로 저장"을 선택하면 됩니다. 워드는 제목·목록·표 서식을 유지한 채 변환되므로 문서 제출용으로 적합합니다.'
	},
	{
		question: '다른 사람에게 문서를 보여주려면 어떻게 하나요?',
		answer:
			'내보내기 메뉴의 "공유 링크 복사"를 사용하세요. 문서 내용을 압축해 URL 자체에 담기 때문에 서버에 아무것도 올라가지 않고, 링크를 받은 사람이 열면 내용이 그대로 복원됩니다. 대신 내용이 길수록 링크도 길어집니다. 분량이 많은 문서라면 마크다운이나 PDF 파일로 내보내 전달하는 편이 낫습니다. 여러 명이 같은 문서를 동시에 고치는 실시간 공동 편집은 지원하지 않습니다.'
	},
	{
		question: '여러 문서를 동시에 작업할 수 있나요?',
		answer:
			'네, 상단 탭으로 여러 문서를 열어두고 클릭 한 번으로 전환할 수 있습니다. 탭을 닫아도 문서는 삭제되지 않고 문서 목록에 그대로 남아 언제든 다시 열 수 있습니다. 문서마다 저장과 버전 이력이 따로 관리되므로, 회의록과 블로그 초안을 오가며 작업해도 서로 섞이지 않습니다.'
	},
	{
		question: '집 컴퓨터에서 쓰던 문서를 회사에서도 볼 수 있나요?',
		answer:
			'볼 수 없습니다. 문서가 서버가 아닌 각 브라우저에 저장되기 때문에 기기 간 동기화가 되지 않습니다. 같은 컴퓨터라도 크롬에서 쓴 문서는 사파리에서 보이지 않습니다. 기기를 옮겨야 한다면 마크다운 파일로 내보낸 뒤 다른 기기에서 Ctrl+O로 열거나, 공유 링크를 복사해 옮기면 됩니다.'
	},
	{
		question: '마크다운을 처음 써도 괜찮나요?',
		answer:
			'괜찮습니다. EasyMD는 입력한 기호가 그 자리에서 서식으로 바뀌는 방식이라 문법을 외우지 않아도 됩니다. 텍스트를 드래그하면 굵게·기울임·색상 같은 도구 모음이 떠오르고, 빈 줄에서 슬래시(/)를 입력하면 제목·목록·표·코드 블록을 목록에서 골라 넣을 수 있습니다. 문법을 익히고 싶다면 마크다운 문법 가이드 페이지를 참고하세요.'
	},
	{
		question: '슬래시(/) 명령어로 무엇을 넣을 수 있나요?',
		answer:
			'빈 줄에서 /를 입력하면 제목 1·제목 2·제목 3, 글머리 기호, 번호 목록, 체크리스트, 코드 블록, 인용구, 표 삽입, 구분선까지 열 가지 블록 메뉴가 열립니다. 이어서 이름 일부를 타이핑하면 목록이 좁혀지고, 위아래 화살표로 고른 뒤 Enter로 넣습니다.'
	},
	{
		question: '표를 만들고 편집하려면 어떻게 하나요?',
		answer:
			'슬래시 메뉴에서 "표 삽입"을 고르면 격자 선택기가 나타납니다. 마우스를 끌어 원하는 행·열 크기를 집으면 첫 줄이 머리글인 표가 만들어집니다. 만들어진 표 안에 커서를 두면 표 전용 도구 모음이 자동으로 떠서 행과 열을 추가하거나 지울 수 있고, 열 경계선을 잡아끌면 너비가 조절됩니다.'
	},
	{
		question: '이미지를 넣을 수 있나요? 용량 제한은요?',
		answer:
			'스크린샷을 Ctrl+V로 붙여넣거나 이미지 파일을 에디터 위로 끌어다 놓으면 바로 들어갑니다. 이때 가로 최대 1280px로 자동 압축됩니다. 이미지는 외부 서버가 아니라 문서 안에 데이터로 함께 저장되므로 링크가 만료될 일이 없는 대신, 사진이 많으면 문서 용량이 커집니다. 브라우저 저장 공간에는 한계가 있으니 사진이 아주 많은 문서라면 마크다운 파일로 내보내 보관하는 편이 좋습니다.'
	},
	{
		question: '코드 블록에서 문법 강조가 되나요?',
		answer:
			'됩니다. 코드 블록을 만들 때 백틱 세 개 뒤에 js, python, java처럼 언어 이름을 붙이면 해당 언어 규칙에 맞춰 색이 입혀집니다. 200여 개 언어를 지원합니다. 언어 이름을 붙이지 않으면 색 없이 고정폭 글꼴로만 표시됩니다.'
	},
	{
		question: '모바일에서도 쓸 수 있나요?',
		answer:
			'네, 화면 크기에 맞춰 배치가 바뀌므로 모바일 브라우저에서도 작성과 저장이 됩니다. 다만 표를 여러 번 편집하거나 단축키를 많이 쓰는 작업은 PC가 훨씬 편합니다. 모바일에서는 이동 중 간단한 메모나 초안 확인 정도로 쓰는 것을 권합니다.'
	},
	{
		question: '다크 모드가 있나요?',
		answer:
			'있습니다. 상단 테마 메뉴에서 라이트·다크·시스템 설정 따라가기 중에 고를 수 있습니다. 시스템 설정을 고르면 운영체제가 야간 모드로 바뀔 때 에디터도 함께 어두워집니다. 선택한 테마는 브라우저에 기억되어 다음 접속에도 유지됩니다.'
	},
	{
		question: '노션과 무엇이 다른가요?',
		answer:
			'쓰임새가 다릅니다. 노션은 팀 협업, 데이터베이스, 권한 관리에 강점이 있는 대신 계정과 로그인이 필요하고 문서가 노션 서버에 저장됩니다. EasyMD는 그런 기능이 없는 대신 접속하는 즉시 쓸 수 있고, 문서가 내 브라우저 밖으로 나가지 않으며, 결과물을 마크다운 원문 그대로 가져갈 수 있습니다. 팀으로 오래 관리할 문서는 노션이, 지금 당장 하나 쓰고 파일로 뽑아야 하는 문서는 EasyMD가 맞습니다.'
	},
	{
		question: 'GitHub README를 쓰기에 적합한가요?',
		answer:
			'적합합니다. 표, 체크리스트, 코드 블록처럼 README에서 자주 쓰는 요소를 그대로 지원하고, 완성한 뒤 마크다운 파일로 내보내면 그대로 붙여 넣을 수 있습니다. 다만 GitHub은 보안상 style 속성을 제거하기 때문에 글자 색은 GitHub에서 적용되지 않는다는 점만 유의하세요. README에 특화된 문법은 블로그의 GitHub README 작성법 글에 정리해두었습니다.'
	},
	{
		question: '광고나 분석 도구가 쓰이나요?',
		answer:
			'네. 서비스 운영 비용을 충당하기 위해 Google AdSense 광고를 표시하고, 어떤 페이지가 많이 쓰이는지 파악하기 위해 Google Analytics와 Cloudflare Web Analytics로 방문 통계를 수집합니다. 이 과정에서 쿠키가 사용됩니다. 다만 작성한 문서의 내용은 이 도구들로 전송되지 않습니다. 수집 항목과 거부 방법은 개인정보처리방침 페이지에 정리해두었습니다.'
	},
	{
		question: '오픈소스인가요?',
		answer:
			'네, 소스 코드가 GitHub에 공개되어 있습니다. 문서가 정말 서버로 전송되지 않는지 직접 코드로 확인할 수 있습니다. 버그 제보나 기능 제안도 GitHub Issues로 받고 있습니다.'
	}
];

const en: FaqItem[] = [
	{
		question: 'Is EasyMD free?',
		answer:
			'Yes, completely. There is no paid tier, no feature gate, and no trial period — every feature is available from the start. Running costs are covered by the ads shown on the page. There is no cap on how many documents you create or how long they get.'
	},
	{
		question: 'Do I need an account?',
		answer:
			'No. Open easy-md.com, open the editor, and you can start writing immediately. There is no email verification and no social login. Because your documents are never stored on a server, there is nothing an account would be needed to identify.'
	},
	{
		question: 'Is my writing stored on a server?',
		answer:
			'No. Everything you write is kept in the storage of the browser you are using (localStorage) and is never sent to an EasyMD server — there is no server that receives documents. This cuts both ways: nobody else can see your writing, but clearing your browser data deletes it too.'
	},
	{
		question: 'Will my documents still be there after I close the browser or restart my computer?',
		answer:
			'Yes. Come back in the same browser and everything is as you left it, because localStorage survives closing the browser. Two exceptions: anything written in a private or incognito window disappears when the window closes, and choosing "Clear cookies and site data" in your browser settings deletes stored documents along with everything else.'
	},
	{
		question: 'Can I get back something I deleted by accident?',
		answer:
			'Two ways. For something you just did, Ctrl+Z undoes it. If you have gone past what undo can reach, use the version history: EasyMD saves a snapshot of the document every 5 minutes and keeps up to 20 of them. Open the history tab in the document list, pick a point in time, and one click restores it.'
	},
	{
		question: 'Do I have to press save?',
		answer:
			'No. About 1.2 seconds after you stop typing, the document saves itself — the indicator in the header changes from "Saving…" to "Saved" when it is done. On top of that, a snapshot is written to the version history every 5 minutes. Ctrl+S is only for when you want to mark a specific point yourself.'
	},
	{
		question: 'Does it work offline?',
		answer:
			'If the page is already open, yes — you can keep writing and saving with the connection down, because editing and saving both happen inside the browser. But EasyMD does not support offline installation (PWA), so with no connection you cannot open the site fresh or reload the page. On a flight or a train, open the tab beforehand and avoid refreshing.'
	},
	{
		question: 'What formats can I export to?',
		answer:
			'Markdown (.md), PDF, and Word (.docx). Markdown gives you the raw source, ready to move into GitHub, Obsidian, or another editor. PDF goes through your browser\'s print dialog — choose "Save as PDF" as the destination. Word keeps headings, lists, and tables intact, which suits documents you have to hand in.'
	},
	{
		question: 'How do I show a document to someone else?',
		answer:
			'Use "Copy share link" in the export menu. The document is compressed into the URL itself, so nothing is uploaded to a server and whoever opens the link gets the content back. The longer the document, the longer the link — for anything substantial, exporting a Markdown or PDF file is more practical. Real-time collaborative editing, where several people edit the same document at once, is not supported.'
	},
	{
		question: 'Can I work on several documents at once?',
		answer:
			'Yes. Tabs at the top let you keep multiple documents open and switch between them with one click. Closing a tab does not delete the document — it stays in the document list and can be reopened at any time. Each document saves separately and keeps its own version history, so meeting notes and a blog draft never get mixed together.'
	},
	{
		question: 'Can I see documents from my home computer at work?',
		answer:
			'No. Documents live in each browser rather than on a server, so there is no sync between devices. Even on the same computer, something written in Chrome will not appear in Safari. To move between devices, export a Markdown file and open it elsewhere with Ctrl+O, or copy the share link.'
	},
	{
		question: 'Is it usable if I have never written Markdown before?',
		answer:
			'Yes. Symbols turn into formatting as you type them, so there is no syntax to memorise. Select any text and a toolbar appears with bold, italic, and colour; type a slash (/) on an empty line and you can pick headings, lists, tables, and code blocks from a menu. If you want to learn the syntax itself, the Markdown syntax guide covers it.'
	},
	{
		question: 'What can I insert with the slash (/) menu?',
		answer:
			'Typing / on an empty line opens a menu with ten blocks: Heading 1, Heading 2, Heading 3, bulleted list, numbered list, checklist, code block, quote, table, and divider. Keep typing to narrow the list, use the arrow keys to choose, and press Enter to insert.'
	},
	{
		question: 'How do I create and edit tables?',
		answer:
			'Choose "Table" from the slash menu and a grid picker appears — drag across it to set the size, and the first row becomes the header. With the cursor inside a table, a table toolbar appears automatically for adding and removing rows and columns, and dragging a column border changes its width.'
	},
	{
		question: 'Can I add images? Is there a size limit?',
		answer:
			'Paste a screenshot with Ctrl+V or drag an image file onto the editor and it goes straight in, automatically resized to at most 1280px wide. Images are stored inside the document rather than on an external server, so links never expire — but a document with many photos gets large. Browser storage is finite, so for image-heavy documents it is worth exporting a Markdown file to keep.'
	},
	{
		question: 'Is there syntax highlighting for code blocks?',
		answer:
			'Yes. Add a language name after the three backticks — js, python, java, and so on — and the code is coloured according to that language\'s rules. Around 200 languages are supported. Without a language name, the block is shown in a monospace font with no colouring.'
	},
	{
		question: 'Does it work on mobile?',
		answer:
			'Yes, the layout adapts to the screen, so writing and saving work in a mobile browser. That said, editing tables repeatedly or leaning on keyboard shortcuts is far easier on a computer. On a phone, EasyMD suits quick notes and checking a draft on the move.'
	},
	{
		question: 'Is there a dark mode?',
		answer:
			'Yes. The theme menu at the top offers light, dark, or following your system setting. With the system option, the editor darkens when your operating system switches to night mode. Your choice is remembered for the next visit.'
	},
	{
		question: 'How is this different from Notion?',
		answer:
			'They are for different jobs. Notion is strong at team collaboration, databases, and permissions, but it needs an account and your documents live on Notion\'s servers. EasyMD has none of that — in exchange, you can start writing the moment the page loads, your documents never leave your browser, and you can take the result away as plain Markdown. For documents a team will maintain over time, Notion. For a document you need to write now and export as a file, EasyMD.'
	},
	{
		question: 'Is it good for writing a GitHub README?',
		answer:
			'Yes. Tables, checklists, and code blocks — the things READMEs are made of — all work, and exporting a Markdown file gives you something you can commit directly. One caveat: GitHub strips the style attribute for security, so text colour set in the editor will not apply on GitHub. Use bold or blockquotes for emphasis there instead.'
	},
	{
		question: 'Do you use ads or analytics?',
		answer:
			'Yes. Google AdSense ads cover the running costs, and Google Analytics and Cloudflare Web Analytics are used to see which pages get used. Cookies are involved in that. The contents of your documents are never sent to any of them. What is collected and how to opt out is set out on the privacy policy page.'
	},
	{
		question: 'Is it open source?',
		answer:
			'Yes, the source code is public on GitHub — you can check in the code itself that documents really are not sent anywhere. Bug reports and feature suggestions are welcome through GitHub Issues. Note that the code is MIT licensed but the blog articles are not; see the LICENSE file for the split.'
	}
];

export function faqItems(locale: Locale): FaqItem[] {
	return locale === 'ko' ? ko : en;
}
