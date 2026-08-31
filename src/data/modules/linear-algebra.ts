import { Module } from '@/types';

export const linearAlgebraModule: Module = {
  id: 'linear-algebra',
  number: 12,
  title: 'Linear Algebra & Tensor Calculus',
  subtitle: 'Vector Spaces, Matrix Decompositions, and High-Dimensional Geometry in AI',
  iconName: 'Sigma',
  color: '#06b6d4', // Cyan
  chapters: [
    {
      id: 'vector-spaces-matrix-geometry',
      title: '12.1 Vector Spaces, Projections & Geometric Transformations',
      slug: 'vector-spaces-matrix-geometry',
      badge: 'Core Foundations',
      estimatedMinutes: 20,
      overview: 'Understand continuous latent spaces, linear mappings as geometric transformations, inner products, cosine similarity, and orthogonal projections.',
      prerequisites: ['Basic Matrix Multiplication', 'High School Algebra'],
      sections: [
        {
          id: 'latent-space-geometry',
          title: 'Latent Spaces & Vector Embeddings',
          subtitle: 'Why Neural Network Representations Live in High-Dimensional Manifolds',
          content: `In modern AI, every discrete entity—a word token, image patch, or molecular graph—is mapped to a continuous dense vector in $\\mathbb{R}^d$.

Linear transformations $y = W x + b$ represent geometric operations: rotations, shears, and dimension scaling. 

When computing cosine similarity between two embeddings:
$$\\text{sim}(u, v) = \\frac{u \\cdot v}{\\|u\\| \\|v\\|} = \\cos(\\theta)$$
we measure the angular distance between unit-normalized vectors on a hypersphere.

### The Dot Product as a Projection Operator
The dot product $u \\cdot v = \\|u\\| \\|v\\| \\cos\\theta$ measures how much of vector $u$ aligns in the direction of $v$. In Multi-Head Attention, this exact operation measures how relevant a Key vector is to a Query vector.`,
          equations: [
            {
              latex: '\\text{proj}_v(u) = \\frac{u \\cdot v}{\\|v\\|^2} v',
              description: 'Orthogonal projection of vector u onto vector v.'
            },
            {
              latex: '\\|x\\|_2 = \\sqrt{\\sum_{i=1}^d x_i^2}, \\quad \\|x\\|_1 = \\sum_{i=1}^d |x_i|',
              description: 'L2 Euclidean Norm vs L1 Manhattan Norm.'
            }
          ],
          tradeoffs: [
            {
              feature: 'Similarity Metric',
              currentApproach: 'Cosine Similarity $\\frac{u \\cdot v}{\\|u\\| \\|v\\|}$',
              alternativeApproach: 'Euclidean Distance $\\|u - v\\|_2$',
              whyThis: 'Scale-invariant; focuses purely on semantic direction regardless of vector magnitude.',
              whyNotOther: 'Euclidean distance is dominated by vector norm differences in unnormalized embeddings.',
              whenToUse: 'Retrieval Augmented Generation (RAG), vector database search, embedding loss functions.'
            }
          ],
          codeExamples: [
            {
              title: 'Vector Cosine Similarity & Projection in PyTorch',
              language: 'python',
              code: `import torch
import torch.nn.functional as F

# Sample word embeddings (Batch=2, Dim=4)
token_a = torch.tensor([1.2, 0.4, -0.8, 2.1])
token_b = torch.tensor([1.0, 0.5, -0.7, 1.9])

# Compute Cosine Similarity
cos_sim = F.cosine_similarity(token_a.unsqueeze(0), token_b.unsqueeze(0))
print(f"Cosine Similarity: {cos_sim.item():.4f}")

# Orthogonal Projection of A onto B
proj_a_on_b = (torch.dot(token_a, token_b) / torch.dot(token_b, token_b)) * token_b
print(f"Projection Vector: {proj_a_on_b.tolist()}")`,
              explanation: 'Calculates directional alignment between embedding vectors using PyTorch dot-product operations.'
            }
          ],
          keyTakeaways: [
            'Embeddings represent semantic meaning as coordinates in a high-dimensional vector space.',
            'Dot products act as content-addressable similarity detectors in Attention mechanisms.',
            'Normalizing vectors to unit length transforms Euclidean distance calculations into cosine similarity.'
          ]
        }
      ]
    },
    {
      id: 'svd-eigendecomposition',
      title: '12.2 Singular Value Decomposition (SVD) & Low-Rank Approximations',
      slug: 'svd-eigendecomposition',
      badge: 'Matrix Factorization',
      estimatedMinutes: 25,
      overview: 'Master Eigendecomposition, Singular Value Decomposition (SVD), Low-Rank Matrix Approximation (Eckart-Young Theorem), and their role in LoRA.',
      prerequisites: ['Matrix Inverses', 'Determinants'],
      sections: [
        {
          id: 'svd-mechanics-lora',
          title: 'SVD & The Intrinsic Rank Hypothesis in LLMs',
          subtitle: 'Why Foundation Models Can Be Adapted in Low-Rank Subspaces',
          content: `Any weight matrix $W \\in \\mathbb{R}^{m \\times n}$ can be factored into:
$$W = U \\Sigma V^T$$
where $U \\in \\mathbb{R}^{m \\times m}$ and $V \\in \\mathbb{R}^{n \\times n}$ are orthogonal matrices, and $\\Sigma \\in \\mathbb{R}^{m \\times n}$ contains non-negative singular values sorted in descending order: $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0$.

### The Eckart-Young-Mirsky Theorem
The optimal rank-$r$ approximation of $W$ that minimizes the Frobenius error $\\|W - W_r\\|_F$ is obtained by keeping only the top-$r$ singular values:
$$W_r = \\sum_{i=1}^r \\sigma_i u_i v_i^T$$

### Connection to Low-Rank Adaptation (LoRA)
Aghajanyan et al. (2020) and Hu et al. (2021) demonstrated that the weight updates $\\Delta W$ during downstream adaptation have an extremely low "intrinsic rank". By decomposing $\\Delta W = B A$ ($B \\in \\mathbb{R}^{d \\times r}, A \\in \\mathbb{R}^{r \\times k}$ with $r \\ll d$), we can train massive 70B parameter models using a tiny fraction of GPU VRAM!`,
          equations: [
            {
              latex: 'W = U \\Sigma V^T = \\sum_{i=1}^{\\min(m, n)} \\sigma_i u_i v_i^T',
              description: 'Singular Value Decomposition factorization.'
            },
            {
              latex: '\\|W - W_r\\|_F^2 = \\sum_{i=r+1}^{\\min(m,n)} \\sigma_i^2',
              description: 'Frobenius error of truncated rank-r SVD approximation.'
            }
          ],
          tradeoffs: [
            {
              feature: 'Weight Parameterization',
              currentApproach: 'Low-Rank Adapter $\\Delta W = \\frac{\\alpha}{r} B A$',
              alternativeApproach: 'Full-Rank Fine-Tuning $\\Delta W \\in \\mathbb{R}^{d_{out} \\times d_{in}}$',
              whyThis: 'Reduces gradient memory by >90%, enables zero-inference-latency weight merging.',
              whyNotOther: 'Full fine-tuning requires 16 bytes/param in FP32 AdamW for all weights.',
              whenToUse: 'Instruction tuning, multi-task deployment, consumer GPU research.'
            }
          ],
          codeExamples: [
            {
              title: 'SVD Compression & Energy Spectrum in PyTorch',
              language: 'python',
              code: `import torch

# Create a sample weight matrix (e.g. projection layer)
W = torch.randn(1024, 1024)

# Compute full SVD
U, S, Vh = torch.linalg.svd(W, full_matrices=False)

# Truncate to top-16 singular components
rank = 16
W_approx = U[:, :rank] @ torch.diag(S[:rank]) @ Vh[:rank, :]

# Calculate captured energy
total_energy = torch.sum(S**2)
captured_energy = torch.sum(S[:rank]**2)
print(f"Top-{rank} components capture: {(captured_energy / total_energy)*100:.2f}% variance")`,
              explanation: 'Demonstrates low-rank matrix reconstruction by truncating singular values and vectors.'
            }
          ],
          keyTakeaways: [
            'SVD decomposes any linear operator into a rotation, scaling, and second rotation.',
            'The Eckart-Young theorem guarantees that truncated SVD provides the mathematically optimal low-rank matrix approximation.',
            'LoRA leverages the low intrinsic rank of parameter updates to make LLM fine-tuning lightweight.'
          ],
          recommendedPapers: [
            {
              title: 'LoRA: Low-Rank Adaptation of Large Language Models',
              authors: 'Edward J. Hu, Yelong Shen, Phillip Wallis, et al.',
              year: 2021,
              arxivId: '2106.09685',
              url: 'https://arxiv.org/abs/2106.09685',
              significance: 'Introduced low-rank adaptation matrices for parameter-efficient fine-tuning of foundation models.'
            }
          ]
        }
      ]
    }
  ]
};
