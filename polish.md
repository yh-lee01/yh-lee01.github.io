# yh-lee01.github.io 리디자인 — DISLab 레퍼런스 · **CSS만** (Liquid 금지)

> ## ⚠️ 가장 중요한 원칙 (지난번 롤백 방지)
> - **Liquid 파일(`_layouts/*.liquid`, `_includes/**/*.liquid`) 절대 수정 금지.** 마크업은 그대로 두고 **기존 클래스에 CSS만 덮어쓴다.**
> - **CSS 넣는 위치:** `assets/css/main.scss` **맨 아래** (모든 `@import` 아래에 추가). 이 파일은 SCSS라 안전 — Liquid 로직 아님. (또는 `_sass/_custom.scss` 새로 만들고 `main.scss`에 `@import "custom";` 한 줄 — 이것도 CSS 파일이라 안전.)
> - **셀렉터는 al-folio 기본 기준 예시.** 실제와 다를 수 있으니 아래 지시문을 에이전트에 그대로 전달.
>
> ### 📋 에이전트에게 그대로 줄 지시문
> ```
> 아래 스타일을 적용해줘. 단:
> 1. Liquid 템플릿(.liquid)은 절대 수정하지 마. 마크업/구조 변경 금지.
> 2. SCSS만 추가/수정. assets/css/main.scss 맨 아래에 붙여줘.
> 3. 내가 준 셀렉터가 실제 렌더된 DOM과 다르면, F12로 실제 클래스명 확인해서 매핑만 바꿔줘 (스타일 의도는 유지).
> 4. 적용 안 먹으면 specificity 문제니 셀렉터 앞에 body 붙이거나 최소한으로 !important 사용.
> ```
>
> **레퍼런스 = DISLab (disl-lab.github.io):** 박스 없음(airy), 섹션 제목 앞 **세로 accent bar**, teal 톤, Teaching은 **ring 마커 타임라인**. 이 4개가 핵심 느낌.

---

## 0. 공통 톤 (전 페이지 베이스)

```scss
/* === DISLab tone: 공통 토큰 === */
:root {
  --accent-subtle-bg: #e7f5ee;     /* 연초록 */
  --accent-subtle-text: #15553d;   /* 진초록 글자 */
}
html[data-theme="dark"] {
  --accent-subtle-bg: rgba(92,214,164,.14);
  --accent-subtle-text: #5cd6a4;
}
```
- **색:** 네 초록(`--global-theme-color`) 유지. DISLab의 청록(teal)으로 통일하고 싶으면 그 변수 하나만 `#11a37f` 같은 값으로 바꾸면 사이트 전체가 따라감.
- **섹션 제목 = accent bar 스타일** (밑줄/박스 X):
```scss
.card-title, .section-title,
h2.heading, h3.heading {            /* 실제 섹션 제목 클래스로 매핑 */
  position: relative; padding-left: .85rem;
  font-weight: 600; border-bottom: none !important;
  margin: 0 0 1.5rem;
}
.card-title::before, .section-title::before,
h2.heading::before, h3.heading::before {
  content: ''; position: absolute; left: 0; top: .18em; bottom: .18em;
  width: 4px; border-radius: 2px; background: var(--global-theme-color);
}
```

---

## 1. ★ 헤더 겹침 수정 (스크롤 시 글자 비침)

원인: sticky 헤더 배경이 반투명. → 불투명 처리.
```scss
nav.navbar.fixed-top, #navbar {
  background-color: var(--global-bg-color) !important;
  -webkit-backdrop-filter: none !important;
          backdrop-filter: none !important;
  border-bottom: 1px solid var(--global-divider-color);
}
```

---

## 2. ★★ CV → Teaching 타임라인 (CSS only) — 이번 핵심

목표(Teaching 레퍼런스): **박스 제거 → 세로 레일 + 속 빈 ring 마커 + small-caps 날짜 라벨.** 진초록 솔리드 배지 폐기.

**(A) 박스 제거 + accent bar 제목**
```scss
/* CV 페이지에만: cv 콘텐츠 wrapper에 클래스가 없으면, 사이트 전체에 적용해도
   DISLab처럼 projects 카드까지 airy해져서 OK. 분리하려면 에이전트가 cv wrapper 확인. */
.cv .card, .resume .card {
  border: none !important; box-shadow: none !important;
  background: transparent !important; padding: 0 !important;
  margin: 0 0 2.75rem !important;
}
```

**(B) 각 항목 → 타임라인 아이템**
> ⚠️ **여기만 구조 확인 필요.** al-folio jsonresume는 보통 항목 하나가 `.row`(Bootstrap)야. 만약 `<li>`면 셀렉터의 `.row`를 `li`로 바꾸면 됨. 핵심 원리는 4줄: ① 항목에 `position:relative`+왼쪽 패딩 ② `::before`로 세로 레일 ③ `::after`로 ring ④ 날짜 라벨화.
```scss
.cv .card .row, .resume .card .row {     /* ← 항목이 li면 .row를 li로 */
  position: relative; margin: 0; padding: 0 0 1.8rem 2rem;
}
.cv .card .row:last-child { padding-bottom: 0; }

/* 세로 레일 */
.cv .card .row::before {
  content: ''; position: absolute; left: 6px; top: .5rem; bottom: 0;
  width: 2px; background: var(--global-divider-color);
}
.cv .card .row:last-child::before { bottom: auto; height: .55rem; }

/* 속 빈 ring 마커 (Teaching 스타일) */
.cv .card .row::after {
  content: ''; position: absolute; left: 0; top: .35rem;
  width: 13px; height: 13px; box-sizing: border-box; border-radius: 50%;
  border: 2.5px solid var(--global-theme-color);
  background: var(--global-bg-color);
}
```

**(C) 날짜 배지 → small-caps 라벨** (Teaching의 "2026 SPRING" 느낌. 솔리드 초록 제거)
```scss
.cv .badge, .resume .badge, .cv .row span.badge {
  background: transparent !important; color: var(--global-theme-color) !important;
  padding: 0 !important; border-radius: 0;
  font-family: var(--font-mono); font-weight: 600;
  font-size: .72rem; letter-spacing: .04em; text-transform: uppercase;
}
.cv .row .title, .cv .row strong { font-weight: 600; }
.cv .row .font-italic { color: var(--global-text-color-light); }
```
- **basics**(상단 Name/Email/Url/Summary): 박스만 빠지면 깔끔. 그대로 둬도 됨.
- **skills / languages**: 나열형이면 subtle 칩으로 (스캔성):
```scss
.cv .skills li, .cv .languages li {
  display: inline-block; margin: 0 .4rem .4rem 0;
  background: var(--accent-subtle-bg); color: var(--accent-subtle-text);
  font-family: var(--font-mono); font-size: .8rem;
  padding: .2rem .6rem; border-radius: 6px;
}
```
- **Download CV 버튼**: 유일한 진초록 솔리드로 유지(날짜가 라벨화되면서 강한 초록은 링크·active nav·이 버튼만 남음 → 톤 정리됨).

---

## 3. Blog → compact (CSS only)

지난번 준 featured 카드가 너무 컸음 → 큰 카드/큰 타이틀 버리고 **tight 리스트**로.
```scss
.post-list .post, article.post, .post {        /* 실제 포스트 컨테이너로 매핑 */
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--global-divider-color);
}
a.post-title, .post-title, .post-title a {
  font-size: 1.25rem !important;                /* 큰 제목 한 단계 ↓ */
  font-weight: 600;
}
.post-description, .post .excerpt {
  font-size: .95rem; color: var(--global-text-color-light);
  margin: .35rem 0 .55rem;
  display: -webkit-box; -webkit-line-clamp: 2;  /* 2줄로 자르기 → compact */
  -webkit-box-orient: vertical; overflow: hidden;
}
.post-meta { font-size: .8rem; font-family: var(--font-mono); }
.post-tags, .tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .5rem; }
.post-tags .tag, .tag {
  font-family: var(--font-mono); font-size: .72rem;
  padding: .15rem .55rem; border-radius: 999px;
}
```

---

## 4. Publications → DISLab 스타일 (CSS only)

DISLab처럼: 항목 간 여백 + 컴팩트 버튼 + 작은 필터.
```scss
.publications ol.bibliography > li {
  padding: 1.3rem 0; border-bottom: 1px solid var(--global-divider-color);
}
.publications .title { font-weight: 600; }
.publications .author { color: var(--global-text-color-light); font-size: .95rem; }
.publications .periodical, .publications .venue {
  font-style: italic; color: var(--global-text-color-light); font-size: .9rem;
}
/* ABS / BIB 버튼 컴팩트 */
.publications a.abstract, .publications a.bibtex,
.publications .btn, .publications .links a {
  font-size: .72rem !important; padding: .12rem .5rem !important;
  font-family: var(--font-mono);
}
/* 필터 박스 작게 + focus 링 */
input.filter, .publications input[type="text"], #bib-filter, #searchbar {
  padding: .55rem 1rem; border-radius: 8px; font-size: .95rem;
  border: 1px solid var(--global-divider-color);
}
input.filter:focus { border-color: var(--global-theme-color);
  box-shadow: 0 0 0 3px var(--accent-subtle-bg); outline: none; }
```

---

## 5. Projects → DISLab 스타일 (CSS only)

카드 정리 + 이미지↔제목 간격 + grid.
```scss
.projects .card, .grid-item .card {
  border: 1px solid var(--global-divider-color) !important;
  box-shadow: none !important; border-radius: 12px;
}
.projects .card:hover { border-color: var(--global-theme-color) !important;
  transform: translateY(-2px); transition: .15s; }
.projects .card-body { padding: 1rem 1.25rem; }
.projects .card-title { font-size: 1.15rem; line-height: 1.25; margin: .2rem 0 .5rem; }
.projects .card-text { color: var(--global-text-color-light); font-size: .95rem; }
/* 여러 개일 때 grid */
.projects .grid, .grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;
}
```

---

## 6. Home → refine (CSS only)

```scss
/* 연락처 블록: 겹치던 구분선 제거 + 가운데 정렬 */
.profile hr { display: none !important; }
.profile { text-align: center; }
.profile .social { display: flex; justify-content: center; gap: 1rem; margin: .5rem 0; }
.profile .social a { color: var(--global-text-color-light); }
.profile .social a:hover { color: var(--global-theme-color); }

/* about 본문 ↔ 섹션 간격 */
.about .post .row + h2, #about h2 { margin-top: 3rem; }
```
- hero 이름 "Lee" 가볍게 하는 건 제목에 `<span>`이 필요해서 **마크업 1줄**이 들어감. 굳이 안전하게 가려면 **건너뛰어도 무방**(우선순위 낮음). 하려면 `_pages/about.md` frontmatter의 `title`만 손대기(Liquid 로직 아님).

---

## 적용 순서 & 검증

1. **0 공통 + 1 헤더** (베이스 + 겹침)
2. **2 CV 타임라인** ← 이번 메인. (B)만 구조 확인하며 적용
3. **3 Blog compact**
4. **4 Publications → 5 Projects → 6 Home**

### 검증 체크 (DISLab 느낌 됐나)
- [ ] 스크롤해도 헤더 뒤 글자 안 비침
- [ ] CV: 박스 사라지고 **세로 레일 + 속 빈 ring 마커**, 날짜는 teal small-caps
- [ ] 진한 초록 = 링크 · active nav · Download 버튼에만
- [ ] 섹션 제목 앞에 **세로 accent bar**
- [ ] Blog 제목/여백 작아지고 tight한 리스트
- [ ] 전체적으로 박스보다 **여백으로 구분**되는 airy한 느낌

> 안 먹는 스타일 있으면: F12 → 해당 요소 실제 클래스 확인 → 그 셀렉터로 교체. Liquid는 끝까지 건드리지 말 것.