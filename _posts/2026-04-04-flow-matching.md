---
layout: post
title: "Flow Matching for Generative Modeling"
date: 2026-04-04
categories: paper_review
permalink: /paper_review/flow-matching/
author: "Yohan Lee"
---

**Paper:** Lipman et al., *Flow Matching for Generative Modeling*, ICLR 2023. [[arXiv]](https://arxiv.org/abs/2210.02747)

---

## Overview

Flow Matching (FM) is a simulation-free framework for training Continuous Normalizing Flows (CNFs). Unlike diffusion models that rely on SDEs, FM directly regresses a vector field that transports samples from a simple prior $p_0$ (e.g., Gaussian) to the data distribution $p_1$.

The key insight: instead of working with the intractable marginal vector field, FM conditions on individual data points to construct simple, tractable per-sample paths — then aggregates them.

---

## Background: Continuous Normalizing Flows

A CNF defines a time-dependent vector field $u_t : \mathbb{R}^d \to \mathbb{R}^d$ that induces a flow $\phi_t$ via the ODE:

$$
\frac{d}{dt}\phi_t(x) = u_t(\phi_t(x)), \quad \phi_0(x) = x
$$

If $u_t$ generates a probability path $p_t$ (i.e., $p_t$ is the pushforward of $p_0$ under $\phi_t$), then training a neural network $v_\theta$ to match $u_t$ via

$$
\mathcal{L}_{\text{FM}}(\theta) = \mathbb{E}_{t, x \sim p_t} \| v_\theta(x, t) - u_t(x) \|^2
$$

lets us sample by solving the ODE from $t=0$ to $t=1$.

The problem: the marginal $p_t$ and $u_t$ are intractable for general data distributions.

---

## Conditional Flow Matching

The fix is to condition on a data point $x_1 \sim p_1$ and define a simple **conditional probability path** $p_t(x \mid x_1)$ with a known conditional vector field $u_t(x \mid x_1)$.

The **Conditional Flow Matching (CFM)** objective is:

$$
\mathcal{L}_{\text{CFM}}(\theta) = \mathbb{E}_{t,\, x_1 \sim p_1,\, x \sim p_t(\cdot|x_1)} \| v_\theta(x, t) - u_t(x \mid x_1) \|^2
$$

**Key theorem:** $\mathcal{L}_{\text{CFM}}$ and $\mathcal{L}_{\text{FM}}$ have identical gradients with respect to $\theta$. So minimizing the tractable CFM objective is equivalent to minimizing the intractable FM objective.

---

## Gaussian Conditional Paths

The simplest choice: connect $x_0 \sim \mathcal{N}(0, I)$ to $x_1$ with a straight line.

$$
p_t(x \mid x_1) = \mathcal{N}(x \mid \mu_t(x_1),\, \sigma_t(x_1)^2 I)
$$

$$
\mu_t(x_1) = t\, x_1, \quad \sigma_t(x_1) = 1 - (1 - \sigma_{\min})t
$$

The corresponding conditional vector field is simply:

$$
u_t(x \mid x_1) = \frac{x_1 - (1-\sigma_{\min})x}{1 - (1-\sigma_{\min})t}
$$

In practice, we sample $x = \mu_t(x_1) + \sigma_t(x_1)\, \epsilon$ with $\epsilon \sim \mathcal{N}(0,I)$ and plug into the loss.

---

## Connection to Diffusion Models

Score-based diffusion can be seen as a special case of FM with non-straight paths (e.g., variance-preserving schedules). FM with straight paths (Optimal Transport paths) has two practical advantages:

- **Straighter trajectories** → fewer NFE (Number of Function Evaluations) at inference.
- **Simulation-free training** → no expensive SDE rollouts needed during training.

---

## Why It Matters for Robotics

Flow Matching has become the backbone of robot action generation (e.g., $\pi_0$, Diffusion Policy variants). The straight-path property means:

- Fast inference (critical for real-time control).
- Stable training compared to score-matching with complex noise schedules.
- Easy to condition on multimodal inputs (language, vision).

---

## Summary

| Property | Score Matching (DDPM) | Flow Matching |
|---|---|---|
| Training | Simulation-free | Simulation-free |
| Inference | Many steps (DDIM ~50) | Fewer steps (OT paths ~10) |
| Path | Curved (VP/VE SDE) | Straight (OT) |
| Likelihood | Requires SDE | Easy via ODE |

---

**Reference**

Y. Lipman, R. T. Q. Chen, H. Ben-Hamu, M. Nickel, M. Le, *Flow Matching for Generative Modeling*, ICLR 2023.
