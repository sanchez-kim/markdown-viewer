---
title: 마크다운 이미지 크기 조절하는 법
category: 빠른 팁
date: 2026-06-06
readingTime: 3
excerpt: 이미지가 너무 크게 들어갈 때. 마크다운 기본 문법으로는 크기를 못 정하니, HTML로 너비를 지정하는 법을 정리했습니다.
---

## 기본 이미지 문법은 크기를 못 정합니다

마크다운의 기본 이미지 문법은 크기 옵션이 없습니다. 원본 그대로 들어갑니다.

```
![설명](image.png)
```

크기를 조절하려면 **HTML `<img>` 태그**를 써야 합니다.

## `<img>`의 width / height

너비(width)나 높이(height)를 픽셀이나 퍼센트로 지정합니다.

```
<img src="image.png" width="300">
<img src="image.png" width="50%">
```

보통 `width`만 지정하면 비율이 유지된 채 크기가 조절됩니다. 가로·세로를 모두 적으면 그 크기에 정확히 맞춰집니다.

```
<img src="image.png" width="300" height="200">
```

## GitHub에서도 됩니다

GitHub은 `<img>`의 `width`, `height` 속성을 허용하므로 위 방법이 README·이슈에서 그대로 작동합니다. (단, `style` 속성은 제거되니 크기는 `style`이 아니라 `width`/`height` 속성으로 지정해야 합니다.)

## 정렬과 함께 쓰기

이미지를 가운데 두면서 크기도 줄이려면 정렬용 태그로 감쌉니다.

```
<p align="center">
  <img src="logo.png" width="200">
</p>
```

정리하면, 이미지 크기는 `![](...)`가 아니라 `<img width="...">`로 조절하고, GitHub에서도 `width`/`height` 속성이면 정상 적용됩니다.
