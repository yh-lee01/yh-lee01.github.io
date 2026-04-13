---
layout: post
title: "글 제목"
date: YYYY-MM-DD
categories: RL          # _data/profile.yml의 post_topics category 값과 일치해야 함
permalink: /RL/slug/    # URL 경로 (선택사항, 없으면 자동 생성)
---

본문을 여기에 작성합니다. Markdown과 LaTeX 모두 지원됩니다. (MathJax 사용)

인라인 수식: $E = mc^2$

블록 수식:
$$
\mathcal{L} = \mathbb{E}_{t, x_0, \epsilon} \left[ \| \epsilon - \epsilon_\theta(x_t, t) \|^2 \right]
$$

여러 줄 수식 (`aligned` 또는 `align` 사용):
$$
\begin{aligned}
A &= B \\
&= C
\end{aligned}
$$

---

## 새 토픽 카테고리 추가하는 법

1. `_data/profile.yml`의 `post_topics`에 항목 추가:
   ```yaml
   post_topics:
     - label: "Generative Models"
       category: "generative"
   ```
2. 이 파일의 `categories: generative` 로 작성하면 자동으로 해당 섹션에 노출됨.
