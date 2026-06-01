# yh-lee01.github.io 종합 디테일 보고서 — 전 페이지 일체감(cohesion)

> 목표: **모든 페이지가 한 세트(one design system)로 보이게.** 단순 패치가 아니라 더 나은 방향 포함.
> 구조: **A. 공통 규칙(일체감의 뼈대)** → **B. 페이지별 디테일**. 공통 규칙을 모든 페이지에 동일 적용하는 게 일체감의 핵심.
> 클래스명은 al-folio 기준 예시 — 실제 `_sass/`·`_includes/`·`_layouts/`에서 확인 후 매핑. 폰트(IBM Plex)·색 토큰 현행 유지.

---

# A. 공통 디자인 시스템 (전 페이지 동일 적용)

### A-1. 브랜드 통일 (워드마크 = hero 이름)
메뉴는 **Yohan**(700) + Lee(400)인데 hero 큰 제목은 둘 다 굵음 → 통일.
```html
<h1 class="page-title">Yohan <span class="lighter">Lee</span></h1>  <!-- about.html 이름 출력부 -->
```
```scss
.lighter { font-weight:400; }
.site-title, h1.page-title { font-weight:700; }
```

### A-2. 페이지 타이틀 케이스 통일
지금 "Blog"만 대문자, "publications/projects"는 소문자 → **전부 소문자**로(메뉴·섹션 헤딩과 일치). 약어 **CV만 대문자** 유지. → `blog · publications · projects · CV`.

### A-3. 섹션 헤딩 통일 (모든 페이지 동일)
```scss
h2, .section-title {
  font-family:var(--font-sans); font-weight:700; font-size:var(--fs-h2);
  margin:4rem 0 1.25rem; padding-bottom:.4rem;
  border-bottom:1px solid var(--global-divider-color);
}
```
소문자 표기(research interests / basics / education / publications …) 통일.

### A-4. 그린 규칙 (★ 일체감 핵심)
**진한 초록은 딱 3곳: ① 링크 ② active nav ③ Download 버튼.** 그 외(배지·워터마크·라벨)는 전부 subtle/회색. 지금 CV 날짜 배지가 진초록이라 이 규칙 위반 → A-5로 해결.

### A-5. 배지 통일 (★ 가장 큰 일체감 레버)
프로젝트 "Award" 배지(연초록)가 깔끔함 → **CV 날짜 배지도 동일 스타일**로. 진초록 솔리드 블록 폐기.
```scss
.badge, .cv .date, .resume .date, time {
  display:inline-block; font-family:var(--font-mono); font-size:var(--fs-sm); font-weight:500;
  color:var(--accent-subtle-text); background:var(--accent-subtle-bg);
  padding:.2rem .55rem; border-radius:var(--radius-sm); white-space:nowrap;
}
.cv .date { min-width:120px; text-align:center; }   /* 날짜 배지만 칼럼 정렬용 고정폭 */
```

### A-6. 카드 통일 (프로젝트 카드 = CV 카드 동일 토큰)
```scss
.card, .cv-section, .project-card {
  background:var(--global-card-bg-color);
  border:1px solid var(--global-divider-color);
  border-radius:var(--radius-lg); padding:1.5rem; box-shadow:var(--shadow-sm);
}
```

### A-7. 간격 스케일 통일
섹션 `4rem` · 헤딩→본문 `1.25rem` · 단락 `1rem` · 카드 패딩 `1.5rem` · 카드↔카드 `1rem` — 전 페이지 동일.

### A-8. 메타 mono 통일 (이미 거의 됨)
날짜·읽기시간·태그·프로젝트 메타·ctrl k·CV 배지 = `var(--font-mono)`. 일반 본문/제목엔 mono 쓰지 말 것.

### A-9. 우측 워터마크 라벨 통일
큰 회색 라벨(2026 / selected 등): `color:var(--global-divider-color)`, 동일 크기·우측 정렬. 본문과 경쟁 X.

### A-10. 본문 컬럼 폭 통일
모든 페이지 content `max-width` 동일(좌측 시작 라인 맞춰 페이지 전환 시 흔들림 없게). about/blog/pub/projects/cv 동일 컨테이너.

---

# B. 페이지별 디테일

## B-1. Home (이미지 1·2)
1. **★ 우측 연락처 블록 — 배치·구분선·순서 겹침.** 사진 아래 `아이콘 → 구분선 → 이메일 → 태그라인`이 붙어 구분선이 위아래랑 겹쳐 보임. **구분선 제거 + 가운데 정렬 한 스택.**
```scss
.profile { text-align:center; }
.profile img { margin-bottom:1rem; }
.profile .social { display:flex; justify-content:center; gap:1rem; margin:0 0 .75rem; }
.profile .social a { color:var(--global-text-color-light); transition:color .15s; }
.profile .social a:hover { color:var(--global-theme-color); }
.profile hr { display:none; }                 /* 겹치던 구분선 제거 */
.profile .more-info p { margin:.15rem 0; }
.profile .more-info p:last-child { color:var(--global-text-color-light); font-size:var(--fs-sm); } /* 태그라인 */
```
2. **★ hero 이름** = A-1 적용("Lee" 400).
3. **latest posts 날짜↔제목 간격 과다** → 날짜 칼럼 고정폭:
```scss
.news .post { display:grid; grid-template-columns:130px 1fr; gap:1.5rem; align-items:baseline; }
.news .post .date { font-family:var(--font-mono); color:var(--global-text-color-light); }
```
4. 섹션 간격 = A-7(`4rem`). selected publications 논문 제목 compact(`line-height:1.3`, 한 단계 ↓).
5. **(에셋, 마지막 1회)** 프로필 사진에 뒤 사람 들어가 있으면 솔로 정사각 재크롭. 코드 아님, 여유될 때.

## B-2. blog (이미지 4)
6. 헤더(제목/부제/divider) ↔ 첫 포스트 세로 공백 과다 → 축소(`.post-list{margin-top:2rem}`).
7. 페이지 타이틀 "Blog" → "blog"(A-2).
8. 태그 pill: 하이픈·가운뎃점 정리된 건 good. 크기만 살짝 ↓ + gap 일정:
```scss
.tag { font-family:var(--font-mono); font-size:var(--fs-sm); padding:.28rem .65rem; border-radius:999px;
       border:1px solid var(--global-divider-color); color:var(--global-text-color-light); }
.post-tags { display:flex; flex-wrap:wrap; gap:.5rem; }
.tag:hover { border-color:var(--global-theme-color); color:var(--global-theme-color); background:var(--accent-subtle-bg); }
```

## B-3. publications (이미지 3)
9. **필터 박스 과하게 크고 둥긂** → 높이·패딩 ↓, radius ↓, focus 링:
```scss
input.filter, .publications input[type="text"] {
  padding:.6rem 1rem; border-radius:var(--radius-md); font-size:var(--fs-base);
  border:1px solid var(--global-divider-color);
}
input.filter:focus { border-color:var(--global-theme-color); box-shadow:0 0 0 3px var(--accent-subtle-bg); outline:none; }
```
10. 필터 박스 ↔ "2026" 사이 공백 ↓(`margin-top:1.5rem`). "2026" = A-9.
11. 논문 제목 compact = 홈과 동일 컴포넌트(일체감). ABS/BIB 버튼 현행 good.

## B-4. projects 목록 (이미지 5)
12. **★ 카드 안 썸네일↔제목 빈 공간 큼** → 카드 본문 패딩/갭 ↓:
```scss
.projects .card-body { padding:1rem 1.25rem; }
.projects .card-title { font-size:var(--fs-h3); line-height:1.25; margin:.25rem 0 .5rem; }
```
13. 카드 grid(프로젝트 늘 때 대비), 카드 토큰 = A-6:
```scss
.projects .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(300px,1fr)); gap:1.5rem; }
```
14. (에셋, 선택) 썸네일이 2단 파이프라인이라 복잡 — 대표 컷 1장으로 크롭하면 카드 더 깔끔.

## B-5. project 상세 (이미지 6)
15. H1 제목·메타 줄 신설 good. "Award" 옅은 배지 = A-5 기준(이게 표준).
16. **MediaPipe 그림 = Google 공식 도식** → `figcaption`로 출처 표기 or 자체 도식. (저작권/표기)
```scss
.project figure img { border:1px solid var(--global-divider-color); border-radius:var(--radius-md); }
.project figure figcaption { color:var(--global-text-color-light); font-size:var(--fs-sm); margin-top:.5rem; text-align:center; }
```
17. key features: **첫 불릿만 bold** → 전부 통일(전부 lead bold or 전부 일반). `ul{padding-left:1.2rem} li{margin:.35rem 0}`.

## B-6. CV (이미지 7·8)
18. **★★ 날짜 배지 전부 진초록 → A-5 subtle로.** CV가 프로젝트 Award 배지와 묶이고 그린 과다 해소(이 페이지 최우선).
19. 배지 칼럼 정렬: 너비 다른 배지("2026" vs "2025.02 – PRESENT") 좌측 라인 맞춤 → 엔트리 2-column grid:
```scss
.cv-entry { display:grid; grid-template-columns:140px 1fr; gap:1.25rem; align-items:start; }
@media(max-width:768px){ .cv-entry{grid-template-columns:1fr} .cv .date{justify-self:start;margin-bottom:.5rem} }
```
20. 카드(basics/education/work/publications) = A-6 토큰 통일. Download 버튼 = 유일한 진초록 CTA(A-4) 유지.
21. (확인) education 겹침 해결됨 — work·publications 엔트리에도 19번 grid 적용 확인. 사이드바 sticky+scroll-spy(active 초록) 현행 good.

---

# C. 우선순위
1. **★★ 18·A-5** CV 배지 subtle (+ 프로젝트 Award와 통일) — 일체감 최대 효과
2. **★ B-1.1** 홈 연락처 블록 정리 (겹침)
3. **★ A-1·B-1.2** Yohan Lee 통일
4. **★ 12** 프로젝트 카드 내부 빈 공간
5. **★ B-1.3** 홈 날짜 간격 · **9** 필터 박스
6. **A-2~A-3** 타이틀 케이스·섹션 헤딩 통일
7. 나머지(6·15·16·17·19·20·13)
8. 에셋(직접): **B-1.5** 사진 · **16** MediaPipe 출처

# 완료 기준 (= 일체감 체크)
- [ ] 모든 배지(프로젝트 Award + CV 날짜) 동일 subtle 스타일
- [ ] 진한 초록 = 링크·active nav·Download 3곳에만
- [ ] 워드마크·hero 이름 둘 다 Yohan(700)+Lee(400)
- [ ] 페이지 타이틀 전부 소문자(+CV), 섹션 헤딩 스타일 동일
- [ ] 카드(프로젝트·CV) border/radius/padding/shadow 동일 토큰
- [ ] 섹션 간격 4rem 등 간격 스케일 전 페이지 동일
- [ ] 홈 연락처 블록 깔끔(구분선 없음), 날짜-제목 가까움
- [ ] 프로젝트 카드 이미지↔제목 빈 공간 없음
- [ ] 페이지 전환 시 좌측 정렬 라인·폭 안 흔들림