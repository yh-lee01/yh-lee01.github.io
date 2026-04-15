---
layout: post
title: "14. Transformers & Self-Attention"
date: 2026-04-15
categories: background
permalink: /background/14-transformers/
author: "Yohan Lee"
---

The Transformer replaced recurrence with pure attention, enabling massive parallelism and scaling to billions of parameters.

## Self-Attention

Given input sequence $X \in \mathbb{R}^{n \times d}$, self-attention computes:

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right) V
$$

where $Q = XW_Q$, $K = XW_K$, $V = XW_V$ are linear projections.

Each token attends to **every other token** — capturing global dependencies in $O(1)$ sequential steps (vs. $O(n)$ for RNNs).

The $\sqrt{d_k}$ scaling prevents the dot products from growing too large, keeping softmax gradients stable.

## Multi-Head Attention

Instead of a single attention, run $h$ parallel heads and concatenate:

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h) W_O
$$

Each head can learn to attend to different aspects (syntax, semantics, position, etc.).

## Positional Encoding

Self-attention is **permutation-equivariant** — it has no notion of order. Positional encodings inject sequence order:

**Sinusoidal** (original):

$$
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d}}\right), \quad PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d}}\right)
$$

**Learned**: treat positions as an embedding lookup table. Most modern models (BERT, GPT) use learned positional embeddings or **RoPE** (Rotary Position Embeddings).

## Transformer Block

Each block consists of:

$$
\mathbf{h}' = \text{LayerNorm}(\mathbf{h} + \text{MultiHead}(\mathbf{h})) \\
$$

$$
\mathbf{h}'' = \text{LayerNorm}(\mathbf{h}' + \text{FFN}(\mathbf{h}'))
$$

where $\text{FFN}(\mathbf{x}) = \text{ReLU}(\mathbf{x}W_1 + \mathbf{b}_1)W_2 + \mathbf{b}_2$.

**Residual connections** and **layer normalization** are critical for training stability.

## Encoder vs Decoder

| Model | Attention Mask | Use Case |
|---|---|---|
| **Encoder** (BERT) | Bidirectional (see all tokens) | Classification, NLU |
| **Decoder** (GPT) | Causal (see only past tokens) | Generation, LLMs |
| **Encoder-Decoder** (T5) | Cross-attention between enc/dec | Translation, Seq2Seq |

## Scaling Laws

Transformer performance follows predictable **power laws** (Kaplan et al., 2020):

$$
L(N) \propto N^{-\alpha}
$$

where $L$ is loss and $N$ is the number of parameters. Larger models are more sample-efficient — this observation drives the "scale up" paradigm of GPT-3/4.

---
**Reference**

A. Vaswani et al., "Attention Is All You Need," NeurIPS, 2017.
