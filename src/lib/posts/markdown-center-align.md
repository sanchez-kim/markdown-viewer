---
title: 마크다운 가운데 정렬하는 법
category: 빠른 팁
date: 2026-06-04
readingTime: 3
excerpt: 제목이나 이미지를 가운데로 정렬하고 싶을 때. 마크다운에는 정렬 문법이 없어 HTML을 쓰는데, GitHub에서 되는 방법과 안 되는 방법을 구분했습니다.
---

## 마크다운에는 정렬 문법이 없습니다

글이나 이미지를 가운데로 정렬하는 마크다운 문법은 없습니다. **HTML로** 처리해야 합니다.

## `<div align>` / `<p align>` 사용

가장 호환성이 좋은 방법은 `align` 속성입니다.

```
<div align="center">
  가운데 정렬된 내용입니다.
</div>
```

`align` 값으로 `center`, `left`, `right`를 쓸 수 있습니다. 제목을 가운데 두고 싶을 때도 같은 방식입니다.

```
<h2 align="center">프로젝트 이름</h2>
```

## ⚠️ GitHub에서 되는 것 / 안 되는 것

GitHub은 `style` 속성을 제거하므로, **CSS 방식(`style="text-align:center"`)은 작동하지 않습니다.** 반면 **`align` 속성은 허용**되어 정상 동작합니다. 즉 GitHub에서 가운데 정렬을 하려면 반드시 `align` 방식을 써야 합니다.

```
<!-- GitHub에서 작동 O -->
<p align="center">가운데</p>

<!-- GitHub에서 작동 X (style 제거됨) -->
<p style="text-align:center">가운데</p>
```

## 이미지 가운데 정렬

이미지도 `align` 속성을 쓰거나, 가운데 정렬된 `<p>`로 감싸면 됩니다.

```
<p align="center">
  <img src="logo.png" width="200">
</p>
```

정리하면, 정렬은 HTML `align` 속성으로 하고, **GitHub에서는 `style`이 아니라 `align`을 써야 한다**는 점이 핵심입니다.
