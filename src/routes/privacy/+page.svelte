<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	onMount(() => {
		document.title = '개인정보처리방침 - 마크다운 뷰어';
		themeStore.init();
	});
</script>

<div class="legal-page">
	<div class="container">
		<h1>개인정보처리방침</h1>
		<p class="update-date">최종 업데이트: 2025년 1월</p>

		<section>
			<h2>1. 개요</h2>
			<p>
				마크다운 뷰어("서비스")는 사용자의 프라이버시를 존중하며, 개인정보 보호에 최선을 다하고 있습니다.
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
			<p>서비스 개선을 위해 다음 정보를 수집합니다:</p>
			<ul>
				<li>페이지 조회수</li>
				<li>방문자 국가</li>
				<li>브라우저 및 기기 유형</li>
				<li>참조 사이트</li>
			</ul>
			<p>
				<strong>Cloudflare Web Analytics는 쿠키를 사용하지 않으며</strong>,
				IP 주소를 저장하지 않고, 개인을 식별할 수 없는 방식으로 작동합니다.
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
				<li>GitHub: <a href="https://github.com/sanchez-kim" target="_blank" rel="noopener">@sanchez-kim</a></li>
				<li>이메일: 저장소의 Issues를 통해 문의해주세요</li>
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
