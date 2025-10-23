<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	onMount(() => {
		document.title = '이용약관 - 이지 마크다운';
		themeStore.init();
	});
</script>

<div class="legal-page">
	<div class="container">
		<h1>이용약관</h1>
		<p class="update-date">최종 업데이트: 2025년 10월</p>

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
				<li>서비스의 소스 코드를 무단으로 복제하거나 상업적으로 이용하는 행위</li>
				<li>다른 사용자나 제3자의 권리를 침해하는 행위</li>
			</ul>
		</section>

		<section>
			<h2>4. 지적 재산권</h2>

			<h3>4.1 서비스</h3>
			<p>
				서비스의 소스 코드는 오픈소스로 제공됩니다.
				자세한 내용은 <a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">GitHub 저장소</a>를 참조하세요.
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
				<li>GitHub: <a href="https://github.com/sanchez-kim/markdown-viewer" target="_blank" rel="noopener">markdown-viewer 저장소</a></li>
				<li>Issues: <a href="https://github.com/sanchez-kim/markdown-viewer/issues" target="_blank" rel="noopener">GitHub Issues</a></li>
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
