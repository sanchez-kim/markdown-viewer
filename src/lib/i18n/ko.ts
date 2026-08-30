// 한국어 사전 = 원본(source of truth).
// en.ts는 여기서 뽑은 Dict 타입을 만족해야 하므로, 키를 추가하면 영어 번역을
// 빠뜨린 순간 `npm run check`에서 타입 에러로 잡힌다.

const ko = {
	brand: {
		name: '이지 마크다운',
		full: '이지 마크다운 (EasyMD)',
		homeAria: '이지 마크다운 홈',
		logoAlt: '이지 마크다운 로고'
	},

	nav: {
		guide: '가이드',
		blog: '블로그',
		openEditor: '에디터 열기',
		openEditorArrow: '에디터 열기 →',
		mainMenuAria: '주요 메뉴',
		siteMenuAria: '사이트 메뉴',
		policyAria: '정책',
		// 언어 전환 버튼에 보이는 글자는 LOCALE_NAME(각 언어 자체 표기)을 쓴다.
		// 여기 값은 스크린리더용 설명이다.
		languageAria: '언어 선택'
	},

	footer: {
		contact: '문의 help@easy-md.com',
		copyright: '© 2026 이지 마크다운 (EasyMD)'
	},

	// seo.ts의 PAGE_META용. BreadcrumbList와 공용 푸터에 쓰인다.
	pages: {
		home: '홈',
		editor: '에디터',
		blog: '블로그',
		guide: '마크다운 문법 가이드',
		templates: '템플릿 모음',
		useCases: '활용 사례',
		compare: '에디터 비교',
		shortcuts: '단축키',
		about: '소개',
		faq: '자주 묻는 질문',
		changelog: '업데이트 내역',
		privacy: '개인정보처리방침',
		terms: '이용약관'
	},

	landing: {
		title: '이지 마크다운 - EasyMD | 무료 실시간 마크다운 에디터',
		description:
			'브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원. 로그인 불필요, 개인정보 수집 없음.',
		ogDescription:
			'브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원.',
		keywords:
			'마크다운, 마크다운 에디터, markdown, markdown editor, 실시간 미리보기, 무료 에디터, 온라인 에디터, PDF 변환',
		jsonLdDescription:
			'브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원. 로그인 불필요.',
		jsonLdFeatures: [
			'실시간 마크다운 미리보기',
			'자동 저장',
			'PDF 내보내기',
			'DOCX 내보내기',
			'이미지 삽입',
			'표 편집'
		],

		badge: '무료 · 설치 불필요 · 브라우저에서 바로',
		heroTitle: '노션처럼 쓰는<br>마크다운 에디터',
		heroSub: '글을 쓰면 바로 예쁘게 보입니다.<br>저장은 자동으로, 내보내기는 MD·PDF·Word까지.',
		heroCta: '지금 바로 써보기 →',
		bottomCta: '에디터 열고 바로 시작하기 →',

		features: [
			{ icon: '✏️', label: '쓰는 대로 바로 보임' },
			{ icon: '💾', label: '자동 저장' },
			{ icon: '📁', label: 'MD / PDF / Word 내보내기' },
			{ icon: '🌙', label: '다크 모드' },
			{ icon: '🔒', label: '내 컴퓨터에만 저장' }
		],

		introAria: '이지 마크다운 소개',
		introHeading: 'EasyMD — 브라우저에서 바로 쓰는 무료 마크다운 에디터',
		introBody:
			'이지 마크다운(EasyMD)은 설치나 로그인 없이 웹 브라우저에서 바로 사용하는 무료 마크다운 에디터입니다. 글을 입력하면 노션처럼 곧바로 예쁘게 정리되어 보이고, 작성한 문서는 자동으로 저장됩니다. 완성한 글은 마크다운(.md), PDF, 워드(.docx) 파일로 내보낼 수 있어 README 작성, 회의록, 블로그 초안, 기술 문서 등 어떤 글쓰기에도 활용할 수 있습니다. 모든 데이터는 서버로 전송되지 않고 내 브라우저에만 저장되므로 개인정보 걱정 없이 안심하고 사용할 수 있습니다.',

		whatIsHeading: '마크다운이란?',
		whatIsBodyBefore:
			'마크다운(Markdown)은 2004년 존 그루버가 만든 경량 마크업 언어로, HTML처럼 복잡한 태그 없이 ',
		whatIsBodyAfter:
			' 같은 간단한 기호만으로 제목·목록·강조·표·코드 블록 등 서식을 표현합니다. 작성한 텍스트가 그대로 읽히면서도 변환하면 깔끔한 문서가 되기 때문에, 오늘날 GitHub, Notion, Slack, Tistory, Velog, Obsidian 등 수많은 플랫폼이 마크다운을 표준 문서 형식으로 채택하고 있습니다.',

		featuresHeading: '주요 기능',
		featureList: [
			{ term: '실시간 미리보기', desc: '입력과 동시에 서식이 적용되어 결과를 바로 확인합니다.' },
			{
				term: '자동 저장',
				desc: '작성 중인 문서가 브라우저에 자동으로 보관되어 새로고침해도 사라지지 않습니다.'
			},
			{
				term: '다양한 내보내기',
				desc: '마크다운, PDF, 워드(DOCX) 형식으로 한 번에 변환·다운로드합니다.'
			},
			{
				term: '표·체크리스트·코드 강조',
				desc: '표 편집, 할 일 목록, 200여 개 언어의 코드 문법 강조를 지원합니다.'
			},
			{ term: '다크 모드', desc: '눈이 편한 어두운 테마로 장시간 작업에도 부담이 적습니다.' },
			{
				term: '개인정보 보호',
				desc: '로그인이 필요 없고, 문서는 서버가 아닌 내 컴퓨터에만 저장됩니다.'
			}
		],

		audienceHeading: '이런 분께 추천합니다',
		audienceList: [
			'GitHub README나 오픈소스 문서를 깔끔하게 작성하려는 개발자',
			'회의록·업무 문서·기획서를 빠르게 정리하려는 직장인',
			'Tistory·Velog·브런치에 올릴 블로그 글 초안을 잡는 작가·블로거',
			'강의 노트나 과제를 구조적으로 정리하려는 학생'
		],

		moreHeading: '더 알아보기',
		moreAria: '콘텐츠 둘러보기',
		moreLinks: [
			{ path: '/guide', label: '마크다운 문법 가이드' },
			{ path: '/templates', label: '마크다운 템플릿 모음' },
			{ path: '/use-cases', label: '활용 사례' },
			{ path: '/compare', label: '에디터 비교 (노션·Typora·Obsidian)' },
			{ path: '/shortcuts', label: '단축키 모음' },
			{ path: '/blog', label: '마크다운 블로그' },
			{ path: '/faq', label: '자주 묻는 질문' }
		],

		footerLinks: [
			{ path: '/about', label: '소개' },
			{ path: '/guide', label: '가이드' },
			{ path: '/blog', label: '블로그' },
			{ path: '/changelog', label: '업데이트 내역' },
			{ path: '/privacy', label: '개인정보처리방침' },
			{ path: '/terms', label: '이용약관' }
		]
	},

	editor: {
		meta: {
			title: '마크다운 에디터 | EasyMD 이지 마크다운',
			description:
				'EasyMD 마크다운 에디터 — 실시간 미리보기로 글을 쓰고 PDF·Word·마크다운으로 내보내세요. 자동 저장, 로그인 불필요.',
			keywords:
				'마크다운, 마크다운 에디터, markdown, markdown editor, 실시간 미리보기, 무료 에디터, 온라인 에디터, PDF 변환',
			ogTitle: '마크다운 에디터 | EasyMD',
			ogDescription:
				'실시간 미리보기로 글을 쓰고 PDF·Word·마크다운으로 내보내세요. 자동 저장, 로그인 불필요.',
			jsonLdDescription:
				'브라우저에서 바로 사용하는 무료 마크다운 에디터. 실시간 미리보기, 자동 저장, PDF 내보내기 지원. 로그인 불필요.',
			jsonLdFeatures: [
				'실시간 마크다운 미리보기',
				'자동 저장',
				'PDF 내보내기',
				'DOCX 내보내기',
				'이미지 삽입',
				'표 편집'
			]
		},

		chrome: {
			home: '홈으로',
			menuOpen: '메뉴 열기',
			docList: '문서 목록',
			file: '파일',
			fileTitle: '새 문서·불러오기·내보내기',
			newDoc: '새 문서',
			openFile: '파일 불러오기…',
			exportLabel: '내보내기',
			exportMd: '마크다운 (.md)',
			exportPdf: 'PDF (.pdf)',
			exportDocx: 'Word (.docx)',
			docWidth: '문서 너비',
			widthNormal: '보통',
			widthWide: '넓게',
			widthFull: '전체',
			theme: '테마',
			themeToggle: '테마 전환',
			lightMode: '라이트 모드',
			darkMode: '다크 모드',
			more: '더보기',
			headerAlwaysShow: '헤더 항상 표시',
			headerAutoHide: '헤더 자동 숨김',
			sponsor: '☕ 개발자 후원',
			close: '닫기',
			saving: '저장 중…',
			saved: '저장됨',
			filenamePlaceholder: '파일명을 입력하세요',
			filenameEdit: '클릭하여 파일명 변경'
		},

		table: {
			addColLeft: '← 왼쪽에 열 추가',
			addColRight: '→ 오른쪽에 열 추가',
			deleteRow: '행 삭제',
			deleteCol: '열 삭제',
			deleteTable: '표 삭제'
		},

		format: {
			italic: '기울임',
			underline: '밑줄',
			strike: '취소선',
			textColor: '글자 색상',
			highlight: '글자 배경색',
			bulletList: '글머리 기호',
			link: '링크'
		},

		status: {
			lastSaved: '마지막 저장',
			restored: '이전 작업을 불러왔습니다'
		},

		blocks: {
			h1: '제목 1',
			h2: '제목 2',
			h3: '제목 3',
			bulletList: '글머리 기호',
			orderedList: '번호 목록',
			checklist: '체크리스트',
			codeBlock: '코드 블록',
			blockquote: '인용구',
			table: '표 삽입',
			divider: '구분선'
		},

		colors: {
			default: '기본',
			none: '없음',
			red: '빨강',
			orange: '주황',
			yellow: '노랑',
			green: '초록',
			teal: '청록',
			blue: '파랑',
			purple: '보라',
			pink: '분홍',
			gray: '회색'
		},

		misc: {
			placeholder: '여기를 클릭하여 작성을 시작하세요... (/ 를 입력하면 블록을 추가할 수 있어요)',
			linkPrompt: '링크 URL을 입력하세요:',
			untitledPdf: '마크다운 문서',
			sharedDocName: '공유된 문서.md',
			startNewDoc: '새 문서로 시작',
			printOrSavePdf: '📄 인쇄/PDF로 저장',
			closeWindow: '❌ 닫기'
		},

		history: {
			manualSave: '수동저장',
			autoSave: '자동저장',
			beforeRestore: '복원 전 자동저장',
			versionRestore: '버전 복원'
		},
		toolbar: {
			bold: '굵게',
			inlineCode: '인라인 코드',
			tableOptions: '표 옵션',
			addRowAbove: '↑ 위에 행 추가',
			addRowBelow: '↓ 아래에 행 추가'
		},

		slash: {
			header: '블록 추가',
			hint: '↑↓ 선택, Enter 실행'
		},

		shortcuts: {
			title: '⌨️ 키보드 단축키',
			fileSection: '파일 작업',
			save: '저장',
			openFile: '파일 열기',
			pasteImage: '이미지 붙여넣기',
			editSection: '편집',
			filenameDone: '파일명 변경 완료',
			cancelOrClose: '변경 취소 / 모달 닫기',
			helpSection: '도움말',
			toggleGuide: '이 가이드 열기/닫기'
		},

		toast: {
			saved: '저장되었습니다!',
			saveFailed: '저장에 실패했습니다.',
			fileSaved: '파일이 저장되었습니다!',
			imageAdded: '이미지가 추가되었습니다!',
			imageOnly: '이미지 파일만 업로드할 수 있습니다.',
			imageTooLarge: '이미지 크기는 5MB 이하로 제한됩니다.',
			imageFailed: '이미지 삽입에 실패했습니다.',
			storageFull: '저장 공간이 부족합니다. 이미지를 줄이거나 브라우저 캐시를 정리해주세요.',
			popupBlocked: '팝업이 차단되었습니다. 팝업을 허용해주세요.',
			sharedOpened: '공유 링크로 문서를 열었습니다.',
			pdfError: 'PDF 생성 중 오류가 발생했습니다: ',
			confirmNewDoc:
				'저장되지 않은 내용이 있습니다. 새 문서를 시작하면 사라집니다. 계속하시겠습니까?'
		}
	}
};

export type Dict = typeof ko;
export default ko;
