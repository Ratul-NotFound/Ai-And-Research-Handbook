import { Module } from '@/types';

export const deepLearningModule: Module = {
  id: 'deep-learning',
  number: 8,
  title: 'Deep Learning Core & Scaling Laws',
  subtitle: 'Universal Approximation, Backpropagation, Activations, Normalization, Optimizers & Chinchilla Scaling',
  iconName: 'Cpu',
  color: '#7c3aed',
  chapters: [

    // ─────────────────────────────────────────────────
    // CHAPTER 8.1 — NEURAL FOUNDATIONS
    // ─────────────────────────────────────────────────
    {
      id: 'neural-foundations-universal-approximation',
      title: '8.1 Neural Networks: Foundations & Universal Approximation',
      slug: 'neural-foundations-universal-approximation',
      badge: 'Neural Foundations',
      estimatedMinutes: 30,
      overview: 'A neural network is a parameterized function composed of linear transformations and non-linear activations. Understanding WHY depth works better than width, HOW backpropagation computes gradients, and WHAT the Universal Approximation Theorem actually guarantees is essential for doing meaningful deep learning research.',
      prerequisites: ['Linear Algebra', 'Calculus', 'Probability Basics'],
      learningGoals: [
        'State the Universal Approximation Theorem precisely and identify its limitations',
        'Explain why deep networks outperform wide shallow networks in practice',
        'Trace the forward pass and backward pass (backpropagation) step by step',
        'Implement a simple MLP from scratch in PyTorch',
        'Understand the vanishing gradient problem and why modern activations (ReLU, SwiGLU) solve it',
      ],
      analogy: {
        title: 'THE HIERARCHICAL FEATURE FACTORY',
        explanation: "A deep neural network learns like a chef learning to cook. A beginner sees 'ingredients.' A trained chef sees 'flavor profiles,' 'textures,' 'aromas,' and 'plating styles' — a hierarchy of abstractions. Layer 1 detects raw edges (pixel gradients). Layer 2 detects textures (combinations of edges). Layer 3 detects object parts (combinations of textures). Layer 4 identifies the whole object. Each layer builds richer abstractions from simpler ones — just like expertise is built from hierarchical experience.",
        steps: [
          { number: 1, badge: 'Raw Input', title: 'Input Layer (x)', subtitle: 'Raw pixels, tokens, or feature vectors.', iconName: 'database' },
          { number: 2, badge: 'Linear Map', title: 'Matrix Multiply (Wx + b)', subtitle: 'Rotates and stretches the feature space.', iconName: 'cog' },
          { number: 3, badge: 'Non-Linearity', title: 'Activation Gate (ReLU/GELU)', subtitle: 'Bends space to enable curved boundaries.', iconName: 'filter' },
          { number: 4, badge: 'Error Signal', title: 'Loss & Backprop', subtitle: 'Chain rule propagates error backwards.', iconName: 'cpu' },
          { number: 5, badge: 'Updated Model', title: 'Gradient Descent Update', subtitle: 'Parameters refined toward optimum.', iconName: 'rocket' },
        ],
        connectors: ['Project', 'Activate', 'Loss', 'Backprop'],
      },
      keyQuestions: [
        {
          question: 'What does the Universal Approximation Theorem actually say?',
          answer: 'A feedforward network with ONE hidden layer and a non-linear activation can approximate any continuous function on a compact domain to arbitrary precision — IF given unlimited width. The theorem guarantees expressiveness, NOT efficient learnability.',
        },
        {
          question: 'Why use DEEP networks instead of one very WIDE layer?',
          answer: 'Telgarsky (2016) proved that a deep network of depth L can compute functions requiring O(2^L) oscillations, while a shallow network needs O(2^(L/2)) neurons for the same complexity. Depth exponentially compresses the number of parameters needed for hierarchical functions.',
        },
        {
          question: 'What is backpropagation and why is it efficient?',
          answer: 'Backpropagation is reverse-mode automatic differentiation applied to computation graphs. It computes ALL parameter gradients in one backward pass via the chain rule — requiring only O(forward_pass) additional computation, making it O(n) rather than O(n²) for n parameters.',
        },
        {
          question: 'What is the vanishing gradient problem?',
          answer: 'When using sigmoid or tanh activations, gradients get multiplied by values ≤ 0.25 at every layer. In a 50-layer network, the gradient at layer 1 is 0.25^50 ≈ 10^-31 — effectively zero. The solution: ReLU (gradient = 1 if active), batch normalization, and residual connections.',
        },
      ],
      realWorldUses: [
        {
          industry: 'Large Language Models (GPT-4, Gemini, Claude)',
          application: 'Stacked transformer blocks — each containing MLP layers with billions of parameters — store and retrieve world knowledge through hierarchical feature representations learned via backpropagation on trillions of tokens.',
        },
        {
          industry: 'AlphaFold 2 (Protein Structure Prediction)',
          application: 'Deep MLPs combined with attention mechanisms predict 3D protein structures from 1D amino acid sequences — solving a 50-year open biology problem. The hierarchical feature hierarchy learns: residue properties → local motifs → secondary structures → 3D folds.',
        },
        {
          industry: 'Medical Image Diagnosis (Radiology AI)',
          application: "Google Health's Grail cancer detection model uses deep CNNs (50+ layers) to detect cancer from mammograms — outperforming US radiologists. The hierarchical features correspond to micro-calcifications, tissue texture anomalies, and mass shapes.",
        },
      ],
      sections: [
        {
          id: 'forward-backward-pass',
          title: 'The Forward Pass, Loss Function & Backpropagation',
          subtitle: 'How Neural Networks Learn from Mistakes',
          content: `### The Forward Pass

In a neural network with L layers, the forward pass computes the prediction:

| Layer | Operation | Intuition |
| :--- | :--- | :--- |
| **Input** | x ∈ ℝ^d | Raw input features |
| **Hidden Layer l** | z^(l) = W^(l) a^(l-1) + b^(l) | Linear transformation (rotate + translate) |
| **Activation** | a^(l) = σ(z^(l)) | Non-linear gate (enables curved boundaries) |
| **Output** | ŷ = softmax(z^(L)) | Probability distribution over classes |

### Why Non-Linear Activations Are Essential

Without non-linearities, a 100-layer network collapses to a single linear transformation:
W^(100) × W^(99) × ... × W^(1) = W_effective (just one matrix multiply).

Non-linear activations prevent this collapse — each layer learns a genuinely different, non-linear transformation.

### The Loss Function

The loss function quantifies how wrong the prediction is:

| Task | Loss Function | Formula |
| :--- | :--- | :--- |
| **Binary Classification** | Binary Cross-Entropy | −[y log(ŷ) + (1−y) log(1−ŷ)] |
| **Multi-class Classification** | Categorical Cross-Entropy | −Σ yᵢ log(ŷᵢ) |
| **Regression** | Mean Squared Error | (1/n) Σ(y − ŷ)² |
| **Language Modeling** | Cross-Entropy (next token) | −Σ log P(token_t+1 \\| token_1..t) |`,
          callouts: [
            {
              type: 'definition',
              title: 'Backpropagation (Backprop)',
              body: 'The algorithm for efficiently computing the gradient of the loss with respect to all parameters in a neural network. It applies the chain rule in reverse through the computation graph. A forward pass O(n) computation yields ALL O(n) gradients in just ONE backward pass of comparable cost.',
            },
            {
              type: 'example',
              title: 'Real World: Why GPT Training Takes Months',
              body: "GPT-4 has an estimated 1.8 trillion parameters. Each training step requires: one forward pass (compute predictions), one backward pass (compute gradients for all 1.8T parameters), and one optimizer step. Doing this for ~1 trillion tokens requires thousands of A100 GPUs running for months — and backprop's efficiency is the ONLY reason it is computationally tractable at all.",
            },
            {
              type: 'warning',
              title: 'Vanishing Gradients: The Silent Training Killer',
              body: "When using sigmoid activation: the gradient is at most 0.25. In a 100-layer network: 0.25^100 ≈ 6×10^-61. The early layers receive gradients this close to zero — they NEVER learn. Solution: use ReLU (gradient = 1 when active), add Batch Normalization after every layer, and use residual (skip) connections to provide gradient highways.",
            },
          ],
          equations: [
            {
              latex: 'z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}, \\quad a^{(l)} = \\sigma(z^{(l)})',
              description: 'Forward pass: affine transformation followed by element-wise non-linear activation at each layer l.',
            },
            {
              latex: '\\frac{\\partial \\mathcal{L}}{\\partial W^{(l)}} = \\frac{\\partial \\mathcal{L}}{\\partial z^{(l)}} \\cdot (a^{(l-1)})^T \\quad \\text{(Backprop Chain Rule)}',
              description: 'Backpropagation: gradient of loss with respect to layer weights is the outer product of the upstream gradient and the layer input.',
            },
          ],
          codeExamples: [
            {
              title: 'Multi-Layer Perceptron in PyTorch (from scratch)',
              language: 'python',
              code: `import torch
import torch.nn as nn
import torch.optim as optim

class MLP(nn.Module):
    """
    Multi-Layer Perceptron with 3 hidden layers.
    Architecture: Input → 256 → 128 → 64 → Output
    """
    def __init__(self, input_dim: int, hidden_dims: list, output_dim: int):
        super().__init__()
        
        layers = []
        prev_dim = input_dim
        for hidden_dim in hidden_dims:
            layers.extend([
                nn.Linear(prev_dim, hidden_dim),
                nn.BatchNorm1d(hidden_dim),   # Prevents vanishing gradients
                nn.GELU(),                     # Better than ReLU for most tasks
                nn.Dropout(0.1),              # Regularization
            ])
            prev_dim = hidden_dim
        layers.append(nn.Linear(prev_dim, output_dim))
        
        self.network = nn.Sequential(*layers)
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.network(x)

# Instantiate model
model = MLP(input_dim=784, hidden_dims=[256, 128, 64], output_dim=10)

# Training step
optimizer = optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)
loss_fn = nn.CrossEntropyLoss()

# One training iteration
def train_step(batch_x, batch_y):
    model.train()
    optimizer.zero_grad()         # Clear previous gradients
    
    logits = model(batch_x)       # Forward pass
    loss = loss_fn(logits, batch_y)  # Compute loss
    
    loss.backward()               # Backprop: compute all gradients
    
    # Gradient clipping: prevents exploding gradients
    nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    
    optimizer.step()              # Update parameters
    return loss.item()`,
              explanation: 'BatchNorm + GELU + AdamW is the modern standard MLP recipe. BatchNorm prevents vanishing gradients. GELU outperforms ReLU on most tasks. AdamW adds proper weight decay compared to Adam.',
            },
          ],
          keyTakeaways: [
            'The forward pass computes predictions; the backward pass computes all gradients in one O(n) sweep via the chain rule.',
            'Non-linear activations (ReLU, GELU) are essential — without them, any depth of network collapses to a single linear transform.',
            'Vanishing gradients (from sigmoid/tanh) kill training in deep networks — use ReLU/GELU + BatchNorm + residual connections.',
            'BatchNorm + GELU + AdamW + gradient clipping is the modern standard recipe for training deep MLPs.',
          ],
        },
        {
          id: 'activation-functions-comparison',
          title: 'Activation Functions: From ReLU to SwiGLU',
          subtitle: 'Which Activation and When — A Complete Decision Guide',
          interactiveWidget: 'activation-visualizer',
          content: `Activation functions are the non-linear gates that determine what information flows through the network. Choosing the wrong activation is a common source of slow convergence and unstable training.

### The Evolution of Activations

| Activation | Formula | Gradient | When to Use | Why NOT |
| :--- | :--- | :--- | :--- | :--- |
| **Sigmoid** | 1/(1+e^-x) | ≤ 0.25 (vanishes!) | Output layer (binary classification) | Vanishing gradients in deep nets |
| **Tanh** | (e^x−e^-x)/(e^x+e^-x) | ≤ 1.0 | RNNs, gated units | Still vanishes at extremes |
| **ReLU** | max(0, x) | 0 or 1 | Deep CNNs, most standard use | Dead neurons (x < 0 → gradient = 0) |
| **GELU** | x·Φ(x) (smooth ReLU) | Smooth, near-linear | Transformers (BERT, GPT, ViT) | Slightly more compute than ReLU |
| **SwiGLU** | x·σ(x)⊗(Wx+b) | Gated, learnable | LLMs (LLaMA, PaLM, Gemini) | More parameters than GELU |

### Why SwiGLU Won for LLMs

Google's PaLM and Meta's LLaMA both use SwiGLU after finding it outperforms GELU/ReLU/GLU on language modeling perplexity. The key: it uses a learnable gating mechanism that selectively amplifies or suppresses each dimension — allowing the network to learn which features to propagate rather than using a fixed threshold.`,
          callouts: [
            {
              type: 'tip',
              title: 'Which Activation to Use (Quick Guide)',
              body: 'Default choice (CNN, standard MLP): ReLU. Transformer encoder/decoder (BERT-style, ViT): GELU. Large Language Model (LLaMA, PaLM, Gemini): SwiGLU. Output binary classification: Sigmoid. Output multi-class: no activation + CrossEntropyLoss (PyTorch applies softmax internally).',
            },
            {
              type: 'warning',
              title: 'Dead ReLU Neurons — A Real Training Problem',
              body: 'If a ReLU neuron receives only negative inputs during training, its gradient is always 0 — the neuron is permanently "dead" and contributes nothing. Fix: use LeakyReLU (small negative slope) or ELU. Or better, use GELU which is smooth everywhere.',
            },
          ],
          keyTakeaways: [
            'Use ReLU for standard CNNs and MLPs — simple, fast, and well-understood.',
            'Use GELU for transformer architectures — smoother than ReLU, better empirical performance.',
            'Use SwiGLU for large language models — the learnable gate consistently outperforms GELU in language modeling.',
            'Never use sigmoid in hidden layers of deep networks — vanishing gradients will kill training.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────
    // CHAPTER 8.2 — TRAINING DEEP NETWORKS
    // ─────────────────────────────────────────────────
    {
      id: 'training-deep-networks',
      title: '8.2 Training Deep Networks: Optimizers, Normalization & Regularization',
      slug: 'training-deep-networks',
      badge: 'Training Mastery',
      estimatedMinutes: 35,
      overview: 'Getting a deep network to actually converge to a good solution requires the right optimizer, normalization strategy, regularization, and learning rate schedule. Most "my model is not training" problems are optimizer, normalization, or learning rate issues — not architecture problems.',
      prerequisites: ['Chapter 8.1 — Neural Foundations', 'Calculus (partial derivatives)', 'Linear Algebra'],
      learningGoals: [
        'Compare SGD, Adam, and AdamW — when to use each',
        'Understand BatchNorm, LayerNorm, and RMSNorm and when each is appropriate',
        'Implement a learning rate warmup + cosine decay schedule',
        'Apply dropout, weight decay, and gradient clipping correctly',
        'Diagnose training failures from loss curves',
      ],
      analogy: {
        title: 'THE MOUNTAIN DESCENT ANALOGY',
        explanation: "Training a neural network is like descending a mountainous landscape blindfolded — you can only feel the slope beneath your feet (the local gradient), not see the whole terrain. SGD takes small careful steps in the steepest-downhill direction. Adam remembers how steep the path has been recently (momentum) and adjusts step size per direction (adaptive learning rates). AdamW adds a leash (weight decay) that pulls you back if you wander too far from the starting area. The learning rate schedule determines whether you rush at first (warmup) and slow down as you approach the valley (cosine decay).",
        steps: [
          { number: 1, badge: 'Compute Gradient', title: 'Measure Local Slope', subtitle: 'Backprop gives gradient ∇L(θ).', iconName: 'filter' },
          { number: 2, badge: 'Accumulate Momentum', title: 'Build Velocity', subtitle: 'Adam tracks gradient history (m, v).', iconName: 'cog' },
          { number: 3, badge: 'Adaptive Step', title: 'Scale Step Size', subtitle: 'Larger steps in sparse dimensions.', iconName: 'cpu' },
          { number: 4, badge: 'Regularize', title: 'Weight Decay Leash', subtitle: 'Prevent overfitting to training data.', iconName: 'database' },
          { number: 5, badge: 'Converged', title: 'Reach the Valley', subtitle: 'Loss minimized, model generalizes.', iconName: 'rocket' },
        ],
        connectors: ['→', '→', '→', '→'],
      },
      keyQuestions: [
        {
          question: 'What is the difference between Adam and AdamW?',
          answer: 'Adam applies weight decay by adding λθ to the gradient — which interacts incorrectly with adaptive learning rates. AdamW decouples weight decay from the gradient update, applying it directly to the parameter: θ ← θ(1−λ) − α·m̂/√(v̂+ε). This makes weight decay work correctly as L2 regularization. Always prefer AdamW over Adam for modern deep learning.',
        },
        {
          question: 'Why do transformers use LayerNorm instead of BatchNorm?',
          answer: 'BatchNorm normalizes across the batch dimension — problematic for transformers where batch sizes are small and sequence lengths vary. LayerNorm normalizes across the feature dimension within each single example, making it independent of batch size and sequence length. For LLMs with batch size 1 at inference, BatchNorm would have no meaningful statistics to normalize with.',
        },
        {
          question: 'What is learning rate warmup and why is it necessary?',
          answer: 'At initialization, parameters are random and gradients are noisy. A sudden large learning rate causes instability or divergence. Warmup linearly increases lr from ~0 to the target lr over 1000–5000 steps, letting the model stabilize before taking large steps. Essential for transformer training — skipping warmup often causes NaN losses in the first 100 steps.',
        },
        {
          question: 'How do I know if my model is underfitting or overfitting?',
          answer: 'Underfitting: both training AND validation loss remain high. Fix: increase model size, reduce regularization, or train longer. Overfitting: training loss is low but validation loss is increasing. Fix: increase dropout, increase weight decay, reduce model size, add more data, or use early stopping.',
        },
      ],
      realWorldUses: [
        {
          industry: 'GPT-4 / LLaMA Training (AdamW + Cosine LR)',
          application: 'All major LLMs use AdamW with β1=0.9, β2=0.95, warmup for 2000 steps, then cosine decay to 10% of peak LR. This schedule is now the de facto standard for language model pre-training.',
        },
        {
          industry: 'Vision Transformers (ViT) — LayerNorm',
          application: 'ViT uses pre-norm LayerNorm (before each attention and MLP block) rather than BatchNorm — enabling stable training with small batches per GPU and arbitrary image resolutions without fixed spatial statistics.',
        },
      ],
      sections: [
        {
          id: 'optimizers-comparison',
          title: 'Optimizer Comparison: SGD → Adam → AdamW → Muon',
          subtitle: 'The Complete Optimizer Decision Guide',
          content: `### The Optimizer Landscape

| Optimizer | Update Rule | Pros | Cons | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **SGD** | θ ← θ − α∇L | Simple, generalizes well | Needs careful LR tuning, slow | CNNs with known LR schedules (ResNet, etc.) |
| **SGD + Momentum** | v ← βv − α∇L; θ ← θ + v | Escapes flat regions faster | Still needs LR tuning | CNNs, competitive with Adam when tuned |
| **Adam** | m̂/√(v̂+ε) adaptive step | Fast convergence, less LR sensitivity | Weight decay buggy | Quick experimentation |
| **AdamW** | Decoupled weight decay | Correct L2 regularization, better generalization | Slightly more memory | **Default for all transformers and LLMs** |
| **Muon** | Nesterov + orthogonal projection | Faster convergence on LLMs | Very new, less proven | LLM pre-training research (Karpathy 2024) |

### Learning Rate Schedule: Warmup + Cosine Decay

The most effective learning rate schedule for transformers:

1. **Linear Warmup**: LR grows from 0 to peak over T_warmup steps
2. **Cosine Decay**: LR decays as α(t) = α_min + 0.5(α_peak − α_min)(1 + cos(πt/T_max))

> **Rule of Thumb**: Warmup = 1% of total training steps. Peak LR = 3e-4 (Adam/AdamW). Final LR = 10% of peak. This schedule is used by GPT-2, LLaMA, Mistral, and Gemini.`,
          callouts: [
            {
              type: 'tip',
              title: 'The Modern Training Recipe (Copy-Paste Ready)',
              body: 'Optimizer: AdamW(lr=3e-4, betas=(0.9, 0.95), weight_decay=0.1). Schedule: LinearWarmup(2000 steps) → CosineAnnealingLR(T_max=total_steps, eta_min=3e-5). Gradient Clipping: max_norm=1.0. Batch Size: as large as GPU memory allows. This recipe is used by LLaMA, Mistral, and most transformer models.',
            },
            {
              type: 'warning',
              title: 'Do NOT Use Adam Without Weight Decay',
              body: 'Adam without weight decay is known to accumulate large parameter values over time, leading to overfit and poor generalization. Always use AdamW (decoupled weight decay) instead of adding L2 penalty to the loss — they are mathematically different and AdamW is correct.',
            },
          ],
          codeExamples: [
            {
              title: 'AdamW + Warmup + Cosine Decay (Modern LLM Recipe)',
              language: 'python',
              code: `import torch
import torch.optim as optim
from torch.optim.lr_scheduler import CosineAnnealingLR

# Model and optimizer setup
model = TransformerModel(...)  # Your model

optimizer = optim.AdamW(
    model.parameters(),
    lr=3e-4,          # Peak learning rate
    betas=(0.9, 0.95),  # Beta2=0.95 (not 0.999) for LLMs
    weight_decay=0.1,   # Decoupled L2 regularization
    eps=1e-8,
)

# Learning rate schedule: warmup then cosine decay
def lr_lambda(step):
    warmup_steps = 2000
    total_steps = 100_000
    if step < warmup_steps:
        # Linear warmup: 0 → 1
        return step / warmup_steps
    else:
        # Cosine decay: 1 → 0.1
        progress = (step - warmup_steps) / (total_steps - warmup_steps)
        cosine_decay = 0.5 * (1 + torch.cos(torch.tensor(3.14159 * progress)))
        return 0.1 + 0.9 * cosine_decay  # min 10% of peak

scheduler = optim.lr_scheduler.LambdaLR(optimizer, lr_lambda)

# Training loop
for step, (x, y) in enumerate(train_loader):
    optimizer.zero_grad()
    
    logits = model(x)
    loss = loss_fn(logits, y)
    
    loss.backward()
    
    # CRITICAL: clip gradients before optimizer step
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    
    optimizer.step()
    scheduler.step()  # Update LR after each step`,
              explanation: 'This is the exact recipe used by LLaMA, Mistral, and most modern LLMs. Beta2=0.95 (not 0.999) is important for LLMs — it makes the optimizer more responsive to recent gradient statistics.',
            },
          ],
          keyTakeaways: [
            'Always use AdamW over Adam — decoupled weight decay is mathematically correct; Adam weight decay is buggy.',
            'Learning rate warmup (2000 steps linear) prevents NaN losses at the start of transformer training.',
            'Cosine decay to 10% of peak LR outperforms constant LR and step decay for most deep learning tasks.',
            'Gradient clipping (max_norm=1.0) is essential — without it, a single bad batch can corrupt the entire model.',
            'For quick experiments use Adam(lr=1e-3). For production models use AdamW(lr=3e-4) + warmup + cosine decay.',
          ],
          recommendedPapers: [
            {
              title: 'Decoupled Weight Decay Regularization (AdamW)',
              authors: 'Loshchilov, I. & Hutter, F.',
              year: 2019,
              arxivId: '1711.05101',
              url: 'https://arxiv.org/abs/1711.05101',
              significance: 'The paper that introduced AdamW — now the default optimizer for virtually all transformer and LLM training.',
            },
            {
              title: 'Scaling Laws for Neural Language Models (Chinchilla)',
              authors: 'Hoffmann, J., Borgeaud, S., et al. (DeepMind)',
              year: 2022,
              arxivId: '2203.15556',
              url: 'https://arxiv.org/abs/2203.15556',
              significance: 'The Chinchilla paper. Proved that models should train on ~20 tokens per parameter, fundamentally changing how the industry trains LLMs (LLaMA, Mistral, etc.).',
            },
          ],
        },
      ],
    },
  ],
};
