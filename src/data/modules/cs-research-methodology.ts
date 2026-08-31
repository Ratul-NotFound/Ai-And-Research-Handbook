import { Module } from '@/types';

export const csResearchMethodologyModule: Module = {
  id: 'research-methodology',
  number: 1,
  title: 'Research Methodology for CS',
  subtitle: 'Fundamentals, Research Types, Literature Review & Experimental Design',
  iconName: 'GraduationCap',
  color: '#0284c7',
  chapters: [

    // ──────────────────────────────────────────────────────────
    // CHAPTER 1.1 — WHAT IS RESEARCH METHODOLOGY?
    // ──────────────────────────────────────────────────────────
    {
      id: 'what-is-research-methodology',
      title: '1.1 What is Research Methodology?',
      slug: 'what-is-research-methodology',
      badge: 'Core Framework',
      estimatedMinutes: 15,
      overview: 'Research methodology is the systematic blueprint scientists follow before collecting a single data point. Without it, experiments become cherry-picking and results cannot be reproduced.',
      prerequisites: ['Curiosity', 'Basic Logic'],
      learningGoals: [
        'Understand what research methodology is and why it exists',
        'Distinguish methodology (the blueprint) from methods (the tools)',
        'Know the 3 questions every research project must answer upfront',
        'Learn how methodology prevents cherry-picked results and bad science',
      ],
      analogy: {
        title: 'THE ARCHITECT\'S BLUEPRINT ANALOGY',
        explanation: 'Research methodology is the blueprint an architect draws BEFORE construction starts. It specifies what rooms to build, what materials to use, and how to verify walls are straight — before a single brick is laid. Without a blueprint, builders improvise, rooms clash, and the building collapses under its own weight. Without research methodology, experiments are improvised, results are cherry-picked, and the science collapses under peer review.',
        steps: [
          { number: 1, badge: 'Blueprint', title: 'Define the Question', subtitle: 'Specific, measurable, falsifiable.', iconName: 'search' },
          { number: 2, badge: 'Materials', title: 'Plan Data Collection', subtitle: 'What data? Which source? What controls?', iconName: 'database' },
          { number: 3, badge: 'Build', title: 'Run Experiment', subtitle: 'Execute under controlled conditions.', iconName: 'cog' },
          { number: 4, badge: 'QA Check', title: 'Analyse & Validate', subtitle: 'Statistical tests and significance.', iconName: 'cpu' },
          { number: 5, badge: 'Deliver', title: 'Publish & Reproduce', subtitle: 'Share code, data, findings.', iconName: 'rocket' },
        ],
        connectors: ['Formulate', 'Design', 'Execute', 'Validate'],
      },
      keyQuestions: [
        {
          question: 'What is research methodology?',
          answer: 'The overarching strategic framework — the "why and how" of your research design. It specifies what evidence you need, how to collect it validly, and how to analyse and validate it.',
        },
        {
          question: 'Methodology vs. Methods — what is the difference?',
          answer: 'Methodology is the blueprint (strategy). Methods are the tools (e.g., a survey, a neural network, a t-test). You choose the methodology first, then select methods that align with it. Choosing methods without a methodology leads to HARKing.',
        },
        {
          question: 'What 3 questions must every methodology answer?',
          answer: '1) How will you collect data? 2) How will you analyse it? 3) Why are those choices scientifically valid for your specific problem? If you cannot answer all three upfront, you do not have a methodology yet.',
        },
        {
          question: 'What is HARKing and why is it dangerous?',
          answer: 'Hypothesizing After Results are Known — running many experiments, picking the "winner," then writing the paper as if you predicted it. It produces results that never replicate and wastes the entire community\'s time. Pre-registration is the prevention.',
        },
      ],
      realWorldUses: [
        { industry: 'GPT-4 (OpenAI, 2023)', application: 'OpenAI published a technical report documenting training data sources, RLHF methodology, safety evaluation protocols, and benchmark comparison strategies — enabling reproducibility reviews.' },
        { industry: 'AlphaFold 2 (DeepMind, 2021)', application: 'Documented MSA preprocessing, training data split strategy, and CASP14 evaluation protocol — all core methodology decisions that allowed the community to verify and build on the results.' },
        { industry: 'FDA AI Device Approval', application: 'Requires documentation of exact dataset collection protocol, preprocessing pipeline, and validation cohort for all AI diagnostic tools — preventing hospital-specific overfitting.' },
      ],
      sections: [
        {
          id: 'methodology-definition',
          title: 'Methodology vs. Methods: The Core Distinction',
          subtitle: 'Blueprint vs. Tools',
          content: `Before writing a single line of code or collecting any data, every research project needs a **methodology** — a documented, reasoned plan for the investigation.

### The 3 Fundamental Questions a Methodology Must Answer

Every research methodology must explicitly state its answers to these before any data collection begins:

1. **What kind of evidence do I need?** — Observational data? Controlled experiments? Formal proofs? User studies?
2. **How do I collect that evidence validly?** — Which dataset? What controls? Which baseline comparisons?
3. **How do I analyse and validate it?** — Which statistical tests? What counts as a "significant" result?`,
          comparisonGrid: {
            title: 'Methodology vs. Methods — Full Comparison',
            columns: [
              {
                title: 'Methodology',
                subtitle: 'The strategic blueprint',
                color: 'sky',
                badge: 'Comes First',
                items: [
                  { label: 'What it is', value: 'The philosophy and strategy of how you will generate trustworthy knowledge' },
                  { label: 'Example', value: '"I will use empirical experimental design, comparing CNN architectures on a held-out test set"', highlight: true },
                  { label: 'Decided when?', value: 'BEFORE any data collection or experiments' },
                  { label: 'Changes during project?', value: 'Only with documented justification and supervisor approval' },
                ],
                verdict: '✓ Always define this first',
              },
              {
                title: 'Methods',
                subtitle: 'The specific tools & techniques',
                color: 'slate',
                badge: 'Comes Second',
                items: [
                  { label: 'What it is', value: 'The specific tools, algorithms, and techniques used to execute the methodology' },
                  { label: 'Example', value: '"PyTorch + Adam optimizer + ResNet-50 + Top-1 Accuracy metric"' },
                  { label: 'Decided when?', value: 'AFTER the methodology is defined' },
                  { label: 'Changes during project?', value: 'Can be adjusted as technical constraints emerge' },
                ],
                verdict: 'Follow from your methodology',
              },
            ],
          },
          callouts: [
            {
              type: 'warning',
              title: 'The Most Dangerous CS Research Mistake',
              body: 'Running many experiments and selecting the one that "worked best" WITHOUT a pre-specified hypothesis. This is called HARKing (Hypothesizing After Results are Known). It produces fake science that cannot replicate and actively wastes the research community\'s time and funding.',
            },
            {
              type: 'example',
              title: 'Real World: The NLP Replication Crisis (2020)',
              body: 'A 2020 paper by Bender et al. showed that many NLP benchmark leaderboard "improvements" were due to dataset contamination and cherry-picked hyperparameters — not genuine generalization. The fix required: pre-registered methodology and fresh held-out test sets.',
            },
          ],
          keyTakeaways: [
            'Methodology is the blueprint; methods are the tools. Always define the blueprint first.',
            'Answer the 3 core questions (what evidence? how collect? how validate?) BEFORE starting.',
            'Without pre-specified methodology, experiments become cherry-picking — producing irreproducible results.',
            'Great papers are rejected not for poor results, but for poor methodology.',
          ],
        },
        {
          id: 'methodology-five-components',
          title: 'The 5 Components Every CS Methodology Must Include',
          subtitle: 'What Every Research Plan Must Explicitly Document',
          content: `A complete CS research methodology must explicitly address all 5 components. Missing ANY one makes your findings unverifiable and unpublishable at top venues.`,
          workflow: {
            title: 'The 5-Component Research Methodology Pipeline',
            description: 'Every component must be documented BEFORE running experiments.',
            direction: 'vertical',
            nodes: [
              { id: '1', label: 'Research Philosophy & Paradigm', sublabel: 'Declare your stance: empirical experiments, formal proofs, or real-world observation?', badge: 'Component 1', color: 'sky' },
              { id: '2', label: 'Research Design & Variables', sublabel: 'Define independent, dependent, and control variables. Specify what you change and what you measure.', badge: 'Component 2', color: 'violet' },
              { id: '3', label: 'Data Collection Strategy', sublabel: 'Document source, license, version, preprocessing steps, and split strategy BEFORE collecting.', badge: 'Component 3', color: 'emerald' },
              { id: '4', label: 'Analysis & Evaluation Framework', sublabel: 'Pre-specify all metrics, significance thresholds, and statistical tests before running experiments.', badge: 'Component 4', color: 'amber' },
              { id: '5', label: 'Reproducibility & Transparency Plan', sublabel: 'Code repo, model weights, compute environment, Docker image, and random seeds all documented.', badge: 'Component 5', color: 'rose' },
            ],
          },
          callouts: [
            {
              type: 'tip',
              title: 'The Pre-Registration Pattern (Used by Top Labs)',
              body: 'DeepMind, FAIR, Allen AI, and OpenAI pre-register their evaluation protocol BEFORE running experiments — like a doctor pre-registering a clinical trial. This makes cherry-picking structurally impossible. NeurIPS 2020 introduced a mandatory reproducibility checklist as a direct result of the replication crisis.',
            },
            {
              type: 'important',
              title: 'The Reproducibility Checklist',
              body: 'Before running ANY experiment: (1) Hypothesis in H₀/H₁ form. (2) Primary metric + threshold. (3) All baseline models + hyperparameters. (4) Random seeds. (5) Train/val/test split strategy. (6) Statistical test and significance level. Share with supervisor before starting.',
            },
          ],
          keyTakeaways: [
            'A complete methodology covers all 5 components: philosophy, design, data, analysis, reproducibility.',
            'Pre-specify metrics before running experiments — this is the single most important practice.',
            'Missing even one component makes your findings unverifiable at top venues like NeurIPS or ICML.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 1.2 — TYPES OF CS RESEARCH
    // ──────────────────────────────────────────────────────────
    {
      id: 'types-of-cs-research',
      title: '1.2 The 4 Types of Research in Computer Science',
      slug: 'types-of-cs-research',
      badge: 'Research Taxonomy',
      estimatedMinutes: 20,
      overview: 'CS research is not one-size-fits-all. Depending on your question, you choose between Theoretical proofs, Experimental benchmarks, Empirical system studies, or Simulation-based analysis. The wrong type produces wrong conclusions.',
      prerequisites: ['Chapter 1.1 — What is Research Methodology?'],
      learningGoals: [
        'Identify the 4 core types of CS research and their defining characteristics',
        'Match a given research question to the correct research type',
        'Understand why the wrong research type produces invalid conclusions',
        'Know real examples of each type from top research labs',
      ],
      analogy: {
        title: 'THE 4 SCIENTIFIC WORKSHOPS',
        explanation: "Imagine 4 specialised workshops in a university. The Mathematician's Workshop proves theorems on a chalkboard. The Engineer's Workshop builds and benchmarks prototypes. The Detective's Workshop studies what already exists in the wild. The Simulator's Workshop builds miniature virtual worlds to test ideas safely. Every CS research question belongs to one workshop.",
        steps: [
          { number: 1, badge: 'Workshop 1', title: 'Theoretical Research', subtitle: 'Prove properties with formal mathematics.', iconName: 'filter' },
          { number: 2, badge: 'Workshop 2', title: 'Experimental Research', subtitle: 'Test hypotheses with controlled benchmarks.', iconName: 'cpu' },
          { number: 3, badge: 'Workshop 3', title: 'Empirical Research', subtitle: 'Study real-world systems in production.', iconName: 'database' },
          { number: 4, badge: 'Workshop 4', title: 'Simulation Research', subtitle: 'Build virtual environments to test ideas safely.', iconName: 'rocket' },
        ],
        connectors: ['→', '→', '→'],
      },
      keyQuestions: [
        { question: 'What is Theoretical CS Research?', answer: 'Proving mathematical properties — algorithm complexity, data structure bounds, formal language theory. Example: proving QuickSort is O(n log n) average-case, or that P ≠ NP (still unsolved!).' },
        { question: 'What is Experimental CS Research?', answer: 'Designing controlled experiments to test a specific hypothesis about system performance. Example: "Does my new attention mechanism reduce GPU memory by 30% while maintaining BLEU score on WMT-14?"' },
        { question: 'What is Empirical CS Research?', answer: 'Observing and analysing real-world systems, codebases, or user behaviour without controlling the environment. Example: mining 10,000 GitHub repos to study how developers introduce security vulnerabilities.' },
        { question: 'What is Simulation-based Research?', answer: 'Building a synthetic environment to model scenarios too complex, expensive, or dangerous to study directly. Example: training autonomous driving agents in CARLA simulator before deploying on real roads.' },
      ],
      realWorldUses: [
        { industry: 'Theoretical: RSA Cryptography', application: 'RSA encryption security is proven theoretically — breaking it requires solving the Integer Factorisation Problem, which has no known polynomial-time algorithm.' },
        { industry: 'Experimental: Stanford HELM Benchmark', application: 'HELM evaluates 30+ LLMs across 42 scenarios using standardised controlled experiment protocols — the backbone of modern model comparison in NLP research.' },
        { industry: 'Empirical: MSR Mining Software Repos', application: 'Mining Software Repositories (MSR) conferences study real-world GitHub/GitLab data to understand developer behaviour, bug patterns, and code quality evolution.' },
        { industry: 'Simulation: Waymo in CARLA', application: 'Waymo trains and tests perception+planning models through billions of simulated miles in CARLA before deploying to physical vehicles — impossible to do safely in reality first.' },
      ],
      sections: [
        {
          id: 'four-types-comparison',
          title: 'The 4 Research Types: Complete Comparison',
          subtitle: 'Choosing the Right Workshop for Your Research Question',
          content: `The type of research must be chosen based on your **research question**, not convenience. Each type has fundamentally different validity requirements:`,
          comparisonGrid: {
            title: 'Research Type Comparison Matrix',
            columns: [
              {
                title: 'Theoretical',
                subtitle: 'Mathematical proof',
                color: 'sky',
                badge: 'Type 1',
                items: [
                  { label: 'Core Question', value: 'Can we prove this property ALWAYS holds?', highlight: true },
                  { label: 'Produces', value: 'Theorems, proofs, bounds, complexity classes' },
                  { label: 'Validated By', value: 'Peer review of proof correctness' },
                  { label: 'Real Example', value: 'Proving RSA encryption hardness' },
                ],
                verdict: 'Use for: algorithms, complexity, formal methods',
              },
              {
                title: 'Experimental',
                subtitle: 'Controlled benchmark',
                color: 'emerald',
                badge: 'Type 2',
                items: [
                  { label: 'Core Question', value: 'Does my system outperform baselines under controlled conditions?', highlight: true },
                  { label: 'Produces', value: 'Benchmark results, ablations, accuracy tables' },
                  { label: 'Validated By', value: 'Statistical significance tests' },
                  { label: 'Real Example', value: 'BERT vs GPT on GLUE benchmarks' },
                ],
                verdict: 'Use for: ML model comparisons, algorithm benchmarks',
              },
              {
                title: 'Empirical',
                subtitle: 'Real-world observation',
                color: 'amber',
                badge: 'Type 3',
                items: [
                  { label: 'Core Question', value: 'What patterns exist in real systems or behaviour?', highlight: true },
                  { label: 'Produces', value: 'Statistical observations, case studies' },
                  { label: 'Validated By', value: 'Reproducibility on the same corpus' },
                  { label: 'Real Example', value: 'Mining GitHub for security bug patterns' },
                ],
                verdict: 'Use for: software engineering, HCI, systems',
              },
              {
                title: 'Simulation',
                subtitle: 'Virtual environment',
                color: 'violet',
                badge: 'Type 4',
                items: [
                  { label: 'Core Question', value: 'What would happen in a scenario we cannot directly observe?', highlight: true },
                  { label: 'Produces', value: 'Simulation results, sensitivity analyses' },
                  { label: 'Validated By', value: 'Validation against known real-world cases' },
                  { label: 'Real Example', value: 'Waymo autonomous driving in CARLA' },
                ],
                verdict: 'Use for: robotics, autonomous systems, networks',
              },
            ],
          },
          callouts: [
            {
              type: 'example',
              title: 'Best Practice: Combine Theory + Experiment',
              body: 'The Transformer paper (Vaswani et al., 2017) combined theoretical motivation (attention as weighted averaging of value vectors) AND experimental validation (BLEU improvements on WMT English-German). This combination is what makes landmark papers — theory explains WHY, experiments show HOW MUCH it helps.',
            },
            {
              type: 'warning',
              title: 'The Experimental Research Trap',
              body: 'Using "Experimental" research type but with NO control variables. "My model gets 94% accuracy" — on what dataset? Compared to what baseline? Evaluated on training data? Without controls, experimental results are anecdote, not science. EVERY experimental claim needs: same dataset, same split, same baseline tuning effort, same compute budget.',
            },
          ],
          decisionTree: {
            title: 'Decision Tree: Which Research Type Should I Use?',
            description: 'Click to expand branches. Start from the top.',
            root: {
              id: 'root',
              question: 'Do you need to prove something is ALWAYS true (for all inputs)?',
              yes: {
                id: 'theoretical',
                question: 'Theoretical Research',
                answer: 'Use formal proofs, Big-O analysis, reduction proofs, or information-theoretic bounds. Write theorems and lemmas.',
                badge: 'Theoretical ✓',
              },
              no: {
                id: 'no-theory',
                question: 'Can you control all relevant variables in your setup?',
                yes: {
                  id: 'experimental',
                  question: 'Experimental Research',
                  answer: 'Design controlled benchmarks. Pre-specify baselines, metrics, and statistical tests. Use held-out test sets.',
                  badge: 'Experimental ✓',
                },
                no: {
                  id: 'no-control',
                  question: 'Is the real-world scenario too expensive, dangerous, or impossible to observe directly?',
                  yes: {
                    id: 'simulation',
                    question: 'Simulation Research',
                    answer: 'Build a virtual environment (CARLA, OpenAI Gym, NS-3). Validate simulation fidelity against known real-world cases first.',
                    badge: 'Simulation ✓',
                  },
                  no: {
                    id: 'empirical',
                    question: 'Empirical Research',
                    answer: 'Observe and analyse real-world systems without intervention. Use statistical analysis on naturally occurring data (GitHub commits, user logs, production telemetry).',
                    badge: 'Empirical ✓',
                  },
                },
              },
            },
          },
          keyTakeaways: [
            'Match your research type to your question — not to your comfort zone or available tools.',
            'Theoretical proves guarantees; experimental measures empirical performance with controls.',
            'The best landmark papers (Transformer, BERT, AlphaFold) combine theoretical motivation with experimental validation.',
            'Experimental without controls is not science — it is anecdote collection.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 1.3 — LITERATURE REVIEW
    // ──────────────────────────────────────────────────────────
    {
      id: 'literature-review-strategy',
      title: '1.3 How to Find, Read & Review Literature',
      slug: 'literature-review-strategy',
      badge: 'Literature Search',
      estimatedMinutes: 25,
      overview: 'A literature review is not a list of papers you read — it is a systematic map of human knowledge in your subfield that reveals the gap your work will fill. Learning to do this efficiently is one of the highest-leverage research skills.',
      prerequisites: ['Chapter 1.2 — Research Types'],
      learningGoals: [
        'Use backward and forward snowballing to build a complete picture of the literature',
        'Critically evaluate papers for validity, reproducibility, and cherry-picking',
        'Identify the research gap that defines your original contribution',
        'Organise literature thematically — not chronologically',
        'Use Google Scholar, ArXiv, Semantic Scholar, and Papers With Code correctly',
      ],
      analogy: {
        title: 'THE ARCHAEOLOGICAL MAP ANALOGY',
        explanation: "Think of a literature review like an archaeologist mapping an ancient city before excavating. You don't randomly dig — you study existing maps (survey papers), find already-excavated zones (existing work), identify unexplored sectors (research gaps), then plan your excavation (your contribution) precisely in an area others have overlooked.",
        steps: [
          { number: 1, badge: 'Map Survey', title: 'Read Survey Papers', subtitle: 'Get the 30,000ft field overview.', iconName: 'search' },
          { number: 2, badge: 'Excavated Zones', title: 'Backward Snowball', subtitle: 'Follow references back to foundations.', iconName: 'filter' },
          { number: 3, badge: 'Recent Frontier', title: 'Forward Snowball', subtitle: '"Cited by" finds latest work.', iconName: 'database' },
          { number: 4, badge: 'Unexplored Gap', title: 'Identify Gap', subtitle: 'What is untested or incomplete?', iconName: 'cog' },
          { number: 5, badge: 'Your Excavation', title: 'Define Contribution', subtitle: 'Fill the gap with your research.', iconName: 'rocket' },
        ],
        connectors: ['then', 'then', 'then', 'then'],
      },
      keyQuestions: [
        { question: 'What is backward snowballing?', answer: "Starting from a key paper and tracing its References backwards to find the foundational work your key paper builds upon. This maps the field's intellectual lineage." },
        { question: 'What is forward snowballing?', answer: 'Using Google Scholar\'s "Cited by N" feature to find all papers that cited your key paper. This surfaces the latest frontier work.' },
        { question: 'What 5 databases should I use?', answer: 'Google Scholar (broadest), Semantic Scholar (AI-powered citation graph), ArXiv (ML/AI pre-prints), Papers With Code (reproducible ML), IEEE Xplore / ACM DL (formal systems and HCI).' },
        { question: 'How do I critically evaluate a paper?', answer: 'Ask: (1) What exactly did they claim? (2) What did they NOT test? (3) Are baselines fairly tuned? (4) Can I reproduce the main table from their code? (5) What assumptions does their claim rest on that could break in other settings?' },
      ],
      realWorldUses: [
        { industry: 'AlphaCode Literature Review (DeepMind, 2022)', application: 'Before building AlphaCode, DeepMind reviewed ALL existing code generation models, documented which evaluation benchmarks each used, which programming languages each failed on — creating a gap map that defined AlphaCode\'s design priorities.' },
        { industry: 'BERT Literature Review (Google, 2018)', application: 'Devlin et al. reviewed ELMo (contextual embeddings), GPT (unidirectional pre-training), and DSSM to identify the gap: no model had tried bidirectional transformer pre-training. That gap became BERT\'s contribution.' },
      ],
      sections: [
        {
          id: 'search-strategy',
          title: 'The 5-Stage Systematic Literature Search Strategy',
          subtitle: 'How to Find Everything Important Without Getting Lost',
          content: `A haphazard literature search (just Googling terms) misses seminal papers and wastes weeks. Here is a systematic approach used by experienced researchers.

### Where to Search — The 5 Essential Databases

| Database | Best For | Special Feature |
| :--- | :--- | :--- |
| **Google Scholar** | Broadest coverage of all fields | Citation count + "Cited by" link for snowballing |
| **Semantic Scholar** | AI/ML research | AI-powered citation graph + author disambiguation |
| **ArXiv** | ML pre-prints (months before journal publication) | cs.LG, cs.CL, cs.CV category lists |
| **Papers With Code** | ML papers with reproducible implementations | Shows SOTA benchmarks + linked datasets |
| **IEEE Xplore / ACM DL** | Systems, hardware, HCI — formal publications | Formal peer-reviewed only |

### The Boolean Search Formula

Use structured Boolean operators to find precise literature instead of generic keywords:

\`("large language model" OR "LLM") AND ("hallucination") AND -("survey" OR "review")\`

This finds primary hallucination papers while excluding survey articles — dramatically more precise than a simple search.`,
          workflow: {
            title: 'Literature Search Pipeline',
            description: 'Execute these 5 stages in order — each stage builds on the previous.',
            direction: 'vertical',
            nodes: [
              { id: '1', label: 'Search for survey papers on your topic', sublabel: 'Search "[topic] survey 2022" or "[topic] review" on Google Scholar. Read abstract + taxonomy section.', badge: 'Stage 1', color: 'sky' },
              { id: '2', label: 'Extract 3–5 key papers from the survey', sublabel: 'Pick the papers most relevant to your research question. These are your anchor papers.', badge: 'Stage 2', color: 'sky' },
              { id: '3', label: 'Backward snowball from each anchor paper', sublabel: 'Open each anchor paper\'s References. Any paper cited 3+ times across your anchors is foundational — add it.', badge: 'Stage 3', color: 'emerald' },
              { id: '4', label: 'Forward snowball via "Cited By" on foundational papers', sublabel: 'Open Google Scholar, search foundational papers, click "Cited by N". Sort by relevance + recent year. This surfaces SOTA.', badge: 'Stage 4', color: 'amber' },
              { id: '5', label: 'Build thematic clusters — NOT a chronological list', sublabel: 'Group papers by approach/theme. The GAP between clusters is your research contribution.', badge: 'Stage 5', color: 'violet' },
            ],
          },

          callouts: [
            {
              type: 'tip',
              title: 'The 3-Question Critical Reading Protocol',
              body: 'For EVERY paper you read, answer: (1) "What is the EXACT claim?" (2) "What assumption does this rest on that they did NOT test?" (3) "What would make this claim fail?" — The answer to question 2 is usually your research gap.',
            },
            {
              type: 'warning',
              title: 'Common Literature Review Mistakes',
              body: 'Mistake 1: Bib-stuffing — citing papers you have not read. Mistake 2: Treating ArXiv pre-prints as peer-reviewed facts. Mistake 3: Using citation count as a proxy for correctness — many highly-cited papers have been substantially revised or partially retracted after publication. Mistake 4: Organising your review chronologically instead of thematically.',
            },
          ],
          keyTakeaways: [
            'Use backward snowballing to find foundational papers; forward snowballing to find frontier work.',
            'Organise literature thematically by concept — never chronologically by year.',
            'The research gap lives inside the untested assumptions and limitations of existing papers.',
            'Papers With Code shows which claims have reproducible implementations — essential for baseline comparisons.',
          ],
        },
      ],
    },

    // ──────────────────────────────────────────────────────────
    // CHAPTER 1.4 — RESEARCH DESIGN
    // ──────────────────────────────────────────────────────────
    {
      id: 'research-design-checklist',
      title: '1.4 Research Design: From Question to Hypothesis to Plan',
      slug: 'research-design-checklist',
      badge: 'Research Design',
      estimatedMinutes: 20,
      overview: 'Research design transforms a vague idea into a falsifiable, executable scientific investigation. This chapter walks through formulating SMART research questions, defining variables, writing testable hypotheses, and the pre-registration checklist.',
      prerequisites: ['Chapter 1.2 — Research Types', 'Chapter 1.3 — Literature Review'],
      learningGoals: [
        'Transform a vague idea into a specific, measurable research question',
        'Write a falsifiable null and alternative hypothesis',
        'Define independent, dependent, and control variables',
        'Create a research design checklist before running any experiments',
        'Understand what pre-registration means and why it matters',
      ],
      analogy: {
        title: 'THE CLINICAL TRIAL ANALOGY',
        explanation: 'When a pharmaceutical company tests a new drug, they do not just give it to random patients. They pre-register the trial: exact patient eligibility, the control group design, the primary outcome metric, and the statistical test — ALL locked in BEFORE any patient takes the drug. ML experiments should follow the same principle: lock in your design before running a single training job.',
        steps: [
          { number: 1, badge: 'Eligibility', title: 'Define Problem Precisely', subtitle: 'Specific, measurable research question.', iconName: 'search' },
          { number: 2, badge: 'Control Group', title: 'Define Baselines & Controls', subtitle: 'What are you comparing against?', iconName: 'filter' },
          { number: 3, badge: 'Primary Outcome', title: 'Pre-specify Metrics', subtitle: 'What counts as "better" before running?', iconName: 'database' },
          { number: 4, badge: 'Statistics', title: 'Plan Statistical Analysis', subtitle: 'Which test at what significance level?', iconName: 'cpu' },
          { number: 5, badge: 'Trial Protocol', title: 'Pre-Register Everything', subtitle: 'Lock it in before execution.', iconName: 'rocket' },
        ],
        connectors: ['then', 'then', 'then', 'then'],
      },
      keyQuestions: [
        { question: 'What makes a research question "SMART"?', answer: 'Specific (names the exact system, dataset), Measurable (has a quantifiable metric + threshold), Achievable (within compute+time budget), Relevant (fills a documented gap), Time-bound (can be answered in your project duration).' },
        { question: 'What is a falsifiable hypothesis?', answer: 'A statement that CAN be proven FALSE by an experiment. "Our model is better" is NOT falsifiable. "Adding cross-attention increases BLEU by ≥1 point on WMT-14 with p<0.05" IS falsifiable — you could run it and it could fail.' },
        { question: 'What are independent, dependent, and control variables?', answer: 'Independent = what YOU change (e.g., number of attention heads). Dependent = what you MEASURE (e.g., validation perplexity). Control = everything you hold CONSTANT (dataset, optimizer, LR, seed). Controls are what make the comparison fair.' },
        { question: 'What is the pre-registration document?', answer: 'A document written and shared BEFORE any experiments run, specifying: exact hypothesis, primary metric, all baselines with their hyperparameters, random seeds, split strategy, and statistical test. It structurally prevents HARKing.' },
      ],
      realWorldUses: [
        { industry: 'BERT (Google, 2018)', answer: 'Devlin et al. had a precise question: "Does bidirectional pre-training on BookCorpus+Wikipedia produce representations that outperform unidirectional pre-training on 11 GLUE tasks?" Notice: exact pre-training objective, exact datasets, exact benchmark — specified before any training ran.' } as any,
        { industry: 'NeurIPS Reproducibility Checklist (2020)', application: 'After Joelle Pineau showed 60%+ ML papers could not be reproduced because authors failed to document hyperparameter search, NeurIPS introduced mandatory pre-registration-style checklists for all submissions.' },
      ],
      sections: [
        {
          id: 'smart-research-question',
          title: 'From Vague Idea to SMART Research Question',
          subtitle: 'The Most Important Skill in Research',
          content: `The most common reason CS projects fail is not technical — the research question was too vague to produce a clear answer. Compare these examples:

| Vague (Rejected) | SMART (Accepted) |
| :--- | :--- |
| "I want to make transformers more efficient" | "Does replacing full self-attention with local window attention (window k=128) reduce GPU memory by ≥30% on sequences of length 4096 while maintaining ≤1% BLEU degradation on WMT-14?" |
| "I want to study cybersecurity" | "Do npm packages with >1M weekly downloads have a higher CVE rate than packages with <1K downloads, across the npm registry from 2020–2024?" |
| "I want to improve recommendations" | "Does incorporating GCN user embeddings improve NDCG@10 by ≥3% on MovieLens-25M compared to matrix factorisation baselines?" |

### The SMART Test — Apply to Every Research Question

- **S**pecific — Names the exact system, dataset, and phenomenon being studied
- **M**easurable — Has a quantifiable metric with a defined improvement threshold
- **A**chievable — Feasible within your actual compute and time budget
- **R**elevant — Directly fills a gap documented in the literature review
- **T**ime-bound — Can be definitively answered within your project duration`,
          callouts: [
            {
              type: 'tip',
              title: 'Write Your Question as a Single Sentence',
              body: 'A valid research question fits in one sentence. If it takes a paragraph to describe, it is too broad — split it into multiple focused questions and answer them one at a time. Each paper should answer one clear question extremely well.',
            },
          ],
          keyTakeaways: [
            'A research question must be SMART: Specific, Measurable, Achievable, Relevant, Time-bound.',
            'Name the exact dataset, metric, threshold, and comparison baseline IN the question itself.',
            'If your question cannot be answered falsely by a conceivable experiment, it is not a research question.',
          ],
        },
        {
          id: 'hypothesis-variables',
          title: 'Hypotheses, Variables & the Pre-Registration Checklist',
          subtitle: 'Locking In Your Protocol Before Running Experiments',
          content: `### Writing Falsifiable Hypotheses

Every experiment needs both hypotheses written before any data collection:

| Hypothesis | Form | Example |
| :--- | :--- | :--- |
| **Null Hypothesis (H₀)** | "X does NOT affect Y" | "Cross-attention does NOT improve BLEU vs. baseline" |
| **Alternative Hypothesis (H₁)** | "X improves Y by ≥ threshold (p < α)" | "Cross-attention improves BLEU by ≥1 point on WMT-14 (p < 0.05)" |

Your experiment tries to **REJECT H₀**. If you cannot reject it, your claim is not supported.

### Defining Your Variables

| Variable | Definition | Example |
| :--- | :--- | :--- |
| **Independent** | What YOU deliberately change | # decoder attention heads: {4, 8, 12, 16} |
| **Dependent** | What you MEASURE as outcome | BLEU-4 score on held-out test set |
| **Control** | Everything held CONSTANT | Training data, optimizer (Adam lr=3e-4), batch size (256), seed (42) |
| **Confound** | Variables you FAILED to control — must be documented | GPU temperature, batch order differences |`,
          callouts: [
            {
              type: 'important',
              title: 'The Pre-Registration Checklist — Lock This Before Running',
              body: 'Before ANY training job: (1) Exact H₀ and H₁ hypothesis statements. (2) Primary evaluation metric + improvement threshold. (3) All baseline models with their exact hyperparameters. (4) Random seeds for all experiments. (5) Train/val/test split strategy and sizes. (6) Statistical test and significance level (α = 0.05). Share with supervisor BEFORE starting. Changing any item after seeing results is HARKing.',
            },
            {
              type: 'warning',
              title: 'HARKing: The Cardinal Sin of Research',
              body: 'Running 50 experiments, seeing which "worked", then writing the paper as if you predicted that result from the start. It is academically dishonest AND produces results that never replicate. The NeurIPS 2020 reproducibility requirement was a direct response to widespread HARKing in deep learning.',
            },
          ],
          recommendedPapers: [
            {
              title: 'Improving Reproducibility in Machine Learning Research',
              authors: 'Pineau, J., Vincent-Lamarre, P., et al.',
              year: 2021,
              url: 'https://arxiv.org/abs/2003.12206',
              significance: 'The paper that led NeurIPS to introduce mandatory ML reproducibility checklists. Essential reading for anyone planning to publish.',
            },
          ],
          keyTakeaways: [
            'Every experiment needs H₀ (null) and H₁ (alternative) written BEFORE data collection.',
            'Independent = what you change; Dependent = what you measure; Control = what stays fixed.',
            'Pre-register your protocol before running experiments — this is structurally impossible to HARKing.',
            'HARKing harms other researchers who waste time and funding trying to replicate fake results.',
          ],
        },
      ],
    },
  ],
};
