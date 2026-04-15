---
layout: post
title: "15. Generative Models"
date: 2026-04-15
categories: background
permalink: /background/15-generative-models/
author: "Yohan Lee"
---

Generative models learn the data distribution $p(\mathbf{x})$, enabling sampling, density estimation, and representation learning. Here we survey the major paradigms.

## Variational Autoencoders (VAE)

VAE learns a latent variable model $p_\theta(\mathbf{x}) = \int p_\theta(\mathbf{x} \mid \mathbf{z}) p(\mathbf{z}) d\mathbf{z}$ by maximizing the **Evidence Lower Bound (ELBO)**:

$$
\log p(\mathbf{x}) \geq \mathbb{E}_{q_\phi(\mathbf{z}|\mathbf{x})} [\log p_\theta(\mathbf{x} \mid \mathbf{z})] - D_{\text{KL}}(q_\phi(\mathbf{z} \mid \mathbf{x}) \| p(\mathbf{z}))
$$

- **Encoder** $q_\phi(\mathbf{z} \mid \mathbf{x})$: maps data to latent distribution
- **Decoder** $p_\theta(\mathbf{x} \mid \mathbf{z})$: reconstructs data from latent code
- **Reparameterization trick**: $\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}$, $\boldsymbol{\epsilon} \sim \mathcal{N}(0, I)$ — enables backprop through sampling

VAEs provide a structured latent space but tend to produce blurry samples.

## Generative Adversarial Networks (GANs)

GANs train a **generator** $G$ and **discriminator** $D$ in a minimax game:

$$
\min_G \max_D \; \mathbb{E}_{\mathbf{x} \sim p_{\text{data}}} [\log D(\mathbf{x})] + \mathbb{E}_{\mathbf{z} \sim p(\mathbf{z})} [\log(1 - D(G(\mathbf{z})))]
$$

At the Nash equilibrium, $G$ generates samples indistinguishable from real data and $D$ outputs $1/2$ everywhere.

Pros: sharp, high-quality samples. Cons: mode collapse, training instability, no density estimation.

## Normalizing Flows

Flows construct complex distributions by composing invertible transformations $f_1, \dots, f_K$:

$$
\mathbf{x} = f_K \circ \cdots \circ f_1(\mathbf{z}), \quad \mathbf{z} \sim \mathcal{N}(0, I)
$$

The **change of variables formula** gives the exact density:

$$
\log p(\mathbf{x}) = \log p(\mathbf{z}) - \sum_{k=1}^K \log \left|\det \frac{\partial f_k}{\partial \mathbf{z}_{k-1}}\right|
$$

Flows provide **exact likelihood evaluation** and **exact sampling**, but require invertible architectures.

## Diffusion Models

Diffusion models define a **forward process** that gradually adds noise:

$$
q(\mathbf{x}_t \mid \mathbf{x}_{t-1}) = \mathcal{N}(\mathbf{x}_t; \sqrt{1-\beta_t} \mathbf{x}_{t-1}, \beta_t I)
$$

and learn to **reverse** it:

$$
p_\theta(\mathbf{x}_{t-1} \mid \mathbf{x}_t) = \mathcal{N}(\mathbf{x}_{t-1}; \boldsymbol{\mu}_\theta(\mathbf{x}_t, t), \sigma_t^2 I)
$$

The training objective simplifies to a **denoising score matching** loss:

$$
\mathcal{L} = \mathbb{E}_{t, \mathbf{x}_0, \boldsymbol{\epsilon}} \left[ \|\boldsymbol{\epsilon} - \boldsymbol{\epsilon}_\theta(\mathbf{x}_t, t)\|^2 \right]
$$

Diffusion models currently achieve state-of-the-art image generation quality (DALL·E, Stable Diffusion).

## Flow Matching

A recent alternative that directly regresses a **velocity field** $v_\theta(\mathbf{x}_t, t)$ defining a continuous-time flow:

$$
\frac{d\mathbf{x}_t}{dt} = v_\theta(\mathbf{x}_t, t)
$$

The **Conditional Flow Matching** (CFM) objective:

$$
\mathcal{L}_{\text{CFM}} = \mathbb{E}_{t, q(\mathbf{x}_0)} \left[ \|v_\theta(\mathbf{x}_t, t) - u_t(\mathbf{x}_t \mid \mathbf{x}_0)\|^2 \right]
$$

where $u_t$ is the conditional target velocity (e.g., for an optimal transport path: $u_t = \mathbf{x}_1 - \mathbf{x}_0$).

Flow matching offers **simulation-free training**, no need for noise schedules, and naturally connects to optimal transport theory.

---
**Reference**

Y. Lipman et al., "Flow Matching for Generative Modeling," ICLR, 2023.

D. Ho et al., "Denoising Diffusion Probabilistic Models," NeurIPS, 2020.
