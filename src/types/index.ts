import { WorkflowNode } from '@/components/book/WorkflowDiagram';
import { DecisionNode } from '@/components/book/DecisionTree';
import { ComparisonColumn } from '@/components/book/ComparisonGrid';

export type { WorkflowNode, DecisionNode, ComparisonColumn };

export interface PaperCitation {
  title: string;
  authors: string;
  year: number;
  arxivId?: string;
  url: string;
  significance: string;
}

export interface TradeoffComparison {
  feature: string;
  currentApproach: string;
  alternativeApproach: string;
  whyThis: string;
  whyNotOther: string;
  whenToUse: string;
}

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface PipelineStep {
  number: number;
  title: string;
  subtitle: string;
  badge?: string;
  iconName?: string;
}

export interface RealLifeAnalogy {
  title: string;
  explanation: string;
  steps?: PipelineStep[];
  connectors?: string[];
}

export interface KeyQuestionAnswer {
  question: string;
  answer: string;
}

export interface RealWorldUse {
  industry: string;
  application: string;
}

export interface CalloutBlock {
  type: 'tip' | 'warning' | 'important' | 'example' | 'definition';
  title: string;
  body: string;
}

export interface StepByStep {
  stepNumber: number;
  title: string;
  description: string;
  example?: string;
}

/** Inline workflow diagram in a section */
export interface SectionWorkflow {
  title?: string;
  description?: string;
  nodes: WorkflowNode[];
  direction?: 'horizontal' | 'vertical';
}

/** Inline decision tree in a section */
export interface SectionDecisionTree {
  title?: string;
  description?: string;
  root: DecisionNode;
}

/** Inline comparison grid in a section */
export interface SectionComparisonGrid {
  title?: string;
  columns: ComparisonColumn[];
}

export type InteractiveWidgetType =
  | 'confusion-matrix'
  | 'bias-variance'
  | 'model-selector'
  | 'activation-visualizer'
  | 'attention-visualizer'
  | 'loss-landscape';

export interface ChapterSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  interactiveWidget?: InteractiveWidgetType;
  callouts?: CalloutBlock[];
  steps?: StepByStep[];
  workflow?: SectionWorkflow;
  decisionTree?: SectionDecisionTree;
  comparisonGrid?: SectionComparisonGrid;
  equations?: {
    latex: string;
    description: string;
  }[];
  tradeoffs?: TradeoffComparison[];
  codeExamples?: CodeExample[];
  keyTakeaways: string[];
  recommendedPapers?: PaperCitation[];
}

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  badge: string;
  estimatedMinutes: number;
  overview: string;
  prerequisites: string[];
  learningGoals?: string[];
  analogy?: RealLifeAnalogy;
  keyQuestions?: KeyQuestionAnswer[];
  realWorldUses?: RealWorldUse[];
  sections: ChapterSection[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  chapters: Chapter[];
}
