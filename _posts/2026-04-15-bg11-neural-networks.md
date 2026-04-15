---
layout: post
title: "11. Neural Networks & Backpropagation"
date: 2026-04-15
categories: background
permalink: /background/11-neural-networks/
author: "Yohan Lee"
---

Neural networks are compositions of simple functions that can approximate any continuous mapping — making them the universal workhorse of modern ML.

## From Perceptron to MLP

A single **perceptron** computes $y = \sigma(\mathbf{w}^\top \mathbf{x} + b)$. It can only learn linear boundaries.

A **multi-layer perceptron** (MLP) stacks layers:

$$
\mathbf{h}^{(l)} = \sigma\left(W^{(l)} \mathbf{h}^{(l-1)} + \mathbf{b}^{(l)}\right)
$$

With at least one hidden layer and non-linear activation, MLPs are **universal function approximators** (Cybenko, 1989).

## Activation Functions

| Function | Formula | Properties |
|---|---|---|
| Sigmoid | $\sigma(z) = \frac{1}{1+e^{-z}}$ | Output in $(0,1)$; vanishing gradient |
| Tanh | $\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$ | Zero-centered; still vanishing gradient |
| ReLU | $\max(0, z)$ | No vanishing gradient; dead neurons |
| GELU | $z \cdot \Phi(z)$ | Smooth; used in Transformers |

**ReLU** dominates in practice due to computational simplicity and gradient flow.

## Backpropagation

Training computes gradients of a scalar loss $\mathcal{L}$ w.r.t. every parameter via the **chain rule**, applied in reverse topological order through the computational graph.

For a simple two-layer network $y = W_2 \sigma(W_1 \mathbf{x})$:

$$
\frac{\partial \mathcal{L}}{\partial W_1} = \frac{\partial \mathcal{L}}{\partial y} \cdot \frac{\partial y}{\partial \mathbf{h}} \cdot \frac{\partial \mathbf{h}}{\partial W_1}
$$

The computational cost of backprop is **proportional to the forward pass** — this efficiency makes training deep networks feasible.

## Weight Initialization

Poor initialization → vanishing/exploding gradients. Standard strategies:

**Xavier** (Glorot): $W \sim \mathcal{N}\left(0, \frac{2}{n_{\text{in}} + n_{\text{out}}}\right)$ — designed for sigmoid/tanh.

**He (Kaiming)**: $W \sim \mathcal{N}\left(0, \frac{2}{n_{\text{in}}}\right)$ — designed for ReLU.

The goal: keep the variance of activations roughly constant across layers.

## Batch Normalization

Normalize activations within each mini-batch:

$$
\hat{x}_i = \frac{x_i - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}, \quad y_i = \gamma \hat{x}_i + \beta
$$

Benefits: faster convergence, less sensitivity to initialization, mild regularization.

---
**Reference**

I. Goodfellow, Y. Bengio, A. Courville, *Deep Learning*. MIT Press, 2016, Ch. 6–8.
