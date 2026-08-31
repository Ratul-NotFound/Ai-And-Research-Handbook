import { Module } from '@/types';

export const classicalMlModule: Module = {
  id: 'classical-ml',
  number: 7,
  title: 'Classical Machine Learning',
  subtitle: 'Convex Optimization, Regularization Duality, Kernel Methods, Tree Ensembles (XGBoost/LightGBM) & Dimensionality Reduction',
  iconName: 'Boxes',
  color: '#059669', // Emerald
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 7.1 — LINEAR & LOGISTIC REGRESSION & CONVEXITY
    // ──────────────────────────────────────────────────────────
    {
      id: 'supervised-linear-logistic-regression',
      title: '7.1 Linear & Logistic Regression, Loss Surfaces & Convexity',
      slug: 'supervised-linear-logistic-regression',
      badge: 'Convex Models',
      estimatedMinutes: 25,
      overview: 'Deconstruct Ordinary Least Squares (OLS), the Normal Equation, Logistic Regression likelihood derivations, Decision Boundaries, and strict convexity guarantees.',
      prerequisites: ['Linear Algebra', 'Multivariate Calculus'],
      learningGoals: [
        'Derive the Ordinary Least Squares (OLS) closed-form Normal Equation $(X^T X)^{-1} X^T y$',
        'Understand why Logistic Regression has no closed-form solution and requires iterative gradient ascent/descent',
        'Prove the strict convexity of Binary Cross-Entropy loss guaranteeing unique global optima',
        'Interpret logistic regression odds ratios and regression coefficients in production settings',
      ],
      analogy: {
        title: 'THE CALIBRATED DIAL ANALOGY',
        explanation: 'Linear and Logistic Regression are like calibrating a mechanical balance scale. You place known weights (feature inputs) on one side and measure the tilt (prediction error). In Linear Regression, a single mathematical lever adjustment (closed-form Normal Equation) balances the scale instantly. In Logistic Regression, the lever has a non-linear spring (Sigmoid function) — you turn the dial click-by-click down the slope (Gradient Descent) until it settles at the lowest energy state (global minimum).',
        steps: [
          { number: 1, badge: 'Input Features', title: '1. Feature Vector (x)', subtitle: 'Raw numerical inputs with bias term $x_0=1$.', iconName: 'database' },
          { number: 2, badge: 'Linear Weighting', title: '2. Inner Product ($w^T x$)', subtitle: 'Linear combination score $z = \\sum w_j x_j + b$.', iconName: 'cog' },
          { number: 3, badge: 'Activation', title: '3. Sigmoid Transform', subtitle: 'Squashes score into probability $P \\in (0, 1)$.', iconName: 'filter' },
          { number: 4, badge: 'Error Gradient', title: '4. Binary Cross-Entropy', subtitle: 'Measures negative log-likelihood surprise.', iconName: 'cpu' },
          { number: 5, badge: 'Global Optimum', title: '5. Convex Convergence ($w^*$)', subtitle: 'Global minimum guaranteed by Hessian $H \\succ 0$.', iconName: 'rocket' },
        ],
        connectors: ['Inner Product', 'Sigmoid Gate', 'BCE Loss', 'Hessian Step'],
      },
      keyQuestions: [
        {
          question: 'Why does Linear Regression have a closed-form solution while Logistic Regression does not?',
          answer: 'Linear regression loss (Mean Squared Error) is quadratic in parameters $w$, yielding a linear derivative $\\nabla_w \\mathcal{L} = X^T(Xw - y) = 0$, which can be inverted directly: $w^* = (X^T X)^{-1} X^T y$. Logistic regression applies the non-linear transcendental sigmoid function $\\sigma(w^T x)$, resulting in a transcendental gradient equation with no closed-form analytical inverse.',
        },
        {
          question: 'Is Logistic Regression guaranteed to avoid bad local minima?',
          answer: 'Yes! The Hessian matrix of Binary Cross-Entropy loss is $H = X^T D X$, where $D$ is a diagonal matrix with positive entries $p_i (1 - p_i) > 0$. Since $H$ is strictly positive semi-definite (and strictly positive definite if $X$ has full column rank), the loss surface is strictly convex everywhere with exactly one global minimum.',
        },
      ],
      realWorldUses: [
        { industry: 'Credit Risk Underwriting (FICO / Experian)', application: 'Uses Logistic Regression to compute probability of credit default with exact log-odds interpretable risk factors compliant with financial lending laws.' },
        { industry: 'Clinical Survival & Epidemiology (Framingham Risk)', application: 'Predicts 10-year cardiovascular disease risk from blood pressure, cholesterol, and smoking habits.' },
      ],
      sections: [
        {
          id: 'ols-normal-equation-logistic',
          title: 'From OLS Normal Equation to Logistic Sigmoid Likelihood',
          subtitle: 'Why Linear Regression Has a Closed-Form Solution While Logistic Regression Requires Gradient Descent',
          content: `In **Ordinary Least Squares (OLS) Linear Regression**, we model $y = X w + \\epsilon$. The Mean Squared Error loss is:
$$\\mathcal{L}(w) = \\frac{1}{2n} \\|y - X w\\|_2^2 = \\frac{1}{2n} (y - X w)^T (y - X w)$$

Setting the gradient $\\nabla_w \\mathcal{L} = 0$ yields the celebrated **Normal Equation**:
$$X^T X w = X^T y \\implies w^* = (X^T X)^{-1} X^T y$$

### Why Logistic Regression Has No Closed-Form Solution
In **Logistic Regression**, we apply the logistic sigmoid function $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ to model class probability $P(y=1|x) = \\sigma(w^T x)$.

The Negative Log-Likelihood (Binary Cross-Entropy) is:
$$\\mathcal{L}(w) = -\\sum_{i=1}^n \\left[ y_i \\log \\sigma(w^T x_i) + (1 - y_i) \\log(1 - \\sigma(w^T x_i)) \\right]$$

Because $\\sigma(w^T x)$ introduces a transcendental non-linear function, setting $\\nabla_w \\mathcal{L} = 0$ has **no closed-form analytical inverse**. However, the loss function is **strictly convex**, guaranteeing that Gradient Descent or Newton-Raphson (Iteratively Reweighted Least Squares) converges to the globally optimal parameter vector $w^*$!`,
          comparisonGrid: {
            title: 'Linear Regression vs Logistic Regression',
            columns: [
              {
                title: 'Linear Regression (OLS)',
                subtitle: 'Continuous Prediction',
                color: 'sky',
                badge: 'Closed-Form Solution',
                items: [
                  { label: 'Target Variable', value: 'Continuous real numbers $y \\in \\mathbb{R}$' },
                  { label: 'Loss Function', value: 'Mean Squared Error $\\frac{1}{2n}\\|y - Xw\\|^2$' },
                  { label: 'Optimization', value: 'Normal Equation $(X^T X)^{-1} X^T y$ in $O(d^3)$', highlight: true },
                  { label: 'Assumptions', value: 'Linearity, homoscedasticity, no multicollinearity' },
                ],
                verdict: '✓ Best for continuous scalar regression',
              },
              {
                title: 'Logistic Regression',
                subtitle: 'Probabilistic Classification',
                color: 'emerald',
                badge: 'Iterative Convex',
                items: [
                  { label: 'Target Variable', value: 'Discrete binary labels $y \\in \\{0, 1\\}$' },
                  { label: 'Loss Function', value: 'Binary Cross-Entropy (Negative Log-Likelihood)' },
                  { label: 'Optimization', value: 'Gradient Descent / L-BFGS / IRLS (No closed form)', highlight: true },
                  { label: 'Assumptions', value: 'Linear log-odds relationship $\\log(p / (1-p)) = w^T x$' },
                ],
                verdict: '✓ Standard baseline for binary classification',
              },
            ],
          },
          workflow: {
            title: 'Iterative Optimization Pipeline for Logistic Regression (IRLS / L-BFGS)',
            description: 'The step-by-step numerical optimization sequence settling on the global minimum.',
            direction: 'horizontal',
            nodes: [
              { id: '1', label: '1. Initialize $w_0$', sublabel: 'Set weights to zeros or random small normal', badge: 'Init', color: 'slate' },
              { id: '2', label: '2. Compute Probabilities', sublabel: '$p_i = \\sigma(w^T x_i) = 1 / (1 + e^{-w^T x_i})$', badge: 'Sigmoid', color: 'sky' },
              { id: '3', label: '3. Calculate Gradient', sublabel: '$\\nabla \\mathcal{L} = X^T (p - y)$', badge: 'Residuals', color: 'amber' },
              { id: '4', label: '4. Update Parameters', sublabel: '$w_{t+1} = w_t - \\eta \\nabla \\mathcal{L}$', badge: 'Step', color: 'violet' },
              { id: '5', label: '5. Convergence Check', sublabel: '$\\|\\nabla \\mathcal{L}\\| < 10^{-6} \\implies w^*$', badge: 'Global Opt', color: 'emerald' },
            ],
          },
          equations: [
            {
              latex: 'w^* = (X^T X)^{-1} X^T y \\quad (\\text{OLS Closed-Form Solution})',
              description: 'Normal Equation minimizing Mean Squared Error.'
            },
            {
              latex: '\\nabla_w \\mathcal{L}(w) = X^T (\\sigma(X w) - y)',
              description: 'Gradient of Logistic Regression loss identical in form to linear regression residual error.'
            }
          ],
          keyTakeaways: [
            'Linear regression has a closed-form normal equation $(X^T X)^{-1} X^T y$, but matrix inversion is $O(d^3)$.',
            'Logistic regression loss is strictly convex, ensuring zero local minima pitfalls.',
            'The gradient for both linear and logistic regression follows the universal form: $X^T (\\hat{y} - y)$.'
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 7.2 — REGULARIZATION DUALITY (L1 vs L2 vs ELASTICNET)
    // ──────────────────────────────────────────────────────────
    {
      id: 'regularization-l1-l2-elasticnet',
      title: '7.2 Regularization Duality: L1 Lasso vs L2 Ridge vs ElasticNet',
      slug: 'regularization-l1-l2-elasticnet',
      badge: 'Regularization',
      estimatedMinutes: 25,
      overview: 'Understand the geometric origin of L1 sparsity, L2 weight shrinkage, the Bayesian interpretation (Laplace vs Gaussian priors), and ElasticNet.',
      prerequisites: ['Linear Regression', 'Optimization'],
      learningGoals: [
        'Explain geometrically why L1 Lasso produces exact zeros while L2 Ridge shrinks smoothly',
        'Connect L1 and L2 penalties to their Bayesian interpretations (Laplace vs Gaussian priors)',
        'Derive the Ridge analytical solution $w = (X^T X + \\lambda I)^{-1} X^T y$',
        'Use ElasticNet to handle groups of highly correlated features',
      ],
      analogy: {
        title: 'THE CUSTOMS LUGGAGE WEIGHING ANALOGY',
        explanation: 'Regularization is like an airline baggage fee. L2 Ridge charges fees proportionally to the square of weight (heavy bags are penalized exponentially, so you pack all bags moderately full). L1 Lasso charges a flat fee for every separate open bag (so you pack everything into 3 essential bags and completely eliminate all other 10 empty bags — automated feature selection!). ElasticNet combines both rules.',
        steps: [
          { number: 1, badge: 'Collinearity', title: '1. Singularity Problem', subtitle: '$X^T X$ is ill-conditioned or singular ($d > n$).', iconName: 'database' },
          { number: 2, badge: 'Penalty Added', title: '2. Add Penalty $\\lambda R(w)$', subtitle: 'Constrain weight vector magnitude.', iconName: 'filter' },
          { number: 3, badge: 'Geometry', title: '3. Constraint Intersection', subtitle: 'Elliptical loss meets Diamond (L1) or Sphere (L2).', iconName: 'cog' },
          { number: 4, badge: 'Solution', title: '4. Optimal Parameters', subtitle: 'Sparse zeros (L1) or Shrunk weights (L2).', iconName: 'cpu' },
        ],
        connectors: ['Ill-Conditioned', 'Penalize', 'Intersect', 'Sparsify'],
      },
      keyQuestions: [
        {
          question: 'Why does L1 Lasso set weights to EXACT ZERO while L2 Ridge never does?',
          answer: 'The L1 ball is a polytope with sharp diamond corners on the coordinate axes. The elliptical contours of the MSE loss surface naturally hit these sharp corners first, setting the orthogonal coordinates to exactly zero. The L2 ball is a smooth hypersphere without corners, so tangency points occur off-axis, shrinking weights continuously without setting them to zero.',
        },
        {
          question: 'When should I choose ElasticNet over pure Lasso or Ridge?',
          answer: 'When you have groups of highly correlated features (e.g. 50 genes measuring the same biological pathway). Pure Lasso arbitrarily picks 1 gene at random and zeros out the other 49. ElasticNet\'s L2 component forces the whole correlated group in together, while the L1 component zeroes out unrelated noise features.',
        },
      ],
      realWorldUses: [
        { industry: 'Genomic Biomarker Discovery (GWAS)', application: 'Uses L1 Lasso to select the top 20 causative genetic SNPs out of 500,000 sequenced DNA markers, eliminating 99.9% of non-causative genes.' },
        { industry: 'Quantitative Finance Portfolio Optimization', application: 'Uses L2 Ridge to stabilize covariance matrix inversion when asset returns exhibit high multicollinearity.' },
      ],
      sections: [
        {
          id: 'l1-l2-sparsity-mechanics',
          title: 'Geometric & Bayesian Origins of Sparsity in L1 vs L2',
          subtitle: 'Why L1 Creates Exact Zero Weights While L2 Shrinks Weights Continuously',
          content: `When features are collinear or exceed the number of samples ($d > n$), standard OLS matrix $X^T X$ is singular and non-invertible. Regularization penalizes parameter magnitudes:

$$\\min_w \\mathcal{L}(w) + \\lambda R(w)$$

### 1. L2 Ridge Regularization (Tikhonov: $R(w) = \\frac{1}{2} \\|w\\|_2^2 = \\frac{1}{2} \\sum w_j^2$)
- **Closed-Form Solution**: $w_{\\text{Ridge}} = (X^T X + \\lambda I)^{-1} X^T y$.
- Adding $\\lambda I$ guarantees $X^T X + \\lambda I$ is strictly positive definite and invertible!
- **Shrinkage**: Shrinks weights continuously toward zero along high-variance principal directions.
- **Bayesian Prior**: Corresponds to placing an independent zero-mean **Gaussian Prior** $w_j \\sim \\mathcal{N}\\left(0, \\frac{1}{\\lambda}\\right)$ on weights.

### 2. L1 Lasso Regularization ($R(w) = \\|w\\|_1 = \\sum |w_j|$)
- **Sparsity**: Drives non-informative feature weights to **exact zero**, performing automated feature selection.
- **Soft-Thresholding Operator**: $w_j^* = \\text{sign}(\\hat{w}_j) \\max\\left(0, |\\hat{w}_j| - \\frac{\\lambda}{2}\\right)$.
- **Bayesian Prior**: Corresponds to a **Laplacian Prior** $P(w) \\propto \\exp(-\\lambda |w|)$, which has sharp probability density peaked at exactly zero.`,
          comparisonGrid: {
            title: 'Regularization Penalty Matrix',
            columns: [
              {
                title: 'L2 Ridge Regularization',
                subtitle: 'Weight Decay / Tikhonov',
                color: 'sky',
                badge: 'Shrinkage',
                items: [
                  { label: 'Penalty Formula', value: '$\\frac{1}{2} \\lambda \\sum_{j=1}^d w_j^2$' },
                  { label: 'Sparsity', value: 'No (weights approach zero but never touch 0)' },
                  { label: 'Closed-Form', value: '$(X^T X + \\lambda I)^{-1} X^T y$', highlight: true },
                  { label: 'Bayesian Prior', value: 'Gaussian Prior $\\mathcal{N}(0, 1/\\lambda)$' },
                ],
                verdict: '✓ Best when all features are useful & collinear',
              },
              {
                title: 'L1 Lasso Regularization',
                subtitle: 'Least Absolute Shrinkage',
                color: 'emerald',
                badge: 'Feature Selection',
                items: [
                  { label: 'Penalty Formula', value: '$\\lambda \\sum_{j=1}^d |w_j|$' },
                  { label: 'Sparsity', value: 'Yes (sets weights to exact 0.0)', highlight: true },
                  { label: 'Closed-Form', value: 'No (Soft-thresholding / Coordinate Descent)' },
                  { label: 'Bayesian Prior', value: 'Laplace Prior $\\text{Laplace}(0, 1/\\lambda)$' },
                ],
                verdict: '✓ Best for sparse data & automated feature selection',
              },
              {
                title: 'ElasticNet',
                subtitle: 'Combined L1 + L2',
                color: 'violet',
                badge: 'Group Selection',
                items: [
                  { label: 'Penalty Formula', value: '$\\lambda_1 \\|w\\|_1 + \\frac{1}{2}\\lambda_2 \\|w\\|_2^2$' },
                  { label: 'Sparsity', value: 'Yes (selects groups of correlated features)', highlight: true },
                  { label: 'Closed-Form', value: 'No (Iterative coordinate descent)' },
                  { label: 'Bayesian Prior', value: 'Mixture Gaussian + Laplace' },
                ],
                verdict: '✓ Best when features have strong collinear groups',
              },
            ],
          },
          equations: [
            {
              latex: 'w_{\\text{Ridge}} = (X^T X + \\lambda I)^{-1} X^T y',
              description: 'Ridge analytical solution with regularized diagonal stability.'
            },
            {
              latex: '\\mathcal{L}_{\\text{ElasticNet}} = \\frac{1}{2n} \\|y - Xw\\|_2^2 + \\alpha \\rho \\|w\\|_1 + \\frac{\\alpha(1-\\rho)}{2} \\|w\\|_2^2',
              description: 'ElasticNet objective balancing L1 ratio ρ and overall penalty α.'
            }
          ],
          keyTakeaways: [
            'L1 Lasso induces exact sparsity due to sharp corners on the L1 polytope.',
            'L2 Ridge shrinks weights without setting them to zero and guarantees matrix invertibility.',
            'ElasticNet handles collinear feature groups by combining L1 feature selection with L2 stability.'
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 7.3 — SUPPORT VECTOR MACHINES & KERNEL TRICK
    // ──────────────────────────────────────────────────────────
    {
      id: 'support-vector-machines-kernels',
      title: '7.3 Support Vector Machines (SVM), Dual Formulation & Kernel Trick',
      slug: 'support-vector-machines-kernels',
      badge: 'Margin Mastery',
      estimatedMinutes: 25,
      overview: 'Deconstruct Maximal Margin Classifiers, Hard vs Soft Margin (slack variables $\\xi_i$), the dual Lagrangian problem, and non-linear Kernel functions.',
      prerequisites: ['Convex Optimization', 'Linear Algebra'],
      learningGoals: [
        'Derive the geometric margin $\\frac{2}{\\|w\\|}$ and formulate the primal quadratic program',
        'Understand the Dual Formulation where decision boundaries depend strictly on Support Vectors',
        'Apply Mercer\'s Theorem and the Kernel Trick ($K(x, z) = \\langle \\phi(x), \\phi(z) \\rangle$)',
        'Tune RBF kernel parameter $\\gamma$ and regularization parameter $C$',
      ],
      analogy: {
        title: 'THE SHEET OF PAPER LIFTING TRICK',
        explanation: 'Imagine red and blue marbles mixed on a flat table in a circle (non-linearly separable in 2D). You cannot draw a straight ruler between them. But if you lift the rubber table upwards into the 3rd dimension (Kernel mapping $\\phi(x)$), the center marbles sink while the outer marbles rise — now a flat cardboard sheet (linear hyperplane in 3D) easily slices between them! The Kernel Trick computes this without ever physically lifting the table.',
        steps: [
          { number: 1, badge: 'Low Dim', title: '1. Non-Separable Input', subtitle: 'Points mixed non-linearly in $\\mathbb{R}^d$.', iconName: 'database' },
          { number: 2, badge: 'Kernel Map', title: '2. Implicit Feature Map $\\phi(x)$', subtitle: 'Projects to infinite Hilbert space $\\mathcal{H}$.', iconName: 'filter' },
          { number: 3, badge: 'Inner Product', title: '3. Kernel Function $K(x, z)$', subtitle: 'Computes $\\langle \\phi(x), \\phi(z) \\rangle$ in $O(d)$ time.', iconName: 'cog' },
          { number: 4, badge: 'Max Margin', title: '4. Support Vectors Locked', subtitle: 'Only boundary points define hyperplane.', iconName: 'cpu' },
        ],
        connectors: ['Input', 'Map $\\phi$', 'Kernel Dot', 'Optimal Margin'],
      },
      keyQuestions: [
        {
          question: 'What is the Kernel Trick and why is it computationally revolutionary?',
          answer: 'The Kernel Trick computes the inner product $\\langle \\phi(x), \\phi(z) \\rangle$ in an infinite-dimensional feature space directly using a function in low-dimensional space $K(x, z) = \\exp(-\\gamma \\|x - z\\|^2)$ in $O(d)$ time, completely avoiding the impossible $O(\\infty)$ computation of explicit coordinate mappings $\\phi(x)$.',
        },
        {
          question: 'What does the SVM parameter C control?',
          answer: 'Parameter C controls the trade-off between margin width and classification errors. Large C strictly penalizes any margin violations (hard margin behavior, risk of overfitting). Small C permits more margin violations (wider margin, higher bias, more robust to noisy outliers).',
        },
      ],
      realWorldUses: [
        { industry: 'Bioinformatics & Protein Fold Classification', application: 'Uses RBF-Kernel SVMs to classify protein structural families from amino acid sequence similarity matrices.' },
        { industry: 'Handwritten Character Recognition (MNIST SOTA pre-DL)', application: 'SVMs with degree-9 polynomial kernels achieved 99.4% accuracy on MNIST digits before deep convolutional networks became popular.' },
      ],
      sections: [
        {
          id: 'svm-max-margin-kernels',
          title: 'Maximum Margin Hyperplanes & The Dual Kernel Formulation',
          subtitle: 'Why Support Vectors Give SVMs High Sample Efficiency',
          content: `The Support Vector Machine finds the separating hyperplane $w^T x + b = 0$ that maximizes the **geometric margin** $M = \\frac{2}{\\|w\\|_2}$.

### Primal Soft-Margin Problem
$$\\min_{w, b, \\xi} \\frac{1}{2} \\|w\\|_2^2 + C \\sum_{i=1}^n \\xi_i \\quad \\text{s.t.} \\quad y_i (w^T x_i + b) \\ge 1 - \\xi_i, \\quad \\xi_i \\ge 0$$

### The Dual Formulation & Support Vectors
Using Lagrange multipliers $\\alpha_i$, the dual problem becomes:
$$\\max_\\alpha \\sum_{i=1}^n \\alpha_i - \\frac{1}{2} \\sum_{i=1}^n \\sum_{j=1}^n \\alpha_i \\alpha_j y_i y_j \\langle x_i, x_j \\rangle \\quad \\text{s.t.} \\quad 0 \\le \\alpha_i \\le C, \\quad \\sum_{i=1}^n \\alpha_i y_i = 0$$

**Key Insight**: The decision boundary depends **ONLY** on samples where $\\alpha_i > 0$ — these are the **Support Vectors** lying directly on the margin! All other data points have $\\alpha_i = 0$ and can be removed without changing the decision boundary.`,
          decisionTree: {
            title: 'Decision Tree: Which SVM Kernel Should You Use?',
            description: 'Choose the appropriate kernel based on feature dimension and non-linearity.',
            root: {
              id: 'root',
              question: 'Is the number of features d much larger than sample count n (d >> n, e.g. text or genomics)?',
              yes: {
                id: 'linear-svm',
                question: 'Linear Kernel: K(x, z) = x^T z',
                answer: 'Use Linear SVM (LinearSVC or LibLinear). High-dimensional data is almost always linearly separable without expensive kernel projections.',
                badge: 'Linear Kernel ✓',
              },
              no: {
                id: 'non-linear-check',
                question: 'Do features interact non-linearly with continuous smooth boundaries?',
                yes: {
                  id: 'rbf-svm',
                  question: 'Radial Basis Function (RBF / Gaussian) Kernel',
                  answer: 'Use RBF Kernel K(x, z) = exp(-γ ||x - z||²). Maps data into infinite-dimensional Hilbert space. Tune C and γ via cross-validation.',
                  badge: 'RBF Kernel ✓',
                },
                no: {
                  id: 'poly-svm',
                  question: 'Polynomial Kernel: K(x, z) = (γ x^T z + c)^d',
                  answer: 'Use Polynomial Kernel when feature interactions of specific degree d (e.g. d=2, d=3) are physically meaningful.',
                  badge: 'Polynomial Kernel ✓',
                },
              },
            },
          },
          equations: [
            {
              latex: 'f(x) = \\text{sign}\\left( \\sum_{i \\in \\text{SV}} \\alpha_i y_i K(x_i, x) + b \\right)',
              description: 'Kernel SVM prediction function evaluated exclusively over Support Vectors.'
            },
            {
              latex: 'K_{\\text{RBF}}(x, z) = \\exp\\left( -\\gamma \\|x - z\\|^2 \\right) = \\exp\\left( -\\frac{\\|x - z\\|^2}{2\\sigma^2} \\right)',
              description: 'Gaussian Radial Basis Function (RBF) Kernel.'
            }
          ],
          keyTakeaways: [
            'SVM maximizes the geometric margin 2/||w||, maximizing generalization distance to both classes.',
            'Only Support Vectors (points on or inside margin) influence the final decision boundary.',
            'The Kernel Trick evaluates inner products in infinite-dimensional space in O(d) compute time.',
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 7.4 — TREE ENSEMBLES (XGBOOST, LIGHTGBM, CATBOOST)
    // ──────────────────────────────────────────────────────────
    {
      id: 'tree-ensembles-xgboost-lightgbm',
      title: '7.4 Decision Trees, Random Forests & Gradient Boosting (XGBoost / LightGBM)',
      slug: 'tree-ensembles-xgboost-lightgbm',
      badge: 'Ensemble Mastery',
      estimatedMinutes: 30,
      overview: 'Deconstruct Decision Trees (Gini Impurity, Entropy), Bagging vs Boosting, second-order Taylor expansions in XGBoost, and Histogram Binning in LightGBM.',
      prerequisites: ['Probability', 'Calculus'],
      learningGoals: [
        'Calculate Gini Impurity and Information Gain for orthogonal feature splitting',
        'Compare Bagging (Random Forest variance reduction) with Boosting (gradient bias reduction)',
        'Derive the 2nd-order Taylor objective in XGBoost with first gradients $g_i$ and second Hessians $h_i$',
        'Understand Histogram-based continuous binning in LightGBM and symmetric trees in CatBoost',
      ],
      analogy: {
        title: 'THE COMMITTEE OF SPECIALIST APPRENTICES',
        explanation: 'Random Forest (Bagging) is like polling 100 independent general doctors and taking a majority vote — their individual random mistakes cancel out (Variance reduction). Gradient Boosting (XGBoost) is like a sequential master-apprentice chain. Apprentice 1 makes a rough guess. Apprentice 2 studies ONLY the residual errors of Apprentice 1. Apprentice 3 fixes the remaining errors of Apprentice 2 — building an unstoppable chain of hyper-specialized correctors.',
        steps: [
          { number: 1, badge: 'Base Tree', title: '1. Initial Tree ($f_0$)', subtitle: 'Makes baseline rough prediction on all data.', iconName: 'database' },
          { number: 2, badge: 'Residuals', title: '2. Compute Gradients & Hessians', subtitle: 'Calculates sample errors $g_i = \\partial \\mathcal{L}, h_i = \\partial^2 \\mathcal{L}$.', iconName: 'filter' },
          { number: 3, badge: 'Corrective Tree', title: '3. Fit Tree to Residuals', subtitle: 'Partitions space to maximize split Gain.', iconName: 'cog' },
          { number: 4, badge: 'Shrinkage', title: '4. Scale by Learning Rate ($\\eta$)', subtitle: '$F_t(x) = F_{t-1}(x) + \\eta f_t(x)$ updates ensemble.', iconName: 'cpu' },
          { number: 5, badge: 'Master Ensemble', title: '5. SOTA Tabular Model', subtitle: 'High-precision non-linear predictor.', iconName: 'rocket' },
        ],
        connectors: ['Predict', 'Compute Residuals', 'Fit Corrective Tree', 'Accumulate $\\eta$'],
      },
      keyQuestions: [
        {
          question: 'Why does XGBoost beat Deep Learning on Tabular Data?',
          answer: 'Tabular features exist in unaligned coordinate spaces (e.g. Age in years vs Income in dollars). Decision tree orthogonal splits are scale-invariant and capture sharp step-function thresholds naturally. Deep neural networks assume smooth continuous manifolds and rotation invariance, struggling with unaligned coordinates.',
        },
        {
          question: 'What is the fundamental difference between Bagging and Boosting?',
          answer: 'Bagging (Random Forest) trains deep, low-bias trees in parallel on bootstrap subsets and averages them to REDUCE VARIANCE. Boosting (XGBoost/LightGBM) sequentially trains shallow, high-bias trees on previous residual errors to REDUCE BIAS.',
        },
      ],
      realWorldUses: [
        { industry: 'Kaggle Competition Champion Pipelines', application: 'XGBoost, LightGBM, and CatBoost win over 85% of all structured tabular data challenges on Kaggle and DrivenData.' },
        { industry: 'Ad Click-Through Rate & Fraud Scoring (Uber / DoorDash)', application: 'LightGBM scores millions of real-time ride and delivery route fraud possibilities in under 5ms.' },
      ],
      sections: [
        {
          id: 'xgboost-lightgbm-mechanics',
          title: 'From Decision Trees to Second-Order Gradient Boosting',
          subtitle: 'Why Gradient Boosted Decision Trees (GBDT) Dominate Tabular Benchmarks',
          content: `### 1. Decision Trees: Splitting Criteria
A decision tree recursively partitions feature space to minimize node impurity:
- **Gini Impurity**: $I_G(p) = 1 - \\sum_{k=1}^K p_k^2$
- **Cross-Entropy**: $H(p) = -\\sum_{k=1}^K p_k \\log_2 p_k$

### 2. Bagging vs Boosting: The Variance-Bias Trade-Off
- **Random Forests (Bagging)**: Trains $B$ deep, independent trees in parallel on bootstrap sample subsets. Averages predictions to **reduce variance** without increasing bias.
- **Gradient Boosting (Boosting)**: Sequentially trains shallow trees where each new tree fits the **residual gradient error** of the previous ensemble:
$$\\hat{y}_i^{(t)} = \\hat{y}_i^{(t-1)} + \\eta f_t(x_i)$$

### 3. XGBoost: 2nd-Order Taylor Optimization
XGBoost optimizes the objective using both first gradients $g_i = \\frac{\\partial \\mathcal{L}}{\\partial \\hat{y}_i}$ and second Hessian curvatures $h_i = \\frac{\\partial^2 \\mathcal{L}}{\\partial \\hat{y}_i^2}$:
$$\\mathcal{L}^{(t)} \\approx \\sum_{i=1}^n \\left[ g_i f_t(x_i) + \\frac{1}{2} h_i f_t^2(x_i) \\right] + \\gamma T + \\frac{1}{2}\\lambda \\sum_{j=1}^T w_j^2$$`,
          comparisonGrid: {
            title: 'Tree Ensemble SOTA Comparison Matrix',
            columns: [
              {
                title: 'Random Forest',
                subtitle: 'Parallel Bagging',
                color: 'slate',
                badge: 'Variance Reduction',
                items: [
                  { label: 'Ensemble Type', value: 'Parallel independent deep trees' },
                  { label: 'Primary Benefit', value: 'Impossible to overfit by adding more trees' },
                  { label: 'Tuning Difficulty', value: 'Very easy (default params work well)', highlight: true },
                  { label: 'Training Speed', value: 'Moderate (scales linearly with tree count)' },
                ],
                verdict: 'Best out-of-the-box baseline with zero tuning',
              },
              {
                title: 'XGBoost',
                subtitle: '2nd-Order Boosting',
                color: 'emerald',
                badge: 'Exact Splitting',
                items: [
                  { label: 'Ensemble Type', value: 'Sequential 2nd-order Taylor expansion' },
                  { label: 'Primary Benefit', value: 'Hessian curvature stabilizes custom losses' },
                  { label: 'Tuning Difficulty', value: 'Requires tuning (max_depth, lr, lambda)' },
                  { label: 'Regularization', value: 'Built-in L1/L2 on leaf weights and tree complexity', highlight: true },
                ],
                verdict: '✓ Gold standard for maximum tabular accuracy',
              },
              {
                title: 'LightGBM',
                subtitle: 'Histogram-Based GBDT',
                color: 'sky',
                badge: '15x Speedup',
                items: [
                  { label: 'Ensemble Type', value: 'Leaf-wise (best-first) tree growth' },
                  { label: 'Primary Benefit', value: 'Histogram continuous binning (256 bins)', highlight: true },
                  { label: 'Categorical', value: 'Native categorical splitting without one-hot' },
                  { label: 'Training Speed', value: 'Ultra-fast on large datasets (>1M rows)' },
                ],
                verdict: '✓ Best for massive tabular datasets (>100K rows)',
              },
              {
                title: 'CatBoost',
                subtitle: 'Categorical SOTA',
                color: 'violet',
                badge: 'Symmetric Trees',
                items: [
                  { label: 'Ensemble Type', value: 'Oblivious / Symmetric decision trees' },
                  { label: 'Primary Benefit', value: 'Target encoding without target leakage', highlight: true },
                  { label: 'Inference Speed', value: 'Blazing fast C++ inference on CPU' },
                  { label: 'Categorical', value: 'Best-in-class categorical feature support' },
                ],
                verdict: '✓ Best when dataset has heavy categorical columns',
              },
            ],
          },
          equations: [
            {
              latex: '\\text{Gain} = \\frac{1}{2} \\left[ \\frac{G_L^2}{H_L + \\lambda} + \\frac{G_R^2}{H_R + \\lambda} - \\frac{(G_L + G_R)^2}{H_L + H_R + \\lambda} \\right] - \\gamma',
              description: 'XGBoost exact split gain formula balancing loss reduction and tree complexity.'
            }
          ],
          keyTakeaways: [
            'Bagging (Random Forest) reduces variance by training parallel decorrelated trees.',
            'Boosting (XGBoost) reduces bias by sequentially minimizing residual gradient errors.',
            'Second-order Hessian information gives XGBoost superior split points on tabular data.'
          ]
        }
      ]
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 7.5 — UNSUPERVISED LEARNING (PCA, K-MEANS, t-SNE)
    // ──────────────────────────────────────────────────────────
    {
      id: 'unsupervised-pca-kmeans-tsne',
      title: '7.5 Unsupervised Learning: PCA, K-Means Clustering & t-SNE / UMAP',
      slug: 'unsupervised-pca-kmeans-tsne',
      badge: 'Unsupervised SOTA',
      estimatedMinutes: 25,
      overview: 'Deconstruct Principal Component Analysis (PCA) variance maximization, K-Means clustering convergence proofs, and non-linear manifold projections (t-SNE / UMAP).',
      prerequisites: ['Linear Algebra (Eigendecomposition)', 'Probability'],
      learningGoals: [
        'Derive Principal Component Analysis (PCA) via Covariance Matrix Eigendecomposition and SVD',
        'Analyze K-Means clustering (Lloyd\'s Algorithm) and choose optimal K via Elbow and Silhouette scores',
        'Understand why t-SNE preserves local neighborhoods while PCA preserves global orthogonal variance',
        'Compare t-SNE and UMAP for high-dimensional latent space visualization',
      ],
      analogy: {
        title: 'THE SHADOW PROJECTION ANALOGY',
        explanation: 'Imagine holding a complex 3D wire sculpture under a spotlight. PCA is like rotating the sculpture until its 2D shadow on the wall captures the widest possible spread of details (maximum variance). K-Means is like grouping scattered marbles into 3 distinct color buckets by repeatedly moving the bucket centers to the average marble location. t-SNE is like unrolling a crumpled 2D sheet of paper from a 100-dimensional ball while keeping neighbors glued together.',
        steps: [
          { number: 1, badge: 'High Dim', title: '1. High-Dim Matrix ($X$)', subtitle: '$N$ samples in $D$-dimensional space ($D \\gg 3$).', iconName: 'database' },
          { number: 2, badge: 'Covariance', title: '2. Compute Covariance ($C$)', subtitle: '$C = \\frac{1}{n} X^T X$ measures feature correlations.', iconName: 'filter' },
          { number: 3, badge: 'Eigen Vectors', title: '3. Eigendecomposition / SVD', subtitle: 'Find principal orthogonal axes of maximum variance.', iconName: 'cog' },
          { number: 4, badge: 'Low Dim', title: '4. Low-Dim Projection', subtitle: 'Project data into top $k$ principal components.', iconName: 'rocket' },
        ],
        connectors: ['Matrix $X$', 'Covariance $C$', 'Eigendecompose', 'Project $k$'],
      },
      keyQuestions: [
        {
          question: 'Why should I use PCA before training a linear model or distance-based classifier?',
          answer: 'In high dimensions, the "Curse of Dimensionality" causes all data points to become equidistant, degrading distance metrics. PCA eliminates multicollinearity, reduces noise, compresses feature dimensions by 80%+, and guarantees mutually orthogonal (uncorrelated) features.',
        },
        {
          question: 'Why can t-SNE NEVER be used for training downstream ML models?',
          answer: 't-SNE does NOT produce a parametric mapping function $f(x) \\to z$. You cannot project a new unseen test point into a trained t-SNE space without re-running the entire $O(N^2)$ optimization over all training points! Use t-SNE strictly for 2D/3D visual exploratory data analysis, never as a preprocessing pipeline step.',
        },
      ],
      realWorldUses: [
        { industry: 'Single-Cell RNA Genomic Sequencing (scRNA-seq)', application: 'Uses UMAP and PCA to project 20,000 gene expressions per cell into 2D maps, identifying rare novel immune cell clusters.' },
        { industry: 'Customer Segmentation & Marketing (Spotify / Netflix)', application: 'Applies K-Means clustering and PCA on listening/viewing telemetry vectors to group users into behavioral taste profiles.' },
      ],
      sections: [
        {
          id: 'pca-kmeans-manifold-learning',
          title: 'Dimensionality Reduction & Manifold Learning',
          subtitle: 'From Linear Orthogonal Projections (PCA) to Non-Linear Topology (t-SNE & UMAP)',
          content: `### 1. Principal Component Analysis (PCA)
PCA finds an orthogonal basis $v_1, v_2, \\dots, v_k$ that maximizes the projected data variance:
$$\\max_v v^T (X^T X) v \\quad \\text{s.t.} \\quad \\|v\\|_2 = 1$$
The solution corresponds to the top eigenvectors of the **Sample Covariance Matrix** $\\Sigma = \\frac{1}{n} X^T X$.

### 2. K-Means Clustering (Lloyd's Algorithm)
Given $k$ cluster centers $\\mu_1, \\dots, \\mu_k$, K-Means iteratively minimizes within-cluster sum of squares (WCSS):
$$\\mathcal{L}(\\mu) = \\sum_{i=1}^n \\sum_{j=1}^k r_{ij} \\|x_i - \\mu_j\\|^2$$
1. **Assignment Step**: Assign each sample to the nearest cluster centroid $\\mu_j$.
2. **Update Step**: Recompute centroid $\\mu_j = \\frac{1}{|C_j|} \\sum_{i \\in C_j} x_i$.

### 3. Non-Linear Manifolds: t-SNE vs UMAP
- **t-SNE**: Maps pairwise Gaussian probabilities in high dimensions to Student-t distributions in 2D space, minimizing KL divergence:
$$\\mathcal{L}_{\\text{t-SNE}} = \\text{KL}(P \\parallel Q) = \\sum_{i \\ne j} p_{ij} \\log \\frac{p_{ij}}{q_{ij}}$$
- **UMAP**: Preserves both local and global topological structure using Riemannian geometry and fuzzy simplicial sets — 10x faster than t-SNE.`,
          comparisonGrid: {
            title: 'Dimensionality Reduction Paradigm Comparison',
            columns: [
              {
                title: 'Principal Component Analysis (PCA)',
                subtitle: 'Linear Global Projection',
                color: 'sky',
                badge: 'Orthogonal SVD',
                items: [
                  { label: 'Mapping Type', value: 'Linear orthogonal transformation' },
                  { label: 'Preserves', value: 'Maximum global variance & orthogonal spread' },
                  { label: 'Out-Of-Sample', value: 'Yes (parametric $W^T x$ transforms new data)', highlight: true },
                  { label: 'Speed', value: 'Instant closed-form SVD in $O(N d^2)$' },
                ],
                verdict: '✓ Best for preprocessing & noise reduction before ML models',
              },
              {
                title: 't-SNE',
                subtitle: 'Probabilistic Local Manifold',
                color: 'amber',
                badge: 'Cluster Visualizer',
                items: [
                  { label: 'Mapping Type', value: 'Non-linear Student-t distribution match' },
                  { label: 'Preserves', value: 'Fine-grained local neighborhood clusters' },
                  { label: 'Out-Of-Sample', value: 'No (cannot project new test points)', highlight: true },
                  { label: 'Speed', value: 'Slow $O(N^2)$ or Barnes-Hut $O(N \\log N)$' },
                ],
                verdict: '✓ Best for publication-quality 2D EDA cluster visualization',
              },
              {
                title: 'UMAP',
                subtitle: 'Fuzzy Topological Manifold',
                color: 'violet',
                badge: 'Topology SOTA',
                items: [
                  { label: 'Mapping Type', value: 'Non-linear Riemannian simplicial sets' },
                  { label: 'Preserves', value: 'Both local clusters AND global continuum distances' },
                  { label: 'Out-Of-Sample', value: 'Yes (approximates new test sample embeddings)', highlight: true },
                  { label: 'Speed', value: 'Fast scalable gradient descent' },
                ],
                verdict: '✓ Modern SOTA replacement for t-SNE across biology & NLP',
              },
            ],
          },
          equations: [
            {
              latex: 'C = \\frac{1}{n} X^T X = V \\Lambda V^T \\implies Z = X V_k',
              description: 'PCA projection onto the top k eigenvectors of the covariance matrix.'
            },
            {
              latex: 'q_{ij} = \\frac{(1 + \\|y_i - y_j\\|^2)^{-1}}{\\sum_{k \\ne l} (1 + \\|y_k - y_l\\|^2)^{-1}}',
              description: 'Student-t distribution in low-dimensional t-SNE space solving the crowding problem.'
            }
          ],
          keyTakeaways: [
            'PCA maximizes global variance and produces mutually orthogonal features for linear models.',
            'K-Means partitions space into Voronoi cells and converges to a local minimum in finite steps.',
            'UMAP and t-SNE uncover non-linear manifold clusters invisible to linear PCA.',
          ]
        }
      ]
    },
  ],
};
