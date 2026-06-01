# yh-lee01.github.io 디자인 리파인 명세서

> **목적**: 코딩 에이전트(Claude Code / Cursor 등)가 추가 질문 없이 바로 구현할 수 있는 수준의 디자인 명세.
> **대상 코드베이스**: al-folio (Jekyll) 기반. 색/타이포/간격은 CSS custom property로 관리됨.
> **에이전트가 먼저 읽을 파일**: `_sass/_themes.scss`(색 토큰), `_sass/_base.scss`(타이포·컴포넌트), `_sass/_variables.scss`, `_includes/header.html`(네비), `_layouts/about.html`·`_layouts/bib.html`·`_layouts/cv/*`, `_includes/news.html`·`selected_papers.html`·`social.html`.
> **작업 원칙**: ① 토큰 먼저, 컴포넌트 나중. ② 하드코딩 색/폰트는 전부 토큰 참조로 교체. ③ light/dark 두 테마 모두 동시에 정의. ④ 변경 후 두 테마 + 모바일(<768px) QA.

---

## 0. 디자인 방향 (North-Star)

**"Refined editorial academic"** — 타이포 주도, 색은 절제(거의 검정 본문 + 단일 그린 accent), 여백 넉넉, 모션은 미세하게. **읽는 사람은 바쁜 교수/입학심사위원**이므로 "5초 안에 신뢰감 + 핵심 스캔"이 최우선. 화려함이 아니라 정밀함으로 차별화한다.

현재 상태 진단: 구조/기능(검색·다크모드·PDF CV)은 좋음. 문제는 ① al-folio 기본 폰트·간격 그대로라 "generic" 함, ② 그린이 접근성(대비) 애매한 web-green, ③ 타이포 위계·섹션 간격 불균일, ④ 홈/내부 페이지 네비 불일치, ⑤ 컴포넌트(버튼·태그·카드) 디테일 미완성.

---

## 1. Design Tokens

`_sass/_themes.scss`의 light/dark 블록에 아래 값을 정의. 기존 al-folio 변수명은 그대로 쓰되 값만 교체하고, `--accent-*`·`--shadow-*`·`--radius-*`는 없으면 신규 추가.

```scss
/* ===== LIGHT (:root 또는 html[data-theme="light"]) ===== */
--global-bg-color:        #ffffff;
--global-text-color:      #15181c;   /* 본문/제목: 순검정 대신 약간 부드럽게 */
--global-text-color-light:#6b7280;   /* 메타/excerpt/보조 텍스트 */
--global-theme-color:     #1b6e4f;   /* accent: 링크/active nav/badge (대비 ≈5.3:1, AA pass) */
--global-hover-color:     #15553d;   /* accent hover/strong */
--global-divider-color:   #e6e8eb;   /* border/divider */
--global-card-bg-color:   #ffffff;
--global-code-bg-color:   #f4f5f7;
--accent-subtle-bg:       #e7f5ee;   /* badge/pill 배경 */
--accent-subtle-text:     #15553d;

/* ===== DARK (html[data-theme="dark"]) ===== */
--global-bg-color:        #0f1419;
--global-text-color:      #e7ebf0;
--global-text-color-light:#9aa4b2;
--global-theme-color:     #5cd6a4;   /* 어두운 배경엔 더 밝은 민트 그린 */
--global-hover-color:     #8be8c4;
--global-divider-color:   #232a33;
--global-card-bg-color:   #161b22;
--global-code-bg-color:   #1a2027;
--accent-subtle-bg:       rgba(92,214,164,.14);
--accent-subtle-text:     #5cd6a4;

/* ===== 공통(테마 무관, :root에 한 번) ===== */
--shadow-sm: 0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.08);
--shadow-md: 0 4px 14px rgba(16,24,40,.08);
--radius-sm: 6px;  --radius-md: 10px;  --radius-lg: 14px;
```

> 그린 hue는 취향 조정 가능. 단 **light 모드 본문 링크는 흰 배경 대비 ≥4.5:1 유지**(위 `#1b6e4f`는 충족). 더 비비드하게 가려면 대비 재확인 필수.

### 타이포 스케일

```scss
:root {
  --font-display: "Fraunces", Georgia, "Times New Roman", serif;     /* 제목/워드마크 */
  --font-body:    "Hanken Grotesk", -apple-system, "Segoe UI", sans-serif; /* 본문/UI */
  --font-mono:    "JetBrains Mono", ui-monospace, SFMono-Regular, monospace; /* 코드/badge/ctrl k */

  --fs-base: 1.0625rem;  /* 17px 본문 */
  --lh-base: 1.7;
  --fs-sm:   0.875rem;   /* 14px 메타/태그 */
  --fs-h3:   1.3rem;     /* 카드·포스트 제목 */
  --fs-h2:   1.9rem;     /* 섹션 헤딩 */
  --fs-h1:   clamp(2.4rem, 5vw, 3.1rem); /* 페이지 타이틀/이름 */
  --measure: 68ch;       /* 본문 단락 최대 줄길이 */
  --container: 760px;    /* about/blog 본문 컬럼 폭 */
}
```

> **폰트는 generic 탈출이 핵심.** Inter/Roboto/Arial 금지. 위 조합(Fraunces 세리프 제목 + Hanken Grotesk 본문)은 학술적 신뢰 + 약간의 편집 감성. 전부 sans로 가고 싶으면 대안: 제목·본문 `"Geist"` + mono `"Geist Mono"`. 둘 중 하나만 선택. 현 폰트가 마음에 들면 유지해도 됨(단 그 경우 이유는 "default라서"가 아니라 "의도된 선택"이어야 함).

### 간격 스케일 (8px 기반)

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px` (= `0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 rem`).
- **메이저 섹션 간격**(Intro↔Research Interests↔latest posts↔selected publications): `4rem`
- 헤딩 → 본문: `1.25rem`
- 단락 간격: `1rem`
- 카드 패딩: `1.5rem`(데스크탑) / `1.25rem`(모바일)
- 카드↔카드: `1rem`

---

## 2. Global (전 페이지 공통)

### 2-1. 폰트 로딩 — `_includes/head.html`의 `<head>`에 추가
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```
기존 al-folio 폰트 import는 제거. `body{font-family:var(--font-body);font-size:var(--fs-base);line-height:var(--lh-base);}`, `h1,h2,h3,.wordmark{font-family:var(--font-display);letter-spacing:-0.01em;line-height:1.15;}`, `code,kbd,pre,.kbd,.badge{font-family:var(--font-mono);}`

### 2-2. 본문 폭/줄길이
about·blog·post 본문 컨테이너를 `max-width:var(--container);`로, 단락(`p,li`)은 `max-width:var(--measure);`. 큰 화면에서 한 줄이 너무 길어지는 현재 문제 해결.

### 2-3. 링크 (colored + hover 밑줄 애니메이션)
```scss
a {
  color: var(--global-theme-color);
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1.5px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size .2s ease, color .15s ease;
}
a:hover { color: var(--global-hover-color); background-size: 100% 1.5px; }
```

### 2-4. 포커스 (a11y 필수)
```scss
:focus-visible { outline: 2px solid var(--global-theme-color); outline-offset: 3px; border-radius: 4px; }
:focus:not(:focus-visible) { outline: none; }
```

### 2-5. 모션 정책
모든 인터랙티브 요소: `transition: color .15s ease, background-color .15s ease, border-color .15s ease, box-shadow .15s ease;`
전역 가드:
```scss
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
}
```

### 2-6. 네비게이션 일관성 (현재 버그)
- **문제**: 홈(`about.html`)은 좌측 "Yohan Lee" 워드마크가 없고 우측 메뉴만, 내부 페이지(blog/publications/cv)는 좌측 워드마크 있음 → 불일치.
- **조치**: `_includes/header.html`에서 **모든 페이지에 좌측 워드마크 표시**로 통일. 워드마크는 `--font-display`, "Yohan"은 700 / "Lee"는 400 weight 그대로.
- 헤더는 `position: sticky; top:0; z-index:100;` + 스크롤 시 배경 `backdrop-filter: blur(8px); background: color-mix(in srgb, var(--global-bg-color) 85%, transparent);` + 하단 1px divider. 데스크탑 nav 항목 간격 `1.5rem`.
- active 항목: `color:var(--global-theme-color)` + 하단 2px accent 밑줄(고정). 현재 active=그린은 유지.
- 모바일(<768px): 햄버거 토글(al-folio 기본 동작 유지하되 토큰 색 적용).

### 2-7. 반응형 브레이크포인트
`<768px`(mobile), `768–1024px`(tablet), `>1024px`(desktop). 모바일에서 `--fs-h1` clamp가 자동 축소되지만, about 페이지 프로필 사진은 **본문 위로 스택**(아래 3-1 참조).

---

## 3. 페이지/컴포넌트별 명세

### 3-1. Home (`about.html`, `_includes/news.html`, `selected_papers.html`)

**Intro 블록**
- 이름 H1: `--fs-h1`, 700, `letter-spacing:-0.02em`. 아래 본문과 간격 `1.25rem`.
- Intro 단락: `--measure` 폭 제한. 링크(Pixel Lab/AIoT Lab/V-Lab/SKKU)는 2-3 링크 스타일 적용. "Fall 2027" bold 유지.

**프로필 사진** (우측 원형)
- `width:clamp(160px,18vw,220px); aspect-ratio:1; border-radius:50%; object-fit:cover;` + `box-shadow:var(--shadow-md);` + light에서 `outline:4px solid #fff; outline-offset:-4px`(다크는 outline 제거).
- 모바일: 본문 위 중앙 정렬, `width:140px`, 아래 `margin-bottom:1.5rem`.
- **⚠️ 에셋 작업(수동)**: 현재 사진 상단에 다른 사람 어깨/턱이 잘려 보임 → 본인만 나오게 **정사각 재크롭** 후 `assets/img/prof_pic.*` 교체. (코드 아님, Yohan이 직접)

**소셜 아이콘** (`social.html`)
- 크기 통일 `1.25rem`, 간격 `1rem`, 기본색 `--global-text-color-light`, hover `--global-theme-color` + `transition`. RSS는 유지(블로그 운영 신호로 OK).

**섹션 헤딩 표기 통일** (현재 불일치)
- 현재 "Research Interests"=Title Case vs "latest posts"·"selected publications"=lowercase. → **전부 lowercase로 통일**(편집 감성, Barron 스타일). 즉 `research interests`, `latest posts`, `selected publications`. `--fs-h2`, 600, 위 divider 1px + 간격 `4rem`.

**latest posts**
- 행: `날짜(좌, --font-mono, --global-text-color-light) ··· 제목(링크)` 그리드. hover 시 제목만 accent. 행 간 divider 옅게.

**selected publications** (홈 미리보기)
- 아래 3-2의 pub 카드 스타일과 동일 컴포넌트 재사용.

### 3-2. Publications (`_layouts/bib.html`, papers 스타일)

**필터 입력("Type to filter")**
- `border:1px solid var(--global-divider-color); border-radius:var(--radius-md); padding:.7rem 1rem; font-size:var(--fs-base);` focus 시 `border-color:var(--global-theme-color); box-shadow:0 0 0 3px var(--accent-subtle-bg);`

**연도 헤더("2026")**
- 큰 워터마크 그대로 두되 `color:var(--global-divider-color)`로 다크모드에서도 안 튀게.

**Pub 카드** (썸네일 + 메타)
- 썸네일: `border-radius:var(--radius-md); border:1px solid var(--global-divider-color);` `aspect-ratio` 고정 + `object-fit:cover`로 레이아웃 시프트 방지. `loading="lazy"`.
- 제목: `--fs-h3`, 600. 저자: 본인("Yohan Lee") **bold** 유지, co-first `*`·교신 `†` 위첨자 유지. ⓘ 호버 시 범례(co-first/corresponding) 툴팁이 보이는지 확인 — 안 보이면 `title`/툴팁 추가.
- venue("Under review, 2026") italic, `--global-text-color-light`.

**ABS / BIB 버튼**
```scss
.btn-meta {           /* ABS, BIB 공통 */
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  padding: .35rem .8rem;
  border: 1px solid var(--global-divider-color);
  border-radius: var(--radius-sm);
  color: var(--global-text-color-light);
  background: transparent;
  transition: all .15s ease;
}
.btn-meta:hover {
  border-color: var(--global-theme-color);
  color: var(--global-theme-color);
  background: var(--accent-subtle-bg);
}
```

### 3-3. Blog (`blog/index` + post list item)

- 헤더: "Blog" H1 + 서브 "Notes on reinforcement learning, generative models, and AI safety"(`--global-text-color-light`) 유지.
- 포스트 아이템: 제목(`--fs-h3`,600,링크) → excerpt(`--global-text-color-light`,`--measure`) → 메타(`3 min read · April 04, 2026`, `--font-mono`,`--fs-sm`) → 태그 pills.
- **태그 pill**:
```scss
.tag {
  display:inline-flex; align-items:center;
  font-size:var(--fs-sm); line-height:1;
  padding:.35rem .7rem;
  border-radius:999px;
  border:1px solid var(--global-divider-color);
  color:var(--global-text-color-light);
  background:transparent;
  transition:all .15s ease;
}
.tag:hover { border-color:var(--global-theme-color); color:var(--global-theme-color); background:var(--accent-subtle-bg); }
```
- 포스트가 1개라 비어 보임 → 리스트 컨테이너 `max-width:var(--container)`로 가운데 모아 덜 휑하게. (근본 해결은 글 추가 = 콘텐츠 작업)

### 3-4. Projects (`projects/*`)

- **프로젝트 페이지 템플릿 통일**: 제목 → 한 줄 요약 → 메타 행(`Role · Year · 링크[Code/Demo/Paper]`, `--font-mono`,`--fs-sm`) → 본문/이미지. 현재 Sign Language 페이지엔 메타 행/링크가 없으니 추가(GitHub/데모 있으면 연결).
- "Award: ..." 줄: `Award` 라벨을 `.badge`로 강조 — `background:var(--accent-subtle-bg); color:var(--accent-subtle-text); padding:.15rem .5rem; border-radius:var(--radius-sm); font-family:var(--font-mono); font-size:var(--fs-sm);` 그 뒤 본문.
- 이미지: 카드처럼 `border-radius:var(--radius-md); border:1px solid var(--global-divider-color);` + 캡션(figcaption) `--global-text-color-light`.
- **⚠️ 출처 확인**: 파이프라인 그림이 Google MediaPipe 공식 도식으로 보임 → 캡션에 출처 표기(또는 본인 도식으로 교체) 권장. (라이선스/표기 이슈, Yohan 확인)

### 3-5. CV (`_layouts/cv/*`)

**다운로드 버튼** (현재: PDF 아이콘 우상단 + "Download my CV as PDF" 텍스트 분리됨 → 클릭 affordance 약함)
- 하나의 명확한 버튼으로 통합:
```scss
.cv-download {
  display:inline-flex; align-items:center; gap:.5rem;
  padding:.55rem 1rem; border-radius:var(--radius-sm);
  background:var(--global-theme-color); color:#fff;
  font-weight:600; transition:background .15s ease;
}
.cv-download:hover { background:var(--global-hover-color); }
```
아이콘 + "Download CV (PDF)" 한 덩어리. 다크모드에서도 텍스트는 흰색 유지(accent 위 대비 확인).

**좌측 사이드바 (Basics/Education/.../Languages)**
- `position:sticky; top:5rem;`(헤더 높이만큼) 로 스크롤 시 따라오게.
- **scroll-spy**: 현재 보이는 섹션 항목을 active(accent + 좌측 2px accent 바)로. 아래 최소 JS를 `assets/js/`에 추가하고 cv 레이아웃에서 로드:
```js
const links = document.querySelectorAll('.cv-nav a');
const map = new Map([...links].map(a => [a.getAttribute('href').slice(1), a]));
const io = new IntersectionObserver((es) => {
  es.forEach(e => { if (e.isIntersecting) {
    links.forEach(l => l.classList.remove('active'));
    map.get(e.target.id)?.classList.add('active');
  }});
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => io.observe(s));
```
(섹션에 `id`가 없으면 부여. progressive enhancement — JS 없어도 페이지는 정상.)

**카드 (Basics/Education 등)**
- `background:var(--global-card-bg-color); border:1px solid var(--global-divider-color); border-radius:var(--radius-lg); padding:1.5rem; box-shadow:var(--shadow-sm);` 카드 간 `1rem`.
- 날짜 badge(green, "2023.02–2027.08"): `.badge` 스타일과 통일.

---

## 4. 접근성 체크리스트 (구현 중 동시 충족)

- [ ] light 본문/링크 대비 ≥4.5:1, 큰 텍스트 ≥3:1 (그린 토큰 검증)
- [ ] 모든 인터랙티브 요소 `:focus-visible` 링 보임
- [ ] 모든 `<img>`에 의미 있는 `alt` (프로필/논문 썸네일/프로젝트 도식 포함)
- [ ] 페이지당 `<h1>` 1개, 헤딩 위계 순서대로(h1→h2→h3)
- [ ] `prefers-reduced-motion` 가드 동작
- [ ] 키보드만으로 nav·검색(ctrl k)·필터·다운로드 도달 가능
- [ ] `<html lang="en">` 설정 (한글 들어가면 해당 블록만 `lang="ko"`)

---

## 5. Acceptance Criteria (완료 판정)

1. light/dark 양쪽에서 색이 전부 토큰 기반, 하드코딩 hex 0개(grep `#[0-9a-fA-F]{6}` in `_base.scss` 결과 정당화 가능).
2. 홈/blog/publications/projects/cv **모두 동일한 헤더**(좌 워드마크 + 우 메뉴) + sticky 동작.
3. 본문 단락이 큰 화면에서 `--measure` 넘지 않음.
4. ABS/BIB·태그·badge·CV 다운로드가 위 스펙대로 hover/focus 상태 가짐.
5. CV 사이드바 sticky + scroll-spy active 표시.
6. 모바일(360–414px)에서 가로 스크롤 없음, 프로필 사진 본문 위 스택, 타이틀 안 깨짐.
7. Lighthouse: Accessibility ≥95, Best-Practices ≥95, CLS ≈0(썸네일 aspect-ratio 덕분).

---

## 6. 권장 구현 순서 (커밋 단위)

1. `_themes.scss` 색 토큰 light/dark + 신규 `--accent/--shadow/--radius`
2. `_base.scss` 타이포 스케일·본문 폭·링크·포커스·모션 가드 (+ head.html 폰트 로딩)
3. `header.html` 네비 통일 + sticky/blur
4. `about.html` Intro·프로필·소셜·섹션 헤딩 통일·latest posts
5. `bib.html` pub 카드 + ABS/BIB 버튼 (홈 selected publications 동일 적용)
6. blog 리스트 + 태그 pill
7. cv 다운로드 버튼 + sticky 사이드바 + scroll-spy + 카드/badge
8. projects 템플릿 + Award badge + 이미지 프레이밍
9. a11y/대비/반응형/다크모드 일괄 QA → Acceptance Criteria 통과 확인

---

## 부록. 빠른 추가 한 방 (researcher용, 교수 공유 시 임팩트)

- **OG/메타 태그**: `_config.yml`의 `og_image`·description 채우기. 교수에게 링크 보낼 때 카카오톡/메일 미리보기가 깔끔하게 뜸. (현재 누락 가능성 높음 — 확인)
- **favicon**: 단색 이니셜(Y) 파비콘 1개라도 설정.
- **`prof_pic` 재크롭**(위 3-1 ⚠️) — 첫인상 직결, 우선순위 높음.
