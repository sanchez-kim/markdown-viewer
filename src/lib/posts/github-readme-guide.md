---
title: GitHub README를 프로처럼 작성하는 방법
category: 실전 가이드
date: 2026-04-22
readingTime: 7
excerpt: 첫인상을 결정하는 GitHub README. 방문자를 사로잡는 구조와 뱃지, 스크린샷 활용법까지 실전 노하우를 공유합니다.
---

## README가 왜 중요한가

GitHub 저장소에 들어왔을 때 가장 먼저 보이는 것이 README입니다. 잘 작성된 README는 프로젝트의 신뢰도를 높이고, 다른 개발자들이 기여하거나 사용하도록 유도합니다. 반대로 빈 README나 "Coming soon"만 적힌 저장소는 아무리 코드가 훌륭해도 아무도 쓰지 않습니다.

오픈소스 프로젝트뿐 아니라 개인 포트폴리오 저장소, 사내 라이브러리, 팀 프로젝트 모두 마찬가지입니다. README는 프로젝트의 첫 번째 문서입니다.

## 필수 구성 요소

### 1\. 프로젝트 이름과 한 줄 설명

가장 먼저 나와야 할 것은 프로젝트 이름과 무엇을 하는 도구인지 한 문장으로 설명하는 부분입니다.

```
# ProjectName
> 마크다운 파일을 PDF로 변환해주는 CLI 도구
```

인용구(`>`)를 쓰면 시각적으로 한 줄 설명이 강조됩니다.

### 2\. 뱃지 (Badges)

Shields.io를 이용하면 빌드 상태, 라이선스, 버전, 다운로드 수 등을 뱃지로 표시할 수 있습니다.

```
[![npm version](https://img.shields.io/npm/v/your-package)](https://npmjs.com/package/your-package)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
```

뱃지는 3~5개가 적당합니다. 너무 많으면 오히려 지저분해 보입니다.

### 3\. 스크린샷 또는 데모 GIF

백 마디 설명보다 하나의 스크린샷이 낫습니다. 특히 UI가 있는 프로젝트라면 반드시 넣으세요.

```
![스크린샷](./docs/screenshot.png)

*실행 화면 예시*
```

GIF 녹화는 macOS에서는 **Kap**, Windows에서는 **ScreenToGif**를 추천합니다.

### 4\. 설치 방법 (Installation)

설치 방법은 복사 붙여넣기만 하면 바로 실행되도록 명확하게 써야 합니다.

````
## 설치

```bash
npm install your-package
```

또는 yarn을 사용한다면:

```bash
yarn add your-package
```
````

### 5\. 사용 방법 (Usage)

가장 기본적인 사용 예제를 먼저 보여주세요. 복잡한 옵션은 그 다음입니다.

````
## 사용 방법

```javascript
const tool = require('your-package');

// 기본 사용
tool.convert('input.md', 'output.pdf');

// 옵션과 함께
tool.convert('input.md', 'output.pdf', {
  theme: 'github',
  fontSize: 14
});
```
````

### 6\. API 문서 또는 옵션 목록

라이브러리라면 옵션을 표로 정리하면 깔끔합니다.

```
| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| theme | string | 'default' | 테마 선택 |
| fontSize | number | 12 | 폰트 크기(px) |
| margin | number | 20 | 여백(px) |
```

### 7\. 기여 방법 (Contributing)

오픈소스라면 기여 방법을 안내하세요. 간단한 몇 줄이라도 있으면 외부 기여자가 생길 가능성이 훨씬 높아집니다.

```
## 기여하기

버그 리포트와 기능 제안은 [Issues](../../issues)에 올려주세요.
PR은 언제나 환영입니다!
```

### 8\. 라이선스

라이선스는 빠뜨리기 쉬운데, 기업이나 다른 개발자가 사용하려면 꼭 필요합니다.

```
## 라이선스

[MIT](LICENSE) © 2026 Your Name
```

## 잘 만든 README의 패턴

유명 오픈소스 프로젝트의 README를 살펴보면 공통적인 패턴이 보입니다.

-   **Vue.js**: 심플한 소개 + 링크 중심 구성
-   **React**: 공식 문서 링크로 바로 안내
-   **tailwindcss**: 한 줄 설명 + 빠른 시작 강조

공통점은 **처음 30초 안에 무엇인지, 어떻게 시작하는지**를 알 수 있다는 점입니다.

## 자주 하는 실수

-   **설치 명령어에 버전 정보 없음**: Node.js, Python 등 런타임 버전 요구사항을 적어야 합니다.
-   **환경 변수 설명 누락**: `.env.example` 파일과 함께 어떤 환경 변수가 필요한지 설명하세요.
-   **오래된 스크린샷**: UI가 바뀌었는데 스크린샷이 구버전이면 신뢰도가 떨어집니다.
-   **영어/한국어 혼용 혼란**: 타겟 사용자에 맞게 언어를 일관되게 유지하세요.

## README 템플릿

처음부터 만들기 어렵다면 다음 구조를 복사해서 사용하세요.

````
# 프로젝트 이름
> 한 줄 설명

뱃지들...

## 소개
(2~3줄 설명)

## 스크린샷
(이미지)

## 설치
```bash
npm install ...
```

## 사용 방법
```js
...
```

## 기여하기
이슈 또는 PR 환영

## 라이선스
MIT
````

README는 한 번에 완성할 필요가 없습니다. 프로젝트가 성장하면서 함께 발전시켜 나가는 것이 자연스럽습니다. 일단 최소한의 내용으로 시작하는 것이 아무것도 없는 것보다 훨씬 낫습니다.
