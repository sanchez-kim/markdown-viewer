<script lang="ts">
	// privacy 페이지. 한국어(`/privacy`)와 영어(`/en/privacy`)가 이 컴포넌트를 공유한다.
	//
	// 본문이 통째로 다른 산문이라 사전(키-값)이 아니라 언어별 마크업으로 나눈다 —
	// 문장을 키로 쪼개면 번역할 때 맥락이 사라진다. 스타일은 한 벌만 두고 공유한다.
	import type { Locale } from '$lib/i18n';

	export let locale: Locale;
</script>

<svelte:head>
	{#if locale === 'ko'}
		<title>개인정보처리방침 - 이지 마크다운 (EasyMD)</title>
		<meta name="description" content="이지 마크다운(EasyMD)의 개인정보처리방침입니다. 작성한 문서는 서버로 전송되지 않고 브라우저 LocalStorage에만 저장되며, 개인정보를 수집하지 않습니다." />

		<!-- 나머지 OG/트위터 태그는 +layout.svelte 공통값 사용 -->
		<meta property="og:title" content="개인정보처리방침 - 이지 마크다운 (EasyMD)" />
		<meta property="og:description" content="작성한 문서는 서버로 전송되지 않고 브라우저 LocalStorage에만 저장되며, 개인정보를 수집하지 않습니다." />
	{:else}
	<title>Privacy Policy - EasyMD</title>
	<meta name="description" content="The EasyMD privacy policy. Documents you write are stored only in your browser's LocalStorage and are never sent to a server." />

	<!-- 나머지 OG/트위터 태그는 +layout.svelte 공통값 사용 -->
	<meta property="og:title" content="Privacy Policy - EasyMD" />
	<meta property="og:description" content="Documents you write are stored only in your browser and are never sent to a server." />
	{/if}
</svelte:head>

{#if locale === 'ko'}
<div class="legal-page">
	<div class="container">
		<h1>개인정보처리방침</h1>
		<p class="update-date">최종 업데이트: 2026년 8월</p>

		<section>
			<h2>1. 개요</h2>
			<p>
				이지 마크다운 (EasyMD, "서비스")는 사용자의 프라이버시를 존중하며, 개인정보 보호에 최선을 다하고 있습니다.
				본 개인정보처리방침은 서비스 이용 시 수집되는 정보와 그 사용 방법에 대해 설명합니다.
			</p>
		</section>

		<section>
			<h2>2. 수집하는 정보</h2>

			<h3>2.1 로컬 저장 정보</h3>
			<p>다음 정보가 귀하의 브라우저 LocalStorage에 <strong>로컬로만</strong> 저장됩니다:</p>
			<ul>
				<li>작성한 마크다운 문서 내용</li>
				<li>파일명</li>
				<li>저장 시각</li>
				<li>테마 설정 (라이트/다크 모드)</li>
			</ul>
			<p>
				<strong>중요:</strong> 이 정보는 귀하의 브라우저에만 저장되며,
				<strong>서버로 전송되지 않습니다</strong>. 귀하만 접근할 수 있습니다.
			</p>

			<h3>2.2 분석 정보 (Cloudflare Web Analytics)</h3>
			<p>서비스 개선을 위해 다음 익명 통계 정보를 수집합니다:</p>
			<ul>
				<li>페이지 조회수</li>
				<li>방문자 국가</li>
				<li>브라우저 및 기기 유형</li>
				<li>참조 사이트</li>
			</ul>
			<p>
				<strong>Cloudflare Web Analytics는 쿠키를 사용하지 않으며</strong>,
				IP 주소를 저장하지 않고, 개인을 식별할 수 없는 방식으로 작동합니다.
				따라서 <strong>별도의 사용자 동의가 필요하지 않습니다</strong>.
			</p>
			<p>
				Cloudflare의 개인정보처리방침:
				<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">
					https://www.cloudflare.com/privacypolicy/
				</a>
			</p>

			<h3>2.3 광고 서비스 (Google AdSense)</h3>
			<p>
				서비스는 Google AdSense를 사용하여 광고를 표시할 수 있습니다.
				Google은 쿠키를 사용하여 관련성 높은 광고를 제공할 수 있습니다.
			</p>
			<p>
				Google의 개인정보처리방침:
				<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
					https://policies.google.com/privacy
				</a>
			</p>

			<h3>2.4 분석 정보 (Google Analytics)</h3>
			<p>
				서비스는 방문 통계 분석을 위해 Google Analytics(GA4)를 사용합니다.
				Google Analytics는 쿠키를 사용하여 페이지 조회, 방문 기기·브라우저, 참조 경로 등
				익명화된 사용 데이터를 수집하며, 개별 문서 내용은 수집하지 않습니다.
			</p>
			<p>
				브라우저 설정에서 쿠키를 거부하거나
				<a
					href="https://tools.google.com/dlpage/gaoptout"
					target="_blank"
					rel="noopener">Google Analytics 차단 부가기능</a
				>을 통해 수집을 거부할 수 있습니다.
			</p>
		</section>

		<section>
			<h2>3. 정보의 사용</h2>
			<ul>
				<li>로컬 저장 정보: 귀하의 작업을 보존하고 복원하는 데 사용</li>
				<li>분석 정보: 서비스 성능 모니터링 및 개선</li>
				<li>광고 정보: 관련성 높은 광고 제공</li>
			</ul>
		</section>

		<section>
			<h2>4. 정보 공유</h2>
			<p>
				귀하의 마크다운 문서 내용은 <strong>절대 공유되지 않습니다</strong>.
				브라우저에만 저장되며 서버로 전송되지 않습니다.
			</p>
			<p>제3자 서비스:</p>
			<ul>
				<li><strong>Cloudflare:</strong> 익명 웹 분석</li>
				<li><strong>Google Analytics:</strong> 방문 통계 분석</li>
				<li><strong>Google AdSense:</strong> 광고 제공</li>
				<li><strong>Netlify:</strong> 웹 호스팅</li>
			</ul>
		</section>

		<section>
			<h2>5. 데이터 보안</h2>
			<p>
				모든 마크다운 문서는 귀하의 브라우저에만 저장됩니다.
				네트워크를 통해 전송되지 않으므로 가장 안전한 방식입니다.
			</p>
			<p>
				단, 귀하의 기기 보안은 귀하의 책임입니다.
				공용 컴퓨터에서 사용 시 주의하시기 바랍니다.
			</p>
		</section>

		<section>
			<h2>6. 사용자 권리</h2>
			<p>귀하는 다음 권리를 가집니다:</p>
			<ul>
				<li>브라우저 설정에서 LocalStorage 삭제</li>
				<li>브라우저 설정에서 쿠키 거부</li>
				<li>Google 광고 설정에서 맞춤 광고 비활성화</li>
			</ul>
		</section>

		<section>
			<h2>7. 어린이 개인정보</h2>
			<p>
				본 서비스는 13세 미만 어린이를 대상으로 하지 않으며,
				의도적으로 어린이의 개인정보를 수집하지 않습니다.
			</p>
		</section>

		<section>
			<h2>8. 개인정보처리방침 변경</h2>
			<p>
				본 방침은 필요시 업데이트될 수 있습니다.
				변경 사항은 본 페이지에 게시되며, 상단의 "최종 업데이트" 날짜가 갱신됩니다.
			</p>
		</section>

		<section>
			<h2>9. 연락처</h2>
			<p>개인정보처리방침에 대한 문의사항이 있으시면 다음으로 연락주세요:</p>
			<ul>
				<li>이메일: <a href="mailto:help@easy-md.com">help@easy-md.com</a></li>
				<li>GitHub: <a href="https://github.com/sanchez-kim" target="_blank" rel="noopener">@sanchez-kim</a></li>
			</ul>
			<p>
				개인정보 열람·삭제 요청도 위 이메일로 접수합니다. 다만 작성하신 문서는 서버에 보관되지
				않고 브라우저에만 저장되므로, 저희가 삭제해 드릴 수 있는 문서 데이터 자체가 없습니다.
				문서를 지우려면 브라우저의 사이트 데이터를 삭제하시면 됩니다.
			</p>
		</section>

		<div class="back-link">
			<a href="/">← 홈으로 돌아가기</a>
		</div>
	</div>
</div>
{:else}
<div class="legal-page">
	<div class="container">
		<h1>Privacy Policy</h1>
		<p class="update-date">Last updated: August 2026</p>

		<section>
			<h2>1. Overview</h2>
			<p>
				EasyMD ("the Service") is built so that the documents you write stay with you. This policy
				explains what information is involved when you use the Service, what happens to it, and
				what it does not do.
			</p>
		</section>

		<section>
			<h2>2. Information involved</h2>

			<h3>2.1 Stored locally in your browser</h3>
			<p>The following is written to your browser's LocalStorage and nowhere else:</p>
			<ul>
				<li>The content of the Markdown documents you write</li>
				<li>File names</li>
				<li>Save timestamps and version history</li>
				<li>Your theme preference (light, dark, or system)</li>
			</ul>
			<p class="highlight">
				<strong>Important:</strong> this data is stored only in your browser. It is not transmitted
				to any EasyMD server — there is no server that receives documents. Only you can access it.
			</p>

			<h3>2.2 Analytics (Cloudflare Web Analytics)</h3>
			<p>To understand how the Service is used, the following anonymous statistics are collected:</p>
			<ul>
				<li>Page views</li>
				<li>Visitor country</li>
				<li>Browser and device type</li>
				<li>Referring site</li>
			</ul>
			<p>
				Cloudflare Web Analytics does not use cookies and does not store IP addresses, and it
				cannot identify individuals. See
				<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare's privacy policy</a>.
			</p>

			<h3>2.3 Analytics (Google Analytics)</h3>
			<p>
				The Service uses Google Analytics (GA4) for visit statistics. Google Analytics uses cookies
				to collect anonymised usage data such as page views, device and browser type, and referral
				paths. <strong>The contents of your documents are never sent to it.</strong> You can refuse
				cookies in your browser settings or install the
				<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics opt-out add-on</a>.
			</p>

			<h3>2.4 Advertising (Google AdSense)</h3>
			<p>
				The Service displays ads through Google AdSense, which is how it stays free to use. Google
				may use cookies to serve more relevant ads. See
				<a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google's privacy policy</a>,
				and you can turn off personalised advertising in your
				<a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google Ad settings</a>.
			</p>
		</section>

		<section>
			<h2>3. How information is used</h2>
			<ul>
				<li><strong>Locally stored data</strong> — to preserve and restore your work</li>
				<li><strong>Analytics</strong> — to monitor and improve the Service</li>
				<li><strong>Advertising data</strong> — to serve relevant ads</li>
			</ul>
		</section>

		<section>
			<h2>4. Sharing</h2>
			<p class="highlight">
				<strong>The contents of your documents are never shared.</strong> They are stored in your
				browser and are not transmitted to a server.
			</p>
			<p>Third-party services used to operate the site:</p>
			<ul>
				<li><strong>Cloudflare</strong> — anonymous web analytics</li>
				<li><strong>Google Analytics</strong> — visit statistics</li>
				<li><strong>Google AdSense</strong> — advertising</li>
				<li><strong>Netlify</strong> — web hosting</li>
			</ul>
		</section>

		<section>
			<h2>5. Data security</h2>
			<p>
				Because your documents are stored only in your browser and never travel over the network,
				there is no server-side copy to be breached. The trade-off is that the security of your own
				device is your responsibility — take care when using EasyMD on a shared or public computer,
				and delete your documents from the list before you leave.
			</p>
		</section>

		<section>
			<h2>6. Your choices</h2>
			<ul>
				<li>Delete LocalStorage through your browser settings to remove your documents</li>
				<li>Refuse cookies through your browser settings</li>
				<li>Turn off personalised advertising in your Google Ad settings</li>
			</ul>
		</section>

		<section>
			<h2>7. Children's privacy</h2>
			<p>
				The Service is not directed at children under 13, and it does not knowingly collect
				personal information from children.
			</p>
		</section>

		<section>
			<h2>8. Changes to this policy</h2>
			<p>
				This policy may be updated as needed. Changes are posted on this page and the "Last
				updated" date at the top is revised.
			</p>
		</section>

		<section>
			<h2>9. Contact</h2>
			<p>For questions about this privacy policy, please get in touch:</p>
			<ul>
				<li>Email: <a href="mailto:help@easy-md.com">help@easy-md.com</a></li>
				<li>GitHub: <a href="https://github.com/sanchez-kim" target="_blank" rel="noopener">@sanchez-kim</a></li>
			</ul>
			<p>
				Requests to access or delete personal data can be sent to the same address. Note, however,
				that your documents are not held on a server — they exist only in your browser — so there
				is no document data for us to delete on your behalf. To remove them, clear this site's data
				in your browser.
			</p>
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
