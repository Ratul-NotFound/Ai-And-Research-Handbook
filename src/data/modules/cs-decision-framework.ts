import { Module } from '@/types';

export const csDecisionFrameworkModule: Module = {
  id: 'decision-framework',
  number: 6,
  title: 'CS Research Decision Framework',
  subtitle: 'The 6-Step Decision Tree, Common Pitfalls & Pre-Submission Quality Checklist',
  iconName: 'Compass',
  color: '#0d9488', // Teal
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 6.1 — THE DECISION TREE FOR CS RESEARCH
    // ──────────────────────────────────────────────────────────
    {
      id: 'research-decision-tree',
      title: '6.1 The Decision Tree for CS Research',
      slug: 'research-decision-tree',
      badge: 'Decision Logic',
      estimatedMinutes: 20,
      overview: 'The end-to-end algorithmic decision tree guiding CS researchers from problem formulation and label availability to model architecture, validation protocol, and pre-submission verification.',
      prerequisites: ['All Prior Modules (Topics 1-5)'],
      learningGoals: [
        'Navigate the master 6-step algorithmic decision tree for any CS research project',
        'Avoid the top 5 experimental pitfalls that cause immediate paper rejections',
        'Verify your experimental pipeline against the peer-reviewed conference checklist',
        'Ensure 100% reproducibility of code, seeds, data splits, and model weights',
      ],
      analogy: {
        title: 'THE AIRLINE PILOT PRE-FLIGHT CHECKLIST ANALOGY',
        explanation: 'Commercial aviation has a 0.00001% accident rate not because pilots are geniuses, but because they strictly follow a sequential, non-negotiable pre-flight decision tree. Before touching the throttle, they verify weight and balance (problem definition), check weather radar (literature gap), inspect fuel reserves (data quality), calibrate navigation systems (leak-free cross-validation), and verify emergency backup instruments (significance testing & ablations). Science operates with the same discipline.',
        steps: [
          { number: 1, badge: 'Grounding', title: '1. Problem Definition', subtitle: 'Falsifiable research question and gap.', iconName: 'search' },
          { number: 2, badge: 'Fuel Check', title: '2. Label & Data Modality', subtitle: 'Supervised, self-supervised, or RL.', iconName: 'database' },
          { number: 3, badge: 'Avionics', title: '3. Model Architecture', subtitle: 'Inductive bias aligned to data structure.', iconName: 'cog' },
          { number: 4, badge: 'Flight Plan', title: '4. Validation Partition', subtitle: 'GroupKFold, temporal, or stratified split.', iconName: 'filter' },
          { number: 5, badge: 'Takeoff Clearance', title: '5. Pre-Submission Check', subtitle: 'Code release, multi-seed p-test, ablations.', iconName: 'rocket' },
        ],
        connectors: ['Ground', 'Profile', 'Architect', 'Shield'],
      },
      keyQuestions: [
        {
          question: 'What is the master decision sequence every CS project must follow?',
          answer: 'Step 1: Is the problem well-defined and grounded in a literature gap? -> Step 2: What is the label availability? -> Step 3: What is the primary data modality? -> Step 4: What is the hard operational constraint? -> Step 5: What is the leak-free validation strategy? -> Step 6: What quantitative metric proves genuine scientific success?',
        },
        {
          question: 'What are the top 3 reasons CS papers get rejected at top venues (NeurIPS / ICML / CVPR)?',
          answer: '1) Weak or unfairly tuned baselines (the authors compared their heavily-tuned model against default untuned baselines); 2) Data leakage across splits (inflated scores that fail to reproduce); 3) Missing ablation studies (inability to prove which specific component drove the claimed improvement).',
        },
      ],
      realWorldUses: [
        { industry: 'DeepMind AlphaFold 3 Publication Audit', application: 'Followed a strict 6-step pre-submission protocol: blinded CASP validation, open-source server release, ablation of pairwise attention modules, and multi-seed statistical significance testing.' },
        { industry: 'FDA AI Medical Device Clearance Pathway', application: 'Requires end-to-end documentation: pre-specified primary endpoints, locked validation cohorts, demographic sub-group error analysis, and 100% audit-trail reproducibility.' },
      ],
      sections: [
        {
          id: 'decision-tree-steps',
          title: 'The 6-Step Algorithmic Decision Tree',
          subtitle: 'Systematic Flowchart for Every Computer Science Research Project',
          content: `Before writing code or training models, traverse this 6-step algorithmic decision tree to establish your experimental foundation:`,
          decisionTree: {
            title: 'End-to-End Master CS Research Decision Tree',
            description: 'Traverse the branches from problem formulation to final validation design.',
            root: {
              id: 'root',
              question: 'Step 1: Is your problem well-defined with a specific falsifiable Research Question (RQ)?',
              yes: {
                id: 'label-check',
                question: 'Step 2: Do you have high-quality labeled ground-truth data?',
                yes: {
                  id: 'modality-split',
                  question: 'Step 3: What is your primary data modality?',
                  yes: {
                    id: 'tabular-or-text',
                    question: 'Is it Tabular data or Text/Vision?',
                    yes: {
                      id: 'tabular-sol',
                      question: 'Tabular -> Tree Ensembles (XGBoost / LightGBM)',
                      answer: 'Use histogram-accelerated gradient boosted trees with Optuna Bayesian optimization. Wrap all scalers in a Pipeline.',
                      badge: 'Tabular SOTA ✓',
                    },
                    no: {
                      id: 'deep-sol',
                      question: 'Text / Vision -> Transformer / ConvNeXt with Pretraining',
                      answer: 'Fine-tune pre-trained foundation models (LLaMA, DeBERTa, ViT) using LoRA adapters and cosine learning rate schedules.',
                      badge: 'Foundation Models ✓',
                    },
                  },
                  no: {
                    id: 'graph-temporal',
                    question: 'Time-Series Telemetry or Graph Relational Networks?',
                    yes: {
                      id: 'temporal-sol',
                      question: 'Temporal -> PatchTST / Chronos (Rolling-Window Split)',
                      answer: 'Use patch-based temporal models with strictly chronological walk-forward cross-validation. Zero future lookahead.',
                      badge: 'Time-Series SOTA ✓',
                    },
                    no: {
                      id: 'gnn-sol',
                      question: 'Graph -> GCN / GraphSAGE / GAT',
                      answer: 'Use message-passing Graph Neural Networks over node-edge topological adjacency matrices.',
                      badge: 'GNN Architecture ✓',
                    },
                  },
                },
                no: {
                  id: 'unsupervised-branch',
                  question: 'Labels are missing or expensive?',
                  yes: {
                    id: 'self-supervised',
                    question: 'Self-Supervised Pretraining / Zero-Shot Foundation Models',
                    answer: 'Use Masked Autoencoders (MAE), contrastive learning (CLIP/SimCLR), or in-context few-shot prompting with LLMs.',
                    badge: 'Self-Supervised ✓',
                  },
                  no: {
                    id: 'active-learning',
                    question: 'Active Learning & Weak Supervision (Snorkel)',
                    answer: 'Use programmatic labeling functions (Snorkel) or uncertainty sampling to label only the top 5% highest-entropy samples.',
                    badge: 'Active Learning ✓',
                  },
                },
              },
              no: {
                id: 'literature-gap-fix',
                question: 'Problem Undefined -> Conduct Systematic Literature Review First',
                answer: 'Stop and execute backward/forward snowballing on 3 survey papers. Identify the specific gap before writing a single line of model code.',
                badge: 'Define Gap First ⚠️',
              },
            },
          },
          comparisonGrid: {
            title: 'Common Research Traps vs Verified Best Practices',
            columns: [
              {
                title: 'Fatal Research Traps',
                subtitle: 'Causes Immediate Rejection',
                color: 'rose',
                badge: 'Reject ✗',
                items: [
                  { label: 'Baseline Fairness', value: 'Comparing tuned model against default untuned baselines' },
                  { label: 'Data Splitting', value: 'Fitting scaler on whole dataset before splitting (leakage)' },
                  { label: 'Metric Selection', value: 'Reporting Accuracy on 99% imbalanced fraud data' },
                  { label: 'Seed Reporting', value: 'Cherry-picking the 1 best random seed out of 20 runs' },
                ],
                verdict: 'Guarantees peer-review rejection',
              },
              {
                title: 'Verified Best Practices',
                subtitle: 'Top Conference Acceptance',
                color: 'emerald',
                badge: 'Accept ✓',
                items: [
                  { label: 'Baseline Fairness', value: 'Tune ALL baselines with identical Optuna compute budgets', highlight: true },
                  { label: 'Data Splitting', value: 'Wrap all preprocessing strictly inside cross-validation folds' },
                  { label: 'Metric Selection', value: 'Report AUC-PR, F-beta, and calibration curves on imbalanced data' },
                  { label: 'Seed Reporting', value: 'Report Mean ± Std over 5+ random seeds with paired t-test (p < 0.05)' },
                ],
                verdict: '✓ Meets NeurIPS / ICML publication standards',
              },
            ],
          },
          keyTakeaways: [
            'Follow the decision tree sequentially to avoid jumping directly into overly complex architectures.',
            'Let data modality, label availability, and deployment constraints dictate model choice.',
            'Define success metrics prior to running experiments to maintain scientific integrity.',
          ],
        },
        {
          id: 'pre-submission-checklist',
          title: 'The Definitive Pre-Submission Research Checklist',
          subtitle: 'Ensure Your Paper Meets Peer-Reviewed Conference Standards',
          content: `Before submitting your paper to a venue or defending your thesis, verify every verification gate below:`,
          workflow: {
            title: 'Pre-Submission Verification Gate',
            description: 'All 5 quality checkpoints must be passed before paper submission.',
            direction: 'vertical',
            nodes: [
              { id: '1', label: 'Gate 1: Code & Pipeline Version Control', sublabel: 'Source code, seed configs, and conda/Docker environment frozen in git repository.', badge: 'Gate 1', color: 'slate' },
              { id: '2', label: 'Gate 2: Fair Baseline Tuning Protocol', sublabel: 'Baseline models tuned with equal hyperparameter search budget (Optuna 50 trials).', badge: 'Gate 2', color: 'sky' },
              { id: '3', label: 'Gate 3: Statistical Significance (p < 0.05)', sublabel: 'Paired t-test or Wilcoxon test confirms gain is statistically significant over 10 folds.', badge: 'Gate 3', color: 'emerald' },
              { id: '4', label: 'Gate 4: Component-Level Ablation Table', sublabel: 'Ablation experiments prove every novel module contributes positive marginal gain.', badge: 'Gate 4', color: 'amber' },
              { id: '5', label: 'Gate 5: Limitations & Boundary Conditions', sublabel: 'Dedicated limitations section honestly analyzing compute costs, failure cases, and constraints.', badge: 'Gate 5', color: 'violet' },
            ],
          },
          steps: [
            {
              stepNumber: 1,
              title: 'Code & Environment Reproducibility',
              description: 'Freeze dependencies via Docker or `environment.yml`. Ensure one-click script `python run_experiments.py --seed 42` reproduces all paper tables.',
              example: 'All model weights and training logs uploaded to Hugging Face Hub / Zenodo with a permanent DOI.',
            },
            {
              stepNumber: 2,
              title: 'Fair Baseline Comparison Audit',
              description: 'Verify that baseline models were not artificially crippled with default hyperparameters. Give baselines equal tuning resources.',
              example: 'Tuned baseline XGBoost and Random Forest using 50 Optuna trials on identical cross-validation folds.',
            },
            {
              stepNumber: 3,
              title: 'Statistical Hypothesis Verification',
              description: 'Confirm metric differences via paired statistical tests ($p < 0.05$) with Cohen\'s $d$ effect size ($d > 0.8$).',
              example: 'Achieved $p = 0.0004$ on paired Wilcoxon test and Cohen\'s $d = 2.4$, confirming robust improvement.',
            },
            {
              stepNumber: 4,
              title: 'Component-Level Ablation Study',
              description: 'Include an ablation table removing one proposed component at a time to prove every architectural choice is justified.',
              example: 'Removing attention gating dropped F1 by 2.4%; removing multi-task loss dropped F1 by 1.8%.',
            },
            {
              stepNumber: 5,
              title: 'Honest Discussion of Limitations',
              description: 'Explicitly document failure cases, compute costs, latency trade-offs, and dataset boundary conditions.',
              example: 'Documented that model performance degrades when input sequence length exceeds 2048 tokens.',
            },
          ],
          callouts: [
            {
              type: 'tip',
              title: 'Peer Reviewers Love Limitations Sections',
              body: 'Papers with a thorough, transparent Limitations section have higher acceptance rates at top conferences than papers claiming zero weaknesses. Honest boundary conditions signal mature scientific rigor.',
            },
          ],
          keyTakeaways: [
            'Peer reviewers evaluate reproducibility, ablation integrity, and baseline fairness above all else.',
            'Open-sourcing clean code and pre-trained weights dramatically increases citation count and credibility.',
            'Transparent limitation disclosure strengthens your scientific contribution.',
          ],
        },
      ],
    },
  ],
};
