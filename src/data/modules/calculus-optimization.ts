import { Module } from '@/types';

export const calculusOptimizationModule: Module = {
  id: 'calculus-optimization',
  number: 13,
  title: 'Calculus, Optimization & Numerical Methods',
  subtitle: 'Multivariable Derivatives, Backpropagation Chain Rule, Loss Landscapes, Convexity, Modern Optimizers (AdamW), and Numerical Solvers',
  iconName: 'Activity',
  color: '#8b5cf6', // Violet
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 13.1 — DERIVATIVES & BACKPROPAGATION CHAIN RULE
    // ──────────────────────────────────────────────────────────
    {
      id: 'derivatives-differentiation-chain-rule',
      title: '13.1 Derivatives, Multivariable Chain Rule & Backpropagation',
      slug: 'derivatives-differentiation-chain-rule',
      badge: 'Calculus Core',
      estimatedMinutes: 25,
      overview: 'Deconstruct differentiation rules, partial derivatives, common mathematical derivatives in AI, and the exact computational graph chain rule driving deep neural network backpropagation.',
      prerequisites: ['12.5 Matrix Calculus', 'Basic Algebra'],
      learningGoals: [
        'Apply essential calculus rules (Product, Quotient, Chain Rule) to derive analytical loss gradients',
        'Derive analytical derivatives of common neural activation functions (Sigmoid, Softmax, GELU, ReLU)',
        'Trace the 3-term chain rule of backpropagation: $\\frac{\\partial \\mathcal{L}}{\\partial w} = \\frac{\\partial \\mathcal{L}}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}$',
        'Analyze computational graph topological sorting for automatic differentiation',
      ],
      analogy: {
        title: 'THE MECHANICAL GEAR TRAIN ANALOGY',
        explanation: 'Think of a deep neural network as a complex mechanical watch with 100 interlocking gears. The forward pass turns the first gear (input), rotating every subsequent gear until the clock hands point to a time (prediction). The **Chain Rule** is measuring how a tiny twitch of the 1st tiny gear ripples through the entire gear train to move the clock hands (multiplying gear ratios $\\frac{dy}{du} \\cdot \\frac{du}{dx}$). Backpropagation simply spins the gears in reverse to calculate the exact adjustment needed for each gear tooth.',
        steps: [
          { number: 1, badge: 'Forward Input', title: '1. Linear Activation $z$', subtitle: '$z = w^T x + b$ pre-activation score.', iconName: 'database' },
          { number: 2, badge: 'Non-Linearity', title: '2. Activation $a = \\sigma(z)$', subtitle: 'GELU, ReLU, or Sigmoid non-linear gate.', iconName: 'filter' },
          { number: 3, badge: 'Loss Output', title: '3. Loss Calculation $\\mathcal{L}$', subtitle: 'Cross-entropy or MSE comparison.', iconName: 'cog' },
          { number: 4, badge: 'Reverse Pass', title: '4. Chain Rule Gradient', subtitle: '$\\frac{\\partial \\mathcal{L}}{\\partial w} = \\delta \\cdot x^T$ accumulated in reverse.', iconName: 'cpu' },
        ],
        connectors: ['Input $x$', 'Activate $\\sigma$', 'Loss $\\mathcal{L}$', 'Backprop $\\nabla$'],
      },
      keyQuestions: [
        {
          question: 'Why do Sigmoid and Tanh activations cause the Vanishing Gradient Problem in deep networks?',
          answer: 'The derivative of the Sigmoid function is $\\sigma\'(x) = \\sigma(x)(1 - \\sigma(x))$, which has a maximum value of only $0.25$ at $x=0$ and rapidly approaches $0$ when $|x| > 4$. Multiplying these $<0.25$ derivatives across 20 layers in the chain rule ($0.25^{20} \\approx 10^{-12}$) causes the gradient to vanish to zero, freezing early layer weights.',
        },
        {
          question: 'What is the Log-Sum-Exp trick and why is it essential for Softmax numerical stability?',
          answer: 'Computing $\\sum e^{x_i}$ directly causes floating-point overflow for large $x_i$ (e.g. $e^{1000} = \\infty$). The Log-Sum-Exp identity factors out the maximum $c = \\max(x_i)$: $\\log\\sum e^{x_i} = c + \\log\\sum e^{x_i - c}$. Because $x_i - c \\le 0$, exponentials $e^{x_i - c} \\in (0, 1]$ never overflow.',
        },
      ],
      realWorldUses: [
        { industry: 'Reverse-Mode Automatic Differentiation in PyTorch', application: 'Builds dynamic directed acyclic graphs (DAGs) during the forward pass and executes reverse-mode chain rule accumulation in a single linear backward pass.' },
        { industry: 'Physics-Informed Neural Networks (PINNs)', application: 'Uses higher-order partial derivatives ($\\\\nabla^2 u$) inside the loss function to enforce Navier-Stokes and Schrödinger physical differential equations.' },
      ],
      sections: [
        {
          id: 'calculus-derivatives-master-table',
          title: 'Master Calculus Differentiation Rules & AI Derivatives',
          subtitle: 'The Exact Mathematical Formulas Powering Neural Network Activations',
          content: `### 1. Fundamental Differentiation Rules

| Rule | Formula | Concrete Example |
| :--- | :--- | :--- |
| **Constant Rule** | $\\frac{d}{dx}(c) = 0$ | $\\frac{d}{dx}(5) = 0$ |
| **Power Rule** | $\\frac{d}{dx}(x^n) = n x^{n-1}$ | $\\frac{d}{dx}(x^3) = 3 x^2$ |
| **Sum Rule** | $\\frac{d}{dx}(f + g) = f' + g'$ | $\\frac{d}{dx}(x^2 + 3x) = 2x + 3$ |
| **Product Rule** | $\\frac{d}{dx}(f g) = f' g + f g'$ | $\\frac{d}{dx}(x^2 e^x) = 2x e^x + x^2 e^x$ |
| **Quotient Rule** | $\\frac{d}{dx}\\left(\\frac{f}{g}\\right) = \\frac{f' g - f g'}{g^2}$ | $\\frac{d}{dx}\\left(\\frac{x}{e^x}\\right) = \\frac{e^x - x e^x}{e^{2x}} = \\frac{1-x}{e^x}$ |
| **Chain Rule** | $\\frac{d}{dx}(f(g(x))) = f'(g(x)) \\cdot g'(x)$ | $\\frac{d}{dx}(e^{x^2}) = e^{x^2} \\cdot 2x$ |

### 2. Common Functions & Neural Activation Derivatives

| Function $f(x)$ | Derivative $f'(x)$ | Role in Machine Learning |
| :--- | :--- | :--- |
| **Exponential $e^x$** | $e^x$ | Softmax numerator, Gaussian distributions |
| **Natural Log $\\ln(x)$** | $\\frac{1}{x}$ | Cross-entropy loss derivative $\\frac{d}{dp}(-\\log p) = -\\frac{1}{p}$ |
| **Sigmoid $\\sigma(x) = \\frac{1}{1 + e^{-x}}$** | $\\sigma(x)(1 - \\sigma(x))$ | Binary classification gates (Max derivative is $0.25$) |
| **ReLU $\\max(0, x)$** | $\\mathbb{I}(x > 0)$ | Standard deep learning non-linearity (Gradient is $1.0$ for $x > 0$) |
| **GELU $x \\cdot \\Phi(x)$** | $\\Phi(x) + x \\cdot \\phi(x)$ | Modern Transformer activation (GPT-4, LLaMA, BERT) |
| **Softmax $\\frac{e^{z_i}}{\\sum e^{z_j}}$** | $p_i (\\delta_{ij} - p_j)$ | Multi-class probability distribution routing |`,
          equations: [
            {
              latex: '\\frac{\\partial \\mathcal{L}}{\\partial w} = \\frac{\\partial \\mathcal{L}}{\\partial a} \\cdot \\frac{\\partial a}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w} = (\\hat{y} - y) \\cdot x^T',
              description: 'Universal 3-term backpropagation chain rule for a dense neural network layer.'
            },
            {
              latex: '\\log\\left(\\sum_{i=1}^n e^{x_i}\\right) = c + \\log\\left(\\sum_{i=1}^n e^{x_i - c}\\right) \\quad \\text{where } c = \\max_i(x_i)',
              description: 'Log-Sum-Exp numerical stability trick preventing exponential overflow.'
            }
          ],
          keyTakeaways: [
            'The Chain Rule is the mathematical backbone of backpropagation in deep neural networks.',
            'Sigmoid derivatives peak at $0.25$, causing vanishing gradients; ReLU has a derivative of $1.0$, preventing saturation.',
            'The Log-Sum-Exp identity prevents numerical floating-point overflow during Softmax and Cross-Entropy evaluation.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 13.2 — OPTIMIZATION LANDSCAPES & CONVEXITY
    // ──────────────────────────────────────────────────────────
    {
      id: 'convexity-critical-points-loss-landscapes',
      title: '13.2 Convexity, Critical Points & Loss Landscapes',
      slug: 'convexity-critical-points-loss-landscapes',
      badge: 'Convexity & Landscapes',
      estimatedMinutes: 25,
      overview: 'Analyze mathematical convexity definitions, critical points (local minima, maxima, saddle points), the Hessian eigenvalue test, and how skip connections smooth non-convex neural landscapes.',
      prerequisites: ['13.1 Derivatives & Chain Rule'],
      learningGoals: [
        'Formulate the mathematical definition of convex sets and convex functions',
        'Classify critical points using first derivative stationarity $\\nabla f = 0$ and Hessian eigenvalues',
        'Understand why deep neural networks suffer from high-dimensional saddle points rather than bad local minima',
        'Analyze how residual connections (ResNet) prevent loss landscape chaotic shatter',
      ],
      analogy: {
        title: 'THE GRAVITY BOWL VS CRAGGY MOUNTAIN PASS ANALOGY',
        explanation: 'A **Convex Function** is like a smooth parabolic marble bowl: no matter where you drop a marble, it rolls directly to the exact bottom center (unique global minimum). A **Non-Convex Neural Landscape** is like the Himalayas: thousands of ridges, valleys, and narrow mountain passes (**Saddle Points**). In 1,000 dimensions, true local minima are rare — almost all flat points are saddle points where the loss curves up in 950 directions and down in 50 directions, allowing momentum optimizers to slide through!',
        steps: [
          { number: 1, badge: 'Stationarity', title: '1. Find Critical Point', subtitle: 'Solve $\\nabla f(x) = 0$ for stationary coordinates.', iconName: 'database' },
          { number: 2, badge: 'Hessian Matrix', title: '2. Compute Hessian $H = \\nabla^2 f$', subtitle: 'Matrix of 2nd partial derivatives.', iconName: 'filter' },
          { number: 3, badge: 'Eigenvalue Check', title: '3. Test Eigenvalues $\\lambda_i$', subtitle: 'All $\\lambda > 0$: Min; mixed $\\lambda$: Saddle point.', iconName: 'cog' },
          { number: 4, badge: 'Landscape Smooth', title: '4. Apply Residual Highways', subtitle: 'Skip connections remove chaotic sharp cliffs.', iconName: 'rocket' },
        ],
        connectors: ['Stationary Point', 'Compute $H$', 'Test Eigenvalues', 'Smooth Landscape'],
      },
      keyQuestions: [
        {
          question: 'What is the formal mathematical definition of a Convex Function?',
          answer: 'A function $f: \\mathbb{R}^n \\to \\mathbb{R}$ is convex if for all $x, y$ in its domain and any $\\lambda \\in [0, 1]$: $f(\\lambda x + (1-\\lambda) y) \\le \\lambda f(x) + (1-\\lambda) f(y)$. Geometrically, the line segment connecting any two points on the graph always lies on or above the graph itself.',
        },
        {
          question: 'Why are Saddle Points more problematic than Local Minima in high-dimensional deep learning?',
          answer: 'In an $n$-dimensional loss surface ($n \\approx 10^8$), for a point to be a local minimum, all $n$ Hessian eigenvalues must be positive ($P(\\lambda_i > 0) = 0.5^n \\approx 0$). Thus, almost all critical points are saddle points with mixed positive and negative curvature. Standard gradient descent slows to a near-zero crawl on saddle plateaus without momentum.',
        },
      ],
      realWorldUses: [
        { industry: 'ResNet / DenseNet Residual Highway Design (Li et al., Visualizing Loss Landscapes)', application: 'Adding identity skip connections $x + f(x)$ transforms chaotic, non-convex fractured loss surfaces into smooth convex-like bowls, enabling training of 1000-layer networks.' },
        { industry: 'Portfolio Risk Optimization (Markowitz Mean-Variance)', application: 'Formulates financial asset allocation as a strictly convex quadratic program with guaranteed unique global risk-return minimum.' },
      ],
      sections: [
        {
          id: 'critical-points-convexity-table',
          title: 'Classification of Critical Points & Hessian Curvature',
          subtitle: 'The Mathematical Tests Determining Local Minima, Maxima, and Saddle Points',
          content: `### 1. Classification of Critical Points (Where $\\nabla f(x^*) = 0$)

| Critical Point Type | 1D Calculus Condition | Multivariable Hessian Eigenvalues Condition | Physical Optimization Meaning |
| :--- | :--- | :--- | :--- |
| **Local Minimum** | $f''(x^*) > 0$ (Concave up) | **Positive Definite**: All $\\lambda_i(H) > 0$ | Stable basin; gradient descent settles here safely |
| **Local Maximum** | $f''(x^*) < 0$ (Concave down) | **Negative Definite**: All $\\lambda_i(H) < 0$ | Peak of mountain; unstable equilibrium |
| **Saddle Point** | $f''(x^*) = 0$ | **Indefinite**: Mixed signs ($\exists \\lambda_i > 0, \\lambda_j < 0$) | Curves up in some directions, down in others; needs momentum |
| **Degenerate Valley** | $f''(x^*) = 0$ | **Singular**: At least one eigenvalue $\\lambda_i = 0$ | Flat loss ravine (flat minima generalize well in deep nets) |

### 2. Convex vs Non-Convex Optimization Properties

| Property | Convex Optimization (e.g. SVM, Logistic, Linear) | Non-Convex Optimization (e.g. Deep Neural Networks) |
| :--- | :--- | :--- |
| **Local vs Global Minima** | Every local minimum is the **unique global minimum** | Thousands of sub-optimal local minima and saddle points |
| **Initialization Sensitivity** | Zero sensitivity: any start point reaches the same $w^*$ | High sensitivity: requires careful initialization (He/Xavier) |
| **Optimization Guarantees** | Provable polynomial time convergence bounds | Empirical convergence heuristics (SGD, AdamW) |
| **Loss Surface Geometry** | Smooth bowl with positive curvature everywhere | High-dimensional non-convex manifold with saddle ridges |`,
          equations: [
            {
              latex: 'f(\\lambda x + (1-\\lambda) y) \\le \\lambda f(x) + (1-\\lambda) f(y) \\quad \\forall \\lambda \\in [0, 1]',
              description: 'Formal definition of a Convex Function.'
            },
            {
              latex: 'H(x) = \\nabla^2 f(x) \\succeq 0 \\iff v^T H(x) v \\ge 0 \\quad \\forall v \\in \\mathbb{R}^n',
              description: 'Positive semi-definite Hessian condition for global convexity.'
            }
          ],
          keyTakeaways: [
            'Convex functions guarantee that every local minimum is the unique global minimum.',
            'Saddle points have indefinite Hessians (mixed positive and negative eigenvalues) and dominate deep learning loss surfaces.',
            'Skip connections (ResNet) smooth non-convex loss surfaces, preventing gradient shattering.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 13.3 — GRADIENT DESCENT & MODERN OPTIMIZERS
    // ──────────────────────────────────────────────────────────
    {
      id: 'gradient-descent-adamw-optimizers',
      title: '13.3 Gradient Descent Variants, AdamW & Learning Rate Schedules',
      slug: 'gradient-descent-adamw-optimizers',
      badge: 'Modern Optimizers',
      estimatedMinutes: 30,
      overview: 'Deconstruct Batch GD, SGD, Momentum, RMSprop, Adam, AdamW decoupled weight decay, Muon orthogonalization, and modern Learning Rate Schedulers (Cosine with Warmup).',
      prerequisites: ['13.2 Optimization Landscapes'],
      learningGoals: [
        'Compare Batch GD, Stochastic GD (SGD), and Mini-Batch GD trade-offs',
        'Formulate Momentum acceleration and RMSprop adaptive learning rate scaling',
        'Derive Adam and explain why Loshchilov & Hutter introduced AdamW with decoupled weight decay',
        'Design Cosine Annealing with Warmup learning rate schedules for LLM pre-training',
      ],
      analogy: {
        title: 'THE HEAVY SLED DOWN A SNOWY RAVINE ANALOGY',
        explanation: 'Standard Gradient Descent is like a cautious hiker taking small steps in the steepest downhill direction — if the terrain is a narrow ravine, the hiker oscillates uselessly back and forth between the canyon walls. **Momentum** is like putting the hiker on a heavy steel sled: the momentum averages out the left-right oscillations and builds blazing forward speed down the true ravine floor. **RMSprop/Adam** gives individual rocket thrusters to each coordinate, boosting parameters with tiny gradients while damping wild oscillations.',
        steps: [
          { number: 1, badge: 'Gradient $g_t$', title: '1. Compute Mini-Batch Loss', subtitle: 'Stochastic gradient $g_t = \\nabla_w \\mathcal{L}_B$.', iconName: 'database' },
          { number: 2, badge: 'Momentum $m_t$', title: '2. Exponential Moving Average', subtitle: '$m_t = \\beta_1 m_{t-1} + (1-\\beta_1) g_t$ (Velocity).', iconName: 'filter' },
          { number: 3, badge: 'Variance $v_t$', title: '3. 2nd Moment Variance', subtitle: '$v_t = \\beta_2 v_{t-1} + (1-\\beta_2) g_t^2$ (Curvature).', iconName: 'cog' },
          { number: 4, badge: 'Decoupled Decay', title: '4. AdamW Parameter Update', subtitle: '$w_{t+1} = w_t - \\eta \\left( \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon} + \\lambda w_t \\right)$.', iconName: 'rocket' },
        ],
        connectors: ['Gradient $g_t$', 'Smooth $m_t$', 'Scale $v_t$', 'Decoupled Update'],
      },
      keyQuestions: [
        {
          question: 'Why does AdamW outperform standard Adam with L2 regularization in deep transformers?',
          answer: 'In standard Adam with L2 regularization, the weight decay gradient $\\lambda w$ is added directly into the moving average of gradients $g_t$. Consequently, weights with large historical gradients receive LESS weight decay because they are divided by $\\sqrt{v_t}$. AdamW **decouples** weight decay, subtracting $\\eta \\lambda w$ directly from the parameter, restoring proper scale-invariant regularization.',
        },
        {
          question: 'Why is Learning Rate Warmup necessary for Transformers?',
          answer: 'At step 0 with random weights, adaptive optimizers (Adam) have uncalibrated 2nd moment estimates ($v_t \\approx 0$), leading to erratic, massive initial parameter updates that destroy pre-trained layers or cause immediate divergence. Linear warmup slowly ramps the learning rate from $0$ to $\\eta_{max}$ over the first 2,000 steps, allowing $m_t$ and $v_t$ to stabilize.',
        },
      ],
      realWorldUses: [
        { industry: 'LLaMA 3, GPT-4 & DeepSeek-V3 Pre-Training', application: 'Uses AdamW with $\\beta_1 = 0.9, \\beta_2 = 0.95, \\epsilon = 10^{-8}$, coupled with Cosine Annealing and 2,000-step linear warmup across clusters of 16,000 H100 GPUs.' },
        { industry: 'Computer Vision SOTA (ConvNeXt & ViT)', application: 'Uses AdamW with high weight decay ($0.05$) to regularize vision transformers lacking CNN inductive bias.' },
      ],
      sections: [
        {
          id: 'optimizers-master-comparison-table',
          title: 'Master Optimizer Taxonomy & Update Formulations',
          subtitle: 'From Vanilla SGD to AdamW and Muon Matrix Orthogonalization',
          content: `### 1. Master Machine Learning Optimizers Reference Table

| Optimizer | Mathematical Update Rule | Primary Benefit | Best For |
| :--- | :--- | :--- | :--- |
| **SGD (Vanilla)** | $w_{t+1} = w_t - \\eta g_t$ | Minimal memory overhead ($O(1)$ state) | Convex baselines, theoretical proofs |
| **SGD + Momentum** | $v_t = \\beta v_{t-1} + g_t; \\quad w_{t+1} = w_t - \\eta v_t$ | Accelerates through flat plateaus and dampens oscillations | ResNets, ConvNets, competitive generalization |
| **AdaGrad** | $G_t = G_{t-1} + g_t^2; \\quad w_{t+1} = w_t - \\frac{\\eta}{\\sqrt{G_t} + \\epsilon} g_t$ | Automatically decays learning rate per coordinate | Sparse features, TF-IDF, text embeddings |
| **RMSprop** | $v_t = \\beta v_{t-1} + (1-\\beta) g_t^2; \\quad w_{t+1} = w_t - \\frac{\\eta}{\\sqrt{v_t} + \\epsilon} g_t$ | Exponential moving average fixes AdaGrad decaying LR | Non-stationary loss surfaces, RNNs |
| **Adam** | $m_t = \\beta_1 m_{t-1} + (1-\\beta_1) g_t; \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2) g_t^2$ | Combines 1st moment momentum + 2nd moment adaptive scaling | Robust out-of-the-box baseline across all deep learning |
| **AdamW (Decoupled)** | $w_{t+1} = w_t - \\eta \\left( \\frac{\\hat{m}_t}{\\sqrt{\\hat{v}_t} + \\epsilon} \\right) - \\eta \\lambda w_t$ | **Decouples weight decay** from adaptive gradient moments | **Modern Standard SOTA**: LLMs, Transformers, Diffusion |

### 2. Learning Rate Scheduling Strategies

| Strategy | Mathematical Behavior | When to Use |
| :--- | :--- | :--- |
| **Constant LR** | $\\eta_t = \\eta_0$ | Simple convex problems, short fine-tuning runs |
| **Step Decay** | $\\eta_t = \\eta_0 \\cdot \\gamma^{\\lfloor t / N \\rfloor}$ | Classic computer vision (drops by $10\\times$ every 30 epochs) |
| **Cosine Annealing** | $\\eta_t = \\eta_{min} + \\frac{1}{2}(\\eta_{max} - \\eta_{min})(1 + \\cos(\\pi t / T))$ | Smooth reduction guaranteeing superior asymptotic convergence |
| **Warmup + Cosine** | Linear ramp for $t < T_{warm}$, then Cosine decay | **Mandatory for Transformers & LLMs** to prevent early explosion |
| **ReduceOnPlateau** | Drops LR by factor when validation loss stops improving | Adaptive, hands-off heuristic for unknown convergence rates |`,
          comparisonGrid: {
            title: 'Optimizer Deep Comparison: SGD+Momentum vs Adam vs AdamW',
            columns: [
              {
                title: 'SGD + Momentum',
                subtitle: 'First-Order Heavy Ball',
                color: 'sky',
                badge: 'Generalization King',
                items: [
                  { label: 'Memory State', value: '1 vector per parameter ($v_t$)' },
                  { label: 'Tuning Difficulty', value: 'High (sensitive to learning rate schedule)' },
                  { label: 'Generalization', value: 'Often finds slightly flatter minima than Adam in CNNs', highlight: true },
                  { label: 'Compute Speed', value: 'Fastest per-step iteration time' },
                ],
                verdict: 'Best for classic Vision ResNets & ConvNets',
              },
              {
                title: 'Adam',
                subtitle: 'Adaptive Moments (Coupled)',
                color: 'amber',
                badge: 'Classic Adaptive',
                items: [
                  { label: 'Memory State', value: '2 vectors per parameter ($m_t, v_t$)' },
                  { label: 'Weight Decay Bug', value: 'Coupled L2 decay penalizes frequent features less', highlight: true },
                  { label: 'Robustness', value: 'Tolerant to initial learning rate choice' },
                  { label: 'Default Params', value: '$\\beta_1=0.9, \\beta_2=0.999, \\epsilon=10^{-8}$' },
                ],
                verdict: 'Superceded by AdamW for deep networks',
              },
              {
                title: 'AdamW',
                subtitle: 'Decoupled Weight Decay SOTA',
                color: 'violet',
                badge: 'Industry Standard',
                items: [
                  { label: 'Memory State', value: '2 vectors per parameter ($m_t, v_t$)' },
                  { label: 'Weight Decay Fix', value: 'Exact decoupled weight decay $\\eta \\lambda w_t$', highlight: true },
                  { label: 'Scale Invariance', value: 'Preserves true L2 regularization semantics' },
                  { label: 'Adoption', value: 'Used by 100% of modern LLMs (GPT-4, LLaMA, Claude)' },
                ],
                verdict: '✓ Mandatory default for Transformers & LLMs',
              },
            ],
          },
          equations: [
            {
              latex: 'w_{t+1} = w_t - \\eta \\cdot \\frac{\\frac{m_t}{1 - \\beta_1^t}}{\\sqrt{\\frac{v_t}{1 - \\beta_2^t}} + \\epsilon} - \\eta \\lambda w_t \\quad (\\text{AdamW Formula})',
              description: 'Complete AdamW update with bias correction and decoupled weight decay.'
            },
            {
              latex: '\\eta_t = \\begin{cases} \\frac{t}{T_{\\text{warm}}} \\eta_{\\text{max}} & \\text{if } t < T_{\\text{warm}} \\\\ \\eta_{\\text{min}} + \\frac{1}{2}(\\eta_{\\text{max}} - \\eta_{\\text{min}})\\left(1 + \\cos\\left(\\frac{\\pi(t - T_{\\text{warm}})}{T - T_{\\text{warm}}}\\right)\\right) & \\text{if } t \\ge T_{\\text{warm}} \\end{cases}',
              description: 'Cosine Annealing with Linear Warmup learning rate schedule.'
            }
          ],
          keyTakeaways: [
            'AdamW decouples weight decay from adaptive momentum gradients, fixing Adam regularization flaws.',
            'Linear learning rate warmup stabilizes uncalibrated 2nd moments during early Transformer training.',
            'Cosine Annealing smoothly reduces learning rate to near-zero, enabling clean convergence to deep minima.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 13.4 — CONSTRAINED OPTIMIZATION & LAGRANGE MULTIPLIERS
    // ──────────────────────────────────────────────────────────
    {
      id: 'constrained-optimization-lagrange-kkt',
      title: '13.4 Constrained Optimization, Lagrange Multipliers & KKT Conditions',
      slug: 'constrained-optimization-lagrange-kkt',
      badge: 'Constrained Optimization',
      estimatedMinutes: 25,
      overview: 'Master equality constraints (Lagrange Multipliers $\\nabla f = \\lambda \\nabla g$), inequality constraints (Karush-Kuhn-Tucker KKT conditions), primal-dual optimization, and SVM duality.',
      prerequisites: ['13.2 Optimization Landscapes'],
      learningGoals: [
        'Formulate the Lagrangian function $\\mathcal{L}(x, \\lambda) = f(x) - \\lambda g(x)$ for constrained optimization',
        'State and apply the 4 Karush-Kuhn-Tucker (KKT) conditions for inequality constraints',
        'Understand Primal vs Dual optimization and Strong Duality (Slater\'s condition)',
        'Connect Lagrange Multipliers to SVM margin maximization and PCA variance projection',
      ],
      analogy: {
        title: 'THE BALL ON A WALLED RAMP ANALOGY',
        explanation: 'Imagine rolling a bowling ball down a steep grassy hill (minimizing objective $f(x)$). If there are no obstacles, it rolls to the bottom of the valley (unconstrained minimum). But if there is a rigid fence (constraint $g(x) = 0$), the ball stops when the downward pull of gravity is exactly canceled out by the perpendicular push-back of the fence. The **Lagrange Multiplier** $\\lambda$ represents the exact physical contact force the fence exerts on the ball ($-\\nabla f = \\lambda \\nabla g$)!',
        steps: [
          { number: 1, badge: 'Objective $f(x)$', title: '1. Target to Minimize', subtitle: 'Loss function or error energy.', iconName: 'database' },
          { number: 2, badge: 'Constraint $g(x)$', title: '2. Boundary Constraint', subtitle: 'Equality $g(x)=0$ or inequality $g(x) \\le 0$.', iconName: 'filter' },
          { number: 3, badge: 'Lagrangian $\\mathcal{L}$', title: '3. Form $\\mathcal{L}(x, \\lambda, \\mu)$', subtitle: '$\\mathcal{L} = f(x) + \\sum \\lambda_i g_i(x) + \\sum \\mu_j h_j(x)$.', iconName: 'cog' },
          { number: 4, badge: 'KKT Stationarity', title: '4. Solve KKT Equations', subtitle: 'Stationarity, Primal/Dual feasibility, Complementary Slackness.', iconName: 'rocket' },
        ],
        connectors: ['Objective', 'Constraint', 'Lagrangian', 'Solve KKT'],
      },
      keyQuestions: [
        {
          question: 'What are the 4 Karush-Kuhn-Tucker (KKT) Conditions for constrained optimization?',
          answer: 'For $\\min f(x)$ s.t. $g_i(x) \\le 0, h_j(x) = 0$: 1) **Stationarity**: $\\nabla f(x^*) + \\sum \\alpha_i \\nabla g_i(x^*) + \\sum \\beta_j \\nabla h_j(x^*) = 0$; 2) **Primal Feasibility**: $g_i(x^*) \\le 0, h_j(x^*) = 0$; 3) **Dual Feasibility**: $\\alpha_i \\ge 0$; 4) **Complementary Slackness**: $\\alpha_i g_i(x^*) = 0$ (either constraint is active $g_i=0$ or multiplier $\\alpha_i=0$).',
        },
        {
          question: 'Where is Complementary Slackness used in Support Vector Machines (SVM)?',
          answer: 'In SVMs, complementary slackness $\\alpha_i (y_i(w^T x_i + b) - 1) = 0$ dictates that EITHER the sample is outside the margin ($y_i(w^T x_i + b) > 1 \\implies \\alpha_i = 0$, ignored by model) OR the sample lies directly on the margin ($y_i(w^T x_i + b) = 1 \\implies \\alpha_i > 0$, making it a **Support Vector**).',
        },
      ],
      realWorldUses: [
        { industry: 'Support Vector Machines (Dual Quadratic Program)', application: 'Solves the dual Lagrangian formulation $\\max_\\alpha \\sum \\alpha_i - \\frac{1}{2}\\sum \\alpha_i \\alpha_j y_i y_j K(x_i, x_j)$ to find maximal margin hyperplanes.' },
        { industry: 'Principal Component Analysis (PCA Rayleigh Quotient)', application: 'Maximizes projected variance $w^T \\Sigma w$ subject to unit norm constraint $\\|w\\|_2^2 = 1$ using Lagrange multiplier $\\lambda$, proving principal components are eigenvectors.' },
      ],
      sections: [
        {
          id: 'lagrange-kkt-conditions-deep',
          title: 'Lagrange Multipliers & The KKT Optimization Framework',
          subtitle: 'The Mathematical Bridge Between Geometry and Constrained Optimization',
          content: `### 1. Equality-Constrained Optimization (Lagrange Multipliers)
To minimize $f(x)$ subject to $g(x) = 0$, the gradient of the objective must be parallel to the gradient of the constraint boundary:
$$\\nabla f(x) = \\lambda \\nabla g(x) \\quad \\text{and} \\quad g(x) = 0$$

The **Lagrangian function** encapsulates this:
$$\\mathcal{L}(x, \\lambda) = f(x) - \\lambda g(x)$$
Setting $\\nabla_x \\mathcal{L} = 0$ and $\\nabla_\\lambda \\mathcal{L} = 0$ recovers the exact system of optimal equations.

### 2. The 4 Karush-Kuhn-Tucker (KKT) Conditions for Inequality Constraints
When constraints are inequalities ($g_i(x) \\le 0$), the optimal solution $(x^*, \\alpha^*)$ satisfies:

| KKT Condition | Mathematical Formulation | Physical Optimization Meaning |
| :--- | :--- | :--- |
| **1. Stationarity** | $\\nabla f(x^*) + \\sum_{i=1}^m \\alpha_i \\nabla g_i(x^*) = 0$ | Forces are balanced at the optimum point |
| **2. Primal Feasibility** | $g_i(x^*) \\le 0 \\quad \\forall i$ | Solution lies strictly within the valid allowed region |
| **3. Dual Feasibility** | $\\alpha_i \\ge 0 \\quad \\forall i$ | Constraint forces push inwards, not outwards |
| **4. Complementary Slackness** | $\\alpha_i \\cdot g_i(x^*) = 0 \\quad \\forall i$ | Multiplier is positive ONLY on the active boundary ($g_i=0$) |`,
          equations: [
            {
              latex: '\\mathcal{L}(w, b, \\alpha) = \\frac{1}{2}\\|w\\|_2^2 - \\sum_{i=1}^n \\alpha_i \\left[ y_i(w^T x_i + b) - 1 \\right]',
              description: 'Primal Lagrangian for Soft-Margin Support Vector Machines.'
            },
            {
              latex: '\\max_w w^T \\Sigma w - \\lambda(w^T w - 1) \\implies \\Sigma w = \\lambda w',
              description: 'Lagrangian derivation proving PCA principal components are eigenvectors of covariance matrix.'
            }
          ],
          keyTakeaways: [
            'Lagrange Multipliers transform constrained problems into unconstrained stationarity systems.',
            'KKT conditions generalize Lagrange Multipliers to inequality constraints ($g(x) \\le 0$).',
            'Complementary slackness ($\\\\alpha_i g_i(x) = 0$) explains why only Support Vectors define the SVM boundary.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 13.5 — NUMERICAL METHODS & LINEAR SOLVERS
    // ──────────────────────────────────────────────────────────
    {
      id: 'numerical-methods-root-finding-solvers',
      title: '13.5 Numerical Methods: Root Finding, Integration & Linear Solvers',
      slug: 'numerical-methods-root-finding-solvers',
      badge: 'Numerical Computing',
      estimatedMinutes: 25,
      overview: 'Deconstruct numerical root finding (Newton-Raphson, Bisection), Numerical Integration (Monte Carlo, Simpson\'s Rule), and Linear Solvers (Gaussian, Cholesky, Conjugate Gradients).',
      prerequisites: ['13.1 Derivatives', '12.2 Matrices'],
      learningGoals: [
        'Implement Newton-Raphson and Bisection methods for non-linear root finding',
        'Compare Trapezoidal, Simpson\'s, and Monte Carlo integration in high-dimensional spaces',
        'Analyze computational complexity of direct solvers ($O(n^3)$ Cholesky) vs iterative solvers ($O(n^2)$ Conjugate Gradient)',
        'Select the appropriate numerical solver for large sparse scientific computing systems',
      ],
      analogy: {
        title: 'THE DART-THROWING LAKE AREA ESTIMATOR',
        explanation: 'Imagine calculating the area of a wildly irregular lake on a square map. Analytical calculus is impossible because the shoreline has no clean mathematical formula. **Monte Carlo Integration** is like throwing 10,000 darts at random coordinates across the map and counting what fraction splash into water. The lake area is simply $\\text{Total Area} \\times \\frac{\\text{Water Hits}}{\\text{Total Throws}}$. As throws $N \\to \\infty$, the error shrinks by $O(1/\\sqrt{N})$, regardless of whether the lake is 2D or 1,000-dimensional!',
        steps: [
          { number: 1, badge: 'Numerical Problem', title: '1. Root / Integral / System', subtitle: 'Non-linear equation $f(x)=0$ or $Ax = b$.', iconName: 'database' },
          { number: 2, badge: 'Algorithm Choice', title: '2. Direct vs Iterative Solver', subtitle: 'Cholesky $O(n^3)$ vs Conjugate Gradient $O(n^2)$.', iconName: 'filter' },
          { number: 3, badge: 'Iteration', title: '3. Numerical Updates', subtitle: 'Quadratic Newton step or Monte Carlo sample.', iconName: 'cog' },
          { number: 4, badge: 'Tolerance', title: '4. Convergence Error $\\epsilon$', subtitle: 'Stop when $\\|x_{t+1} - x_t\\| < 10^{-7}$.', iconName: 'rocket' },
        ],
        connectors: ['Problem', 'Select Solver', 'Iterate', 'Verify Error $\\epsilon$'],
      },
      keyQuestions: [
        {
          question: 'Why is Monte Carlo Integration superior to grid rules (Simpson/Trapezoidal) in high dimensions?',
          answer: 'Grid-based methods (Trapezoidal/Simpson\'s) suffer from the Curse of Dimensionality: evaluating a 10-point grid in $d$ dimensions requires $10^d$ function evaluations ($10^{20}$ in 20D!). Monte Carlo error is strictly $O(1/\\sqrt{N})$, completely independent of dimension $d$, making it the only viable method for high-dimensional physics and Bayesian integrals.',
        },
        {
          question: 'When should I use Conjugate Gradient over Gaussian Elimination / Cholesky Decomposition?',
          answer: 'Use Cholesky ($O(n^3)$) for dense matrices of moderate size ($n < 5,000$). For large sparse systems ($n > 100,000$, such as graph Laplacians or finite element meshes), Cholesky takes terabytes of memory ("fill-in"). Conjugate Gradient solves $A x = b$ using only matrix-vector products in $O(n^2)$ time with $O(n)$ memory.',
        },
      ],
      realWorldUses: [
        { industry: 'Ray Tracing & Neural Radiance Fields (NeRFs)', application: 'Uses Monte Carlo integration to evaluate the rendering equation across billions of light ray sample paths in real time.' },
        { industry: 'Large-Scale Graph PageRank & Diffusion PDEs', application: 'Uses Conjugate Gradient and GMRES solvers to solve sparse linear systems with 100 million nodes.' },
      ],
      sections: [
        {
          id: 'numerical-methods-master-tables',
          title: 'Master Numerical Methods Reference Tables',
          subtitle: 'Root Finding, Integration, and Matrix System Solvers in Scientific AI',
          content: `### 1. Numerical Root-Finding Methods ($f(x) = 0$)

| Method | Mathematical Formula | Convergence Rate | Best For |
| :--- | :--- | :--- | :--- |
| **Bisection Method** | Interval halving: $c = \\frac{a+b}{2}$ | Linear ($1/2^k$, guaranteed) | When a bracket $[a, b]$ with $f(a)f(b) < 0$ is known |
| **Newton-Raphson** | $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$ | **Quadratic ($O(\\epsilon^2)$, blazing fast)** | When analytical derivative $f'(x)$ is easy to evaluate |
| **Secant Method** | Finite difference approx of $f'(x)$ | Superlinear ($O(\\epsilon^{1.618})$) | When derivatives are expensive or black-box |
| **Fixed-Point Iteration** | $x_{n+1} = g(x_n)$ where $f(x) = x - g(x)$ | Linear (if $|g'(x)| < 1$) | Iterative map formulations |

### 2. Numerical Integration Methods ($\\int_a^b f(x) dx$)

| Integration Method | Mathematical Formula | Error Order | Best For |
| :--- | :--- | :--- | :--- |
| **Rectangle Rule** | $\\sum_{i=1}^n f(x_i) \\Delta x$ | $O(\\Delta x)$ | Quick crude approximations |
| **Trapezoidal Rule** | $\\frac{\\Delta x}{2} [f(a) + 2\\sum f(x_i) + f(b)]$ | $O(\\Delta x^2)$ | Smooth continuous 1D functions |
| **Simpson\'s Rule** | $\\frac{\\Delta x}{3} [f(a) + 4\\sum f_{odd} + 2\\sum f_{even} + f(b)]$ | $O(\\Delta x^4)$ | High-precision 1D smooth curves |
| **Monte Carlo** | $\\frac{V}{N} \\sum_{i=1}^N f(x_i)$ ($x_i \\sim \\text{Uniform}$) | **$O(1/\\sqrt{N})$ (Dimension Independent)** | **High-dimensional integrals ($d > 4$), Bayesian posteriors, Ray tracing** |

### 3. Solving Linear Systems ($A x = b$)

| Method | Complexity | Matrix Assumptions | Best For |
| :--- | :--- | :--- | :--- |
| **Gaussian Elimination** | $O(n^3)$ | Any non-singular matrix | Small dense systems ($n < 1,000$) |
| **LU Decomposition** | $O(n^3)$ setup, $O(n^2)$ solve | Any square invertible | Multiple right-hand sides $b_1, b_2, \\dots$ |
| **Cholesky Decomposition** | $O(n^3 / 3)$ ($2\\times$ faster than LU) | **Symmetric Positive Definite ($A = L L^T$)** | Gaussian Processes, Kalman Filters, OLS normal eq |
| **Conjugate Gradient (CG)** | $O(n \\cdot \\text{nnz}(A))$ per iteration | **Large Sparse Symmetric Positive Definite** | **Massive sparse systems ($n > 10^6$), PDE solvers, Graph Laplacians** |
| **Gauss-Seidel / Jacobi** | $O(n^2)$ per iteration | Diagonally dominant | Iterative relaxation solvers |`,
          equations: [
            {
              latex: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)} \\quad (\\text{Newton-Raphson Root Finding})',
              description: 'Newton-Raphson iteration with quadratic local convergence rate.'
            },
            {
              latex: 'A = L L^T, \\quad L_{jj} = \\sqrt{A_{jj} - \\sum_{k=1}^{j-1} L_{jk}^2} \\quad (\\text{Cholesky Decomposition})',
              description: 'Cholesky factorization for symmetric positive definite matrices.'
            }
          ],
          keyTakeaways: [
            'Newton-Raphson converges quadratically ($O(\\epsilon^2)$) to roots near the true solution.',
            'Monte Carlo integration error is $O(1/\\sqrt{N})$, bypassing the Curse of Dimensionality in high dimensions.',
            'Cholesky decomposition ($A = L L^T$) is the gold standard for symmetric positive definite systems, running $2\\times$ faster than LU.',
          ],
        },
      ],
    },
  ],
};
