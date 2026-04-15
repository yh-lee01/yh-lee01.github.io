---
layout: post
title: "4. Common Distributions"
date: 2026-04-15
categories: background
permalink: /background/04-distributions/
author: "Yohan Lee"
---

Knowing the right distribution family is half the modeling battle. Here we catalog the distributions that appear most frequently in ML.

## Discrete Distributions

**Bernoulli**: a single binary trial with success probability $p$.

$$
p(x) = p^x (1-p)^{1-x}, \quad x \in \{0, 1\}
$$

**Categorical**: generalization to $K$ classes with probabilities $\boldsymbol{\pi}$.

$$
p(x = k) = \pi_k, \quad \sum_{k=1}^K \pi_k = 1
$$

The output of a softmax layer defines a categorical distribution over classes.

## Gaussian (Normal) Distribution

The most important distribution in ML:

$$
\mathcal{N}(x \mid \mu, \sigma^2) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left( -\frac{(x - \mu)^2}{2\sigma^2} \right)
$$

**Multivariate Gaussian** with mean $\boldsymbol{\mu}$ and covariance $\Sigma$:

$$
\mathcal{N}(\mathbf{x} \mid \boldsymbol{\mu}, \Sigma) = \frac{1}{(2\pi)^{d/2} |\Sigma|^{1/2}} \exp\left( -\frac{1}{2} (\mathbf{x} - \boldsymbol{\mu})^\top \Sigma^{-1} (\mathbf{x} - \boldsymbol{\mu}) \right)
$$

Why Gaussians are everywhere:
- **CLT**: sums of many independent variables → Gaussian
- **Maximum entropy**: among distributions with fixed mean and variance, Gaussian has the highest entropy
- **Conjugate prior**: Gaussian likelihood × Gaussian prior = Gaussian posterior

## Exponential Family

Many common distributions belong to the **exponential family**:

$$
p(x \mid \boldsymbol{\eta}) = h(x) \exp\left( \boldsymbol{\eta}^\top \mathbf{T}(x) - A(\boldsymbol{\eta}) \right)
$$

where $\boldsymbol{\eta}$ are natural parameters, $\mathbf{T}(x)$ are sufficient statistics, and $A(\boldsymbol{\eta})$ is the log-partition function.

Members include: Gaussian, Bernoulli, Categorical, Poisson, Gamma, Beta.

The log-partition function $A(\boldsymbol{\eta})$ is **always convex**, which guarantees that MLE has a unique solution.

## Mixture Models

A **Gaussian mixture model** (GMM):

$$
p(\mathbf{x}) = \sum_{k=1}^K \pi_k \, \mathcal{N}(\mathbf{x} \mid \boldsymbol{\mu}_k, \Sigma_k)
$$

GMMs are **universal approximators** of densities: with enough components, they can approximate any continuous distribution. They are trained via the **EM algorithm**.

---
**Reference**

K. Murphy, *Probabilistic Machine Learning: An Introduction*. MIT Press, 2022, Ch. 2–3.
