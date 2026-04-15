---
layout: post
title: "3. Probability Fundamentals"
date: 2026-04-15
categories: background
permalink: /background/03-probability/
author: "Yohan Lee"
---

Probability theory is the framework for reasoning under uncertainty. Every ML model is, at its core, a probabilistic statement about data.

## Probability Space

A probability space $(\Omega, \mathcal{F}, P)$ consists of:
- **Sample space** $\Omega$: set of all possible outcomes
- **Event algebra** $\mathcal{F}$: collection of measurable subsets of $\Omega$
- **Probability measure** $P: \mathcal{F} \to [0, 1]$ satisfying $P(\Omega) = 1$ and countable additivity

## Conditional Probability and Independence

**Conditional probability**: given that $B$ occurred,

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \quad P(B) > 0
$$

Events $A$ and $B$ are **independent** if $P(A \cap B) = P(A) P(B)$.

## Bayes' Rule

The cornerstone of probabilistic inference:

$$
P(\theta \mid D) = \frac{P(D \mid \theta) \, P(\theta)}{P(D)}
$$

| Term | Name | Role |
|---|---|---|
| $P(\theta \mid D)$ | Posterior | What we want to know |
| $P(D \mid \theta)$ | Likelihood | How well $\theta$ explains data |
| $P(\theta)$ | Prior | Our belief before seeing data |
| $P(D)$ | Evidence | Normalizing constant |

Bayesian inference is "inverting" the generative process: given observed effects, infer the most likely causes.

## Random Variables and Expectation

A **random variable** $X$ is a measurable function $X: \Omega \to \mathbb{R}$. Its **expectation**:

$$
\mathbb{E}[X] = \int x \, dP(x) = \begin{cases} \sum_x x \, p(x) & \text{(discrete)} \\ \int x \, f(x) \, dx & \text{(continuous)} \end{cases}
$$

Key properties: linearity ($\mathbb{E}[aX + bY] = a\mathbb{E}[X] + b\mathbb{E}[Y]$), and for independent $X, Y$: $\mathbb{E}[XY] = \mathbb{E}[X]\mathbb{E}[Y]$.

## Variance and Covariance

$$
\text{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2
$$

$$
\text{Cov}(X, Y) = \mathbb{E}[(X - \mu_X)(Y - \mu_Y)]
$$

The **covariance matrix** $\Sigma$ of a random vector $\mathbf{x}$: $\Sigma_{ij} = \text{Cov}(x_i, x_j)$. It is always positive semi-definite.

## Law of Large Numbers & Central Limit Theorem

- **LLN**: $\bar{X}_n \xrightarrow{P} \mu$ as $n \to \infty$ — sample means converge to the true mean
- **CLT**: $\sqrt{n}(\bar{X}_n - \mu) \xrightarrow{d} \mathcal{N}(0, \sigma^2)$ — the distribution of sample means is approximately Gaussian

These justify why **SGD works**: averaging over mini-batches gives unbiased gradient estimates that converge.

---
**Reference**

C. Bishop, *Pattern Recognition and Machine Learning*. Springer, 2006, Ch. 1–2.
