---
layout: post
title: "5. Optimization Theory"
date: 2026-04-15
categories: background
permalink: /background/05-optimization/
author: "Yohan Lee"
---

Training a model = solving an optimization problem. Understanding the landscape of loss functions is essential for choosing the right algorithm.

## Convexity

A function $f$ is **convex** if for all $\mathbf{x}, \mathbf{y}$ and $\lambda \in [0,1]$:

$$
f(\lambda \mathbf{x} + (1-\lambda) \mathbf{y}) \leq \lambda f(\mathbf{x}) + (1-\lambda) f(\mathbf{y})
$$

Equivalently, $\nabla^2 f(\mathbf{x}) \succeq 0$ everywhere. Convex problems have a crucial property: **every local minimum is a global minimum**.

## Gradient Descent

The simplest first-order method:

$$
\mathbf{x}_{t+1} = \mathbf{x}_t - \eta \nabla f(\mathbf{x}_t)
$$

For an $L$-smooth, $\mu$-strongly convex function, GD with $\eta = 1/L$ converges at rate $O\left(\left(\frac{L-\mu}{L+\mu}\right)^t\right)$.

## Stochastic Gradient Descent (SGD)

When $f(\mathbf{x}) = \frac{1}{N}\sum_{i=1}^N f_i(\mathbf{x})$, computing the full gradient is expensive. SGD uses a **mini-batch** estimate:

$$
\mathbf{x}_{t+1} = \mathbf{x}_t - \eta_t \nabla f_{B_t}(\mathbf{x}_t), \quad B_t \subset \{1, \dots, N\}
$$

The stochastic gradient is an **unbiased estimator**: $\mathbb{E}[\nabla f_{B_t}] = \nabla f$. The variance decreases as $O(1/|B_t|)$.

## Momentum and Adam

**Momentum** accumulates past gradients to dampen oscillations:

$$
\mathbf{v}_{t+1} = \beta \mathbf{v}_t + \nabla f(\mathbf{x}_t), \quad \mathbf{x}_{t+1} = \mathbf{x}_t - \eta \mathbf{v}_{t+1}
$$

**Adam** combines momentum with adaptive per-parameter learning rates:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1) g_t, \quad v_t = \beta_2 v_{t-1} + (1-\beta_2) g_t^2
$$

$$
\mathbf{x}_{t+1} = \mathbf{x}_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
$$

where $\hat{m}_t, \hat{v}_t$ are bias-corrected estimates.

## Constrained Optimization

For $\min f(\mathbf{x})$ subject to $g_i(\mathbf{x}) \leq 0$, the **Lagrangian** is:

$$
\mathcal{L}(\mathbf{x}, \boldsymbol{\lambda}) = f(\mathbf{x}) + \sum_i \lambda_i g_i(\mathbf{x})
$$

The **KKT conditions** (necessary for optimality):
1. Stationarity: $\nabla_\mathbf{x} \mathcal{L} = 0$
2. Primal feasibility: $g_i(\mathbf{x}) \leq 0$
3. Dual feasibility: $\lambda_i \geq 0$
4. Complementary slackness: $\lambda_i g_i(\mathbf{x}) = 0$

This framework appears in SVM (dual formulation) and constrained RL (safe RL).

---
**Reference**

S. Boyd, L. Vandenberghe, *Convex Optimization*. Cambridge University Press, 2004.
