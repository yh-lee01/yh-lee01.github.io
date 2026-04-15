---
layout: post
title: "7. Linear Models"
date: 2026-04-15
categories: background
permalink: /background/07-linear-models/
author: "Yohan Lee"
---

Linear models are the simplest parametric models, yet they remain the building blocks of deep learning through their role as the final layers of neural networks.

## Linear Regression

Model: $y = \mathbf{w}^\top \mathbf{x} + b$. The **ordinary least squares** (OLS) solution minimizes:

$$
\mathcal{L}(\mathbf{w}) = \frac{1}{2N} \sum_{i=1}^N (y_i - \mathbf{w}^\top \mathbf{x}_i)^2 = \frac{1}{2N} \|X\mathbf{w} - \mathbf{y}\|^2
$$

Setting $\nabla_\mathbf{w} \mathcal{L} = 0$ gives the **closed-form solution**:

$$
\mathbf{w}^* = (X^\top X)^{-1} X^\top \mathbf{y}
$$

This is also the MLE solution under the assumption $y \mid \mathbf{x} \sim \mathcal{N}(\mathbf{w}^\top \mathbf{x}, \sigma^2)$.

## Logistic Regression

For binary classification, we model $P(y=1 \mid \mathbf{x})$ using the **sigmoid** function:

$$
\sigma(z) = \frac{1}{1 + e^{-z}}, \quad P(y=1 \mid \mathbf{x}) = \sigma(\mathbf{w}^\top \mathbf{x})
$$

The loss is the **binary cross-entropy** (negative log-likelihood of Bernoulli):

$$
\mathcal{L} = -\frac{1}{N}\sum_{i=1}^N \left[ y_i \log \sigma(z_i) + (1-y_i) \log(1-\sigma(z_i)) \right]
$$

This is a **convex** optimization problem — no local minima.

## Softmax Regression

Generalization to $K$ classes. Define scores $z_k = \mathbf{w}_k^\top \mathbf{x}$ for each class, then:

$$
P(y=k \mid \mathbf{x}) = \frac{\exp(z_k)}{\sum_{j=1}^K \exp(z_j)} = \text{softmax}(\mathbf{z})_k
$$

The softmax output is a valid probability distribution (non-negative, sums to 1).

## Decision Boundaries

Linear models partition the input space with **hyperplanes**:
- Binary: $\mathbf{w}^\top \mathbf{x} + b = 0$ defines the boundary
- Multi-class: pairwise boundaries between class regions

The linearity limitation: cannot learn XOR or any non-linearly separable pattern without feature engineering. This motivates neural networks.

---
**Reference**

T. Hastie, R. Tibshirani, J. Friedman, *The Elements of Statistical Learning*, 2nd ed. Springer, 2009, Ch. 3–4.
