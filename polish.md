# yh-lee01.github.io 페이지별 폴리시 보고서 (위치·정렬 중심)

> 현재 상태(IBM Plex Sans/Mono 적용) 기준. **레이아웃·정렬·간격** 위주로 페이지별 점검. ★ = 임팩트 큰 항목 우선.
> 클래스명은 al-folio 기준 예시 — 실제 `_sass/`·`_includes/`에서 확인 후 매핑.
> 폰트·색 토큰은 현행 유지. 이 보고서는 "자리(positioning) 다듬기" 패스.

---

## 0. 전 페이지 공통
- 섹션 헤딩 간격 통일: `h2 { margin-top:4rem; margin-bottom:1.25rem; }`
- 우측 상단 회색 워터마크 라벨("selected", "2026" 등)은 `color:var(--global-divider-color)`로 옅게 유지(본문과 경쟁 X).
- 진한 초록은 **링크 · active nav · 버튼**에만. 배지·라벨엔 진초록 쓰지 말 것(아래 CV 참고).

---

## 1. Home — 상단 (hero) · 이미지 1
1. **★ 연락처 블록 정렬 제각각.** 이메일·태그라인은 가운데인데 소셜 아이콘은 좌측 → 축 어긋남. 전부 가운데 + 순서 `사진 → 아이콘 → 이메일 → "Feel free…"`.
```scss
.profile .contact, .profile .social, .profile .email { text-align:center; }
.profile .social { display:flex; justify-content:center; gap:1rem; margin:.75rem 0; }
.profile .social a { color:var(--global-text-color-light); transition:color .15s; }
.profile .social a:hover { color:var(--global-theme-color); }
```
2. 블록 내부 세로 간격 불균일 → 각 요소 `margin .5–.75rem`로 일정. 구분선은 제거 권장(없어도 한 덩어리로 읽힘).
3. (선택) 사진 top을 본문 첫 줄/H1 baseline에 맞춰 hero 좌우 균형(지금 이름 H1 오른쪽 위가 텅 빔).
4. **(에셋, 코드 아님) 사진 재크롭** — 아직 뒤 사람 팔·어깨 들어가 있음. 솔로 정사각으로. hero 최대 감점 요인.
5. (선택, content) 이메일 핸들 `john1111369@…` → 이름 기반 alias가 더 프로페셔널.

## Home — 하단 (latest posts · selected publications) · 이미지 2·3
6. **★ latest posts 날짜↔제목 가로 공백 과다.** 날짜 칼럼 고정폭으로 좁혀 제목 붙이기.
```scss
.news .post { display:grid; grid-template-columns:130px 1fr; gap:1.5rem; align-items:baseline; }
.news .post .date { font-family:var(--font-mono); color:var(--global-text-color-light); }
```
7. "…human intentions." → latest posts → selected publications 사이 세로 공백 과다 → 공통 0번 `4rem` 적용.
8. 논문 제목 한 단계 compact: `line-height:1.3` + 크기 살짝 ↓ (썸네일·저자줄과 균형). 저자줄·ABS/BIB·Under review 정렬은 현행 good.

---

## 2. Blog · 이미지 4
9. **★ 헤더(제목/부제/divider) ↔ 첫 포스트 세로 공백 과다** → 간격 축소(`.post-list { margin-top:2rem }` 수준).
10. 태그 pill: 가운뎃점 제거·하이픈 통일(`paper-review`)된 건 good. pill 크기만 살짝 ↓ + `gap` 일정하게.
```scss
.tag { font-family:var(--font-mono); font-size:var(--fs-sm); padding:.28rem .65rem; border-radius:999px;
       border:1px solid var(--global-divider-color); color:var(--global-text-color-light); }
.post-tags { display:flex; flex-wrap:wrap; gap:.5rem; }
.tag:hover { border-color:var(--global-theme-color); color:var(--global-theme-color); background:var(--accent-subtle-bg); }
```
11. (content) 포스트 1개라 아래가 휑함 — 글 추가 전까진 리스트 `max-width:var(--container)`로 가운데 모아 덜 비어 보이게.

---

## 3. Publications · 이미지 5
12. **★ "Type to filter" 박스 과하게 크고 둥긂** → 높이·패딩 줄이고 radius 작게, focus 링만.
```scss
input.filter, .publications input[type="text"] {
  padding:.6rem 1rem; border-radius:var(--radius-md); font-size:var(--fs-base);
  border:1px solid var(--global-divider-color);
}
input.filter:focus { border-color:var(--global-theme-color); box-shadow:0 0 0 3px var(--accent-subtle-bg); outline:none; }
```
13. 필터 박스 ↔ "2026" 연도 사이 공백 축소(`margin-top:1.5rem`).
14. 논문 제목 compact = 홈 8번과 동일 처리.
15. "2026" 워터마크 회색 유지(공통 0번). 엔트리(좌)와 연도(우) 사이 빈 띠는 al-folio 컨벤션이라 OK.

---

## 4. Projects 목록 · 이미지 6
16. **★ 카드 안 썸네일↔제목 사이 빈 공간 큼** → 카드 본문 패딩/갭 축소.
```scss
.projects .card-body, .grid-item .card-body { padding:1rem 1.25rem; }   /* 이미지 바로 아래 큰 여백 제거 */
.projects .card-title { font-size:var(--fs-h3); line-height:1.25; margin:.25rem 0 .5rem; }
```
17. 카드 grid로(프로젝트 늘 때 대비) — 지금 1개라 좌측에 외롭게 떠 있고 우측 텅.
```scss
.projects .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(300px,1fr)); gap:1.5rem; }
```
18. (에셋, 선택) 썸네일이 2단 파이프라인이라 복잡 — 대표 컷 1장으로 크롭하면 카드가 더 깔끔.

---

## 5. Project 상세 (sign language) · 이미지 7·8
19. **★ 프로젝트 H1 제목이 안 보임** — 최상단이 메타("2023 · Python · …")부터 시작. 순서를 **제목(H1) → 메타 → 본문**으로(제목 누락이면 추가). 메타 줄 신설은 good.
20. **MediaPipe 그림 = Google 공식 도식** → `figcaption`로 출처 표기 또는 자체 도식 교체. (저작권/표기)
21. 그림에 캡션 추가 + 테두리 유지:
```scss
.project figure img { border:1px solid var(--global-divider-color); border-radius:var(--radius-md); }
.project figure figcaption { color:var(--global-text-color-light); font-size:var(--fs-sm); margin-top:.5rem; text-align:center; }
```
22. "key features": **첫 불릿만 bold**, 나머지는 일반 → 통일(전부 lead 단어 bold, 또는 전부 일반). 들여쓰기·줄간격: `ul{padding-left:1.2rem} li{margin:.35rem 0}`.
23. (선택) 메타에 `[Code] [Demo]` 링크 있으면 추가.

---

## 6. CV · 이미지 9·10
24. **★ 초록 과다.** 날짜 배지가 전부 솔리드 진초록 + Download 버튼 + Email/Url 링크 + active nav → 페이지가 초록 블록 천지. 배지를 **옅은 초록(subtle)**으로, 진초록은 버튼·active·링크만.
```scss
.cv .date, .resume .date, .cv time {
  display:inline-block; min-width:120px; text-align:center; white-space:nowrap;
  font-family:var(--font-mono); font-size:var(--fs-sm); font-weight:500;
  color:var(--accent-subtle-text); background:var(--accent-subtle-bg);
  padding:.2rem .55rem; border-radius:var(--radius-sm);
}
```
25. **배지 칼럼 고정폭 정렬** — 너비 다른 배지("2026" vs "2025.02 – PRESENT")가 좌측 라인 안 맞음. 엔트리를 2-column grid로:
```scss
.cv-entry { display:grid; grid-template-columns:140px 1fr; gap:1.25rem; align-items:start; }
@media(max-width:768px){ .cv-entry{grid-template-columns:1fr} .cv .date{justify-self:start;margin-bottom:.5rem} }
```
26. (확인) education 겹침은 해결된 듯 — **work·publications 엔트리에도 같은 grid가 적용됐는지** 확인(전역 클래스면 한 번에).
27. 사이드바 sticky + scroll-spy active(초록 + 좌측 바) 잘 동작 → 현행 유지. basics 라벨/값 정렬도 good.

---

## 우선순위 (이 순서로)
1. **★ 6** 홈 latest posts 날짜 간격
2. **★ 16** 프로젝트 카드 내부 빈 공간
3. **★ 24·25** CV 배지 옅은 초록 + 칼럼 정렬
4. **★ 1** 홈 연락처 블록 정렬
5. **★ 12** publications 필터 박스
6. **★ 19** 프로젝트 상세 제목/순서
7. 나머지(7·8·9·10·13·14·17·20·21·22)
8. 에셋(직접): **4** 사진 재크롭 · **20** MediaPipe 그림 출처

## 완료 기준
- [ ] 홈 latest posts 날짜-제목 가까이, 섹션 간격 4rem 통일
- [ ] 홈 우측 연락처(아이콘·이메일·태그라인) 가운데 정렬로 통일
- [ ] 블로그 헤더↔포스트 간격 축소, 태그 pill 크기·gap 정돈
- [ ] publications 필터 박스 작고 단정
- [ ] 프로젝트 카드 이미지↔제목 빈 공간 제거, grid 준비
- [ ] 프로젝트 상세에 H1 제목 존재 + 그림 캡션/출처
- [ ] CV 배지 옅은 초록, 좌측 칼럼 정렬, 모든 섹션 겹침 없음
- [ ] 진한 초록은 버튼·active nav·링크 3종에만