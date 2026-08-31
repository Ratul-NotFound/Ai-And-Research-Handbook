import { Module } from '@/types';

export const csDataResearchModule: Module = {
  id: 'data-cs-research',
  number: 2,
  title: 'Data for CS Research',
  subtitle: 'Data Modalities, Collection, Preprocessing, Storage & Splitting Best Practices',
  iconName: 'Boxes',
  color: '#0891b2',
  chapters: [

    // ─────────────────────────────────────────────────
    // CHAPTER 2.1 — TYPES OF DATA
    // ─────────────────────────────────────────────────
    {
      id: 'types-of-data-cs-research',
      title: '2.1 Types of Data in CS Research',
      slug: 'types-of-data-cs-research',
      badge: 'Data Modalities',
      estimatedMinutes: 20,
      overview: 'The type of data you work with determines your entire pipeline: which model architecture you can use, which preprocessing steps are mandatory, and which evaluation metrics make sense. Understanding all 6 core data modalities is foundational.',
      prerequisites: ['Python basics', 'Chapter 1.1 — Research Methodology'],
      learningGoals: [
        'Name the 6 core data modalities and their real-world examples',
        'Explain why tabular data favors tree models while unstructured data requires deep learning',
        'Identify the correct data modality for a given research problem',
        'Understand structured vs unstructured data preprocessing requirements',
      ],
      analogy: {
        title: 'THE CHEF\'S INGREDIENTS ANALOGY',
        explanation: "A chef's kitchen receives 6 types of raw ingredients. Pre-portioned vegetables (Tabular) need minimal prep. Raw logs of wood (Text/Audio) must be chopped and seasoned. Whole pumpkins (Images) must be peeled, cut, and reshaped into equal cubes. Electrical wiring (Graph Networks) is already connected in patterns — you trace those patterns. Sensor readings from an oven thermometer (Time-Series) change over time and must be read in order. Each ingredient requires a different set of kitchen tools — just as each data modality requires a different ML pipeline.",
        steps: [
          { number: 1, badge: 'Modality 1', title: 'Tabular Data', subtitle: 'Rows & columns with fixed schema — CSV, SQL.', iconName: 'database' },
          { number: 2, badge: 'Modality 2', title: 'Text & Audio', subtitle: 'Sequential tokens — NLP and speech.', iconName: 'filter' },
          { number: 3, badge: 'Modality 3', title: 'Images & Video', subtitle: 'Spatial tensors H×W×C and temporal clips.', iconName: 'layers' },
          { number: 4, badge: 'Modality 4', title: 'Graph Networks', subtitle: 'Nodes, edges, adjacency matrices.', iconName: 'cog' },
          { number: 5, badge: 'Modality 5', title: 'Time-Series', subtitle: 'Temporal sequences ordered by timestamp.', iconName: 'cpu' },
          { number: 6, badge: 'Modality 6', title: 'Geospatial Data', subtitle: 'Coordinates, rasters, polygons on maps.', iconName: 'rocket' },
        ],
        connectors: ['→', '→', '→', '→', '→'],
      },
      keyQuestions: [
        {
          question: 'What are the 6 core data modalities?',
          answer: '1) Structured/Tabular 2) Text/NLP 3) Audio 4) Images & Video 5) Graph Networks 6) Time-Series / Geospatial. Each modality has distinct preprocessing, model architecture, and evaluation requirements.',
        },
        {
          question: 'Why does tabular data favor gradient-boosted trees over neural networks?',
          answer: 'Tabular features exist in unaligned coordinate spaces — each column means something completely different (age vs income vs zip code). Decision trees split features orthogonally, which is perfect for this structure. Neural networks need enormous amounts of data to discover these feature interactions from scratch.',
        },
        {
          question: 'Why does unstructured data (images, text) require deep learning?',
          answer: 'Images exhibit translation invariance: a cat in the top-left and a cat in the bottom-right are the same cat. CNNs exploit this via shared convolutional filters. Text exhibits sequential dependency: word order matters. Transformers model this via positional attention. These structures are invisible to tree models.',
        },
        {
          question: 'What is multi-modal data and why is it important?',
          answer: 'Multi-modal data combines multiple modalities simultaneously — like a medical record with tabular patient info, radiology images, and clinical notes. Modern models like GPT-4V and CLIP learn cross-modal representations that outperform single-modality models on tasks requiring holistic understanding.',
        },
      ],
      realWorldUses: [
        {
          industry: 'Healthcare (Tabular + Image)',
          application: 'Epic Systems combines structured EHR (Electronic Health Records) tabular data with chest X-ray images to predict ICU deterioration — a multi-modal classification problem.',
        },
        {
          industry: 'Social Media (Graph + Text)',
          application: "Twitter's recommendation algorithm uses a graph neural network over user-tweet-user interaction graphs combined with text embeddings of tweet content to rank your feed.",
        },
        {
          industry: 'Finance (Time-Series + Tabular)',
          application: "Bloomberg's trading models combine time-series market price data (OHLCV: Open, High, Low, Close, Volume) with tabular fundamental financial metrics (P/E ratio, EPS) to generate trade signals.",
        },
        {
          industry: 'Autonomous Vehicles (Multi-modal)',
          application: "Waymo fuses LiDAR point clouds (3D Geospatial), camera images (Vision), and HD map data (Graph/Geospatial) simultaneously in a single unified representation for real-time 3D scene understanding.",
        },
      ],
      sections: [
        {
          id: 'data-types-deep-dive',
          title: 'The 6 Core Data Modalities Explained',
          subtitle: 'From Tabular Records to Spatial Graphs and Temporal Streams',
          content: `Every CS research project deals with one or more of these 6 data modalities. Your modality determines your entire pipeline.

| Modality | Examples | Best Model Families | Format |
| :--- | :--- | :--- | :--- |
| **Structured / Tabular** | Medical records, financial data, census datasets | XGBoost, LightGBM, TabNet | CSV, SQL, Parquet |
| **Text (NLP)** | Articles, social media, legal documents, code | Transformers (BERT, GPT, T5) | Plain text, JSON |
| **Audio & Speech** | Voice commands, music, telephone recordings | Wav2Vec2, Whisper, HiFi-GAN | WAV, MP3, FLAC |
| **Images & Video** | Medical scans, satellite imagery, driving footage | CNNs (ResNet, EfficientNet), ViT, CLIP | PNG/JPG, MP4 |
| **Graphs & Networks** | Social graphs, knowledge graphs, molecular graphs | GCN, GraphSAGE, GAT | EdgeList, Adjacency Matrix |
| **Time-Series** | Stock prices, ECG signals, IoT sensor readings | LSTM, Temporal CNN, Transformers | CSV with timestamps, InfluxDB |

### Structured vs Unstructured: The Core Divide

The single most important distinction in data science is **structured vs unstructured**:

**Structured data** has a predefined schema. You know exactly what each column means, what data type it holds, and what valid range it should have. You can query it with SQL immediately.

**Unstructured data** has no predefined schema. Raw text is just a string of characters. An image is just a grid of RGB pixel values. The *meaning* must be learned — and learning it from raw pixels or characters requires deep learning and enormous datasets.`,
          callouts: [
            {
              type: 'example',
              title: 'Real World: Why Kaggle Winners Use XGBoost on Tabular Data',
              body: 'In 2016–2023 Kaggle competitions on structured tabular data, gradient-boosted trees (XGBoost, LightGBM, CatBoost) won over 80% of competitions. Deep neural networks, despite being more complex, consistently underperform on well-structured tabular datasets. Understanding your data modality prevents wasted effort on the wrong model family.',
            },
            {
              type: 'tip',
              title: 'Multi-Modal is the Future',
              body: 'The most impactful research (GPT-4V, CLIP, Flamingo, Gemini) combines multiple modalities. If your research problem involves both text AND images (e.g., medical report generation from scans), explore multi-modal architectures — they consistently outperform single-modality approaches.',
            },
            {
              type: 'warning',
              title: 'Modality Mismatch = Wrong Architecture',
              body: 'Using a CNN on tabular data, or using a decision tree on raw images — both are fundamental mistakes. Always match your model architecture to your data modality. Using the wrong architecture adds complexity without improving performance.',
            },
          ],
          decisionTree: {
            title: 'Decision Tree: Which Data Modality Do I Have?',
            description: 'Use this to identify your data type before choosing a model architecture.',
            root: {
              id: 'root',
              question: 'Does your data have a predefined, fixed schema (columns with known meaning)?',
              yes: {
                id: 'structured',
                question: 'Structured / Tabular Data',
                answer: 'Use CSV, SQL, or Parquet format. Best models: XGBoost, LightGBM, CatBoost, TabNet. Features must be normalised or encoded depending on model family.',
                badge: 'Tabular ✓',
              },
              no: {
                id: 'unstructured-check',
                question: 'Is the data ordered by time (each sample has a timestamp)?',
                yes: {
                  id: 'timeseries',
                  question: 'Time-Series Data',
                  answer: 'Use Temporal CNNs, LSTMs, or Transformers with positional embeddings. NEVER shuffle — always use a temporal train/test split.',
                  badge: 'Time-Series ✓',
                },
                no: {
                  id: 'modal-check',
                  question: 'Is the data a grid of pixels (image or video)?',
                  yes: {
                    id: 'vision',
                    question: 'Image or Video Data',
                    answer: 'Use CNNs (ResNet, EfficientNet) or Vision Transformers (ViT). Preprocessing: resize to fixed resolution, normalise with dataset mean/std, apply augmentation only to training set.',
                    badge: 'Image/Video ✓',
                  },
                  no: {
                    id: 'text-graph-check',
                    question: 'Is the data a sequence of tokens (words, code, audio samples)?',
                    yes: {
                      id: 'text-audio',
                      question: 'Text or Audio Data',
                      answer: 'Text: use transformer models (BERT, GPT, T5) with tokenisation (BPE or WordPiece). Audio: use Wav2Vec2, Whisper, or mel-spectrogram + CNN.',
                      badge: 'Text/Audio ✓',
                    },
                    no: {
                      id: 'graph',
                      question: 'Graph / Network Data',
                      answer: 'Data with nodes and edges (social networks, molecules, knowledge graphs). Use Graph Neural Networks: GCN, GraphSAGE, GAT, or Graph Transformers.',
                      badge: 'Graph ✓',
                    },
                  },
                },
              },
            },
          },
          comparisonGrid: {
            title: 'Structured vs Unstructured — When to Use Which',
            columns: [
              {
                title: 'Structured / Tabular',
                subtitle: 'Predefined schema, explicit features',
                color: 'emerald',
                badge: 'Fixed Schema',
                items: [
                  { label: 'Examples', value: 'Medical records, financial data, census, e-commerce transactions' },
                  { label: 'Best Models', value: 'XGBoost, LightGBM, CatBoost, Random Forest', highlight: true },
                  { label: 'Why Trees Win', value: 'Decision trees split features orthogonally — perfect for unaligned coordinate spaces' },
                  { label: 'Preprocessing', value: 'Normalise numerics, encode categoricals, impute missing values' },
                  { label: 'Data Size', value: 'Works well even with thousands of rows (no need for millions)' },
                ],
                verdict: '✓ Start here for tabular research problems',
              },
              {
                title: 'Unstructured Data',
                subtitle: 'No predefined schema — raw signals',
                color: 'violet',
                badge: 'No Schema',
                items: [
                  { label: 'Examples', value: 'Images, text documents, audio waveforms, video streams' },
                  { label: 'Best Models', value: 'Transformers, CNNs, RNNs — deep learning required', highlight: true },
                  { label: 'Why Deep Learning', value: 'Meaning is not explicit — must be learned from raw pixel/token patterns via feature hierarchy' },
                  { label: 'Preprocessing', value: 'Tokenise/resize/normalise — task-specific and architecture-specific' },
                  { label: 'Data Size', value: 'Typically needs 10K+ samples; large models need millions' },
                ],
                verdict: 'Use deep learning — trees cannot learn from raw pixels',
              },
            ],
          },
          keyTakeaways: [
            'There are 6 core data modalities: Tabular, Text, Audio, Image/Video, Graph, and Time-Series.',
            'Structured data favors tree models; unstructured data requires deep learning architectures.',
            'Multi-modal data combines modalities — modern AI research (GPT-4V, CLIP, Gemini) is increasingly multi-modal.',
            'Always identify your data modality FIRST — it determines your entire pipeline architecture.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────
    // CHAPTER 2.2 — HOW TO COLLECT DATA
    // ─────────────────────────────────────────────────
    {
      id: 'data-collection-strategy',
      title: '2.2 How to Collect Data for CS Research',
      slug: 'data-collection-strategy',
      badge: 'Collection Strategy',
      estimatedMinutes: 22,
      overview: 'Data collection is not just "downloading a dataset." It involves choosing the right source, assessing data quality, handling licensing, designing collection protocols that prevent bias, and documenting provenance so others can reproduce your work.',
      prerequisites: ['Chapter 2.1 — Data Modalities'],
      learningGoals: [
        'Distinguish between 5 primary data collection strategies',
        'Identify and mitigate the most common sources of collection bias',
        'Evaluate a dataset for quality, coverage, and licensing',
        'Understand the legal and ethical requirements for data collection',
        'Write a data provenance document for reproducibility',
      ],
      analogy: {
        title: 'THE JOURNALIST INVESTIGATION ANALOGY',
        explanation: "A journalist investigating a story does not accept the first source they find. They seek multiple independent sources, verify the source's credibility, cross-check facts, consider whose perspective might be missing (selection bias), and document every source for editorial review. Data collection in CS research follows the same discipline — multiple sources, bias assessment, legal verification, and full provenance documentation.",
        steps: [
          { number: 1, badge: 'Identify Source', title: 'Choose Data Sources', subtitle: 'Public datasets, APIs, web scraping, sensors.', iconName: 'search' },
          { number: 2, badge: 'Verify Quality', title: 'Assess Quality & Bias', subtitle: 'Completeness, accuracy, representation.', iconName: 'filter' },
          { number: 3, badge: 'Legal Check', title: 'Verify Licensing', subtitle: 'Open, restricted, or proprietary?', iconName: 'cog' },
          { number: 4, badge: 'Collect', title: 'Execute Collection Protocol', subtitle: 'Reproducible, auditable data pipeline.', iconName: 'database' },
          { number: 5, badge: 'Document', title: 'Write Provenance Record', subtitle: 'Source, date, version, preprocessing steps.', iconName: 'rocket' },
        ],
        connectors: ['→', '→', '→', '→'],
      },
      keyQuestions: [
        {
          question: 'What are the 5 primary data collection strategies in CS?',
          answer: '1) Use existing public benchmark datasets (safest for reproducibility). 2) API scraping from web services. 3) Web scraping (HTML parsing with BeautifulSoup/Scrapy). 4) Sensor/instrument data collection. 5) Human annotation via crowdsourcing (Amazon Mechanical Turk, Scale AI).',
        },
        {
          question: 'What is selection bias and why is it dangerous?',
          answer: "Selection bias occurs when your data collection method systematically over-represents or under-represents certain groups. Example: training a face recognition model only on photos from social media over-represents younger, urban, tech-savvy users — causing the model to perform poorly on elderly rural users. IBM's 2019 Gender Shades study found commercial face recognition systems had up to 34% higher error rates on darker-skinned women vs lighter-skinned men.",
        },
        {
          question: 'What is a data provenance document?',
          answer: 'A formal record of where your data came from, when it was collected, which version you used, what preprocessing was applied, and under what license. It enables others to reproduce your exact dataset. Journals like Nature Machine Intelligence now require data provenance documentation for all submissions.',
        },
        {
          question: 'What licensing do I need to check before using a dataset?',
          answer: 'Check: 1) Is it for academic research only (cannot use commercially)? 2) Does it require attribution? 3) Are there restrictions on model outputs trained on this data? Example: Common Crawl has no restrictions, but some datasets like Getty Images data are restricted. The LAION-5B dataset controversy (used to train Stable Diffusion) raised copyright issues that led to lawsuits.',
        },
      ],
      sections: [
        {
          id: 'collection-strategies',
          title: 'The 5 Data Collection Strategies',
          subtitle: 'Choosing the Right Source for Your Research Question',
          content: `Data collection strategy must be chosen based on your research question, data modality, compute budget, and legal constraints.

### Strategy 1: Public Benchmark Datasets (Recommended Starting Point)

The fastest and most reproducible approach. Use widely-accepted benchmarks from:
- **Computer Vision**: ImageNet-1K, COCO, CIFAR-10/100, Open Images
- **NLP**: GLUE, SuperGLUE, SQuAD, WMT Translation Corpora, Common Crawl
- **Time-Series**: UCR Archive (128 datasets), M5 Competition, PhysioNet (medical)
- **Graphs**: OGB (Open Graph Benchmark), TUDataset, SNAP datasets
- **Code**: CodeSearchNet, HumanEval, APPS, SWE-Bench

**Advantage**: Reproducible comparisons against prior work.
**Disadvantage**: May not match your specific domain or research question.

### Strategy 2: API Data Collection

Programmatically collect data from web services:
- Twitter/X API for social media discourse analysis
- GitHub API for software engineering studies
- PubMed API for biomedical literature
- OpenWeatherMap API for climate data

**Key requirement**: Rate limiting handling, pagination, and incremental checkpointing.

### Strategy 3: Web Scraping

Parse HTML content from public websites using Scrapy or BeautifulSoup:
- Legal if robots.txt allows and Terms of Service permit
- Always check \`robots.txt\` at \`domain.com/robots.txt\` before scraping
- Store raw HTML before processing — lets you reprocess without re-scraping

### Strategy 4: Sensor & Instrument Collection

For IoT, medical, or scientific research:
- Design collection hardware carefully — sensor placement determines data quality
- Synchronize timestamps across multiple sensors
- Log metadata: ambient conditions, device firmware version, calibration date

### Strategy 5: Crowdsourced Human Annotation

For labeled datasets where ground truth requires human judgment:
- Amazon Mechanical Turk, Scale AI, Labelbox, CVAT
- Use redundant annotation: minimum 3 annotators per sample
- Measure inter-annotator agreement with Cohen's Kappa or Fleiss's Kappa`,
          callouts: [
            {
              type: 'warning',
              title: 'Common Bias Sources to Document and Mitigate',
              body: 'Selection Bias: your sample does not represent the population. Label Bias: annotators from one culture may disagree with another. Temporal Bias: data from 2015 may not represent 2024 reality. Geographic Bias: English-language data over-represents Western perspectives. Document ALL known biases in your data section — hiding them leads to unfair model evaluations.',
            },
            {
              type: 'example',
              title: 'Real World: The PULSE Facial Recognition Bias Scandal',
              body: 'In 2020, PULSE (a super-resolution model trained on FFHQ dataset) consistently hallucinated white faces when upscaling images of people of color. Investigation revealed FFHQ dataset contained 70%+ white faces — a direct collection bias that encoded racist outputs. The lesson: always analyse your dataset demographics before training.',
            },
            {
              type: 'tip',
              title: 'Always Perform Exploratory Data Analysis (EDA) Before Training',
              body: 'Before any preprocessing or training: (1) Check class distribution — is one class 95% of your data? (2) Check for duplicates across train/test splits. (3) Check for temporal leakage — does your test set contain data from before your training cutoff? EDA reveals these issues before they corrupt your results.',
            },
          ],
          workflow: {
            title: '5-Stage Data Collection Protocol',
            description: 'Execute these stages to ensure reproducible, legal, and unbiased datasets.',
            direction: 'horizontal',
            nodes: [
              { id: '1', label: '1. Specs', sublabel: 'Define size, modality & labels', badge: 'Define', color: 'slate' },
              { id: '2', label: '2. Search', sublabel: 'HuggingFace, Kaggle, PapersWithCode', badge: 'Source', color: 'sky' },
              { id: '3', label: '3. Bias Audit', sublabel: 'Analyze demographics & class skews', badge: 'Audit', color: 'amber' },
              { id: '4', label: '4. License', sublabel: 'Verify CC-BY / academic license', badge: 'Legal', color: 'emerald' },
              { id: '5', label: '5. Provenance', sublabel: 'SHA-256 hash & version metadata', badge: 'Document', color: 'violet' },
            ],
          },
          steps: [
            {
              stepNumber: 1,
              title: 'Define your data requirements specification',
              description: 'Write down: what modality, what domain, what size, what labels, what time range, and what demographic diversity you need. This prevents collecting the wrong data.',
              example: 'Requirement: "At least 10,000 chest X-ray images labeled by board-certified radiologists for 4 pathology classes (pneumonia, effusion, cardiomegaly, normal), balanced ±10% across classes, from at least 3 different hospital systems."',
            },
            {
              stepNumber: 2,
              title: 'Search for existing datasets before collecting new ones',
              description: 'Check Hugging Face Datasets, Kaggle, UCI ML Repository, Papers With Code datasets, and domain-specific repositories before building your own dataset from scratch.',
              example: 'For chest X-rays: CheXpert (Stanford, 224K images), NIH ChestX-ray14 (112K images), MIMIC-CXR (227K images). Compare coverage, label quality, and licensing before choosing.',
            },
            {
              stepNumber: 3,
              title: 'Audit for bias and coverage gaps',
              description: 'Before using any dataset, analyse the demographic distribution, geographic coverage, temporal range, and label distribution. Document all gaps and limitations explicitly.',
              example: 'CheXpert uses automated NLP labeling from radiology reports — known to have ~10% label noise. Document this in your paper: "Labels are NLP-extracted and may contain systematic errors in negation handling."',
            },
            {
              stepNumber: 4,
              title: 'Check and document licensing',
              description: 'Verify the exact license: research-only, CC-BY, CC-BY-NC, CC-BY-SA, or proprietary. Document the license version and the date you accessed the dataset.',
              example: 'CheXpert: "Stanford CheXpert Dataset Agreement, accessed 2024-03-15. Restricted to non-commercial academic research. Model outputs may not be deployed in clinical products without additional Stanford licensing."',
            },
            {
              stepNumber: 5,
              title: 'Write the data provenance document',
              description: 'A structured document recording: source URL, version, access date, download checksum (SHA-256), preprocessing steps applied, and split creation strategy.',
              example: 'DATA_PROVENANCE.md: Dataset: CheXpert v1.0. URL: stanfordmlgroup.github.io. Downloaded: 2024-03-15. SHA-256: a7f3... Preprocessing: resized to 224×224, normalized. Split: 80/10/10 stratified by patient ID.',
            },
          ],
          keyTakeaways: [
            'Start with public benchmark datasets — they enable reproducible comparisons with prior work.',
            'Always audit for selection bias, temporal bias, and label noise before training any model.',
            'Document data provenance completely: source, version, license, access date, and checksum.',
            'Inter-annotator agreement (Cohen\'s Kappa > 0.6) is required before using human annotations as ground truth.',
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────
    // CHAPTER 2.3 — PREPROCESSING & FEATURE ENGINEERING
    // ─────────────────────────────────────────────────
    {
      id: 'data-preprocessing-guide',
      title: '2.3 Preprocessing: Cleaning, Transforming & Preparing Data',
      slug: 'data-preprocessing-guide',
      badge: 'Preprocessing',
      estimatedMinutes: 30,
      overview: 'Raw data is almost never ready for model training. Preprocessing transforms raw, messy, inconsistent data into clean, normalized, model-ready tensors. The wrong preprocessing decision can silently destroy model performance — or introduce data leakage that makes results look artificially good.',
      prerequisites: ['Chapter 2.1 — Data Modalities', 'Chapter 2.2 — Data Collection'],
      learningGoals: [
        'Apply the correct preprocessing pipeline for each data modality',
        'Understand and prevent data leakage in preprocessing pipelines',
        'Choose between normalization strategies (StandardScaler vs MinMax vs Robust)',
        'Handle missing data correctly (imputation vs removal)',
        'Implement proper train/validation/test splits to prevent contamination',
      ],
      analogy: {
        title: 'THE WATER PURIFICATION PLANT ANALOGY',
        explanation: "Raw data is like river water — it contains sediment (missing values), contamination (corrupt records), varying mineral concentrations (different scales), and mixed sources (inconsistent formats). A water treatment plant passes raw water through 5 sequential purification stages before it is safe to drink. Data preprocessing passes raw data through equivalent stages before it is safe to train a model on. Skip any stage and the model learns from contaminated data.",
        steps: [
          { number: 1, badge: 'Filter 1', title: 'Data Cleaning', subtitle: 'Remove duplicates, fix corrupt records.', iconName: 'filter' },
          { number: 2, badge: 'Filter 2', title: 'Handle Missing Values', subtitle: 'Impute or strategically drop NaN values.', iconName: 'database' },
          { number: 3, badge: 'Filter 3', title: 'Feature Engineering', subtitle: 'Create, transform, and encode features.', iconName: 'cog' },
          { number: 4, badge: 'Filter 4', title: 'Normalization / Scaling', subtitle: 'Bring all features to compatible ranges.', iconName: 'cpu' },
          { number: 5, badge: 'Clean Water', title: 'Train/Val/Test Split', subtitle: 'Stratified, leak-free dataset splits.', iconName: 'rocket' },
        ],
        connectors: ['→', '→', '→', '→'],
      },
      keyQuestions: [
        {
          question: 'What is data leakage and why is it catastrophic?',
          answer: 'Data leakage occurs when information from the test set is inadvertently used during training or preprocessing. Example: computing mean/std normalization on the ENTIRE dataset (train+test) before splitting. The model has "seen" test set statistics, making its performance artificially good. Always fit preprocessing transformers (scalers, encoders, tokenizers) on TRAINING data only, then apply to test data.',
        },
        {
          question: 'Which normalization strategy should I use?',
          answer: 'StandardScaler (zero mean, unit variance) for normally distributed features and neural networks. MinMaxScaler (0–1 range) for bounded features (pixel values, probabilities). RobustScaler (uses IQR, not mean/std) when data has outliers that would distort StandardScaler. Log transform for heavy-tailed distributions (income, population, price).',
        },
        {
          question: 'How should I handle missing values?',
          answer: 'First, diagnose WHY values are missing: MCAR (Missing Completely at Random — safe to mean-impute), MAR (Missing at Random — use multiple imputation), MNAR (Missing Not at Random — missingness encodes information, add a binary "was_missing" indicator column). Never blindly drop rows with missing values — you may drop important examples.',
        },
        {
          question: 'What is the correct train/validation/test split strategy?',
          answer: 'For i.i.d. data: 70/15/15 or 80/10/10 stratified random split. For time-series: temporal split (earliest dates train, latest dates test — NO shuffle). For grouped data (multiple records per user/patient): split by group ID to prevent data leakage across the boundary. NEVER shuffle time-series data.',
        },
      ],
      sections: [
        {
          id: 'preprocessing-by-modality',
          title: 'Preprocessing Pipelines by Data Modality',
          subtitle: 'The Right Steps for Each Data Type',
          content: `### Tabular Data Preprocessing

The standard pipeline for tabular/structured data:

| Step | Technique | When to Use |
| :--- | :--- | :--- |
| **Remove duplicates** | \`df.drop_duplicates()\` | Always |
| **Handle missing values** | Mean/Median imputation (MCAR), KNN imputation (MAR) | When >0% missing |
| **Encode categoricals** | Label Encoding (ordinal), One-Hot (nominal), Target Encoding (high cardinality) | For tree models: LabelEnc; For NNs: One-Hot |
| **Scale numerics** | StandardScaler, MinMaxScaler, RobustScaler | For NNs and SVMs — NOT needed for trees |
| **Handle outliers** | Winsorization at 1st/99th percentile, IQR clipping | When outliers distort means significantly |

### Text (NLP) Preprocessing

| Step | Technique | When to Use |
| :--- | :--- | :--- |
| **Tokenization** | Byte-Pair Encoding (GPT), WordPiece (BERT), SentencePiece (T5) | Always — transformer models require tokenization |
| **Lowercasing** | \`text.lower()\` | Bag-of-words models; AVOID for transformers (BERT is case-sensitive) |
| **Stopword removal** | NLTK stopwords | Traditional ML (TF-IDF, BoW) — AVOID for deep learning |
| **Lemmatization** | SpaCy \`nlp(text)\` | Traditional ML only |
| **Truncation/Padding** | Max length 512 tokens (BERT), 2048 (GPT-4) | Always needed for batching |

### Image Preprocessing

Standard preprocessing for CNNs and ViTs:
1. **Resize** to a fixed resolution (224×224 for ImageNet-pretrained models)
2. **Normalize** with dataset-specific mean and std: μ=[0.485, 0.456, 0.406], σ=[0.229, 0.224, 0.225] for ImageNet
3. **Data augmentation** (training only): RandomFlip, RandomRotation, ColorJitter, RandomCrop
4. **Convert to tensor**: [H, W, C] numpy → [C, H, W] PyTorch tensor

> **Critical**: Apply augmentation ONLY to training data. Apply ONLY normalization+resize to validation/test data.`,
          workflow: {
            title: 'Leak-Free Preprocessing Pipeline',
            description: 'Fit all transformers strictly on training data, then apply identically to test data.',
            direction: 'horizontal',
            nodes: [
              { id: '1', label: '1. Split First', sublabel: 'Stratified / GroupKFold split', badge: 'Split', color: 'slate' },
              { id: '2', label: '2. Impute', sublabel: 'Median / KNN imputation', badge: 'Clean', color: 'sky' },
              { id: '3', label: '3. Encode', sublabel: 'One-Hot / Target encoding', badge: 'Categorical', color: 'violet' },
              { id: '4', label: '4. Scale', sublabel: 'StandardScaler / RobustScaler', badge: 'Scale', color: 'amber' },
              { id: '5', label: '5. Pipeline.transform()', sublabel: 'Apply to untouched test set', badge: 'Deploy', color: 'emerald' },
            ],
          },
          callouts: [
            {
              type: 'warning',
              title: 'The #1 Data Leakage Mistake in Preprocessing',
              body: 'Computing statistics (mean, std, vocabulary, PCA components) on the COMBINED train+test dataset, then splitting afterward. ALWAYS: fit your preprocessor on TRAINING DATA ONLY → transform training data → then apply the same fitted preprocessor to test data. In scikit-learn, use Pipeline + fit_transform on train, transform on test.',
            },
            {
              type: 'example',
              title: 'Real World: Netflix Prize Leakage Bug (2007)',
              body: "A 2007 analysis of the Netflix Prize competition found that several top teams accidentally leaked rating timestamps into their features — giving them future knowledge during training. When the bug was fixed, their leaderboard scores dropped significantly. Data leakage is the most common silent killer of apparently 'impressive' research results.",
            },
            {
              type: 'tip',
              title: 'Use scikit-learn Pipelines to Prevent Leakage',
              body: "The safest way to prevent leakage: wrap your entire preprocessing chain in a `sklearn.pipeline.Pipeline`. The Pipeline's `.fit()` learns from training data only, and `.predict()` applies the same transform to test data automatically. This makes leakage structurally impossible.",
            },
          ],
          codeExamples: [
            {
              title: 'Correct Preprocessing Pipeline (No Leakage)',
              language: 'python',
              code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split

# Define feature types
num_features = ['age', 'income', 'score']
cat_features = ['city', 'gender', 'occupation']

# Build preprocessing pipeline
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),  # Fill missing values
    ('scaler', StandardScaler()),                    # Normalize to zero mean
])

cat_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore')),
])

preprocessor = ColumnTransformer([
    ('num', num_pipeline, num_features),
    ('cat', cat_pipeline, cat_features),
])

# CRITICAL: Split BEFORE fitting preprocessor
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Fit on TRAINING data ONLY — test data never seen here
X_train_processed = preprocessor.fit_transform(X_train)

# Apply the same fitted transform to test data
X_test_processed = preprocessor.transform(X_test)`,
              explanation: 'Always fit preprocessing transforms on training data only, then apply to test data. Using Pipeline ensures this is structurally enforced — you cannot accidentally leak.',
            },
          ],
          keyTakeaways: [
            'Data leakage is the most dangerous preprocessing mistake — it makes results look better than they are.',
            'ALWAYS fit preprocessors (scalers, encoders, tokenizers) on training data only, then transform test data.',
            'Choose normalization based on distribution: StandardScaler for normal, RobustScaler for outlier-heavy, MinMaxScaler for bounded data.',
            'For time-series data: NEVER shuffle — always use a temporal train/test split.',
            'Use scikit-learn Pipelines to make leakage structurally impossible in your codebase.',
          ],
        },
      ],
    },
  ],
};
