---
layout: post
title: "What is Policy Gradient?"
date: 2025-04-15
categories: RL
permalink: /RL/policy-gradient/
author: "Joonkyu Min"
---

**Policy gradient** is a method of RL that optimize the policy directly, by computing the gradient of the objective function w.r.t. the policy function parameters $\theta$.

$$
\max_{\theta} J(\theta) = \mathbb{E}_{s_{0}\sim p_{0}}[V^{\pi_{\theta}}(s_{0})]
$$

It can be also thought as policy improvement on parametric policy functions.

**Likelihood Ratio policy gradient** is the foundation idea of policy gradient. 
Consider the likelihood of each trajectory $\tau$ under policy parameter $\theta$ as $P(\tau;\theta)$.
We want to maximize the following objective.

$$
U(\theta)=\mathbb{E}\left[ \sum R(s_{t},a_{t});\pi_{\theta} \right]=\sum_{\tau}P(\tau;\theta)R(\tau)
$$

The gradient of the objective w.r.t. $\theta$ becomes the expectation form of gradient of log likelihood.

$$
\begin{align}
\nabla_{\theta}U(\theta) & = \nabla_{\theta}\sum_{\tau}P(\tau;\theta)R(\tau)  \\
 & =\sum_{\tau}\nabla_{\theta}P(\tau;\theta)R(\tau) \\
& = \sum_{\tau}P(\tau;\theta) \frac{\nabla_{\theta}P(\tau;\theta)}{P(\tau;\theta)}R(\tau) \\
 & = \sum_{\tau}P(\tau;\theta) \nabla_{\theta}\log P(\tau;\theta)R(\tau) \\ 
 & =\mathbb{E}[\nabla_{\theta}\log P(\tau;\theta)R(\tau)]
\end{align}
$$

Doing gradient ascent intuitively updates the parameter to the direction of pushing up the likelihood proportional to the rewards.

The gradient of likelihood can be computed via gradient of the policy because

$$
\begin{align}
\log P(\tau;\theta) & =\log\left[ \prod P(s_{t+1}|s_{t},a_{t})\pi_{\theta}(a_{t}|s_{t}) \right] \\
 & =\sum_{t}\log P(s_{t+1}|s_{t},a_{t}) + \sum_{t} \log\pi_{\theta}(a_{t}|s_{t})
\end{align}
$$

and the first term has nothing to do with $\theta$.
Thus, we can compute the unbiased estimate of the gradient by this way.

$$
\begin{align}
\nabla_{\theta}U(\theta)
 & =\mathbb{E}\left[ \left(\sum_{t} \nabla_{\theta}\log \pi_{\theta}(a_{t}|s_{t})\right)R(\tau) \right]
\end{align}
$$

We can also subtract a baseline without harming the unbiasedness, but reducing variance.

$$
\begin{align}
\nabla_{\theta}U(\theta)
 & =\mathbb{E}\left[ \left(\sum_{t} \nabla_{\theta}\log \pi_{\theta}(a_{t}|s_{t})\right)(R(\tau)-b) \right]
\end{align}
$$

This vanilla policy gradient is known as REINFORCE algorithm.



This version of gradient has high variance.
We can reduce the variance in following ways.

**1. Remove past rewards**

$$
\begin{align}
\nabla_{\theta}U(\theta)
 & =\mathbb{E}\left[ \left(\sum_{t} \nabla_{\theta}\log \pi_{\theta}(a_{t}|s_{t})\sum_{t'}\gamma^{t'} r_{t'} \right) \right] \\
 & =\mathbb{E}\left[ \sum_{t} \nabla_{\theta}\log \pi_{\theta}(a_{t}|s_{t})\left(\sum_{t'=0}^{t-1}\gamma^{t'} r_{t'}+\gamma^t\sum_{t'=t}\gamma^{t'-t} r_{t'} \right) \right] \\ 
 & =\mathbb{E}\left[ \sum_{t} \nabla_{\theta}\log \pi_{\theta}(a_{t}|s_{t})\gamma^tG_{t} \right] \\ 
\end{align}
$$

The past rewards is not influenced by the random action at time $t$, which makes the expected derivative 0.

**2. Use value function as a baseline function**

$$
\begin{align}
\nabla_{\theta}U(\theta)
 & =\mathbb{E}\left[\sum_{t} \nabla_{\theta}\log \pi_{\theta}(a_{t}|s_{t})\gamma^t(G_{t}-V(s_{t})) \right]
\end{align}
$$

Using the value function as a baseline is a intuitive choice. It doesn't depend on actions, so it is still unbiased.
It updates the parameter to the direction of pushing up the likelihood of rewards higher than the average, and push down the likelihood of rewards lower than the average.
Typically in practice, we train a value function network.

**3. Utilize value function for the $Q$ estimate**

We can first substitute $G_t$ with a $Q$-value estimate without introducing bias.

$$
\begin{align}
\nabla_{\theta}U(\theta)
 & =\mathbb{E}\left[\sum_{t} \nabla_{\theta}\log \pi_{\theta}(a_{t}|s_{t})\gamma^t(\hat{Q}_{t}-V(s_{t})) \right]
\end{align}
$$

However, replacing a new network for Q-value will significantly increase variance and bias, especially in the initial training phase.
We can use TD for $Q$-value estimate, in order to lower the variance.
We can choose how much $k$ steps to look ahead, where there exist a tradeoff between variance and bias: the more steps we look ahead, the lower the bias but the higher the variance.

$$
\begin{align}
Q^\pi(s_{t}, a_{t})& = \mathbb{E}[r_{t}+\gamma V^\pi(s_{t+1})]  & &\approx \mathbb{E}[r_{t}+\gamma V_{\phi}(s_{t+1})]\\
 & = \mathbb{E}[r_{t}+\gamma r_{t+1}+\gamma^2V^\pi(s_{t+2})]   & &\approx \mathbb{E}[r_{t}+\gamma r_{t+1}+\gamma^2V_\phi(s_{t+2})] \\
 & = \cdots
\end{align}
$$

There is also an advanced technique called **GAE** (Generalized Advantage Estimation), which is geometrically summing up all the estimators instead of choosing $k$.

$$
\hat{A}^{GAE}_{t}=(1-\lambda)(\hat{A}^{TD_{1}}_{t}+\lambda\hat{A}^{TD_{2}}_{t}+\lambda^2\hat{A}^{TD_{3}}_{t}+\cdots)
$$

Adding these three techniques to the vanilla policy gradient method, it leads to **A2C/A3C** algorithm.

$$
\begin{align}
\nabla_{\theta}U(\theta)
 & =\mathbb{E}\left[\sum_{t} \nabla_{\theta}\log \pi_{\theta}(a_{t}|s_{t})\gamma^t(\hat{Q}-V_{\phi}(s_{t})) \right]
\end{align}
$$


---

**Reference**

R. Williams. "Simple statistical gradient-following algorithms for connectionist reinforcement learning," in Machine learning, vol. 8, pp. 229–256, 1992.

Sutton, R., et al. "Policy gradient methods for reinforcement learning with function approximation," in Advances in neural information processing systems, vol. 12, 1999.

Schulman, J., et al. "High-dimensional continuous control using generalized advantage estimation," in arXiv preprint arXiv:1506.02438, 2015.

Mnih, V., et al, "Asynchronous methods for deep reinforcement learning," in International conference on machine learning, 2016, pp. 1928–1937.