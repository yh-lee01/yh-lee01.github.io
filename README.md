# lyh011113.github.io

Personal academic website based on [Jon Barron's website](https://jonbarron.info) design, built with Jekyll.

---

## 수정 포인트 요약

| 수정 내용 | 파일 |
|---|---|
| 이름 / 소개 / 링크 / CV | `_data/profile.yml` |
| Research 섹션 텍스트 | `_data/profile.yml` → `research_goal` |
| 섹션 제목 변경 | `_data/profile.yml` → `sections` |
| 블로그 토픽 추가/삭제 | `_data/profile.yml` → `post_topics` |
| Google Analytics ID | `_config.yml` → `google_analytics` |
| 사이트 URL | `_config.yml` → `url` |

---

## 콘텐츠 추가

### 논문 (Publications)

```
_templates/publication.md 복사 → _posts/YYYY-MM-DD-논문제목.md
```

필수 front matter:
```yaml
layout: default
title: "논문 제목"
date: 2025-07-21 +00:00
image: /images/썸네일.png
categories: publications
authors: "Yohan Lee, Author2"
venue: "CVPR 2025"
```

선택 링크: `arxiv`, `projectpage`, `code`, `poster`, `slides`, `video`

---

### 프로젝트 (Projects)

```
_templates/project.md 복사 → _posts/YYYY-MM-DD-프로젝트제목.md
```

필수 front matter:
```yaml
layout: default
title: "프로젝트 제목"
date: 2025-01-01 +00:00
image: /images/썸네일.png
categories: project
course: "과목명 or 대회명"
```

선택 링크: `paper`, `code`, `website`, `video`, `poster`, `slides`, `blogpost`

---

### 블로그 포스트 (Posts)

```
_templates/blogpost.md 복사 → _posts/YYYY-MM-DD-제목.md
```

필수 front matter:
```yaml
layout: post
title: "글 제목"
date: 2025-04-10
categories: RL    # _data/profile.yml의 post_topics category 값과 일치
```

**새 토픽 추가** (`_data/profile.yml`):
```yaml
post_topics:
  - label: "Generative Models"   # 화면에 표시될 이름
    category: "generative"       # 포스트 categories 값과 일치해야 함
```

수식 지원: 인라인 `$...$`, 블록 `$$...$$`

---

## 이미지 업로드

썸네일이 필요한 콘텐츠(publications, projects)는 이미지를 **두 곳**에 넣어야 합니다:

```
images/파일명.png       ← 원본
tn/images/파일명.png    ← 썸네일 (작은 사이즈로 직접 리사이즈)
```

> `_make_thumbnails.sh` 스크립트로 자동 생성 가능 (ImageMagick 필요)

---

## 파일 구조

```
_data/
  profile.yml        ← 개인정보 (이름, bio, 링크, 섹션 설정) — 주로 여기만 수정
_layouts/
  default.html       ← 홈페이지 레이아웃
  post.html          ← 블로그 포스트 레이아웃
_posts/              ← 논문 / 프로젝트 / 블로그 포스트 (YYYY-MM-DD-제목.md)
_templates/          ← 새 포스트 작성용 템플릿 (Jekyll이 무시하는 폴더)
_sass/               ← SCSS 모듈
images/              ← 이미지 원본
tn/images/           ← 썸네일 이미지
pdfs/                ← PDF 파일
style.scss           ← 메인 스타일시트
_config.yml          ← Jekyll 설정 (GA ID, URL 등)
```

---

## 참고

- `permalink: /` 설정으로 모든 포스트가 홈에서만 렌더링됨 (단, `layout: post`는 개별 페이지 생성)
- 이미지는 원본을 `images/`에, 썸네일을 `tn/images/`에 동일한 파일명으로 저장
