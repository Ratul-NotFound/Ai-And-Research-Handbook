'use client';

import React, { useState, useMemo } from 'react';
import { Cpu, CheckCircle2, AlertCircle, Sparkles, Filter } from 'lucide-react';

export default function InteractiveModelSelector() {
  const [modality, setModality] = useState<'tabular' | 'nlp' | 'vision' | 'timeseries' | 'graph'>('tabular');
  const [scale, setScale] = useState<'small' | 'medium' | 'large'>('medium');
  const [priority, setPriority] = useState<'accuracy' | 'latency' | 'explainability'>('accuracy');

  // Compute recommendation
  const recommendation = useMemo(() => {
    // 1. Tabular
    if (modality === 'tabular') {
      if (priority === 'explainability') {
        return {
          model: 'Explainable Boosting Machine (EBM) / ElasticNet',
          badge: 'High Interpretability',
          color: 'emerald',
          whyThis: 'EBM produces exact generalized additive feature shape plots, allowing 100% auditable regulatory compliance.',
          whyNot: 'Black-box Neural Networks or deep ensembles cannot be trivially audited for medical or credit risk.',
          bestLibrary: 'interpret-ml / scikit-learn',
        };
      }
      if (scale === 'small') {
        return {
          model: 'Random Forest / XGBoost with Optuna',
          badge: 'Tree Ensemble SOTA',
          color: 'sky',
          whyThis: 'Orthogonal coordinate splits prevent overfitting on small sample sizes with unaligned feature scales.',
          whyNot: 'Deep neural networks lack inductive bias for tabular coordinates and overfit on small sample sizes.',
          bestLibrary: 'xgboost / lightgbm',
        };
      }
      return {
        model: 'LightGBM / CatBoost (GPU Accelerated)',
        badge: 'Histogram SOTA',
        color: 'violet',
        whyThis: 'Histogram-based binning reduces split computation time by 15x while natively encoding high-cardinality categoricals.',
        whyNot: 'Standard Random Forest is too slow; Multi-Layer Perceptrons require 10x more hyperparameter tuning.',
        bestLibrary: 'lightgbm / catboost',
      };
    }

    // 2. NLP / Text
    if (modality === 'nlp') {
      if (priority === 'latency') {
        return {
          model: 'DistilBERT / MiniLM-L6 (INT8 ONNX Quantized)',
          badge: 'Sub-5ms NLP',
          color: 'amber',
          whyThis: 'Knowledge distillation retains 97% of BERT accuracy with 40% fewer parameters and sub-5ms CPU latency.',
          whyNot: '70B Autoregressive LLMs require multi-GPU VRAM clusters and have 100x higher latency.',
          bestLibrary: 'onnxruntime / optimum',
        };
      }
      if (scale === 'small' || priority === 'explainability') {
        return {
          model: 'DeBERTa-v3 / ModernBERT (Linear Probe / LoRA)',
          badge: 'Bidirectional Encoder',
          color: 'sky',
          whyThis: 'Disentangled relative attention captures deep contextual syntax; linear probe avoids overfitting on small text data.',
          whyNot: 'TF-IDF bag-of-words ignores word order, while training from scratch fails on small datasets.',
          bestLibrary: 'transformers / peft',
        };
      }
      return {
        model: 'Decoder Transformer (LLaMA 3 / Mistral) with QLoRA',
        badge: 'Foundation Model SOTA',
        color: 'violet',
        whyThis: 'Pre-trained on trillions of tokens; QLoRA adapts parameters in 4-bit precision on a single consumer GPU.',
        whyNot: 'Encoder-only models cannot generate natural language responses autoregressively.',
        bestLibrary: 'unsloth / trl / peft',
      };
    }

    // 3. Vision
    if (modality === 'vision') {
      if (priority === 'latency') {
        return {
          model: 'MobileNetV3 / YOLOv8-Nano (TensorRT Engine)',
          badge: 'Real-Time Edge Vision',
          color: 'amber',
          whyThis: 'Depthwise separable convolutions minimize FLOPs, executing in 3ms on edge mobile NPUs.',
          whyNot: 'Vision Transformers (ViT) have heavy quadratic patch attention compute unsuitable for microcontrollers.',
          bestLibrary: 'ultralytics / tensorrt',
        };
      }
      if (scale === 'small') {
        return {
          model: 'DINOv2 / CLIP Frozen Backbone + MLP Head',
          badge: 'Self-Supervised Vision',
          color: 'sky',
          whyThis: 'Self-supervised vision features generalize with extreme few-shot sample efficiency.',
          whyNot: 'Training ResNet or ViT from scratch on small datasets causes catastrophic spatial overfitting.',
          bestLibrary: 'timm / torchvision',
        };
      }
      return {
        model: 'Vision Transformer (ViT-H / Swin) / ConvNeXt',
        badge: 'Large-Scale SOTA',
        color: 'violet',
        whyThis: 'All-to-all global patch attention scales with massive dataset volume without saturating.',
        whyNot: 'Early CNN architectures (AlexNet/VGG) lack identity skip highways and have parameter bloat.',
        bestLibrary: 'timm / huggingface',
      };
    }

    // 4. Time-Series
    if (modality === 'timeseries') {
      if (scale === 'small' || priority === 'explainability') {
        return {
          model: 'Prophet / ARIMA / AutoRegressive Splines',
          badge: 'Decomposable Forecasting',
          color: 'emerald',
          whyThis: 'Explicit additive trend + seasonality + holiday decomposition with complete parameter transparency.',
          whyNot: 'Deep neural networks overfit on short historical horizons and lack confidence bounds.',
          bestLibrary: 'prophet / statsmodels',
        };
      }
      return {
        model: 'PatchTST / N-BEATS / Chronos Transformer',
        badge: 'Patch-Based Temporal SOTA',
        color: 'violet',
        whyThis: 'Segmenting time-series into subseries patches preserves temporal locality while reducing token length by 16x.',
        whyNot: 'Standard Recurrent LSTMs suffer from sequential training bottlenecks on long horizons.',
        bestLibrary: 'darts / neuralforecast',
      };
    }

    // 5. Graph
    return {
      model: 'Graph Neural Network (GraphSAGE / GAT / GCN)',
      badge: 'Relational Topology SOTA',
      color: 'violet',
      whyThis: 'Propagates message-passing embeddings along topological adjacency edges, respecting graph relational symmetry.',
      whyNot: 'Tabular MLPs treat node rows independently, completely ignoring topological graph connectivity.',
      bestLibrary: 'torch_geometric (PyG) / DGL',
    };
  }, [modality, scale, priority]);

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/80">
            <Filter className="h-4 w-4" />
          </span>
          <h4 className="text-sm font-black text-slate-950 dark:text-white tracking-tight">
            Interactive Model Architecture Selector
          </h4>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure your dataset profile and operational constraints below to immediately discover the optimal machine learning architecture.
        </p>
      </div>

      {/* 3 Config Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        
        {/* 1. Modality */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            1. Data Modality:
          </label>
          <select
            value={modality}
            onChange={(e) => setModality(e.target.value as any)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          >
            <option value="tabular">Structured / Tabular Data</option>
            <option value="nlp">Text / NLP / Documents</option>
            <option value="vision">Images / Video / Vision</option>
            <option value="timeseries">Time-Series / Telemetry</option>
            <option value="graph">Graph / Network Data</option>
          </select>
        </div>

        {/* 2. Scale */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            2. Dataset Scale:
          </label>
          <select
            value={scale}
            onChange={(e) => setScale(e.target.value as any)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          >
            <option value="small">Small (&lt; 1,000 samples)</option>
            <option value="medium">Medium (10K - 100K samples)</option>
            <option value="large">Large (&gt; 1M samples / tokens)</option>
          </select>
        </div>

        {/* 3. Priority */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            3. Operational Constraint:
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          >
            <option value="accuracy">Maximum Benchmark Accuracy</option>
            <option value="latency">Low Latency (&lt; 10ms budget)</option>
            <option value="explainability">Full Interpretability (Regulatory)</option>
          </select>
        </div>
      </div>

      {/* Recommended Model Result Card */}
      <div className="rounded-xl border border-violet-200 dark:border-violet-900/80 bg-violet-50/40 dark:bg-violet-950/20 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-violet-100 dark:border-violet-900/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white font-mono text-xs font-black">
              ✓
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-violet-700 dark:text-violet-300 block">
                Optimal Architecture Recommendation
              </span>
              <h5 className="text-base sm:text-lg font-black text-slate-950 dark:text-white tracking-tight">
                {recommendation.model}
              </h5>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md bg-white/80 dark:bg-slate-900/80 border border-violet-200 dark:border-violet-800 px-2 py-0.5 text-[11px] font-mono text-violet-700 dark:text-violet-300">
              {recommendation.badge}
            </span>
            <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              {recommendation.bestLibrary}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              Why This Architecture:
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5">
              {recommendation.whyThis}
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
              Why Not Alternative Approaches:
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-5">
              {recommendation.whyNot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
