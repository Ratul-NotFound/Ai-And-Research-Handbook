import { Module } from '@/types';

export const csModelsTrainingModule: Module = {
  id: 'models-training',
  number: 3,
  title: 'Models & Training Selection',
  subtitle: 'Model Selection Matrix ("Why This vs Why Not Other"), 7-Step Training Protocol & Constraint Optimization',
  iconName: 'Cpu',
  color: '#8b5cf6', // Violet
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 3.1 — WHICH MODEL FOR WHICH SITUATION?
    // ──────────────────────────────────────────────────────────
    {
      id: 'model-selection-matrix',
      title: '3.1 Which Model for Which Situation?',
      slug: 'model-selection-matrix',
      badge: 'Model Selection',
      estimatedMinutes: 25,
      overview: 'Selecting the optimal model requires matching architectural inductive bias to data structure, dataset scale, compute budget, and inference latency. Discover the exact decision logic separating tree models, CNNs, Transformers, and GNNs.',
      prerequisites: ['ML Basics', 'Data Modalities (Topic 2)'],
      learningGoals: [
        'Understand how inductive bias determines which model works best on each modality',
        'Learn why Gradient Boosted Trees consistently beat Deep Learning on tabular data',
        'Use the architectural decision tree to select the right model for any research scenario',
        'Justify why alternative architectures underperform or fail in peer review',
      ],
      analogy: {
        title: 'THE SPECIALIZED VEHICLE FLEET ANALOGY',
        explanation: 'Selecting a machine learning model is like picking a vehicle for a cross-country mission. A Formula 1 racecar (Transformer) is incredibly fast on a paved smooth racetrack (massive pretraining corpus) but gets immediately stuck in mud (small tabular datasets). A rugged 4x4 Jeep (XGBoost) conquers rocky irregular terrain (unaligned tabular features) with ease. A cargo train (CNN) moves massive grid payloads (2D spatial pixels) along fixed tracks. Choosing the wrong vehicle wastes fuel and guarantees mission failure.',
        steps: [
          { number: 1, badge: 'Input Profile', title: 'Data Modality & Dimensions', subtitle: 'Tabular, vision, text, graph, or time-series.', iconName: 'database' },
          { number: 2, badge: 'Inductive Bias', title: 'Match Inductive Bias', subtitle: 'Spatial locality, causal attention, or orthogonal splits.', iconName: 'filter' },
          { number: 3, badge: 'Constraint Check', title: 'Compute & Latency Budget', subtitle: 'P99 latency, VRAM limits, and sample size.', iconName: 'cog' },
          { number: 4, badge: 'Baseline Lock', title: 'Establish Simple Baseline', subtitle: 'Heuristic/linear anchor before complex nets.', iconName: 'cpu' },
          { number: 5, badge: 'Final Architecture', title: 'Optimal SOTA Model', subtitle: 'Empirically justified and peer-review ready.', iconName: 'rocket' },
        ],
        connectors: ['Profile', 'Align Bias', 'Filter Limits', 'Verify Gain'],
      },
      keyQuestions: [
        {
          question: 'What is inductive bias and why is it the fundamental driver of model selection?',
          answer: 'Inductive bias is the set of prior mathematical assumptions built into an architecture. CNNs assume spatial translation invariance (edges matter everywhere). Transformers assume all-to-all token interactions. Trees assume axis-aligned decision boundaries. If your data violates a model\'s inductive bias, the model must spend millions of extra parameters trying to learn what a correctly biased model gets for free.',
        },
        {
          question: 'Why do Gradient Boosted Trees (XGBoost/LightGBM/CatBoost) beat Deep Learning on Tabular data?',
          answer: 'Tabular datasets feature unaligned coordinate spaces (e.g., Column 1 is Age in years, Column 2 is Salary in USD). Tree splits are invariant to monotonic transformations and split coordinates orthogonally. Neural networks rely on smooth continuous manifolds and rotation-invariant dot products, which struggle when feature coordinates lack rotational symmetry.',
        },
        {
          question: 'When should I use a Transformer instead of an LSTM for sequence modeling?',
          answer: 'Use Transformers when you have sufficient training data (>10K sequences) and need to capture long-range dependencies in parallel on GPUs via self-attention. Use LSTMs or state-space models (Mamba) only under extreme edge hardware constraints with strict memory limits where quadratic O(N²) attention is prohibitive.',
        },
      ],
      realWorldUses: [
        { industry: 'Ad Click-Through Rate (CTR) Prediction', application: 'Meta & Google combine Deep Learning embeddings with Gradient Boosted Trees (DLRM + LightGBM) to process billions of sparse categorical interactions in sub-10ms latency.' },
        { industry: 'Autonomous Vehicle Perception', application: 'Tesla & Waymo use Multi-Task Vision Transformers (ViT + BEV Former) to map 8 camera video feeds directly into 3D bird\'s-eye-view occupancy grids.' },
        { industry: 'Drug Discovery & Molecular Properties', application: 'DeepMind & Genentech use Graph Neural Networks (GAT / SchNet) to model atoms as nodes and chemical bonds as edges, predicting binding affinity.' },
      ],
      sections: [
        {
          id: 'model-selection-table',
          title: 'Master Model Selection & Trade-Off Matrix',
          subtitle: 'Go-To Architectures vs. Why Alternative Approaches Fail',
          interactiveWidget: 'model-selector',
          content: `Selecting the right model architecture requires evaluating inductive bias, dataset scale, compute budget, and inference latency.

### The Complete Model Selection Matrix

| Scenario & Data Type | Go-To Model | Why This Model? | Why Not Other Alternatives? |
| :--- | :--- | :--- | :--- |
| **Tabular ($<100\\text{K}$ rows)** | **Random Forest, XGBoost, LightGBM** | Fast training, handles non-linearities, robust to unscaled features | Deep learning overfits easily on small tabular data and requires extensive hyperparameter tuning |
| **Tabular ($>1\\text{M}$ rows)** | **LightGBM, CatBoost, TabNet** | Histogram-based splitting is blazing fast; native categorical encoding | Random Forest is too slow; linear models fail to capture high-order non-linear feature interactions |
| **Image Classification** | **CNN (ResNet, ConvNeXt), ViT** | Convolutional inductive bias or self-attention captures spatial hierarchies | MLPs ignore 2D spatial locality; decision trees fail on raw pixel arrays |
| **Object Detection** | **YOLO family, Faster R-CNN, DETR** | Predicts bounding box coordinates and class probabilities concurrently | Standard classification models cannot localize multiple objects; two-stage R-CNNs are too slow for real-time |
| **Text Classification** | **BERT, RoBERTa, DistilBERT** | Bi-directional contextual embeddings understand nuanced grammar and syntax | Bag-of-words (TF-IDF) loses word order; LSTMs suffer from slow recurrent training bottlenecks |
| **Text Generation / Reasoning** | **Decoder Transformers (LLaMA, GPT)** | Autoregressive causal attention models natural language probability distributions | Bidirectional encoders (BERT) cannot generate text autoregressively from left to right |
| **Time-Series Forecasting** | **PatchTST, N-BEATS, Chronos** | Models patch decomposition, auto-correlations, and trend dynamics | Standard linear regression completely ignores temporal auto-correlations |
| **Anomaly Detection** | **Isolation Forest, Autoencoder, VAE** | Learns normal data distribution in unsupervised fashion; flags outliers | Supervised models fail because labeled anomaly samples are extremely rare in production |
| **Graph / Network Data** | **GNN (GCN, GAT, GraphSAGE)** | Propagates node embeddings across topological neighborhood edges | Standard tabular/dense models ignore relational connectivity and edge attributes |
| **Few-Shot Learning ($<10$ shots)** | **In-Context LLMs, Prototypical Nets** | Learns metric embeddings or meta-initializations adaptable with few shots | Standard backpropagation overfits catastrophically on small sample sizes |`,
          decisionTree: {
            title: 'Decision Tree: Which Model Architecture Should I Choose?',
            description: 'Navigate by data modality and operational requirements to pinpoint the optimal model family.',
            root: {
              id: 'root',
              question: 'Is your primary data structured / tabular (rows & columns with heterogeneous types)?',
              yes: {
                id: 'tabular-size',
                question: 'Is your dataset size under 100,000 rows?',
                yes: {
                  id: 'small-tabular',
                  question: 'XGBoost / LightGBM / Random Forest',
                  answer: 'Use Gradient Boosted Trees with Bayesian optimization (Optuna). Deep learning will overfit on small tabular datasets.',
                  badge: 'Tree Ensembles ✓',
                },
                no: {
                  id: 'large-tabular',
                  question: 'CatBoost / LightGBM with GPU / TabNet',
                  answer: 'Use histogram-accelerated GBDTs (LightGBM/CatBoost) with GPU acceleration or TabNet for attention-driven feature selection.',
                  badge: 'Histogram Trees / TabNet ✓',
                },
              },
              no: {
                id: 'modality-check',
                question: 'Is your data sequential text or natural language code?',
                yes: {
                  id: 'nlp-task',
                  question: 'Do you need generation (e.g. chat, synthesis) or classification/extraction?',
                  yes: {
                    id: 'gen-nlp',
                    question: 'Decoder-Only Transformer (LLaMA, Mistral, GPT)',
                    answer: 'Fine-tune pre-trained autoregressive models using LoRA / QLoRA with causal masking.',
                    badge: 'Causal LLM ✓',
                  },
                  no: {
                    id: 'class-nlp',
                    question: 'Bidirectional Encoder (DeBERTa-v3, ModernBERT)',
                    answer: 'Use bidirectional pre-trained transformers for classification, NER, or semantic retrieval embedding.',
                    badge: 'Encoder Transformer ✓',
                  },
                },
                no: {
                  id: 'vision-or-graph',
                  question: 'Is your data 2D/3D spatial pixels or video frames?',
                  yes: {
                    id: 'vision-model',
                    question: 'Vision Transformers (ViT, DINOv2) or ConvNeXt',
                    answer: 'Use ViT for large datasets or DINOv2 self-supervised backbones; ConvNeXt for edge efficiency.',
                    badge: 'ViT / ConvNeXt ✓',
                  },
                  no: {
                    id: 'graph-model',
                    question: 'Graph Neural Networks (GraphSAGE, GAT, GCN)',
                    answer: 'Use message-passing GNNs to leverage topological relational connectivity between node entities.',
                    badge: 'GNN Architecture ✓',
                  },
                },
              },
            },
          },
          comparisonGrid: {
            title: 'Architectural Paradigm Comparison',
            columns: [
              {
                title: 'Gradient Boosted Trees',
                subtitle: 'XGBoost, LightGBM, CatBoost',
                color: 'emerald',
                badge: 'Tabular SOTA',
                items: [
                  { label: 'Inductive Bias', value: 'Axis-aligned orthogonal splits on independent coordinates' },
                  { label: 'Data Regime', value: 'Small to Large Tabular (1K - 10M rows)', highlight: true },
                  { label: 'Compute Cost', value: 'Low (CPU/single GPU train in minutes)' },
                  { label: 'Interpretability', value: 'High (Feature Importance, SHAP, TreeSHAP)' },
                ],
                verdict: '✓ Uncontested champion for tabular records',
              },
              {
                title: 'Convolutional Networks (CNN)',
                subtitle: 'ResNet, ConvNeXt, EfficientNet',
                color: 'sky',
                badge: 'Spatial Vision',
                items: [
                  { label: 'Inductive Bias', value: 'Spatial 2D translation invariance and local receptive fields' },
                  { label: 'Data Regime', value: 'Images, video, spatial spectrograms', highlight: true },
                  { label: 'Compute Cost', value: 'Medium (linear O(N) in pixel count)' },
                  { label: 'Interpretability', value: 'Medium (Grad-CAM, saliency maps)' },
                ],
                verdict: '✓ Best for real-time edge vision & small image datasets',
              },
              {
                title: 'Transformers (Attention)',
                subtitle: 'LLaMA, GPT, ViT, BERT',
                color: 'violet',
                badge: 'General Foundation',
                items: [
                  { label: 'Inductive Bias', value: 'Minimal (all-to-all routing learned from data)' },
                  { label: 'Data Regime', value: 'Massive scale text, audio, vision tokens', highlight: true },
                  { label: 'Compute Cost', value: 'High (quadratic O(N²) attention without tiling)' },
                  { label: 'Interpretability', value: 'Low (Attention rollout, probe vectors)' },
                ],
                verdict: '✓ Dominates NLP, multi-modal, and generative tasks',
              },
            ],
          },
          callouts: [
            {
              type: 'tip',
              title: 'The Inductive Bias Rule of Thumb',
              body: 'The less training data you have, the stronger the inductive bias your model requires. On 500 medical records, a logistic regression or decision tree will win. On 500 billion web tokens, a Transformer with minimal inductive bias will dominate.',
            },
            {
              type: 'warning',
              title: 'The Neural Network on Tabular Data Trap',
              body: 'A frequent error in CS master thesis projects is forcing a multi-layer perceptron or Transformer onto small CSV datasets. Reviewers will immediately reject claims if XGBoost or Random Forest baselines were omitted or beat your neural network.',
            },
          ],
          keyTakeaways: [
            'For tabular data under 100k rows, Gradient Boosted Trees (XGBoost/LightGBM) consistently outperform Deep Neural Networks.',
            'Match model inductive bias to data structure: 2D locality for vision (CNN), causal context for text (Transformers), topology for graphs (GNNs).',
            'Always evaluate deployment constraints (latency, memory, batch size) before selecting complex architectures.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 3.2 — STEP-BY-STEP TRAINING WORKFLOW
    // ──────────────────────────────────────────────────────────
    {
      id: 'step-by-step-training-workflow',
      title: '3.2 Step-by-Step Model Training Protocol',
      slug: 'step-by-step-training-workflow',
      badge: 'Training Protocol',
      estimatedMinutes: 20,
      overview: 'The disciplined 7-step machine learning engineering workflow from simple baseline establishing to hyperparameter tuning, checkpointing, holdout evaluation, and error analysis.',
      prerequisites: ['Cross-Validation', 'Evaluation Metrics'],
      learningGoals: [
        'Execute the 7-step scientific training protocol in sequence',
        'Understand why simple baselines are non-negotiable for research credibility',
        'Implement early stopping and model checkpointing properly',
        'Conduct granular failure-mode error analysis to drive paper contributions',
      ],
      analogy: {
        title: 'THE SCIENTIFIC TEST RUN PIPELINE',
        explanation: 'Training a research model is like launching an experimental orbital rocket. You never ignite the main orbital booster without first testing the static test stand (baseline), verifying fuel line pressure (cross-validation), calibrating thruster valves (hyperparameter tuning), and locking telemetry recording before the actual launch (holdout test set evaluation).',
        steps: [
          { number: 1, badge: 'Ground Truth', title: 'Simple Baseline', subtitle: 'Majority class or linear model anchor.', iconName: 'filter' },
          { number: 2, badge: 'Inspection', title: 'EDA & Transformations', subtitle: 'Detect skew, missingness, and outliers.', iconName: 'database' },
          { number: 3, badge: 'Shielding', title: 'Cross-Validation Setup', subtitle: 'Stratified / GroupKFold / Temporal split.', iconName: 'cog' },
          { number: 4, badge: 'Search Engine', title: 'Hyperparameter Tuning', subtitle: 'Optuna Bayesian optimization.', iconName: 'cpu' },
          { number: 5, badge: 'Sacred Test', title: 'Holdout Evaluation', subtitle: 'Evaluated exactly ONCE at project completion.', iconName: 'rocket' },
        ],
        connectors: ['Baseline', 'Explore', 'Isolate', 'Optimize'],
      },
      keyQuestions: [
        {
          question: 'Why MUST I establish a simple baseline before training complex models?',
          answer: 'A simple heuristic (e.g., predict majority class) or linear model establishes the performance floor. If your 100M parameter neural network cannot beat Logistic Regression by a statistically significant margin, your problem is either linear or your pipeline has a silent bug.',
        },
        {
          question: 'What is the correct way to save checkpoints during deep learning training?',
          answer: 'Save the model weights at the epoch with the lowest VALIDATION loss (or highest validation metric). Never save only the final epoch model, as late epochs often suffer from overfitting and catastrophic test-time degradation.',
        },
      ],
      realWorldUses: [
        { industry: 'AlphaFold 2 Training Regimen', application: 'DeepMind evaluated multiple ablation baselines at each iteration, saving checkpoints based on CASP validation distance and stopping when validation GDT-TS plateaus.' },
        { industry: 'Kaggle Grandmaster Playbook', application: 'Competitive ML champions enforce strict 5-fold Stratified CV out-of-fold scoring to ensure local CV improvements perfectly correlate with private test leaderboard gains.' },
      ],
      sections: [
        {
          id: 'seven-step-workflow',
          title: 'The 7-Step Machine Learning Training Protocol',
          subtitle: 'The Disciplined Workflow Every CS Researcher Must Follow',
          content: `Following a standardized training protocol ensures reproducibility and protects against subtle experimental biases:`,
          workflow: {
            title: '7-Step ML Training Workflow',
            description: 'Execute these phases sequentially without skipping verification steps.',
            direction: 'vertical',
            nodes: [
              { id: '1', label: 'Step 1: Establish Simple Baseline First', sublabel: 'Majority class, linear model, or k-NN to establish performance floor.', badge: 'Step 1', color: 'slate' },
              { id: '2', label: 'Step 2: Exploratory Data Analysis & Feature Engineering', sublabel: 'Inspect distributions, correlations, class skews, and domain transforms.', badge: 'Step 2', color: 'sky' },
              { id: '3', label: 'Step 3: Define Leak-Free Cross-Validation Strategy', sublabel: 'StratifiedKFold, GroupKFold, or Rolling Temporal Walk-Forward.', badge: 'Step 3', color: 'emerald' },
              { id: '4', label: 'Step 4: Hyperparameter Optimization (Optuna / Bayesian)', sublabel: 'Tune learning rate, weight decay, batch size, and depth systematically.', badge: 'Step 4', color: 'violet' },
              { id: '5', label: 'Step 5: Train with Early Stopping & Best-Checkpointing', sublabel: 'Monitor validation loss with patience (5-15 epochs). Save best weights.', badge: 'Step 5', color: 'amber' },
              { id: '6', label: 'Step 6: Evaluate on Sacred Holdout Test Set', sublabel: 'Evaluate exactly ONCE at the end. Never tune hyperparameters on this set.', badge: 'Step 6', color: 'rose' },
              { id: '7', label: 'Step 7: Granular Error Analysis & Failure Modes', sublabel: 'Dissect misclassifications, confusion matrices, and feature slices.', badge: 'Step 7', color: 'sky' },
            ],
          },
          steps: [
            {
              stepNumber: 1,
              title: 'Establish a Simple Baseline First',
              description: 'Implement the simplest possible heuristic (e.g. Majority Class, Mean Predictor, or Logistic Regression). This anchors the minimum acceptable score.',
              example: 'On fraud detection with 99.2% non-fraud, a dummy classifier gets 99.2% accuracy. Your baseline shows accuracy is meaningless and AUC-PR must be used.',
            },
            {
              stepNumber: 2,
              title: 'Exploratory Data Analysis & Cleaning',
              description: 'Examine feature correlation matrices, detect missingness patterns, check for label noise, and apply normalizations.',
              example: 'Log-transforming skewed financial revenue features reduces kurtosis and accelerates neural network gradient descent convergence by 4x.',
            },
            {
              stepNumber: 3,
              title: 'Strict Cross-Validation Partitioning',
              description: 'Lock your cross-validation scheme. For grouped data (multiple images per patient), enforce GroupKFold so zero patient data leaks across folds.',
              example: 'Using GroupKFold on hospital patient IDs prevented 15% artificial accuracy inflation caused by same-patient slice leakage.',
            },
            {
              stepNumber: 4,
              title: 'Bayesian Hyperparameter Search',
              description: 'Use Optuna with Tree-structured Parzen Estimators (TPE) over Random Search. Never use manual ad-hoc grid search.',
              example: 'Optuna discovered an optimal learning rate of 2.3e-4 and weight decay of 0.04 in 50 trials, improving validation accuracy by 3.2%.',
            },
            {
              stepNumber: 5,
              title: 'Checkpointing & Early Stopping',
              description: 'Configure early stopping with patience = 10 epochs on validation loss. Always reload model.load_state_dict(best_weights).',
              example: 'Training stopped at epoch 38 when validation loss plateaued, automatically restoring the best checkpoint from epoch 28.',
            },
            {
              stepNumber: 6,
              title: 'Single-Pass Test Set Evaluation',
              description: 'Run inference on the untouched test split. Compute confidence intervals using bootstrap sampling (1,000 iterations).',
              example: 'Final test accuracy: 94.2% ± 0.6% (95% bootstrap confidence interval), confirming statistical reliability.',
            },
            {
              stepNumber: 7,
              title: 'Deep Error Analysis Breakdown',
              description: 'Analyze the top 5% highest-loss samples. Categorize errors into: label noise, ambiguous inputs, out-of-distribution, or representation limits.',
              example: 'Error audit revealed 40% of misclassifications were due to blurry camera lenses, inspiring a custom blur-augmentation pipeline.',
            },
          ],
          callouts: [
            {
              type: 'important',
              title: 'The Golden Rule of Test Sets',
              body: 'The holdout test set must be evaluated EXACTLY ONCE at the very end of your project. If you modify hyperparameters or architecture based on test set performance, your test set is now part of the training process (leakage), invalidating all published claims.',
            },
          ],
          keyTakeaways: [
            'Always establish a simple heuristic/linear baseline before training complex models.',
            'Never evaluate or tune hyperparameters against the test set.',
            'Error analysis on failure modes provides the highest return on research effort.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 3.3 — SCENARIO CONSTRAINTS
    // ──────────────────────────────────────────────────────────
    {
      id: 'which-step-for-which-work',
      title: '3.3 Which Step Works for Which Work? (Scenario Constraints)',
      slug: 'which-step-for-which-work',
      badge: 'Scenario Strategies',
      estimatedMinutes: 15,
      overview: 'Tailored research strategies for small datasets, high-dimensional sparse data, real-time latency constraints, and mandatory interpretability.',
      prerequisites: ['Model Training Workflow'],
      learningGoals: [
        'Adapt the training pipeline when working with fewer than 1,000 samples',
        'Handle high-dimensional sparse data without catastrophic overfitting',
        'Optimize models for sub-10ms real-time production latency budgets',
        'Deploy intrinsically explainable models for regulated healthcare and finance',
      ],
      analogy: {
        title: 'THE SURGICAL ADAPTATION ANALOGY',
        explanation: 'A surgeon uses completely different tools when performing delicate eye surgery (small dataset: delicate precision, no brute force) versus emergency trauma stabilization (real-time latency: ultra-fast, robust, lightweight tools). Your machine learning pipeline must adapt its tools and protocols to the specific constraints of the problem domain.',
        steps: [
          { number: 1, badge: 'Audit', title: 'Identify Hard Constraints', subtitle: 'Sample size, latency, explainability, sparsity.', iconName: 'search' },
          { number: 2, badge: 'Filter', title: 'Prune Incompatible Models', subtitle: 'Eliminate models that violate hard constraints.', iconName: 'filter' },
          { number: 3, badge: 'Adapt', title: 'Apply Targeted Strategy', subtitle: 'Transfer learning, quantization, or EBMs.', iconName: 'cog' },
          { number: 4, badge: 'Audit', title: 'Verify Constraint Met', subtitle: 'Measure P99 latency, VRAM, and fidelity.', iconName: 'rocket' },
        ],
        connectors: ['Audit', 'Filter', 'Deploy'],
      },
      keyQuestions: [
        {
          question: 'What should I do if my dataset has fewer than 1,000 samples?',
          answer: 'Do NOT train deep neural networks from scratch. Instead: 1) Use linear models or Random Forest with strict regularization; 2) Freeze a pre-trained foundation model and train a linear probe or LoRA adapter; 3) Apply extensive domain-specific data augmentation.',
        },
        {
          question: 'How do I optimize an NLP or Vision model for real-time inference (<10ms)?',
          answer: '1) Architecture choice: use DistilBERT or MobileNetV3; 2) Post-training quantization: convert FP32 weights to INT8 via ONNX Runtime or TensorRT (reducing latency by 3-4x); 3) Knowledge distillation: train a compact student model to mimic a large teacher ensemble.',
        },
      ],
      realWorldUses: [
        { industry: 'Mobile Medical Diagnostics (Skin Cancer App)', application: 'Uses MobileNetV3 quantized to INT8 running locally on iOS Neural Engine in 8ms with zero cloud data transmission for patient privacy.' },
        { industry: 'Credit Risk & Loan Approval (FICO)', application: 'Uses Explainable Boosting Machines (EBMs) with exact mathematical feature shape plots for 100% regulatory compliance under the Equal Credit Opportunity Act.' },
      ],
      sections: [
        {
          id: 'scenario-constraints-guide',
          title: 'Tailored Strategies for Specific Constraints',
          subtitle: 'How to Adapt the Research Pipeline to Real-World Resource Limits',
          content: `Real-world computer science research operates under strict constraints. Here is the exact playbook for the 4 most common constraint profiles:`,
          comparisonGrid: {
            title: 'Constraint Playbook Matrix',
            columns: [
              {
                title: 'Small Data (<1K)',
                subtitle: 'Data Scarcity Constraint',
                color: 'amber',
                badge: '<1,000 Samples',
                items: [
                  { label: 'Core Danger', value: 'Overfitting & memorizing noise' },
                  { label: 'Primary Weapon', value: 'Transfer Learning & Pre-trained Probes', highlight: true },
                  { label: 'Regularization', value: 'Heavy L1/L2, Dropout (0.5), Mixup' },
                  { label: 'Validation', value: 'Stratified 10-Fold CV with 5 random seeds' },
                ],
                verdict: '✓ Never train deep nets from scratch here',
              },
              {
                title: 'High-Dim Sparse',
                subtitle: 'Text, Genomics, CTR Ads',
                color: 'violet',
                badge: '100K+ Sparse Features',
                items: [
                  { label: 'Core Danger', value: 'Zero-inflated curse of dimensionality' },
                  { label: 'Primary Weapon', value: 'L1 Lasso / ElasticNet & Embeddings', highlight: true },
                  { label: 'Best Models', value: 'CatBoost, LightGBM, Sparse Logistic' },
                  { label: 'Validation', value: 'Feature selection before non-linearities' },
                ],
                verdict: '✓ L1 sparsification eliminates dead features',
              },
              {
                title: 'Real-Time (<10ms)',
                subtitle: 'Edge & Robotics Constraint',
                color: 'sky',
                badge: 'P99 < 10ms Latency',
                items: [
                  { label: 'Core Danger', value: 'Throughput bottlenecks & memory spikes' },
                  { label: 'Primary Weapon', value: 'INT8 Quantization & Distillation', highlight: true },
                  { label: 'Best Models', value: 'MobileNetV3, DistilBERT, TensorRT' },
                  { label: 'Metric', value: 'Measure P99 latency under concurrency' },
                ],
                verdict: '✓ Quantize FP32 to INT8 via TensorRT/ONNX',
              },
              {
                title: 'Interpretable',
                subtitle: 'Medicine & Legal High-Stakes',
                color: 'emerald',
                badge: 'Mandatory Compliance',
                items: [
                  { label: 'Core Danger', value: 'Unexplainable black-box bias & lawsuits' },
                  { label: 'Primary Weapon', value: 'EBMs (Explainable Boosting Machines)', highlight: true },
                  { label: 'Best Models', value: 'Shallow Decision Trees, ElasticNet, EBMs' },
                  { label: 'Auditing', value: 'Exact TreeSHAP attribution curves' },
                ],
                verdict: '✓ Use inherently interpretable EBM models',
              },
            ],
          },
          callouts: [
            {
              type: 'tip',
              title: 'How to Report Latency in Research Papers',
              body: 'Never report average latency over batch size 1024. Report P50, P90, and P99 latency in milliseconds at batch size 1 on standard target hardware (e.g. NVIDIA T4 or Raspberry Pi 4) with warm-up runs excluded.',
            },
          ],
          keyTakeaways: [
            'On tiny datasets, fine-tune pre-trained foundation models rather than training from scratch.',
            'For latency-critical deployments, measure P99 inference latency and VRAM footprint.',
            'In high-stakes domains (medicine/finance), choose interpretable models (EBMs) over black-box ensembles.',
          ],
        },
      ],
    },
  ],
};
