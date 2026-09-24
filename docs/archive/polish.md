# yh-lee01.github.io 통합 리디자인 가이드 (최종)

> **적용 위치:** `assets/css/main.scss` **맨 아래에 CSS 추가**. (§7 히어로 이름만 출력 HTML 1줄 필요 — 아래 설명)
> **Liquid 주의:** if/for/include 같은 **로직은 수정 X**. 셀렉터는 al-folio 기본 예시 → 안 맞으면 F12로 실제 클래스 확인해 매핑.
> **다크모드:** 전부 `--global-*`/변수 기반 → 라이트·다크 자동 대응.

---

## ✅ 요구사항 체크 (네가 말한 거 전부 담김)

| 요구 | 어디 |
|---|---|
| 헤더가 스크롤 따라오며 **반투명(frosted)**, 하드 가로줄 X | **§1** |
| **통일감** — blog·publications·projects 같은 카드 | **§2–5** |
| blog 카드 **유지 + compact** (리스트로 바꾼 거 되돌림) | **§3** |
| publications·projects도 **같은 카드로 통일** | **§4, §5** |
| CV **깔끔한 타임라인 복구** (subtle pill + ring + stack) | **§6** |
| 히어로 **"Yohan" 굵게 / "Lee" 가늘게** 차별 복구 | **§7 (신규)** |
| 다크모드 정상 | 전 항목 |
| Liquid 로직 미수정 | 전 항목 (§7만 출력 1줄) |
| + 추가 다듬기 | **§9** |

---

## 0. 공통 토큰

```scss
:root {
  --card-radius: 14px;
  --accent-subtle-bg: #e7f5ee;
  --accent-subtle-text: #15553d;
}
html[data-theme="dark"] {
  --accent-subtle-bg: rgba(92,214,164,.14);
  --accent-subtle-text: #5cd6a4;
}
```

---

## ⚠️ §1 전에: 지난번 헤더 CSS 삭제
이 두 줄이 "분리된 가로줄" 범인 → **찾아서 삭제.**
```scss
nav.navbar.fixed-top, #navbar {
  background-color: var(--global-bg-color) !important;   /* 삭제 */
  border-bottom: 1px solid var(--global-divider-color);  /* 삭제 (이게 분리줄) */
}
```

## §1. 헤더 — 스크롤 따라오며 frosted

```scss
#navbar, nav.navbar.fixed-top {
  background-color: color-mix(in srgb, var(--global-bg-color) 75%, transparent) !important;
  -webkit-backdrop-filter: saturate(160%) blur(12px) !important;
          backdrop-filter: saturate(160%) blur(12px) !important;
  border-bottom: none !important;
  box-shadow: none !important;
}
```
- sticky는 al-folio 기본(이미 따라옴). 위 CSS가 스크롤 시 뒤 내용을 **블러로 뭉개서** 또렷한 겹침 없이 반투명하게 만듦 = 네가 원한 그 동작.
- 또렷이 비치면 `75%`→`85%`. 거슬리는 줄 남으면 F12로 그 요소 `border`/`box-shadow` 제거.

---

## §2. ★ 통일감 핵심 — 카드 1종 (blog·publications·projects 공통)

```scss
.post-card,
.projects .grid .card, .projects .card,
.publications ol.bibliography > li {
  background: var(--global-card-bg-color) !important;
  border: 1px solid var(--global-divider-color) !important;
  border-radius: var(--card-radius) !important;
  box-shadow: none !important;
  transition: border-color .15s ease, transform .15s ease;
}
.post-card:hover,
.projects .card:hover,
.publications ol.bibliography > li:hover {
  border-color: var(--global-theme-color) !important;
  transform: translateY(-2px);
}
/* 공통 태그/칩 */
.post-card .tag, .publications .badge, .projects .badge {
  font-family: var(--font-mono); font-size: .7rem;
  padding: .14rem .55rem; border-radius: 999px;
  border: 1px solid var(--global-divider-color);
  color: var(--global-text-color-light);
}
```

## §3. Blog — 카드 유지 + compact

```scss
.post-card { padding: 1.1rem 1.3rem !important; }
.post-card .cat { font-size: .7rem; }                  /* paper review 칩 */
.post-card h2, .post-card .post-card-title { font-size: 1.15rem !important; margin: .45rem 0 .35rem; }
.post-card .excerpt {
  font-size: .92rem; margin: 0 0 .6rem;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.post-card .meta { font-size: .75rem; margin-bottom: .55rem; }
.post-card .post-tags { gap: .4rem; margin-bottom: .6rem; }
.post-card .read { font-size: .9rem; }
.post-list { display: flex; flex-direction: column; gap: .9rem; }
```

## §4. Publications — 같은 카드

```scss
.publications ol.bibliography { list-style: none; padding: 0; }
.publications ol.bibliography > li { padding: 1.1rem 1.3rem !important; margin-bottom: .9rem !important; }
.publications .title { font-size: 1.1rem; font-weight: 600; }
.publications .author { font-size: .9rem; color: var(--global-text-color-light); }
.publications .periodical { font-size: .85rem; font-style: italic; color: var(--global-text-color-light); }
.publications .links a, .publications a.abstract, .publications a.bibtex, .publications .btn {
  font-family: var(--font-mono) !important; font-size: .7rem !important;
  padding: .14rem .55rem !important; border-radius: 999px !important;
}
input.filter, .publications input[type="text"], #bib-filter {
  padding: .55rem 1rem; border-radius: 10px; font-size: .92rem; border: 1px solid var(--global-divider-color);
}
input.filter:focus { border-color: var(--global-theme-color); box-shadow: 0 0 0 3px var(--accent-subtle-bg); outline: none; }
```

## §5. Projects — 같은 카드

```scss
.projects .card-body { padding: 1.1rem 1.3rem; }
.projects .card-title { font-size: 1.1rem !important; font-weight: 600; line-height: 1.25; margin: .2rem 0 .5rem; }
.projects .card-text { font-size: .92rem; color: var(--global-text-color-light); }
.projects .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px,1fr)); gap: 1.5rem; }
```

---

## §6. ★ CV — 깔끔한 타임라인 복구

**(A) 2단 → 단일 컬럼 stack** (날짜가 옆에 끼어 답답한 거 해결)
```scss
.cv .row, .resume .row {
  display: block !important; position: relative;
  padding: 0 0 1.8rem 2rem !important; margin: 0 !important;
}
.cv .row > [class*="col"] { width: 100% !important; max-width: 100% !important; flex: none !important; padding-left: 0 !important; }
```
**(B) ★ 날짜 배지: 초록 블록 → subtle pill**
> 지난번 안 먹은 이유 = 셀렉터 불일치. **에이전트한테: `_includes/resume/work.liquid`·`education.liquid` 열어서(읽기만) 날짜 감싼 태그/클래스 확인 후 그 셀렉터에 적용.** CV 깔끔함의 핵심 한 줄.
```scss
.cv .badge, .cv .date, .cv time,
.cv .row [class*="col"]:first-child span, .resume .badge {
  display: inline-block !important;
  background: var(--accent-subtle-bg) !important; color: var(--accent-subtle-text) !important;
  font-family: var(--font-mono) !important; font-weight: 500 !important;
  font-size: .72rem !important; letter-spacing: 0 !important; text-transform: none !important;
  padding: .15rem .5rem !important; border-radius: 6px !important; margin: 0 0 .4rem 0 !important;
}
```
**(C) 레일 + ring 마커**
```scss
.cv .row::before { content:''; position:absolute; left:5px; top:.5rem; bottom:0; width:2px; background: var(--global-divider-color); }
.cv .row:last-child::before { bottom:auto; height:.6rem; }
.cv .row::after {
  content:''; position:absolute; left:0; top:.45rem; width:12px; height:12px;
  box-sizing:border-box; border-radius:50%; border:2.5px solid var(--global-theme-color); background: var(--global-bg-color);
}
.cv .row .title, .cv .row strong { font-weight:600; }
.cv .row .font-italic { color: var(--global-text-color-light); }
```
- Download CV 버튼만 진초록 솔리드 유지. skills/languages는 §2 칩 스타일 재사용.

---

## §7. ★ 히어로 이름 — "Yohan" 굵게 / "Lee" 가늘게 (신규)

순수 CSS로는 한 덩어리 텍스트를 못 나눔 → **last name만 span으로 감싸는 출력 1줄** 필요(Liquid 로직 아님, 안전).

**1) 마크업 (둘 중 해당되는 쪽):**
- 히어로가 `{{ page.title }}`로 나오면 → `_pages/about.md`는 그대로 두고, 히어로 출력부에서 이름을 직접:
  `<span class="fw-bold">Yohan</span> <span class="lighter">Lee</span>`
- 히어로가 이미 `site.first_name`+`site.last_name`로 나오면 → last name 출력만 `<span class="lighter">{{ site.last_name }}</span>`로.
> 브라우저 탭 제목(`<title>`)에는 span 넣지 말 것(거기엔 평문 "Yohan Lee" 유지). 즉 `page.title`은 건드리지 말고 **히어로 표시 부분만**.

**2) CSS:**
```scss
.post-title .lighter, h1 .lighter { font-weight: 300 !important; }
.post-title .fw-bold, h1 .fw-bold { font-weight: 700 !important; }
```
→ nav 워드마크(Yohan 굵게 / Lee 일반)와 톤 통일.
부담되면 이 항목만 스킵 가능(나머지엔 영향 없음).

---

## §8. Home — latest posts 간격

```scss
.news .post, #news .post {
  display: grid; grid-template-columns: 130px 1fr; gap: 1.25rem; align-items: baseline;
}
.news .post .date { font-family: var(--font-mono); color: var(--global-text-color-light); }
```

---

## §9. ✨ 추가 다듬기 (퀄리티 더 끌어올리기)

```scss
/* 1) 부드러운 스크롤 (CV 사이드바 앵커 이동 자연스럽게) */
html { scroll-behavior: smooth; }

/* 2) 텍스트 드래그 선택색 = 브랜드 (디테일 한 끗) */
::selection { background: var(--accent-subtle-bg); color: var(--accent-subtle-text); }

/* 3) 본문 링크 hover = 밑줄 (초록 유지) — 일관된 인터랙션 */
.post a, p a, .cv a { text-decoration: none; border-bottom: 1px solid transparent; transition: border-color .15s; }
.post a:hover, p a:hover, .cv a:hover { border-bottom-color: currentColor; }

/* 4) 키보드 포커스 링 (접근성 + 깔끔) */
a:focus-visible, button:focus-visible, input:focus-visible {
  outline: 2px solid var(--global-theme-color); outline-offset: 2px; border-radius: 4px;
}

/* 5) 섹션 제목 리듬 통일 (accent bar 헤딩 간격 일정하게) */
.card-title, h2.heading { margin-top: 3rem; }

/* 6) 푸터 차분하게 (DISLab처럼) */
footer, .footer { color: var(--global-text-color-light); font-size: .85rem; }
footer a { color: var(--global-text-color-light); }

/* 7) 이미지/썸네일 라운드 통일 */
.publications .preview img, .projects .card-img-top { border-radius: 10px; }

/* 8) CV 사이드바(TOC) active 강조 통일 */
.cv-sidebar a.active, #cv-toc a.active { color: var(--global-theme-color); font-weight: 600; }
```
- (에셋, 코드 아님) 프로필 사진에 뒤 사람 보이면 단독 정사각 재크롭하면 첫인상 확 깔끔해짐.

---

## 적용 순서 & 검증
1. **지난 헤더 CSS 삭제 → §1** (반투명·줄 제거)
2. **§6 CV** (타임라인 복구)
3. **§2 → §3·4·5** (카드 통일)
4. **§7 히어로 이름** (span 1줄 + CSS)
5. **§8, §9** (간격·polish)

### 최종 체크
- [ ] 스크롤 시 헤더 따라오며 frosted, 하드 가로줄 없음
- [ ] blog·publications·projects가 **똑같은 카드**(테두리/radius/hover/태그)
- [ ] CV 날짜 = 연초록 pill, stack 배치, ring 깔끔
- [ ] 히어로 "Yohan" 굵게 / "Lee" 가늘게 (nav와 일치)
- [ ] 진초록 = 링크·active nav·Download·hover 테두리에만
- [ ] 라이트/다크 둘 다 정상