---
layout: post
title: "What is Entropy Rate?"
date: 2025-03-18
categories: infotheory
permalink: /infotheory/entropy-rate/
author: "Joonkyu Min"
---


**Entropy rate** is defined in a random process, a sequence or set of random variables.

$$
\begin{align}
H(\chi) & =\lim_{ n \to \infty } \frac{1}{n} H(X_{1},\dots,X_{n}) \\
H(\chi) & =\lim_{ n \to \infty } H(X_{n}|X_{1},\dots,X_{n-1})
\end{align}
$$

How do we know the conditional entropy **converges**?
If the random process is **stationary process**, it is known that both definition converges.
**Stationary process** is a random process that the joint distribution doesn't change.

$$
\begin{align}
P(X_{1},\dots X_{k})=P(X_{n+1},\dots X_{n+k})
\end{align}
$$

For a **stationary process**, 
$H(X_{n}|X^{n-1}_{1})$ is a decreasing sequence, which has a lower bound 0.

$$
\begin{align}
H(X_{n}|X^{n-1}_{1}) & \leq H(X_{n}|X_{2}^{n-1}) \\
 & =H(X_{n-1}|X_{1}^{n-2})
\end{align}
$$

Therefore, it converges.

A useful random process is a case of **stationary Markov process**, which is a Markov process with transition probability is fixed. 
The transition matrix can be defined as $M=[P(x_{t+1}=i|x_{t}=j)]$.

Since it is stationary process, random variable $X_{i}$ have a stationary distribution $\mu$, which satisfies $\mu=\mu M$.

Entropy rate of stationary Markov process can be computed by

$$
\begin{align}
H(X) & =\lim_{ n \to \infty }H(X_{n}|X_{1}^{n-1}) \\
 & =\lim_{ n \to \infty } H(X_{n}|X_{n-1})=H(X_{2}|X_{1}) \\
 & =\sum_{i}\mu_{i}\left( \sum_{j}-P_{ij}\log P_{ij} \right)
\end{align}
$$

Using this result, we can somehow prove the **second law of thermodynamics**, 

"Entropy of a closed physical system always increases".

Physical systems governed by **Newtonian dynamics** can be modeled as Markov chain because the future state of the system is fully determined by its current state.
This can be extended to stochastic settings such as **Langevin dynamics**, so the Markov process setting is universal.

Assume a special case where there exist a stationary distribution, and it is uniform.
This assumption is natural when the system is ideally isolated and symmetric, so the Markovian chain is symmetric. Then, the transition matrix doubly stochastic, which leads to the stationary distribution to be uniform.

First, relative entropy of two Markov distributions with same transition probability decreases.

$$
\begin{align}
 & D(p(x_{n},x_{n+1})\parallel q(x_{n},x_{n+1}))  \\ \\
 & =D(p(x_{n})\parallel q(x_{n}))+D(p(x_{n+1}|x_{n})\parallel q(x_{n+1}|x_{n}))  \\
& = D(p(x_{n})\parallel q(x_{n}))  (\because p(x_{n+1}|x_{n})=q(x_{n+1}|x_{n})) \\ \\
& =D(p(x_{n+1})\parallel q(x_{n+1}))+D(p(x_{n}|x_{n+1})\parallel q(x_{n}|x_{n+1})) \\
 & \geq D(p(x_{n+1})\parallel q(x_{n+1}))  (\because D_{KL}\geq 0)
\end{align}
$$

Therefore, by setting $q=\mu$ be a uniform stationary distribution, 
$D(\mu_{n}\parallel \mu)\geq D(\mu_{n+1}\parallel \mu)$.

Since $\mu$ is uniform, 
$D(\mu_{n}\parallel \mu)=\log|\chi|-H(\mu_{n})$ is a decreasing sequence, 
so $H(\mu_{n})$ is an increasing sequence.

---
**Reference**

T. Cover, Elements of information theory. John Wiley & Sons, 2006.
