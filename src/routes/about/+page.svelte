<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	onMount(() => {
		document.title = '소개 - 이지 마크다운';
		themeStore.init();
	});
</script>

<svelte:head>
	<title>소개 - 이지 마크다운 (EasyMD)</title>
	<meta name="description" content="이지 마크다운은 브라우저에서 바로 사용할 수 있는 무료 마크다운 에디터입니다. 개인정보 수집 없이 안전하게 사용하세요." />
</svelte:head>

<div class="legal-page">
	<div class="container">
		<h1>이지 마크다운 (EasyMD) 소개</h1>
		<p class="tagline">노션처럼 쓰고, 마크다운으로 저장하는 무료 웹 에디터</p>

		<section>
			<h2>✨ 이지 마크다운이란?</h2>
			<p>
				<strong>이지 마크다운 (EasyMD)</strong>은 노션처럼 편하게 쓰면서 마크다운으로 저장할 수 있는
				무료 웹 기반 WYSIWYG 에디터입니다.
				복잡한 설치나 회원가입 없이, 브라우저만 있으면 바로 시작할 수 있습니다.
			</p>
			<p>
				작성한 문서는 <strong>귀하의 브라우저에만 저장</strong>되며, 서버로 전송되지 않아
				개인정보와 데이터를 100% 안전하게 보호합니다.
			</p>
		</section>

		<section>
			<h2>🎯 핵심 기능</h2>

			<div class="feature">
				<h3>✏️ WYSIWYG 인터랙티브 편집</h3>
				<p>마크다운 문법을 입력하면 즉시 서식이 적용됩니다. <code>#</code> → 제목, <code>**텍스트**</code> → <strong>굵게</strong>, <code>- </code> → 글머리 기호로 자동 변환됩니다.</p>
			</div>

			<div class="feature">
				<h3>🔧 서식 도구 모음 (BubbleMenu)</h3>
				<p>텍스트를 선택하면 서식 도구 모음이 자동으로 나타납니다. 굵게·기울임·밑줄·취소선·인라인 코드, 10가지 글자 색상, 7가지 배경 하이라이트, 제목 수준, 링크를 바로 적용할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>⚡ 슬래시 명령어 (<code>/</code>)</h3>
				<p>빈 줄에서 <code>/</code>를 입력하면 블록 추가 메뉴가 표시됩니다. 제목·글머리 기호·번호 목록·체크리스트·코드 블록·인용구·표·구분선을 빠르게 삽입할 수 있습니다. 표는 행/열 수를 직접 지정할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>🗃️ 인터랙티브 표 편집</h3>
				<p>표 안에 커서를 두면 표 도구 모음이 자동으로 표시됩니다. 행과 열을 추가하거나 삭제하고, 표 전체를 삭제할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>🖼️ 인라인 이미지 (Notion처럼)</h3>
				<p>에디터에 이미지를 드래그 앤 드롭하거나 <code>Ctrl+V</code>로 스크린샷을 바로 붙여넣을 수 있습니다. 이미지는 자동으로 최대 1280px로 압축되며, 좌우 드래그로 크기를 조절할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>💾 자동 저장</h3>
				<p>5분마다 자동으로 저장되며, <code>Ctrl+S</code>로 언제든 수동 저장할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>📁 다양한 내보내기</h3>
				<p>마크다운 파일 (<code>.md</code>), PDF (브라우저 인쇄), Word 문서 (<code>.docx</code>)로 내보낼 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>🎨 다크 모드</h3>
				<p>눈이 편한 다크 모드를 지원합니다.</p>
			</div>
		</section>

		<section>
			<h2>🔒 개인정보 보호</h2>
			<ul>
				<li><strong>로그인 불필요</strong>: 회원가입이나 로그인 없이 바로 사용</li>
				<li><strong>서버 전송 없음</strong>: 모든 데이터는 브라우저에만 저장</li>
				<li><strong>개인정보 수집 없음</strong>: 이메일, 이름 등 어떠한 개인정보도 수집하지 않음</li>
				<li><strong>쿠키 프리 분석</strong>: Cloudflare Analytics로 익명 통계만 수집</li>
			</ul>
		</section>

		<section>
			<h2>💡 누구를 위한 서비스인가요?</h2>
			<ul>
				<li>📝 <strong>블로거</strong>: 마크다운으로 글을 작성하는 분</li>
				<li>👨‍💻 <strong>개발자</strong>: README, 문서를 작성하는 개발자</li>
				<li>📚 <strong>학생</strong>: 노트 정리, 리포트 작성이 필요한 학생</li>
				<li>✍️ <strong>작가</strong>: 간단한 문서 작성이 필요한 모든 분</li>
			</ul>
		</section>

		<section>
			<h2>🚀 기술 스택</h2>
			<ul>
				<li><strong>프레임워크</strong>: SvelteKit 2</li>
				<li><strong>WYSIWYG 에디터</strong>: Tiptap 3</li>
				<li><strong>마크다운 파서</strong>: Marked.js</li>
				<li><strong>구문 강조</strong>: Highlight.js</li>
				<li><strong>XSS 방어</strong>: DOMPurify</li>
				<li><strong>호스팅</strong>: Netlify</li>
				<li><strong>분석</strong>: Cloudflare Web Analytics (쿠키 없음)</li>
			</ul>
		</section>

		<section>
			<h2>💖 프로젝트 후원</h2>
			<p>
				이지 마크다운은 무료로 제공되는 오픈소스 프로젝트입니다.
				이 프로젝트가 도움이 되셨다면 후원을 고려해주세요!
			</p>
			<div class="sponsor-links">
				<a href="https://github.com/sponsors/sanchez-kim" target="_blank" rel="noopener" class="sponsor-button github">
					GitHub Sponsors
				</a>
				<a href="https://buymeacoffee.com/sanchezkim7" target="_blank" rel="noopener" class="sponsor-button coffee">
					☕ Buy Me a Coffee
				</a>
			</div>
		</section>

		<section>
			<h2>📬 문의</h2>
			<p>버그 제보, 기능 제안, 문의사항은 GitHub Issues로 남겨주세요:</p>
			<ul>
				<li>GitHub: <a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">markdown-viewer</a></li>
				<li>Issues: <a href="https://github.com/sanchez-kim/markdown-viewer/issues" target="_blank" rel="noopener">버그 제보 / 기능 제안</a></li>
			</ul>
		</section>

		<div class="back-link">
			<a href="/">← 홈으로 돌아가기</a>
		</div>
	</div>
</div>

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

	section {
		margin-bottom: 2.5rem;
	}

	h2 {
		color: var(--text-header, #2c3e50);
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: 1.5rem;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.5rem;
	}

	h3 {
		color: var(--text-secondary, #34495e);
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		font-size: 1.2rem;
	}

	p {
		line-height: 1.8;
		margin-bottom: 1rem;
		color: var(--text-secondary, #2c3e50);
	}

	ul {
		margin: 1rem 0;
		padding-left: 2rem;
		line-height: 1.8;
	}

	li {
		margin-bottom: 0.5rem;
		color: var(--text-secondary, #2c3e50);
	}

	.feature {
		margin-bottom: 1.5rem;
	}

	.feature h3 {
		margin-top: 0;
		margin-bottom: 0.5rem;
	}

	.feature p {
		margin-left: 0;
		color: var(--text-tertiary, #555);
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

	strong {
		color: var(--text-primary, #000);
		font-weight: 600;
	}

	.sponsor-links {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
		flex-wrap: wrap;
	}

	.sponsor-button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		font-weight: 600;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
		border-bottom: none;
	}

	.sponsor-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		border-bottom: none;
	}

	.sponsor-button.github {
		background: #6e5494;
		color: white;
	}

	.sponsor-button.coffee {
		background: #FFDD00;
		color: #000;
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
			font-size: 1.1rem;
		}

		.sponsor-links {
			flex-direction: column;
		}

		.sponsor-button {
			text-align: center;
		}
	}
</style>
