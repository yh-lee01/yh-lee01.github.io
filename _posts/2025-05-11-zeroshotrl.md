---
layout: post
title: "What is Zero shot RL?"
date: 2025-05-11
categories: RL
permalink: /RL/zeroshotrl/
author: "Joonkyu Min"
---

To develop a truly generalized reinforcement learning agent, it must be capable of generating useful policies for arbitrary rewards without training specified agent for each tasks.
Zero-shot reinforcement learning problem address this challenge by training agents without access to explicit reward signals, and producing sub-optimal policies on new rewards at test time.

Recent advancement on zero-shot RL build on successor representations, which model the expected future state occupancy under a given policy.

Successor features(SF) based methods generalizes successor representations by expressing rewards as linear combinations of predefined features, allowing the Q-function to be decomposed as a linear span of successor features.

$$
\begin{align}
r(s,a,s') & = \phi(s,a,s')^Tw \\
Q^\pi(s,a) & = \psi^\pi(s,a)^Tw
\end{align}
$$

By learning the decoupled dynamics of the environment from reward, SF allows to transfer agents across tasks.
However, SF has a fundamental issue that optimality is only guaranteed for the rewards that lie within the linear span of the basic features.

Forward-Backward (FB) representation solves this issue by employing continuous functions to model the successor measures.

$$
\begin{equation}
\begin{split}
M^\pi_z(s_0, a_0, s) &= \sum_{t\ge0} \gamma^t \Pr(s_{t+1} = s \mid s_0, a_0, \pi),
\end{split}
\end{equation}
$$

FB representation approximate successor measure in finite-dimensional space by using two parametric functions: forward mapping $F_{z}^T: S\times A\to \mathbb{R}^d$, 
and backward mapping $B: \mathbb{R}^d\to S$, represented as 

$$
\begin{equation}
\begin{split}
M^\pi_z(s_0, a_0, s')=F(s_0,a_0,z)^TB(s')\rho(ds'),\\
\end{split}
\end{equation}
$$

where $\rho$ is the data distribution, in offline setting.

For any reward function $R$, 
we can estimate the latent vector of reward by $z_R =\mathbb{E}_\rho[R(s)B(s)]$, using small amount of samples of given data.

Theoretically, the optimal Q-function and optimal policy of the reward parameterized by $z_R$ can be derived by 

$$
\begin{equation}
    \begin{split}
        Q_R^* &= F(s,a,z_R)^Tz_R, \\
        \pi_{R}^*(s)&=\arg\max_a  F(s,a,z_R)^Tz_R.
    \end{split}
\end{equation}
$$

Training the forward, backward parametric functions are done by TD learning using the following loss,

$$
\begin{equation}
\begin{split}
L_{\text{FB}} & = \mathbb{E}_{\rho, z}\left[ \left( F(s_t, a_t, z)^\top B(s') - \gamma \, \bar{F}(s_{t+1}, \pi_z(s_{t+1}), z)^\top \bar{B}(s') \right)^2 \right] \\
&- 2 \mathbb{E}_{\rho, z}\left[ F(s_t, a_t, z)^\top B(s_{t+1}) \right],
\end{split}
\end{equation}
$$

where the $\bar{F}, \bar{B}$ is the target network, and $\pi_z$ is the $z$-parameterized deterministic actor that is jointly trained just like DDPG.

Also, introducing an additional conservative learning term into this framework enhances the offline RL performance.

$$
\begin{equation}
\begin{split}
    L_{\text{MC}} = 
&\mathbb{E}_{\substack{s,s'\sim\rho\\ a \sim \mu(\cdot|s)}}
\left[ F(s, a, z)^\top B(s') \right] 
- \mathbb{E}_{\substack{(s,a),s'\sim\rho}}
\left[ F(s, a, z)^\top B(s') \right] - H(\mu),
\end{split}
\end{equation}
$$

where $\mu$ is the distribution of policy at each state, 
and $H(\mu)$ is approximated by log-sum exponential of $Q_z$.


---
**Reference**

A. Touati, J. Rapin, and Y. Ollivier, “Does zero-shot reinforcement learning exist?,” arXiv preprint arXiv:2209.14935, 2022.

P. Dayan, “Improving generalization for temporal difference learning: The successor representation,” Neural computation, vol. 5, no. 4,
pp. 613–624, 1993.

A. Barreto, W. Dabney, R. Munos, J. J. Hunt, T. Schaul, H. P . van Hasselt, and D. Silver, “Successor features for transfer in reinforcement learning,” Advances in neural information processing systems, vol. 30, 2017.

A. Touati and Y. Ollivier, “Learning one representation to optimize all rewards,” Advances in Neural Information Processing Systems, vol. 34, pp. 13–23, 2021.

S. Jeen, T. Bewley, and J. Cullen, “Zero-shot reinforcement learning from low quality data,” Advances in Neural Information Processing Systems, vol. 37, pp. 16894–16942, 2024.