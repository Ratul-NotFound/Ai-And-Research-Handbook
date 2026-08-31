import { Module } from '@/types';

export const computerVisionModule: Module = {
  id: 'computer-vision',
  number: 10,
  title: 'Computer Vision & Visual Generative Models',
  subtitle: 'From Convolutions and ResNet Identity Mappings to YOLO, Vision Transformers (ViT), DINOv2, and Diffusion Flow Matching',
  iconName: 'Eye',
  color: '#06b6d4', // Cyan
  chapters: [
    {
      id: 'convolutional-foundations-receptive-fields',
      title: '10.1 Convolutions, Pooling, Padding & Receptive Fields',
      slug: 'convolutional-foundations-receptive-fields',
      badge: 'Spatial Filtering',
      estimatedMinutes: 20,
      overview: 'Analyze 2D discrete cross-correlations, stride, dilation, padding calculations, translation equivariance, and effective receptive field growth.',
      prerequisites: ['Linear Algebra', 'Calculus'],
      sections: [
        {
          id: 'convolution-mechanics',
          title: 'Spatial Inductive Bias & 2D Discrete Convolution',
          subtitle: 'Why Convolutions Exploit Translation Equivariance and Local Pixel Connectivity',
          content: `In an unconstrained Dense MLP, connecting a $1000 \\times 1000$ RGB image ($3\\text{M}$ inputs) to $1000$ hidden neurons requires $3\\text{ Billion parameters}$, immediately destroying GPU memory.

### The 2 Core Inductive Biases of Convolutions:
1. **Local Connectivity**: Pixels in spatial proximity share meaningful correlations; distant pixels do not interact at early layers.
2. **Weight Sharing (Translation Equivariance)**: A feature detector (edge, texture, curve) learned at the top-left of an image is equally valid at the bottom-right:
$$f(g(x)) = g(f(x)) \\quad (\\text{Translating input translates feature map})$$

### Output Dimensions & Receptive Field
Given input size $W$, kernel size $K$, padding $P$, stride $S$, and dilation $D$:
$$W_{\\text{out}} = \\left\\lfloor \\frac{W - D(K - 1) - 1 + 2P}{S} \\right\\rfloor + 1$$

The **Effective Receptive Field (ERF)** grows linearly with network depth $L$:
$$\\text{ERF}_l = \\text{ERF}_{l-1} + (K_l - 1) \\prod_{i=1}^{l-1} S_i$$`,
          equations: [
            {
              latex: '(I * K)(i, j) = \\sum_{m=-k}^k \\sum_{n=-k}^k I(i-m, j-n) K(m, n)',
              description: '2D Discrete Convolution operator over spatial image grid.'
            }
          ],
          keyTakeaways: [
            'Convolutions drastically reduce parameters via weight sharing and local spatial connectivity.',
            'Translation equivariance guarantees feature detection regardless of spatial coordinate shift.',
            'Stacking 3x3 kernels produces the receptive field of 7x7 kernels with 45% fewer parameters.'
          ]
        }
      ]
    },
    {
      id: 'cnn-resnet-convnext-architectures',
      title: '10.2 Modern Vision Architectures: ResNet, MobileNet & ConvNeXt',
      slug: 'cnn-resnet-convnext-architectures',
      badge: 'Architecture SOTA',
      estimatedMinutes: 25,
      overview: 'Deconstruct ResNet identity skip connections ($F(x) + x$), Depthwise Separable Convolutions in MobileNet, and the ConvNeXt modernization framework.',
      prerequisites: ['Convolutions'],
      sections: [
        {
          id: 'resnet-convnext-mechanics',
          title: 'Residual Identity Mappings & ConvNeXt Modernization',
          subtitle: 'Why Skip Connections Solved the Degradation Problem in Deep Vision Networks',
          content: `### 1. ResNet Identity Skip Connections ($F(x) + x$)
Before ResNet (He et al. 2015), networks deeper than 20 layers suffered from the degradation problem (higher training loss despite sufficient capacity).

By reparameterizing the layer as a residual mapping:
$$y = \\mathcal{F}(x, \\{W_i\\}) + x$$
the backward gradient becomes:
$$\\frac{\\partial \\mathcal{E}}{\\partial x_l} = \\frac{\\partial \\mathcal{E}}{\\partial x_L} \\left( I + \\frac{\\partial}{\\partial x_l} \\sum_{i=l}^{L-1} \\mathcal{F}(x_i, W_i) \\right)$$
The identity matrix $I$ acts as an uninhibited gradient superhighway, allowing networks with $1000+$ layers to train stably!

### 2. ConvNeXt: Modernizing CNNs to Rival Vision Transformers
Liu et al. (2022) modernized ResNet by adopting Transformer architectural design choices:
- Inverted Bottleneck design ($1 \\to 4 \\to 1$ channel expansion).
- Large $7 \\times 7$ depthwise convolutions (mimicking ViT patch receptive fields).
- Replacing BatchNorm with LayerNorm and ReLU with GELU.
- ConvNeXt matched or exceeded Swin Transformers in accuracy and throughput!`,
          equations: [
            {
              latex: 'x_{l+1} = x_l + \\mathcal{F}(x_l, W_l)',
              description: 'Standard Residual Unit formulation.'
            }
          ],
          keyTakeaways: [
            'Residual skip connections create an identity gradient highway that solves vanishing gradients in deep networks.',
            'Depthwise Separable Convolutions reduce computation by ~8x by separating spatial filtering from channel mixing.',
            'ConvNeXt proved that with modern inverted bottlenecks and 7x7 kernels, pure CNNs match Vision Transformers.'
          ],
          recommendedPapers: [
            {
              title: 'Deep Residual Learning for Image Recognition',
              authors: 'Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun',
              year: 2015,
              arxivId: '1512.03385',
              url: 'https://arxiv.org/abs/1512.03385',
              significance: 'Introduced residual skip connections, enabling networks with hundreds of layers to train stably.'
            },
            {
              title: 'A ConvNet for the 2020s (ConvNeXt)',
              authors: 'Zhuang Liu, Hanzi Mao, Chao-Yuan Wu, Christoph Feichtenhofer, Trevor Darrell, Saining Xie',
              year: 2022,
              arxivId: '2201.03545',
              url: 'https://arxiv.org/abs/2201.03545',
              significance: 'Modernized CNN design space to match Vision Transformers in accuracy, scalability, and efficiency.'
            }
          ]
        }
      ]
    },
    {
      id: 'object-detection-segmentation-yolo-detr',
      title: '10.3 Object Detection & Segmentation: YOLO, DETR & U-Net',
      slug: 'object-detection-segmentation-yolo-detr',
      badge: 'Detection & Segmentation',
      estimatedMinutes: 30,
      overview: 'Explore Single-Stage Detectors (YOLO), Two-Stage Faster R-CNN, DETR Set-Prediction Transformers (Hungarian Loss), and U-Net Medical Segmentation.',
      prerequisites: ['Convolutional Foundations'],
      sections: [
        {
          id: 'detection-segmentation-paradigms',
          title: 'From Sliding Windows to End-to-End DETR Transformers',
          subtitle: 'Comparing Bounding Box Regression, Anchor-Free Detectors, and Pixel Segmentation',
          content: `### 1. Object Detection Paradigms:
- **Two-Stage Detectors (Faster R-CNN)**: Region Proposal Network (RPN) generates candidates $\\to$ RoIAlign classifies and refines bounding boxes. High accuracy, but slower latency ($>50\\text{ms}$).
- **Single-Stage Detectors (YOLO family)**: Treats detection as direct regression from grid cells to coordinates $(x, y, w, h)$ and class probabilities. Real-time ($>100\\text{ FPS}$).
- **DETR (DEtection TRansformer)**: Eliminates non-maximum suppression (NMS) and anchors entirely; uses bipartite matching via **Hungarian Loss** over fixed queries:
$$\\mathcal{L}_{\\text{Hungarian}}(y, \\hat{y}) = \\sum_{i=1}^N \\left[ -\\log \\hat{p}_{\\sigma(i)}(c_i) + \\mathbb{I}_{\\{c_i \\ne \\emptyset\\}} \\mathcal{L}_{\\text{box}}(b_i, \\hat{b}_{\\sigma(i)}) \\right]$$

### 2. Semantic & Instance Segmentation (U-Net & Mask R-CNN)
- **U-Net Architecture**: Contracting encoder path captures context; symmetric expanding decoder path enables precise pixel-level localization via **skip connections between matching resolutions**. Standard in medical imaging!`,
          equations: [
            {
              latex: '\\text{IoU}(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}',
              description: 'Intersection over Union metric for bounding box overlap evaluation.'
            }
          ],
          keyTakeaways: [
            'YOLO optimizes detection as single-stage direct tensor regression for real-time edge performance.',
            'DETR replaces heuristic anchors and NMS with global set prediction and Hungarian matching.',
            'U-Net skip connections preserve fine-grained spatial boundaries for pixel-level semantic segmentation.'
          ]
        }
      ]
    },
    {
      id: 'vision-transformers-dinov2-multimodal',
      title: '10.4 Vision Transformers (ViT), DINOv2 & Multi-Modal Models',
      slug: 'vision-transformers-dinov2-multimodal',
      badge: 'ViT & Multi-Modal',
      estimatedMinutes: 30,
      overview: 'Deconstruct ViT patch tokenization, DINOv2 self-supervised visual features, CLIP contrastive text-image alignment, and LLaVA visual instruction tuning.',
      prerequisites: ['Transformer Architecture'],
      sections: [
        {
          id: 'vit-dinov2-clip-mechanics',
          title: 'Vision Transformers & Self-Supervised Visual Backbones',
          subtitle: 'Replacing Convolutions with Global Patch Self-Attention and Contrastive Pre-Training',
          content: `### 1. Vision Transformer (ViT: Dosovitskiy et al. 2020)
Flattens an image $x \\in \\mathbb{R}^{H \\times W \\times C}$ into $N = \\frac{H W}{P^2}$ patches $x_p \\in \\mathbb{R}^{N \\times (P^2 C)}$ ($16 \\times 16$ pixels per patch).

Patches are linearly projected into embedding vectors, prepended with a \`[CLS]\` token, added to 1D position embeddings, and processed by standard Transformer blocks.

### 2. DINOv2 Self-Supervised Dense Visual Features (Oquab et al. 2023)
Trained without human labels using student-teacher distillation with KoLeo regularizer. DINOv2 emerges dense, pixel-level semantic part segmentations directly in its self-attention maps!

### 3. CLIP (Contrastive Language-Image Pre-Training: Radford et al. 2021)
Trained on $400\\text{M}$ image-text pairs by maximizing cosine similarity of positive pairs along matrix diagonal using symmetric InfoNCE loss:
$$\\mathcal{L} = \\frac{1}{2} (\\mathcal{L}_{I \\to T} + \\mathcal{L}_{T \\to I})$$`,
          equations: [
            {
              latex: '\\mathcal{L}_{I \\to T} = -\\sum_{i=1}^N \\log \\frac{\\exp(\\text{sim}(I_i, T_i) / \\tau)}{\\sum_{j=1}^N \\exp(\\text{sim}(I_i, T_j) / \\tau)}',
              description: 'InfoNCE Contrastive Loss aligning image and text representations in CLIP.'
            }
          ],
          keyTakeaways: [
            'ViT treats 2D images as sequences of flattened 1D patch tokens.',
            'DINOv2 learns robust semantic visual representations without any human annotations.',
            'CLIP aligns visual and textual latent spaces, enabling zero-shot classification and multi-modal LLMs (LLaVA).'
          ],
          recommendedPapers: [
            {
              title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale (ViT)',
              authors: 'Alexey Dosovitskiy, Lucas Beyer, Alexander Kolesnikov, et al.',
              year: 2020,
              arxivId: '2010.11929',
              url: 'https://arxiv.org/abs/2010.11929',
              significance: 'Demonstrated pure Transformer architectures directly replace CNNs on computer vision benchmarks.'
            },
            {
              title: 'Learning Transferable Visual Models From Natural Language Supervision (CLIP)',
              authors: 'Alec Radford, Jong Wook Kim, Chris Hallacy, et al.',
              year: 2021,
              arxivId: '2103.00020',
              url: 'https://arxiv.org/abs/2103.00020',
              significance: 'Pioneered large-scale contrastive vision-language pre-training.'
            }
          ]
        }
      ]
    },
    {
      id: 'generative-diffusion-flow-matching',
      title: '10.5 Generative Visual Models: DDPM, VAEs & Flow Matching',
      slug: 'generative-diffusion-flow-matching',
      badge: 'Visual Generation',
      estimatedMinutes: 30,
      overview: 'Variational Autoencoders (VAEs), Denoising Diffusion Probabilistic Models (DDPM), Classifier-Free Guidance (CFG), and Flow Matching (DiT / Flux).',
      prerequisites: ['Probability', 'Calculus'],
      sections: [
        {
          id: 'diffusion-flow-matching-mechanics',
          title: 'Score-Based Denoising Diffusion & Flow Matching Dynamics',
          subtitle: 'How Generative Models Learn to Reverse Brownian Noise Processes to Generate Photorealistic Images',
          content: `### 1. Forward Noising & Reverse Denoising (DDPM)
- **Forward Process ($q$)**: Gradually adds Gaussian noise over $T=1000$ discrete timesteps:
$$q(x_t | x_0) = \\mathcal{N}\\left( x_t; \\sqrt{\\bar{\\alpha}_t} x_0, (1 - \\bar{\\alpha}_t) I \\right)$$
- **Reverse Process ($p_\\theta$)**: A neural network $\\epsilon_\\theta(x_t, t)$ learns to predict the added noise vector:
$$\\mathcal{L}_{\\text{simple}}(\\theta) = \\mathbb{E}_{t, x_0, \\epsilon} \\left[ \\|\\epsilon - \\epsilon_\\theta(x_t, t)\\|^2 \\right]$$

### 2. Classifier-Free Guidance (CFG: Ho & Salimans 2022)
Enhances prompt adherence by extrapolating predictions with guidance scale $w > 1$:
$$\\tilde{\\epsilon}_\\theta(x_t, c) = \\epsilon_\\theta(x_t, \\emptyset) + w \\cdot (\\epsilon_\\theta(x_t, c) - \\epsilon_\\theta(x_t, \\emptyset))$$

### 3. Flow Matching & Diffusion Transformers (DiT / Flux)
Instead of curved stochastic SDE trajectories, **Flow Matching** learns straight velocity vector fields $v_t(x)$ connecting data and noise, enabling high-fidelity image generation in only $4-20$ sampling steps!`,
          equations: [
            {
              latex: 'x_{t-1} = \\frac{1}{\\sqrt{\\alpha_t}} \\left( x_t - \\frac{1 - \\alpha_t}{\\sqrt{1 - \\bar{\\alpha}_t}} \\epsilon_\\theta(x_t, t) \\right) + \\sigma_t z',
              description: 'Reverse Denoising Step in DDPM.'
            }
          ],
          keyTakeaways: [
            'Diffusion models generate images by learning to reverse a forward Gaussian noise corruption process.',
            'Classifier-Free Guidance amplifies conditional prompt adherence by subtracting unconditional noise.',
            'Flow Matching replaces stochastic curved diffusion paths with straight vector field ODE trajectories.'
          ],
          recommendedPapers: [
            {
              title: 'Denoising Diffusion Probabilistic Models (DDPM)',
              authors: 'Jonathan Ho, Ajay Jain, Pieter Abbeel',
              year: 2020,
              arxivId: '2006.11239',
              url: 'https://arxiv.org/abs/2006.11239',
              significance: 'Established modern score-based diffusion models for high-fidelity generative visual synthesis.'
            }
          ]
        }
      ]
    }
  ]
};
