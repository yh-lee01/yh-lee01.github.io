---
layout: post
title: "What is Value Iteration?"
date: 2025-04-13
categories: RL
permalink: /RL/value-iteration/
author: "Joonkyu Min"
---

In classical dynamic programming (DP) for reinforcement learning with a discrete MDP, **value iteration** is a method used to compute the **optimal value function**.

By repeatedly applying the **Bellman optimality operator** to the value function, and assuming $0 < \gamma < 1$, the value function converges to the true **optimal value function** $V^*$.

<!-- Once the optimal value function is obtained, 
the greedy policy with respect to $V^*$ can be extracted, which is guaranteed to be the **optimal policy**. -->

Although value iteration cannot be directly applied to real-world problems with large or continuous state spaces, it provides a background for modern deep reinforcement learning methods, such as **Deep Q-Networks (DQN)**.



---

**Reference**

R. Sutton, A. Barto, Reinforcement Learning: An Introduction. The MIT Press, 2018.
