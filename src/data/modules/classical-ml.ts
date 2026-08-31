import { Module } from '@/types';

export const classicalMlModule: Module = {
  id: 'classical-ml',
  number: 7,
  title: 'Classical Machine Learning',
  subtitle: 'Convex Models, Regularization Duality, Tree Ensembles (XGBoost/LightGBM) & Manifold Learning',
  iconName: 'Boxes',
  color: '#059669', // Emerald
  chapters: [
    {
      id: 'supervised-linear-logistic-regression',
      title: '7.1 Linear & Logistic Regression, Loss Surfaces & Convexity',
      slug: 'supervised-linear-logistic-regression',
      badge: 'Convex Models',
      estimatedMinutes: 25,
      overview: 'Deconstruct Ordinary Least Squares (OLS), the Normal Equation, Logistic Regression likelihood derivation, Decision Boundaries, and convexity guarantees.',
      prerequisites: ['Linear Algebra', 'Multivariate Calculus'],
      analogy: {
        title: 'THE AUTOMATED DECISION FACTORY',
        explanation: 'Linear & Logistic models are like adjusting an assembly line calibration dial. With each error feedback step, the dial rotates along the steepest gradient until the error is minimal!',
        steps: [
          { number: 1, badge: 'Input Features', title: '1. Data Vector (x)', subtitle: 'Raw numerical sensor attributes.', iconName: 'database' },
          { number: 2, badge: 'Linear Weighting', title: '2. Dot Product (w·x)', subtitle: 'Weighted summation + bias term.', iconName: 'cog' },
          { number: 3, badge: 'Sigmoid Gate', title: '3. Non-Linear Sigmoid', subtitle: 'Squashes output into probability [0, 1].', iconName: 'filter' },
          { number: 4, badge: 'Error Gradient', title: '4. Binary Cross-Entropy', subtitle: 'Measures prediction surprise.', iconName: 'cpu' },
          { number: 5, badge: 'Calibrated Model', title: '5. Optimal Boundary (w*)', subtitle: 'Convex global minimum reached!', iconName: 'rocket' }
        ],
        connectors: ['Multiply', 'Activate', 'Evaluate', 'Update']
      },
      keyQuestions: [
        {
          question: 'Why was Linear Regression created?',
          answer: 'To model the linear relationship between continuous dependent variables and independent predictors via Ordinary Least Squares.'
        },
        {
          question: 'Why does Linear Regression have a closed-form solution while Logistic does not?',
          answer: 'Linear regression loss is quadratic (w* = (X^T X)^-1 X^T y), while logistic regression uses a non-linear sigmoid transcendental function requiring iterative gradient descent.'
        },
        {
          question: 'Is Logistic Regression guaranteed to find the global minimum?',
          answer: 'Yes! The Binary Cross-Entropy loss surface is strictly convex with respect to weights, meaning every local minimum is the unique global minimum.'
        }
      ],
      realWorldUses: [
        {
          industry: 'Financial Credit Scoring & Loan Underwriting',
          application: 'Calculates probability of credit default based on applicant income, debt ratio, and credit history with full regulatory interpretability.'
        },
        {
          industry: 'Clinical Drug Dosage & Medical Risk',
          application: 'Estimates patient survival probability and adverse reaction likelihood given biological biomarkers.'
        }
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

Because $\\sigma(w^T x)$ introduces a transcendental non-linear function, setting $\\nabla_w \\mathcal{L} = 0$ has **no closed-form analytical inverse**. However, the loss function is **strictly convex**, guaranteeing that Gradient Descent or Newton-Raphson converges to the globally optimal parameter vector $w^*$!`,
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
    {
      id: 'regularization-l1-l2-elasticnet',
      title: '7.2 Regularization Duality: L1 Lasso vs L2 Ridge vs ElasticNet',
      slug: 'regularization-l1-l2-elasticnet',
      badge: 'Regularization',
      estimatedMinutes: 25,
      overview: 'Understand the geometric origin of L1 sparsity, L2 weight shrinkage, the Bayesian interpretation (Laplace vs Gaussian priors), and ElasticNet.',
      prerequisites: ['Linear Regression', 'Optimization'],
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
          equations: [
            {
              latex: 'w_{\\text{Ridge}} = (X^T X + \\lambda I)^{-1} X^T y',
              description: 'Ridge analytical solution with regularized diagonal stability.'
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
    {
      id: 'tree-ensembles-xgboost-lightgbm',
      title: '7.4 Decision Trees, Random Forests & Gradient Boosting (XGBoost / LightGBM)',
      slug: 'tree-ensembles-xgboost-lightgbm',
      badge: 'Ensemble Mastery',
      estimatedMinutes: 30,
      overview: 'Deconstruct Decision Trees (Gini Impurity, Entropy), Bagging vs Boosting, second-order Taylor expansions in XGBoost, and Histogram Binning in LightGBM.',
      prerequisites: ['Probability', 'Calculus'],
      analogy: {
        title: 'THE COMMITTEE OF SPECIALISTS (GRADIENT BOOSTING)',
        explanation: 'Gradient Boosting is like a committee of apprentices. The 1st apprentice makes an initial prediction. The 2nd apprentice studies only the mistakes (residual errors) of the 1st. The 3rd apprentice fixes the remaining errors of the 2nd!',
        steps: [
          { number: 1, badge: 'Base Tree', title: '1. Initial Tree (f0)', subtitle: 'Makes baseline rough prediction.', iconName: 'database' },
          { number: 2, badge: 'Residuals', title: '2. Gradient Calculation', subtitle: 'Computes sample errors (g_i, h_i).', iconName: 'filter' },
          { number: 3, badge: 'Corrective Tree', title: '3. Fit Tree on Errors', subtitle: 'Learns to correct prior residuals.', iconName: 'cog' },
          { number: 4, badge: 'Ensemble Shrinkage', title: '4. Add with Learning Rate', subtitle: 'F(x) += eta * f_t(x).', iconName: 'cpu' },
          { number: 5, badge: 'Master Ensemble', title: '5. SOTA Model', subtitle: 'High-precision tabular predictions!', iconName: 'rocket' }
        ],
        connectors: ['Predict', 'Compute Residuals', 'Fit Residuals', 'Accumulate']
      },
      keyQuestions: [
        {
          question: 'Why does XGBoost beat Deep Learning on Tabular Data?',
          answer: 'Tabular data features have heterogeneous types and unaligned coordinate spaces where decision tree orthogonal splits naturally excel without continuous Euclidean manifold assumptions.'
        },
        {
          question: 'What is the difference between Bagging and Boosting?',
          answer: 'Bagging (Random Forest) trains independent trees in parallel to reduce variance; Boosting (XGBoost) trains sequential trees on previous residual errors to reduce bias.'
        }
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
    }
  ]
};
