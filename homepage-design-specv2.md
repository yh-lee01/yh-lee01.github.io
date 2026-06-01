# 디자인 리파인 v2 — "LaTeX 느낌" 타이포 통일 + 디테일 정리

> **이 문서는 v1 spec의 ①§1 타이포 스케일, ②§2-1 폰트 로딩을 OVERRIDE 한다.** 색 토큰·간격·컴포넌트 구조(v1 §1 색, §2-2~2-7, §3)는 그대로 유지.
> **핵심 진단**: v1에서 Fraunces(장식 세리프) + Hanken(산세리프) + JetBrains Mono(날짜/배지/메타) **3개 글꼴이 충돌**해서 조잡해짐. 특히 **날짜·CV 배지·메타를 monospace로 깐 게 가장 큰 원인**. → **세리프 하나로 통일**, monospace는 코드 블록에만.

---

## A. 글꼴 시스템 전면 교체 (가장 중요)

### A-1. 이전 import 제거
`_includes/head.html`에서 v1에 넣은 **Fraunces / Hanken Grotesk / JetBrains Mono `<link>` 전부 삭제.**
`_sass/_base.scss`·`_variables.scss`에서 `--font-display`, `--font-body` 사용처 전부 제거(아래 `--font-serif`/`--font-mono`로 대체).

### A-2. 새 폰트 로딩 — Computer Modern (authentic LaTeX)
`<head>`에 추가:
```html
<!-- LaTeX 글꼴(Computer Modern). 본문/제목/네비/날짜/배지 전부 이 하나로 통일 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/aaaakshat/cm-web-fonts@latest/fonts.css">
```
> ⚠️ CDN/패밀리명 동작 먼저 확인. CM 웹폰트는 화면에서 약간 **얇게(가늘게)** 렌더될 수 있음. **얇아서 별로면 STIX Two Text로 즉시 교체**(A-4, 2줄 변경) — 둘 다 LaTeX/학술 느낌.

### A-3. 패밀리 변수 + 적용
`_sass/_themes.scss`(또는 `_variables.scss`) `:root`에:
```scss
--font-serif: "Computer Modern Serif", "Latin Modern Roman", Georgia, "Times New Roman", serif;
--font-mono:  "Computer Modern Typewriter", ui-monospace, SFMono-Regular, monospace;
```
`_base.scss`에서:
```scss
/* 거의 모든 것 = 세리프 하나 */
body, h1, h2, h3, h4, h5,
.wordmark, nav, header, a,
.post-meta, .post-tags .tag, .cv-date, .periodot,
.publications .title, .citation, blockquote, .cv-download {
  font-family: var(--font-serif);
}
/* monospace는 '진짜 코드'에만. 날짜·배지·메타엔 절대 쓰지 말 것 */
pre, code, kbd, tt, .highlight, .kbd { font-family: var(--font-mono); }
```
**검수**: 변경 후 페이지에 monospace가 남는 곳은 코드 블록·인라인 코드뿐이어야 함. latest posts 날짜, blog "3 min read · April 04, 2026", CV 초록 배지, projects "Award" — **전부 세리프로 바뀌어야 정상.**

### A-4. (대안) 화면 렌더가 더 깔끔한 STIX — CM이 얇으면 이걸로
```html
<link href="https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
```
```scss
--font-serif: "STIX Two Text", Georgia, "Times New Roman", serif;
--font-mono:  "JetBrains Mono", ui-monospace, monospace; /* 코드용만 */
```
> CM = 진짜 LaTeX 느낌(약간 얇음). STIX = Times 계열, 학술지 느낌, 화면에서 더 또렷/깔끔. **CM 먼저 보고 마음에 안 들면 STIX.**

---

## B. 타이포 스케일·무게 (LaTeX는 "안 시끄럽다")

v1의 큰 제목/강한 weight 대비가 "트렌디"해서 학술 느낌과 어긋남. 아래로 교체:
```scss
:root {
  --fs-base: 1.0625rem;   /* 17px */
  --lh-base: 1.65;
  --fs-sm:   0.9rem;      /* 메타·태그·날짜 (세리프!) */
  --fs-h3:   1.25rem;     /* 카드/포스트/논문 제목 */
  --fs-h2:   1.5rem;      /* 섹션 헤딩(\section 정도, 과하지 않게) */
  --fs-h1:   clamp(2rem, 4vw, 2.5rem); /* 이름·페이지 타이틀 — v1보다 작게 */
}
h1, h2, h3, h4 {
  font-weight: 700;
  letter-spacing: normal;   /* v1의 음수 트래킹 제거(세리프엔 불필요) */
  line-height: 1.2;
}
/* 숫자를 본문에 어우러지게(타이포 느낌) — 폰트가 지원하면 */
body { font-feature-settings: "onum" 1, "kern" 1, "liga" 1; }
```

---

## C. 사소한 디테일 싹 정리 (조잡함 제거)

### C-1. CV 날짜 배지 — 지금 너무 진하고 줄바꿈 깨짐
현재 진한 초록 솔리드 박스 + "2023.02 / - / 2027.08" 3줄로 쪼개짐. → 톤다운 + 한 줄:
```scss
.cv-date {
  font-family: var(--font-serif);
  font-size: var(--fs-sm);
  font-weight: 600;
  color: var(--accent-subtle-text);     /* 진한 초록 글자 */
  background: var(--accent-subtle-bg);   /* 옅은 초록 배경 */
  padding: .15rem .55rem;
  border-radius: var(--radius-sm);
  white-space: nowrap;                   /* 한 줄 유지 */
}
```
날짜 구분자는 하이픈(`-`) 대신 **en-dash(`–`)**, "PRESENT"는 소문자 `present` 또는 그대로 두되 폰트 작아져서 한 줄에 들어옴.
> 진한 초록 박스를 유지하고 싶으면: 솔리드 유지 + `font-family:var(--font-serif)` + `font-size:var(--fs-sm)` + 패딩 축소만. 단 C-5(그린 절제)와 충돌하니 **옅은 버전 권장.**

### C-2. selected publications 논문 제목 — 거대 세리프로 4줄 wrap
```scss
.publications .title, .selected-papers .title {
  font-size: var(--fs-h3);   /* 거대 → compact */
  line-height: 1.3;
  font-weight: 700;
}
```

### C-3. 링크 — 애니메이션 밑줄(웹앱 느낌) 제거, 단순하게
```scss
a { color: var(--global-theme-color); text-decoration: none;
    background: none; /* v1의 background-size 트릭 제거 */ }
a:hover { color: var(--global-hover-color);
          text-decoration: underline; text-underline-offset: 2px; text-decoration-thickness: 1px; }
```

### C-4. 네비게이션
- 메뉴(blog/publications/projects/CV) = 세리프, active = 초록 + 하단 2px 초록 밑줄(현행 유지).
- `ctrl k`는 작은 회색 `kbd`로(`color:var(--global-text-color-light); font-size:var(--fs-sm);`). 코드 힌트라 CM Typewriter여도 OK, 단 작고 옅게.

### C-5. 그린 절제 — "진한 초록은 딱 3곳"
지금 진한 초록이 [링크 + active nav + Download 버튼 + CV 배지(여러 개)] 너무 많아서 산만. → **진한 초록은 ① 링크 ② active nav ③ Download 버튼 한 개**만. 나머지(CV 날짜 배지 = 옅은 초록 C-1, 연도/coursework 워터마크 = 회색 `var(--global-divider-color)`)는 약하게.

### C-6. 구분선·여백
섹션 헤딩 아래 divider는 `1px solid var(--global-divider-color)`로 얇고 옅게(현행 OK). 헤딩↔본문 `1.25rem`, 섹션 간 `4rem` 유지(v1).

### C-7. Download 버튼
솔리드 초록 단일 CTA 유지(좋음). 폰트만 세리프로, 살짝 작게(`padding:.5rem 1rem; font-size:var(--fs-base)`).

---

## D. 적용 순서

1. **A (글꼴)** — 이전 import/변수 제거 → CM 로드 → `--font-serif`/`--font-mono` 적용 → monospace 잔존 검수. **여기서 80% 해결됨.**
2. **B** — 스케일/weight 축소.
3. **C-1, C-2** — CV 배지 톤다운 + 논문 제목 축소(눈에 제일 띄는 조잡 포인트).
4. **C-3~C-7** — 링크·네비·그린 절제 등 마무리.
5. light/dark + 모바일 재확인.

## 완료 기준
- [ ] 사이트에 monospace는 코드 블록뿐. 날짜·배지·메타 전부 세리프.
- [ ] 글꼴 패밀리 1개(세리프) + 코드용 1개 = 끝. Fraunces/Hanken 흔적 0.
- [ ] CV 배지 한 줄, 옅은 초록. 진한 초록은 링크·active·Download 3곳뿐.
- [ ] 논문 제목 compact(2줄 내외). 이름 H1 ≤ 2.5rem.
- [ ] 링크 hover = 단순 밑줄(애니 없음).