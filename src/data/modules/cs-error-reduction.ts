import { Module } from '@/types';

export const csErrorReductionModule: Module = {
  id: 'error-reduction',
  number: 4,
  title: 'Error Reduction & Robustness',
  subtitle: 'Taxonomy of Research Errors, Systematic Error Diagnosis & Multi-Seed Validation Protocols',
  iconName: 'Flame',
  color: '#dc2626', // Red
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 4.1 — TYPES OF RESEARCH ERRORS
    // ──────────────────────────────────────────────────────────
    {
      id: 'types-of-research-errors',
      title: '4.1 Types of Errors in CS Research',
      slug: 'types-of-research-errors',
      badge: 'Error Taxonomy',
      estimatedMinutes: 20,
      overview: 'Deconstruct Bias (underfitting), Variance (overfitting), Data Leakage, and Selection Bias — the 4 fundamental failure modes that cause machine learning models to fail in peer review and production.',
      prerequisites: ['Statistics', 'Supervised Learning'],
      learningGoals: [
        'Deconstruct error into irreducible noise, bias squared, and variance',
        'Identify data leakage patterns before they corrupt experimental results',
        'Recognize selection and distribution bias in dataset curation',
        'Diagnose whether an experimental failure is caused by model capacity or data contamination',
      ],
      analogy: {
        title: 'THE ARCHERY TARGET PRACTICE ANALOGY',
        explanation: 'Imagine firing 100 arrows at a bullseye. High Bias (Underfitting) means your bow sight is crooked — all arrows cluster tightly together but far off-target (systematic error). High Variance (Overfitting) means your hands shake violently — arrows are scattered all over the wall (sensitivity to noise). Data Leakage is like peeking at where the bullseye will be moved during tomorrow\'s tournament. Selection Bias is practicing archery in an indoor windless room and expecting to shoot accurately in a mountain hurricane.',
        steps: [
          { number: 1, badge: 'Systematic Drift', title: '1. Bias (Underfitting)', subtitle: 'Rigid model misses complex true patterns.', iconName: 'filter' },
          { number: 2, badge: 'Noisy Scatter', title: '2. Variance (Overfitting)', subtitle: 'Model memorizes sample-specific noise.', iconName: 'cog' },
          { number: 3, badge: 'Contamination', title: '3. Data Leakage', subtitle: 'Test information bleeds into training.', iconName: 'database' },
          { number: 4, badge: 'Mismatched Target', title: '4. Selection Bias', subtitle: 'Training distribution ≠ Operational reality.', iconName: 'cpu' },
          { number: 5, badge: 'True Generalization', title: '5. Robust Model', subtitle: 'Low bias, low variance, leak-free.', iconName: 'rocket' },
        ],
        connectors: ['Diagnose', 'Isolate', 'Sanitize', 'Calibrate'],
      },
      keyQuestions: [
        {
          question: 'What is the Bias-Variance Tradeoff mathematically?',
          answer: 'Total Expected Test Error = Bias² + Variance + Irreducible Noise (σ²). As model complexity increases, Bias decreases (better fit to true function) while Variance increases (higher sensitivity to training noise). Optimal generalization occurs at the sweet spot minimizing their sum.',
        },
        {
          question: 'What are the 3 most common forms of Data Leakage in research?',
          answer: '1) Preprocessing Leakage: fitting Scalers/PCA on train+test before splitting; 2) Temporal Leakage: using future timestamps to predict past events in time-series; 3) Group Leakage: having slices of the same patient or user split across both train and test sets.',
        },
        {
          question: 'How do I detect if my model suffers from Data Leakage?',
          answer: 'If your model gets unrealistically high accuracy (>99.5% on difficult tasks) or if cross-validation accuracy is dramatically higher than performance on freshly collected out-of-distribution real-world data, data leakage is almost always the cause.',
        },
      ],
      realWorldUses: [
        { industry: 'COVID-19 AI Radiology Disaster (2020)', application: 'A Nature Machine Intelligence review of 415 COVID-19 AI diagnostic models found zero were clinically usable — largely due to data leakage where models learned to recognize the hospital font on the X-ray border rather than pulmonary disease.' },
        { industry: 'High-Frequency Algorithmic Trading', application: 'Financial quantitative hedge funds use purged and embargoed combinatorial cross-validation (de Prado) to mathematically eliminate lookahead leakage in financial time-series.' },
      ],
      sections: [
        {
          id: 'error-types-table',
          title: 'Taxonomy of Core Research Errors',
          subtitle: 'Identifying Root Causes of Experimental Failures',
          interactiveWidget: 'bias-variance',
          content: `In machine learning and computational research, experimental failures rarely originate from syntax bugs alone; they stem from statistical, sampling, and methodological errors.

### The 4 Major Types of Research Errors

| Error Type | Description & Symptom | Fundamental Root Cause | Engineering Solution |
| :--- | :--- | :--- | :--- |
| **Bias (Underfitting)** | High error on BOTH training and test sets | Overly simplistic model capacity or bad inductive assumptions | Increase model depth/capacity; add feature interactions; reduce regularization |
| **Variance (Overfitting)** | Near-zero training loss, but high validation/test error | Model memorizes stochastic noise instead of generalizable manifold | Add $L_1/L_2$ weight decay; Dropout; Data Augmentation; Early Stopping |
| **Data Leakage** | Unrealistically high benchmark score ($>99.5\\%$) | Preprocessing across full dataset; temporal lookahead; patient overlap | Wrap preprocessing inside cross-validation folds; GroupKFold; strictly chronological splits |
| **Selection Bias** | High test accuracy in-lab, catastrophic failure in production | Training data distribution does not represent operational reality | Collect representative domain data; re-weight sample losses; domain adaptation |`,
          comparisonGrid: {
            title: 'Diagnostic Comparison: Bias vs Variance vs Leakage vs Selection Bias',
            columns: [
              {
                title: 'High Bias (Underfit)',
                subtitle: 'Model Too Simple',
                color: 'amber',
                badge: 'Capacity Failure',
                items: [
                  { label: 'Train Loss', value: 'High (refuses to drop)' },
                  { label: 'Validation Loss', value: 'High (close to train loss)' },
                  { label: 'Root Cause', value: 'Linear model on non-linear data' },
                  { label: 'First Fix', value: 'Increase capacity / add features', highlight: true },
                ],
                verdict: 'Under-parameterized model',
              },
              {
                title: 'High Variance (Overfit)',
                subtitle: 'Memorizing Noise',
                color: 'rose',
                badge: 'Generalization Failure',
                items: [
                  { label: 'Train Loss', value: 'Near Zero (perfect fit)' },
                  { label: 'Validation Loss', value: 'High & Diverging upwards' },
                  { label: 'Root Cause', value: 'Model too large for dataset size' },
                  { label: 'First Fix', value: 'Regularization + More Data', highlight: true },
                ],
                verdict: 'Over-parameterized / noisy data',
              },
              {
                title: 'Data Leakage',
                subtitle: 'Contaminated Splits',
                color: 'violet',
                badge: 'Methodological Bug',
                items: [
                  { label: 'Train Loss', value: 'Extremely Low' },
                  { label: 'Validation Loss', value: 'Suspiciously Low (>99.5%)' },
                  { label: 'Root Cause', value: 'Test information leaked into train' },
                  { label: 'First Fix', value: 'Pipeline isolation inside CV', highlight: true },
                ],
                verdict: 'Invalidates all scientific claims',
              },
              {
                title: 'Selection Bias',
                subtitle: 'Distribution Shift',
                color: 'sky',
                badge: 'Sampling Failure',
                items: [
                  { label: 'In-Domain Test', value: 'High Accuracy (95%+)' },
                  { label: 'Production / OOD', value: 'Catastrophic Drop (<60%)' },
                  { label: 'Root Cause', value: 'Training distribution ≠ Wild reality' },
                  { label: 'First Fix', value: 'OOD benchmark & re-weighting', highlight: true },
                ],
                verdict: 'Requires domain adaptation',
              },
            ],
          },
          callouts: [
            {
              type: 'warning',
              title: 'The Silent Leakage in Scaling/Normalization',
              body: 'If you run `scaler.fit(X)` on your entire dataset before calling `train_test_split()`, you have committed data leakage. The mean and standard deviation of the test set are now baked into the training set features. Always use `Pipeline([("scaler", StandardScaler()), ("model", clf)])` inside cross-validation.',
            },
          ],
          equations: [
            {
              latex: '\\mathbb{E}[(y - \\hat{f}(x))^2] = \\text{Bias}[\\hat{f}(x)]^2 + \\text{Var}[\\hat{f}(x)] + \\sigma^2',
              description: 'The Bias-Variance Decomposition: Total expected error decomposes into squared bias, variance, and irreducible environmental noise.',
            },
          ],
          keyTakeaways: [
            'Bias is systematic error from insufficient model capacity or bad inductive assumptions.',
            'Variance is error from sensitivity to stochastic training set noise.',
            'Data leakage is the number one cause of inflated benchmark scores that collapse in production.',
            'Selection bias occurs when the training cohort fails to represent the operational population.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 4.2 — HOW TO DECREASE ERRORS (MASTER MATRIX)
    // ──────────────────────────────────────────────────────────
    {
      id: 'how-to-decrease-errors',
      title: '4.2 How to Decrease Errors (Master Solution Matrix)',
      slug: 'how-to-decrease-errors',
      badge: 'Troubleshooting Matrix',
      estimatedMinutes: 25,
      overview: 'Actionable diagnostic decision trees and concrete engineering mitigations for overfitting, class imbalance, label noise, multicollinearity, and distribution shift.',
      prerequisites: ['Loss Functions', 'Regularization'],
      learningGoals: [
        'Diagnose any machine learning training failure using loss curve signatures',
        'Apply Class-Weighted Loss or Focal Loss for extreme class imbalance',
        'Implement Multi-Seed statistical validation to ensure error reductions are genuine',
        'Write clean, leak-free scikit-learn and PyTorch training pipelines',
      ],
      analogy: {
        title: 'THE MEDICAL DIFFERENTIAL DIAGNOSIS ANALOGY',
        explanation: 'When a patient has a fever (high model error), a doctor does not blindly administer random medication. They run diagnostic tests: Is the white blood cell count high (Bias/underfitting)? Are antibodies overreacting (Variance/overfitting)? Was the blood sample contaminated in the lab (Data Leakage)? Every failure symptom has a precise, evidence-backed treatment protocol.',
        steps: [
          { number: 1, badge: 'Symptom Check', title: 'Plot Loss Curves', subtitle: 'Track train vs val loss over epochs.', iconName: 'filter' },
          { number: 2, badge: 'Diagnosis', title: 'Identify Failure Signature', subtitle: 'Overfitting, underfitting, or plateau.', iconName: 'search' },
          { number: 3, badge: 'Treatment', title: 'Apply Targeted Fix', subtitle: 'Regularize, augment, or re-weight.', iconName: 'cog' },
          { number: 4, badge: 'Multi-Seed Audit', title: 'Multi-Seed Verification', subtitle: 'Test across 5+ random seeds.', iconName: 'rocket' },
        ],
        connectors: ['Plot', 'Diagnose', 'Treat', 'Verify'],
      },
      keyQuestions: [
        {
          question: 'How do I handle severe class imbalance (e.g., 99:1 negative to positive ratio)?',
          answer: '1) NEVER optimize standard Cross-Entropy (the model will predict all negative); 2) Use Class-Weighted Cross-Entropy ($w_{pos} = N_{neg} / N_{pos}$) or Lin\'s Focal Loss (downweights easy examples); 3) Tune the classification probability threshold via precision-recall trade-off; 4) Evaluate strictly using AUC-PR or F-beta, never Accuracy.',
        },
        {
          question: 'Why is reporting single-seed experimental results considered bad science?',
          answer: 'Random seed initialization influences parameter starting points, data batch shuffling order, and dropout masks. A 1% accuracy gain on a single seed might be pure stochastic luck. Top conferences (NeurIPS/ICML) require reporting Mean ± Standard Deviation over at least 5 random seeds (e.g. 42, 1337, 2024, 7, 99).',
        },
      ],
      realWorldUses: [
        { industry: 'Credit Card Fraud Detection (Visa / Stripe)', application: 'Combines Focal Loss (γ=2.0) with SMOTE minority oversampling to achieve 98.4% Recall on 0.05% prevalence fraud transactions.' },
        { industry: 'Medical Pathology AI (CheXNet)', application: 'Trained with positive class weighting equal to the inverse prevalence of each of the 14 radiological diseases in the NIH dataset.' },
      ],
      sections: [
        {
          id: 'error-reduction-table',
          title: 'Master Error Diagnosis & Mitigation Table',
          subtitle: 'Specific Actionable Steps for Every Common Research Failure Mode',
          content: `### Master Error Reduction Matrix

| Failure Mode | Concrete Engineering Solution | When to Apply (Diagnostic Trigger) |
| :--- | :--- | :--- |
| **Overfitting** | Apply $L_1/L_2$ weight decay, Dropout ($0.1-0.5$), data augmentation, reduce depth, Early Stopping | Training loss decreases ($\\downarrow$), but validation loss plateaus or climbs ($\\uparrow$) |
| **Underfitting** | Add non-linear interactions, increase model capacity/layers, train longer with warmup, reduce regularization | Both training and validation loss remain high and refuse to converge |
| **Class Imbalance** | Class-Weighted Cross-Entropy, Focal Loss, minority oversampling (SMOTE), threshold tuning | High overall accuracy (e.g. 98%), but near-zero Recall on minority/critical class |
| **Data Leakage** | Chronological splits, GroupKFold by patient/user ID, wrap all preprocessing strictly inside CV folds | Benchmark accuracy seems "too good to be true" ($>99.5\\%$ on hard domain) |
| **Label Noise** | Confident Learning (Cleanlab), symmetric cross-entropy, label smoothing ($0.1$) | Model memorizes mislabeled samples; validation loss jumps erratically |
| **Multicollinearity** | Ridge regression ($L_2$), PCA feature orthogonalization, variance inflation factor (VIF) pruning | Feature weights explode with opposite signs on highly correlated predictors |
| **Covariate Shift** | Domain adversarial training, importance reweighting, test-time adaptation | Model performs well on Source validation set, drops on Target field cohort |`,
          decisionTree: {
            title: 'Diagnostic Decision Tree: How to Fix Your ML Training Failure',
            description: 'Follow the symptom signature of your learning curves to locate the exact engineering fix.',
            root: {
              id: 'root',
              question: 'Is your Training Loss high and failing to converge?',
              yes: {
                id: 'underfit-branch',
                question: 'High Training Loss (Underfitting)',
                answer: 'Increase model capacity (more layers/heads), add non-linear features, reduce weight decay, increase learning rate with linear warmup.',
                badge: 'Fix Underfitting ✓',
              },
              no: {
                id: 'val-loss-check',
                question: 'Is Training Loss low, but Validation Loss climbing upwards?',
                yes: {
                  id: 'overfit-branch',
                  question: 'Low Train Loss + High Val Loss (Overfitting)',
                  answer: 'Add L2 weight decay (0.01-0.1), Dropout (0.2-0.5), heavy data augmentation (mixup/cutmix), reduce model size, and enable early stopping.',
                  badge: 'Fix Overfitting ✓',
                },
                no: {
                  id: 'imbalance-check',
                  question: 'Are predictions skewed toward majority class with near-zero minority Recall?',
                  yes: {
                    id: 'imbalance-fix',
                    question: 'Class Imbalance Problem',
                    answer: 'Switch loss to Focal Loss or Class-Weighted Cross-Entropy. Adjust classification threshold. Evaluate with AUC-PR and F2-Score.',
                    badge: 'Fix Class Imbalance ✓',
                  },
                  no: {
                    id: 'leakage-or-noise',
                    question: 'Is Validation Score >99.5% on lab test, but fails in the real world?',
                    yes: {
                      id: 'leakage-fix',
                      question: 'Data Leakage / Selection Bias',
                      answer: 'Enforce GroupKFold by entity ID, wrap preprocessing inside Pipeline, use strictly chronological splits for time-series.',
                      badge: 'Fix Leakage ✓',
                    },
                    no: {
                      id: 'noise-fix',
                      question: 'Label Noise / Optimization Instability',
                      answer: 'Apply Label Smoothing (0.1), clip gradient norms (max_norm=1.0), and audit data with Cleanlab confident learning.',
                      badge: 'Fix Stability ✓',
                    },
                  },
                },
              },
            },
          },
          workflow: {
            title: 'Multi-Seed Robustness Verification Protocol',
            description: 'Execute this 4-stage validation before making claims in any research paper.',
            direction: 'horizontal',
            nodes: [
              { id: '1', label: '1. Lock Seeds', sublabel: 'Set seeds: [42, 1337, 2024, 7, 99]', badge: 'Multi-Seed', color: 'slate' },
              { id: '2', label: '2. Run N Folds', sublabel: 'Train model on each seed independently', badge: 'Execute', color: 'sky' },
              { id: '3', label: '3. Aggregate Mean ± Std', sublabel: 'Compute μ and σ for all primary metrics', badge: 'Statistics', color: 'amber' },
              { id: '4', label: '4. Paired t-Test', sublabel: 'Verify p < 0.05 vs baseline model', badge: 'Significance', color: 'emerald' },
            ],
          },
          codeExamples: [
            {
              title: 'Leak-Free Pipeline with Class Weighting & Nested Cross-Validation',
              language: 'python',
              code: `import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.ensemble import HistGradientBoostingClassifier

# 1. Compute class weights for severe imbalance (e.g. 95% neg, 5% pos)
# weights: class 0 -> 1.0, class 1 -> 19.0
class_weight = {0: 1.0, 1: 19.0}

# 2. Build Pipeline: Preprocessing is fit ONLY inside CV training folds!
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', HistGradientBoostingClassifier(
        class_weight=class_weight,
        l2_regularization=1.5,
        early_stopping=True,
        random_state=42
    ))
])

# 3. Multi-Seed Cross-Validation Protocol
seeds = [42, 1337, 2024, 7, 99]
all_scores = []

for seed in seeds:
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=seed)
    scores = cross_val_score(pipeline, X, y, cv=cv, scoring='average_precision')
    all_scores.extend(scores)

print(f"Mean AUC-PR: {np.mean(all_scores):.4f} ± {np.std(all_scores):.4f}")`,
              explanation: 'StandardScaler is wrapped inside Pipeline, mathematically preventing data leakage across CV folds. Multi-seed evaluation produces statistically robust confidence intervals.',
            },
          ],
          keyTakeaways: [
            'Always inspect learning curve dynamics (train vs val loss) before attempting fixes.',
            'For imbalanced datasets, use Class-Weighted Cross-Entropy or Focal Loss with threshold tuning.',
            'Report Mean ± Std across at least 5 random seeds to prove improvements are statistically significant.',
            'Wrap all feature transformations inside scikit-learn Pipelines to eliminate silent data leakage.',
          ],
        },
      ],
    },
  ],
};
