---
layout: post
title: "13. Sequence Models"
date: 2026-04-15
categories: background
permalink: /background/13-sequence-models/
author: "Yohan Lee"
---

Sequential data (text, speech, time series) requires models that can handle variable-length inputs and capture temporal dependencies.

## Recurrent Neural Networks (RNNs)

An RNN maintains a hidden state $\mathbf{h}_t$ that is updated at each time step:

$$
\mathbf{h}_t = \sigma(W_h \mathbf{h}_{t-1} + W_x \mathbf{x}_t + \mathbf{b})
$$

$$
\mathbf{y}_t = W_y \mathbf{h}_t
$$

The hidden state acts as a **memory** that summarizes all past inputs. However, vanilla RNNs suffer from **vanishing/exploding gradients** over long sequences because the gradient involves $\prod_t \frac{\partial \mathbf{h}_t}{\partial \mathbf{h}_{t-1}}$.

## LSTM (Long Short-Term Memory)

LSTM introduces a **cell state** $\mathbf{c}_t$ with gating mechanisms:

$$
\begin{aligned}
\mathbf{f}_t &= \sigma(W_f [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_f) & \text{(forget gate)} \\
\mathbf{i}_t &= \sigma(W_i [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_i) & \text{(input gate)} \\
\tilde{\mathbf{c}}_t &= \tanh(W_c [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_c) & \text{(candidate)} \\
\mathbf{c}_t &= \mathbf{f}_t \odot \mathbf{c}_{t-1} + \mathbf{i}_t \odot \tilde{\mathbf{c}}_t & \text{(cell update)} \\
\mathbf{o}_t &= \sigma(W_o [\mathbf{h}_{t-1}, \mathbf{x}_t] + \mathbf{b}_o) & \text{(output gate)} \\
\mathbf{h}_t &= \mathbf{o}_t \odot \tanh(\mathbf{c}_t) &
\end{aligned}
$$

The cell state provides a **highway** for gradient flow, enabling learning over hundreds of time steps.

## GRU (Gated Recurrent Unit)

A simplified alternative to LSTM with two gates:

$$
\begin{aligned}
\mathbf{z}_t &= \sigma(W_z [\mathbf{h}_{t-1}, \mathbf{x}_t]) & \text{(update gate)} \\
\mathbf{r}_t &= \sigma(W_r [\mathbf{h}_{t-1}, \mathbf{x}_t]) & \text{(reset gate)} \\
\mathbf{h}_t &= (1 - \mathbf{z}_t) \odot \mathbf{h}_{t-1} + \mathbf{z}_t \odot \tanh(W [\mathbf{r}_t \odot \mathbf{h}_{t-1}, \mathbf{x}_t])
\end{aligned}
$$

Fewer parameters than LSTM, often comparable performance. No separate cell state.

## Attention Mechanism

The bottleneck of RNNs: the entire input sequence must be compressed into a single hidden state. **Attention** lets the decoder look back at all encoder states:

$$
\alpha_{t,s} = \frac{\exp(e_{t,s})}{\sum_{s'} \exp(e_{t,s'})}, \quad \mathbf{c}_t = \sum_s \alpha_{t,s} \mathbf{h}_s
$$

where $e_{t,s} = \text{score}(\mathbf{h}_t^{\text{dec}}, \mathbf{h}_s^{\text{enc}})$ measures relevance of encoder state $s$ to decoder step $t$.

Attention was the key insight that led to the **Transformer** architecture (Post 14).

---
**Reference**

S. Hochreiter, J. Schmidhuber, "Long Short-Term Memory," *Neural Computation*, 1997.
