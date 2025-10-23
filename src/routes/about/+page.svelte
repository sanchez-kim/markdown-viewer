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
		<p class="tagline">브라우저에서 바로 쓰는 가장 쉬운 마크다운 에디터</p>

		<section>
			<h2>✨ 이지 마크다운이란?</h2>
			<p>
				<strong>이지 마크다운 (EasyMD)</strong>은 누구나 쉽게 사용할 수 있는 무료 웹 기반 마크다운 에디터입니다.
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
				<h3>📖 실시간 미리보기</h3>
				<p>왼쪽에서 작성하면 오른쪽에서 즉시 결과를 확인할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>💾 자동 저장</h3>
				<p>5분마다 자동으로 저장되며, Ctrl+S로 언제든 수동 저장할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>📄 PDF 내보내기</h3>
				<p>작성한 문서를 깔끔한 PDF로 저장할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>🖼️ 이미지 지원</h3>
				<p>드래그 앤 드롭, 복사 붙여넣기로 간편하게 이미지를 삽입할 수 있습니다.</p>
			</div>

			<div class="feature">
				<h3>🔄 스크롤 연동</h3>
				<p>에디터와 미리보기가 함께 스크롤되어 편집 위치를 쉽게 찾을 수 있습니다.</p>
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
				<li><strong>프레임워크</strong>: SvelteKit</li>
				<li><strong>마크다운 파서</strong>: Marked.js</li>
				<li><strong>구문 강조</strong>: Highlight.js</li>
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
