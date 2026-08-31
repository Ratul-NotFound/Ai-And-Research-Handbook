import { Module } from '@/types';

export const nplLlmsModule: Module = {
  id: 'nlp-llms',
  number: 9,
  title: 'Natural Language Processing & Large Language Models',
  subtitle: 'From Tokenization and Attention Internals to RoPE, FlashAttention, LoRA, DPO Alignment, and Autonomous Agents',
  iconName: 'MessageSquareText',
  color: '#ec4899', // Pink
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 9.1 — TEXT REPRESENTATION & TOKENIZATION
    // ──────────────────────────────────────────────────────────
    {
      id: 'tokenization-embeddings-subwords',
      title: '9.1 Text Representation: BPE, SentencePiece & Embeddings',
      slug: 'tokenization-embeddings-subwords',
      badge: 'Tokenization',
      estimatedMinutes: 20,
      overview: 'Deconstruct Byte-Pair Encoding (BPE), WordPiece, SentencePiece, and token vocabulary construction driving modern foundation models.',
      prerequisites: ['Basic Algorithms', 'Probability'],
      learningGoals: [
        'Understand why subword tokenization beats character and word-level representations',
        'Trace the Byte-Pair Encoding (BPE) iterative merge algorithm step-by-step',
        'Analyze the trade-offs between vocabulary size and sequence length in LLMs',
        'Recognize tokenization edge cases (numbers, multi-lingual scripts, code indentation)',
      ],
      analogy: {
        title: 'THE MORSE CODE COMPRESSION ANALOGY',
        explanation: 'Tokenization is like designing an ultra-efficient telegram code. Sending every individual letter (character-level) takes 1,000 taps — slow and memory-expensive. Having a unique single symbol for every English word (word-level) requires memorizing 500,000 symbols and breaks on typos. Subword BPE is like creating shorthand abbreviations for the 32,000 most common word fragments ("un", "predict", "able") — 100% vocabulary coverage with maximum compression.',
        steps: [
          { number: 1, badge: 'Raw Bytes', title: '1. UTF-8 Byte Stream', subtitle: 'Initial base vocabulary of 256 bytes.', iconName: 'database' },
          { number: 2, badge: 'Frequency Count', title: '2. Pair Frequency Audit', subtitle: 'Find most frequent adjacent pairs.', iconName: 'filter' },
          { number: 3, badge: 'Iterative Merge', title: '3. Merge Pair -> New Token', subtitle: 'Add merged subword to vocabulary.', iconName: 'cog' },
          { number: 4, badge: 'Target Reached', title: '4. Lock Vocabulary ($V$)', subtitle: '32k-128k token vocabulary fixed.', iconName: 'cpu' },
          { number: 5, badge: 'Embedding Matrix', title: '5. Dense Vector Lookup ($W_E$)', subtitle: 'Token ID -> $d$-dimensional embedding.', iconName: 'rocket' },
        ],
        connectors: ['Byte Stream', 'Count Pairs', 'Merge Top', 'Lookup $W_E$'],
      },
      keyQuestions: [
        {
          question: 'Why do all modern LLMs (GPT-4, LLaMA 3, Claude) use Byte-level BPE?',
          answer: 'Byte-level BPE begins with the 256 raw UTF-8 bytes. This mathematically guarantees zero Out-Of-Vocabulary (OOV) tokens — any text in any human language, emoji, or corrupted unicode can always be decomposed into raw bytes without crashing.',
        },
        {
          question: 'What is the impact of vocabulary size on model performance?',
          answer: 'Larger vocabulary ($V=128\\text{K}$ in LLaMA 3 vs $32\\text{K}$ in LLaMA 2) compresses text into ~15% fewer tokens, reducing sequence length and speeding up inference, but increases the parameter memory in the embedding matrix ($V \\times d$).',
        },
      ],
      realWorldUses: [
        { industry: 'OpenAI tiktoken (cl100k_base / o200k_base)', application: 'Powers GPT-4o with a 200k vocabulary, achieving superior multi-lingual compression efficiency across Arabic, Hindi, Chinese, and Python code.' },
        { industry: 'Hugging Face Tokenizers (Rust)', application: 'Processes gigabytes of raw training text in seconds with multi-threaded Byte-Pair Encoding merges for foundation model training.' },
      ],
      sections: [
        {
          id: 'bpe-tokenization-mechanics',
          title: 'Byte-Pair Encoding & Subword Tokenization',
          subtitle: 'Why Character-Level is Too Long and Word-Level Suffers from Out-Of-Vocabulary Words',
          content: `Before text enters a neural network, it must be mapped into discrete integers (tokens).

### The Tokenization Spectrum

| Approach | Vocabulary Size ($V$) | Sequence Length ($N$) | Out-Of-Vocabulary (OOV) Risk | When Used |
| :--- | :--- | :--- | :--- | :--- |
| **Character-Level** | Tiny ($~256$) | **Extremely Long ($5\\times-8\\times$)** | Zero | Rarely (O($N^2$) attention compute bottleneck) |
| **Word-Level** | Massive ($>500\\text{K}$) | Short ($1\\times$) | **Severe on typos/rare words** | Legacy NLP (Word2Vec / GloVe) |
| **Subword (BPE / SentencePiece)** | **Optimal ($32\\text{K}-128\\text{K}$)** | **Balanced ($1.3\\times$)** | **Zero with byte fallback** | **All Modern LLMs (GPT, LLaMA, Claude)** |`,
          workflow: {
            title: 'Byte-Pair Encoding (BPE) Merge Algorithm',
            description: 'How BPE builds subwords from raw characters over a training corpus.',
            direction: 'horizontal',
            nodes: [
              { id: '1', label: '1. Split to Chars', sublabel: '["l o w", "l o w e r", "n e w"]', badge: 'Base Vocab', color: 'slate' },
              { id: '2', label: '2. Count Pairs', sublabel: 'Count ("l", "o"), ("o", "w")', badge: 'Frequency', color: 'sky' },
              { id: '3', label: '3. Merge Top Pair', sublabel: '("l", "o") -> "lo"', badge: 'Merge 1', color: 'amber' },
              { id: '4', label: '4. Next Top Pair', sublabel: '("lo", "w") -> "low"', badge: 'Merge 2', color: 'violet' },
              { id: '5', label: '5. Lock Vocab', sublabel: 'Target size 32k reached', badge: 'Final Vocab', color: 'emerald' },
            ],
          },
          comparisonGrid: {
            title: 'Subword Tokenization Algorithms Comparison',
            columns: [
              {
                title: 'Byte-Pair Encoding (BPE)',
                subtitle: 'GPT-2/4, LLaMA 1/2/3',
                color: 'sky',
                badge: 'Frequency Merge',
                items: [
                  { label: 'Criterion', value: 'Highest co-occurrence frequency of adjacent pair' },
                  { label: 'Direction', value: 'Bottom-up merging from characters' },
                  { label: 'Byte-Level', value: 'Starts with 256 UTF-8 bytes (Zero OOV)', highlight: true },
                ],
                verdict: '✓ Standard across OpenAI and Meta LLMs',
              },
              {
                title: 'SentencePiece (Unigram)',
                subtitle: 'T5, LLaMA, Gemma, ALBERT',
                color: 'emerald',
                badge: 'Probabilistic Pruning',
                items: [
                  { label: 'Criterion', value: 'Maximizes unigram language model likelihood' },
                  { label: 'Direction', value: 'Top-down pruning from large seed vocabulary' },
                  { label: 'Whitespace', value: 'Treats whitespace as regular character (_)', highlight: true },
                ],
                verdict: '✓ Best for multi-lingual language models',
              },
              {
                title: 'WordPiece',
                subtitle: 'BERT, DistilBERT, Electra',
                color: 'violet',
                badge: 'Likelihood Gain',
                items: [
                  { label: 'Criterion', value: 'Maximizes training data language model likelihood' },
                  { label: 'Direction', value: 'Bottom-up merging with subword prefixes (##)' },
                  { label: 'Byte-Level', value: 'Can produce [UNK] on unhandled unicode' },
                ],
                verdict: 'Standard for encoder-only models',
              },
            ],
          },
          equations: [
            {
              latex: 'v_{\\text{token}} = W_E[i] + W_{\\text{pos}}[j], \\quad W_E \\in \\mathbb{R}^{V \\times d}',
              description: 'Embedding lookup combining token semantic vector and positional embedding.',
            },
          ],
          keyTakeaways: [
            'BPE builds compact subword vocabularies by iteratively merging the most frequent character pairs.',
            'Byte-level BPE guarantees zero Out-Of-Vocabulary (OOV) tokens by falling back to raw UTF-8 bytes.',
            'Tokenization directly affects multi-lingual performance and mathematical reasoning token efficiency.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 9.2 — TRANSFORMER ATTENTION & ROPE INTERNALS
    // ──────────────────────────────────────────────────────────
    {
      id: 'transformer-attention-rope-internals',
      title: '9.2 Transformer Architecture: Scaled Dot-Product & RoPE Internals',
      slug: 'transformer-attention-rope-internals',
      badge: 'Transformer Core',
      estimatedMinutes: 35,
      overview: 'Multi-Head Attention (MHA), Scaled Dot-Product Attention, causal autoregressive masking, and Rotary Position Embeddings (RoPE).',
      prerequisites: ['Linear Algebra', 'Deep Learning Core'],
      learningGoals: [
        'Derive the Scaled Dot-Product Attention equation and justify the scaling factor $\\sqrt{d_k}$',
        'Implement causal autoregressive lower-triangular attention masking',
        'Understand how Rotary Position Embedding (RoPE) embeds relative distance into queries and keys',
        'Analyze why pre-LayerNorm (Pre-LN) and RMSNorm stabilize deep transformer training',
      ],
      analogy: {
        title: 'THE CONTENT-ADDRESSABLE LIBRARY SEARCH ANALOGY',
        explanation: 'Attention is like an intelligent search engine in an infinite library. Your Query ($Q$) is the search query ("Who invented transformers?"). Every book has a Key ($K$) on its spine describing its topic ("Transformer architecture history"). You compute the dot-product similarity between your Query and all Keys (Attention Weights). You then take a weighted average of the actual Book Content ($V$, Values) to formulate your answer. RoPE is the timestamp telling you how many chapters apart two concepts are.',
        steps: [
          { number: 1, badge: 'Projections', title: '1. Compute $Q, K, V$', subtitle: '$Q = X W_Q, K = X W_K, V = X W_V$.', iconName: 'database' },
          { number: 2, badge: 'Rotation', title: '2. Apply RoPE Rotation', subtitle: 'Rotate $Q$ and $K$ by token position $m$.', iconName: 'filter' },
          { number: 3, badge: 'Similarity', title: '3. Scaled Dot-Product', subtitle: 'Compute $S = Q K^T / \\sqrt{d_k} + M$.', iconName: 'cog' },
          { number: 4, badge: 'Softmax', title: '4. Attention Distribution', subtitle: '$P = \\text{softmax}(S)$ routing weights.', iconName: 'cpu' },
          { number: 5, badge: 'Context Output', title: '5. Weighted Values ($P \\cdot V$)', subtitle: 'Multi-Head concatenated projection.', iconName: 'rocket' },
        ],
        connectors: ['Project', 'RoPE Rotate', 'Score $Q K^T$', 'Weight $V$'],
      },
      keyQuestions: [
        {
          question: 'Why do we divide by $\\sqrt{d_k}$ in Scaled Dot-Product Attention?',
          answer: 'For large head dimensions $d_k$, the dot-product $q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i$ has variance $d_k$. Without scaling, large dot-product magnitudes push the softmax function into regions with extremely small gradients (vanishing gradient problem). Dividing by $\\sqrt{d_k}$ scales variance back to 1.0, keeping softmax gradients healthy.',
        },
        {
          question: 'How does Rotary Position Embedding (RoPE) allow context length extension?',
          answer: 'RoPE applies a 2D rotation matrix to query and key pairs at position $m$. The inner product $\\langle R_m q, R_n k \\rangle$ depends purely on the relative distance $(m - n)$. Methods like YaRN and RoPE Base Frequency Scaling interpolate position frequencies, allowing models trained on 4k context to generalize to 128k tokens with minimal fine-tuning.',
        },
      ],
      realWorldUses: [
        { industry: 'LLaMA 3.1 405B Architecture', application: 'Uses RoPE with a base frequency $\\theta = 500,000$, enabling native 128k context window reasoning across complex multi-document inputs.' },
        { industry: 'DeepSeek-V3 Multi-Head Latent Attention (MLA)', application: 'Compresses Key-Value projections into low-rank latent vectors with decoupled RoPE embeddings, slashing KV cache memory by 93%.' },
      ],
      sections: [
        {
          id: 'self-attention-math-rope-deep',
          title: 'Scaled Dot-Product Attention & Rotary Embeddings (RoPE)',
          subtitle: 'The Mathematical Engine Driving GPT-4, LLaMA 3, Claude, and DeepSeek',
          interactiveWidget: 'attention-visualizer',
          content: `Given an input sequence matrix $X \\in \\mathbb{R}^{N \\times d}$, we compute three linear projections:
$$Q = X W_Q, \\quad K = X W_K, \\quad V = X W_V$$

The **Scaled Dot-Product Attention** computes:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left( \\frac{Q K^T}{\\sqrt{d_k}} + M \\right) V$$
where $\\frac{1}{\\sqrt{d_k}}$ prevents large dot-product magnitudes in high dimensions, preventing vanishing gradients in the softmax.

### Rotary Position Embedding (RoPE)
Instead of adding absolute positional vectors, **RoPE** applies a 2D rotation matrix to query and key vector pairs at token position $m$:
$$R_{\\Theta, m}^d = \\text{diag}\\left( R_{\\theta_1, m}, R_{\\theta_2, m}, \\dots, R_{\\theta_{d/2}, m} \\right)$$

This embeds relative distance $(m - n)$ naturally via complex multiplication:
$$\\langle R_m q, R_n k \\rangle = \\text{Re}\\left( (q e^{i m \\theta}) (k e^{i n \\theta})^* \\right) = \\text{Re}\\left( q k^* e^{i (m-n) \\theta} \\right)$$
RoPE decays attention scores smoothly as relative token distance $|m - n|$ increases, enabling long-context extrapolation!`,
          equations: [
            {
              latex: 'R_{\\theta, m} = \\begin{pmatrix} \\cos(m\\theta) & -\\sin(m\\theta) \\\\ \\sin(m\\theta) & \\cos(m\\theta) \\end{pmatrix}, \\quad \\theta_i = 10000^{-2(i-1)/d}',
              description: '2D Rotation matrix block for coordinate pairs in RoPE.',
            },
          ],
          keyTakeaways: [
            'Attention is a content-addressable routing mechanism where Queries search over Keys to weight Values.',
            'The scaling factor sqrt(d_k) stabilizes softmax gradients in high dimensions.',
            'RoPE rotates query and key vectors so their inner product depends strictly on relative token distance (m - n).',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 9.3 — INFERENCE ACCELERATION & FLASHATTENTION
    // ──────────────────────────────────────────────────────────
    {
      id: 'inference-kv-cache-flashattention',
      title: '9.3 Inference Acceleration: KV Cache, GQA & FlashAttention',
      slug: 'inference-kv-cache-flashattention',
      badge: 'Inference SOTA',
      estimatedMinutes: 30,
      overview: 'Deconstruct autoregressive KV Caching, Grouped-Query Attention (GQA), FlashAttention SRAM tiling, and Speculative Decoding.',
      prerequisites: ['Transformer Architecture', 'GPU Memory Hierarchy'],
      sections: [
        {
          id: 'flashattention-gqa-kv-cache',
          title: 'Solving the Memory Bandwidth Bottleneck in LLM Inference',
          subtitle: 'Why IO-Awareness and Grouped-Query Attention Transformed Large Model Serving',
          content: `### 1. The Autoregressive Generation Bottleneck
During token-by-token text generation, computing attention for token $t$ naively requires re-projecting all $t-1$ previous tokens ($O(N^2)$ operations).
**KV Caching** caches previous Key and Value vectors in GPU VRAM, reducing each generation step from $O(N)$ projections to $O(1)$!

### 2. Grouped-Query Attention (GQA)
- **Multi-Head Attention (MHA)**: 32 Query heads, 32 Key heads, 32 Value heads ($1:1:1$).
- **Multi-Query Attention (MQA)**: 32 Query heads share 1 Key head and 1 Value head ($32:1:1$). Fast, but degrades reasoning capability.
- **Grouped-Query Attention (GQA)**: 32 Query heads share 8 Key/Value groups ($4:1$). **Reduces KV cache memory by $4\\times-8\\times$ with zero quality degradation!**

### 3. FlashAttention: IO-Aware SRAM Tiling
Standard attention writes the full $N \\times N$ attention matrix to High Bandwidth Memory (HBM), which is severely memory bandwidth bound.
**FlashAttention** computes exact softmax online using tiling blocks in **fast GPU SRAM ($19\\text{TB/s}$)** without ever materializing the $N \\times N$ matrix in slow HBM ($2\\text{TB/s}$)!`,
          comparisonGrid: {
            title: 'Attention Head Architecture Comparison',
            columns: [
              {
                title: 'Multi-Head Attention (MHA)',
                subtitle: 'Original Transformer, GPT-3',
                color: 'slate',
                badge: '1:1:1 Ratio',
                items: [
                  { label: 'KV Cache Size', value: '100% (High VRAM footprint)' },
                  { label: 'Quality', value: 'Maximum expressive capacity' },
                  { label: 'Long Context', value: 'Exhausts GPU memory rapidly', highlight: true },
                ],
                verdict: 'Legacy standard',
              },
              {
                title: 'Grouped-Query Attention (GQA)',
                subtitle: 'LLaMA 3, Mistral, Gemma 2',
                color: 'emerald',
                badge: '4:1 or 8:1 Ratio',
                items: [
                  { label: 'KV Cache Size', value: '12.5% - 25% (4x to 8x smaller)', highlight: true },
                  { label: 'Quality', value: 'Identical to MHA on benchmarks' },
                  { label: 'Long Context', value: 'Unlocks 128k+ sequence lengths' },
                ],
                verdict: '✓ Modern standard for open-weights LLMs',
              },
              {
                title: 'Multi-Query Attention (MQA)',
                subtitle: 'PaLM, StarCoder',
                color: 'amber',
                badge: '32:1:1 Ratio',
                items: [
                  { label: 'KV Cache Size', value: '3.1% (32x smaller footprint)' },
                  { label: 'Quality', value: 'Slight degradation on complex reasoning' },
                  { label: 'Long Context', value: 'Ultra-fast throughput' },
                ],
                verdict: 'Best for ultra-compact edge models',
              },
            ],
          },
          keyTakeaways: [
            'KV Caching avoids recomputing past tokens during token-by-token autoregressive generation.',
            'GQA shares Key-Value heads across Query groups, slashing inference memory by 75%.',
            'FlashAttention achieves 2-4x speedup by computing online softmax in GPU SRAM without HBM writes.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 9.4 — PEFT, LORA & QLORA
    // ──────────────────────────────────────────────────────────
    {
      id: 'peft-lora-qlora-finetuning',
      title: '9.4 Parameter-Efficient Fine-Tuning (PEFT, LoRA & QLoRA)',
      slug: 'peft-lora-qlora-finetuning',
      badge: 'PEFT & LoRA',
      estimatedMinutes: 25,
      overview: 'Master Low-Rank Adaptation (LoRA), QLoRA 4-bit NormalFloat (NF4), double quantization, and zero-latency weight merging.',
      prerequisites: ['SVD', 'Deep Learning Core'],
      sections: [
        {
          id: 'lora-qlora-mechanics',
          title: 'Low-Rank Adaptation (LoRA) & 4-bit Quantization (QLoRA)',
          subtitle: 'Why We Can Fine-Tune 70B Models on a Single Consumer GPU',
          content: `Full fine-tuning of a 70B parameter model requires updating all parameters with AdamW, needing over $1.1\\text{TB}$ of GPU VRAM.

### Low-Rank Adaptation (LoRA)
Aghajanyan et al. and Hu et al. proved that downstream task weight updates $\\Delta W$ have an extremely low **intrinsic rank $r$**.
Instead of updating $W_0 \\in \\mathbb{R}^{d \\times k}$ directly, LoRA freezes $W_0$ and parameterizes the update as a low-rank product:
$$W = W_0 + \\Delta W = W_0 + \\frac{\\alpha}{r} (B \\cdot A)$$
where $B \\in \\mathbb{R}^{d \\times r}$ (initialized to 0) and $A \\in \\mathbb{R}^{r \\times k}$ (Gaussian initialized), with $r \\ll d$ (e.g. $r=16, d=4096$).

### QLoRA: 4-Bit NormalFloat & Double Quantization
Dettmers et al. (2023) introduced **QLoRA**:
1. **NF4 (NormalFloat4)**: Information-theoretically optimal quantile quantization for normally distributed weights.
2. **Double Quantization**: Quantizes the quantization constants, saving $0.37$ bits per parameter.
3. **Paged Optimizers**: Handles VRAM memory spikes via CPU paging.`,
          decisionTree: {
            title: 'Decision Tree: Which LLM Adaptation Strategy to Use?',
            description: 'Choose between Prompting, RAG, LoRA, and Full Fine-Tuning based on compute and task requirements.',
            root: {
              id: 'root',
              question: 'Do you need the model to learn new factual external knowledge (e.g. company docs)?',
              yes: {
                id: 'rag-choice',
                question: 'Retrieval-Augmented Generation (RAG)',
                answer: 'Use Hybrid BM25 + Vector Search with Cross-Encoder re-ranking. Fine-tuning is ineffective for memorizing dynamic facts.',
                badge: 'RAG Architecture ✓',
              },
              no: {
                id: 'style-or-syntax',
                question: 'Do you need to teach the model a new output format, style, reasoning behavior, or domain syntax?',
                yes: {
                  id: 'gpu-check',
                  question: 'Do you have multiple high-end 80GB H100 GPU clusters?',
                  yes: {
                    id: 'full-ft',
                    question: 'Full-Parameter Fine-Tuning',
                    answer: 'Update all weights with AdamW for maximum alignment when compute is unlimited.',
                    badge: 'Full SFT ✓',
                  },
                  no: {
                    id: 'lora-qlora',
                    question: 'LoRA / QLoRA (Low-Rank Adaptation)',
                    answer: 'Freeze base model in 4-bit NF4 precision and train r=16 rank adapters. Fine-tune 70B on 1 GPU.',
                    badge: 'LoRA / QLoRA ✓',
                  },
                },
                no: {
                  id: 'in-context',
                  question: 'In-Context Prompt Engineering / Few-Shot',
                  answer: 'Use structured system prompts and 3-5 few-shot examples with zero parameter updates.',
                  badge: 'Prompting ✓',
                },
              },
            },
          },
          keyTakeaways: [
            'LoRA decomposes weight updates into two low-rank matrices B and A.',
            'QLoRA quantizes base weights to 4-bit NF4, enabling 70B fine-tuning on a single 48GB GPU.',
            'LoRA adapters can be merged directly into base weights with zero additional inference latency.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 9.5 — ALIGNMENT & REASONING (DPO / GRPO)
    // ──────────────────────────────────────────────────────────
    {
      id: 'alignment-rlhf-dpo-reasoning',
      title: '9.5 Alignment & Reasoning Models: SFT, RLHF, DPO & GRPO',
      slug: 'alignment-rlhf-dpo-reasoning',
      badge: 'Post-Training & Reasoning',
      estimatedMinutes: 35,
      overview: 'Supervised Fine-Tuning (SFT), RLHF with PPO, Direct Preference Optimization (DPO), and Reinforcement Learning Reasoning (DeepSeek-R1 GRPO / OpenAI o1).',
      prerequisites: ['Transformer Architecture', 'Reinforcement Learning'],
      sections: [
        {
          id: 'dpo-and-r1-reasoning',
          title: 'Direct Preference Optimization (DPO) & Reasoning Emergence',
          subtitle: 'From Unstable RLHF Reward Models to Closed-Form Preference Loss and Pure RL Reasoning',
          content: `### 1. Direct Preference Optimization (DPO)
Traditional RLHF requires training a separate Reward Model $r_\\psi(x, y)$ and using unstable PPO to optimize policy $\\pi_\\theta$.

Rafailov et al. (2023) proved that the ground truth reward can be expressed analytically via the optimal policy ratio:
$$r(x, y) = \\beta \\log \\frac{\\pi^*(y|x)}{\\pi_{\\text{ref}}(y|x)} + \\beta \\log Z(x)$$

Substituting this into the Bradley-Terry preference model yields the exact **DPO loss** directly over paired preferences $(y_w \\succ y_l)$:
$$\\mathcal{L}_{\\text{DPO}}(\\pi_\\theta; \\pi_{\\text{ref}}) = - \\mathbb{E}_{(x, y_w, y_l)} \\left[ \\log \\sigma \\left( \\beta \\log \\frac{\\pi_\\theta(y_w|x)}{\\pi_{\\text{ref}}(y_w|x)} - \\beta \\log \\frac{\\pi_\\theta(y_l|x)}{\\pi_{\\text{ref}}(y_l|x)} \\right) \\right]$$

### 2. Large-Scale Reasoning Emergence (DeepSeek-R1 / GRPO)
DeepSeek-R1 demonstrated that **pure Reinforcement Learning using Group Relative Policy Optimization (GRPO)** without human supervised warm-start causes long Chain-of-Thought (CoT) reasoning, self-reflection, and verification behavior to emerge spontaneously!

GRPO computes baseline reward relative to the group mean of $G$ sampled responses without needing a separate critic model:
$$A_i = \\frac{r_i - \\text{mean}(\\{r_1, \\dots, r_G\\})}{\\text{std}(\\{r_1, \\dots, r_G\\})}$$`,
          workflow: {
            title: 'Modern Post-Training Pipeline (From Raw Pretraining to Reasoning)',
            description: 'The standard sequential stages turning base LLMs into reasoning agents.',
            direction: 'horizontal',
            nodes: [
              { id: '1', label: '1. Base Pretraining', sublabel: 'Trillions of tokens next-token prediction', badge: 'Pre-Train', color: 'slate' },
              { id: '2', label: '2. Supervised SFT', sublabel: 'Instruction-following demonstration pairs', badge: 'SFT', color: 'sky' },
              { id: '3', label: '3. DPO Alignment', sublabel: 'Preference tuning (chosen vs rejected)', badge: 'DPO', color: 'amber' },
              { id: '4', label: '4. GRPO Large-Scale RL', sublabel: 'Rule-based verifiable rewards on math/code', badge: 'Reasoning SOTA', color: 'emerald' },
            ],
          },
          keyTakeaways: [
            'DPO bypasses the instability of RL training by mathematically expressing rewards through implicit policy ratios.',
            'DeepSeek-R1 proved that large-scale RL on verifiable math/code tasks triggers spontaneous emergent reasoning and self-correction.',
            'GRPO eliminates the Critic model in PPO, saving 50% GPU memory during RL training.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 9.6 — RAG & AUTONOMOUS AI AGENTS
    // ──────────────────────────────────────────────────────────
    {
      id: 'rag-autonomous-ai-agents',
      title: '9.6 Retrieval-Augmented Generation (RAG) & AI Agents',
      slug: 'rag-autonomous-ai-agents',
      badge: 'RAG & Agents',
      estimatedMinutes: 30,
      overview: 'Dense vector retrieval, hybrid BM25 + embedding search, ReAct agent loops (Thought-Action-Observation), and tool calling architectures.',
      prerequisites: ['Vector Embeddings', 'Transformer Architecture'],
      sections: [
        {
          id: 'rag-agent-architecture',
          title: 'Advanced RAG & Autonomous Agent Loops',
          subtitle: 'Connecting Foundation Models to External Knowledge Graphs, APIs, and Execution Sandboxes',
          content: `### 1. Advanced RAG Architecture
- **Chunking Strategy**: Recursive character chunking ($512$ tokens with $50$ token overlap) or semantic boundary splitting.
- **Hybrid Search**: Combines **Sparse BM25** (exact keyword match for code, IDs, part numbers) with **Dense Embeddings** (semantic concepts) via Reciprocal Rank Fusion (RRF):
$$\\text{RRF}(d) = \\sum_{m \\in \\{\\text{Dense, BM25}\\}} \\frac{1}{60 + r_m(d)}$$
- **Re-ranking**: Cross-Encoder (e.g. BGE-Reranker, Cohere) evaluates paired $(q, \\text{chunk})$ interactions for top-5 candidates.

### 2. Autonomous Agent Loops (ReAct Paradigm)
Yao et al. (2022) formalized the **ReAct (Reason + Act)** loop:
$$\\text{Thought} \\to \\text{Action (Tool Call)} \\to \\text{Observation (Tool Output)} \\to \\dots \\to \\text{Final Answer}$$
Agents combine internal reasoning with external deterministic tools: bash shell execution, web search, database SQL querying, and Python code interpreters.`,
          workflow: {
            title: 'ReAct Agent Execution Loop',
            description: 'How autonomous agents execute multi-step tool interactions to solve complex tasks.',
            direction: 'horizontal',
            nodes: [
              { id: '1', label: '1. User Prompt', sublabel: 'Task goal & context', badge: 'Goal', color: 'slate' },
              { id: '2', label: '2. Thought (CoT)', sublabel: 'Internal reasoning & tool selection', badge: 'Reason', color: 'sky' },
              { id: '3', label: '3. Tool Action', sublabel: 'Execute API / Python / Bash', badge: 'Execute', color: 'violet' },
              { id: '4', label: '4. Observation', sublabel: 'Parse tool output & verify', badge: 'Observe', color: 'amber' },
              { id: '5', label: '5. Final Response', sublabel: 'Synthesize verified solution', badge: 'Complete', color: 'emerald' },
            ],
          },
          keyTakeaways: [
            'Hybrid search (BM25 + Dense Embeddings) outperforms pure vector search on technical corpora.',
            'Cross-Encoder re-ranking dramatically improves context precision for RAG pipelines.',
            'ReAct agents interleave Chain-of-Thought reasoning with deterministic external tool execution.',
          ],
        },
      ],
    },
  ],
};
