<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	const jsExample = "const greet = (name) => {\n  return `Hello, ${name}!`;\n};";
	const pyExample = 'def greet(name):\n    return f"Hello, {name}!"';
	const codeBlockRaw = "`인라인 코드`\n\n```javascript\n" + jsExample + "\n```\n\n```python\n" + pyExample + "\n```";

	onMount(() => {
		document.title = '마크다운 문법 가이드 - 이지 마크다운';
		themeStore.init();
	});
</script>

<svelte:head>
	<title>마크다운 문법 가이드 — EasyMD 이지 마크다운</title>
	<meta name="description" content="마크다운 문법 완전 가이드. 헤더, 굵게, 기울임, 링크, 이미지, 코드 블록, 표, 체크박스, 인용구까지 예시와 함께 한 번에 배우세요." />
	<meta name="keywords" content="마크다운 문법, markdown 사용법, 마크다운 예시, 마크다운 표, 마크다운 코드블록" />
	<meta property="og:title" content="마크다운 문법 가이드 — EasyMD" />
	<meta property="og:description" content="마크다운 문법 완전 가이드. 헤더부터 표까지 예시와 함께 배우세요." />
	<meta property="og:url" content="https://easymd.netlify.app/guide" />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="guide-page">
	<div class="container">
		<a href="/" class="back-nav">← EasyMD로 돌아가기</a>

		<h1>마크다운 문법 가이드</h1>
		<p class="tagline">마크다운(Markdown) 문법을 예시와 함께 완전히 마스터하세요</p>

		<!-- 헤더 -->
		<section>
			<h2>📌 헤더 (Heading)</h2>
			<p><code>#</code>의 개수로 헤더 수준(H1~H6)을 지정합니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code># 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<h1 class="preview-h1">제목 1</h1>
						<h2 class="preview-h2">제목 2</h2>
						<h3 class="preview-h3">제목 3</h3>
						<h4 class="preview-h4">제목 4</h4>
						<h5 class="preview-h5">제목 5</h5>
						<h6 class="preview-h6">제목 6</h6>
					</div>
				</div>
			</div>
		</section>

		<!-- 강조 -->
		<section>
			<h2>✏️ 텍스트 강조 (Emphasis)</h2>
			<p>별표(<code>*</code>) 또는 밑줄(<code>_</code>)로 굵게·기울임·취소선을 표현합니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>**굵게** 또는 __굵게__
*기울임* 또는 _기울임_
***굵게 + 기울임***
~~취소선~~</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<p><strong>굵게</strong> 또는 <strong>굵게</strong></p>
						<p><em>기울임</em> 또는 <em>기울임</em></p>
						<p><strong><em>굵게 + 기울임</em></strong></p>
						<p><s>취소선</s></p>
					</div>
				</div>
			</div>
		</section>

		<!-- 링크 -->
		<section>
			<h2>🔗 링크 (Link)</h2>
			<p>대괄호에 링크 텍스트, 소괄호에 URL을 입력합니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>[EasyMD 바로가기](https://easymd.netlify.app)
[상대 경로 링크](/guide)
[제목 있는 링크](https://example.com "설명 텍스트")</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<p><a href="https://easymd.netlify.app" target="_blank" rel="noopener">EasyMD 바로가기</a></p>
						<p><a href="/guide">상대 경로 링크</a></p>
						<p><a href="https://example.com" title="설명 텍스트">제목 있는 링크</a></p>
					</div>
				</div>
			</div>
		</section>

		<!-- 이미지 -->
		<section>
			<h2>🖼️ 이미지 (Image)</h2>
			<p>링크 문법 앞에 느낌표(<code>!</code>)를 붙이면 이미지가 삽입됩니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>![대체 텍스트](이미지-URL)
![EasyMD 로고](https://easymd.netlify.app/logo.svg)</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<p class="muted">이미지가 URL에서 로드되어 표시됩니다.<br /><code>alt</code> 텍스트는 스크린 리더와 이미지 로딩 실패 시 표시됩니다.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- 인라인 코드 & 코드 블록 -->
		<section>
			<h2>💻 코드 (Code)</h2>
			<p>백틱(<code>`</code>) 하나로 인라인 코드, 세 개(` ``` `)로 코드 블록을 만듭니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>{codeBlockRaw}</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<p><code>인라인 코드</code></p>
						<pre class="code-preview"><code>{jsExample}</code></pre>
						<pre class="code-preview"><code>{pyExample}</code></pre>
					</div>
				</div>
			</div>
		</section>

		<!-- 표 -->
		<section>
			<h2>📊 표 (Table)</h2>
			<p>파이프(<code>|</code>)와 하이픈(<code>-</code>)으로 표를 만듭니다. 콜론(<code>:</code>) 위치로 정렬을 지정합니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>| 이름 | 나이 | 직업 |
|:-----|:----:|-----:|
| 김철수 | 28 | 개발자 |
| 이영희 | 32 | 디자이너 |</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<table>
							<thead>
								<tr><th style="text-align:left">이름</th><th style="text-align:center">나이</th><th style="text-align:right">직업</th></tr>
							</thead>
							<tbody>
								<tr><td style="text-align:left">김철수</td><td style="text-align:center">28</td><td style="text-align:right">개발자</td></tr>
								<tr><td style="text-align:left">이영희</td><td style="text-align:center">32</td><td style="text-align:right">디자이너</td></tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<p class="tip">💡 <code>:---</code> 왼쪽 정렬 / <code>:---:</code> 가운데 정렬 / <code>---:</code> 오른쪽 정렬</p>
		</section>

		<!-- 체크박스 -->
		<section>
			<h2>☑️ 체크박스 (Task List)</h2>
			<p>GFM(GitHub Flavored Markdown) 스타일의 할 일 목록입니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>- [x] 완료된 항목
- [ ] 미완료 항목
- [x] 마크다운 공부하기
- [ ] EasyMD로 문서 작성하기</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<ul class="checklist">
							<li><input type="checkbox" checked disabled /> 완료된 항목</li>
							<li><input type="checkbox" disabled /> 미완료 항목</li>
							<li><input type="checkbox" checked disabled /> 마크다운 공부하기</li>
							<li><input type="checkbox" disabled /> EasyMD로 문서 작성하기</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- 인용구 -->
		<section>
			<h2>💬 인용구 (Blockquote)</h2>
			<p>꺾쇠(<code>&gt;</code>)로 인용구를 만듭니다. 중첩도 가능합니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>&gt; 이것은 인용구입니다.
&gt; 여러 줄도 가능합니다.
&gt;
&gt;&gt; 중첩 인용구도 됩니다.</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<blockquote>
							<p>이것은 인용구입니다.<br />여러 줄도 가능합니다.</p>
							<blockquote><p>중첩 인용구도 됩니다.</p></blockquote>
						</blockquote>
					</div>
				</div>
			</div>
		</section>

		<!-- 수평선 -->
		<section>
			<h2>➖ 수평선 (Horizontal Rule)</h2>
			<p>하이픈(<code>-</code>), 별표(<code>*</code>), 밑줄(<code>_</code>)을 세 개 이상 나열합니다.</p>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>---
***
___</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<hr class="preview-hr" />
					</div>
				</div>
			</div>
		</section>

		<!-- 목록 -->
		<section>
			<h2>📝 목록 (List)</h2>
			<div class="example-grid">
				<div class="example-col">
					<div class="example-label">마크다운 원문</div>
					<pre><code>순서 없는 목록:
- 사과
- 바나나
  - 중첩 항목
- 체리

순서 있는 목록:
1. 첫 번째
2. 두 번째
3. 세 번째</code></pre>
				</div>
				<div class="example-col">
					<div class="example-label">렌더링 결과</div>
					<div class="render-box">
						<p style="font-weight:600; margin-bottom:0.25rem;">순서 없는 목록:</p>
						<ul>
							<li>사과</li>
							<li>바나나
								<ul><li>중첩 항목</li></ul>
							</li>
							<li>체리</li>
						</ul>
						<p style="font-weight:600; margin-bottom:0.25rem; margin-top:0.75rem;">순서 있는 목록:</p>
						<ol>
							<li>첫 번째</li>
							<li>두 번째</li>
							<li>세 번째</li>
						</ol>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
		<div class="cta-box">
			<p>🚀 배운 문법을 바로 사용해보세요!</p>
			<a href="/" class="cta-button">EasyMD에서 바로 사용해보기</a>
		</div>

		<div class="back-link">
			<a href="/">← EasyMD로 돌아가기</a>
		</div>
	</div>
</div>

<style>
	.guide-page {
		min-height: 100vh;
		background: var(--bg-primary, #f5f5f5);
		color: var(--text-primary, #000);
		padding: 2rem 1rem;
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
		background: var(--bg-secondary, #fff);
		padding: 3rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.back-nav {
		display: inline-block;
		color: #3498db;
		text-decoration: none;
		font-weight: 600;
		margin-bottom: 1.5rem;
		font-size: 0.95rem;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s;
	}

	.back-nav:hover {
		border-bottom-color: #3498db;
	}

	h1 {
		color: var(--text-header, #2c3e50);
		margin-bottom: 0.5rem;
		font-size: 2rem;
	}

	.tagline {
		color: var(--text-tertiary, #7f8c8d);
		font-size: 1.05rem;
		margin-bottom: 2.5rem;
		font-style: italic;
	}

	section {
		margin-bottom: 3rem;
	}

	h2 {
		color: var(--text-header, #2c3e50);
		margin-top: 0;
		margin-bottom: 0.75rem;
		font-size: 1.4rem;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.5rem;
	}

	p {
		line-height: 1.8;
		margin-bottom: 1rem;
		color: var(--text-secondary, #2c3e50);
	}

	.example-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1rem;
	}

	.example-col {
		display: flex;
		flex-direction: column;
	}

	.example-label {
		font-size: 0.78rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #7f8c8d;
		margin-bottom: 0.4rem;
	}

	pre {
		background: #f4f4f4;
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.85rem;
		margin: 0;
		flex: 1;
	}

	pre code {
		background: none;
		padding: 0;
		font-family: 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
		color: #2d2d2d;
	}

	code {
		background: #f0f0f0;
		padding: 0.15em 0.4em;
		border-radius: 3px;
		font-size: 0.88em;
		font-family: 'Fira Code', 'Cascadia Code', 'Menlo', monospace;
		color: #e74c3c;
	}

	.render-box {
		background: var(--bg-primary, #fafafa);
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		padding: 1rem;
		flex: 1;
	}

	.render-box p {
		margin: 0.3rem 0;
	}

	.render-box ul,
	.render-box ol {
		margin: 0.25rem 0;
		padding-left: 1.5rem;
	}

	.render-box li {
		margin-bottom: 0.2rem;
		color: var(--text-secondary, #2c3e50);
	}

	.render-box blockquote {
		border-left: 4px solid #3498db;
		margin: 0.5rem 0;
		padding: 0.5rem 1rem;
		background: #eaf4fb;
		border-radius: 0 4px 4px 0;
	}

	.render-box blockquote p {
		margin: 0;
	}

	.render-box table {
		border-collapse: collapse;
		width: 100%;
		font-size: 0.9rem;
	}

	.render-box table th,
	.render-box table td {
		border: 1px solid #ddd;
		padding: 0.5rem 0.75rem;
	}

	.render-box table th {
		background: #3498db;
		color: white;
	}

	.render-box table tr:nth-child(even) td {
		background: #f5f9ff;
	}

	.checklist {
		list-style: none;
		padding-left: 0;
	}

	.checklist li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.3rem;
	}

	.preview-h1 { font-size: 1.6rem; margin: 0.1rem 0; }
	.preview-h2 { font-size: 1.3rem; margin: 0.1rem 0; }
	.preview-h3 { font-size: 1.1rem; margin: 0.1rem 0; }
	.preview-h4 { font-size: 1rem; margin: 0.1rem 0; }
	.preview-h5 { font-size: 0.9rem; margin: 0.1rem 0; }
	.preview-h6 { font-size: 0.8rem; margin: 0.1rem 0; color: #666; }

	.preview-hr {
		border: none;
		border-top: 2px solid #ccc;
		margin: 1rem 0;
	}

	.code-preview {
		background: #2d2d2d;
		color: #f8f8f2;
		border-radius: 4px;
		padding: 0.75rem;
		font-size: 0.82rem;
		margin: 0.5rem 0;
		overflow-x: auto;
	}

	.code-preview code {
		background: none;
		color: #f8f8f2;
		padding: 0;
		font-size: inherit;
	}

	.muted {
		color: #888 !important;
		font-size: 0.9rem;
	}

	.tip {
		font-size: 0.9rem;
		background: #fffde7;
		border: 1px solid #ffe082;
		border-radius: 6px;
		padding: 0.6rem 1rem;
		margin-top: 0.5rem;
	}

	a {
		color: #3498db;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	.cta-box {
		text-align: center;
		background: linear-gradient(135deg, #3498db, #2ecc71);
		color: white;
		border-radius: 10px;
		padding: 2.5rem;
		margin: 3rem 0 2rem;
	}

	.cta-box p {
		font-size: 1.2rem;
		font-weight: 600;
		color: white;
		margin-bottom: 1rem;
	}

	.cta-button {
		display: inline-block;
		background: white;
		color: #3498db;
		font-weight: 700;
		padding: 0.85rem 2rem;
		border-radius: 30px;
		text-decoration: none;
		font-size: 1rem;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
		text-decoration: none;
	}

	.back-link {
		margin-top: 2rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border-color, #ddd);
	}

	.back-link a {
		color: #3498db;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1.5rem 1rem;
		}

		h1 {
			font-size: 1.6rem;
		}

		h2 {
			font-size: 1.2rem;
		}

		.example-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
