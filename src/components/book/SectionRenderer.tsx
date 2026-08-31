'use client';

import React from 'react';
import { ChapterSection } from '@/types';
import MathFormula from '@/components/math/MathFormula';
import CodeBlock from '@/components/code/CodeBlock';
import TradeoffMatrix from '@/components/interactive/TradeoffMatrix';
import ConfusionMatrixVisualizer from '@/components/interactive/ConfusionMatrixVisualizer';
import BiasVarianceVisualizer from '@/components/interactive/BiasVarianceVisualizer';
import InteractiveModelSelector from '@/components/interactive/InteractiveModelSelector';
import ActivationVisualizer from '@/components/interactive/ActivationVisualizer';
import AttentionVisualizer from '@/components/interactive/AttentionVisualizer';
import LossLandscapeExplorer from '@/components/interactive/LossLandscapeExplorer';
import PaperCard from './PaperCard';
import MarkdownContent from './MarkdownContent';
import CalloutCard from './CalloutCard';
import StepByStepGuide from './StepByStepGuide';
import WorkflowDiagram from './WorkflowDiagram';
import DecisionTree from './DecisionTree';
import ComparisonGrid from './ComparisonGrid';
import { Check, FileText } from 'lucide-react';

interface SectionRendererProps {
  section: ChapterSection;
  sectionNumber: number;
}

export default function SectionRenderer({ section, sectionNumber }: SectionRendererProps) {
  const renderInteractiveWidget = () => {
    switch (section.interactiveWidget) {
      case 'confusion-matrix':
        return <ConfusionMatrixVisualizer />;
      case 'bias-variance':
        return <BiasVarianceVisualizer />;
      case 'model-selector':
        return <InteractiveModelSelector />;
      case 'activation-visualizer':
        return <ActivationVisualizer />;
      case 'attention-visualizer':
        return <AttentionVisualizer />;
      case 'loss-landscape':
        return <LossLandscapeExplorer />;
      default:
        return null;
    }
  };

  return (
    <article id={section.id} className="space-y-6 scroll-mt-20">
      {/* Section Heading */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center rounded-md bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-sky-700 dark:text-cyan-300 border border-sky-200/80 dark:border-sky-800/80">
            § {sectionNumber}.0
          </span>
          {section.subtitle && (
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              — {section.subtitle}
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 sm:hidden">
            {section.subtitle}
          </p>
        )}
      </div>

      {/* Main Content (line-by-line markdown parser) */}
      <MarkdownContent content={section.content} />

      {/* Interactive Visualizer Widget */}
      {section.interactiveWidget && (
        <div className="pt-1">
          {renderInteractiveWidget()}
        </div>
      )}

      {/* Workflow Diagram */}
      {section.workflow && (
        <WorkflowDiagram
          title={section.workflow.title}
          description={section.workflow.description}
          nodes={section.workflow.nodes}
          direction={section.workflow.direction}
        />
      )}

      {/* Decision Tree */}
      {section.decisionTree && (
        <DecisionTree
          title={section.decisionTree.title}
          description={section.decisionTree.description}
          root={section.decisionTree.root}
        />
      )}

      {/* Comparison Grid */}
      {section.comparisonGrid && (
        <ComparisonGrid
          title={section.comparisonGrid.title}
          columns={section.comparisonGrid.columns}
        />
      )}

      {/* Step-by-Step Guide (timeline) */}
      {section.steps && section.steps.length > 0 && (
        <StepByStepGuide steps={section.steps} />
      )}

      {/* Callout Cards */}
      {section.callouts && section.callouts.length > 0 && (
        <div className="space-y-3">
          {section.callouts.map((callout, cIdx) => (
            <CalloutCard key={cIdx} callout={callout} />
          ))}
        </div>
      )}

      {/* Mathematical Formulations (KaTeX) */}
      {section.equations && section.equations.length > 0 && (
        <div className="space-y-3 pt-2">
          {section.equations.map((eq, eqIdx) => (
            <MathFormula key={eqIdx} latex={eq.latex} description={eq.description} />
          ))}
        </div>
      )}

      {/* Architectural Trade-offs Matrix */}
      {section.tradeoffs && section.tradeoffs.length > 0 && (
        <div className="pt-2">
          <TradeoffMatrix tradeoffs={section.tradeoffs} />
        </div>
      )}

      {/* Code Implementations */}
      {section.codeExamples && section.codeExamples.length > 0 && (
        <div className="space-y-3 pt-2">
          {section.codeExamples.map((code, cIdx) => (
            <CodeBlock
              key={cIdx}
              title={code.title}
              language={code.language}
              code={code.code}
              explanation={code.explanation}
            />
          ))}
        </div>
      )}

      {/* Key Takeaways */}
      {section.keyTakeaways && section.keyTakeaways.length > 0 && (
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 sm:p-5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Key Takeaways
          </span>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            {section.keyTakeaways.map((takeaway, tIdx) => (
              <li key={tIdx} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Foundational Research Papers */}
      {section.recommendedPapers && section.recommendedPapers.length > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30 p-4 sm:p-5 space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            Seminal Literature
          </span>
          <div className="space-y-2.5">
            {section.recommendedPapers.map((paper, pIdx) => (
              <PaperCard key={pIdx} paper={paper} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
