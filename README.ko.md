# Yohan Lee · 연구 홈페이지

[al-folio](https://github.com/alshedivat/al-folio) 기반 [Jekyll](https://jekyllrb.com/) 개인 연구 홈페이지입니다.
블로그 글은 [Distill](https://distill.pub/) 형식을 쓰고, 나머지 페이지는 절제된 타이포 중심 디자인 하나로 통일했습니다.

**사이트:** <https://yh-lee01.github.io> · [English README](README.md)

| 홈 (라이트) | Distill 글 (다크) |
| --- | --- |
| ![홈](docs/images/home.png) | ![스크롤을 따라오는 목차가 있는 글](docs/images/post.png) |

## 기능

- 모든 페이지가 **720px 한 열**을 쓰고, 메뉴와 푸터도 이 열에 맞춥니다.
- **Distill 글**: 스크롤을 따라오며 현재 섹션을 표시하는 목차, 섹션 링크(`#`), 수식(MathJax), 선택형 "리뷰한 논문" 카드.
- **논문**: BibTeX(jekyll-scholar)에서 생성합니다. 썸네일, Abstract/BibTeX 펼치기, BibTeX 원클릭 복사를 지원하고, 논문이 5편 이상이면 검색창이 나옵니다.
- **프로젝트**: 이미지나 YouTube 썸네일이 붙은 행 형태이고, 상세 페이지에 영상을 넣을 수 있습니다.
- **그 외**: 소식, 태그/카테고리/연도 보관함, PDF CV(모바일은 열기 버튼), `Ctrl K` 검색, 라이트/다크/시스템 테마, RSS.
- **디자인 토큰**: 글자 크기·간격·색을 토큰으로 관리해 페이지 간 일관성을 유지합니다.

## 로컬 실행

필요한 것: Ruby 3.3, Bundler, Python 3(`nbconvert`), ImageMagick(`convert`, 반응형 WebP 이미지).

```bash
bundle install
python -m pip install -r requirements.txt
bin/site serve        # http://localhost:4000, 저장하면 자동 새로고침 (포트 변경: PORT=4001 bin/site serve)
```

```bash
bin/site build        # production 빌드 → _site/
bin/site check        # production 빌드 + 배포 전 CI가 하는 CSS 검사
```

`bin/site`는 로케일이 UTF-8이 아니면 UTF-8로 맞춥니다(그렇지 않으면 BibTeX 파싱이 "invalid byte sequence"로 실패). 기기별 환경 변수는 `.bundle/local-env.sh`에 둘 수 있으며 Git에 포함하지 않습니다.

## 어디를 고치나요?

| 내용 | 위치 | 안내 |
| --- | --- | --- |
| 이름, 사이트 주소, 설명, 기능 켜기/끄기 | `_config.yml` 맨 위 | [템플릿으로 쓰기](docs/USING-THIS-TEMPLATE.md) |
| 홈 소개, 상태 문구, 프로필 사진 | `_pages/about.md`, `assets/img/` | [콘텐츠 안내](docs/CONTENT.md#home-page) |
| 블로그 글 | `_posts/` | [콘텐츠 안내](docs/CONTENT.md#blog-posts) |
| 논문 | `_bibliography/papers.bib`, `assets/img/publication_preview/` | [콘텐츠 안내](docs/CONTENT.md#publications) |
| 프로젝트 | `_projects/` | [콘텐츠 안내](docs/CONTENT.md#projects) |
| 소식 | `_news/` | [콘텐츠 안내](docs/CONTENT.md#news) |
| CV | `assets/pdf/`, `_pages/cv.md` | [콘텐츠 안내](docs/CONTENT.md#cv) |
| 이메일, GitHub, LinkedIn, Scholar | `_data/socials.yml` | [콘텐츠 안내](docs/CONTENT.md#links-and-co-authors) |
| 색·글꼴·크기·간격 | `_sass/site/_tokens.scss` | [디자인 안내](docs/DESIGN.md) |
| 페이지 구조, 공통 구성 요소 | `_layouts/`, `_includes/` | [디자인 안내](docs/DESIGN.md#components) |

세부 안내(`docs/`)는 영어로 작성되어 있습니다. front matter 예시를 그대로 복사해 쓰면 됩니다.

## 배포

`.github/workflows/deploy.yml`이 `master`/`main`에 푸시될 때마다 production 빌드, 안 쓰는 CSS 정리, CSS 무결성 검사를 거쳐 GitHub Pages에 배포합니다. 로컬 `bin/site` 명령은 배포하지 않습니다.

변경 사항은 `serve`만으로 확인하지 말고 `bin/site check`(또는 `build`)로 확인하세요. 개발 서버는 production minify를 건너뛰는데, 배포에서만 레이아웃이 깨진 적이 있습니다.

## 출처와 라이선스

- 테마와 코드: [al-folio](https://github.com/alshedivat/al-folio)(MIT), Distill 템플릿, Font Awesome, Tabler Icons, Academicons. `LICENSE` 참고.
- 이 사이트의 템플릿과 스타일도 MIT입니다. 자유롭게 가져다 쓰세요.
- **콘텐츠는 개인 자료입니다.** 글, 사진, CV, 블로그 글, 논문 정보는 © Yohan Lee입니다. 재사용할 때는 [체크리스트](docs/USING-THIS-TEMPLATE.md)대로 바꿔 주세요.
