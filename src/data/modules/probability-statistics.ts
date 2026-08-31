import { Module } from '@/types';

export const probabilityStatisticsModule: Module = {
  id: 'probability-statistics',
  number: 14,
  title: 'Probability, Statistics & Information Theory',
  subtitle: 'Bayes Theorem, Continuous & Discrete Distributions, Central Limit Theorem, Hypothesis Testing, Bayesian MCMC, and Shannon Information',
  iconName: 'Percent',
  color: '#3b82f6', // Blue
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 14.1 — PROBABILITY THEORY & DISTRIBUTIONS
    // ──────────────────────────────────────────────────────────
    {
      id: 'probability-theory-distributions-bayes',
      title: '14.1 Probability Theory, Bayes\' Theorem & Common Distributions',
      slug: 'probability-theory-distributions-bayes',
      badge: 'Probability Core',
      estimatedMinutes: 25,
      overview: 'Deconstruct axioms of probability, conditional probability, Bayes\' Theorem, discrete vs continuous random variables (PMF/PDF/CDF), and the master zoo of probability distributions in AI.',
      prerequisites: ['Basic Algebra', 'Calculus'],
      learningGoals: [
        'Apply probability axioms (Union, Intersection, Independence, Law of Total Probability)',
        'Derive and calculate Bayes\' Theorem: Posterior $\\propto$ Likelihood $\\times$ Prior',
        'Distinguish PMF (Discrete) from PDF (Continuous) and CDF integration',
        'Characterize common distributions (Bernoulli, Binomial, Poisson, Gaussian, Beta, Gamma, Chi-Square, Student\'s t)',
      ],
      analogy: {
        title: 'THE MEDICAL DIAGNOSTIC RADAR ANALOGY',
        explanation: 'Imagine testing positive for a rare disease affecting 1 in 1,000 people (Prior $P(D) = 0.001$) with a 99% accurate test (Likelihood $P(T+|D) = 0.99$). Most people assume their chance of being sick is 99%. But **Bayes\' Theorem** reveals the truth: in a city of 100,000 people, 100 have the disease (99 test positive), while 99,900 are healthy (1% false positives = 999 test positive). Your real chance of disease is $\\frac{99}{99 + 999} \\approx 9\\%$! Bayes\' Theorem balances new evidence against background base rates.',
        steps: [
          { number: 1, badge: 'Prior $P(\\theta)$', title: '1. Prior Belief', subtitle: 'Base rate before observing new data.', iconName: 'database' },
          { number: 2, badge: 'Likelihood', title: '2. Data Likelihood $P(D|\\theta)$', subtitle: 'Probability of evidence given hypothesis.', iconName: 'filter' },
          { number: 3, badge: 'Evidence $P(D)$', title: '3. Total Evidence Marginal', subtitle: 'Normalizing constant $P(D) = \\int P(D|\\theta)P(\\theta)d\\theta$.', iconName: 'cog' },
          { number: 4, badge: 'Posterior', title: '4. Updated Posterior $P(\\theta|D)$', subtitle: 'Calibrated certainty after data.', iconName: 'rocket' },
        ],
        connectors: ['Prior $P(\\theta)$', 'Observe Data', 'Normalize', 'Posterior $P(\\theta|D)$'],
      },
      keyQuestions: [
        {
          question: 'What is the fundamental difference between a Probability Mass Function (PMF) and a Probability Density Function (PDF)?',
          answer: 'A **PMF** applies to discrete variables: $P(X=x)$ is the exact probability of taking value $x$ (values $\\le 1.0$ and sum to $1$). A **PDF** applies to continuous variables: $f(x)$ is the probability *density*, where the probability of any single exact real number is $0$ ($P(X=3.14159) = 0$). Probabilities are computed by integrating area under the curve: $P(a \\le X \\le b) = \\int_a^b f(x) dx$.',
        },
        {
          question: 'Why is the Gaussian (Normal) Distribution so ubiquitous in Machine Learning and Nature?',
          answer: 'Because of the **Central Limit Theorem**: the sum of many independent random variables from almost ANY underlying distribution converges to a Gaussian distribution. Furthermore, by Information Theory, the Gaussian distribution has the **Maximum Entropy** (maximum uncertainty / least bias) for a given mean and variance.',
        },
      ],
      realWorldUses: [
        { industry: 'Spam Filtering & Naive Bayes Classifiers', application: 'Uses Bayes\' Theorem with word presence likelihoods to classify incoming emails as spam vs legitimate ham in microseconds.' },
        { industry: 'Gaussian Diffusion Generative Models (Stable Diffusion / Midjourney)', application: 'Adds incremental Gaussian noise $\\mathcal{N}(0, \\sigma^2 I)$ over 1,000 steps and trains a neural network to reverse the reverse probability drift.' },
      ],
      sections: [
        {
          id: 'probability-foundations-distributions-table',
          title: 'Master Probability Definitions & Distribution Reference',
          subtitle: 'The Core Reference Zoo of Discrete and Continuous Probability Distributions',
          content: `### 1. Basic Probability Definitions

| Term | Mathematical Definition | Notation & Formula |
| :--- | :--- | :--- |
| **Sample Space ($S$)** | Set of all possible outcomes | $S = \\{s_1, s_2, \\dots\\}, \\quad P(S) = 1$ |
| **Event ($E$)** | A subset of the sample space | $E \\subseteq S, \\quad P(E) = \\sum_{s \\in E} P(s)$ |
| **Complement ($E^c$)** | Event NOT occurring | $P(E^c) = 1 - P(E)$ |
| **Union ($A \\cup B$)** | $A$ OR $B$ occurs | $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ |
| **Intersection ($A \\cap B$)** | $A$ AND $B$ both occur | $P(A \\cap B) = P(A) \\cdot P(B)$ (if independent) |
| **Conditional Probability** | Probability of $A$ given $B$ occurred | $P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\quad (P(B) > 0)$ |
| **Law of Total Probability** | Partition sample space into $B_1, \\dots, B_k$ | $P(A) = \\sum_{i=1}^k P(A|B_i) P(B_i)$ |
| **Bayes\' Theorem** | Updating prior beliefs with new data | $P(A|B) = \\frac{P(B|A) P(A)}{P(B)} = \\frac{P(B|A) P(A)}{\\sum P(B|A_i) P(A_i)}$ |

### 2. Discrete Probability Distributions in AI

| Distribution | PMF Formula $P(X=k)$ | When to Use & Parameters |
| :--- | :--- | :--- |
| **Bernoulli** | $p^k (1-p)^{1-k} \\quad (k \\in \\{0, 1\\})$ | Single trial with binary outcome ($p = \\text{success rate}$) |
| **Binomial** | $\\binom{n}{k} p^k (1-p)^{n-k}$ | Number of successes $k$ in $n$ independent Bernoulli trials |
| **Poisson** | $\\frac{\\lambda^k e^{-\\lambda}}{k!}$ | Counting rare events in a fixed time/space interval ($\\lambda = \\text{rate}$) |
| **Geometric** | $(1-p)^{k-1} p$ | Number of independent trials until the 1st success occurs |
| **Categorical (Multinoulli)** | $\\prod_{i=1}^K p_i^{\\mathbb{I}(x=i)}$ | Multi-class classification label distributions (Softmax output) |

### 3. Continuous Probability Distributions in AI

| Distribution | PDF Formula $f(x)$ | Role & Use Case in Machine Learning |
| :--- | :--- | :--- |
| **Normal (Gaussian)** | $\\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$ | Natural noise modeling, weight initialization, VAE latent priors |
| **Exponential** | $\\lambda e^{-\\lambda x} \\quad (x \\ge 0)$ | Time between successive Poisson events, survival analysis |
| **Beta Distribution** | $\\frac{x^{\\alpha-1} (1-x)^{\\beta-1}}{B(\\alpha, \\beta)}$ | Prior over probabilities $p \\in [0, 1]$, Thompson Sampling in Multi-Armed Bandits |
| **Gamma Distribution** | $\\frac{\\beta^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha-1} e^{-\\beta x}$ | Waiting times, precision parameter priors in Bayesian inference |
| **Student\'s $t$** | $\\propto \\left(1 + \\frac{x^2}{\\nu}\\right)^{-\\frac{\\nu+1}{2}}$ | Heavy-tailed noise modeling, robust regression, small-sample inference |
| **Chi-Square ($\\chi^2$)** | Sum of $\\nu$ squared standard normals | Goodness-of-fit testing, feature independence tests |`,
          equations: [
            {
              latex: 'P(\\theta | D) = \\frac{P(D | \\theta) \\cdot P(\\theta)}{P(D)} = \\frac{P(D | \\theta) \\cdot P(\\theta)}{\\int P(D | \\theta\') P(\\theta\') d\\theta\'}',
              description: 'Bayes\' Theorem in continuous parameter form: Posterior = (Likelihood * Prior) / Evidence.'
            },
            {
              latex: '\\text{Cov}(X, Y) = E[(X - \\mu_X)(Y - \\mu_Y)] = E[XY] - E[X]E[Y], \\quad \\rho(X, Y) = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}',
              description: 'Covariance and Pearson Linear Correlation Coefficient.'
            }
          ],
          keyTakeaways: [
            'Bayes\' Theorem quantitatively updates prior probability beliefs in the presence of observed data evidence.',
            'PMFs specify discrete probabilities; PDFs must be integrated across an interval to obtain continuous probability.',
            'The Gaussian distribution maximizes Shannon entropy for a given mean and variance.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 14.2 — LLN, CLT & DESCRIPTIVE STATISTICS
    // ──────────────────────────────────────────────────────────
    {
      id: 'lln-clt-descriptive-statistics',
      title: '14.2 Law of Large Numbers, Central Limit Theorem & Descriptive Statistics',
      slug: 'lln-clt-descriptive-statistics',
      badge: 'Statistical Foundations',
      estimatedMinutes: 25,
      overview: 'Deconstruct the Law of Large Numbers (LLN), Central Limit Theorem (CLT), Measures of Central Tendency (Arithmetic, Geometric, Harmonic Mean), Dispersion (IQR, Variance), and Skewness/Kurtosis.',
      prerequisites: ['14.1 Probability Theory'],
      learningGoals: [
        'Prove the Law of Large Numbers (sample mean converges to population expectation as $n \\to \\infty$)',
        'Apply the Central Limit Theorem to construct asymptotic confidence intervals',
        'Select the appropriate measure of central tendency (Mean vs Median vs Harmonic Mean)',
        'Calculate Interquartile Range (IQR) for robust statistical outlier identification',
      ],
      analogy: {
        title: 'THE MULTI-DICE ROLL SYMPHONY ANALOGY',
        explanation: 'Rolling a single die gives an equal, flat uniform distribution: 1, 2, 3, 4, 5, 6 all have a $1/6$ chance (flat rectangle, not a bell curve). But if you roll 30 dice and average their scores, the extremes (all 1s or all 6s) are virtually impossible, while average scores cluster heavily in the middle (3.5). The **Central Limit Theorem** is the mathematical miracle showing that the average of 30 rolls of ANY wild distribution always morphs into a smooth, symmetrical Gaussian bell curve!',
        steps: [
          { number: 1, badge: 'Any Distribution', title: '1. Raw Population $X$', subtitle: 'Uniform, bimodal, or heavily skewed.', iconName: 'database' },
          { number: 2, badge: 'Sample Mean', title: '2. Average $n$ Samples', subtitle: 'Compute $\\bar{X}_n = \\frac{1}{n} \\sum x_i$.', iconName: 'filter' },
          { number: 3, badge: 'CLT Convergence', title: '3. Bell Curve Emergence', subtitle: '$\\bar{X}_n \\sim \\mathcal{N}(\\mu, \\sigma^2 / n)$ as $n > 30$.', iconName: 'cog' },
          { number: 4, badge: 'Standard Error', title: '4. Uncertainty Shrinks', subtitle: '$\\text{SE} = \\frac{\\sigma}{\\sqrt{n}}$ shrinks with sample size.', iconName: 'rocket' },
        ],
        connectors: ['Raw Data', 'Average $n$', 'CLT Bell Curve', 'Quantify Error'],
      },
      keyQuestions: [
        {
          question: 'When should I use Harmonic Mean instead of Arithmetic Mean in AI evaluation?',
          answer: 'Use the **Harmonic Mean** $H = \\frac{n}{\\sum 1/x_i}$ when averaging rates, ratios, or speeds (e.g. inference throughput in FPS, precision and recall in F1-Score). The Arithmetic Mean is biased toward high values and gives nonsensical results when averaging speed over a fixed distance.',
        },
        {
          question: 'How does the 1.5 × IQR rule identify statistical outliers?',
          answer: 'The Interquartile Range is $\\text{IQR} = Q_3 - Q_1$ (capturing the middle 50% of sorted data). Outliers are defined as points falling outside $[Q_1 - 1.5\\text{IQR}, Q_3 + 1.5\\text{IQR}]$. Because IQR relies on rank percentiles rather than sample mean and variance, it is completely immune to distortion by extreme anomalies.',
        },
      ],
      realWorldUses: [
        { industry: 'F1-Score in Machine Learning Classification', application: 'Uses the Harmonic Mean of Precision and Recall: $F_1 = 2 \\cdot \\frac{P \\cdot R}{P + R} = \\frac{2}{1/P + 1/R}$ so that if either precision or recall collapses to near zero, $F_1$ drops immediately.' },
        { industry: 'A/B Testing & Conversion Rate Sizing (Google / Meta)', application: 'Uses the Central Limit Theorem to calculate required sample size ($N \\approx 16 \\sigma^2 / \\Delta^2$) to detect a 1% lift in ad click-through rate with 80% statistical power.' },
      ],
      sections: [
        {
          id: 'descriptive-statistics-master-tables',
          title: 'Master Descriptive Statistics & Central Tendency Reference',
          subtitle: 'Formulas, Outlier Sensitivity, and Shape Metrics for Data Analysis',
          content: `### 1. Measures of Central Tendency

| Measure | Formula | Best For | Outlier Sensitive? |
| :--- | :--- | :--- | :--- |
| **Arithmetic Mean** | $\\bar{x} = \\frac{1}{n}\\sum x_i$ | Symmetric, bell-shaped distributions | **Yes** (a single extreme value distorts it) |
| **Median ($Q_2$)** | Middle value when sorted | Skewed data (salaries, latency) | **No (Robust)** |
| **Mode** | Most frequent value | Categorical / discrete data | **No** |
| **Geometric Mean** | $(\\prod x_i)^{1/n}$ | Compounded growth rates, multiplicative factors | Yes |
| **Harmonic Mean** | $\\frac{n}{\\sum (1/x_i)}$ | **Rates, speeds, ratios, F1-Score** | Yes |

### 2. Measures of Dispersion & Spread

| Measure | Formula | Data Science Interpretation & Use |
| :--- | :--- | :--- |
| **Range** | $\\max(x) - \\min(x)$ | Quick crude check; highly sensitive to single extreme outliers |
| **Sample Variance ($s^2$)** | $s^2 = \\frac{1}{n-1}\\sum (x_i - \\bar{x})^2$ | Average squared deviation (Bessel's correction $n-1$ for unbiased estimate) |
| **Standard Deviation ($s$)** | $s = \\sqrt{s^2}$ | Dispersion measured in the exact same physical units as the original data |
| **Interquartile Range (IQR)** | $\\text{IQR} = Q_3 - Q_1$ | **Robust spread of middle 50% data**; basis of Tukey Boxplot outlier fences |
| **Coefficient of Variation** | $\\text{CV} = \\frac{\\sigma}{\\mu}$ | Normalized dimensionless variability allowing comparison across different scales |

### 3. Distribution Shape Metrics
- **Skewness**: $S = \\frac{E[(X-\\mu)^3]}{\\sigma^3}$ ($>0$: Right-skewed tail; $<0$: Left-skewed tail; $0$: Symmetrical Gaussian).
- **Kurtosis**: $K = \\frac{E[(X-\\mu)^4]}{\\sigma^4}$ ($>3$: Leptokurtic / Heavy tails with frequent extreme outliers; $<3$: Platykurtic / Light tails).`,
          equations: [
            {
              latex: '\\bar{X}_n \\xrightarrow{P} \\mu \\quad \\text{as } n \\to \\infty \\quad (\\text{Law of Large Numbers})',
              description: 'Weak Law of Large Numbers proving sample mean convergence.'
            },
            {
              latex: '\\sqrt{n}\\left(\\bar{X}_n - \\mu\\right) \\xrightarrow{d} \\mathcal{N}(0, \\sigma^2) \\implies \\bar{X}_n \\sim \\mathcal{N}\\left(\\mu, \\frac{\\sigma^2}{n}\\right) \\quad (\\text{Central Limit Theorem})',
              description: 'Central Limit Theorem governing the sampling distribution of the mean.'
            }
          ],
          keyTakeaways: [
            'The Central Limit Theorem guarantees sample means become normally distributed for $n > 30$.',
            'Harmonic Mean is mandatory for averaging rates and speeds; Median is mandatory for skewed distributions.',
            'Bessel\'s correction divides by $n-1$ instead of $n$ to eliminate sample variance downward bias.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 14.3 — HYPOTHESIS TESTING & STATISTICAL TESTS
    // ──────────────────────────────────────────────────────────
    {
      id: 'hypothesis-testing-statistical-tests-master',
      title: '14.3 Hypothesis Testing & Master Statistical Test Selection Matrix',
      slug: 'hypothesis-testing-statistical-tests-master',
      badge: 'Hypothesis Testing',
      estimatedMinutes: 30,
      overview: 'Master Null Hypothesis Significance Testing (NHST), Type I vs Type II errors, statistical power, Parametric tests (t-test, ANOVA), Non-Parametric tests (Mann-Whitney, Kruskal-Wallis), and Effect Sizes (Cohen\'s d).',
      prerequisites: ['14.2 CLT & Descriptive Statistics'],
      learningGoals: [
        'Formulate null ($H_0$) and alternative ($H_1$) hypotheses and interpret $p$-values rigorously',
        'Navigate the master decision tree to select the exact appropriate parametric vs non-parametric test',
        'Calculate and report Effect Size (Cohen\'s d, $\\eta^2$, Odds Ratio) alongside $p$-values',
        'Differentiate Type I error ($\\alpha$) from Type II error ($\\beta$) and compute Statistical Power ($1-\\beta$)',
      ],
      analogy: {
        title: 'THE COURTROOM TRIAL VERDICT ANALOGY',
        explanation: 'Hypothesis testing is exactly like a criminal murder trial. The **Null Hypothesis ($H_0$)** is the presumption of innocence: "The defendant is innocent (no real performance gain)". The jury needs overwhelming evidence to convict. A **Type I Error (False Positive, $\\alpha=0.05$)** is convicting an innocent person. A **Type II Error (False Negative, $\\beta$)** is letting a guilty criminal walk free. "Failing to reject $H_0$" does NOT prove innocence—it simply means we lack sufficient evidence beyond reasonable doubt!',
        steps: [
          { number: 1, badge: 'Null Hypothesis', title: '1. State $H_0$ and $H_1$', subtitle: '$H_0: \\mu_A = \\mu_B$ vs $H_1: \\mu_A \\ne \\mu_B$.', iconName: 'database' },
          { number: 2, badge: 'Significance $\\alpha$', title: '2. Set $\\alpha = 0.05$', subtitle: 'Threshold of false alarm tolerance.', iconName: 'filter' },
          { number: 3, badge: 'Test Statistic', title: '3. Compute Test Statistic', subtitle: '$t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\text{SE}}$ or $F = \\frac{\\text{MS}_{between}}{\\text{MS}_{within}}$.', iconName: 'cog' },
          { number: 4, badge: 'Decision Rule', title: '4. $p < \\alpha \\implies$ Reject $H_0$', subtitle: 'Report $p$-value and Cohen\'s $d$ effect size.', iconName: 'rocket' },
        ],
        connectors: ['State $H_0$', 'Threshold $\\alpha$', 'Compute Statistic', 'Verdict & Effect'],
      },
      keyQuestions: [
        {
          question: 'Why is a tiny p-value (p < 0.001) meaningless without reporting Effect Size (Cohen\'s d)?',
          answer: 'With a massive dataset ($N = 1,000,000$), even a trivial, clinically meaningless improvement of $0.0001\\%$ will achieve $p < 0.000001$. Statistical significance ($p$-value) measures ONLY sample size certainty, NOT practical magnitude. Effect size (Cohen\'s $d$) measures the true magnitude of improvement independent of sample size.',
        },
        {
          question: 'When must I use Welch\'s t-test instead of Student\'s standard t-test?',
          answer: 'Student\'s standard $t$-test assumes equal population variances (homoscedasticity). If the variances of the two model benchmark groups are unequal (e.g. Model A variance is $3\\times$ Model B variance), standard $t$-test produces heavily inflated Type I false positives. **Welch\'s $t$-test** uses separate unpooled variance estimates, making it universally safer.',
        },
      ],
      realWorldUses: [
        { industry: 'Peer-Reviewed Conference Benchmark Submissions (NeurIPS / ICML)', application: 'Requires paired $t$-tests across 10 random seeds with Cohen\'s $d > 0.5$ to verify that proposed novel neural architecture gains are statistically authentic.' },
        { industry: 'Clinical Drug Trials (FDA Phase III Approval)', application: 'Requires two independent double-blind randomized clinical trials achieving $p < 0.025$ against placebo with documented hazard ratio effect sizes.' },
      ],
      sections: [
        {
          id: 'master-statistical-test-matrix-deep',
          title: 'Master Statistical Test Selection Matrix & Flowchart',
          subtitle: 'The Definitive Decision Guide for Parametric and Non-Parametric Scientific Testing',
          content: `### 1. Parametric Tests Reference Table (Assumes Normal Distribution)

| Parametric Test | Use Case & Number of Groups | Core Assumptions | Formula |
| :--- | :--- | :--- | :--- |
| **One-Sample $z$-test** | Compare sample mean to known population mean | $\\sigma$ known, large $n > 30$, normal | $z = \\frac{\\bar{x} - \\mu}{\\sigma / \\sqrt{n}}$ |
| **One-Sample $t$-test** | Compare sample mean to known constant | $\\sigma$ unknown, normal distribution | $t = \\frac{\\bar{x} - \\mu}{s / \\sqrt{n}}$ |
| **Independent $t$-test** | Compare means of 2 independent groups | Normal, equal variances (pooled) | $t = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_p \\sqrt{2/n}}$ |
| **Welch\'s $t$-test** | Compare means of 2 groups with **unequal variances** | Normal, unequal variances | $t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{s_1^2/n_1 + s_2^2/n_2}}$ |
| **Paired $t$-test** | Compare means of **paired / repeated** observations | Differences $d_i = x_{1i} - x_{2i}$ are normal | $t = \\frac{\\bar{d}}{s_d / \\sqrt{n}}$ |
| **One-Way ANOVA** | Compare means of **3 or more** groups | Normal, equal variances | $F = \\frac{\\text{MS}_{\\text{between}}}{\\text{MS}_{\\text{within}}}$ |
| **Two-Way ANOVA** | Compare means across 2 independent factors | Tests main factor effects + interaction | $F_{\\text{factor}}, F_{\\text{interaction}}$ |
| **Pearson Correlation ($r$)**| Measure linear relationship strength | Bivariate normal distribution | $r = \\frac{\\text{Cov}(X, Y)}{s_x s_y}$ |

### 2. Non-Parametric Tests (Distribution-Free / Skewed / Ordinal)

| Non-Parametric Test | Parametric Equivalent | When to Use & Properties |
| :--- | :--- | :--- |
| **Mann-Whitney $U$ Test** | Independent $t$-test | Two independent groups; non-normal, skewed, or ranked data |
| **Wilcoxon Signed-Rank** | Paired $t$-test | Two paired groups; evaluates median difference of ranks |
| **Kruskal-Wallis Test** | One-Way ANOVA | 3 or more independent groups; non-parametric rank sum |
| **Friedman Test** | Repeated Measures ANOVA | 3 or more paired groups measured repeatedly |
| **Spearman Correlation ($\\rho$)**| Pearson Correlation | Measures **monotonic** (non-linear) rank relationship |
| **Chi-Square ($\\chi^2$) Test** | None (Categorical) | Tests independence in $r \\times c$ contingency tables |
| **Shapiro-Wilk Test** | None (Normality Check) | Tests if a dataset is normally distributed ($n < 5000$) |

### 3. Master Effect Size Reference Table

| Effect Size Measure | Mathematical Formula | Interpretation Thresholds |
| :--- | :--- | :--- |
| **Cohen\'s $d$** | $d = \\frac{\\bar{x}_1 - \\bar{x}_2}{s_{\\text{pooled}}}$ | $0.2 = \\text{Small}, \\quad 0.5 = \\text{Medium}, \\quad 0.8 = \\text{Large}$ |
| **Eta-Squared ($\\eta^2$)** | $\\eta^2 = \\frac{\\text{SS}_{\\text{effect}}}{\\text{SS}_{\\text{total}}}$ | Proportion of total variance explained in ANOVA |
| **Coefficient of Determination ($R^2$)** | $R^2 = 1 - \\frac{\\text{SS}_{\\text{res}}}{\\text{SS}_{\\text{tot}}}$ | Proportion of response variance predicted by regression model |
| **Odds Ratio (OR)** | $\\text{OR} = \\frac{a \\cdot d}{b \\cdot c}$ | Relative odds in $2 \\times 2$ epidemiological contingency tables |`,
          decisionTree: {
            title: 'Decision Tree: Master Statistical Test Selector',
            description: 'Determine the exact statistical significance test based on data type, groups, pairing, and normality.',
            root: {
              id: 'root',
              question: 'What is the data modality of your evaluation metric?',
              yes: {
                id: 'categorical-data',
                question: 'Are sample sizes in contingency cells large (all cell counts ≥ 5)?',
                yes: {
                  id: 'chi-sq',
                  question: 'Chi-Square (χ²) Test of Independence',
                  answer: 'Use Pearson Chi-Square Test to evaluate independence between categorical variables.',
                  badge: 'Chi-Square ✓',
                },
                no: {
                  id: 'fisher-exact',
                  question: 'Fisher\'s Exact Test',
                  answer: 'Use Fisher\'s Exact Test for 2x2 contingency tables with small cell sample sizes (< 5).',
                  badge: 'Fisher\'s Exact ✓',
                },
              },
              no: {
                id: 'continuous-data',
                question: 'Does the data pass the Shapiro-Wilk normality test (p > 0.05)?',
                yes: {
                  id: 'parametric-path',
                  question: 'How many model benchmark groups are being compared?',
                  yes: {
                    id: 'paired-check',
                    question: 'Are the two model evaluations paired on the same benchmark test samples/seeds?',
                    yes: {
                      id: 'paired-t',
                      question: 'Paired Student\'s t-test',
                      answer: 'Use Paired t-test on difference scores (high statistical power for paired benchmark runs).',
                      badge: 'Paired t-test ✓',
                    },
                    no: {
                      id: 'welch-t',
                      question: 'Welch\'s Two-Sample t-test',
                      answer: 'Use Welch\'s t-test for independent groups with potentially unequal variances.',
                      badge: 'Welch\'s t-test ✓',
                    },
                  },
                  no: {
                    id: 'anova-test',
                    question: 'One-Way ANOVA with Tukey HSD Post-Hoc',
                    answer: 'Use One-Way ANOVA across 3+ architectures, followed by Tukey HSD for pairwise differences.',
                    badge: 'ANOVA ✓',
                  },
                },
                no: {
                  id: 'non-parametric-path',
                  question: 'Are the non-normal model evaluations paired across the same datasets?',
                  yes: {
                    id: 'wilcoxon-test',
                    question: 'Wilcoxon Signed-Rank Test',
                    answer: 'Use Wilcoxon Signed-Rank test for paired non-normal benchmark score comparisons.',
                    badge: 'Wilcoxon Signed-Rank ✓',
                  },
                  no: {
                    id: 'mann-whitney',
                    question: 'Mann-Whitney U Test (Wilcoxon Rank-Sum)',
                    answer: 'Use Mann-Whitney U test for comparing two independent non-normally distributed populations.',
                    badge: 'Mann-Whitney U ✓',
                  },
                },
              },
            },
          },
          equations: [
            {
              latex: 't = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}}, \\quad \\nu = \\frac{\\left(\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}\\right)^2}{\\frac{(s_1^2/n_1)^2}{n_1 - 1} + \\frac{(s_2^2/n_2)^2}{n_2 - 1}} \\quad (\\text{Welch-Satterthwaite Equation})',
              description: 'Welch\'s t-test statistic and unpooled degrees of freedom calculation.'
            },
            {
              latex: 'd = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{(n_1-1)s_1^2 + (n_2-1)s_2^2}{n_1 + n_2 - 2}}} \\quad (\\text{Cohen\'s } d)',
              description: 'Cohen\'s d standardized mean difference effect size.'
            }
          ],
          keyTakeaways: [
            'Always verify normality (Shapiro-Wilk) and equal variance (Levene\'s) before selecting parametric tests.',
            'Welch\'s t-test is strictly safer than standard Student\'s t-test when variances differ.',
            'Always report Effect Size (Cohen\'s d) alongside p-values to demonstrate practical real-world significance.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 14.4 — BAYESIAN VS FREQUENTIST INFERENCE & MCMC
    // ──────────────────────────────────────────────────────────
    {
      id: 'bayesian-vs-frequentist-mcmc',
      title: '14.4 Bayesian vs Frequentist Inference & MCMC Algorithms',
      slug: 'bayesian-vs-frequentist-mcmc',
      badge: 'Bayesian Inference',
      estimatedMinutes: 25,
      overview: 'Compare Frequentist point estimates with Bayesian posterior distributions, Prior selection (Conjugate, Jeffreys), and computational sampling algorithms (MCMC Metropolis-Hastings, Gibbs Sampling, Variational Inference).',
      prerequisites: ['14.1 Probability Theory', '13.5 Numerical Methods'],
      learningGoals: [
        'Contrast Frequentist parameters (fixed constants) with Bayesian parameters (random variables with distributions)',
        'Differentiate 95% Confidence Intervals from 95% Credible Intervals',
        'Select appropriate Priors (Conjugate, Informative, Weakly Informative, Jeffreys)',
        'Understand Markov Chain Monte Carlo (MCMC Metropolis-Hastings) and Variational Inference (VI)',
      ],
      analogy: {
        title: 'THE FIXED TREASURE VS PROBABILITY CLOUD ANALOGY',
        explanation: 'Imagine searching for sunken pirate gold in the ocean. The **Frequentist** believes the treasure sits at ONE exact fixed coordinate $(x, y)$ — they take 100 boat scans to compute a 95% Confidence Interval (meaning if they repeated the 100-scan survey 100 times, 95 of the resulting boundary boxes would trap the fixed chest). The **Bayesian** treats the treasure location itself as a probability cloud $P(x, y | \\text{Sonar})$: after observing sonar scans, they state with 95% certainty that the gold is inside this specific perimeter.',
        steps: [
          { number: 1, badge: 'Prior $P(\\theta)$', title: '1. Prior Selection', subtitle: 'Conjugate Beta/Normal or Weakly Informative.', iconName: 'database' },
          { number: 2, badge: 'Likelihood', title: '2. Likelihood Function', subtitle: 'Observe sample data $P(\\text{Data}|\\theta)$.', iconName: 'filter' },
          { number: 3, badge: 'MCMC Sampling', title: '3. Metropolis-Hastings / HMC', subtitle: 'Sample posterior without computing intractable denominator.', iconName: 'cog' },
          { number: 4, badge: 'Credible Interval', title: '4. Posterior Summary', subtitle: '95% Credible Interval & Highest Density Region.', iconName: 'rocket' },
        ],
        connectors: ['Prior', 'Observe Data', 'MCMC Walk', 'Posterior Cloud'],
      },
      keyQuestions: [
        {
          question: 'What is the true difference between a 95% Confidence Interval and a 95% Credible Interval?',
          answer: 'A **Frequentist 95% Confidence Interval** means: If we repeat the experiment infinitely many times, 95% of the calculated intervals will contain the true fixed parameter. (You CANNOT say there is a 95% chance the parameter is in this specific interval). A **Bayesian 95% Credible Interval** means: Given the observed data and prior, there is a true 95% probability that the parameter lies within this exact interval.',
        },
        {
          question: 'Why is the Bayesian marginal likelihood denominator $\\int P(D|\\theta) P(\\theta) d\\theta$ intractable in high dimensions?',
          answer: 'In a model with $d=100$ parameters, numerical grid integration requires evaluating $10^{100}$ points (more than atoms in the universe!). **MCMC (Markov Chain Monte Carlo)** and **Variational Inference** bypass this integral completely by constructing a Markov chain whose stationary distribution is the exact posterior $P(\\theta|D)$.',
        },
      ],
      realWorldUses: [
        { industry: 'Bayesian Neural Networks & Epistemic Uncertainty', application: 'Places probability distributions over neural network weights $W \\sim \\mathcal{N}(\\mu, \\sigma^2)$, allowing autonomous driving systems to output "I do not know" on unfamiliar sensor inputs.' },
        { industry: 'Bayesian Hyperparameter Optimization (Optuna / BoTorch)', application: 'Uses Gaussian Processes with Expected Improvement (EI) acquisition functions to find optimal learning rates and network architectures in 10x fewer training runs.' },
      ],
      sections: [
        {
          id: 'frequentist-vs-bayesian-deep',
          title: 'Frequentist vs Bayesian Paradigms & Computational MCMC',
          subtitle: 'The Core Philosophical and Computational Divide in Scientific Statistics',
          content: `### 1. Core Philosophical & Methodological Differences

| Aspect | Frequentist Statistics | Bayesian Statistics |
| :--- | :--- | :--- |
| **Probability Definition** | Long-run frequency of repeatable events | **Degree of belief / quantified certainty** |
| **Parameters ($\\theta$)** | **Fixed, unknown constants** | **Random variables governed by distributions** |
| **Data ($D$)** | Random sample generated from population | Fixed, observed evidence |
| **Primary Goal** | Minimize long-run error rates (Type I/II) | Update parameter beliefs in light of observed data |
| **Output** | Point estimates ($\\hat{\\theta}$), $p$-values, Confidence Intervals | **Full Posterior Distribution $P(\\theta|D)$**, Credible Intervals |
| **Prior Knowledge** | Not formally incorporated into likelihood | **Formally integrated via Prior $P(\\theta)$** |

### 2. Prior Types in Bayesian Modeling

| Prior Type | Mathematical Description | Best For |
| :--- | :--- | :--- |
| **Uniform (Flat Prior)** | $P(\\theta) = c$ (all values equally likely) | Objective analysis when zero prior knowledge exists |
| **Conjugate Prior** | Prior + Likelihood $\\to$ Posterior in same family | **Analytical closed-form solutions (Beta-Binomial, Normal-Normal)** |
| **Informative Prior** | Gaussian / Beta based on historical literature | Small sample regimes with strong domain literature |
| **Weakly Informative** | Broad distribution with reasonable physical bounds | **Default modern Bayesian standard (Stan / PyMC)** |
| **Jeffreys Prior** | Invariant under coordinate reparameterization | Objective invariant Bayesian estimation |

### 3. Computational Bayesian Sampling Methods

| Method | Mathematical Mechanism | Strengths & Best For |
| :--- | :--- | :--- |
| **Conjugate Priors** | Analytical algebraic formulas | Simple 1-parameter models, blazing fast exact solutions |
| **Laplace Approximation** | 2nd-order Taylor expansion Gaussian around MAP | Fast mode estimation in moderate complexity nets |
| **Metropolis-Hastings (MCMC)**| Random-walk acceptance probability $\\min(1, \\alpha)$ | General posterior sampling without normalizing constant |
| **Gibbs Sampling** | Sequentially samples each parameter conditioned on rest | Latent Dirichlet Allocation (LDA) topic models |
| **Hamiltonian Monte Carlo (HMC)**| Uses gradient information of loss to glide along posterior | **High-dimensional Bayesian inference (Stan, PyMC)** |
| **Variational Inference (VI)** | Optimizes Gaussian $q(\\theta)$ to minimize $D_{KL}(q \\parallel P)$ | **Large-scale Deep Learning (Variational Autoencoders)** |`,
          comparisonGrid: {
            title: 'When to Use Frequentist vs Bayesian Inference',
            columns: [
              {
                title: 'Frequentist Methods',
                subtitle: 'Standard NHST & Likelihood',
                color: 'sky',
                badge: 'Objective & Fast',
                items: [
                  { label: 'Sample Regime', value: 'Large sample sizes ($N > 10,000$)' },
                  { label: 'Compute Cost', value: 'Very fast (closed form / standard optimization)' },
                  { label: 'Regulatory Fit', value: 'Accepted universally across FDA, FTC, and courts', highlight: true },
                  { label: 'Prior Requirement', value: 'Zero prior specification required' },
                ],
                verdict: 'Best for standard benchmark comparisons and large datasets',
              },
              {
                title: 'Bayesian Methods',
                subtitle: 'Probabilistic Posteriors & MCMC',
                color: 'violet',
                badge: 'Uncertainty SOTA',
                items: [
                  { label: 'Sample Regime', value: 'Small samples ($N < 50$) where priors prevent overfitting' },
                  { label: 'Compute Cost', value: 'Computationally intensive (MCMC sampling)' },
                  { label: 'Uncertainty', value: 'Full probability distribution over predictions', highlight: true },
                  { label: 'Domain Priors', value: 'Seamlessly incorporates expert physics priors' },
                ],
                verdict: '✓ Best for safety-critical uncertainty & small datasets',
              },
            ],
          },
          equations: [
            {
              latex: 'P(\\theta | D) = \\frac{P(D | \\theta) P(\\theta)}{\\int P(D | \\theta) P(\\theta) d\\theta} \\propto P(D | \\theta) P(\\theta) \\quad (\\text{Posterior } \\propto \\text{Likelihood} \\times \\text{Prior})',
              description: 'Bayesian inference formula.'
            },
            {
              latex: '\\alpha = \\min\\left(1, \\frac{P(D | \\theta^*) P(\\theta^*) q(\\theta^{(t)} | \\theta^*)}{P(D | \\theta^{(t)}) P(\\theta^{(t)}) q(\\theta^* | \\theta^{(t)})}\\right) \\quad (\\text{Metropolis-Hastings Acceptance Ratio})',
              description: 'Metropolis-Hastings MCMC transition acceptance probability.'
            }
          ],
          keyTakeaways: [
            'Frequentist parameters are fixed constants; Bayesian parameters are random variables with distributions.',
            'Conjugate priors produce closed-form analytical posteriors (e.g. Beta prior + Binomial data = Beta posterior).',
            'MCMC and Variational Inference allow sampling high-dimensional posteriors without computing the intractable denominator.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 14.5 — INFORMATION THEORY
    // ──────────────────────────────────────────────────────────
    {
      id: 'information-theory-entropy-kl-divergence',
      title: '14.5 Information Theory: Shannon Entropy, Mutual Information & KL Divergence',
      slug: 'information-theory-entropy-kl-divergence',
      badge: 'Information Theory',
      estimatedMinutes: 25,
      overview: 'Deconstruct Shannon Entropy, Binary Entropy, Joint and Conditional Entropy, Mutual Information, Forward vs Reverse KL Divergence, and Cross-Entropy loss in deep learning.',
      prerequisites: ['14.1 Probability Theory'],
      learningGoals: [
        'Calculate Shannon Entropy $H(X) = -\\sum P(x) \\log_2 P(x)$ as the fundamental limit of uncertainty and compression',
        'Derive Cross-Entropy loss $H(P, Q) = H(P) + D_{KL}(P \\parallel Q)$ and connect it to Maximum Likelihood',
        'Compare Forward KL Divergence (mean-seeking) with Reverse KL Divergence (mode-seeking)',
        'Compute Mutual Information $I(X; Y)$ for non-linear feature selection',
      ],
      analogy: {
        title: 'THE TWENTY QUESTIONS GUESSING GAME ANALOGY',
        explanation: 'Imagine playing 20 Questions to guess an animal. If you ask "Is it an elephant?", a "No" gives you almost zero new information. But if you ask "Is it a mammal?", a "Yes/No" splits the animal kingdom in half, eliminating $50\\%$ of uncertainty. **Shannon Entropy** $H(X)$ measures the minimum number of optimal Yes/No questions needed on average to guess the outcome. A coin with 99% heads has near-zero entropy (predictable, $H \\approx 0.08$ bits); a fair coin has maximum entropy ($H = 1.0$ bit).',
        steps: [
          { number: 1, badge: 'Probability $P(x)$', title: '1. Probability Distribution', subtitle: 'Certainty of discrete events $x \\in X$.', iconName: 'database' },
          { number: 2, badge: 'Surprise $I(x)$', title: '2. Self-Information', subtitle: '$I(x) = -\\log_2 P(x)$ (rare events carry high surprise).', iconName: 'filter' },
          { number: 3, badge: 'Entropy $H(X)$', title: '3. Average Uncertainty', subtitle: '$H(X) = -\\sum P(x) \\log_2 P(x)$ bits.', iconName: 'cog' },
          { number: 4, badge: 'KL Divergence', title: '4. Distribution Distance', subtitle: '$D_{KL}(P \\parallel Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$.', iconName: 'rocket' },
        ],
        connectors: ['Probability', 'Self-Information', 'Entropy $H(X)$', 'KL Divergence'],
      },
      keyQuestions: [
        {
          question: 'Why is Cross-Entropy Loss mathematically identical to minimizing KL Divergence in classification?',
          answer: 'The identity states: $H(P, Q) = H(P) + D_{KL}(P \\parallel Q)$, where $P$ is the true one-hot ground-truth label distribution and $Q$ is the model\'s predicted softmax distribution. Because the true dataset labels are fixed constants, their entropy $H(P) = 0$. Therefore, minimizing Cross-Entropy Loss $\\min_w H(P, Q)$ is mathematically identical to minimizing the KL Divergence $\\min_w D_{KL}(P \\parallel Q)$!',
        },
        {
          question: 'What is the difference between Forward KL and Reverse KL Divergence?',
          answer: '**Forward KL** ($D_{KL}(P \\parallel Q) = \\int P \\log \\frac{P}{Q}$): **Mean-seeking / Mode-covering**. If $P$ has two distinct modes, $Q$ spreads wide to cover both modes to avoid infinite penalty where $P > 0$ and $Q \\approx 0$. **Reverse KL** ($D_{KL}(Q \\parallel P) = \\int Q \\log \\frac{Q}{P}$): **Mode-seeking**. $Q$ locks onto a single peak of $P$ and ignores the other to guarantee $Q=0$ wherever $P=0$. Reverse KL is the foundation of Variational Autoencoders (ELBO) and RLHF / DPO in LLMs.',
        },
      ],
      realWorldUses: [
        { industry: 'Decision Tree Splitting (ID3 & C4.5 Information Gain)', application: 'Computes Mutual Information $I(X; Y) = H(Y) - H(Y|X)$ (Information Gain) to select the optimal feature threshold that maximizes target purity.' },
        { industry: 'Reinforcement Learning from Human Feedback (RLHF & DPO in LLMs)', application: 'Adds a Reverse KL penalty $D_{KL}(\\pi_\\theta \\parallel \\pi_{\\text{ref}})$ to prevent the aligned language model from drifting too far from the base model distribution (mode-seeking collapse).' },
      ],
      sections: [
        {
          id: 'information-theory-master-reference',
          title: 'Master Information Theory Formulas & Properties',
          subtitle: 'Entropy, Mutual Information, Cross-Entropy, and Divergence Measures',
          content: `### 1. Master Information Theory Concepts

| Concept | Mathematical Formula | Core Meaning & Machine Learning Role |
| :--- | :--- | :--- |
| **Self-Information (Surprise)** | $I(x) = -\\log_2 P(x)$ | Rare events carry high information bits; guaranteed events carry 0 bits |
| **Shannon Entropy** | $H(X) = -\\sum_{x} P(x) \\log_2 P(x)$ | Average uncertainty / theoretical minimum compression bit-rate |
| **Binary Entropy** | $H(p) = -p \\log_2 p - (1-p) \\log_2(1-p)$ | Uncertainty in a single Bernoulli coin with success rate $p$ |
| **Joint Entropy** | $H(X, Y) = -\\sum_{x, y} P(x, y) \\log_2 P(x, y)$ | Total combined uncertainty in two random variables |
| **Conditional Entropy** | $H(Y|X) = H(X, Y) - H(X)$ | Remaining uncertainty in $Y$ after observing feature $X$ |
| **Mutual Information** | $I(X; Y) = H(X) + H(Y) - H(X, Y)$ | Reduction in uncertainty about $Y$ gained from knowing $X$ (Non-linear correlation) |
| **KL Divergence (Relative Entropy)**| $D_{KL}(P \\parallel Q) = \\sum P(x) \\log \\frac{P(x)}{Q(x)}$ | Inefficiency of encoding true distribution $P$ using model distribution $Q$ |
| **Cross-Entropy** | $H(P, Q) = -\\sum P(x) \\log Q(x)$ | Expected surprise when true data comes from $P$ but modeled via $Q$ |

### 2. Properties of KL Divergence ($D_{KL}(P \\parallel Q)$)
1. **Non-Negative**: $D_{KL}(P \\parallel Q) \\ge 0$, with equality $D_{KL} = 0$ if and only if $P = Q$ almost everywhere (Gibbs\' Inequality).
2. **Asymmetric**: $D_{KL}(P \\parallel Q) \\ne D_{KL}(Q \\parallel P)$ (KL Divergence is **NOT a true mathematical distance metric** because it violates symmetry and the triangle inequality).
3. **Cross-Entropy Decomposition**:
$$H(P, Q) = H(P) + D_{KL}(P \\parallel Q)$$`,
          comparisonGrid: {
            title: 'Forward KL vs Reverse KL Divergence',
            columns: [
              {
                title: 'Forward KL: $D_{KL}(P \\parallel Q)$',
                subtitle: 'Mean-Seeking / Mode Covering',
                color: 'sky',
                badge: 'Zero-Avoiding',
                items: [
                  { label: 'Penalty', value: 'Massive penalty if $P(x) > 0$ while $Q(x) \\approx 0$' },
                  { label: 'Behavior', value: 'Forces $Q$ to spread wide and cover all modes of $P$', highlight: true },
                  { label: 'Failure Mode', value: 'Places probability mass in low-density valleys between peaks' },
                  { label: 'Use Case', value: 'Maximum Likelihood Estimation (MLE), expectation propagation' },
                ],
                verdict: 'Best when missing any true mode is unacceptable',
              },
              {
                title: 'Reverse KL: $D_{KL}(Q \\parallel P)$',
                subtitle: 'Mode-Seeking / Zero Forcing',
                color: 'violet',
                badge: 'Mode-Focusing',
                items: [
                  { label: 'Penalty', value: 'Massive penalty if $Q(x) > 0$ while $P(x) \\approx 0$' },
                  { label: 'Behavior', value: 'Forces $Q$ to zero wherever $P$ is zero, locking onto a single mode', highlight: true },
                  { label: 'Failure Mode', value: 'May completely ignore other valid multi-modal peaks' },
                  { label: 'Use Case', value: 'Variational Inference (ELBO), RLHF & DPO alignment in LLMs' },
                ],
                verdict: '✓ Standard for VAEs, Diffusion, and LLM alignment',
              },
            ],
          },
          equations: [
            {
              latex: 'I(X; Y) = D_{KL}(P(X, Y) \\parallel P(X)P(Y)) = \\sum_{x, y} P(x, y) \\log \\frac{P(x, y)}{P(x)P(y)}',
              description: 'Mutual Information expressed as KL divergence from the joint distribution to the product of marginals.'
            },
            {
              latex: '\\mathcal{L}_{\\text{Cross-Entropy}} = -\\sum_{i=1}^C y_i \\log(\\hat{y}_i) = -\\log(\\hat{y}_{\\text{true}})',
              description: 'Standard Categorical Cross-Entropy loss for classification.'
            }
          ],
          keyTakeaways: [
            'Shannon Entropy quantifies the fundamental theoretical limit of information content and compression.',
            'Cross-Entropy equals True Entropy plus KL Divergence: $H(P, Q) = H(P) + D_{KL}(P \\parallel Q)$.',
            'Forward KL is mean-seeking (covers all modes), whereas Reverse KL is mode-seeking (locks onto primary peaks).',
          ],
        },
      ],
    },
  ],
};
