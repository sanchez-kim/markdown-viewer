<script lang="ts">
	// FAQ 페이지. 한국어(`/faq`)와 영어(`/en/faq`)가 마크업을 공유하고,
	// 문항은 faq-data.ts에서 로케일에 맞는 배열을 가져온다.
	// JSON-LD도 같은 배열에서 나오므로 화면과 구조화 데이터가 어긋날 수 없다.
	import { faqItems } from './faq-data';
	import { availableIn, localizePath, type Locale } from '$lib/i18n';

	export let locale: Locale;

	const p = (path: string) => localizePath(path, locale);
	const faqs = faqItems(locale);

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
			acceptedAnswer: { '@type': 'Answer', text: faq.answer }
		}))
	});

	const relatedKo = [
		{ path: '/guide', label: '마크다운 문법 가이드', desc: '제목·목록·표·링크 기본기를 한 번에' },
		{ path: '/use-cases', label: '활용 사례와 따라 하기', desc: '회의록·README·블로그 초안 작업 순서' },
		{ path: '/templates', label: '템플릿 모음', desc: '복사해서 바로 쓰는 문서 양식' },
		{ path: '/shortcuts', label: '단축키 모음', desc: '' },
		{ path: '/compare', label: '다른 마크다운 에디터와 비교', desc: 'EasyMD가 맞지 않는 경우 포함' },
		{ path: '/privacy', label: '개인정보처리방침', desc: '수집 항목과 거부 방법' }
	];
	const relatedEn = [
		{ path: '/guide', label: 'Markdown syntax guide', desc: 'headings, lists, tables, and links in one pass' },
		{ path: '/use-cases', label: 'Use cases and walkthroughs', desc: 'meeting notes, READMEs, and blog drafts step by step' },
		{ path: '/templates', label: 'Templates', desc: 'document formats to copy and fill in' },
		{ path: '/shortcuts', label: 'Keyboard shortcuts', desc: '' },
		{ path: '/compare', label: 'Compared with other Markdown editors', desc: 'including when EasyMD is the wrong choice' },
		{ path: '/privacy', label: 'Privacy policy', desc: 'what is collected and how to opt out' }
	];
	// 아직 영어판이 없는 페이지는 링크하지 않는다(없는 경로면 prerender 실패).
	const related = (locale === 'ko' ? relatedKo : relatedEn).filter((l) => availableIn(l.path, locale));
</script>

<svelte:head>
	{#if locale === 'ko'}
		<title>자주 묻는 질문 — EasyMD</title>
		<meta name="description" content="EasyMD에 대해 자주 묻는 질문과 답변입니다. 무료 여부, 로그인, 데이터 저장, 오프라인 사용, 내보내기 등을 확인하세요." />
		<meta property="og:title" content="자주 묻는 질문 — EasyMD" />
		<meta property="og:description" content="EasyMD에 대해 자주 묻는 질문과 답변입니다. 무료 여부, 로그인, 데이터 저장, 오프라인 사용, 내보내기 등을 확인하세요." />
	{:else}
		<title>Frequently Asked Questions — EasyMD</title>
		<meta name="description" content="Answers about EasyMD: whether it is free, accounts, where documents are stored, offline use, exporting, and more." />
		<meta property="og:title" content="Frequently Asked Questions — EasyMD" />
		<meta property="og:description" content="Answers about EasyMD: whether it is free, accounts, where documents are stored, offline use, exporting, and more." />
	{/if}
	<!-- FAQ JSON-LD Schema -->
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<div class="legal-page">
	<div class="container">
		<h1>{locale === 'ko' ? '자주 묻는 질문' : 'Frequently asked questions'}</h1>
		<p class="tagline">
			{locale === 'ko'
				? 'EasyMD 사용 전 궁금한 점을 확인하세요'
				: 'What people ask before they start using EasyMD'}
		</p>

		<section class="faq-list">
			{#each faqs as faq, i (i)}
				<div class="faq-item" class:open={openIndex === i}>
					<button class="faq-question" on:click={() => toggle(i)} aria-expanded={openIndex === i}>
						<span class="q-label">Q{i + 1}</span>
						<span class="q-text">{faq.question}</span>
						<span class="q-arrow" aria-hidden="true">{openIndex === i ? '▲' : '▼'}</span>
					</button>
					<!--
						답변은 접혀 있어도 항상 DOM에 렌더한다. {#if}로 감싸면 정적 HTML에
						질문만 남아 크롤러가 답변을 전혀 못 보고, FAQ JSON-LD와도 내용이 어긋난다.
					-->
					<div class="faq-answer" hidden={openIndex !== i}>
						<p>{faq.answer}</p>
					</div>
				</div>
			{/each}
		</section>

		<section class="related-docs">
			<h2>{locale === 'ko' ? '함께 보면 좋은 문서' : 'Related pages'}</h2>
			<ul>
				{#each related as l (l.path)}
					<li><a href={p(l.path)}>{l.label}</a>{l.desc ? ` — ${l.desc}` : ''}</li>
				{/each}
			</ul>
		</section>

		<section class="more-help">
			<h2>{locale === 'ko' ? '더 궁금한 점이 있으신가요?' : 'Still have a question?'}</h2>
			<p>
				{locale === 'ko'
					? '여기에 없는 질문, 버그 제보, 기능 제안은 GitHub Issues로 남겨주세요. 공개된 저장소라 소스 코드를 직접 확인할 수도 있습니다.'
					: 'Anything not covered here, plus bug reports and feature suggestions, can go to GitHub Issues. The repository is public, so you can also read the source directly.'}
			</p>
			<a href="https://github.com/sanchez-kim/markdown-viewer/issues" target="_blank" rel="noopener">
				{locale === 'ko' ? 'GitHub Issues 바로가기 →' : 'Open GitHub Issues →'}
			</a>
		</section>

		<div class="back-link">
			<a href={p('/')}>{locale === 'ko' ? '← EasyMD로 돌아가기' : '← Back to EasyMD'}</a>
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

	.faq-answer[hidden] {
		display: none;
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
	.related-docs {
		margin-top: 2.5rem;
	}

	.related-docs h2 {
		font-size: 1.2rem;
		margin-bottom: 0.9rem;
	}

	.related-docs ul {
		margin: 0;
		padding-left: 1.4rem;
		line-height: 2;
		color: var(--text-secondary, #2c3e50);
	}

	.more-help {
		margin-top: 2.5rem;
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
