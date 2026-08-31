import { Module } from '@/types';

export const csResultAnalysisModule: Module = {
  id: 'result-analysis',
  number: 5,
  title: 'Result Analysis & Evaluation',
  subtitle: 'Metric Mathematics, Domain-Specific Evaluation Criteria & Statistical Significance Testing',
  iconName: 'LineChart',
  color: '#d97706', // Amber
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 5.1 — WHAT EACH METRIC MEANS
    // ──────────────────────────────────────────────────────────
    {
      id: 'metric-meanings-formulas',
      title: '5.1 What Each Metric Means (Formula & Use Cases)',
      slug: 'metric-meanings-formulas',
      badge: 'Metric Fundamentals',
      estimatedMinutes: 25,
      overview: 'Deconstruct the exact mathematical definitions, failure modes, and valid operating regimes for Accuracy, Precision, Recall, F1, AUC-ROC, AUC-PR, MAE, RMSE, R², BLEU, and Perplexity.',
      prerequisites: ['Basic Probability', 'Calculus'],
      learningGoals: [
        'Understand the mathematical formulations of all major classification and regression metrics',
        'Recognize why Accuracy and AUC-ROC are dangerously misleading on imbalanced datasets',
        'Select the exact right metric for safety-critical, business, or generative AI research',
        'Interpret Confusion Matrices, ROC Curves, and Precision-Recall Curves correctly',
      ],
      analogy: {
        title: 'THE SPECIALIZED MEASURING TOOLS ANALOGY',
        explanation: 'Using the wrong metric is like using a bathroom scale to measure the thickness of a gold coin (Accuracy on 99.9% negative fraud data — reads "zero difference" even if fraud is missed). A medical thermometer (Recall) detects fever even if it causes a few false alarms. A jeweler\'s precision laser (Precision) verifies that every confirmed gemstone is 100% genuine. Matching the measuring instrument to the scientific goal is essential for scientific integrity.',
        steps: [
          { number: 1, badge: 'Target Profile', title: '1. Class Distribution', subtitle: 'Balanced (50:50) vs Imbalanced (99:1).', iconName: 'filter' },
          { number: 2, badge: 'Cost Matrix', title: '2. Error Cost Asymmetry', subtitle: 'Is False Negative deadlier than False Positive?', iconName: 'search' },
          { number: 3, badge: 'Instrument', title: '3. Metric Selection', subtitle: 'AUC-PR, F2, RMSE, or Perplexity.', iconName: 'cog' },
          { number: 4, badge: 'Calibration', title: '4. Threshold Tuning', subtitle: 'Optimize operating point on PR curve.', iconName: 'cpu' },
          { number: 5, badge: 'Publication', title: '5. Statistical Reporting', subtitle: 'Mean ± CI with significance test.', iconName: 'rocket' },
        ],
        connectors: ['Profile', 'Assess Cost', 'Select Metric', 'Calibrate'],
      },
      keyQuestions: [
        {
          question: 'Why is Accuracy completely useless on imbalanced datasets?',
          answer: 'On a dataset with 99% negative cases (e.g. 1% cancer incidence), a dumb classifier that outputs "negative" for every patient achieves 99.0% accuracy while having 0.0% Recall (missing 100% of cancer patients). Accuracy measures the majority class dominant prevalence, not predictive power.',
        },
        {
          question: 'When should I use AUC-PR instead of AUC-ROC?',
          answer: 'Use AUC-PR whenever you have significant class imbalance (>10:1 negative-to-positive ratio). AUC-ROC evaluates False Positive Rate (FP / N), which is diluted into insignificance when the number of true negatives N is enormous. AUC-PR evaluates Precision (TP / (TP+FP)), directly penalizing false alarms regardless of negative class volume.',
        },
        {
          question: 'What is the difference between RMSE and MAE in regression?',
          answer: 'MAE penalizes all errors linearly (|y - ŷ|), making it robust to outliers. RMSE squares the error ((y - ŷ)²), meaning a single large blunder of 10 units is penalized 100x more than an error of 1 unit. Use RMSE when large errors are disproportionately catastrophic (e.g. structural load predictions).',
        },
      ],
      realWorldUses: [
        { industry: 'Cancer Screening & Radiology (Epic / Mayo Clinic)', application: 'Optimizes for high Recall (Sensitivity ≥ 98%) at acceptable Specificity to guarantee malignant tumors are never missed, accepting secondary confirmatory biopsies.' },
        { industry: 'Email Phishing & Spam Filters (Gmail / Outlook)', application: 'Optimizes for ultra-high Precision (≥ 99.9%) because a False Positive (important job offer routed to spam) is far more damaging than a missed spam email.' },
        { industry: 'Autonomous Emergency Braking (Waymo / Tesla)', application: 'Requires high Recall under strict P99 latency limits (<20ms), where a False Negative results in collision.' },
      ],
      sections: [
        {
          id: 'master-metrics-table',
          title: 'Master Evaluation Metric Reference',
          subtitle: 'The Exact Mathematical Formulations and When Each Metric is Valid vs Misleading',
          interactiveWidget: 'confusion-matrix',
          content: `Reporting the wrong metric is the fastest way to draw false conclusions in research.

### Master Metric Reference Table

| Metric | Mathematical Definition | When to Use | When It is Misleading / Failure Mode |
| :--- | :--- | :--- | :--- |
| **Accuracy** | $\\frac{TP + TN}{TP + TN + FP + FN}$ | Balanced class distributions with equal error costs | **Highly misleading on imbalanced data** (dummy model gets 99% accuracy on 1% prevalence) |
| **Precision** | $\\frac{TP}{TP + FP}$ | When False Positives are catastrophic (spam, fraud blocking) | Completely ignores False Negatives (missed cases) |
| **Recall (Sensitivity)** | $\\frac{TP}{TP + FN}$ | When False Negatives are fatal (cancer screening, pedestrian detection) | Model predicting "positive" for everything gets 100% recall |
| **F1-Score** | $2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}$ | Balancing Precision and Recall on moderately imbalanced datasets | Treats False Positives and False Negatives with equal weight |
| **AUC-ROC** | Integral of TPR vs FPR curve | Evaluating ranking quality across all classification thresholds | Overly optimistic on severely imbalanced datasets ($>99:1$) |
| **AUC-PR** | Area under Precision-Recall Curve | **Severely imbalanced datasets** (fraud, rare disease detection) | Baseline changes with class prevalence $\\frac{P}{P+N}$ |
| **MAE** | $\\frac{1}{N} \\sum |y_i - \\hat{y}_i|$ | Standard regression with robust uniform error scaling | Non-differentiable at $0$; does not heavily penalize rare catastrophic blunders |
| **RMSE** | $\\sqrt{\\frac{1}{N} \\sum (y_i - \\hat{y}_i)^2}$ | Regression where large outlier errors must be heavily penalized | Sensitive to corrupted data outliers |
| **$R^2$ Score** | $1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}$ | Measuring percentage of variance explained by model over the mean | Can be negative for models worse than predicting the mean |
| **BLEU / ROUGE** | $n$-gram precision/recall overlap with human reference | Fast automated NLP translation and summarization benchmarks | Does not measure factual correctness, semantic coherence, or reasoning validity |
| **Perplexity (PPL)** | $\\exp\\left( -\\frac{1}{N}\\sum \\log P(w_i|w_{<i}) \\right)$ | Autoregressive language model evaluation; lower is better | Sensitive to vocabulary tokenizer; cannot compare across different tokenizers |`,
          decisionTree: {
            title: 'Decision Tree: Which Evaluation Metric Should You Use?',
            description: 'Select the exact mathematically appropriate metric based on your task type and class balance.',
            root: {
              id: 'root',
              question: 'Is your research task Classification or Regression?',
              yes: {
                id: 'class-branch',
                question: 'Is your dataset severely imbalanced (minority class < 10%)?',
                yes: {
                  id: 'imbalanced-choice',
                  question: 'Is False Negative deadlier than False Positive (e.g. disease screening)?',
                  yes: {
                    id: 'recall-aucpr',
                    question: 'AUC-PR & F2-Score (Weighted Recall)',
                    answer: 'Use Area Under Precision-Recall Curve (AUC-PR) and F2-score to prioritize sensitivity without inflation from true negatives.',
                    badge: 'AUC-PR / F2 ✓',
                  },
                  no: {
                    id: 'precision-aucpr',
                    question: 'AUC-PR & F0.5-Score (Weighted Precision)',
                    answer: 'Use Precision-Recall Curve and F0.5-score to heavily penalize false alarms in rare-event detection.',
                    badge: 'AUC-PR / F0.5 ✓',
                  },
                },
                no: {
                  id: 'balanced-choice',
                  question: 'Standard Balanced Classification (F1 & AUC-ROC)',
                  answer: 'Use macro-averaged F1-score and AUC-ROC. Standard Accuracy is acceptable only if classes are strictly 50:50.',
                  badge: 'F1 / AUC-ROC ✓',
                },
              },
              no: {
                id: 'regression-branch',
                question: 'Do large outlier errors have severe catastrophic non-linear consequences?',
                yes: {
                  id: 'rmse-metric',
                  question: 'Root Mean Squared Error (RMSE) & R²',
                  answer: 'RMSE squares errors, heavily penalizing large blunders. Report alongside R² explained variance.',
                  badge: 'RMSE / R² ✓',
                },
                no: {
                  id: 'mae-metric',
                  question: 'Mean Absolute Error (MAE) & Median Absolute Error',
                  answer: 'MAE penalizes errors linearly and is robust to occasional corrupt data points.',
                  badge: 'MAE / MedAE ✓',
                },
              },
            },
          },
          comparisonGrid: {
            title: 'Classification Metric Diagnostic Comparison',
            columns: [
              {
                title: 'Accuracy',
                subtitle: 'Fraction Correct',
                color: 'slate',
                badge: 'Equal Classes Only',
                items: [
                  { label: 'Formula', value: '(TP + TN) / (All Samples)' },
                  { label: 'Fatal Flaw', value: 'Overlooks minority class entirely on imbalanced data' },
                  { label: 'Valid When', value: 'Classes are strictly balanced (50:50)' },
                ],
                verdict: 'Never use on imbalanced data',
              },
              {
                title: 'Precision',
                subtitle: 'Quality of Positives',
                color: 'sky',
                badge: 'Minimizes False Positives',
                items: [
                  { label: 'Formula', value: 'TP / (TP + FP)' },
                  { label: 'Fatal Flaw', value: 'Ignores missed positive cases (FN)' },
                  { label: 'Valid When', value: 'False alarms carry severe penalty (spam, bans)' },
                ],
                verdict: '✓ When False Positives are costly',
              },
              {
                title: 'Recall (Sensitivity)',
                subtitle: 'Quantity of Positives',
                color: 'emerald',
                badge: 'Minimizes False Negatives',
                items: [
                  { label: 'Formula', value: 'TP / (TP + FN)' },
                  { label: 'Fatal Flaw', value: 'Ignores false alarm count' },
                  { label: 'Valid When', value: 'Missing a case is fatal (cancer, safety)' },
                ],
                verdict: '✓ When False Negatives are fatal',
              },
              {
                title: 'AUC-PR',
                subtitle: 'Area Under PR Curve',
                color: 'amber',
                badge: 'Imbalance Champion',
                items: [
                  { label: 'Formula', value: 'Integral of Precision vs Recall' },
                  { label: 'Strength', value: 'Unaffected by massive True Negative counts', highlight: true },
                  { label: 'Valid When', value: 'Fraud, rare diseases, defect detection' },
                ],
                verdict: '✓ Gold standard for imbalanced AI',
              },
            ],
          },
          equations: [
            {
              latex: 'F_\\beta = (1 + \\beta^2) \\frac{\\text{Precision} \\cdot \\text{Recall}}{(\\beta^2 \\cdot \\text{Precision}) + \\text{Recall}}',
              description: 'General F-Beta Score: Setting β=2 weights Recall twice as heavily as Precision; β=0.5 weights Precision twice as heavily.',
            },
          ],
          keyTakeaways: [
            'For imbalanced datasets, use AUC-PR or F-beta, never standard Accuracy or AUC-ROC.',
            'RMSE penalizes large errors quadratically, whereas MAE penalizes errors linearly.',
            'Perplexity is vocabulary-dependent and cannot be compared between models using different tokenizers.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 5.2 — DOMAIN EVALUATION & SIGNIFICANCE TESTING
    // ──────────────────────────────────────────────────────────
    {
      id: 'which-result-is-best-domain',
      title: '5.2 Which Result is Best in Which Case? (Domain Guide)',
      slug: 'which-result-is-best-domain',
      badge: 'Domain Decisions',
      estimatedMinutes: 20,
      overview: 'Connect mathematical metrics to real-world business and scientific stakes. Master paired statistical hypothesis testing (t-test / Wilcoxon), effect sizes (Cohen\'s d), and ablation tables.',
      prerequisites: ['Master Metrics Reference'],
      learningGoals: [
        'Conduct paired statistical significance tests (p < 0.05) to validate benchmark gains',
        'Compute effect sizes (Cohen\'s d) to prove improvements are practically meaningful',
        'Construct rigorous component-level ablation tables isolating architectural contributions',
        'Align domain evaluation criteria to healthcare, finance, search, robotics, and NLP',
      ],
      analogy: {
        title: 'THE COURTROOM EVIDENCE ANALOGY',
        explanation: 'Presenting experimental results in a scientific paper is like presenting forensic evidence in a high-stakes courtroom trial. A raw 0.5% accuracy gain is mere circumstantial hearsay. A paired t-test with p < 0.001 across 10 folds is verified DNA evidence. An ablation table showing the model degrades when your component is removed is a signed confession. Peer reviewers act as the jury — give them incontrovertible proof.',
        steps: [
          { number: 1, badge: 'Cross-Seed Trial', title: '1. Multi-Fold Evaluation', subtitle: 'Record metric pairs across 10 test folds.', iconName: 'filter' },
          { number: 2, badge: 'Normality Audit', title: '2. Check Distribution', subtitle: 'Shapiro-Wilk test for normal differences.', iconName: 'search' },
          { number: 3, badge: 'Significance', title: '3. Paired Hypothesis Test', subtitle: 'Paired t-test (parametric) or Wilcoxon (non-param).', iconName: 'cpu' },
          { number: 4, badge: 'Effect Size', title: '4. Compute Cohen\'s d', subtitle: 'Verify effect size is large (d > 0.8).', iconName: 'cog' },
          { number: 5, badge: 'Ablation Table', title: '5. Component Ablation', subtitle: 'Prove each component drives the gain.', iconName: 'rocket' },
        ],
        connectors: ['Collect Pairs', 'Test Normality', 'Run p-Test', 'Measure d'],
      },
      keyQuestions: [
        {
          question: 'What is a paired statistical hypothesis test and why is it mandatory for ML papers?',
          answer: 'A paired t-test (or Wilcoxon signed-rank test) tests whether the difference between your model and the baseline model across identical test folds is significantly different from zero (p < 0.05). It mathematically rejects the null hypothesis that your 1% gain was merely random chance.',
        },
        {
          question: 'What is Cohen\'s d and why is p-value alone not enough?',
          answer: 'With a huge test set, even a trivial 0.01% gain can have p < 0.001. Cohen\'s d measures EFFECT SIZE: d = (μ₁ - μ₂) / s_pooled. d < 0.2 is negligible; d = 0.5 is medium; d > 0.8 is large. Top papers report both p-value (< 0.05) AND large effect size (d > 0.8) to prove practical importance.',
        },
      ],
      realWorldUses: [
        { industry: 'NeurIPS / ICML Best Paper Award Criteria', application: 'Reviewers require paired Wilcoxon tests across 5+ random seeds and complete component ablation tables before awarding top-tier conference acceptances.' },
        { industry: 'FDA Software as a Medical Device (SaMD)', application: 'Requires proof of statistical superiority (p < 0.01) with 95% confidence intervals against human board-certified diagnostic standards.' },
      ],
      sections: [
        {
          id: 'statistical-significance-guide',
          title: 'Statistical Significance & Ablation Studies',
          subtitle: 'Proving Your Research Findings Are Statistically Sound and Irrefutable',
          content: `### The 4-Stage Statistical Proof Framework

To convince peer reviewers and industrial stakeholders that your new algorithm is genuinely superior:`,
          workflow: {
            title: 'Statistical Hypothesis Testing Pipeline',
            description: 'Follow this protocol to prove your model\'s improvement is statistically genuine.',
            direction: 'vertical',
            nodes: [
              { id: '1', label: 'Step 1: Collect Paired Metric Observations', sublabel: 'Evaluate Model A (proposed) and Model B (baseline) on identical 10 CV folds.', badge: 'Step 1', color: 'slate' },
              { id: '2', label: 'Step 2: Check Normality of Differences', sublabel: 'Run Shapiro-Wilk test on differences (d_i = A_i - B_i). If p > 0.05, differences are normal.', badge: 'Step 2', color: 'sky' },
              { id: '3', label: 'Step 3: Execute Paired Statistical Test', sublabel: 'Use Paired Student\'s t-test (if normal) or Wilcoxon Signed-Rank Test (if non-normal). Confirm p < 0.05.', badge: 'Step 3', color: 'emerald' },
              { id: '4', label: 'Step 4: Compute Effect Size (Cohen\'s d) & Ablation Table', sublabel: 'Confirm d > 0.8 (large effect) and isolate each component\'s contribution in an ablation table.', badge: 'Step 4', color: 'amber' },
            ],
          },
          steps: [
            {
              stepNumber: 1,
              title: 'Collect Paired Fold Results',
              description: 'Record test metric pairs across at least 10 folds (or 5 seeds × 5 folds) for both your model and the strongest baseline.',
              example: 'Fold 1: Ours=94.2%, Base=92.1% (Diff=+2.1%); Fold 2: Ours=93.8%, Base=91.9% (Diff=+1.9%)...',
            },
            {
              stepNumber: 2,
              title: 'Run Paired t-Test or Wilcoxon',
              description: 'Apply `scipy.stats.ttest_rel(ours, baseline)` or `scipy.stats.wilcoxon(ours, baseline)`. If p < 0.05, reject the null hypothesis.',
              example: 't-statistic = 4.82, p-value = 0.0003 (< 0.001), confirming improvement is highly statistically significant.',
            },
            {
              stepNumber: 3,
              title: 'Report Effect Size (Cohen\'s d)',
              description: 'Compute Cohen\'s d = mean(diff) / std(diff). Ensure d > 0.8 to confirm the magnitude of improvement is substantial.',
              example: 'Mean difference = +1.8%, Std = 0.45% -> Cohen\'s d = 4.0 (extremely large effect size).',
            },
            {
              stepNumber: 4,
              title: 'Construct the Component Ablation Table',
              description: 'Start with full model, remove one proposed component at a time, and record the exact performance drop.',
              example: 'Full Model (94.2%) -> w/o Cross-Attention (91.8%, -2.4%) -> w/o Focal Loss (92.5%, -1.7%) -> Baseline (89.4%).',
            },
          ],
          callouts: [
            {
              type: 'example',
              title: 'How an Ablation Table Should Look in Your Paper',
              body: '| Configuration | Test Accuracy | Δ Drop | Significance |\n| :--- | :--- | :--- | :--- |\n| **Full Proposed Model** | **94.2% ± 0.3%** | — | **p < 0.001** |\n| w/o RoPE Embeddings | 92.1% ± 0.4% | -2.1% | p = 0.004 |\n| w/o Focal Loss | 91.5% ± 0.5% | -2.7% | p = 0.001 |\n| w/o LayerNorm Warmup | 89.8% ± 0.7% | -4.4% | p < 0.001 |\n| Standard Baseline (BERT) | 88.6% ± 0.6% | -5.6% | — |',
            },
          ],
          keyTakeaways: [
            'Always conduct paired statistical tests (p < 0.05) to prove improvements are not stochastic noise.',
            'Report Cohen\'s d effect size alongside p-values to prove practical importance.',
            'Ablation studies isolate the exact contribution of each architectural component.',
          ],
        },
      ],
    },
  ],
};
