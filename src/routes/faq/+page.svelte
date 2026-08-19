<script lang="ts">

	const faqs = [
		{
			question: 'EasyMD는 무료인가요?',
			answer:
				'네, 완전히 무료입니다. 유료 플랜이나 기능 제한, 무료 체험 기간 같은 것이 없고 모든 기능을 처음부터 끝까지 쓸 수 있습니다. 운영 비용은 페이지에 표시되는 광고로 충당하고 있습니다. 문서 개수나 글자 수에도 별도의 상한을 두지 않았습니다.'
		},
		{
			question: '로그인이나 회원가입이 필요한가요?',
			answer:
				'필요 없습니다. 주소창에 easy-md.com을 입력하고 에디터를 열면 그 순간부터 바로 쓸 수 있습니다. 이메일 인증도, 소셜 로그인도 받지 않습니다. 작성한 문서를 서버에 보관하지 않기 때문에 사용자를 구분할 계정 자체가 필요하지 않은 구조입니다.'
		},
		{
			question: '작성한 내용이 서버에 저장되나요?',
			answer:
				'아니요. 작성한 모든 내용은 지금 사용 중인 브라우저의 저장 공간(localStorage)에만 기록되며, EasyMD 서버로 전송되지 않습니다. 애초에 문서를 받아 보관하는 서버가 없습니다. 다만 이 방식은 장점과 단점이 함께 있습니다. 남이 볼 수 없다는 것이 장점이고, 브라우저 데이터를 지우면 문서도 함께 사라진다는 것이 단점입니다.'
		},
		{
			question: '브라우저를 닫거나 컴퓨터를 껐다 켜도 문서가 남아 있나요?',
			answer:
				'네, 같은 브라우저로 다시 접속하면 마지막 상태 그대로 열립니다. localStorage는 브라우저를 종료해도 유지되는 저장 공간이기 때문입니다. 단, 시크릿 모드(인코그니토)에서 작성한 문서는 창을 닫는 순간 사라지고, 브라우저 설정에서 "쿠키 및 사이트 데이터 삭제"를 실행하면 저장된 문서도 함께 지워집니다.'
		},
		{
			question: '실수로 지운 내용을 되돌릴 수 있나요?',
			answer:
				'두 가지 방법이 있습니다. 방금 한 작업이라면 Ctrl+Z로 되돌리면 됩니다. 되돌리기 범위를 넘어섰다면 버전 이력을 쓰세요. EasyMD는 5분마다 문서의 스냅샷을 자동으로 남기고 최대 20개까지 보관합니다. 문서 목록의 이력 탭에서 원하는 시점을 골라 클릭 한 번으로 복원할 수 있습니다.'
		},
		{
			question: '저장 버튼을 안 눌러도 되나요?',
			answer:
				'누르지 않아도 됩니다. 타이핑을 멈추고 약 1.2초가 지나면 자동으로 저장됩니다. 헤더의 표시가 "저장 중…"에서 "저장됨"으로 바뀌면 반영이 끝난 것입니다. 여기에 더해 5분마다 버전 이력용 스냅샷이 따로 기록됩니다. 특정 시점을 직접 남겨두고 싶을 때만 Ctrl+S를 누르면 됩니다.'
		},
		{
			question: '오프라인에서도 사용할 수 있나요?',
			answer:
				'페이지를 이미 열어둔 상태라면 인터넷이 끊겨도 계속 작성할 수 있고 저장도 정상 동작합니다. 편집과 저장이 모두 브라우저 안에서 이뤄지기 때문입니다. 다만 EasyMD는 오프라인 전용 설치(PWA)를 지원하지 않으므로, 인터넷이 끊긴 상태에서 새로 접속하거나 새로고침하면 페이지가 열리지 않습니다. 비행기나 지하철처럼 연결이 끊기는 환경이라면 미리 탭을 열어두고 새로고침하지 않는 편이 안전합니다.'
		},
		{
			question: '어떤 파일 형식으로 내보낼 수 있나요?',
			answer:
				'마크다운(.md), PDF, 워드(.docx) 세 가지입니다. 마크다운은 원문 그대로 저장되어 GitHub이나 Obsidian 같은 다른 도구로 그대로 옮길 수 있습니다. PDF는 브라우저 인쇄 창을 거치는 방식이라, 인쇄 대상에서 "PDF로 저장"을 선택하면 됩니다. 워드는 제목·목록·표 서식을 유지한 채 변환되므로 문서 제출용으로 적합합니다.'
		},
		{
			question: '다른 사람에게 문서를 보여주려면 어떻게 하나요?',
			answer:
				'내보내기 메뉴의 "공유 링크 복사"를 사용하세요. 문서 내용을 압축해 URL 자체에 담기 때문에 서버에 아무것도 올라가지 않고, 링크를 받은 사람이 열면 내용이 그대로 복원됩니다. 대신 내용이 길수록 링크도 길어집니다. 분량이 많은 문서라면 마크다운이나 PDF 파일로 내보내 전달하는 편이 낫습니다. 여러 명이 같은 문서를 동시에 고치는 실시간 공동 편집은 지원하지 않습니다.'
		},
		{
			question: '여러 문서를 동시에 작업할 수 있나요?',
			answer:
				'네, 상단 탭으로 여러 문서를 열어두고 클릭 한 번으로 전환할 수 있습니다. 탭을 닫아도 문서는 삭제되지 않고 문서 목록에 그대로 남아 언제든 다시 열 수 있습니다. 문서마다 저장과 버전 이력이 따로 관리되므로, 회의록과 블로그 초안을 오가며 작업해도 서로 섞이지 않습니다.'
		},
		{
			question: '집 컴퓨터에서 쓰던 문서를 회사에서도 볼 수 있나요?',
			answer:
				'볼 수 없습니다. 문서가 서버가 아닌 각 브라우저에 저장되기 때문에 기기 간 동기화가 되지 않습니다. 같은 컴퓨터라도 크롬에서 쓴 문서는 사파리에서 보이지 않습니다. 기기를 옮겨야 한다면 마크다운 파일로 내보낸 뒤 다른 기기에서 Ctrl+O로 열거나, 공유 링크를 복사해 옮기면 됩니다.'
		},
		{
			question: '마크다운을 처음 써도 괜찮나요?',
			answer:
				'괜찮습니다. EasyMD는 입력한 기호가 그 자리에서 서식으로 바뀌는 방식이라 문법을 외우지 않아도 됩니다. 텍스트를 드래그하면 굵게·기울임·색상 같은 도구 모음이 떠오르고, 빈 줄에서 슬래시(/)를 입력하면 제목·목록·표·코드 블록을 목록에서 골라 넣을 수 있습니다. 문법을 익히고 싶다면 마크다운 문법 가이드 페이지를 참고하세요.'
		},
		{
			question: '슬래시(/) 명령어로 무엇을 넣을 수 있나요?',
			answer:
				'빈 줄에서 /를 입력하면 제목 1·제목 2·제목 3, 글머리 기호, 번호 목록, 체크리스트, 코드 블록, 인용구, 표 삽입, 구분선까지 열 가지 블록 메뉴가 열립니다. 이어서 이름 일부를 타이핑하면 목록이 좁혀지고, 위아래 화살표로 고른 뒤 Enter로 넣습니다.'
		},
		{
			question: '표를 만들고 편집하려면 어떻게 하나요?',
			answer:
				'슬래시 메뉴에서 "표 삽입"을 고르면 격자 선택기가 나타납니다. 마우스를 끌어 원하는 행·열 크기를 집으면 첫 줄이 머리글인 표가 만들어집니다. 만들어진 표 안에 커서를 두면 표 전용 도구 모음이 자동으로 떠서 행과 열을 추가하거나 지울 수 있고, 열 경계선을 잡아끌면 너비가 조절됩니다.'
		},
		{
			question: '이미지를 넣을 수 있나요? 용량 제한은요?',
			answer:
				'스크린샷을 Ctrl+V로 붙여넣거나 이미지 파일을 에디터 위로 끌어다 놓으면 바로 들어갑니다. 이때 가로 최대 1280px로 자동 압축됩니다. 이미지는 외부 서버가 아니라 문서 안에 데이터로 함께 저장되므로 링크가 만료될 일이 없는 대신, 사진이 많으면 문서 용량이 커집니다. 브라우저 저장 공간에는 한계가 있으니 사진이 아주 많은 문서라면 마크다운 파일로 내보내 보관하는 편이 좋습니다.'
		},
		{
			question: '코드 블록에서 문법 강조가 되나요?',
			answer:
				'됩니다. 코드 블록을 만들 때 백틱 세 개 뒤에 js, python, java처럼 언어 이름을 붙이면 해당 언어 규칙에 맞춰 색이 입혀집니다. 200여 개 언어를 지원합니다. 언어 이름을 붙이지 않으면 색 없이 고정폭 글꼴로만 표시됩니다.'
		},
		{
			question: '모바일에서도 쓸 수 있나요?',
			answer:
				'네, 화면 크기에 맞춰 배치가 바뀌므로 모바일 브라우저에서도 작성과 저장이 됩니다. 다만 표를 여러 번 편집하거나 단축키를 많이 쓰는 작업은 PC가 훨씬 편합니다. 모바일에서는 이동 중 간단한 메모나 초안 확인 정도로 쓰는 것을 권합니다.'
		},
		{
			question: '다크 모드가 있나요?',
			answer:
				'있습니다. 상단 테마 메뉴에서 라이트·다크·시스템 설정 따라가기 중에 고를 수 있습니다. 시스템 설정을 고르면 운영체제가 야간 모드로 바뀔 때 에디터도 함께 어두워집니다. 선택한 테마는 브라우저에 기억되어 다음 접속에도 유지됩니다.'
		},
		{
			question: '노션과 무엇이 다른가요?',
			answer:
				'쓰임새가 다릅니다. 노션은 팀 협업, 데이터베이스, 권한 관리에 강점이 있는 대신 계정과 로그인이 필요하고 문서가 노션 서버에 저장됩니다. EasyMD는 그런 기능이 없는 대신 접속하는 즉시 쓸 수 있고, 문서가 내 브라우저 밖으로 나가지 않으며, 결과물을 마크다운 원문 그대로 가져갈 수 있습니다. 팀으로 오래 관리할 문서는 노션이, 지금 당장 하나 쓰고 파일로 뽑아야 하는 문서는 EasyMD가 맞습니다.'
		},
		{
			question: 'GitHub README를 쓰기에 적합한가요?',
			answer:
				'적합합니다. 표, 체크리스트, 코드 블록처럼 README에서 자주 쓰는 요소를 그대로 지원하고, 완성한 뒤 마크다운 파일로 내보내면 그대로 붙여 넣을 수 있습니다. 다만 GitHub은 보안상 style 속성을 제거하기 때문에 글자 색은 GitHub에서 적용되지 않는다는 점만 유의하세요. README에 특화된 문법은 블로그의 GitHub README 작성법 글에 정리해두었습니다.'
		},
		{
			question: '광고나 분석 도구가 쓰이나요?',
			answer:
				'네. 서비스 운영 비용을 충당하기 위해 Google AdSense 광고를 표시하고, 어떤 페이지가 많이 쓰이는지 파악하기 위해 Google Analytics와 Cloudflare Web Analytics로 방문 통계를 수집합니다. 이 과정에서 쿠키가 사용됩니다. 다만 작성한 문서의 내용은 이 도구들로 전송되지 않습니다. 수집 항목과 거부 방법은 개인정보처리방침 페이지에 정리해두었습니다.'
		},
		{
			question: '오픈소스인가요?',
			answer:
				'네, 소스 코드가 GitHub에 공개되어 있습니다. 문서가 정말 서버로 전송되지 않는지 직접 코드로 확인할 수 있습니다. 버그 제보나 기능 제안도 GitHub Issues로 받고 있습니다.'
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
	<!-- FAQ JSON-LD Schema -->
	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>

<div class="legal-page">
	<div class="container">
		<h1>자주 묻는 질문</h1>
		<p class="tagline">EasyMD 사용 전 궁금한 점을 확인하세요</p>

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
			<h2>함께 보면 좋은 문서</h2>
			<ul>
				<li><a href="/guide">마크다운 문법 가이드</a> — 제목·목록·표·링크 기본기를 한 번에</li>
				<li><a href="/use-cases">활용 사례와 따라 하기</a> — 회의록·README·블로그 초안 작업 순서</li>
				<li><a href="/templates">템플릿 모음</a> — 복사해서 바로 쓰는 문서 양식</li>
				<li><a href="/shortcuts">단축키 모음</a></li>
				<li><a href="/compare">다른 마크다운 에디터와 비교</a> — EasyMD가 맞지 않는 경우 포함</li>
				<li><a href="/privacy">개인정보처리방침</a> — 수집 항목과 거부 방법</li>
			</ul>
		</section>

		<section class="more-help">
			<h2>더 궁금한 점이 있으신가요?</h2>
			<p>
				여기에 없는 질문, 버그 제보, 기능 제안은 GitHub Issues로 남겨주세요.
				공개된 저장소라 소스 코드를 직접 확인할 수도 있습니다.
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
