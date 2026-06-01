# 디자인 리파인 v3 — 폰트 확정(레퍼런스 조합) + 페이지별 수정

> **OVERRIDE**: v2(Computer Modern)의 폰트를 전부 폐기. v1·v2의 색 토큰/간격/구조는 유지.
> **방향 확정**: 원본처럼 **clean sans 본문** + 네가 좋아한 **monospace(코딩 폰트)를 코드·메타데이터에**. serif는 안 씀(블로그/문학 느낌).
> **레퍼런스 원칙**: 임의로 폰트를 짝짓지 말고 **한 세트로 디자인된 superfamily**를 쓴다(어울림 보장).

---

## A. 글꼴 시스템 — IBM Plex (확정)

**왜 이게 "레퍼런스 조합"인가**: IBM Plex Sans / Plex Mono는 IBM이 한 디자이너(Bold Monday)로 **한 세트로 설계**한 superfamily라 짝이 안 깨짐. Plex Sans = 깔끔하면서 약간의 엔지니어링/테크 톤(연구자 톤, 안 bloggy), Plex Mono = 실사용 코딩 폰트. → "sans가 깔끔했다 + mono가 좋았다" 둘 다 만족.

### A-1. 이전 폰트 제거
`head.html`에서 v2의 Computer Modern `<link>`(및 v1 Fraunces/Hanken/JetBrains) **전부 삭제**.
`_base.scss`·`_themes.scss`에서 `--font-serif / --font-display / --font-body` **전부 제거** → 아래 `--font-sans` + `--font-mono`로 일원화.

### A-2. 로딩 (head)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
```

### A-3. 변수 + 적용
```scss
:root {
  --font-sans: "IBM Plex Sans", -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, "JetBrains Mono", monospace;
}
/* 기본: 전부 sans */
body, h1, h2, h3, h4, h5, .wordmark, nav { font-family: var(--font-sans); }
h1, h2, h3, h4 { font-weight: 700; letter-spacing: -0.01em; }

/* mono = 코드 + '코드 같은' 메타데이터(= 네가 좋아한 테크 느낌, 이번엔 serif 없어서 안 조잡) */
pre, code, kbd, tt,
.post-meta, .post-date, .read-time,
.post-tags .tag, .tag,
.cv-date,
nav .search,        /* "ctrl k" 힌트 */
.publications .periodot, time {
  font-family: var(--font-mono);
}
```
> mono를 메타(날짜·읽기시간·태그·ctrl k)에 쓰는 건 sans 본문과 2-family로만 가니까 **테크/학술 톤으로 깔끔**해짐. (v1이 조잡했던 건 mono 때문이 아니라 serif까지 3개가 싸워서였음.)

### A-4. 타이포 스케일 (v2 유지 — 과하지 않게)
```scss
--fs-base:1.0625rem; --lh-base:1.65; --fs-sm:0.875rem;
--fs-h3:1.25rem; --fs-h2:1.5rem; --fs-h1:clamp(2rem,4vw,2.5rem);
--measure:68ch; --container:760px;
```

### A-5. 대안(원하면 1줄 교체 — 둘 다 superfamily 레퍼런스)
- **Geist + Geist Mono** (Vercel): 더 미니멀/모던.
  `https://fonts.googleapis.com/css2?family=Geist:wght@400..700&family=Geist+Mono:wght@400..600&display=swap`
- **Source Sans 3 + Source Code Pro** (Adobe): 가장 무난·중립.
  `https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400..700;1,400&family=Source+Code+Pro:wght@400..600&display=swap`
> **IBM Plex 먼저 적용**해보고 안 맞으면 위로 스왑. 셋 다 sans+mono 같은 패밀리라 위 적용 규칙 그대로 쓰면 됨.

---

# B. 페이지별 트집 + 수정 (이미지 순서대로)

## 이미지 1 — Home 상단 (hero)
1. **프로필 사진에 뒤 사람 어깨·팔·턱이 그대로 보임.** 교수 첫인상 직결. → 본인만 정사각 재크롭해서 `assets/img/prof_pic.*` 교체. **(코드 아님, 직접)** — 디자인에서 제일 큰 감점 요인.
2. hero가 좌우로 벌어져 비어 보임(이름 H1 좌측 끝 ↔ 사진 우측 끝, 가운데 텅). 사진 컬럼을 살짝 안쪽으로(우측 여백 추가) 당기거나 본문 컬럼 폭(`--container`)을 약간 넓혀 균형.
3. 본문 정렬 확인: justify면 단어 간격 들쭉날쭉 → `text-align:left`(ragged right)로. 가독성·깔끔함↑.
4. 사진↔"research interests" 사이 세로 공백이 큼 → 우측 컬럼(아이콘/이메일) 위치를 본문에 맞춰 위로 당김.

## 이미지 2 — Home 하단 (latest posts / selected publications)
1. **latest posts: 날짜와 제목 사이 가로 공백이 너무 큼**("Apr 04, 2026" ······ "Flow Matching..."). → 2-column grid로 좁히기: `grid-template-columns: 130px 1fr; gap:1.5rem;` 날짜(mono, 회색)는 좌측 고정폭.
2. 논문 썸네일이 너무 작음. → 폭 ~96–110px로 키우고 제목 첫 줄 baseline에 top-align.
3. 논문 제목 compact: `font-size:var(--fs-h3); line-height:1.3;` (지금 거대 serif 3줄 → sans로 바뀌며 자동 개선, 그래도 크기 고정).
4. 저자 줄바꿈: "Sangmin Lee† ⓘ"가 다음 줄로 떨어지며 어색 → 저자 컨테이너 폭 확보 또는 ⓘ를 제목 옆 작은 inline 배지로.
5. latest posts ↔ selected publications 섹션 간격이 과함 → `4rem`로 통일.

## 이미지 3 — Blog 목록
1. **태그 사이 가운뎃점(·) 불규칙**(어떤 건 ·로 구분, 어떤 건 그냥 나열). → 가운뎃점 전부 제거, pill만 `gap`으로 균등 배치. mono pill로 깔끔하게.
2. `paper_review`만 언더스코어, 나머지는 하이픈(flow-matching) → `paper-review`로 통일. **(content)**
3. 부제 "Notes on ... AI safety"가 "AI safety"만 둘째 줄로 떨어짐 → 부제 `max-width` 조정해 자연스러운 줄바꿈.
4. 태그 pill: `border-radius:999px; padding:.3rem .7rem; font-family:var(--font-mono); font-size:var(--fs-sm);` hover만 accent.

## 이미지 4 — Publications 목록
1. 논문 제목/썸네일/저자 줄바꿈 = 이미지 2와 동일 수정.
2. "Type to filter" 입력칸이 과하게 큼/둥긂 → `padding:.65rem 1rem; border-radius:var(--radius-md);` 정도로 줄여 더 단정하게. placeholder 회색.
3. "2026" 연도 워터마크는 회색(`var(--global-divider-color)`)으로 옅게 유지(현행 OK).

## 이미지 5 — Projects 목록
1. **프로젝트 카드 제목이 거대 lowercase serif로 4줄 wrap**("sign language interpreter in emergency situations") = 제일 bloggy. → sans + `font-size:var(--fs-h3); line-height:1.25;` 1~2줄로. (lowercase 유지할지 Title Case로 갈지는 취향 — 카드라면 Title Case가 더 단정.)
2. 카드 1개라 좌측에 외롭게 떠 있고 우측 텅 + "coursework" 라벨이 위에 동떨어짐. → 카드 grid를 2~3열로 잡아두면 프로젝트 늘 때 자연스러움. 지금은 카드 폭을 키우거나 중앙 정렬로 임시 보완.
3. "coursework" 카테고리명이 이 프로젝트(수상작)와 안 맞음 → 카테고리를 "selected"/"research" 등으로. **(content)**

## 이미지 6 — Project 상세 (sign language)
1. **메타 줄이 없음**(바로 본문). → 제목 아래 mono 메타 추가: `2023 · Python · Flutter · MediaPipe · [Code] [Demo]` (링크 있으면 연결, 없으면 스택만).
2. MediaPipe 파이프라인 그림 = Google 공식 도식. → 캡션에 출처 표기 또는 본인 도식으로 교체. **(저작권/표기, 직접 확인)**
3. 그림에 테두리/캡션 추가: `border:1px solid var(--global-divider-color); border-radius:var(--radius-md);` + `<figcaption>` 회색.
4. "Award" 배지(옅은 초록) 좋음 — 유지.

## 이미지 7 — CV 상단 (basics/education)  ★버그
1. **★ 날짜 배지가 제목과 겹침**: "2023.02 – 2027.08**B.S. in Computer Science...**" 붙어버림. → al-folio CV는 날짜를 보통 `position:absolute`로 띄움(폰트 바뀌며 어긋난 원인). **absolute 제거하고 2-column grid로**:
```scss
.cv-entry { display:grid; grid-template-columns:130px 1fr; gap:1.25rem; align-items:start; }
.cv-date {
  grid-column:1; position:static;          /* absolute 해제 */
  font-family:var(--font-mono); font-size:var(--fs-sm); font-weight:500;
  color:var(--accent-subtle-text); background:var(--accent-subtle-bg);
  padding:.2rem .5rem; border-radius:var(--radius-sm); text-align:center; white-space:nowrap;
}
@media(max-width:768px){ .cv-entry{grid-template-columns:1fr} .cv-date{justify-self:start;margin-bottom:.5rem} }
```
(실제 클래스명은 `_layouts/cv/`·`_includes/resume/`에서 확인.)
2. **초록 과다**: 진한 초록 Download 버튼 + 진한 초록 날짜 배지 다수. → 배지를 **옅은 초록(위 `--accent-subtle-bg`)**으로, 진한 초록은 ①링크 ②active nav ③Download 버튼만. (배지 톤다운하면 1번 겹침도 덜 튐.)
3. basics 라벨(Name/Label/Email/Url/Summary): sans 600으로, 값과 baseline 정렬 확인.

## 이미지 8 — CV Work/Projects  ★같은 버그
1. **★ 날짜 배지 겹침이 Work·Projects 전체에서 반복**("2023.12 – 2024.02Undergraduate Researcher", "2023.08 – PRESENTSign Language..."). → 이미지 7의 grid 수정이 **모든 cv-entry에 적용**되는지 확인(전역 클래스라 한 번에 해결돼야 함).
2. 불릿(○ hollow) 들여쓰기/줄간격 일관성 확인: `ul{padding-left:1.2rem} li{margin:.35rem 0}`.
3. 페이지 내려갈수록 초록 배지 많음 → 전부 옅은 초록(이미지 7-2)로 톤다운.

---

# C. 적용 순서
1. **A (폰트)** — Computer Modern 제거 → IBM Plex Sans/Mono 적용. (전체 인상 80% 결정)
2. **★ CV 날짜 배지 겹침** — `.cv-entry` 2-column grid (이미지 7·8, 한 번에).
3. **초록 절제** — CV 배지 옅은 초록, 진한 초록 3곳만.
4. latest posts/논문 줄바꿈·간격(이미지 2·4), 태그 가운뎃점 제거(이미지 3), 프로젝트 카드 제목 축소(이미지 5), 프로젝트 메타 추가(이미지 6).
5. 프로필 사진 재크롭(이미지 1, 직접) + MediaPipe 그림 출처(이미지 6, 직접).
6. light/dark + 모바일 확인.

# 완료 기준
- [ ] 폰트 = IBM Plex Sans(본문/제목) + IBM Plex Mono(코드·날짜·태그·ctrl k). serif·Computer Modern 흔적 0.
- [ ] CV 날짜 배지가 제목과 안 겹침(좌측 칼럼 분리), 모바일에선 제목 위로 스택.
- [ ] 진한 초록은 링크·active nav·Download 3곳뿐, CV 배지는 옅은 초록.
- [ ] latest posts/논문 날짜-제목 간격 좁고 정렬됨, 논문 제목 2줄 내외.
- [ ] 블로그 태그에 가운뎃점 없음, pill 균등.
- [ ] 프로젝트 카드 제목 1~2줄, 상세 페이지에 메타 줄 존재.