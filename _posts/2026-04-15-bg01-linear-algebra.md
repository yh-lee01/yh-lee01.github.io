---
layout: post
title: "1. Linear Algebra Essentials"
date: 2026-04-15
categories: background
permalink: /background/01-linear-algebra/
author: "Yohan Lee"
---

Linear algebra is the language of data. Every dataset is a matrix, every feature is a vector, and every model transformation is a linear map.

## Vectors and Inner Products

A vector $\mathbf{x} \in \mathbb{R}^n$ represents a point or direction in $n$-dimensional space. The inner product measures similarity:

$$
\langle \mathbf{x}, \mathbf{y} \rangle = \mathbf{x}^\top \mathbf{y} = \sum_{i=1}^n x_i y_i
$$

The $\ell_2$ **norm** $\|\mathbf{x}\| = \sqrt{\mathbf{x}^\top \mathbf{x}}$ measures magnitude. Two vectors are **orthogonal** if $\langle \mathbf{x}, \mathbf{y} \rangle = 0$.

## Matrices as Linear Maps

A matrix $A \in \mathbb{R}^{m \times n}$ defines a linear transformation $f(\mathbf{x}) = A\mathbf{x}$. Key properties:
- **Rank**: $\text{rank}(A)$ = dimension of the column space = number of linearly independent columns
- **Determinant**: $\det(A) \neq 0 \Leftrightarrow A$ is invertible (for square matrices)
- **Trace**: $\text{tr}(A) = \sum_i A_{ii}$, invariant under cyclic permutations: $\text{tr}(ABC) = \text{tr}(CAB)$

## Eigendecomposition

For a square matrix $A$, an **eigenvector** $\mathbf{v}$ satisfies $A\mathbf{v} = \lambda \mathbf{v}$, where $\lambda$ is the corresponding **eigenvalue**.

If $A$ is symmetric ($A = A^\top$), it admits a spectral decomposition:

$$
A = Q \Lambda Q^\top
$$

where $Q$ is orthogonal ($Q^\top Q = I$) and $\Lambda = \text{diag}(\lambda_1, \dots, \lambda_n)$.

This is the foundation of **PCA**: projecting data onto the top eigenvectors of the covariance matrix.

## Singular Value Decomposition (SVD)

Any matrix $A \in \mathbb{R}^{m \times n}$ can be decomposed as:

$$
A = U \Sigma V^\top
$$

where $U \in \mathbb{R}^{m \times m}$, $V \in \mathbb{R}^{n \times n}$ are orthogonal, and $\Sigma$ contains the **singular values** $\sigma_1 \geq \sigma_2 \geq \cdots \geq 0$.

SVD provides the **best rank-$k$ approximation** (Eckart–Young theorem):

$$
A_k = \sum_{i=1}^k \sigma_i \mathbf{u}_i \mathbf{v}_i^\top = \arg\min_{\text{rank}(B)=k} \|A - B\|_F
$$

## Positive Definite Matrices

A symmetric matrix $A$ is **positive definite** ($A \succ 0$) if $\mathbf{x}^\top A \mathbf{x} > 0$ for all $\mathbf{x} \neq 0$, equivalently, all eigenvalues are positive.

Positive definiteness ensures:
- **Convexity** of $f(\mathbf{x}) = \mathbf{x}^\top A \mathbf{x}$ — critical for optimization
- **Unique solutions** to $A\mathbf{x} = \mathbf{b}$
- A valid **covariance matrix** in probability

---
**Reference**

G. Strang, *Introduction to Linear Algebra*, 6th ed. Wellesley-Cambridge Press, 2023.
