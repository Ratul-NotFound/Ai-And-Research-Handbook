import { Module } from '@/types';

export const calculusOptimizationModule: Module = {
  id: 'calculus-optimization',
  number: 13,
  title: 'Calculus & Optimization Dynamics',
  subtitle: 'Multivariate Gradients, Automatic Differentiation (VJPs/JVPs), and Non-Convex Saddle Point Dynamics',
  iconName: 'Cpu',
  color: '#8b5cf6', // Violet
  chapters: [
    {
      id: 'autodiff-computational-graphs',
      title: '13.1 Multivariate Calculus & Reverse-Mode AutoDiff (VJPs)',
      slug: 'autodiff-computational-graphs',
      badge: 'AutoDiff Math',
      estimatedMinutes: 25,
      overview: 'Deconstruct scalar-to-vector and vector-to-vector derivatives, Jacobians, Hessians, Vector-Jacobian Products (VJPs), and the PyTorch computational graph.',
      prerequisites: ['Single-Variable Calculus', 'Matrix Multiplication'],
      sections: [
        {
          id: 'vjp-backprop-mechanics',
          title: 'Jacobians & Vector-Jacobian Products (VJPs)',
          subtitle: 'Why Backpropagation is Computationally Superior to Forward Difference',
          content: `For a vector-valued function $f: \\mathbb{R}^n \\to \\mathbb{R}^m$, the Jacobian matrix $J \\in \\mathbb{R}^{m \\times n}$ holds all first-order partial derivatives:
$$J_{ij} = \\frac{\\partial f_i}{\\partial x_j}$$

In machine learning, our loss function $\\mathcal{L}(f(x; \\theta)) \\in \\mathbb{R}^1$ is a scalar, but we have millions of parameters $\\theta \\in \\mathbb{R}^p$.

- **Forward-Mode Differentiation**: Computes Jacobian-Vector Products (JVPs) $J \\cdot v$. Requires $O(p)$ forward passes for $p$ parameters. Completely infeasible when $p > 10^9$.
- **Reverse-Mode Differentiation (Backpropagation)**: Computes Vector-Jacobian Products (VJPs) $v^T \\cdot J$. Computes all $p$ parameter gradients $\\nabla_\\theta \\mathcal{L}$ in a **single reverse sweep** ($O(1)$ passes relative to forward evaluation)!`,
          equations: [
            {
              latex: '\\frac{\\partial \\mathcal{L}}{\\partial x} = \\left( \\frac{\\partial y}{\\partial x} \\right)^T \\frac{\\partial \\mathcal{L}}{\\partial y} = J^T \\cdot \\nabla_y \\mathcal{L}',
              description: 'Vector-Jacobian Product (VJP) in reverse-mode automatic differentiation.'
            },
            {
              latex: '\\mathcal{H}_{ij} = \\frac{\\partial^2 \\mathcal{L}}{\\partial \\theta_i \\partial \\theta_j}',
              description: 'Hessian matrix of second-order curvatures.'
            }
          ],
          tradeoffs: [
            {
              feature: 'Differentiation Mode',
              currentApproach: 'Reverse-Mode AutoDiff (VJP)',
              alternativeApproach: 'Forward-Mode AutoDiff (JVP)',
              whyThis: 'Evaluates gradients for scalar loss functions with millions of parameters in 1 reverse pass.',
              whyNotOther: 'Forward mode requires 1 pass per input parameter dimension.',
              whenToUse: 'Neural network training, loss minimization.'
            }
          ],
          codeExamples: [
            {
              title: 'Manual VJP vs PyTorch autograd.grad',
              language: 'python',
              code: `import torch

# Define inputs
x = torch.tensor([2.0, -3.0], requires_grad=True)

# Forward function: y = [x1^2 * x2, sin(x1) + x2^3]
y1 = (x[0] ** 2) * x[1]
y2 = torch.sin(x[0]) + (x[1] ** 3)
y = torch.stack([y1, y2])

# Incoming gradient vector v from subsequent layers
v = torch.tensor([1.0, 1.0])

# Compute Vector-Jacobian Product (VJP)
vjp = torch.autograd.grad(outputs=y, inputs=x, grad_outputs=v)
print(f"Computed VJP gradient: {vjp[0].tolist()}")`,
              explanation: 'Illustrates how PyTorch autograd evaluates Vector-Jacobian Products using incoming gradient vectors.'
            }
          ],
          keyTakeaways: [
            'Reverse-mode automatic differentiation computes gradients with respect to all parameters in $O(1)$ backward pass.',
            'Vector-Jacobian Products (VJPs) avoid materializing full $m \\times n$ Jacobian matrices in GPU memory.',
            'Condition numbers of the Hessian dictate the steepness of ravines and saddle points in loss landscapes.'
          ]
        }
      ]
    },
    {
      id: 'convex-nonconvex-optimization',
      title: '13.2 Convex vs Non-Convex Optimization & Saddle Point Dynamics',
      slug: 'convex-nonconvex-optimization',
      badge: 'Loss Landscapes',
      estimatedMinutes: 25,
      overview: 'Understand convexity, Lipschitz smoothness, Hessian condition numbers, why local minima are rarely the bottleneck in deep learning, and how saddle points are escaped.',
      prerequisites: ['Multivariate Calculus', 'Hessian Matrix'],
      sections: [
        {
          id: 'loss-surfaces-saddle-points',
          title: 'High-Dimensional Loss Landscapes & Saddle Points',
          subtitle: 'Why Saddle Points Dominate High Dimensions While Local Minima Are Benign',
          content: `In low dimensions ($d=2$), local minima appear frequently. However, in high dimensions ($d > 10^6$), Dauphin et al. (2014) showed that critical points with zero gradient $\\nabla \\mathcal{L} = 0$ are overwhelmingly **saddle points**, not local minima.

For a point to be a strict local minimum, **all $d$ eigenvalues of the Hessian $\\mathcal{H}$ must be strictly positive**:
$$P(\\text{Local Min}) \\approx \\left( \\frac{1}{2} \\right)^d \\to 0 \\quad \\text{as } d \\to \\infty$$

Instead, most critical points have negative eigenvalues (escape directions). Standard SGD with stochastic noise and momentum naturally escapes saddle points along negative curvature directions!`,
          equations: [
            {
              latex: '\\kappa = \\frac{\\lambda_{\\max}(\\mathcal{H})}{\\lambda_{\\min}(\\mathcal{H})} \\quad (\\text{Condition Number})',
              description: 'Condition number indicating ravine ill-conditioning and oscillation tendency.'
            },
            {
              latex: '\\mathcal{L}(y) \\le \\mathcal{L}(x) + \\nabla \\mathcal{L}(x)^T (y - x) + \\frac{L}{2} \\|y - x\\|^2',
              description: 'L-Lipschitz Smoothness Upper Bound.'
            }
          ],
          keyTakeaways: [
            'In high-dimensional parameter spaces, critical points are almost always saddle points, not poor local minima.',
            'Stochastic gradient noise breaks symmetry and allows optimizers to escape saddle plateaus.',
            'High condition number kappa >> 1 causes standard gradient descent to oscillate wildly across ravine walls.'
          ]
        }
      ]
    }
  ]
};
