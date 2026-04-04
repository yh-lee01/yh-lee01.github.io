---
layout: post
title: "What is Bellman equation?"
date: 2025-04-12
categories: RL
permalink: /RL/bellman-equation/
author: "Joonkyu Min"
---

The following equation is the 1-step transition property of value function.

$$
\begin{align}
V^\pi(s)&=\mathbb{E}_{a\sim \pi(\cdot|s), s'\sim p(\cdot|s,a)}[r+\gamma V^\pi(s')|s_{0}=s]
\end{align}
$$

By defining a **Bellman operator** as a **functional** of value function,

$$
B^\pi[V](s) = \mathbb{E}_{a\sim \pi(\cdot|s), s'\sim p(\cdot|s,a)}[r+\gamma V(s')|s]
$$

the 1-step transition property of value function can be written as $V^\pi = B^\pi[V^\pi]$.

**Bellman equation** is defined as

$$
V(s)=B^\pi[V](s)=\mathbb{E}_{a\sim \pi(\cdot|s), s'\sim p(\cdot|s,a)}[r+\gamma V(s')|s]
$$

Then, value function $V^\pi$ is a fixed point of the Bellman equation.
It is also known that $V^\pi$ is the **unique fixed point of Bellman equation**, proved by the fact that the Bellman operator is a $\gamma$-contraction w.r.t. sup norm.

Then, how about the **optimal policy**?

The **optimal policy** can be defined by the **optimal value function**.
Optimal value function is the particular value function following an optimal policy, that is always bigger than value functions of any other policies.

$$
V^{\pi^*}(s) \ge V^\pi(s), \forall s\in S
$$

Optimal policy not only satisfies the Bellman equation, but it also satisfies the **Bellman optimality equation**.

$$
V(s)=\max_{a\in A}\mathbb{E}_{s'\sim p(\cdot|s,a)}[r+\gamma V(s')|s, a]
$$

It can be also shown that the optimal value function is the **unique fixed point of the Bellman optimality equation**.

Optimal value functions are unique, but optimal policies are not actually unique.



---

**Reference**

R. Sutton, A. Barto, Reinforcement Learning: An Introduction. The MIT Press, 2018.
