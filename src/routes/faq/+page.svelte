<script lang="ts">
	import { onMount } from 'svelte';

	const faqs = [
		{
			question: 'EasyMD는 무료인가요?',
			answer: '네, 완전히 무료입니다. 유료 플랜이나 숨겨진 비용 없이 모든 기능을 무제한으로 사용할 수 있습니다.'
		},
		{
			question: '로그인이나 회원가입이 필요한가요?',
			answer: '필요 없습니다. 회원가입이나 이메일 인증 없이 URL에 접속하는 즉시 사용할 수 있습니다.'
		},
		{
			question: '작성한 내용이 서버에 저장되나요?',
			answer: '아니요. 작성한 모든 내용은 사용자의 브라우저(localStorage)에만 저장됩니다. EasyMD 서버로 전송되는 데이터는 없습니다.'
		},
		{
			question: '오프라인에서도 사용할 수 있나요?',
			answer: '최초 접속 후에는 브라우저 캐시를 통해 오프라인에서도 기본적인 편집이 가능합니다. 단, 초기 로딩에는 인터넷 연결이 필요합니다.'
		},
		{
			question: '어떤 파일 형식으로 내보낼 수 있나요?',
			answer: '마크다운(.md), PDF(브라우저 인쇄 방식), Word 문서(.docx) 세 가지 형식으로 내보낼 수 있습니다.'
		},
		{
			question: '모바일에서도 사용할 수 있나요?',
			answer: '네, 반응형으로 설계되어 모바일 브라우저에서도 사용할 수 있습니다. 다만 복잡한 표 편집이나 단축키는 PC 환경에서 더 편리합니다.'
		},
		{
			question: '노션과 무엇이 다른가요?',
			answer: 'EasyMD는 로그인 없이 즉시 사용할 수 있고, 모든 데이터가 브라우저에만 저장되어 프라이버시가 보호됩니다. 노션은 팀 협업과 다양한 데이터베이스 기능에 강점이 있고, EasyMD는 빠르고 간단한 마크다운 작성에 최적화되어 있습니다.'
		},
		{
			question: '마크다운을 처음 사용해도 괜찮나요?',
			answer: '물론입니다. EasyMD는 WYSIWYG 에디터로 마크다운 문법을 몰라도 노션처럼 직관적으로 사용할 수 있습니다. 텍스트를 선택하면 서식 도구 모음이 나타나고, / 명령어로 다양한 블록을 삽입할 수 있습니다.'
		}
	];

	let openIndex: number | null = null;

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}

	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	});
</script>

<svelte:head>
	<title>자주 묻는 질문 — EasyMD</title>
	<meta name="description" content="EasyMD에 대해 자주 묻는 질문과 답변입니다. 무료 여부, 로그인, 데이터 저장, 오프라인 사용, 내보내기 등을 확인하세요." />
	<meta property="og:title" content="자주 묻는 질문 — EasyMD" />
	<meta property="og:description" content="EasyMD에 대해 자주 묻는 질문과 답변입니다. 무료 여부, 로그인, 데이터 저장, 오프라인 사용, 내보내기 등을 확인하세요." />
	<meta property="og:url" content="https://easymd.netlify.app/faq" />
	<meta property="og:type" content="article" />
	<!-- FAQ JSON-LD Schema -->
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<div class="legal-page">
	<div class="container">
		<h1>자주 묻는 질문</h1>
		<p class="tagline">EasyMD 사용 전 궁금한 점을 확인하세요</p>

		<section class="faq-list">
			{#each faqs as faq, i}
				<div class="faq-item" class:open={openIndex === i}>
					<button class="faq-question" on:click={() => toggle(i)} aria-expanded={openIndex === i}>
						<span class="q-label">Q{i + 1}</span>
						<span class="q-text">{faq.question}</span>
						<span class="q-arrow" aria-hidden="true">{openIndex === i ? '▲' : '▼'}</span>
					</button>
					{#if openIndex === i}
						<div class="faq-answer">
							<p>{faq.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</section>

		<section class="more-help">
			<h2>더 궁금한 점이 있으신가요?</h2>
			<p>
				GitHub Issues를 통해 질문하거나 버그를 제보할 수 있습니다.
			</p>
			<a href="https://github.com/sanchez-kim/markdown-viewer/issues" target="_blank" rel="noopener">
				GitHub Issues 바로가기 →
			</a>
		</section>

		<div class="back-link">
			<a href="/">← EasyMD로 돌아가기</a>
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

	p {
		line-height: 1.8;
		color: var(--text-secondary, #2c3e50);
	}

	/* FAQ accordion */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 0;
	}

	.faq-item {
		border: 1px solid var(--border-color, #e0e0e0);
		border-radius: 8px;
		overflow: hidden;
		transition: box-shadow 0.2s;
	}

	.faq-item.open {
		box-shadow: 0 2px 10px rgba(52, 152, 219, 0.12);
		border-color: #3498db;
	}

	.faq-question {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		color: var(--text-secondary, #2c3e50);
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.5;
		transition: background 0.15s;
	}

	.faq-question:hover {
		background: var(--bg-primary, #f7f9fb);
	}

	.faq-item.open .faq-question {
		background: #eaf4fb;
		color: #2980b9;
	}

	.q-label {
		flex-shrink: 0;
		background: #3498db;
		color: white;
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		font-family: monospace;
		line-height: 1.6;
	}

	.faq-item.open .q-label {
		background: #2980b9;
	}

	.q-text {
		flex: 1;
	}

	.q-arrow {
		flex-shrink: 0;
		color: var(--text-tertiary, #7f8c8d);
		font-size: 0.75rem;
	}

	.faq-answer {
		padding: 0 1.25rem 1.25rem 1.25rem;
		border-top: 1px solid #dce8f5;
		background: #f7fbff;
	}

	.faq-answer p {
		margin: 0.75rem 0 0;
		color: var(--text-secondary, #34495e);
		line-height: 1.8;
	}

	/* More help */
	.more-help {
		background: var(--bg-primary, #f7f7f7);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.more-help h2 {
		border-bottom: none;
		margin-top: 0;
		font-size: 1.2rem;
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
			padding: 2rem 1.25rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		.faq-question {
			font-size: 0.95rem;
			padding: 0.875rem 1rem;
		}

		.faq-answer {
			padding: 0 1rem 1rem;
		}
	}
</style>
