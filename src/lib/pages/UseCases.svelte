<script lang="ts">
	// use-cases 페이지. 한국어(`/use-cases`)와 영어(`/en/use-cases`)가 이 컴포넌트를 공유한다.
	//
	// 본문이 통째로 다른 산문이라 사전(키-값)이 아니라 언어별 마크업으로 나눈다 —
	// 문장을 키로 쪼개면 번역할 때 맥락이 사라진다. 스타일은 한 벌만 두고 공유한다.
	import type { Locale } from '$lib/i18n';

	export let locale: Locale;
</script>

<svelte:head>
	{#if locale === 'ko'}
		<title>EasyMD 활용 사례 — 마크다운 에디터 활용법</title>
		<meta name="description" content="개발자 TIL, 기술 블로그 초안, README, API 문서, 회의록까지. EasyMD로 마크다운을 활용하는 다양한 실전 사례를 소개합니다." />
		<meta property="og:title" content="EasyMD 활용 사례 — 마크다운 에디터 활용법" />
		<meta property="og:description" content="개발자 TIL, 기술 블로그 초안, README, API 문서, 회의록까지. EasyMD로 마크다운을 활용하는 다양한 실전 사례를 소개합니다." />
	{:else}
	<title>Use Cases — EasyMD Markdown Editor</title>
	<meta name="description" content="What people write in EasyMD — TIL notes, blog drafts, GitHub READMEs, API docs, and meeting notes — with step-by-step walkthroughs." />
	<meta property="og:title" content="Use Cases — EasyMD Markdown Editor" />
	<meta property="og:description" content="TIL notes, blog drafts, READMEs, API docs, and meeting notes, with step-by-step walkthroughs." />
	{/if}
</svelte:head>

{#if locale === 'ko'}
<div class="legal-page">
	<div class="container">
		<h1>EasyMD 활용 사례</h1>
		<p class="tagline">개발자부터 테크 라이터까지 — 마크다운 에디터 활용법</p>

		<section>
			<p class="intro">
				EasyMD는 설치나 로그인 없이 브라우저에서 바로 쓸 수 있는 마크다운 에디터입니다.
				아래는 실제로 많이 활용되는 5가지 대표 시나리오입니다.
			</p>
		</section>

		<section>
			<h2>💼 대표 활용 사례</h2>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">📓</span>
					<h3>1. 개발자 TIL (Today I Learned)</h3>
				</div>
				<p>
					매일 배운 것을 빠르게 기록하고, GitHub에 올릴 마크다운 파일로 바로 내보낼 수 있습니다.
					슬래시 명령어로 코드 블록·체크리스트를 순식간에 삽입하고,
					<code>.md</code> 파일로 다운로드하면 GitHub 렌더링과 완벽하게 호환됩니다.
				</p>
				<div class="tag-list">
					<span class="tag">코드 블록</span>
					<span class="tag">체크리스트</span>
					<span class="tag">.md 내보내기</span>
					<span class="tag">자동 저장</span>
				</div>
			</div>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">✍️</span>
					<h3>2. 기술 블로그 초안 작성</h3>
				</div>
				<p>
					벨로그·티스토리·Medium에 올리기 전, 마크다운으로 초안을 완성하세요.
					WYSIWYG 편집으로 서식을 눈으로 확인하면서 작성할 수 있고,
					완성 후 마크다운 파일을 복사해 블로그 플랫폼에 그대로 붙여넣으면 됩니다.
				</p>
				<div class="tag-list">
					<span class="tag">WYSIWYG 편집</span>
					<span class="tag">서식 도구 모음</span>
					<span class="tag">이미지 붙여넣기</span>
					<span class="tag">빠른 초안 작성</span>
				</div>
			</div>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">📋</span>
					<h3>3. GitHub README 작성</h3>
				</div>
				<p>
					오픈소스 프로젝트나 개인 저장소의 README를 빠르게 만들 수 있습니다.
					표·코드 블록·인용구를 슬래시 명령어로 빠르게 삽입하고,
					완성된 파일을 <code>README.md</code>로 저장해 바로 업로드하세요.
				</p>
				<div class="tag-list">
					<span class="tag">표 편집</span>
					<span class="tag">슬래시 명령어</span>
					<span class="tag">코드 블록</span>
					<span class="tag">.md 내보내기</span>
				</div>
			</div>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">📡</span>
					<h3>4. API 문서 작성</h3>
				</div>
				<p>
					팀 내부 API 스펙이나 엔드포인트 설명을 구조화된 문서로 빠르게 작성할 수 있습니다.
					표로 파라미터를 정리하고, 코드 블록으로 예시 요청·응답을 붙이면 깔끔한 API 레퍼런스가 완성됩니다.
					PDF 또는 DOCX로 내보내 팀과 공유하세요.
				</p>
				<div class="tag-list">
					<span class="tag">인터랙티브 표</span>
					<span class="tag">코드 블록</span>
					<span class="tag">PDF 내보내기</span>
					<span class="tag">DOCX 내보내기</span>
				</div>
			</div>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">🗒️</span>
					<h3>5. 회의록 · 기획서 작성</h3>
				</div>
				<p>
					회의 중에 노트북에서 빠르게 열어 회의록을 작성하세요.
					체크리스트로 액션 아이템을 관리하고, 구분선과 제목으로 안건을 구조화할 수 있습니다.
					작성 후 PDF로 내보내거나 Word 파일로 팀에 공유할 수 있습니다.
				</p>
				<div class="tag-list">
					<span class="tag">체크리스트</span>
					<span class="tag">구분선</span>
					<span class="tag">PDF 내보내기</span>
					<span class="tag">DOCX 내보내기</span>
				</div>
			</div>
		</section>

		<section>
			<h2>🛠️ 따라 하기 — 실제 작업 순서</h2>
			<p class="intro">
				위 사례가 실제로 어떻게 굴러가는지, 자주 쓰이는 세 가지를 순서대로 적었습니다.
				그대로 따라 하면 됩니다.
			</p>

			<h3>회의록: 회의가 끝나는 동시에 공유까지</h3>
			<p>
				회의록은 회의가 끝난 뒤에 정리하려고 미루면 대부분 안 씁니다. 회의 중에 끝내는 게
				핵심이라, 구조를 미리 잡아두고 빈칸만 채우는 방식이 빠릅니다.
			</p>
			<ol class="howto-list">
				<li>
					<strong>회의 시작 전 30초.</strong> 새 문서를 만들고 <code>#</code> 뒤에 회의명과
					날짜를 적습니다. 그 아래 <code>##</code>로 &ldquo;참석자&rdquo;, &ldquo;안건&rdquo;,
					&ldquo;결정 사항&rdquo;, &ldquo;액션 아이템&rdquo; 네 개를 미리 만들어 둡니다.
				</li>
				<li>
					<strong>회의 중.</strong> 해당 제목 아래에 그냥 받아 적습니다. 안건이 바뀌면
					<code>---</code>로 구분선을 넣어 시각적으로 끊어주세요. 화면을 공유해 보여줄 자료가
					있으면 캡처해 <kbd>Ctrl</kbd>+<kbd>V</kbd>로 그 자리에 붙여넣습니다.
				</li>
				<li>
					<strong>액션 아이템은 체크리스트로.</strong> 슬래시 메뉴에서 체크리스트를 고르고
					&ldquo;누가 · 무엇을 · 언제까지&rdquo; 세 가지를 한 줄에 담습니다. 담당자 이름을 앞에
					두면 나중에 훑을 때 자기 것만 눈에 들어옵니다.
				</li>
				<li>
					<strong>회의 종료 직후.</strong> 파일 메뉴에서 워드(.docx)나 PDF로 내보내 그대로
					공유합니다. 사내 위키에 붙일 거라면 마크다운으로 내보내는 편이 서식이 덜 깨집니다.
				</li>
			</ol>
			<p class="howto-tip">
				저장 버튼을 누를 필요는 없습니다. 타이핑을 멈추면 알아서 저장되고, 5분마다 되돌릴 수
				있는 시점이 따로 남습니다. 회의 중 실수로 문단을 날려도 이력 탭에서 복구됩니다.
			</p>

			<h3>README: 빈 화면에서 시작하지 않기</h3>
			<p>
				README가 어려운 이유는 문법이 아니라 &ldquo;무엇부터 쓸지&rdquo;입니다. 순서를 정해두면
				20분이면 끝납니다.
			</p>
			<ol class="howto-list">
				<li>
					<strong>한 줄 소개부터.</strong> 제목 아래 첫 문장은 &ldquo;이게 무엇이고 누구를
					위한 것인가&rdquo;여야 합니다. 여기서 설명이 길어지면 아무도 안 읽습니다.
				</li>
				<li>
					<strong>설치와 실행을 코드 블록으로.</strong> 백틱 세 개 뒤에 <code>bash</code>를
					붙이면 명령어가 색으로 구분되어 복사하기 편해집니다.
				</li>
				<li>
					<strong>옵션이나 환경변수는 표로.</strong> 슬래시 메뉴의 표 삽입으로 격자를 집고,
					&ldquo;이름 / 기본값 / 설명&rdquo; 세 열을 만듭니다. 열 너비는 경계선을 끌어 조절합니다.
				</li>
				<li>
					<strong>스크린샷은 붙여넣기로.</strong> 실행 화면을 캡처해 바로 붙여넣으면 자동으로
					압축되어 들어갑니다.
				</li>
				<li>
					<strong>파일명을 <code>README.md</code>로 바꾸고 내보내기.</strong> 헤더의 파일명을
					클릭해 이름을 고친 뒤 마크다운으로 내려받아 저장소 최상위에 올리면 끝입니다.
				</li>
			</ol>
			<p class="howto-tip">
				주의할 점 하나. GitHub은 보안상 <code>style</code> 속성을 제거하기 때문에 에디터에서
				넣은 <strong>글자 색은 GitHub에서 적용되지 않습니다.</strong> 강조가 필요하면 굵게나
				인용구를 쓰세요. 자세한 내용은
				<a href="/blog/github-readme-guide">GitHub README 작성법</a>에 정리해두었습니다.
			</p>

			<h3>블로그 초안: 플랫폼에 옮길 때 안 깨지게</h3>
			<p>
				초안을 여기서 쓰고 벨로그·티스토리·브런치로 옮기는 흐름입니다. 옮기는 단계에서
				서식이 깨지는 경우가 많은데, 원인은 대체로 정해져 있습니다.
			</p>
			<ol class="howto-list">
				<li>
					<strong>구조부터 잡고 살을 붙입니다.</strong> 소제목(<code>##</code>)만 먼저 5~6개
					늘어놓고 각 아래에 한 줄씩 요약을 적은 뒤, 그 요약을 문단으로 늘려가면 글이 덜 엉킵니다.
				</li>
				<li>
					<strong>다 쓰면 마크다운으로 내보냅니다.</strong> 화면에서 복사·붙여넣기를 하면
					서식이 HTML로 딸려가 플랫폼에서 깨지기 쉽습니다. <code>.md</code> 파일을 열어
					원문을 붙여넣는 편이 안전합니다.
				</li>
				<li>
					<strong>플랫폼별로 다른 부분만 손봅니다.</strong> 벨로그는 마크다운을 거의 그대로
					받아들이지만, 티스토리는 마크다운 모드로 글쓰기를 시작해야 합니다. 이미지는 어느
					플랫폼이든 해당 에디터에서 다시 올리는 편이 확실합니다.
				</li>
			</ol>
			<p class="howto-tip">
				플랫폼별 차이는 <a href="/blog/velog-markdown-guide">벨로그</a>,
				<a href="/blog/tistory-markdown-guide">티스토리</a>,
				<a href="/blog/notion-markdown-guide">노션</a> 글에 따로 정리해두었습니다.
			</p>
		</section>

		<section>
			<h2>📚 함께 보면 좋은 문서</h2>
			<ul class="related-list">
				<li><a href="/guide">마크다운 문법 가이드</a> — 제목·목록·표·링크 기본기</li>
				<li><a href="/templates">템플릿 모음</a> — 회의록·README·기획서 양식 복사해서 쓰기</li>
				<li><a href="/shortcuts">단축키 모음</a> — 손이 빨라지는 조합</li>
				<li><a href="/blog/markdown-work-documents">업무 문서를 마크다운으로 쓰기</a></li>
				<li><a href="/blog/technical-blog-writing">기술 블로그 글쓰기</a></li>
				<li><a href="/compare">다른 에디터와 비교</a> — 언제 EasyMD가 안 맞는지 포함</li>
			</ul>
		</section>

		<section class="cta-section">
			<h2>지금 바로 시작하세요</h2>
			<p>설치 없이, 로그인 없이. 브라우저만 있으면 됩니다.</p>
			<a href="/editor" class="cta-button">EasyMD 열기 →</a>
		</section>

		<div class="back-link">
			<a href="/">← EasyMD로 돌아가기</a>
		</div>
	</div>
</div>
{:else}
<div class="legal-page">
	<div class="container">
		<h1>How people use EasyMD</h1>
		<p class="tagline">From developers to technical writers — what a Markdown editor is actually for</p>

		<section>
			<p class="intro">
				EasyMD is a Markdown editor that runs in your browser with nothing to install and no account.
				These are the five things people most often use it for.
			</p>
		</section>

		<section>
			<h2>💼 Common uses</h2>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">📓</span>
					<h3>1. TIL notes (Today I Learned)</h3>
				</div>
				<p>
					Jot down what you learned today and export it straight to a Markdown file for GitHub.
					The slash menu drops in code blocks and checklists in a keystroke, and the downloaded
					<code>.md</code> file renders on GitHub exactly as written.
				</p>
				<div class="tag-list">
					<span class="tag">Code blocks</span>
					<span class="tag">Checklists</span>
					<span class="tag">.md export</span>
					<span class="tag">Autosave</span>
				</div>
			</div>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">✍️</span>
					<h3>2. Drafting blog posts</h3>
				</div>
				<p>
					Finish the draft in Markdown before it goes to Medium, Dev.to, Ghost, or your own blog.
					You see the formatting as you write rather than reading raw syntax, and when it is done
					the Markdown file pastes straight into the publishing platform.
				</p>
				<div class="tag-list">
					<span class="tag">Formats as you type</span>
					<span class="tag">Selection toolbar</span>
					<span class="tag">Image paste</span>
					<span class="tag">Fast drafting</span>
				</div>
			</div>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">📋</span>
					<h3>3. Writing a GitHub README</h3>
				</div>
				<p>
					Put together the README for an open-source project or a personal repository quickly.
					Tables, code blocks, and quotes all come from the slash menu, and the finished file
					saves as <code>README.md</code> ready to commit.
				</p>
				<div class="tag-list">
					<span class="tag">Table editing</span>
					<span class="tag">Slash menu</span>
					<span class="tag">Code blocks</span>
					<span class="tag">.md export</span>
				</div>
			</div>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">📡</span>
					<h3>4. API documentation</h3>
				</div>
				<p>
					Turn an internal API spec or a set of endpoint descriptions into a structured document.
					Parameters go in a table, example requests and responses go in code blocks, and what you
					get is a readable reference. Export it as PDF or DOCX to share with the team.
				</p>
				<div class="tag-list">
					<span class="tag">Interactive tables</span>
					<span class="tag">Code blocks</span>
					<span class="tag">PDF export</span>
					<span class="tag">DOCX export</span>
				</div>
			</div>

			<div class="use-case-card">
				<div class="use-case-header">
					<span class="use-case-icon">🗒️</span>
					<h3>5. Meeting notes and specs</h3>
				</div>
				<p>
					Open it on a laptop mid-meeting and take the notes as they happen.
					Action items become checklists, and headings and dividers keep the agenda in order.
					Export to PDF, or send the team a Word file.
				</p>
				<div class="tag-list">
					<span class="tag">Checklists</span>
					<span class="tag">Dividers</span>
					<span class="tag">PDF export</span>
					<span class="tag">DOCX export</span>
				</div>
			</div>
		</section>

		<section>
			<h2>🛠️ Step by step</h2>
			<p class="intro">
				Here is what three of those actually look like in practice, in order. Follow along.
			</p>

			<h3>Meeting notes: shared the moment the meeting ends</h3>
			<p>
				Notes you plan to tidy up after the meeting mostly never get written. The trick is to finish
				them during the meeting, which means setting up the structure first and filling in blanks.
			</p>
			<ol class="howto-list">
				<li>
					<strong>Thirty seconds before it starts.</strong> New document, then <code>#</code> followed by
					the meeting name and date. Under it, four <code>##</code> headings: Attendees, Agenda,
					Decisions, Action items.
				</li>
				<li>
					<strong>During.</strong> Type under the relevant heading, nothing fancy. When the topic changes,
					drop in a <code>---</code> divider to break it up visually. If something is shared on screen,
					capture it and paste with <kbd>Ctrl</kbd>+<kbd>V</kbd> right where you are.
				</li>
				<li>
					<strong>Action items as a checklist.</strong> Pick Checklist from the slash menu and put who,
					what, and by when on one line. Leading with the owner's name means everyone can find their
					own items at a glance later.
				</li>
				<li>
					<strong>Right after it ends.</strong> Export from the File menu as Word (.docx) or PDF and send
					it. If it is going into an internal wiki, Markdown survives the move better.
				</li>
			</ol>
			<p class="howto-tip">
				You never need to press save. Stop typing and it saves itself, and a restorable point is kept
				every five minutes — so a paragraph deleted by accident mid-meeting comes back from the
				history tab.
			</p>

			<h3>READMEs: never start from a blank page</h3>
			<p>
				What makes a README hard is not the syntax but knowing what to write first. With an order to
				follow, it takes about twenty minutes.
			</p>
			<ol class="howto-list">
				<li>
					<strong>One line first.</strong> The sentence under the title should answer what this is and who
					it is for. Go longer than that and nobody reads on.
				</li>
				<li>
					<strong>Install and run in code blocks.</strong> Add <code>bash</code> after the three backticks
					and the commands get coloured, which makes them easier to copy.
				</li>
				<li>
					<strong>Options and environment variables in a table.</strong> Use the slash menu's table picker
					and make three columns: name, default, description. Drag the borders to set the widths.
				</li>
				<li>
					<strong>Screenshots by paste.</strong> Capture the running app and paste it in — it is compressed
					automatically.
				</li>
				<li>
					<strong>Rename to <code>README.md</code> and export.</strong> Click the file name in the header,
					change it, download as Markdown, and drop it at the root of the repository.
				</li>
			</ol>
			<p class="howto-tip">
				One caveat. GitHub strips the <code>style</code> attribute for security, so
				<strong>text colour set in the editor will not apply there.</strong> Use bold or a blockquote
				for emphasis instead.
			</p>

			<h3>Blog drafts: moving them without breaking the formatting</h3>
			<p>
				Write the draft here, then move it to Medium, Dev.to, Ghost, or WordPress. Formatting often
				breaks during that move, and the reasons are usually the same few.
			</p>
			<ol class="howto-list">
				<li>
					<strong>Structure first, then fill it in.</strong> Lay out five or six <code>##</code> subheadings,
					write a one-line summary under each, then expand those summaries into paragraphs. The piece
					tangles far less that way.
				</li>
				<li>
					<strong>Export as Markdown when done.</strong> Copying from the rendered screen drags HTML along
					with it, which is what breaks on the other end. Open the <code>.md</code> file and paste the
					raw source instead.
				</li>
				<li>
					<strong>Then fix only what that platform does differently.</strong> Some accept Markdown almost
					verbatim; others need you to switch the editor into Markdown mode before pasting. Images are
					safest re-uploaded in the destination editor whatever the platform.
				</li>
			</ol>
			<p class="howto-tip">
				Which platform does what is worth checking before you paste — every one of them handles tables
				and line breaks slightly differently.
			</p>
		</section>

		<section>
			<h2>📚 Related pages</h2>
			<ul class="related-list">
				<li><a href="/en/guide">Markdown syntax guide</a> — headings, lists, tables, and links</li>
				<li><a href="/en/shortcuts">Keyboard shortcuts</a> — the combinations worth learning</li>
				<li><a href="/en/faq">Frequently asked questions</a></li>

				<li><a href="/en/compare">Compared with other editors</a> — including when EasyMD is the wrong choice</li>
			</ul>
		</section>

		<section class="cta-section">
			<h2>Start now</h2>
			<p>No install, no sign-up. A browser is all you need.</p>
			<a href="/en/editor" class="cta-button">Open EasyMD →</a>
		</section>

		<div class="back-link">
			<a href="/en">← Back to EasyMD</a>
		</div>
	</div>
</div>
{/if}

<style>
	.legal-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
		color: var(--text-primary, #000);
		padding: 2rem 1rem;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		background: var(--bg-secondary, #fff);
		padding: 3rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	h1 {
		color: var(--text-header, #2c3e50);
		margin-bottom: 0.5rem;
		font-size: 2rem;
	}

	.tagline {
		color: var(--text-tertiary, #7f8c8d);
		font-size: 1.1rem;
		margin-bottom: 2rem;
		font-style: italic;
	}

	.intro {
		color: var(--text-secondary, #2c3e50);
		line-height: 1.8;
		font-size: 1.05rem;
	}

	section {
		margin-bottom: 2.5rem;
	}

	h2 {
		color: var(--text-header, #2c3e50);
		margin-top: 2rem;
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.5rem;
	}

	h3 {
		color: var(--text-secondary, #34495e);
		margin: 0;
		font-size: 1.15rem;
	}

	p {
		line-height: 1.8;
		margin-bottom: 1rem;
		color: var(--text-secondary, #2c3e50);
	}

	code {
		background: var(--bg-primary, #f0f0f0);
		padding: 0.1em 0.4em;
		border-radius: 3px;
		font-size: 0.9em;
		font-family: monospace;
	}

	/* 따라 하기 섹션. 카드 안 h3(.use-case-header h3)는 margin:0을 유지해야 하므로
	   section 직계 자식만 겨냥한다. */
	section > h3 {
		margin: 2rem 0 0.7rem;
		font-size: 1.18rem;
		font-weight: 700;
		color: var(--text-header, #2c3e50);
	}

	kbd {
		display: inline-block;
		background: var(--bg-secondary, #fff);
		border: 1px solid var(--border-color, #ccd1d9);
		border-bottom-width: 2px;
		border-radius: 5px;
		padding: 0.05em 0.42em;
		font-size: 0.82em;
		white-space: nowrap;
	}

	.howto-list {
		margin: 0 0 1.1rem;
		padding-left: 1.4rem;
		line-height: 1.85;
		color: var(--text-secondary, #2c3e50);
	}

	.howto-list li {
		margin-bottom: 0.7rem;
	}

	.howto-tip {
		background: var(--bg-tertiary, #eef4fb);
		border-left: 3px solid #3498db;
		border-radius: 0 6px 6px 0;
		padding: 0.85rem 1.05rem;
		font-size: 0.94rem;
		margin-bottom: 1.5rem;
	}

	.related-list {
		margin: 0;
		padding-left: 1.4rem;
		line-height: 2;
		color: var(--text-secondary, #2c3e50);
	}

	.howto-tip a,
	.related-list a {
		color: #2f7fd0;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	:global(html.dark) .howto-tip {
		background: #182230;
		border-left-color: #4a90d9;
	}

	:global(html.dark) .howto-tip a,
	:global(html.dark) .related-list a {
		color: #7fb6f0;
	}

	.use-case-card {
		border: 1px solid var(--border-color, #e0e0e0);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		transition: box-shadow 0.2s;
	}

	.use-case-card:hover {
		box-shadow: 0 4px 12px rgba(52, 152, 219, 0.12);
	}

	.use-case-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.use-case-icon {
		font-size: 1.6rem;
		line-height: 1;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.75rem;
	}

	.tag {
		background: #eaf4fb;
		color: #2980b9;
		padding: 0.25rem 0.75rem;
		border-radius: 20px;
		font-size: 0.82rem;
		font-weight: 500;
	}

	.cta-section {
		background: linear-gradient(135deg, #3498db, #2980b9);
		border-radius: 8px;
		padding: 2rem;
		text-align: center;
		color: white;
	}

	.cta-section h2 {
		color: white;
		border-bottom: none;
		margin-top: 0;
	}

	.cta-section p {
		color: rgba(255, 255, 255, 0.9);
	}

	.cta-button {
		display: inline-block;
		background: white;
		color: #2980b9;
		padding: 0.75rem 2rem;
		border-radius: 6px;
		font-weight: 700;
		font-size: 1rem;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
		border-bottom: none;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		border-bottom: none;
	}

	a {
		color: #3498db;
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s;
	}

	a:hover {
		border-bottom-color: #3498db;
	}

	.back-link {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--border-color, #ddd);
	}

	.back-link a {
		color: #3498db;
		font-weight: 600;
		font-size: 1rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1.5rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		h2 {
			font-size: 1.3rem;
		}

		h3 {
			font-size: 1.05rem;
		}

		.use-case-card {
			padding: 1.25rem;
		}
	}
</style>
