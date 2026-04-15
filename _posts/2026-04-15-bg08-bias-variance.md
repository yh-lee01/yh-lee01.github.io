---
layout: post
title: "8. Bias-Variance Tradeoff"
date: 2026-04-15
categories: background
permalink: /background/08-bias-variance/
author: "Yohan Lee"
---

Generalization — performing well on unseen data — is the central challenge of ML. The bias-variance decomposition explains why.

## The Decomposition

For a regression problem with true function $f(\mathbf{x})$ and noise $\epsilon$ (with $\mathbb{E}[\epsilon]=0$, $\text{Var}(\epsilon)=\sigma^2$), the expected prediction error of a model $\hat{f}$ is:

$$
\mathbb{E}\left[(y - \hat{f}(\mathbf{x}))^2\right] = \underbrace{\left(f(\mathbf{x}) - \mathbb{E}[\hat{f}(\mathbf{x})]\right)^2}_{\text{Bias}^2} + \underbrace{\mathbb{E}\left[(\hat{f}(\mathbf{x}) - \mathbb{E}[\hat{f}(\mathbf{x})])^2\right]}_{\text{Variance}} + \underbrace{\sigma^2}_{\text{Irreducible noise}}
$$

- **Bias**: error from wrong assumptions (model too simple)
- **Variance**: error from sensitivity to training data (model too complex)
- **Noise**: inherent randomness, cannot be reduced

## Overfitting and Underfitting

| Regime | Bias | Variance | Symptom |
|---|---|---|---|
| Underfitting | High | Low | Train error ↑, Test error ↑ |
| Good fit | Moderate | Moderate | Both errors reasonable |
| Overfitting | Low | High | Train error ↓, Test error ↑ |

## Regularization

Adding a penalty term to the loss to reduce variance:

**L2 (Ridge)**: $\mathcal{L}_{\text{reg}} = \mathcal{L} + \lambda \|\mathbf{w}\|_2^2$
- Shrinks all weights towards zero
- Equivalent to Gaussian prior on $\mathbf{w}$

**L1 (Lasso)**: $\mathcal{L}_{\text{reg}} = \mathcal{L} + \lambda \|\mathbf{w}\|_1$
- Produces **sparse** solutions (some weights become exactly zero)
- Equivalent to Laplace prior on $\mathbf{w}$
- Useful for **feature selection**

**Dropout** (deep learning): randomly zero out neurons during training — an implicit ensemble method.

## Cross-Validation

Estimate generalization error without a separate test set:

**$k$-fold CV**: split data into $k$ folds, train on $k-1$, validate on the held-out fold, repeat $k$ times, and average.

$$
\text{CV}_k = \frac{1}{k} \sum_{i=1}^k \mathcal{L}(\hat{f}^{(-i)}, D_i)
$$

Common choices: $k=5$ or $k=10$. **Leave-one-out** ($k=N$) has low bias but high variance and is computationally expensive.

---
**Reference**

T. Hastie, R. Tibshirani, J. Friedman, *The Elements of Statistical Learning*, 2nd ed. Springer, 2009, Ch. 7.
