# Yohan Lee · academic website

Jekyll / al-folio 기반 개인 연구 홈페이지입니다. 블로그 글은 [Distill](https://distill.pub/) 형식(제목·byline·옆 목차·수식)을 그대로 사용하고, 나머지 페이지도 같은 본문 폭과 타이포를 따릅니다. 홈과 목록은 Sangdon Park의 연구자 홈페이지와 OpenAI 리서치 페이지의 절제된 정보 배치를 참고합니다. 폰트는 Inter이며 OpenAI Sans 자체를 포함하지 않습니다.

## 로컬 실행

배포 환경과 같은 Ruby **3.3.5**, Bundler, Node.js, Python/Jupyter nbconvert, ImageMagick(`convert`)이 필요합니다.

```bash
gem install bundler
bundle install
python -m pip install -r requirements.txt
bin/site serve
```

브라우저에서 <http://localhost:4000>을 엽니다. 파일 변경 시 Jekyll이 다시 빌드합니다. 포트 변경은 `PORT=4001 bin/site serve`로 가능합니다.

```bash
bin/site build       # production 전체 빌드 → _site/
```

`bin/site`는 로케일이 UTF-8이 아니면 `C.UTF-8`로 맞춥니다(아니면 bibtex 파싱이 `invalid byte sequence`로 실패). 기기별 환경 변수는 선택적으로 `.bundle/local-env.sh`에 둘 수 있으며 Git에 포함하지 않습니다.

## 어디를 수정하나요?

| 내용 | 위치 |
| --- | --- |
| 홈 소개, 페이지 설정 | `_pages/` |
| 블로그 글 | `_posts/` (연구 글은 `layout: distill`) |
| 연구 프로젝트 | `_projects/` (`importance`가 작을수록 앞, `youtube: <영상 ID>`를 적으면 카드 썸네일과 상세 페이지 영상이 자동으로 붙음) |
| 소식 | `_news/` (`type`: paper · post · joined · award · update) |
| 논문 정보 | `_bibliography/papers.bib` (`selected = {true}`면 홈에 표시) |
| 연락처, 공동저자 | `_data/` (`socials.yml`에 `scholar_userid`를 적으면 홈에 Scholar 링크 표시) |
| 홈 상태 문구 (예: Fall 2027 지원) | `_pages/about.md`의 `status` |
| CV PDF | `assets/pdf/YohanLee_CV.pdf` |
| 페이지 구조 / 재사용 요소 | `_layouts/` / `_includes/` |

### 공통 구성 요소

모든 페이지가 같은 구성 요소를 사용하므로, 한 곳을 고치면 전체에 반영됩니다.

| 요소 | 파일 | 사용하는 곳 |
| --- | --- | --- |
| 페이지 머리말 (제목 · 개수/버튼 · 설명 · 구분선) | `_includes/page_header.liquid` | 논문, 프로젝트, 블로그, 소식, 태그/연도 보관함, CV, 프로젝트 상세 |
| 날짜 목록 (`.date-list`) | `_includes/news.liquid`, `_layouts/archive.liquid` | 홈 소식, 소식, 태그/카테고리/연도 보관함 |
| 푸터 | `_includes/footer.liquid` | 모든 페이지 (Distill 글 포함) |

페이지 머리말의 개수는 자동으로 계산됩니다. 페이지 front matter에 `count: papers` / `projects` / `posts`를 적으면 됩니다.

### 스타일

`assets/css/main.scss` → `_sass/_custom.scss` → `_sass/site/` 순서로 불러옵니다. al-folio/Distill 기본 스타일과 아이콘 라이브러리 파일은 그대로 두고, 사이트 변경은 아래 역할별 파일에서 합니다. 같은 셀렉터를 끝에 계속 덧붙이지 않고, 반응형 규칙은 해당 컴포넌트 파일에 함께 둡니다. 크기와 간격은 새 숫자를 만들지 말고 `_tokens.scss`의 단계를 사용합니다. 모든 페이지는 680px 한 열(`--reading-width`)을 쓰고, 메뉴와 푸터도 이 열에 맞춥니다.

| 파일 | 역할 |
| --- | --- |
| `_sass/site/_tokens.scss` | 색상(라이트/다크) · 글자 크기 단계(`--fs-*`) · 간격 단계(`--sp-*`, 4px 단위) · 본문 폭 |
| `_sass/site/_foundation.scss` | 기본 타이포 · 링크 · 페이지 머리말 · 태그 · 내비게이션 · 푸터 |
| `_sass/site/_home.scss` | 홈 프로필 · 홈 섹션 제목 |
| `_sass/site/_collections.scss` | 날짜 목록 · 블로그 · 논문 · 프로젝트 · CV |
| `_sass/site/_reading.scss` | 긴 글 · Distill 목차 · 수식 |

## 디자인 확인

- 홈, 논문, 프로젝트 목록/상세, 블로그 목록/상세/태그, 소식, CV를 확인합니다.
- 1440 / 768 / 576 / 390 / 320px에서 밝은 모드와 어두운 모드를 확인합니다.
- 메뉴, 논문 필터, Abstract/BibTeX 버튼, 목차 링크, 수식과 PDF를 확인합니다.
- PC의 Distill 목차는 본문 옆에, 좁은 화면에서는 본문 위에 배치합니다. 긴 수식은 화면 밖으로 잘리지 않고 수식 영역 안에서 가로로 스크롤됩니다.
- 글 안의 인라인 수식에 `_`가 두 번 이상 들어가면 Markdown이 기울임으로 해석할 수 있습니다. 이때는 `$...$` 대신 `$$...$$`를 씁니다.

`_site/`, `output/`, `.bundle/`, `vendor/`와 로컬 다운로드 자산은 소스 편집 대상이 아닙니다. 문서와 화면 검사 산출물은 Jekyll 빌드에서 제외됩니다.

## 배포

`.github/workflows/deploy.yml`이 `main` / `master` 푸시 시 전체 빌드 및 CSS 정리 후 GitHub Pages에 배포합니다. 로컬 `bin/site build` 또는 `serve`는 배포하지 않습니다.
