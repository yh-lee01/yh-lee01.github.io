# yh-lee01.github.io 전면 개선 보고서

> 대상 레포: `yh-lee01/yh-lee01.github.io` (al-folio 테마 기반 Jekyll)
> 분석 일자: 2026-05-31 · 실제 압축 파일 코드베이스 기준
> 작성 원칙: "왜 문제인지 → 어느 파일 몇 번째 줄을 → 무엇으로" 까지 전부 명시

---

## 0. 한눈에 보는 우선순위

| 순위 | 항목 | 심각도 | 분류 | 해당 파일 |
|---|---|---|---|---|
| 1 | CV 날짜 뱃지가 제목과 겹침 | 🔴 버그 | 레이아웃 | `_includes/resume/education.liquid`, `work.liquid`, `_sass/_cv.scss` |
| 2 | 프로필 사진에 옆 사람이 같이 잘려 들어감 | 🔴 치명 | 콘텐츠/이미지 | `assets/img/profile_pic.jpg`, `_sass/_custom.scss` |
| 3 | 테마 색(cyan)이 접근성 대비 기준 미달 (3.34:1) | 🔴 접근성 | 색상 | `_sass/_variables.scss`, `_themes.scss` |
| 4 | Einstein 더미 데이터 잔존 | 🟠 신뢰도 | 콘텐츠 | `_data/cv.yml`, `coauthors.yml`, `venues.yml`, `repositories.yml` |
| 5 | publications 4번째 저자 숨김 ("1 more author") | 🟠 정확성 | 설정 | `_config.yml` |
| 6 | 논문 썸네일 비율 깨짐 (3:1 와이드) | 🟠 디자인 | 이미지 | `assets/img/scfm.jpg` |
| 7 | 블로그/포스트 메타 회색 대비 부족 (3.84:1) | 🟠 접근성 | 색상 | `_sass/_variables.scss` |
| 8 | 본문 폭(930px)이 가독성 대비 다소 넓음 | 🟡 디자인 | 레이아웃 | `_config.yml` |
| 9 | CV의 Work/Education 종료일 표기 로직 부정확 | 🟡 버그 | 데이터 | `assets/json/resume.json` |
| 10 | 폰트·색·간격 등 미세 디테일 | 🟡 디테일 | 디자인 | 여러 파일 |
| 11 | **디자인 시스템 전면 개편 (ICLR 스타일)** | 🎨 개편 | 디자인 | `_sass/_custom.scss`, `_variables.scss`, `_config.yml` → **11절 + 드롭인 파일** |

> 참고: **`title: blank`은 버그가 아니다.** `_includes/header.liquid`이 `site.title == 'blank'`일 때 `first_name`+`last_name`으로 네비 브랜드를 만들도록 의도된 al-folio 관용구다. 앞선 진단에서 이를 버그로 의심했으나, 코드 확인 결과 정상 동작이다. (다만 브라우저 탭 제목은 별도로 `Yohan Lee`가 들어가도록 손보는 것을 권장 — 8절 참고.)

---

## 1. 🔴 CV 날짜 뱃지가 제목과 겹치는 버그 (최우선)

### 증상
CV 페이지 Education 섹션에서 `2023 - EXPECTED AUG. 2027` 뱃지가 옆의 "Senior Undergraduate" 제목 글자 위로 겹쳐 보인다.

### 근본 원인 (2가지가 겹침)
**원인 A — 날짜 문자열이 비정상적으로 길다.**
`assets/json/resume.json`의 education 항목:
```json
"startDate": "2023",
"endDate": "Expected Aug. 2027"
```
`_includes/resume/education.liquid`은 이 값을 이렇게 가공한다:
```liquid
{% assign startDate = content.startDate | split: '-' | slice: 0, 2 | join: '.' %}
{% assign endDate = content.endDate | split: '-' | slice: 0, 2 | join: '.' | default: 'Present' %}
```
이 로직은 `"2024-05"`처럼 `YYYY-MM` 형식을 `2024.05`로 바꾸려는 의도다. 그런데 `"Expected Aug. 2027"`은 `-`가 없으므로 그대로 통과되어 `2023 - Expected Aug. 2027`이라는 **20자가 넘는 긴 문자열**이 된다.

**원인 B — 뱃지 폭이 고정되어 칸을 넘는다.**
같은 파일에서 뱃지에 `min-width: 75px`만 있고 `max-width`나 줄바꿈 제어가 없다:
```liquid
<span class="badge font-weight-bold danger-color-dark text-uppercase align-middle" style="min-width: 75px"> {{ date }} </span>
```
날짜 칸은 부트스트랩 그리드 `col-md-2`(전체 폭의 1/6)인데, 긴 텍스트가 들어오면 뱃지가 칸 밖으로 흘러 오른쪽 `col-md-10`(제목 영역)과 겹친다.

### 수정 방법 (3단계 — 권장 순서대로)

**Step 1. 데이터부터 짧게 만든다 — `assets/json/resume.json`**
"Expected"라는 단어 대신 ISO 형식과 별도 표기를 쓴다. 가장 깔끔한 방법:
```json
"education": [
  {
    "institution": "Sungkyunkwan University",
    "area": "Computer Science and Engineering",
    "studyType": "B.S. in Computer Science",
    "startDate": "2021-03",
    "endDate": "2027-08"
  }
]
```
> 메모리상 입학은 2021학번이고 졸업이 2027년 8월이다. 기존 `"2023"`은 입학년도로는 부정확하니 함께 정정한다. ("Senior Undergraduate"는 학위가 아니라 신분이므로 `studyType`은 실제 취득 학위명으로 쓰는 게 표준이다.)

이렇게만 해도 뱃지가 `2021.03 - 2027.08`로 짧아져 칸 안에 들어가고 겹침이 사라진다.

**Step 2. "재학 중" 표기를 살리고 싶다면 — `education.liquid` 로직 보강**
졸업 예정을 "Expected"로 보여주고 싶으면, 데이터에 별도 필드를 두고 템플릿에서 처리한다.

`assets/json/resume.json`:
```json
{
  "institution": "Sungkyunkwan University",
  "area": "Computer Science and Engineering",
  "studyType": "B.S. in Computer Science",
  "startDate": "2021-03",
  "endDate": "2027-08",
  "expected": true
}
```
`_includes/resume/education.liquid` — 날짜 가공부를 다음으로 교체:
```liquid
{% if content.startDate and content.startDate != '' %}
  {% assign startDate = content.startDate | split: '-' | slice: 0, 2 | join: '.' %}
  {% if content.endDate %}
    {% assign endDate = content.endDate | split: '-' | slice: 0, 2 | join: '.' %}
    {% if content.expected %}
      {% assign endDate = endDate | prepend: 'Exp. ' %}
    {% endif %}
  {% else %}
    {% assign endDate = 'Present' %}
  {% endif %}
  {% assign date = startDate | append: ' – ' | append: endDate %}
{% else %}
  {% assign date = null %}
{% endif %}
```
→ 결과: `2021.03 – Exp. 2027.08` (여전히 한 줄에 들어가는 길이)

**Step 3. 뱃지가 절대 칸을 넘지 않도록 — `_sass/_cv.scss` 안전장치 추가**
파일 맨 아래에 추가:
```scss
/* CV date badge: prevent overflow into title column */
.date-column {
  .badge {
    white-space: normal;        /* 길면 줄바꿈 허용 */
    word-break: keep-all;
    line-height: 1.3;
    max-width: 100%;
    box-sizing: border-box;
  }
}

@media (max-width: 575px) {
  /* 모바일: 날짜를 제목 위로 자연스럽게 흐르게 */
  .date-column { margin-bottom: 0.5rem; }
}
```
> Step 1만 해도 증상은 사라진다. Step 3는 앞으로 다른 항목에 긴 날짜가 들어와도 다시 깨지지 않게 하는 보험이다.

---

## 2. 🔴 프로필 사진 — 옆 사람이 같이 잘려 들어감 (치명)

### 증상
메인 페이지 원형 프로필 안에, 본인 위/옆으로 다른 사람의 턱·팔·옷이 함께 잘려 들어가 있다. 학술 홈페이지 프로필로는 신뢰도를 깎는 가장 눈에 띄는 문제다.

### 근본 원인
- `assets/img/profile_pic.jpg`는 **785×785 정사각형**인데, 원본이 단체/2인 사진을 정사각 크롭한 것이다.
- 이를 가리려고 `_sass/_custom.scss`에서 CSS로 억지 확대·이동을 했다:
```scss
.profile img {
  object-position: 55% 15%;
  transform: scale(1.15);
}
```
- `transform: scale(1.15)`은 이미지를 15% 확대해 원형 밖으로 밀어내는 방식이라, 화질이 떨어지고 가장자리에서 옆 사람이 여전히 보인다. **CSS로 가리는 접근은 근본 해결이 아니다.**

### 수정 방법 (정공법)
**Step 1.** 본인만 단독으로 나온 사진을 새로 준비한다. 정사각형, 얼굴이 중앙, 최소 800×800 이상 권장. 파일명을 `profile_pic.jpg`로 덮어쓴다(또는 새 파일명으로 두고 `_pages/about.md`의 `image:` 값을 교체).

**Step 2.** 사진을 교체했다면 `_sass/_custom.scss`의 강제 변형을 **삭제하거나 원복**한다:
```scss
// 삭제 권장 (사진이 제대로면 불필요)
// .profile img {
//   object-position: 55% 15%;
//   transform: scale(1.15);
// }
```
정 미세 조정이 필요하면 `scale` 없이 `object-position`만 사용한다:
```scss
.profile img {
  object-fit: cover;
  object-position: center 30%;  /* 얼굴 위치에 맞게 % 조정 */
}
```

**Step 3.** `_config.yml`의 OG 이미지도 이 사진을 쓰므로(`og_image: assets/img/profile_pic.jpg`), 교체 시 카톡/링크드인 공유 썸네일도 자동으로 갱신된다. 추가 작업 불필요.

> 임시방편으로 지금 사진을 계속 쓸 거라면, 최소한 `transform: scale()`은 빼고 `object-position`만으로 얼굴을 잡아라. 확대는 화질 손해가 크다.

---

## 3. 🔴 접근성 — 테마 색(cyan)이 WCAG 대비 기준 미달

### 증상 (정량 측정)
사이트 전체 링크·강조색인 cyan `#2698ba`를 흰 배경(`#ffffff`)에 놓으면 **대비비 3.34:1**이다.
- WCAG AA 본문 텍스트 기준: **4.5:1** → ❌ 미달
- 링크가 본문 텍스트로 기능하므로 이 색은 기준을 통과해야 한다.

`_sass/_variables.scss`:
```scss
$cyan-color: #2698ba !default;   // ← 이 색이 --global-theme-color로 전 사이트 링크에 쓰임
```
`_sass/_themes.scss`:
```scss
--global-theme-color: #{$cyan-color};
--global-hover-color: #{$cyan-color};
```

### 수정 방법
테마색을 대비비 4.5:1 이상인 더 진한 톤으로 교체한다. 기존 cyan 계열의 인상을 유지하면서 통과하는 값 예시:

`_sass/_variables.scss` — 새 변수 추가 또는 `$cyan-color` 자체를 어둡게:
```scss
// 기존: $cyan-color: #2698ba !default;  (대비 3.34 — 미달)
$cyan-color: #1a7a99 !default;     // 대비 ~4.6:1 — AA 통과, 같은 청록 계열
```
또는 메모리에 있는 연구 정체성(생성모델·안전)에 어울리는 차분한 청색 계열로 바꾸고 싶다면:
```scss
$blue-color: #0076df !default;     // 이미 정의돼 있음. 대비 ~4.0 (아슬아슬)
// 권장: 약간 더 진하게
// $accent: #0a66c2;  // 대비 ~5.0:1, 링크드인 블루 톤
```
바꾼 변수를 `_themes.scss`의 `--global-theme-color`/`--global-hover-color`에 연결하면 끝이다(이미 `$cyan-color`를 참조하므로 변수값만 바꾸면 전체 반영).

> 다크모드(`html[data-theme="dark"]`)에서는 같은 cyan이 어두운 배경 위라 대비가 충분하다. 라이트모드 값만 손보면 된다. 다크모드용으로 별도 밝은 색을 쓰고 싶으면 `_themes.scss`의 dark 블록 `--global-theme-color`만 따로 지정하면 된다.

---

## 4. 🟠 Einstein 더미 데이터 잔존 (신뢰도 직결)

al-folio 초기 템플릿의 예시 데이터가 4개 파일에 그대로 남아 있다. 빌드 결과 화면에는 안 보일 수 있지만, **검색엔진/구조화 데이터(schema.org)·일부 위젯에 노출되거나, 나중에 기능을 켰을 때 Einstein이 튀어나온다.** 전부 정리한다.

### 4-1. `_data/cv.yml`
현재 Albert Einstein 전체가 들어 있음. 이 사이트는 CV를 `assets/json/resume.json`으로 그리므로(`_pages/cv.md`의 `layout: cv` + `_config.yml`의 `jekyll_get_json`), **`_data/cv.yml`은 사실상 미사용**이다.
- **조치**: 파일을 삭제하거나, 내용을 빈 배열/본인 정보로 교체. 혼란 방지를 위해 삭제 권장.

### 4-2. `_data/coauthors.yml`
Podolsky, Rosen, Bach, Schrödinger 등 더미. 본인 공저자로 교체:
```yaml
"oh":
  - firstname: ["Sujung", "S."]
    url:   # 있으면 홈페이지/스칼라 링크
"ko":
  - firstname: ["Gaeun", "G."]
    url:
"lee":
  - firstname: ["Sangmin", "S."]
    url: https://sites.google.com/view/pixel-lab-ai/home
```
> 이렇게 해두면 `papers.bib`의 저자명이 자동으로 풀네임/링크로 렌더된다.

### 4-3. `_data/venues.yml`
물리학 저널(AJP, PhysRev) 더미. 본인 분야 학회로 교체:
```yaml
"Interspeech":
  url: https://www.interspeech2026.org/
  color: "#2698ba"
"Under review":
  color: "#828282"
```

### 4-4. `_data/repositories.yml`
`torvalds`, `alshedivat`, `jekyll/jekyll` 등 더미. 본인 것으로:
```yaml
github_users:
  - yh-lee01

repo_description_lines_max: 2

github_repos:
  - yh-lee01/yh-lee01.github.io
  # 공개하고 싶은 다른 레포가 있으면 추가
```
> projects 페이지에서 GitHub 통계 위젯을 쓸 때 이 데이터가 노출된다.

### 4-5. (확인) `_pages/about_einstein.md`
`_config.yml`의 `exclude`에 이미 포함돼 빌드에서 빠진다. 깔끔히 하려면 파일 자체를 삭제해도 된다.

---

## 5. 🟠 Publications — 4번째 저자가 "1 more author"로 숨겨짐

### 증상
"Yohan Lee\*, Sujung Oh\*, Gaeun Ko, and 1 more author" — 교신저자 Sangmin Lee가 가려진다. 저자가 4명뿐이라 전원 표기가 정상이다.

### 근본 원인
`_config.yml`:
```yaml
max_author_limit: 3        # 3명 넘으면 나머지를 "N more author"로 접음
```

### 수정
```yaml
max_author_limit: 4        # 또는 전원 표기를 원하면 더 크게(예: 10)
```
> `papers.bib`의 저자 정의는 `author = {Lee*, Yohan and Oh*, Sujung and Ko, Gaeun and Lee†, Sangmin}`로 이미 4명 모두 들어 있다. 설정값만 올리면 전원 표시된다. 4-2의 `coauthors.yml`까지 채우면 이름이 풀네임+링크로 예쁘게 나온다.

---

## 6. 🟠 논문 썸네일 비율 깨짐

### 증상
publications 목록의 논문 미리보기 이미지가 작고 뭉개져 보인다.

### 근본 원인
- `assets/img/scfm.jpg` = **2356×781 (약 3:1 와이드)**. al-folio의 preview 영역은 대략 정사각~4:3을 가정하므로, 3:1 와이드 이미지는 세로로 심하게 눌려 내용이 안 보인다.
- `papers.bib`에서 `preview = {scfm.jpg}`로 이 파일을 지정.

### 수정 방법
**옵션 A (권장).** preview 전용 이미지를 따로 만든다. 논문의 대표 figure 1개를 **정사각(1:1) 또는 4:3 비율로 크롭/재구성**해서 저장:
```
assets/img/scfm_preview.jpg   (예: 1200×900, 4:3)
```
`papers.bib` 수정:
```bibtex
preview = {scfm_preview.jpg},
```
**옵션 B.** 현재 와이드 이미지를 유지하되, preview 박스를 와이드 비율로 보이게 CSS 조정 — 권장하지 않음(목록 다른 항목과 비율이 안 맞아 더 어색해짐).

> al-folio는 `jekyll-imagemagick`으로 webp 반응형 이미지를 자동 생성한다(`_config.yml`의 `imagemagick` 블록). preview 이미지도 `assets/img/`에 넣으면 자동 변환되니 webp는 따로 안 만들어도 된다.

---

## 7. 🟠 접근성 — 블로그/포스트 메타 텍스트 회색 대비 부족

### 증상
블로그 목록의 날짜·읽기시간·태그 메타가 너무 연한 회색이라 잘 안 보인다.

### 근본 원인
`_sass/_base.scss`의 `.post-meta`, `.post-tags`가 `--global-text-color-light`를 쓰고, 이 값은:
```scss
// _variables.scss
$grey-color: #828282 !default;   // 흰 배경 대비 3.84:1 — AA(4.5) 미달
// _themes.scss
--global-text-color-light: #{$grey-color};
```

### 수정
`_sass/_variables.scss`에서 메타용 회색을 한 단계 진하게:
```scss
// 기존: $grey-color: #828282 !default;  (3.84:1)
$grey-color: #6b6b6b !default;   // 5.33:1 — AA 통과
```
> `#595959`(7.0:1, AAA)까지 진하게 해도 좋지만, 메타 텍스트는 본문보다 약하게 보여야 위계가 사니 `#6b6b6b` 정도가 균형이 좋다. 이 변수는 footer 텍스트 등 다른 곳에도 쓰이니 바꾼 뒤 다크모드 footer를 한 번 확인할 것.

---

## 8. 🟡 본문 폭 & 미세 디테일

### 8-1. 본문 폭 (`_config.yml`)
```yaml
max_width: 930px
```
930px는 학술 홈치곤 한 줄이 길어(약 100자 이상) 가독성 최적 구간(66~80자)을 넘는다.
```yaml
max_width: 820px     # 또는 800px. 텍스트 줄길이가 눈에 띄게 편해짐
```
> 취향 영역이지만, 글이 많은 블로그/about 페이지에서 차이가 크다.

### 8-2. 브라우저 탭 제목
`title: blank`은 네비 브랜드용으로는 정상 동작(1절 참고)하지만, 일부 메타에서 "blank"이 새는 걸 막고 싶으면 `_config.yml`에서:
```yaml
title: Yohan Lee
first_name: Yohan
last_name: Lee
```
로 바꾸고, 네비 브랜드는 `header.liquid`의 `else` 분기(`{{ site.title }}`)로 자연스럽게 "Yohan Lee"가 출력된다. (단, 이 경우 굵게/얇게 조합 스타일이 사라지므로, 디자인 유지를 원하면 `title: blank`을 그대로 두는 편이 낫다. **현 상태 유지 권장.**)

### 8-3. 블로그 태그 아이콘 일관성 (`_pages/blog.md`)
태그는 `<i class="fa-solid fa-hashtag">`(#), 카테고리는 별도 라벨 아이콘으로 렌더되어 한 화면에 `#`와 🏷가 섞인다. 의도된 구분(태그 vs 카테고리)이지만 시각적으로 혼란스러우면, 둘 중 하나의 아이콘 체계로 통일하거나, 카테고리 줄과 태그 줄 사이에 작은 구분 라벨("Tags" / "Categories")을 넣는다.

### 8-4. 폰트
현재 `_config.yml`의 `google_fonts`로 **Roboto + Roboto Slab**을 쓴다(al-folio 기본). 무난하지만 흔하다. 학술 사이트 인상을 더 단단하게 하려면:
- 본문: `Inter` 또는 `Source Sans 3` (가독성 좋고 학술 사이트에서 표준화됨)
- 제목: `Newsreader`나 `Source Serif 4`로 세리프 대비를 주면 고급스러움
변경은 `_config.yml`의 `google_fonts.url`과 `_sass/_base.scss`의 `font-family` 선언을 함께 바꿔야 한다.

### 8-5. Skills 섹션 레이아웃 (CV)
스크린샷에서 Generative Modeling / Reinforcement Learning이 2열, Programming & Frameworks가 그 아래 1열로 떨어져 오른쪽이 비어 보인다. `resume.json`의 skills는 3개이므로, `_sass/_cv.scss`의 `.list-groups`(flex-wrap)에서 항목 폭을 조정해 3열로 채우거나, skills 항목을 4개로 늘려(예: "Tools": Git, Linux, Obsidian 등) 2×2로 균형을 맞춘다.

---

## 9. 적용 순서 추천 (체크리스트)

작은 수정부터 빠르게 효과를 보는 순서:

- [ ] **(5분)** `_config.yml`: `max_author_limit: 3 → 4` — 저자 전원 표시
- [ ] **(5분)** `_config.yml`: `max_width: 930px → 820px` — 가독성
- [ ] **(10분)** `assets/json/resume.json`: education 날짜를 `2021-03` / `2027-08`로 정정 — **CV 겹침 즉시 해결**
- [ ] **(10분)** `_sass/_variables.scss`: `$cyan-color`, `$grey-color` 진하게 — 접근성 2건 해결
- [ ] **(15분)** `_data/coauthors.yml`, `venues.yml`, `repositories.yml`: 더미→본인 데이터
- [ ] **(15분)** `_data/cv.yml`, `_pages/about_einstein.md`: 삭제
- [ ] **(작업필요)** 프로필 사진 단독 컷으로 교체 + `_custom.scss`의 `transform: scale` 제거
- [ ] **(작업필요)** 논문 preview 이미지 1:1 또는 4:3로 재제작 → `papers.bib` 갱신
- [ ] **(선택)** `_sass/_cv.scss`에 뱃지 overflow 안전장치 추가
- [ ] **(선택)** 폰트 교체, Skills 3열 정리

## 11. 🎨 디자인 시스템 전면 개편 — "ICLR Blogposts 2026" 스타일로

> 목표: 레퍼런스로 제시된 ICLR Blogposts 2026 사이트의 깔끔한 인상으로 전면 통일.
> **핵심 사실: ICLR 사이트도 al-folio 테마다.** 즉 테마를 갈아엎을 필요 없이, 같은 뼈대 위에서 변수·여백·타이포·네비를 조정하면 동일한 톤이 나온다.

### 11-0. ICLR가 더 깔끔해 보이는 5가지 이유 (진단)

| 요소 | ICLR | 현재 내 사이트 | 체감 차이 |
|---|---|---|---|
| 네비 간격 | 메뉴 항목 간 여백 넉넉 | 우측에 빽빽하게 몰림 | 답답함 vs 여유 |
| 섹션 수직 여백 | 크고 일정 (3~4rem) | 좁고 들쭉날쭉 | 숨 쉴 공간 |
| 타이포 위계 | H1≫H2≫본문 명확 | 위계 약함 | 스캔 용이성 |
| 색 사용 | 링크만 파랑, 나머지 흑/회 | cyan이 곳곳에 튐 | 절제 vs 산만 |
| 본문 가독성 | 큰 본문(17px+), 넉넉한 행간 | 기본값, 좁은 행간 | 읽는 피로도 |

→ 결론: **테마색 절제 + 여백 확대 + 타이포 위계 강화 + 행간 확보.** 이 4개가 ICLR 톤의 정체다.

### 11-1. 색 — 절제된 단일 액센트 (가장 큰 인상 차이)

ICLR는 링크를 제외하면 거의 흑/회 무채색이다. 현재 내 사이트는 cyan(`#2698ba`)이 제목·아이콘·강조 등 여러 곳에 들어가 산만하다.

`_sass/_variables.scss`:
```scss
// 액센트를 차분한 단일 색으로. (3절의 접근성 수정과 동일 — 한 번에 처리)
$cyan-color: #1a7a99 !default;   // 대비 4.6:1 통과, 차분한 청록
$grey-color: #6b6b6b !default;   // 메타 텍스트 대비 5.33:1 통과
```
그리고 **제목(h1~h3)에는 액센트색을 쓰지 않고 본문 텍스트색을 쓰도록** 정리한다. al-folio 기본은 일부 제목에 theme-color가 들어가 있다. 11-5의 드롭인 코드에서 일괄 처리한다.

### 11-2. 타이포 — 위계와 가독성

**(a) 폰트 교체 (선택, 인상 크게 바뀜).** 현재 Roboto(`_config.yml`의 google_fonts). ICLR도 산세리프 계열이다. 학술 사이트에서 신뢰도 높은 조합:
```yaml
# _config.yml — google_fonts.url 교체
google_fonts:
  url:
    fonts: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap"
```
- 본문/네비: **Inter** (화면 가독성 최상급, 학술 사이트 사실상 표준)
- 제목: **Source Serif 4** (세리프로 위계·격조)를 줄 수도 있고, 전부 Inter로 통일해도 깔끔하다.

**(b) 본문 크기·행간.** 11-5 드롭인 코드에 포함. 본문 17px, 행간 1.7로 ICLR 수준의 읽기 편안함을 만든다.

### 11-3. 여백 — 섹션 리듬

ICLR의 "숨 쉬는 느낌"은 대부분 **수직 여백**에서 나온다. 제목 위 여백을 크게, 섹션 사이를 일정하게. 11-5 코드에서 h1/h2 상단 마진과 섹션 간격을 통일한다.

### 11-4. 네비바 — 첫인상

현재 메뉴가 우측에 몰려 빽빽하다. ICLR처럼 항목 간 간격을 넓히고, 활성 항목은 굵게(`bolder`) 대신 밑줄/언더라인 액센트로 절제한다.

### 11-5. ⭐ 드롭인 코드 — `_sass/_custom.scss` 통째 교체

> 아래 내용으로 `_sass/_custom.scss` **전체를 교체**하면 된다. (기존 프로필 `scale` 코드는 2절대로 사진 교체 후 제거 전제. 사진을 아직 안 바꿨다면 맨 아래 프로필 블록의 주석을 참고.)
> 이 파일은 al-folio가 마지막에 로드하므로, 여기 선언이 테마 기본값을 자연스럽게 덮어쓴다(중요도 충돌 시에만 최소한으로 `!important` 사용).

```scss
/* =====================================================================
   Custom design layer — "ICLR Blogposts 2026" inspired
   여백 · 타이포 위계 · 절제된 색 · 네비 가독성
   ===================================================================== */

/* ---------- 1. 타이포 기반: 본문 가독성 ---------- */
body {
  font-size: 1.0625rem;        /* 17px 기준 — ICLR 수준 본문 */
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Inter를 쓸 경우 적용 (11-2에서 폰트 교체했다면) */
body,
.navbar .navbar-brand,
.navbar-nav .nav-item .nav-link {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* 단락 사이 호흡 */
p { margin-bottom: 1.15rem; }

/* ---------- 2. 제목 위계 강화 + 색 절제 ---------- */
h1, h2, h3, h4, h5, h6 {
  color: var(--global-text-color);   /* 제목에 액센트색 쓰지 않음 — 무채색 통일 */
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

h1 {
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.75rem;
  margin-top: 3rem;            /* 섹션 사이 큰 호흡 — ICLR 핵심 */
  margin-bottom: 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--global-divider-color);  /* 섹션 구분선 */
}

h3 {
  font-size: 1.3rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

/* ---------- 3. 링크: 유일한 액센트. 절제되게 ---------- */
a {
  color: var(--global-theme-color);
  text-decoration: none;
}
a:hover {
  color: var(--global-theme-color);
  text-decoration: underline;
  text-underline-offset: 3px;   /* 밑줄이 글자에 안 붙게 — 세련됨 */
}

/* ---------- 4. 네비바: 간격 + 절제된 활성 표시 ---------- */
.navbar {
  border-bottom: 1px solid var(--global-divider-color);
  opacity: 1;                    /* 기본 0.95 반투명 제거 — 또렷하게 */
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
}

.navbar.navbar-light .navbar-nav .nav-item .nav-link {
  padding-left: 0.9rem;          /* 항목 간 여백 확대 */
  padding-right: 0.9rem;
  font-size: 1.0rem;
  font-weight: 500;
  position: relative;
}

/* 활성 항목: 굵게 대신 하단 밑줄 액센트 (ICLR식 절제) */
.navbar.navbar-light .navbar-nav .nav-item.active > .nav-link {
  color: var(--global-theme-color);
  font-weight: 600;              /* bolder(700+) → 600으로 톤 다운 */
}
.navbar.navbar-light .navbar-nav .nav-item.active > .nav-link::after {
  content: "";
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  bottom: -2px;
  height: 2px;
  background: var(--global-theme-color);
}

.navbar .navbar-brand {
  font-size: 1.25rem;
  font-weight: 600;
}

/* ---------- 5. 블로그/포스트 목록: 메타 가독성 + 간격 ---------- */
.post-list li {
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
}
.post-list li .post-meta,
.post-list li .post-tags {
  color: var(--global-text-color-light);   /* #6b6b6b로 이미 대비 통과 */
  font-size: 0.9rem;
}
.post-list li h3 a { font-weight: 600; }

/* 블로그 상단 태그 클라우드: 한 줄 정렬 + 호흡 */
.tag-category-list {
  padding-top: 1.25rem;
  padding-bottom: 0.5rem;
  ul li { padding: 0.4rem 0.6rem; }
}

/* ---------- 6. blockquote(알림 박스): 톤 다운 ---------- */
blockquote {
  font-size: 1.05rem;            /* 기본 1.2rem은 본문 대비 과함 */
  border-left-width: 4px;
}

/* ---------- 7. 본문 컨테이너: 줄길이 제어 ---------- */
/* _config.yml의 max_width를 820px로 줄이는 것과 병행.
   여기서는 글 본문(post/about)을 한 단계 더 좁혀 읽기 최적화 */
.post .post-content,
.profile + .clearfix + * { 
  /* about 본문 등 텍스트 중심 영역에만 추가 여백을 원하면 사용 */
}

/* ---------- 8. 프로필 이미지 ---------- */
/* 사진을 단독 컷으로 교체한 경우(권장): 아래 한 줄이면 충분 */
.profile img {
  object-fit: cover;
  object-position: center 30%;   /* 얼굴 위치에 맞게 % 미세조정 */
}
/* (단체사진을 임시로 계속 쓸 거라면 scale 대신 위 object-position만 조정.
   transform: scale()은 화질 손해 크므로 사용 금지) */

/* ---------- 9. CV 날짜 뱃지 overflow 안전장치 (1절) ---------- */
.date-column .badge {
  white-space: normal;
  word-break: keep-all;
  line-height: 1.3;
  max-width: 100%;
  box-sizing: border-box;
}
```

### 11-6. 적용 후 체감 순서

이 드롭인을 넣으면 한 번에 바뀌는 것:
1. 네비 항목이 벌어지고 활성 메뉴에 깔끔한 밑줄 → **첫인상**
2. 섹션 제목 위 여백 + 구분선 → **ICLR식 리듬**
3. 본문 17px·행간 1.7 → **가독성**
4. 제목 무채색 통일 + 링크만 액센트 → **절제된 인상**
5. 메타 회색 대비 통과 → **접근성**

> ⚠️ 적용 후 **다크모드**를 꼭 확인할 것. h2 하단 구분선·네비 밑줄이 다크 배경에서도 자연스러운지 보고, 어색하면 `_themes.scss`의 dark 블록에서 `--global-divider-color`만 미세 조정한다.

### 11-7. 폰트까지 바꿀 때 추가 작업

11-2(a)에서 `_config.yml`의 google_fonts를 Inter로 바꿨다면, MDBootstrap이 강제하는 Roboto를 확실히 덮기 위해 위 드롭인의 `font-family` 블록이 동작한다. 그래도 일부 요소에 Roboto가 남으면, `_sass/_base.scss` 최상단에 다음을 추가:
```scss
:root { --bs-font-sans-serif: "Inter", sans-serif; }
body, .navbar, .btn, p, h1, h2, h3, h4, h5, h6, li, td, th, span, a {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

---

## 10. 빌드 & 검증

수정 후 로컬에서 확인:
```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000 에서 about / blog / publications / cv 4페이지 점검
```
접근성 자동 검사:
```bash
# Chrome DevTools > Lighthouse > Accessibility 실행
# 또는 axe DevTools 확장으로 대비비 통과 여부 확인
```
배포는 평소처럼 `master`에 push하면 GitHub Actions(`.github/workflows`)가 빌드한다.

---

### 마지막 메모
- `README.md`가 아직 옛날 Barron/leonidk 템플릿 설명(`_data/profile.yml`, `style.scss` 등)으로 되어 있다. 현재 구조(al-folio)와 전혀 안 맞으니, 시간 날 때 al-folio 기준으로 다시 쓰거나 최소한 "al-folio 기반"이라는 한 줄로 정리해두면 나중의 본인이 헷갈리지 않는다.
- 전체적으로 콘텐츠(논문·블로그·연구소개)는 이미 탄탄하다. 위 항목들은 대부분 "템플릿 잔재 청소 + 접근성 + 이미지" 라서, 반나절이면 사이트 인상이 확 올라간다.
