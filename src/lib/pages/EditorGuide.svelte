<script lang="ts">
	// 에디터 하단 사용 안내.
	//
	// 두 언어의 본문이 통째로 다르므로 사전(키-값)이 아니라 언어별 마크업으로 나눈다 —
	// 표·kbd·인라인 링크가 많아 문자열로 쪼개면 번역할 때 맥락이 사라진다.
	// 스타일은 한 벌만 두고 양쪽이 공유한다.
	//
	// 반드시 에디터의 .app(100vh flex) '바깥'에서 렌더할 것. 안에 넣으면 에디터를
	// 덮어 클릭·입력을 가로챈다(CLAUDE.md 핵심 관례 3).
	import type { Locale } from '$lib/i18n';

	export let locale: Locale;
</script>

{#if locale === 'ko'}
<section class="editor-guide" aria-labelledby="editor-guide-title">
	<div class="editor-guide-inner">
		<h2 id="editor-guide-title">이지 마크다운 에디터 사용법</h2>
		<p class="editor-guide-lead">
			위 에디터는 설치도 로그인도 필요 없습니다. 빈 화면에 바로 글을 쓰기 시작하면 되고,
			입력한 마크다운 기호는 그 자리에서 서식으로 바뀝니다. 문법을 외우고 있지 않아도
			쓸 수 있도록 만들어져 있습니다. 아래는 알아두면 손이 빨라지는 것들만 정리한 내용입니다.
		</p>

		<h3>1. 기호를 입력하면 그 자리에서 서식이 됩니다</h3>
		<p>
			마크다운 에디터는 보통 "왼쪽에 코드, 오른쪽에 미리보기" 형태지만, 이지 마크다운은
			입력한 기호가 즉시 서식으로 바뀌는 방식(WYSIWYG)입니다. 아래 기호를 줄 맨 앞에 치고
			<kbd>Space</kbd>를 누르면 바로 적용됩니다.
		</p>
		<div class="guide-table-wrap">
			<table class="guide-table">
				<thead>
					<tr><th>입력</th><th>결과</th></tr>
				</thead>
				<tbody>
					<tr><td><code># </code></td><td>가장 큰 제목(H1). <code>##</code>, <code>###</code>로 단계를 낮춥니다</td></tr>
					<tr><td><code>- </code> 또는 <code>* </code></td><td>글머리 기호 목록</td></tr>
					<tr><td><code>1. </code></td><td>번호 목록</td></tr>
					<tr><td><code>&gt; </code></td><td>인용구</td></tr>
					<tr><td><code>```</code></td><td>코드 블록. 뒤에 <code>js</code>·<code>python</code>처럼 언어를 붙이면 문법 강조가 켜집니다</td></tr>
					<tr><td><code>**굵게**</code></td><td>굵은 글씨. <code>*기울임*</code>, <code>~~취소선~~</code>도 같은 방식</td></tr>
					<tr><td><code>---</code></td><td>구분선</td></tr>
				</tbody>
			</table>
		</div>
		<p class="guide-tip">
			이미 써둔 글을 나중에 꾸미고 싶다면, 텍스트를 <strong>드래그해서 선택</strong>하세요.
			선택한 자리 위로 서식 도구 모음이 떠서 굵게·기울임·밑줄·글자색·형광펜·링크를 바로 누를 수 있습니다.
		</p>

		<h3>2. 슬래시(/) 명령어 — 문법을 몰라도 넣을 수 있습니다</h3>
		<p>
			빈 줄에서 <code>/</code>를 입력하면 블록 메뉴가 열립니다. 이어서 이름 일부를 타이핑하면
			목록이 좁혀지고, <kbd>↑</kbd> <kbd>↓</kbd>로 고른 뒤 <kbd>Enter</kbd>로 넣습니다.
			현재 넣을 수 있는 블록은 다음 10가지입니다.
		</p>
		<ul class="guide-chips">
			<li>제목 1</li>
			<li>제목 2</li>
			<li>제목 3</li>
			<li>글머리 기호</li>
			<li>번호 목록</li>
			<li>체크리스트</li>
			<li>코드 블록</li>
			<li>인용구</li>
			<li>표 삽입</li>
			<li>구분선</li>
		</ul>
		<p>
			<strong>표 삽입</strong>을 고르면 격자 선택기가 나타납니다. 마우스를 끌어 원하는 행·열 크기를
			집으면 첫 줄이 머리글인 표가 만들어집니다. 만들어진 표 안에 커서를 두면 표 전용 도구 모음이
			자동으로 떠서 행·열을 추가하거나 지울 수 있고, 열 경계선을 잡아끌면 너비가 조절됩니다.
		</p>

		<h3>3. 이미지는 붙여넣기만 하면 됩니다</h3>
		<p>
			스크린샷을 찍어 <kbd>Ctrl</kbd> + <kbd>V</kbd>로 붙여넣거나, 이미지 파일을 에디터 위로
			끌어다 놓으면 문서 안에 바로 들어갑니다. 이때 이미지는 가로 최대 1280px로 자동 압축됩니다.
			원본 그대로 넣으면 브라우저 저장 공간을 금방 채우기 때문입니다. 삽입한 이미지는
			모서리를 끌어 크기를 조절할 수 있습니다.
		</p>
		<p class="guide-tip">
			이미지는 외부 서버에 올라가지 않고 문서 안에 데이터로 함께 저장됩니다.
			링크가 만료되지 않는 대신, 사진이 많은 문서는 용량이 커진다는 점만 알아두세요.
		</p>

		<h3>4. 저장은 신경 쓰지 않아도 됩니다</h3>
		<p>
			저장 버튼을 누르는 걸 잊어도 괜찮습니다. 이지 마크다운은 두 가지 방식으로 함께 저장합니다.
		</p>
		<ul class="guide-list">
			<li><strong>상시 자동 저장</strong> — 타이핑을 멈추고 약 1.2초가 지나면 현재 내용이 저장됩니다. 헤더의 표시가 "저장 중…"에서 "저장됨"으로 바뀌는 게 이 동작입니다.</li>
			<li><strong>5분마다 스냅샷</strong> — 5분 간격으로 그 시점의 문서를 버전 이력에 남깁니다. 최대 20개까지 보관되며, 문서 목록의 이력 탭에서 클릭 한 번으로 예전 상태로 되돌릴 수 있습니다.</li>
		</ul>
		<p>
			즉 "실수로 다 지웠는데 되돌리기도 안 먹는" 상황에서도 5분 전 버전은 남아 있습니다.
			직접 저장 시점을 남기고 싶다면 <kbd>Ctrl</kbd> + <kbd>S</kbd>를 누르세요.
		</p>

		<h3>5. 내보내기와 공유</h3>
		<p>
			상단 <strong>파일</strong> 메뉴에서 완성한 문서를 밖으로 꺼낼 수 있습니다.
		</p>
		<ul class="guide-list">
			<li><strong>마크다운(.md)</strong> — 원문 그대로. GitHub, Obsidian, 다른 에디터로 그대로 옮겨집니다.</li>
			<li><strong>PDF</strong> — 브라우저 인쇄 창이 열리고, 대상에서 "PDF로 저장"을 고르면 됩니다.</li>
			<li><strong>Word(.docx)</strong> — 제목·목록·표 서식을 유지한 채 워드 파일로 저장합니다. 보고서 제출처럼 워드를 요구하는 경우에 씁니다.</li>
			<li><strong>공유 링크 복사</strong> — 문서 내용을 압축해 URL 자체에 담습니다. 서버에 아무것도 올라가지 않고, 링크를 받은 사람이 열면 그 내용이 복원됩니다. 다만 내용이 길수록 링크도 길어집니다.</li>
		</ul>

		<h3>6. 작성한 글은 어디에 저장되나요?</h3>
		<p>
			이지 마크다운에는 문서를 받아두는 서버가 없습니다. 작성한 내용은 지금 쓰고 있는 브라우저의
			저장 공간(localStorage)에만 기록되며, 네트워크로 전송되지 않습니다. 회원가입을 받지 않는
			이유도 같습니다 — 저장할 계정이 필요 없기 때문입니다.
		</p>
		<p>
			대신 그만큼 주의할 점이 있습니다. <strong>브라우저 데이터를 지우면 문서도 함께 사라집니다.</strong>
			시크릿 모드에서 쓴 내용은 창을 닫는 순간 없어지고, 다른 기기에서는 같은 문서가 보이지 않습니다.
			오래 보관해야 할 글이라면 마크다운 파일로 한 번 내보내 두는 편이 안전합니다.
			공용 컴퓨터에서 작업했다면 문서 목록에서 삭제하고 나가는 것을 권합니다.
		</p>

		<h3>알아두면 좋은 단축키</h3>
		<div class="guide-table-wrap">
			<table class="guide-table">
				<thead>
					<tr><th>단축키</th><th>동작</th></tr>
				</thead>
				<tbody>
					<tr><td><kbd>Ctrl</kbd> + <kbd>S</kbd></td><td>지금 시점으로 저장</td></tr>
					<tr><td><kbd>Ctrl</kbd> + <kbd>O</kbd></td><td>내 컴퓨터의 <code>.md</code> 파일 열기</td></tr>
					<tr><td><kbd>Ctrl</kbd> + <kbd>V</kbd></td><td>클립보드의 이미지 붙여넣기</td></tr>
					<tr><td><kbd>?</kbd></td><td>단축키 안내 열기 / 닫기</td></tr>
					<tr><td><kbd>Esc</kbd></td><td>열려 있는 창 닫기 · 변경 취소</td></tr>
				</tbody>
			</table>
		</div>
		<p class="guide-tip">
			화면이 좁게 느껴진다면 상단의 <strong>문서 너비</strong>를 눌러보세요. 기본 → 넓게 → 전체 폭
			순서로 바뀝니다. 긴 표를 다룰 때 유용합니다. 눈이 피로하면 <strong>테마</strong>에서
			다크 모드로 바꿀 수 있고, 시스템 설정을 따라가게 둘 수도 있습니다.
		</p>

		<h3>여러 문서를 동시에 쓰고 싶다면</h3>
		<p>
			상단 <strong>문서 목록</strong>을 열면 지금까지 작성한 문서가 모두 나옵니다. 제목과 마지막
			수정 시각, 앞부분 미리보기가 함께 보여서 찾기 쉽습니다. 새 문서를 만들고 오가며 작업해도
			각 문서는 따로 저장되고 버전 이력도 문서별로 관리됩니다. 문서 이름은 헤더의 파일명을
			클릭해 바꾼 뒤 <kbd>Enter</kbd>로 확정합니다.
		</p>

		<nav class="guide-more" aria-label="더 알아보기">
			<h3>마크다운 문법이 더 궁금하다면</h3>
			<ul>
				<li><a href="/guide">마크다운 문법 가이드</a> — 제목·목록·표·링크까지 한 번에 훑기</li>
				<li><a href="/templates">템플릿 모음</a> — README, 회의록, 기획서 양식을 복사해서 바로 사용</li>
				<li><a href="/blog/markdown-table-guide">표 만드는 법</a> — 정렬과 셀 병합이 안 되는 이유</li>
				<li><a href="/blog/markdown-code-highlight-guide">코드 블록 문법 강조</a> — 언어 이름을 붙이는 규칙</li>
				<li><a href="/blog/github-readme-guide">GitHub README 작성법</a> — 배지, 접기, 이미지 정렬</li>
				<li><a href="/shortcuts">단축키 전체 목록</a></li>
				<li><a href="/faq">자주 묻는 질문</a></li>
			</ul>
		</nav>
	</div>
</section>
{:else}
	<section class="editor-guide" aria-labelledby="editor-guide-title">
		<div class="editor-guide-inner">
			<h2 id="editor-guide-title">How to use the EasyMD editor</h2>
			<p class="editor-guide-lead">
				The editor above needs no installation and no account. Click into the blank page and start
				writing — the Markdown symbols you type turn into real formatting right where you type them,
				so you can use it without having the syntax memorised. Below is only the part worth knowing.
			</p>

			<h3>1. Type a symbol, get the formatting</h3>
			<p>
				Most Markdown editors put code on the left and a preview on the right. EasyMD does not: what
				you type is formatted in place. Type one of these at the start of a line and press
				<kbd>Space</kbd>.
			</p>
			<div class="guide-table-wrap">
				<table class="guide-table">
					<thead>
						<tr><th>Type</th><th>Result</th></tr>
					</thead>
					<tbody>
						<tr><td><code># </code></td><td>Largest heading (H1). Use <code>##</code> or <code>###</code> to go smaller</td></tr>
						<tr><td><code>- </code> or <code>* </code></td><td>Bulleted list</td></tr>
						<tr><td><code>1. </code></td><td>Numbered list</td></tr>
						<tr><td><code>&gt; </code></td><td>Quote</td></tr>
						<tr><td><code>```</code></td><td>Code block. Add a language such as <code>js</code> or <code>python</code> to switch on syntax highlighting</td></tr>
						<tr><td><code>**bold**</code></td><td>Bold text. <code>*italic*</code> and <code>~~strikethrough~~</code> work the same way</td></tr>
						<tr><td><code>---</code></td><td>Divider</td></tr>
					</tbody>
				</table>
			</div>
			<p class="guide-tip">
				To format something you have already written, <strong>select the text</strong>. A small toolbar
				appears above the selection with bold, italic, underline, text colour, highlight, and link.
			</p>

			<h3>2. The slash (/) menu — no syntax required</h3>
			<p>
				Type <code>/</code> on an empty line to open the block menu. Keep typing to narrow the list,
				move through it with <kbd>↑</kbd> <kbd>↓</kbd>, and insert with <kbd>Enter</kbd>. Ten blocks
				are available:
			</p>
			<ul class="guide-chips">
				<li>Heading 1</li>
				<li>Heading 2</li>
				<li>Heading 3</li>
				<li>Bulleted list</li>
				<li>Numbered list</li>
				<li>Checklist</li>
				<li>Code block</li>
				<li>Quote</li>
				<li>Table</li>
				<li>Divider</li>
			</ul>
			<p>
				Choosing <strong>Table</strong> opens a grid picker — drag across it to set the number of rows
				and columns, and the first row becomes the header. Once the table exists, putting the cursor
				inside it brings up a table toolbar for adding and removing rows and columns, and you can drag
				a column border to change its width.
			</p>

			<h3>3. Images: just paste them</h3>
			<p>
				Take a screenshot and paste it with <kbd>Ctrl</kbd> + <kbd>V</kbd>, or drag an image file onto
				the editor. Either way it lands in the document and is automatically resized to at most
				1280px wide — pasting originals would fill up the browser's storage very quickly. Once
				inserted, drag a corner to resize it.
			</p>
			<p class="guide-tip">
				Images are stored inside the document itself rather than uploaded to a server, so the links
				can never expire. The trade-off is that a document full of screenshots gets large.
			</p>

			<h3>4. You do not need to think about saving</h3>
			<p>
				Forgetting to press save is fine here. EasyMD saves in two ways at once.
			</p>
			<ul class="guide-list">
				<li><strong>Continuous autosave</strong> — about 1.2 seconds after you stop typing, the current state is written to your browser. That is what the indicator in the header is doing when it changes from "Saving…" to "Saved".</li>
				<li><strong>A snapshot every 5 minutes</strong> — a copy of the document is added to its version history, up to 20 of them. Open the history tab in the document list and one click restores an earlier state.</li>
			</ul>
			<p>
				So even in the case where you delete everything and undo will not go back far enough, the
				version from five minutes ago is still there. If you want to mark a specific point yourself,
				press <kbd>Ctrl</kbd> + <kbd>S</kbd>.
			</p>

			<h3>5. Exporting and sharing</h3>
			<p>
				The <strong>File</strong> menu at the top is how a finished document leaves the editor.
			</p>
			<ul class="guide-list">
				<li><strong>Markdown (.md)</strong> — the raw source, ready to move into GitHub, Obsidian, or any other editor.</li>
				<li><strong>PDF</strong> — opens your browser's print dialog; choose "Save as PDF" as the destination.</li>
				<li><strong>Word (.docx)</strong> — keeps headings, lists, and tables intact, for the cases where somebody has asked for a Word file.</li>
				<li><strong>Copy share link</strong> — compresses the document into the URL itself. Nothing is uploaded to a server, and whoever opens the link gets the content back. The longer the document, the longer the link.</li>
			</ul>

			<h3>6. Where does the writing actually go?</h3>
			<p>
				EasyMD has no server that receives documents. What you write is stored only in the browser
				you are using (in localStorage) and is never sent over the network. That is also why there is
				no sign-up — there is no account for anything to be stored under.
			</p>
			<p>
				The flip side deserves attention. <strong>Clearing your browser data deletes your documents
				too.</strong> Anything written in a private window disappears when the window closes, and the
				same documents will not be on your other devices. For writing you need to keep, export a
				Markdown file once. If you have been working on a shared computer, delete the document from
				the list before you leave.
			</p>

			<h3>Shortcuts worth knowing</h3>
			<div class="guide-table-wrap">
				<table class="guide-table">
					<thead>
						<tr><th>Shortcut</th><th>Action</th></tr>
					</thead>
					<tbody>
						<tr><td><kbd>Ctrl</kbd> + <kbd>S</kbd></td><td>Save at this point</td></tr>
						<tr><td><kbd>Ctrl</kbd> + <kbd>O</kbd></td><td>Open a <code>.md</code> file from your computer</td></tr>
						<tr><td><kbd>Ctrl</kbd> + <kbd>V</kbd></td><td>Paste an image from the clipboard</td></tr>
						<tr><td><kbd>?</kbd></td><td>Open or close the shortcut list</td></tr>
						<tr><td><kbd>Esc</kbd></td><td>Close an open dialog, or cancel an edit</td></tr>
					</tbody>
				</table>
			</div>
			<p class="guide-tip">
				If the page feels cramped, use <strong>Width</strong> in the header — it cycles through normal,
				wide, and full width, which helps with big tables. <strong>Theme</strong> switches to dark
				mode, and it can follow your system setting instead.
			</p>

			<h3>Working on more than one document</h3>
			<p>
				Open <strong>Documents</strong> in the header to see everything you have written, with the
				title, the time it was last edited, and the opening lines as a preview. You can create new
				documents and move between them freely — each one saves separately and keeps its own version
				history. To rename a document, click its file name in the header and confirm with
				<kbd>Enter</kbd>.
			</p>

			<!--
				영어판 안내 페이지(/en/guide 등)를 추가하면 여기에 링크를 되살릴 것.
				없는 경로를 링크하면 전체 prerender(strict) 빌드가 실패한다.
			-->
			<nav class="guide-more" aria-label="Learn more">
				<h3>More about EasyMD</h3>
				<ul>
					<li><a href="/en">What EasyMD is, and who it is for</a></li>
				</ul>
			</nav>
		</div>
	</section>
{/if}

<style>
	/* --- 에디터 하단 사용 안내 (.app 바깥) --- */
	.editor-guide {
		background: #f7f8fb;
		border-top: 1px solid #e5e7eb;
		padding: 3.5rem 1.5rem 4rem;
		color: #313a4b;
		line-height: 1.8;
	}

	.editor-guide-inner {
		max-width: 760px;
		margin: 0 auto;
	}

	.editor-guide h2 {
		font-size: 1.6rem;
		font-weight: 700;
		color: #1f2430;
		margin: 0 0 0.75rem;
		letter-spacing: -0.01em;
	}

	.editor-guide h3 {
		font-size: 1.12rem;
		font-weight: 700;
		color: #1f2430;
		margin: 2.5rem 0 0.75rem;
	}

	.editor-guide-lead {
		font-size: 1.02rem;
		color: #4a5364;
		margin: 0;
	}

	.editor-guide p {
		margin: 0 0 0.9rem;
	}

	.editor-guide strong {
		color: #1f2430;
		font-weight: 600;
	}

	.editor-guide a {
		color: #5b64d8;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.editor-guide a:hover {
		color: #434bbd;
	}

	.editor-guide code {
		background: #eceef4;
		border-radius: 4px;
		padding: 0.12em 0.4em;
		font-size: 0.88em;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		color: #b0396b;
	}

	.editor-guide kbd {
		display: inline-block;
		background: #ffffff;
		border: 1px solid #cfd4de;
		border-bottom-width: 2px;
		border-radius: 5px;
		padding: 0.05em 0.42em;
		font-size: 0.82em;
		font-family: inherit;
		color: #3a4152;
		white-space: nowrap;
	}

	.guide-list {
		margin: 0 0 0.9rem;
		padding-left: 1.15rem;
	}

	.guide-list li {
		margin-bottom: 0.55rem;
	}

	.guide-chips {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0 0 1.1rem;
		padding: 0;
	}

	.guide-chips li {
		background: #ffffff;
		border: 1px solid #dde1ea;
		border-radius: 999px;
		padding: 0.28rem 0.8rem;
		font-size: 0.88rem;
		color: #485061;
	}

	.guide-table-wrap {
		overflow-x: auto;
		margin: 0 0 1.1rem;
	}

	.guide-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.93rem;
		background: #ffffff;
		border: 1px solid #e2e5ec;
		border-radius: 8px;
	}

	.guide-table th,
	.guide-table td {
		text-align: left;
		padding: 0.6rem 0.85rem;
		border-bottom: 1px solid #edeff4;
		vertical-align: top;
	}

	.guide-table th {
		background: #f2f4f8;
		font-weight: 600;
		color: #333c4d;
		white-space: nowrap;
	}

	.guide-table tbody tr:last-child td {
		border-bottom: none;
	}

	.guide-tip {
		background: #eef2ff;
		border-left: 3px solid #8b93e8;
		border-radius: 0 6px 6px 0;
		padding: 0.8rem 1rem;
		font-size: 0.94rem;
		color: #3c4360;
	}

	.guide-more {
		margin-top: 2.75rem;
		padding-top: 1.75rem;
		border-top: 1px solid #e3e6ed;
	}

	.guide-more h3 {
		margin-top: 0;
	}

	.guide-more ul {
		margin: 0;
		padding-left: 1.15rem;
	}

	.guide-more li {
		margin-bottom: 0.4rem;
	}

	:global(html.dark) .editor-guide {
		background: #14171f;
		border-top-color: #262c36;
		color: #a8b2c1;
	}

	:global(html.dark) .editor-guide h2,
	:global(html.dark) .editor-guide h3,
	:global(html.dark) .editor-guide strong {
		color: #e6edf3;
	}

	:global(html.dark) .editor-guide-lead {
		color: #9aa5b4;
	}

	:global(html.dark) .editor-guide a {
		color: #a9b6ff;
	}

	:global(html.dark) .editor-guide a:hover {
		color: #c3ccff;
	}

	:global(html.dark) .editor-guide code {
		background: #21262d;
		color: #ff9ab6;
	}

	:global(html.dark) .editor-guide kbd {
		background: #1c2128;
		border-color: #39414d;
		color: #cbd4e1;
	}

	:global(html.dark) .guide-chips li {
		background: #1c2128;
		border-color: #30363d;
		color: #b7c0cd;
	}

	:global(html.dark) .guide-table {
		background: #1a1e26;
		border-color: #2a3039;
	}

	:global(html.dark) .guide-table th {
		background: #21262d;
		color: #d3dae3;
	}

	:global(html.dark) .guide-table th,
	:global(html.dark) .guide-table td {
		border-bottom-color: #262c36;
	}

	:global(html.dark) .guide-tip {
		background: #1b2036;
		border-left-color: #5b64b8;
		color: #b3bcd4;
	}

	:global(html.dark) .guide-more {
		border-top-color: #262c36;
	}

	@media (max-width: 768px) {
		.editor-guide {
			padding: 2.5rem 1.1rem 3rem;
		}

		.editor-guide h2 {
			font-size: 1.35rem;
		}
	}
</style>
