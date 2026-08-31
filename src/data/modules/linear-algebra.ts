import { Module } from '@/types';

export const linearAlgebraModule: Module = {
  id: 'linear-algebra',
  number: 12,
  title: 'Linear Algebra & Matrix Calculus',
  subtitle: 'Vectors, Vector Spaces, Matrix Decompositions (Eigendecomposition & SVD), and Matrix Calculus for AI',
  iconName: 'Sigma',
  color: '#06b6d4', // Cyan
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 12.1 — VECTORS, PROJECTIONS & NORMS
    // ──────────────────────────────────────────────────────────
    {
      id: 'vector-spaces-matrix-geometry',
      title: '12.1 Vectors, Vector Spaces, Projections & Norms',
      slug: 'vector-spaces-matrix-geometry',
      badge: 'Vector Foundations',
      estimatedMinutes: 25,
      overview: 'Master vector operations, inner products, cosine similarity, orthogonal projections, and vector norms (L0, L1, L2, L∞) driving modern latent embeddings and attention mechanisms.',
      prerequisites: ['Basic Algebra'],
      learningGoals: [
        'Understand vectors as points, directions, and continuous semantic embeddings in high-dimensional latent space',
        'Apply vector operations (Dot Product, Hadamard Product, Orthogonal Projections) in AI pipelines',
        'Differentiate vector norms (L0, L1, L2, L∞) and their roles in regularization and loss functions',
        'Compute cosine similarity and understand its scale-invariant geometric properties',
      ],
      analogy: {
        title: 'THE SPATIAL NAVIGATION & COMPASS ANALOGY',
        explanation: 'Think of vectors as arrows on a multi-dimensional map. Adding vectors combines movements (combining Word2Vec vectors: "King" - "Man" + "Woman" = "Queen"). The Dot Product is like projecting the shadow of one arrow onto another — measuring how much they point in the same direction. Vector Norms measure the length of the arrow: L2 is the straight-line bird flight distance (Euclidean), while L1 is the Manhattan city-grid taxi driving distance.',
        steps: [
          { number: 1, badge: 'Vector $x$', title: '1. Ordered List of Attributes', subtitle: 'Feature point, word embedding, or token state.', iconName: 'database' },
          { number: 2, badge: 'Inner Product', title: '2. Dot Product $a \\cdot b$', subtitle: 'Measures alignment and semantic similarity.', iconName: 'filter' },
          { number: 3, badge: 'Norm Scale', title: '3. Vector Norms ($\\|x\\|_1, \\|x\\|_2$)', subtitle: 'Measures magnitude, sparsity, and length.', iconName: 'cog' },
          { number: 4, badge: 'Projection', title: '4. Orthogonal Projection', subtitle: 'Decomposes vector onto subspace.', iconName: 'cpu' },
          { number: 5, badge: 'Unit Space', title: '5. Unit Sphere Normalization', subtitle: 'Cosine similarity on hypersphere.', iconName: 'rocket' },
        ],
        connectors: ['Embed', 'Inner Product', 'Normalize', 'Project'],
      },
      keyQuestions: [
        {
          question: 'Why do Transformers and vector databases use Cosine Similarity instead of Euclidean Distance?',
          answer: 'Cosine similarity measures angular direction $\\cos(\\theta) = \\frac{u \\cdot v}{\\|u\\| \\|v\\|}$, which is completely invariant to vector magnitude. In NLP embeddings, document length or token frequency often scales vector magnitude without changing semantic topic. Cosine similarity compares semantic direction purely.',
        },
        {
          question: 'What is the Hadamard Product and where is it used in Deep Learning?',
          answer: 'The Hadamard product $a \\odot b = [a_1 b_1, a_2 b_2, \\dots, a_d b_d]$ is element-wise multiplication. It is the core gating mechanism in LSTMs (forget/input gates), GRUs, SwiGLU activations in LLaMA, and Dropout masking.',
        },
      ],
      realWorldUses: [
        { industry: 'Vector Search & RAG Databases (Pinecone / Milvus / Qdrant)', application: 'Uses HNSW indexing over 1536-dimensional OpenAI embeddings with Cosine Similarity to retrieve relevant document chunks in <10ms.' },
        { industry: 'Transformer Self-Attention (Query-Key Matching)', application: 'Computes scaled dot-product $Q K^T / \\sqrt{d_k}$ as pairwise attention routing weights across all sequence tokens.' },
      ],
      sections: [
        {
          id: 'vectors-operations-norms-deep',
          title: 'Vector Operations & Norms in Data Science',
          subtitle: 'The Core Building Blocks of Latent Representations and Regularization',
          content: `### 1. Fundamental Vector Operations

| Operation | Formula | Use in Data Science & Machine Learning |
| :--- | :--- | :--- |
| **Vector Addition** | $[a_1 + b_1, a_2 + b_2, \\dots]$ | Combining feature vectors, residual connections ($x + f(x)$) |
| **Scalar Multiplication** | $c \\cdot [a_1, a_2, \\dots]$ | Learning rate scaling ($\\eta \\nabla \\mathcal{L}$), weight scaling |
| **Dot Product (Inner)** | $a \\cdot b = \\sum_{i=1}^d a_i b_i$ | Cosine similarity, orthogonal projection, attention scores |
| **Hadamard Product** | $a \\odot b = [a_1 b_1, a_2 b_2, \\dots]$ | Gated activations (SwiGLU), LSTM gates, Dropout masks |
| **Cross Product** | $a \\times b$ (3D only) | Normal vectors, 3D robotics, computer vision geometry |

### 2. Vector Norms Reference Table

| Norm | Mathematical Formula | Role & Use Case in Machine Learning |
| :--- | :--- | :--- |
| **$L_1$ Norm (Manhattan)** | $\\|x\\|_1 = \\sum_{i=1}^d |x_i|$ | **Lasso Regularization**: Induces exact sparsity and automated feature selection |
| **$L_2$ Norm (Euclidean)** | $\\|x\\|_2 = \\sqrt{\\sum_{i=1}^d x_i^2}$ | **Ridge Regularization / Weight Decay**: Standard geometric distance metric |
| **$L_\\infty$ Norm (Max)** | $\\|x\\|_\\infty = \\max_i (|x_i|)$ | Bounding maximum worst-case adversarial perturbation (FGSM attack) |
| **$L_0$ "Norm"** | $\\|x\\|_0 = \\sum_{i=1}^d \\mathbb{I}(x_i \\ne 0)$ | Counting non-zero parameters (NP-hard combinatorial sparsity) |`,
          comparisonGrid: {
            title: 'Vector Distance & Similarity Metrics Comparison',
            columns: [
              {
                title: 'Cosine Similarity',
                subtitle: 'Angular Orientation',
                color: 'sky',
                badge: 'Scale-Invariant',
                items: [
                  { label: 'Formula', value: '$\\frac{u \\cdot v}{\\|u\\| \\|v\\|} = \\cos(\\theta)$' },
                  { label: 'Range', value: '$[-1, 1]$ ($1$ = identical, $-1$ = opposite)' },
                  { label: 'Strength', value: 'Unaffected by vector magnitude differences', highlight: true },
                  { label: 'Best For', value: 'Text embeddings, RAG semantic retrieval' },
                ],
                verdict: '✓ Standard for dense NLP & LLM retrieval',
              },
              {
                title: 'Euclidean ($L_2$) Distance',
                subtitle: 'Straight-Line Spatial Gap',
                color: 'emerald',
                badge: 'Magnitude-Sensitive',
                items: [
                  { label: 'Formula', value: '$\\sqrt{\\sum_{i=1}^d (u_i - v_i)^2}$' },
                  { label: 'Range', value: '$[0, \\infty)$ ($0$ = identical point)' },
                  { label: 'Sensitivity', value: 'Sensitive to feature scale and length', highlight: true },
                  { label: 'Best For', value: 'K-Means clustering, physical coordinates' },
                ],
                verdict: 'Best for calibrated physical coordinates',
              },
              {
                title: 'Manhattan ($L_1$) Distance',
                subtitle: 'Grid / Taxicab Distance',
                color: 'amber',
                badge: 'Robust in High-Dim',
                items: [
                  { label: 'Formula', value: '$\\sum_{i=1}^d |u_i - v_i|$' },
                  { label: 'Range', value: '$[0, \\infty)$' },
                  { label: 'Robustness', value: 'Less distorted by extreme single-axis outliers', highlight: true },
                  { label: 'Best For', value: 'High-dimensional sparse data, financial metrics' },
                ],
                verdict: '✓ More robust than L2 in high dimensions',
              },
            ],
          },
          equations: [
            {
              latex: '\\text{proj}_v(u) = \\frac{u \\cdot v}{\\|v\\|^2} v',
              description: 'Orthogonal projection of vector u onto the direction of vector v.'
            },
            {
              latex: '\\|u - v\\|_2^2 = \\|u\\|_2^2 + \\|v\\|_2^2 - 2 (u \\cdot v)',
              description: 'Relationship connecting Euclidean distance squared and dot product.'
            }
          ],
          keyTakeaways: [
            'Vectors represent discrete concepts as continuous dense coordinates in latent space.',
            'The Dot Product computes projection alignment; Cosine Similarity normalizes for vector length.',
            'L1 norm induces sparsity (Lasso), while L2 norm enforces smooth weight shrinkage (Ridge).',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 12.2 — MATRICES & MATRIX OPERATIONS
    // ──────────────────────────────────────────────────────────
    {
      id: 'matrices-determinants-rank-inversion',
      title: '12.2 Matrices, Invertibility, Determinants, Trace & Rank',
      slug: 'matrices-determinants-rank-inversion',
      badge: 'Matrix Operations',
      estimatedMinutes: 25,
      overview: 'Deconstruct Matrix Transformations, Invertibility criteria, Determinant volume scaling, Matrix Trace, and Rank dimensionality in neural networks.',
      prerequisites: ['12.1 Vectors & Projections'],
      learningGoals: [
        'Understand matrices as linear operators that rotate, scale, and shear vector spaces',
        'Calculate Matrix Transpose, Determinant, Trace, and Inverses',
        'Verify matrix invertibility conditions (non-zero determinant, full rank, linearly independent columns)',
        'Analyze computational complexity of matrix multiplication $O(n^3)$ vs $O(n^{2.807})$ Strassen',
      ],
      analogy: {
        title: 'THE PHOTO RESHAPING LENS ANALOGY',
        explanation: 'A matrix is like an optical lens in front of a camera. Multiplying a vector by a matrix applies a geometric transformation: rotating the picture, zooming in (scaling), or stretching it diagonally (shearing). The Determinant $\\det(A)$ measures how much the lens magnifies or shrinks the area. If $\\det(A) = 0$, the lens squashes the 3D world completely flat into a 2D shadow — meaning depth information is destroyed forever, making it impossible to invert (no inverse matrix exists!).',
        steps: [
          { number: 1, badge: 'Input $x$', title: '1. Input Coordinate', subtitle: 'Vector in domain space $\\mathbb{R}^n$.', iconName: 'database' },
          { number: 2, badge: 'Matrix $A$', title: '2. Linear Transformation', subtitle: 'Rotates, shears, scales: $y = Ax$.', iconName: 'cog' },
          { number: 3, badge: 'Volume $\\det(A)$', title: '3. Determinant Scaling', subtitle: 'Factor of area/volume magnification.', iconName: 'filter' },
          { number: 4, badge: 'Invertibility', title: '4. Rank & Invertibility', subtitle: 'Full rank $\\implies A^{-1}$ recovers input.', iconName: 'cpu' },
        ],
        connectors: ['Input', 'Transform', 'Measure Volume', 'Invert'],
      },
      keyQuestions: [
        {
          question: 'What are the necessary and sufficient conditions for a matrix A to be invertible?',
          answer: 'A square matrix $A \\in \\mathbb{R}^{n \\times n}$ is invertible (non-singular) if and only if: 1) Determinant $\\det(A) \\ne 0$; 2) Full rank $\\text{rank}(A) = n$; 3) Nullspace is trivial $\\text{Null}(A) = \\{0\\}$; 4) All eigenvalues $\\lambda_i \\ne 0$; 5) The columns of $A$ are linearly independent.',
        },
        {
          question: 'Why is Matrix Multiplication NOT commutative ($AB \\ne BA$)?',
          answer: 'Geometric transformations depend strictly on sequence order: rotating a 3D object by 90° and then translating it 5 units produces a completely different final position than translating first and rotating second. Hence $AB \\ne BA$ in general.',
        },
      ],
      realWorldUses: [
        { industry: 'Neural Network Dense Layers ($y = W x + b$)', application: 'Linear layers multiply weight matrix $W \\in \\mathbb{R}^{d_{out} \\times d_{in}}$ by input embeddings, learning linear transformation projections.' },
        { industry: 'Solving OLS Regression & Kalman Filters', application: 'Uses matrix inversion $(X^T X)^{-1}$ and Cholesky decomposition to solve optimal parameter states in flight navigation and physics engines.' },
      ],
      sections: [
        {
          id: 'matrix-operations-properties-table',
          title: 'Master Matrix Operations & Algebraic Properties',
          subtitle: 'The Complete Reference for Linear Algebra in Scientific Computing',
          content: `### Master Matrix Operations Reference Table

| Operation | Notation | Mathematical Definition | Data Science & Machine Learning Use |
| :--- | :--- | :--- | :--- |
| **Matrix Addition** | $A + B$ | Element-wise: $(A+B)_{ij} = A_{ij} + B_{ij}$ | Combining weight layers, residual adding |
| **Scalar Multiplication** | $c A$ | $(cA)_{ij} = c \\cdot A_{ij}$ | Learning rate scaling, temperature scaling |
| **Matrix Multiplication** | $A B$ | $(AB)_{ik} = \\sum_j A_{ij} B_{jk}$ | Neural network forward pass, layer transformations |
| **Matrix Transpose** | $A^T$ | Rows become columns: $(A^T)_{ij} = A_{ji}$ | Gradient backpropagation, computing covariance $X^T X$ |
| **Matrix Inverse** | $A^{-1}$ | $A A^{-1} = A^{-1} A = I$ | Solving linear systems, OLS normal equation $(X^T X)^{-1}$ |
| **Determinant** | $\\det(A)$ or $|A|$ | Volume scaling factor of transformation | Checking matrix invertibility ($\det \\ne 0$), change of variables in Normalizing Flows |
| **Trace** | $\\text{tr}(A)$ | Sum of diagonal: $\\sum_{i=1}^n A_{ii} = \\sum \\lambda_i$ | Sum of eigenvalues, matrix derivative identities, nuclear norm |
| **Rank** | $\\text{rank}(A)$ | Max linearly independent rows/columns | Measuring true intrinsic dimensionality of data matrix |

### Fundamental Algebraic Properties
- **Non-Commutative**: $A B \\ne B A$ (in general)
- **Associative**: $(A B) C = A (B C)$
- **Distributive**: $A (B + C) = A B + A C$
- **Transpose of Product**: $(A B)^T = B^T A^T$
- **Inverse of Product**: $(A B)^{-1} = B^{-1} A^{-1}$`,
          equations: [
            {
              latex: 'A^{-1} = \\frac{1}{\\det(A)} \\text{adj}(A) = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} \\quad (\\text{for } 2\\times 2)',
              description: 'Analytical matrix inverse formula for a 2x2 matrix.'
            },
            {
              latex: '\\text{tr}(A B) = \\text{tr}(B A) \\quad (\\text{Cyclic Property of Trace})',
              description: 'Cyclic property of trace enabling fast matrix derivative computations.'
            }
          ],
          keyTakeaways: [
            'Matrix multiplication represents composite linear transformations and is non-commutative ($AB \\ne BA$).',
            'A matrix is invertible if and only if $\\det(A) \\ne 0$ and $\\text{rank}(A) = n$.',
            'Transpose of product reverses order: $(AB)^T = B^T A^T$; Inverse of product reverses order: $(AB)^{-1} = B^{-1} A^{-1}$.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 12.3 — EIGENVALUES & EIGENVECTORS
    // ──────────────────────────────────────────────────────────
    {
      id: 'eigenvalues-eigenvectors-spectral-decomposition',
      title: '12.3 Eigenvalues, Eigenvectors & Spectral Decomposition',
      slug: 'eigenvalues-eigenvectors-spectral-decomposition',
      badge: 'Eigendecomposition',
      estimatedMinutes: 25,
      overview: 'Deconstruct Eigenvalues ($A v = \\lambda v$), characteristic polynomial $\\det(A - \\lambda I) = 0$, Spectral Decomposition ($A = Q \\Lambda Q^T$), and applications in PCA, PageRank, and Spectral Graph Theory.',
      prerequisites: ['12.2 Matrices & Determinants'],
      learningGoals: [
        'Derive the characteristic equation $\\det(A - \\lambda I) = 0$ and compute eigenvalues/eigenvectors',
        'Understand the Spectral Theorem for symmetric real matrices $A = Q \\Lambda Q^T$',
        'Explain how principal components in PCA correspond to the eigenvectors of the covariance matrix',
        'Analyze Markov transition matrix dominant eigenvectors in Google PageRank',
      ],
      analogy: {
        title: 'THE RESISTANT WIND TURBINE ANALOGY',
        explanation: 'When a fierce wind blows across a field of flags, most flags flap and change direction. But a heavy wind turbine only rotates along its fixed axle — its direction never changes, only its rotational speed increases. An **Eigenvector** $v$ is like that wind turbine axle: when transformed by matrix $A$, it never turns away from its original axis ($A v = \\lambda v$). The **Eigenvalue** $\\lambda$ is the scaling factor measuring how much the vector expands or contracts along that special direction.',
        steps: [
          { number: 1, badge: 'Matrix $A$', title: '1. Square Operator', subtitle: 'Linear operator $A \\in \\mathbb{R}^{n \\times n}$.', iconName: 'database' },
          { number: 2, badge: 'Characteristic', title: '2. Solve $\\det(A - \\lambda I) = 0$', subtitle: 'Find roots $\\lambda_1, \\dots, \\lambda_n$ of polynomial.', iconName: 'filter' },
          { number: 3, badge: 'Nullspace', title: '3. Solve $(A - \\lambda_i I) v_i = 0$', subtitle: 'Find invariant eigenvector directions $v_i$.', iconName: 'cog' },
          { number: 4, badge: 'Diagonalize', title: '4. Spectral Form $Q \\Lambda Q^T$', subtitle: 'Diagonalize matrix into pure scaling basis.', iconName: 'rocket' },
        ],
        connectors: ['Operator', 'Solve $\\det$', 'Extract $v_i$', 'Diagonalize'],
      },
      keyQuestions: [
        {
          question: 'What is the physical and geometric meaning of an Eigenvector and Eigenvalue?',
          answer: 'For almost all vectors $x$, matrix transformation $A x$ changes both magnitude and direction. An eigenvector $v$ is a special invariant direction where $A v$ points in the exact same direction as $v$, scaled by scalar eigenvalue $\\lambda$: $A v = \\lambda v$.',
        },
        {
          question: 'What does the Spectral Theorem guarantee for Symmetric Real Matrices ($A = A^T$)?',
          answer: 'The Spectral Theorem guarantees that any real symmetric matrix has: 1) All real eigenvalues (no imaginary numbers); 2) Mutually orthogonal eigenvectors $Q$; 3) Complete diagonalization $A = Q \\Lambda Q^T$ where $Q Q^T = I$ and $\\Lambda$ is a diagonal matrix of eigenvalues.',
        },
      ],
      realWorldUses: [
        { industry: 'Principal Component Analysis (PCA)', application: 'Eigenvectors of the sample covariance matrix $\\Sigma = \\frac{1}{n} X^T X$ define the principal axes of maximum data variance, while eigenvalues quantify the variance explained.' },
        { industry: 'Google PageRank Web Graph Algorithm', application: 'Computes the dominant eigenvector (eigenvalue $\\lambda=1$) of the stochastic hyperlink transition matrix to rank the importance of billions of web pages.' },
        { industry: 'Spectral Graph Clustering & Graph Neural Networks', application: 'Uses eigenvectors of the Graph Laplacian matrix $L = D - A$ to partition graph communities and define spectral graph convolutions.' },
      ],
      sections: [
        {
          id: 'spectral-decomposition-deep',
          title: 'Spectral Decomposition & Applications in AI',
          subtitle: 'Why Eigendecomposition Unlocks Dimensionality Reduction and Graph Theory',
          content: `### 1. Definition of Eigenvalues & Eigenvectors
For a square matrix $A \\in \\mathbb{R}^{n \\times n}$, a non-zero vector $v \\ne 0$ is an **eigenvector** with **eigenvalue** $\\lambda$ if:
$$A v = \\lambda v \\iff (A - \\lambda I) v = 0$$

For non-trivial solutions to exist, the matrix $(A - \\lambda I)$ must be singular:
$$\\det(A - \\lambda I) = 0 \\quad (\\text{Characteristic Equation})$$

### 2. Applications of Eigendecomposition in AI & Data Science

| Application | How Eigenvalues & Eigenvectors Drive the Algorithm |
| :--- | :--- |
| **PCA (Principal Component Analysis)** | Eigenvectors of sample covariance matrix $\\Sigma$ define principal components; eigenvalues quantify variance explained along each axis |
| **Spectral Clustering** | Eigenvectors of the Graph Laplacian $L = I - D^{-1/2} A D^{-1/2}$ partition graph nodes into tightly connected communities |
| **Google PageRank** | The stationary distribution of the random web surfer is the dominant eigenvector ($\\lambda=1$) of the Google transition matrix |
| **Dynamical System Stability** | Eigenvalues of system Jacobian determine stability: if all $|\\lambda_i| < 1$, the system converges stably to equilibrium |
| **Hessian Loss Surface Curvature** | Eigenvalues of the optimization Hessian $\\nabla^2 \\mathcal{L}$ measure loss curvature: positive $\\lambda > 0$ means bowl minimum, negative $\\lambda < 0$ means saddle point |`,
          equations: [
            {
              latex: 'A = Q \\Lambda Q^T = \\sum_{i=1}^n \\lambda_i q_i q_i^T',
              description: 'Spectral Decomposition of a symmetric matrix as an outer-product sum of rank-1 projections.'
            },
            {
              latex: '\\det(A) = \\prod_{i=1}^n \\lambda_i, \\quad \\text{tr}(A) = \\sum_{i=1}^n \\lambda_i',
              description: 'Determinant is the product of eigenvalues; Trace is the sum of eigenvalues.'
            }
          ],
          keyTakeaways: [
            'Eigenvectors are invariant directions under linear transformations ($Av = \\lambda v$).',
            'Symmetric real matrices are always orthogonally diagonalizable: $A = Q \\Lambda Q^T$.',
            'The trace equals the sum of eigenvalues, and the determinant equals the product of eigenvalues.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 12.4 — SINGULAR VALUE DECOMPOSITION (SVD)
    // ──────────────────────────────────────────────────────────
    {
      id: 'singular-value-decomposition-svd',
      title: '12.4 Singular Value Decomposition (SVD) & Low-Rank Approximation',
      slug: 'singular-value-decomposition-svd',
      badge: 'SVD Mastery',
      estimatedMinutes: 25,
      overview: 'Deconstruct SVD ($A = U \\Sigma V^T$) for non-square matrices, the Eckart-Young Low-Rank Approximation Theorem, Moore-Penrose Pseudo-Inverse, and Latent Semantic Analysis (LSA).',
      prerequisites: ['12.3 Eigenvalues & Eigenvectors'],
      learningGoals: [
        'Formulate SVD for any arbitrary rectangular matrix $A \\in \\mathbb{R}^{m \\times n}$ ($A = U \\Sigma V^T$)',
        'Apply the Eckart-Young Theorem to construct the optimal rank-$k$ matrix approximation',
        'Compute the Moore-Penrose Pseudo-Inverse $A^+ = V \\Sigma^+ U^T$ for non-invertible systems',
        'Implement SVD for image compression, recommendation systems, and LoRA weight factorization',
      ],
      analogy: {
        title: 'THE AUDIO SOUND WAVE COMPRESSION ANALOGY',
        explanation: 'Think of an image or user-rating matrix as a complex musical symphony with 10,000 instrument frequencies. SVD decomposes the sound into 3 clean pieces: the core instrument timbre basis ($U$), the volume/energy of each instrument (singular values $\\Sigma$, sorted from loud bass to quiet whispers), and the song timeline rhythm ($V^T$). To compress the song from 100MB to 2MB, you keep the top 10 loudest instruments and discard the quiet noise whispers (low-rank approximation $A_k$).',
        steps: [
          { number: 1, badge: 'Matrix $A$', title: '1. Rectangular Data ($m \\times n$)', subtitle: 'User-item matrix, image, or term-document.', iconName: 'database' },
          { number: 2, badge: 'Factorize', title: '2. Full SVD: $U \\Sigma V^T$', subtitle: '$U$: left singular, $\\Sigma$: singular values, $V^T$: right singular.', iconName: 'filter' },
          { number: 3, badge: 'Truncate', title: '3. Keep Top-$k$ Singular Values', subtitle: 'Eckart-Young theorem minimizes Frobenius error.', iconName: 'cog' },
          { number: 4, badge: 'Low-Rank', title: '4. Reconstruct $A_k = U_k \\Sigma_k V_k^T$', subtitle: 'Compressed rank-$k$ low-rank representation.', iconName: 'rocket' },
        ],
        connectors: ['Matrix $A$', 'Factorize $U\\Sigma V^T$', 'Truncate Top-$k$', 'Reconstruct $A_k$'],
      },
      keyQuestions: [
        {
          question: 'What is the difference between Eigendecomposition and SVD?',
          answer: 'Eigendecomposition ($A = Q \\Lambda Q^{-1}$) requires $A$ to be a SQUARE matrix ($n \\times n$) with a full set of eigenvectors. SVD ($A = U \\Sigma V^T$) works on ANY rectangular matrix ($m \\times n$). SVD uses two different orthonormal bases ($U$ and $V$), whereas eigendecomposition uses a single basis ($Q$).',
        },
        {
          question: 'What does the Eckart-Young Theorem prove?',
          answer: 'The Eckart-Young Theorem proves that truncating SVD to the top $k$ singular values $A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$ produces the mathematically OPTIMAL rank-$k$ approximation of matrix $A$ in both Frobenius norm $\\|A - A_k\\|_F$ and Spectral norm $\\|A - A_k\\|_2$.',
        },
      ],
      realWorldUses: [
        { industry: 'LoRA (Low-Rank Adaptation of LLMs)', application: 'Decomposes 4096-dimensional parameter updates $\\Delta W$ into low-rank products $B \\cdot A$ ($r=16$), reducing fine-tuning memory by 99.8% based on intrinsic low-rank SVD properties.' },
        { industry: 'Netflix Movie Recommendation (Collaborative Filtering)', application: 'Uses Truncated SVD over the sparse user-movie rating matrix to discover latent movie genres (action, sci-fi) and user taste embeddings.' },
        { industry: 'Latent Semantic Analysis (LSA / NLP Search)', application: 'Decomposes word-document matrices via SVD, mapping synonymous words to identical latent semantic concepts.' },
      ],
      sections: [
        {
          id: 'svd-mechanics-eckart-young',
          title: 'Singular Value Decomposition & Low-Rank Approximation',
          subtitle: 'The Workhorse Decomposition of Machine Learning and Data Compression',
          content: `Every matrix $A \\in \\mathbb{R}^{m \\times n}$ can be factored uniquely as:
$$A = U \\Sigma V^T$$

Where:
- $U \\in \\mathbb{R}^{m \\times m}$: Orthonormal matrix of **Left Singular Vectors** (eigenvectors of $A A^T$)
- $\\Sigma \\in \\mathbb{R}^{m \\times n}$: Diagonal matrix of non-negative **Singular Values** $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r \\ge 0$ (square roots of eigenvalues of $A^T A$)
- $V \\in \\mathbb{R}^{n \\times n}$: Orthonormal matrix of **Right Singular Vectors** (eigenvectors of $A^T A$)

### Applications of SVD Reference Table

| SVD Application | How SVD Solves the Problem |
| :--- | :--- |
| **Low-Rank Data Compression** | Truncating to top-$k$ components keeps major information while reducing storage from $m \\times n$ to $k(m + n + 1)$ |
| **Collaborative Filtering** | Discovers latent user taste vectors ($U$) and latent movie concept vectors ($V$) from sparse ratings |
| **Moore-Penrose Pseudo-Inverse** | Computes $A^+ = V \\Sigma^+ U^T$ to solve under-determined or over-determined linear systems $\\min \\|Ax - b\\|^2$ |
| **Noise Reduction** | Small singular values represent high-frequency noise; zeroing them out acts as a low-pass filter |
| **Latent Semantic Analysis (LSA)** | Decomposes term-document matrix $X$ to discover semantic document topics in NLP |`,
          workflow: {
            title: 'SVD Low-Rank Truncation Pipeline (Image Compression & LoRA)',
            description: 'The 4-stage process converting large dense matrices into compact low-rank representations.',
            direction: 'horizontal',
            nodes: [
              { id: '1', label: '1. Input Matrix A', sublabel: 'Shape $m \\times n$ (e.g. $4096 \\times 4096$)', badge: 'Input', color: 'slate' },
              { id: '2', label: '2. Compute SVD', sublabel: '$A = U \\Sigma V^T$ via randomized SVD', badge: 'Factorize', color: 'sky' },
              { id: '3', label: '3. Truncate Rank k', sublabel: 'Keep top $k$ singular values ($k \\ll n$)', badge: 'Truncate', color: 'amber' },
              { id: '4', label: '4. Output $A_k$', sublabel: '$A_k = U_k \\Sigma_k V_k^T$ (98% compressed)', badge: 'Low-Rank SOTA', color: 'emerald' },
            ],
          },
          equations: [
            {
              latex: 'A = \\sum_{i=1}^r \\sigma_i u_i v_i^T \\implies A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T \\quad (k < r)',
              description: 'Eckart-Young optimal rank-k matrix approximation.'
            },
            {
              latex: 'A^+ = V \\Sigma^+ U^T, \\quad \\Sigma_{ii}^+ = \\begin{cases} 1/\\sigma_i & \\text{if } \\sigma_i > 0 \\\\ 0 & \\text{if } \\sigma_i = 0 \\end{cases}',
              description: 'Moore-Penrose Pseudo-Inverse for solving non-invertible linear systems.'
            }
          ],
          codeExamples: [
            {
              title: 'SVD Low-Rank Approximation in PyTorch',
              language: 'python',
              code: `import torch

# Create a random data matrix (e.g., 1000 samples x 500 features)
A = torch.randn(1000, 500)

# 1. Compute Full SVD
U, S, Vh = torch.linalg.svd(A, full_matrices=False)

# 2. Select rank k (e.g., k=16)
k = 16
U_k = U[:, :k]
S_k = torch.diag(S[:k])
Vh_k = Vh[:k, :]

# 3. Reconstruct Low-Rank Matrix A_k
A_k = U_k @ S_k @ Vh_k

# Compute reconstruction error (Frobenius norm)
error = torch.norm(A - A_k, p='fro') / torch.norm(A, p='fro')
print(f"Rank-{k} Relative Frobenius Error: {error.item():.4f}")`,
              explanation: 'torch.linalg.svd factors matrix A into U, S, and Vh. Truncating to rank k=16 achieves massive dimensionality reduction with minimal Frobenius error.',
            },
          ],
          keyTakeaways: [
            'SVD factors ANY rectangular matrix into left singular vectors, singular values, and right singular vectors.',
            'Eckart-Young Theorem proves truncated SVD produces the optimal rank-k low-rank matrix approximation.',
            'The Moore-Penrose Pseudo-Inverse $A^+ = V \\Sigma^+ U^T$ provides minimum-norm solutions to linear least squares.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 12.5 — MATRIX CALCULUS
    // ──────────────────────────────────────────────────────────
    {
      id: 'matrix-calculus-gradients-hessians',
      title: '12.5 Matrix Calculus: Gradients, Jacobians & Hessians',
      slug: 'matrix-calculus-gradients-hessians',
      badge: 'Matrix Calculus',
      estimatedMinutes: 25,
      overview: 'Master vector and matrix derivatives, the Jacobian matrix, the Hessian curvature matrix, and the universal matrix calculus identities powering automatic differentiation (Backpropagation).',
      prerequisites: ['12.2 Matrices', 'Basic Calculus'],
      learningGoals: [
        'Compute gradients of vector inner products, quadratic forms, and matrix-vector products',
        'Construct the Jacobian matrix $J_{ij} = \\frac{\\partial f_i}{\\partial x_j}$ for vector-valued transformations',
        'Analyze the Hessian matrix $H_{ij} = \\frac{\\partial^2 f}{\\partial x_i \\partial x_j}$ to verify strict loss surface convexity',
        'Apply matrix derivatives to derive Ordinary Least Squares and Ridge closed-form solutions',
      ],
      analogy: {
        title: 'THE MULTI-VARIABLE TOPOGRAPHY MAPPING ANALOGY',
        explanation: 'In 1D calculus, the derivative is just a single scalar slope. In machine learning with 100 million parameters, the loss landscape is an immense high-dimensional mountain range. The **Gradient Vector** $\\nabla f$ is the 3D compass pointing straight up the steepest cliff. The **Jacobian Matrix** $J$ maps how every output dimension shifts when any input coordinate twitches. The **Hessian Matrix** $H$ measures the multi-directional curvature of the mountain bowl — telling you if you are resting in a safe valley (minimum), standing on a peak (maximum), or teetering on a mountain pass saddle point.',
        steps: [
          { number: 1, badge: 'Scalar Loss', title: '1. Loss Function $\\mathcal{L}(w)$', subtitle: 'Maps parameters $\\mathbb{R}^d \\to \\mathbb{R}$.', iconName: 'database' },
          { number: 2, badge: 'Gradient $\\nabla$', title: '2. Gradient Vector $\\nabla_w \\mathcal{L}$', subtitle: 'Direction of steepest ascent: $[\\frac{\\partial \\mathcal{L}}{\\partial w_1}, \\dots]^T$.', iconName: 'filter' },
          { number: 3, badge: 'Jacobian $J$', title: '3. Jacobian Matrix ($J_{ij}$)', subtitle: 'Vector-to-vector derivative: $\\frac{\\partial f_i}{\\partial x_j}$.', iconName: 'cog' },
          { number: 4, badge: 'Hessian $H$', title: '4. Hessian Curvature ($H_{ij}$)', subtitle: 'Second derivatives: $\\frac{\\partial^2 \\mathcal{L}}{\\partial w_i \\partial w_j}$.', iconName: 'rocket' },
        ],
        connectors: ['Loss', 'Gradient $\\nabla$', 'Jacobian $J$', 'Hessian $H$'],
      },
      keyQuestions: [
        {
          question: 'What is the difference between a Gradient, a Jacobian, and a Hessian?',
          answer: '1) **Gradient** $\\nabla f$: Vector of first derivatives for a scalar function $f: \\mathbb{R}^n \\to \\mathbb{R}$. 2) **Jacobian** $J$: Matrix of first partial derivatives for a vector function $f: \\mathbb{R}^n \\to \\mathbb{R}^m$ ($J_{ij} = \\partial f_i / \\partial x_j$). 3) **Hessian** $H$: Square symmetric matrix of second partial derivatives ($H_{ij} = \\partial^2 f / \\partial x_i \\partial x_j$) measuring local curvature.',
        },
        {
          question: 'How does the Hessian matrix determine convexity in optimization?',
          answer: 'If the Hessian matrix $H(x) = \\nabla^2 f(x)$ is positive semi-definite ($H \\succeq 0$, all eigenvalues $\\lambda_i \\ge 0$) everywhere, the function $f(x)$ is strictly CONVEX. This guarantees that any local critical point $\\nabla f(x) = 0$ is a global minimum.',
        },
      ],
      realWorldUses: [
        { industry: 'PyTorch / JAX Autograd Backpropagation Engine', application: 'Uses Vector-Jacobian Products (VJPs) to reverse-mode accumulate gradients across millions of neural network layer parameters in $O(N)$ time.' },
        { industry: 'Newton-Raphson & 2nd-Order Optimizers (L-BFGS / XGBoost)', application: 'Uses Hessian curvature information $H^{-1} \\nabla \\mathcal{L}$ to take quadratic Newton steps directly toward the loss minimum.' },
      ],
      sections: [
        {
          id: 'matrix-derivatives-master-table',
          title: 'Master Matrix Derivatives & Calculus Identities',
          subtitle: 'The Essential Mathematical Rules Powering Automatic Differentiation',
          content: `### Master Matrix Derivatives Table

| Expression $f(x)$ | Derivative $\\frac{\\partial f}{\\partial x}$ | Mathematical Context / ML Use Case |
| :--- | :--- | :--- |
| $a^T x$ or $x^T a$ | $a$ | Linear activation score $\\frac{\\partial}{\\partial x} (w^T x) = w$ |
| $A x$ | $A^T$ | Output layer with respect to input activations |
| $x^T A$ | $A$ | Vector-matrix product derivative |
| $x^T x = \\|x\\|_2^2$ | $2 x$ | Euclidean norm squared derivative in $L_2$ loss |
| $x^T A x$ | $(A + A^T) x$ | Quadratic form derivative (reduces to $2 A x$ if $A$ is symmetric) |
| $\\|A x - b\\|_2^2$ | $2 A^T (A x - b)$ | **Ordinary Least Squares** gradient derivation |
| $\\text{tr}(A X B)$ | $A^T B^T$ | Matrix trace derivative for neural weights |
| $\\log \\det(X)$ | $X^{-1}$ | Multivariate Gaussian log-likelihood maximization |

### The Vector-Jacobian Product (VJP) in Backpropagation
In deep learning backprop, computing the full $m \\times n$ Jacobian matrix explicitly is memory-prohibitive. PyTorch never computes $J$ directly; instead, it computes the **Vector-Jacobian Product (VJP)**:
$$v^T J = v^T \\left( \\frac{\\partial y}{\\partial x} \\right)$$
This propagates an incoming scalar gradient $v = \\frac{\\partial \\mathcal{L}}{\\partial y}$ backwards through layer $y = f(x)$ to compute $\\frac{\\partial \\mathcal{L}}{\\partial x}$ in a single vector dot product!`,
          equations: [
            {
              latex: '\\nabla_x \\left( \\frac{1}{2} x^T A x - b^T x \\right) = A x - b \\quad (\\text{if } A = A^T)',
              description: 'Canonical quadratic form gradient used in Conjugate Gradient optimization.'
            },
            {
              latex: 'H_{ij} = \\frac{\\partial^2 f(x)}{\\partial x_i \\partial x_j}, \\quad H = H^T \\quad (\\text{Schwarz Theorem on Symmetry})',
              description: 'Hessian matrix of second-order partial derivatives.'
            }
          ],
          keyTakeaways: [
            'The gradient of a quadratic form $\\frac{1}{2} x^T A x$ is $A x$ (when $A$ is symmetric).',
            'Positive semi-definite Hessian ($H \\succeq 0$) guarantees strict convexity and zero local minima traps.',
            'Reverse-mode automatic differentiation (PyTorch) evaluates Vector-Jacobian Products (VJPs) in $O(1)$ memory passes.',
          ],
        },
      ],
    },
  ],
};
