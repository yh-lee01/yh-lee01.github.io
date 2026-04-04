---
layout: post
title: "What is Offline RL?"
date: 2025-04-24
categories: RL
permalink: /RL/offlinerl/
author: "Joonkyu Min"
---

**Offline reinforcement learning**, also known as batch reinforcement learning is a method in between standard online RL and data-driven machine learning.
Online RL agents require active data collection during training, so the data is likely to be limited in real world scenarios, leading to poor generalization.
In contrast, (self) supervised machine learning uses large datasets to train the models, allowing them to scale easily and generalize well.

Offline RL aims to learn policies from a fixed dataset without any interaction with the environment. 
Although off-policy methods, which update policies using old data stored in a replay buffer, also utilize data not collected concurrently, they don't perform well in offline settings due to extrapolation error when the agent encounters out-of-distribution states.

The main challenge of offline RL is **distribution shift**. 
Since the agent is trained on a fixed dataset, the function approximation are not reliable especially for states that are not represented well in the dataset.
This often leads to overestimation in value estimates, which causes problems in Q-learning or actor-critic methods.

---
**Reference**

https://medium.com/@sergey.levine/decisions-from-data-how-offline-reinforcement-learning-will-change-how-we-use-ml-24d98cb069b0