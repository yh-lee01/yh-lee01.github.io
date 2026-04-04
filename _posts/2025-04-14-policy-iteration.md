---
layout: post
title: "What is Policy Iteration?"
date: 2025-04-14
categories: RL
permalink: /RL/policy-iteration/
author: "Joonkyu Min"
---

Policy iteration a method used to compute the **optimal policy** that comes from the classical dynamic programming for reinforcement learning with a discrete MDP.

It includes two key idea of RL, **policy evaluation** and **policy improvement**.

**Policy evaluation** is a step to compute value function of the current policy, which gives information how the current policy is good.

How do we evaluate the policy? 
We should estimate the value function of the policy $\pi$.
There are two popular methods for this.

**1. MC (Monte-Carlo)**

First is computing the Monte-Carlo estimate. 
We sample **trajectories**, and calculate the expectation of sum of rewards. 
This is a computationally expensive process.

**2. TD Learning (Bootstrap)**

Another method is called TD Learning, which uses sample of 1-step **transition**.

Beyond traditional tabular methods, we can train a parameterized value function with TD learning. We minimize the gap, $L=\mathbb{E}\left[ \frac{1}{2}(V_{\phi}(s)-V^\pi(s))^2 \right]$.
Using the 1-step property of value function, we approximate $V^\pi(s)\approx r_{0}+\gamma V_{\phi}(s_{1})$.
The approximate stochastic gradient from the 1-step Bellman gap becomes

$$
\begin{align}
\nabla_{\phi} \frac{1}{2}\left( V_{\phi}-r_{0}-\gamma V_{\phi}(s_{1})\big|_{\text{stop grad}} \right) 
\end{align}
$$

This is not a unbiased estimate of stochastic gradient of $L$, but it is the most practical method to train the value function.

**Policy improvement** is a step to compute the new policy $\pi'$ which is better or equal to the old policy $\pi$.

How do we compute the new policy? 
The key point is that deriving the new policy which is greedy with respect to the $Q^\pi$, it improves.

$$
\pi_{k+1}(s) \in \arg\max_a \left[ r(s,a) + \gamma \sum_{s'} P(s'|s,a) V^{\pi_k}(s') \right]
$$

It is easily shown that $V^{\pi_{k+1}}\ge V^{\pi_{k}}$. By definition,

$$
\begin{align}
V^{\pi_{k+1}} & =B^*[V^{\pi_{k}}]=\max_{a} \left[ r(s,a) + \gamma \sum_{s'} P(s'|s,a) V^{\pi_k}(s') \right] \\
 & \ge \mathbb{E}_{a\sim \pi_{k}(\cdot|s)}r(s,a) + \gamma \sum_{s'} P(s'|s,a) V^{\pi_k}(s')=B^{\pi_{k}}[V^{\pi_{k}}]
\end{align}
$$

$V^{\pi_{k}}$ is the fixed point of the Bellman operator, so $V^{\pi_{k+1}}\ge V^{\pi_{k}}$.

Policy Iteration provides a background of Actor-Critic methods of Deep RL.



---

**Reference**

R. Sutton, A. Barto, Reinforcement Learning: An Introduction. The MIT Press, 2018.
