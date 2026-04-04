---
layout: post
title: "What is a value function?"
date: 2025-04-11
categories: RL
permalink: /RL/value-function/
author: "Joonkyu Min"
---

In RL, we try to maximize the long-term collected discounted rewards, or return.

$$
G^\pi_t = \sum^\infty_{i=0}\gamma^i r_{t+i+1} \le \frac{\sup r}{1-\gamma}
$$

**Value** in MDP is the expected return of a particular state, following a given policy.

There are typically two value functions, state value function $V$, and state-action value function $Q$ .

- **State value function**

State value function is a mapping from state $s$ to the expected return starting from $s$, following a particular policy $\pi$ .

$$
V^\pi(s)=\mathbb{E}^\pi[G_t|s_{t}=s]
$$


- **State action value function**

State-action value function, or **Q-function**, is a mapping from state $s$ and action $a$ to the expected return starting from state $s$ and action $a$, following a particular policy $\pi$ .

$$
Q^\pi(s)=\mathbb{E}^\pi[G_t|s_{t}=s,a_{t}=a]
$$

Due to the Markovian property, value function holds the following 1-step transition property.

$$
\begin{align}
V^\pi(s)&=\mathbb{E}_{a\sim \pi(\cdot|s), s'\sim p(\cdot|s,a)}[r+\gamma V^\pi(s')|s_{0}=s] \\
Q^\pi(s)&=\mathbb{E}_{a'\sim \pi(\cdot|s'), s'\sim p(\cdot|s,a)}[r+\gamma Q^\pi(s',a')|s_{0}=s,a_{0}=a]
\end{align}
$$

This leads to the famous **Bellman equation**.


---

**Reference**

R. Sutton, A. Barto, Reinforcement Learning: An Introduction. The MIT Press, 2018.
