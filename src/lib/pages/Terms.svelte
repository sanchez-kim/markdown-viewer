<script lang="ts">
	// terms 페이지. 한국어(`/terms`)와 영어(`/en/terms`)가 이 컴포넌트를 공유한다.
	//
	// 본문이 통째로 다른 산문이라 사전(키-값)이 아니라 언어별 마크업으로 나눈다 —
	// 문장을 키로 쪼개면 번역할 때 맥락이 사라진다. 스타일은 한 벌만 두고 공유한다.
	import type { Locale } from '$lib/i18n';

	export let locale: Locale;
</script>

<svelte:head>
	{#if locale === 'ko'}
		<title>이용약관 - 이지 마크다운 (EasyMD)</title>
		<meta name="description" content="이지 마크다운(EasyMD) 서비스 이용약관입니다. 무료 웹 기반 마크다운 에디터 이용 시 적용되는 조건과 책임 범위를 안내합니다." />

		<!-- 나머지 OG/트위터 태그는 +layout.svelte 공통값 사용 -->
		<meta property="og:title" content="이용약관 - 이지 마크다운 (EasyMD)" />
		<meta property="og:description" content="무료 웹 기반 마크다운 에디터 이용 시 적용되는 조건과 책임 범위를 안내합니다." />
	{:else}
	<title>Terms of Service - EasyMD</title>
	<meta name="description" content="The EasyMD terms of service — conditions of use, licensing, disclaimers, and third-party services for this free browser-based Markdown editor." />

	<!-- 나머지 OG/트위터 태그는 +layout.svelte 공통값 사용 -->
	<meta property="og:title" content="Terms of Service - EasyMD" />
	<meta property="og:description" content="Conditions of use, licensing, and disclaimers for the free browser-based Markdown editor." />
	{/if}
</svelte:head>

{#if locale === 'ko'}
<div class="legal-page">
	<div class="container">
		<h1>이용약관</h1>
		<p class="update-date">최종 업데이트: 2026년 8월</p>

		<section>
			<h2>1. 서비스 소개</h2>
			<p>
				이지 마크다운 (EasyMD, "서비스")는 사용자가 마크다운 문서를 작성하고 미리보기할 수 있는
				무료 웹 기반 도구입니다. 본 약관은 서비스 이용에 적용됩니다.
			</p>
		</section>

		<section>
			<h2>2. 서비스 이용</h2>

			<h3>2.1 이용 조건</h3>
			<ul>
				<li>서비스는 무료로 제공되며, 누구나 이용할 수 있습니다</li>
				<li>회원가입이나 개인정보 제공 없이 이용 가능합니다</li>
				<li>모든 기능은 브라우저에서 작동하며 서버에 데이터를 전송하지 않습니다</li>
			</ul>

			<h3>2.2 사용자 책임</h3>
			<ul>
				<li>작성한 문서의 백업은 사용자의 책임입니다</li>
				<li>브라우저 캐시를 지우면 저장된 데이터가 삭제될 수 있습니다</li>
				<li>공용 컴퓨터 사용 시 민감한 정보 작성에 주의하시기 바랍니다</li>
			</ul>
		</section>

		<section>
			<h2>3. 금지 사항</h2>
			<p>다음 행위는 금지됩니다:</p>
			<ul>
				<li>서비스를 불법적인 목적으로 사용하는 행위</li>
				<li>서비스의 정상적인 운영을 방해하는 행위</li>
				<li><code>src/lib/posts/</code>의 블로그 글을 전문 또는 상당 부분 무단으로 복제·재발행하는 행위 (아래 4.1 참고)</li>
				<li>다른 사용자나 제3자의 권리를 침해하는 행위</li>
			</ul>
		</section>

		<section>
			<h2>4. 지적 재산권</h2>

			<h3>4.1 서비스</h3>
			<p>저장소는 적용 범위가 둘로 나뉩니다.</p>
			<ul>
				<li><strong>소스 코드·설정 파일 — MIT.</strong> 상업적 이용을 포함해 자유롭게 사용·수정·배포할 수 있습니다.</li>
				<li><strong><code>src/lib/posts/</code>의 블로그 글 — 저작권 보유.</strong> 출처를 밝힌 짧은 인용은 가능하지만, 전문 또는 상당 부분의 복제·재발행에는 사전 서면 허락이 필요합니다.</li>
			</ul>
			<p>
				전문은 <a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">GitHub 저장소</a>의 LICENSE 파일을 참조하세요.
				이용 문의: <a href="mailto:help@easy-md.com">help@easy-md.com</a>
			</p>

			<h3>4.2 사용자 콘텐츠</h3>
			<p>
				사용자가 작성한 마크다운 문서는 사용자의 소유이며,
				서비스는 이에 대한 어떠한 권리도 주장하지 않습니다.
			</p>
		</section>

		<section>
			<h2>5. 면책 조항</h2>

			<h3>5.1 서비스 제공 "있는 그대로"</h3>
			<p>
				서비스는 "있는 그대로" 제공되며, 특정 목적에의 적합성, 정확성, 신뢰성에 대한
				어떠한 보증도 하지 않습니다.
			</p>

			<h3>5.2 데이터 손실</h3>
			<p>
				브라우저 문제, 캐시 삭제, 기술적 오류 등으로 인한 데이터 손실에 대해
				책임지지 않습니다. 중요한 문서는 별도로 백업하시기 바랍니다.
			</p>

			<h3>5.3 손해 배상 제한</h3>
			<p>
				서비스 이용으로 인한 직접적, 간접적, 우발적, 특별, 결과적 손해에 대해
				법이 허용하는 최대 범위 내에서 책임을 지지 않습니다.
			</p>
		</section>

		<section>
			<h2>6. 서비스 변경 및 중단</h2>
			<p>
				서비스는 사전 통지 없이 기능을 추가, 변경, 제거하거나 서비스를 중단할 수 있습니다.
				서비스 중단으로 인한 손해에 대해 책임지지 않습니다.
			</p>
		</section>

		<section>
			<h2>7. 제3자 서비스</h2>
			<p>서비스는 다음 제3자 서비스를 사용합니다:</p>
			<ul>
				<li><strong>Cloudflare Web Analytics:</strong> 웹 분석</li>
				<li><strong>Google Analytics</strong>: 방문 통계 분석</li>
				<li><strong>Google AdSense:</strong> 광고 제공</li>
				<li><strong>Netlify:</strong> 웹 호스팅</li>
			</ul>
			<p>
				이러한 제3자 서비스는 각자의 이용약관을 가지며,
				해당 서비스 사용으로 인한 문제는 각 서비스 제공자의 책임입니다.
			</p>
		</section>

		<section>
			<h2>8. 후원 및 기부</h2>
			<p>
				서비스는 GitHub Sponsors 및 Buy Me a Coffee를 통한 자발적 후원을 받습니다.
				후원은 환불되지 않으며, 서비스 운영 및 개선에 사용됩니다.
			</p>
		</section>

		<section>
			<h2>9. 약관 변경</h2>
			<p>
				본 약관은 필요시 변경될 수 있으며, 변경 사항은 본 페이지에 게시됩니다.
				서비스 계속 이용 시 변경된 약관에 동의한 것으로 간주됩니다.
			</p>
		</section>

		<section>
			<h2>10. 준거법 및 관할</h2>
			<p>
				본 약관은 대한민국 법률에 따라 규율되며,
				서비스와 관련된 분쟁은 대한민국 법원의 관할에 따릅니다.
			</p>
		</section>

		<section>
			<h2>11. 문의</h2>
			<p>약관에 대한 문의사항이 있으시면 다음으로 연락주세요:</p>
			<ul>
				<li>이메일: <a href="mailto:help@easy-md.com">help@easy-md.com</a></li>
				<li>GitHub: <a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">markdown-viewer 저장소</a></li>
				<li>Issues: <a href="https://github.com/sanchez-kim/markdown-viewer/issues" target="_blank" rel="noopener">GitHub Issues</a></li>
			</ul>
		</section>

		<div class="back-link">
			<a href="/">← 홈으로 돌아가기</a>
		</div>
	</div>
</div>
{:else}
<div class="legal-page">
	<div class="container">
		<h1>Terms of Service</h1>
		<p class="update-date">Last updated: August 2026</p>

		<section>
			<h2>1. About the Service</h2>
			<p>
				EasyMD ("the Service") is a free, browser-based tool for writing and previewing Markdown
				documents. These terms apply to your use of it.
			</p>
		</section>

		<section>
			<h2>2. Using the Service</h2>

			<h3>2.1 Conditions of use</h3>
			<ul>
				<li>The Service is free and open to anyone</li>
				<li>No account or personal information is required</li>
				<li>Everything runs in your browser; document contents are not sent to a server</li>
			</ul>

			<h3>2.2 Your responsibilities</h3>
			<ul>
				<li>Backing up your documents is your responsibility</li>
				<li>Clearing your browser data will delete documents stored in it</li>
				<li>Take care when writing sensitive information on a shared or public computer</li>
			</ul>
		</section>

		<section>
			<h2>3. Prohibited use</h2>
			<p>The following are not permitted:</p>
			<ul>
				<li>Using the Service for unlawful purposes</li>
				<li>Interfering with the normal operation of the Service</li>
				<li>Infringing the rights of other users or third parties</li>
				<li>
					Republishing the articles under <code>src/lib/posts/</code> in whole or in substantial
					part without permission (see section 4.1)
				</li>
			</ul>
		</section>

		<section>
			<h2>4. Intellectual property</h2>

			<h3>4.1 The Service</h3>
			<p>
				This repository is dual-licensed, and the two parts are treated differently:
			</p>
			<ul>
				<li>
					<strong>Source code and configuration — MIT.</strong> You may freely use, modify, and
					redistribute it, including commercially.
				</li>
				<li>
					<strong>Blog articles under <code>src/lib/posts/</code> — all rights reserved.</strong>
					Short quotations with attribution are fine; reproducing or republishing an article in
					whole or in substantial part requires written permission.
				</li>
			</ul>
			<p>
				See the LICENSE file in the
				<a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">GitHub repository</a>
				for the full text. Licensing enquiries: <a href="mailto:help@easy-md.com">help@easy-md.com</a>.
			</p>

			<h3>4.2 Your content</h3>
			<p>
				The Markdown documents you write belong to you. The Service claims no rights over them and,
				since they are never transmitted, never receives them in the first place.
			</p>
		</section>

		<section>
			<h2>5. Disclaimers</h2>

			<h3>5.1 Provided "as is"</h3>
			<p>
				The Service is provided "as is", without warranty of any kind as to fitness for a
				particular purpose, accuracy, or reliability.
			</p>

			<h3>5.2 Data loss</h3>
			<p>
				We are not liable for data lost through browser issues, cleared caches, or technical
				faults. Documents exist only in your browser, so please export anything important as a
				file.
			</p>

			<h3>5.3 Limitation of liability</h3>
			<p>
				To the fullest extent permitted by law, we are not liable for direct, indirect, incidental,
				special, or consequential damages arising from use of the Service.
			</p>
		</section>

		<section>
			<h2>6. Changes to and discontinuation of the Service</h2>
			<p>
				Features may be added, changed, or removed, and the Service may be discontinued, without
				prior notice. We are not liable for losses arising from such changes.
			</p>
		</section>

		<section>
			<h2>7. Third-party services</h2>
			<p>The Service relies on the following third parties:</p>
			<ul>
				<li><strong>Cloudflare Web Analytics</strong> — web analytics</li>
				<li><strong>Google Analytics</strong> — visit statistics</li>
				<li><strong>Google AdSense</strong> — advertising</li>
				<li><strong>Netlify</strong> — web hosting</li>
			</ul>
			<p>
				Each has its own terms, and issues arising from those services are the responsibility of
				their respective providers.
			</p>
		</section>

		<section>
			<h2>8. Sponsorship</h2>
			<p>
				The Service accepts voluntary support through GitHub Sponsors and Buy Me a Coffee.
				Contributions are non-refundable and go towards running and improving the Service.
			</p>
		</section>

		<section>
			<h2>9. Changes to these terms</h2>
			<p>
				These terms may change as needed, and any changes will be posted on this page. Continuing
				to use the Service means accepting the revised terms.
			</p>
		</section>

		<section>
			<h2>10. Governing law</h2>
			<p>
				These terms are governed by the laws of the Republic of Korea, and disputes relating to the
				Service fall under the jurisdiction of the courts of the Republic of Korea.
			</p>
		</section>

		<section>
			<h2>11. Contact</h2>
			<p>For questions about these terms, please get in touch:</p>
			<ul>
				<li>Email: <a href="mailto:help@easy-md.com">help@easy-md.com</a></li>
				<li>GitHub: <a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">markdown-viewer repository</a></li>
			</ul>
		</section>

		<div class="back-link">
			<a href="/en">← Back to home</a>
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

	.update-date {
		color: var(--text-tertiary, #7f8c8d);
		font-size: 0.9rem;
		margin-bottom: 2rem;
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

	a {
		color: #3498db;
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition: border-color 0.2s;
	}

	a:hover {
		border-bottom-color: #3498db;
	}

	code {
		background: var(--bg-tertiary, #f0f2f5);
		border-radius: 4px;
		padding: 0.1em 0.38em;
		font-size: 0.9em;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
	}

	strong {
		color: var(--text-primary, #000);
		font-weight: 600;
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
	}
</style>
