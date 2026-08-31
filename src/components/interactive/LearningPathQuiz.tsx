'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LearningPathQuizProps {
  chapterTitle: string;
  questions?: QuizQuestion[];
}

const DEFAULT_QUESTIONS: Record<string, QuizQuestion[]> = {
  default: [
    {
      question: 'Why does AdamW outperform standard Adam when using L2 regularization?',
      options: [
        'AdamW multiplies gradients by the learning rate twice.',
        'AdamW directly decays weights independently of adaptive second-moment gradient scaling.',
        'AdamW removes all momentum terms from the optimizer.',
        'AdamW is an exact second-order Newton method.'
      ],
      correctIndex: 1,
      explanation: 'In standard Adam, L2 weight decay is added directly to gradients, which gets improperly scaled down for high-variance parameters. AdamW decouples weight decay so all parameters decay at a consistent rate.'
    },
    {
      question: 'Why does Grouped-Query Attention (GQA) dramatically reduce GPU VRAM in LLM inference?',
      options: [
        'It shrinks model parameter count by 50%.',
        'It shares Key and Value heads across multiple Query heads, compressing the KV Cache memory footprint.',
        'It replaces dot-product attention with simple convolutions.',
        'It executes attention in 8-bit integers only.'
      ],
      correctIndex: 1,
      explanation: 'During autoregressive generation, storing past Key-Value states (KV Cache) consumes gigabytes of VRAM. GQA allows $G$ query heads to share a single KV head, slashing KV cache memory by $4\\times$ to $8\\times$.'
    }
  ]
};

export default function LearningPathQuiz({ chapterTitle, questions }: LearningPathQuizProps) {
  const activeQuestions = questions && questions.length > 0 ? questions : DEFAULT_QUESTIONS.default;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const correctCount = activeQuestions.reduce((acc, q, idx) => {
      return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
    }, 0);

    if (correctCount === activeQuestions.length) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
          <HelpCircle className="h-4 w-4" />
        </span>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Knowledge Check: {chapterTitle}
          </h4>
          <p className="text-xs text-zinc-400">
            Verify your intuitive & mathematical grasp of this chapter.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {activeQuestions.map((q, qIdx) => {
          const userAnswer = selectedAnswers[qIdx];
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <div key={qIdx} className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-4 space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-zinc-200">
                {qIdx + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userAnswer === oIdx;
                  let btnStyle = 'border-white/10 bg-white/[0.02] text-zinc-300 hover:bg-white/[0.06]';

                  if (submitted) {
                    if (oIdx === q.correctIndex) {
                      btnStyle = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200 font-semibold ring-1 ring-emerald-500/50';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-rose-500/60 bg-rose-950/40 text-rose-200 line-through';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-teal-500/60 bg-teal-500/20 text-teal-200 font-medium';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={`w-full text-left rounded-lg border p-3 text-xs sm:text-sm transition-all duration-150 flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && oIdx === q.correctIndex && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="rounded-lg bg-zinc-950/80 border border-white/10 p-3 text-xs text-zinc-300">
                  <span className="font-bold text-teal-300">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < activeQuestions.length}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2 text-xs font-bold text-black transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-teal-500/20"
          >
            <Award className="h-4 w-4" />
            <span>Check Answers</span>
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-white/10"
          >
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
}
