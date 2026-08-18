<script lang="ts">
</script>

<svelte:head>
	<title>EasyMD vs 노션·Typora·Obsidian — 마크다운 에디터 비교</title>
	<meta name="description" content="EasyMD와 Notion, Typora, Obsidian, HackMD를 비교합니다. 완전 무료, 로그인 불필요, 즉시 사용 가능한 마크다운 에디터를 찾는다면 EasyMD를 확인하세요." />
	<meta property="og:title" content="EasyMD vs 노션·Typora·Obsidian — 마크다운 에디터 비교" />
	<meta property="og:description" content="EasyMD와 Notion, Typora, Obsidian, HackMD를 비교합니다. 완전 무료, 로그인 불필요, 즉시 사용 가능한 마크다운 에디터." />
</svelte:head>

<div class="legal-page">
	<div class="container">
		<h1>마크다운 에디터 비교</h1>
		<p class="tagline">EasyMD vs Notion · Typora · Obsidian · HackMD</p>

		<section>
			<p class="intro">
				마크다운 에디터는 다양한 선택지가 있습니다. 각 도구의 장단점을 객관적으로 정리했습니다.
				가격·편의성·프라이버시를 중심으로 비교해보세요.
			</p>
		</section>

		<section>
			<h2>📊 한눈에 비교하기</h2>

			<div class="table-wrapper">
				<table class="compare-table">
					<thead>
						<tr>
							<th>항목</th>
							<th class="highlight-col">EasyMD</th>
							<th>Notion</th>
							<th>Typora</th>
							<th>Obsidian</th>
							<th>HackMD</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="feature-label">💰 가격</td>
							<td class="highlight-col"><span class="badge good">완전 무료</span></td>
							<td>무료 플랜 있음<br /><small>(Pro $8/월)</small></td>
							<td>$14.99 일회성</td>
							<td>무료 / 플러그인 유료</td>
							<td>무료 플랜 있음</td>
						</tr>
						<tr>
							<td class="feature-label">🔑 로그인</td>
							<td class="highlight-col"><span class="badge good">불필요</span></td>
							<td>필수</td>
							<td>불필요</td>
							<td>불필요</td>
							<td>필수 (공유 시)</td>
						</tr>
						<tr>
							<td class="feature-label">⬇️ 설치</td>
							<td class="highlight-col"><span class="badge good">불필요</span></td>
							<td>불필요 (웹)</td>
							<td>필요</td>
							<td>필요</td>
							<td>불필요 (웹)</td>
						</tr>
						<tr>
							<td class="feature-label">📝 마크다운 전용</td>
							<td class="highlight-col"><span class="badge good">전용</span></td>
							<td>부분 지원</td>
							<td>전용</td>
							<td>전용</td>
							<td>전용</td>
						</tr>
						<tr>
							<td class="feature-label">🌐 오프라인 사용</td>
							<td class="highlight-col">제한적<br /><small>(탭을 열어둔 동안만)</small></td>
							<td>제한적</td>
							<td>가능</td>
							<td>가능</td>
							<td>불가</td>
						</tr>
						<tr>
							<td class="feature-label">🔒 문서 저장 위치</td>
							<td class="highlight-col"><span class="badge good">내 브라우저</span></td>
							<td>제공사 서버</td>
							<td>내 컴퓨터</td>
							<td>내 컴퓨터</td>
							<td>제공사 서버</td>
						</tr>
						<tr>
							<td class="feature-label">🔄 기기 간 동기화</td>
							<td class="highlight-col">미지원</td>
							<td>지원</td>
							<td>미지원</td>
							<td>유료 부가서비스</td>
							<td>지원</td>
						</tr>
						<tr>
							<td class="feature-label">👥 실시간 공동 편집</td>
							<td class="highlight-col">미지원</td>
							<td>지원</td>
							<td>미지원</td>
							<td>미지원</td>
							<td>지원</td>
						</tr>
						<tr>
							<td class="feature-label">📤 내보내기</td>
							<td class="highlight-col">MD · PDF · DOCX</td>
							<td>PDF · HTML 등</td>
							<td>PDF · HTML 등</td>
							<td>MD · PDF (플러그인)</td>
							<td>MD · HTML</td>
						</tr>
						<tr>
							<td class="feature-label">🖥️ WYSIWYG</td>
							<td class="highlight-col"><span class="badge good">지원</span></td>
							<td>지원</td>
							<td>지원</td>
							<td>제한적</td>
							<td>지원</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section>
			<h2>✅ EasyMD의 장점</h2>

			<div class="advantage-grid">
				<div class="advantage-card">
					<div class="adv-icon">🆓</div>
					<h3>영구 무료</h3>
					<p>플랜 제한이나 월 구독 없이 모든 기능을 무료로 사용할 수 있습니다.</p>
				</div>
				<div class="advantage-card">
					<div class="adv-icon">⚡</div>
					<h3>즉시 사용</h3>
					<p>설치도, 회원가입도 필요 없습니다. URL 하나로 바로 시작하세요.</p>
				</div>
				<div class="advantage-card">
					<div class="adv-icon">🔒</div>
					<h3>문서가 내 밖으로 안 나감</h3>
					<p>작성한 내용은 브라우저에만 저장되고 서버로 전송되지 않습니다. 계정이 없으니 유출될 문서 목록도 없습니다.</p>
				</div>
				<div class="advantage-card">
					<div class="adv-icon">📝</div>
					<h3>마크다운에 집중</h3>
					<p>불필요한 기능 없이 마크다운 작성에 최적화된 깔끔한 인터페이스를 제공합니다.</p>
				</div>
			</div>
		</section>

		<section>
			<h2>도구별로 하나씩 뜯어보기</h2>

			<h3>Notion — 문서를 &lsquo;쌓아두는&rsquo; 팀에 맞습니다</h3>
			<p>
				노션의 진짜 강점은 편집기가 아니라 그 뒤에 있는 데이터베이스와 권한 관리입니다.
				문서를 표로 묶어 상태·담당자·마감일로 필터링하고, 페이지 안에 페이지를 계속
				중첩하며 위키를 키워갈 수 있습니다. 여러 명이 같은 문서를 동시에 고치고 댓글로
				논의하는 흐름도 자연스럽습니다.
			</p>
			<p>
				반대로 &ldquo;지금 이 글 하나를 쓰고 파일로 뽑겠다&rdquo;는 목적에는 무겁습니다.
				계정을 만들고 워크스페이스를 고르는 절차가 앞에 붙고, 노션은 마크다운 전용이
				아니라서 <strong>내보낸 결과가 입력한 마크다운과 정확히 일치하지 않는</strong> 경우가
				있습니다. 특히 코드 블록이나 중첩 목록을 다른 도구로 옮길 때 손이 한 번 더 갑니다.
			</p>

			<h3>Typora — 로컬 파일을 다루는 가장 깔끔한 방법</h3>
			<p>
				Typora는 데스크톱 앱이고, 내 컴퓨터의 <code>.md</code> 파일을 직접 열고 저장합니다.
				입력한 기호가 즉시 서식으로 바뀌는 방식을 가장 먼저 다듬은 도구라 편집 경험이
				매끄럽고, 문서가 커져도 느려지지 않습니다. 마크다운 파일을 폴더로 관리하며 오래
				작업하는 사람에게는 여전히 좋은 선택입니다.
			</p>
			<p>
				대신 <strong>설치가 필요하고 유료입니다.</strong> 회사 노트북처럼 설치 권한이 없는
				환경, 남의 컴퓨터를 잠깐 빌려 쓰는 상황, 아이패드나 휴대폰에서는 쓸 수 없습니다.
				&ldquo;지금 당장 여기서&rdquo;가 조건이면 후보에서 빠집니다.
			</p>

			<h3>Obsidian — 글쓰기 도구라기보다 지식 관리 도구</h3>
			<p>
				옵시디언의 핵심은 문서 사이를 잇는 링크와 그래프 뷰, 그리고 방대한 플러그인
				생태계입니다. 노트가 수백 개 단위로 쌓이고 그 사이 연결이 중요해지는 시점부터
				가치가 나옵니다. 파일은 내 컴퓨터에 마크다운으로 남으므로 잠금 효과도 적습니다.
			</p>
			<p>
				다만 한 편의 글을 쓰기 위해 켜기에는 <strong>준비 과정이 깁니다.</strong> 보관함
				설정, 플러그인 선택, 테마 조정에 시간이 들고, 기본 편집 화면은 마크다운 원문을
				그대로 보여주는 쪽에 가깝습니다. 기기 간 동기화도 별도 유료 서비스입니다.
			</p>

			<h3>HackMD — 여럿이 동시에 마크다운을 쓸 때</h3>
			<p>
				실시간 공동 편집을 마크다운으로 하고 싶다면 HackMD가 가장 직접적인 답입니다.
				회의 중에 여러 명이 한 문서를 같이 채워 넣고 링크로 바로 공유하는 흐름이 강점입니다.
			</p>
			<p>
				문서가 HackMD 서버에 저장되고, 공유하거나 이어서 쓰려면 결국 계정이 필요합니다.
				혼자 쓰는 짧은 문서에는 오히려 절차가 많습니다.
			</p>

			<h3>EasyMD — 마찰 없이 한 편 쓰고 파일로 꺼내는 용도</h3>
			<p>
				EasyMD가 노리는 지점은 좁습니다. <strong>주소를 열면 그 자리에서 바로 쓸 수 있고,
				다 쓰면 마크다운·PDF·워드로 꺼내는 것</strong>까지입니다. 계정도 설치도 없으니 처음
				쓰기 시작할 때까지 걸리는 시간이 가장 짧고, 문서가 브라우저 밖으로 나가지 않으니
				회사 문서를 외부 서비스에 올려도 되는지 고민할 필요가 없습니다.
			</p>
			<p>
				바꿔 말하면 위 도구들이 가진 것 대부분이 없습니다. 아래에 솔직하게 적어두겠습니다.
			</p>
		</section>

		<section class="limits-section">
			<h2>EasyMD를 쓰면 안 되는 경우</h2>
			<p>
				비교 글이 자기 도구만 좋다고 하면 참고가 되지 않으니, 맞지 않는 상황을 먼저 적습니다.
				아래에 해당한다면 다른 도구를 쓰는 편이 낫습니다.
			</p>
			<ul class="recommend-list">
				<li><strong>여러 기기에서 같은 문서를 이어 써야 한다</strong> — 동기화가 없습니다. 집 PC에서 쓴 문서가 회사 PC에서 보이지 않습니다. → Notion, HackMD</li>
				<li><strong>여러 명이 동시에 편집해야 한다</strong> — 실시간 공동 편집을 지원하지 않습니다. → HackMD, Notion</li>
				<li><strong>문서가 수백 개 쌓이고 서로 연결된다</strong> — 검색·백링크·태그 체계가 없습니다. → Obsidian</li>
				<li><strong>인터넷이 끊긴 환경에서 새로 열어야 한다</strong> — 오프라인 설치(PWA)를 지원하지 않아 새로고침하면 열리지 않습니다. → Typora, Obsidian</li>
				<li><strong>절대 잃으면 안 되는 문서다</strong> — 브라우저 데이터를 지우면 함께 사라집니다. 백업이 필요하면 파일로 내보내 두세요.</li>
			</ul>
		</section>

		<section>
			<h2>🤔 그래서 어떤 도구가 나에게 맞을까?</h2>
			<ul class="recommend-list">
				<li><strong>팀 위키·프로젝트 관리가 필요하다면</strong> → Notion</li>
				<li><strong>회의 중 여럿이 같이 받아써야 한다면</strong> → HackMD</li>
				<li><strong>노트를 오래 쌓고 연결하며 관리한다면</strong> → Obsidian</li>
				<li><strong>내 컴퓨터의 마크다운 파일을 매일 다룬다면</strong> → Typora</li>
				<li><strong>지금 이 글 하나를 쓰고 파일로 뽑아야 한다면</strong> → <strong>EasyMD ✓</strong></li>
				<li><strong>설치 권한이 없는 컴퓨터에서 써야 한다면</strong> → <strong>EasyMD ✓</strong></li>
				<li><strong>문서를 외부 서비스에 올리기 곤란하다면</strong> → <strong>EasyMD ✓</strong></li>
			</ul>
			<p class="price-note">
				표의 가격과 플랜 정보는 작성 시점 기준이며 각 서비스의 정책에 따라 바뀔 수 있습니다.
				결제 전에는 해당 서비스의 공식 요금 페이지를 확인하세요. EasyMD는 위 다섯 도구와
				아무런 제휴 관계가 없습니다.
			</p>
		</section>

		<section class="cta-section">
			<h2>직접 써보세요</h2>
			<p>30초 안에 시작할 수 있습니다. 설치도, 회원가입도 필요 없습니다.</p>
			<a href="/editor" class="cta-button">EasyMD 무료로 시작하기 →</a>
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
		max-width: 900px;
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

	.intro {
		color: var(--text-secondary, #2c3e50);
		line-height: 1.8;
		font-size: 1.05rem;
	}

	section {
		margin-bottom: 2.5rem;
	}

	h2 {
		color: var(--text-header, #2c3e50);
		margin-top: 2rem;
		margin-bottom: 1.25rem;
		font-size: 1.5rem;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.5rem;
	}

	h3 {
		color: var(--text-secondary, #34495e);
		margin: 0.5rem 0 0.4rem;
		font-size: 1.05rem;
	}

	p {
		line-height: 1.8;
		margin-bottom: 0.75rem;
		color: var(--text-secondary, #2c3e50);
	}

	/* 도구별 서술 섹션의 소제목. 카드 안 h3(.advantage-card h3)는 건드리지 않도록
	   section의 직계 자식만 겨냥한다. */
	section > h3 {
		margin: 1.9rem 0 0.6rem;
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--text-header, #2c3e50);
	}

	section > h3:first-of-type {
		margin-top: 1rem;
	}

	code {
		background: var(--bg-tertiary, #f0f2f5);
		border-radius: 4px;
		padding: 0.1em 0.38em;
		font-size: 0.9em;
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
	}

	.limits-section {
		background: var(--bg-tertiary, #fff8f0);
		border: 1px solid #f0d9c0;
		border-left: 4px solid #e08a3c;
		border-radius: 8px;
		padding: 1.75rem 1.75rem 1.25rem;
	}

	.limits-section h2 {
		margin-top: 0;
		border-bottom: none;
		padding-bottom: 0;
		font-size: 1.3rem;
	}

	.price-note {
		margin-top: 1.5rem;
		font-size: 0.88rem;
		line-height: 1.75;
		color: var(--text-tertiary, #6b7684);
	}

	:global(html.dark) .limits-section {
		background: #241c14;
		border-color: #4a3826;
		border-left-color: #c47a35;
	}

	/* Table */
	.table-wrapper {
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		border-radius: 8px;
		border: 1px solid var(--border-color, #e0e0e0);
	}

	.compare-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.92rem;
		min-width: 620px;
	}

	.compare-table th,
	.compare-table td {
		padding: 0.75rem 1rem;
		text-align: center;
		border-bottom: 1px solid var(--border-color, #e8e8e8);
		vertical-align: middle;
	}

	.compare-table th {
		background: var(--bg-primary, #f7f7f7);
		color: var(--text-header, #2c3e50);
		font-weight: 700;
		font-size: 0.9rem;
	}

	.compare-table td.feature-label {
		text-align: left;
		font-weight: 600;
		color: var(--text-secondary, #34495e);
		white-space: nowrap;
	}

	.compare-table tr:last-child td {
		border-bottom: none;
	}

	.compare-table tbody tr:hover {
		background: var(--bg-primary, #fafafa);
	}

	.compare-table small {
		color: var(--text-tertiary, #999);
		font-size: 0.8rem;
	}

	.highlight-col {
		background: #eaf4fb;
		font-weight: 600;
	}

	.compare-table th.highlight-col {
		background: #3498db;
		color: white;
	}

	/* 강조 열 배경이 고정 밝은색이라 다크 모드에서 밝은 본문색과 겹쳐 안 읽혔다.
	   배경만 어둡게 바꾼다 — 뱃지(.badge)는 자기 배경·글자색을 따로 가지므로 건드리지 않는다. */
	:global(html.dark) .compare-table td.highlight-col {
		background: #16304a;
	}

	.badge {
		display: inline-block;
		padding: 0.2rem 0.6rem;
		border-radius: 20px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.badge.good {
		background: #d5f5e3;
		color: #1e8449;
	}

	/* Advantage grid */
	.advantage-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}

	.advantage-card {
		border: 1px solid var(--border-color, #e0e0e0);
		border-radius: 8px;
		padding: 1.25rem;
		text-align: center;
	}

	.adv-icon {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}

	/* Recommend list */
	.recommend-list {
		margin: 1rem 0;
		padding-left: 1.5rem;
		line-height: 2;
	}

	.recommend-list li {
		color: var(--text-secondary, #2c3e50);
	}

	/* CTA */
	.cta-section {
		background: linear-gradient(135deg, #3498db, #2980b9);
		border-radius: 8px;
		padding: 2rem;
		text-align: center;
		color: white;
	}

	.cta-section h2 {
		color: white;
		border-bottom: none;
		margin-top: 0;
	}

	.cta-section p {
		color: rgba(255, 255, 255, 0.9);
	}

	.cta-button {
		display: inline-block;
		background: white;
		color: #2980b9;
		padding: 0.75rem 2rem;
		border-radius: 6px;
		font-weight: 700;
		font-size: 1rem;
		text-decoration: none;
		transition: transform 0.2s, box-shadow 0.2s;
		border-bottom: none;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		border-bottom: none;
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

		h2 {
			font-size: 1.3rem;
		}

		.advantage-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
