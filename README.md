# Yohan Lee · academic website

Jekyll / al-folio 기반 개인 연구 홈페이지입니다. [Distill](https://distill.pub/)의 문서 중심 스타일을 공통 기준으로 사용합니다. 일정한 본문 폭과 목차·수식 구조를 유지합니다. 홈과 목록은 Sangdon Park의 연구자 홈페이지와 OpenAI 리서치 페이지의 절제된 정보 배치를 참고합니다. 폰트는 Inter이며 OpenAI Sans 자체를 포함하지 않습니다.

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

기기별 환경 변수는 선택적으로 `.bundle/local-env.sh`에 둘 수 있습니다. 이 파일은 Git에 포함하지 않습니다. 현재 작업 세션의 임시 Ruby/ImageMagick 경로도 여기에 연결되어 있으며, `/tmp`가 삭제되면 위의 표준 설치 과정으로 환경을 준비해야 합니다.

## 어디를 수정하나요?

| 내용 | 위치 |
| --- | --- |
| 홈 소개, 페이지 설정 | `_pages/` |
| 블로그 글 | `_posts/` (연구 글은 `layout: distill`) |
| 연구 프로젝트 | `_projects/` |
| 소식 | `_news/` |
| 논문 정보 | `_bibliography/papers.bib` |
| 연락처, 공동저자 등 | `_data/` |
| 페이지 구조 / 재사용 요소 | `_layouts/` / `_includes/` |
| 공통 색상·폰트·크기 | `_sass/site/_tokens.scss` |
| 기본 타이포·헤더·내비게이션 | `_sass/site/_foundation.scss` |
| 홈 프로필·소식 | `_sass/site/_home.scss` |
| 논문·프로젝트·블로그 목록·CV | `_sass/site/_collections.scss` |
| 긴 글·Distill 목차·수식 | `_sass/site/_reading.scss` |

`assets/css/main.scss` → `_sass/_custom.scss` → `_sass/site/` 순서로 사이트 스타일을 불러옵니다. 기본 al-folio/Distill 및 아이콘 라이브러리 파일은 유지하고, 사이트 변경은 해당 역할의 파일에서 수정합니다. 같은 셀렉터를 끝에 계속 덧붙이지 않습니다. 반응형 규칙은 해당 컴포넌트 파일에 함께 둡니다.

## 디자인 확인

- 홈, 논문, 프로젝트 목록/상세, 블로그 목록/상세/태그, 소식, CV를 확인합니다.
- 1440 / 768 / 576 / 390 / 320px에서 밝은 모드와 어두운 모드를 확인합니다.
- 메뉴, 논문 필터, Abstract/BibTeX 버튼, 목차 링크, 수식과 PDF를 확인합니다.
- PC의 Distill 목차는 본문 옆에, 좁은 화면에서는 본문 위에 배치합니다. 수식은 필요하면 수식 영역 안에서 스크롤됩니다.

`docs/archive/`는 사용하지 않는 과거 디자인 제안의 보관 위치입니다. `_site/`, `output/`, `.bundle/`, `vendor/`와 로컬 다운로드 자산은 소스 편집 대상이 아닙니다. 문서와 화면 검사 산출물은 Jekyll 빌드에서 제외됩니다.

## 배포

`.github/workflows/deploy.yml`이 `main` / `master` 푸시 시 전체 빌드 및 CSS 정리 후 GitHub Pages에 배포합니다. 로컬 `bin/site build` 또는 `serve`는 배포하지 않습니다.
