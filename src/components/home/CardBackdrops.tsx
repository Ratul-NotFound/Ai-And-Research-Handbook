'use client';

import React from 'react';

/**
 * 1. CS RESEARCH METHODOLOGY - INTEGRATED TOPIC BACKGROUND
 * Subtle academic citation flow, literature nodes, and research grid
 */
export function CsResearchCardBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {/* Ambient gradient aura */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-sky-400/10 dark:bg-cyan-500/15 blur-3xl" />

      {/* Blueprint grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bg-grid-res" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid-res)" />
      </svg>

      {/* Citation Network & Scientific Graph Watermark */}
      <svg
        className="absolute -right-6 -bottom-6 w-56 h-56 opacity-10 dark:opacity-15 text-sky-600 dark:text-cyan-400 transition-all duration-700 group-hover:scale-105 group-hover:opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connected Paper Tree Paths */}
        <path d="M 30 140 Q 80 100 130 90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 130 90 Q 160 110 180 50" stroke="currentColor" strokeWidth="1.75" />
        <path d="M 130 90 L 170 150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 30 140 L 80 180" stroke="currentColor" strokeWidth="1.25" />
        <path d="M 80 180 L 170 150" stroke="currentColor" strokeWidth="1.25" />

        {/* Paper Nodes */}
        <circle cx="30" cy="140" r="10" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <circle cx="30" cy="140" r="3.5" fill="currentColor" />

        <circle cx="130" cy="90" r="14" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
        <circle cx="130" cy="90" r="5" fill="currentColor" />

        <circle cx="180" cy="50" r="9" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
        <circle cx="180" cy="50" r="3" fill="currentColor" />

        <circle cx="80" cy="180" r="9" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
        <circle cx="80" cy="180" r="3" fill="currentColor" />

        <circle cx="170" cy="150" r="12" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
        <circle cx="170" cy="150" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * 2. MACHINE LEARNING - INTEGRATED TOPIC BACKGROUND
 * Subtle multi-layer neural network mesh and decision boundary
 */
export function MachineLearningCardBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {/* Ambient gradient aura */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-400/10 dark:bg-emerald-500/15 blur-3xl" />

      {/* Dot matrix pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bg-dots-ml" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-dots-ml)" />
      </svg>

      {/* Neural Synapses & Decision Surface Watermark */}
      <svg
        className="absolute -right-6 -bottom-6 w-56 h-56 opacity-10 dark:opacity-15 text-emerald-600 dark:text-emerald-400 transition-all duration-700 group-hover:scale-105 group-hover:opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Curved Decision Boundary */}
        <path d="M 10 160 C 50 140, 80 70, 190 40" stroke="currentColor" strokeWidth="1.75" strokeDasharray="4 4" />

        {/* Synaptic Network Links */}
        <line x1="40" y1="50" x2="100" y2="35" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.5" />
        <line x1="40" y1="50" x2="100" y2="85" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
        <line x1="40" y1="95" x2="100" y2="35" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.3" />
        <line x1="40" y1="95" x2="100" y2="85" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="40" y1="95" x2="100" y2="135" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
        <line x1="40" y1="140" x2="100" y2="85" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.4" />
        <line x1="40" y1="140" x2="100" y2="135" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />

        <line x1="100" y1="35" x2="160" y2="85" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
        <line x1="100" y1="85" x2="160" y2="85" stroke="currentColor" strokeWidth="2" strokeOpacity="0.8" />
        <line x1="100" y1="135" x2="160" y2="85" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />

        {/* Neurons */}
        <circle cx="40" cy="50" r="5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
        <circle cx="40" cy="95" r="5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
        <circle cx="40" cy="140" r="5" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />

        <circle cx="100" cy="35" r="6.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="100" cy="85" r="8.5" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.2" />
        <circle cx="100" cy="135" r="6.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />

        <circle cx="160" cy="85" r="11" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
        <circle cx="160" cy="85" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * 3. MATHEMATICAL FOUNDATIONS - INTEGRATED TOPIC BACKGROUND
 * 3D Isometric vector coordinates, loss contours, and calculus symbols
 */
export function MathematicsCardBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {/* Ambient gradient aura */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-400/10 dark:bg-indigo-500/15 blur-3xl" />

      {/* Isometric coordinate grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bg-grid-math" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 0 11 L 22 11 M 11 0 L 11 22" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid-math)" />
      </svg>

      {/* 3D Coordinate Vectors & Loss Surface Contours Watermark */}
      <svg
        className="absolute -right-6 -bottom-6 w-56 h-56 opacity-10 dark:opacity-15 text-indigo-600 dark:text-indigo-400 transition-all duration-700 group-hover:scale-105 group-hover:opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Elliptic Loss Landscape Contours */}
        <ellipse cx="120" cy="90" rx="65" ry="34" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <ellipse cx="120" cy="90" rx="42" ry="22" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 3" opacity="0.6" />
        <ellipse cx="120" cy="90" rx="20" ry="11" stroke="currentColor" strokeWidth="1.75" opacity="0.8" />
        <circle cx="120" cy="90" r="3.5" fill="currentColor" />

        {/* 3D Coordinate Axes */}
        <line x1="25" y1="135" x2="25" y2="40" stroke="currentColor" strokeWidth="1.5" />
        <line x1="25" y1="135" x2="110" y2="135" stroke="currentColor" strokeWidth="1.5" />
        <line x1="25" y1="135" x2="5" y2="160" stroke="currentColor" strokeWidth="1.5" />

        {/* Eigenvector v1 Vector */}
        <line x1="25" y1="135" x2="85" y2="80" stroke="currentColor" strokeWidth="2" />
        <circle cx="85" cy="80" r="3.5" fill="currentColor" />

        {/* Gradient Descent Step Vector */}
        <path d="M 165 45 Q 140 70 126 84" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="165" cy="45" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * 4. DEEP LEARNING - INTEGRATED TOPIC BACKGROUND
 * Deep neural network layers, self-attention query-key vectors, and multi-head tensor connections
 */
export function DeepLearningCardBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {/* Ambient gradient aura */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-violet-400/10 dark:bg-purple-500/15 blur-3xl" />

      {/* Hexagonal tensor grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bg-grid-dl" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M 9 0 L 18 9 L 9 18 L 0 9 Z" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid-dl)" />
      </svg>

      {/* Self-Attention & Deep Network Topology Watermark */}
      <svg
        className="absolute -right-6 -bottom-6 w-56 h-56 opacity-10 dark:opacity-15 text-violet-600 dark:text-purple-400 transition-all duration-700 group-hover:scale-105 group-hover:opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Multi-head attention connectivity lines */}
        <path d="M 30 50 Q 100 20 170 60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 30 100 Q 100 80 170 60" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 30 150 Q 100 140 170 140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 30 50 L 100 100" stroke="currentColor" strokeWidth="1.25" />
        <path d="M 30 150 L 100 100" stroke="currentColor" strokeWidth="1.25" />
        <path d="M 100 100 L 170 60" stroke="currentColor" strokeWidth="1.75" />
        <path d="M 100 100 L 170 140" stroke="currentColor" strokeWidth="1.75" />

        {/* Transformer Layer Nodes */}
        <circle cx="30" cy="50" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <circle cx="30" cy="100" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <circle cx="30" cy="150" r="6" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />

        <circle cx="100" cy="100" r="10" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
        <circle cx="100" cy="100" r="4" fill="currentColor" />

        <circle cx="170" cy="60" r="9" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
        <circle cx="170" cy="60" r="3.5" fill="currentColor" />

        <circle cx="170" cy="140" r="9" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
        <circle cx="170" cy="140" r="3.5" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * 5. NLP & LARGE LANGUAGE MODELS - INTEGRATED TOPIC BACKGROUND
 * Token embedding projections, language attention graphs, and semantic dialogue chat bubbles
 */
export function NlpCardBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {/* Ambient gradient aura */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-pink-400/10 dark:bg-rose-500/15 blur-3xl" />

      {/* Typography grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bg-grid-nlp" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 0 10 L 20 10 M 10 0 L 10 20" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid-nlp)" />
      </svg>

      {/* Language Semantic Graph & Token Flow Watermark */}
      <svg
        className="absolute -right-6 -bottom-6 w-56 h-56 opacity-10 dark:opacity-15 text-pink-600 dark:text-rose-400 transition-all duration-700 group-hover:scale-105 group-hover:opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dialogue Stream Paths */}
        <path d="M 20 120 C 60 70, 110 50, 180 70" stroke="currentColor" strokeWidth="1.75" strokeDasharray="3 3" />
        <path d="M 40 160 C 90 120, 130 110, 170 150" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 60 40 L 120 90" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 2" />
        <path d="M 120 90 L 160 110" stroke="currentColor" strokeWidth="1.5" />

        {/* Semantic Word Nodes */}
        <circle cx="60" cy="40" r="8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <circle cx="60" cy="40" r="3" fill="currentColor" />

        <circle cx="120" cy="90" r="12" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
        <circle cx="120" cy="90" r="4.5" fill="currentColor" />

        <circle cx="180" cy="70" r="9" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
        <circle cx="180" cy="70" r="3.5" fill="currentColor" />

        <circle cx="40" cy="160" r="7" stroke="currentColor" strokeWidth="1.25" fill="currentColor" fillOpacity="0.1" />
        <circle cx="40" cy="160" r="2.5" fill="currentColor" />

        <circle cx="170" cy="150" r="10" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
        <circle cx="170" cy="150" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * 6. MODERN AI & AUTONOMOUS AGENTS - INTEGRATED TOPIC BACKGROUND
 * MCP client-server protocol hubs, agent reasoning loops, tool-calling branching, and swarm network
 */
export function ModernAiCardBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
      {/* Ambient gradient aura */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-purple-400/10 dark:bg-indigo-500/15 blur-3xl" />

      {/* Cybernetic grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bg-grid-mod-ai" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 22 22 M 22 0 L 0 22" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-grid-mod-ai)" />
      </svg>

      {/* Autonomous Agent Swarm & MCP Protocol Hub Watermark */}
      <svg
        className="absolute -right-6 -bottom-6 w-56 h-56 opacity-10 dark:opacity-15 text-purple-600 dark:text-indigo-400 transition-all duration-700 group-hover:scale-105 group-hover:opacity-20"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Agent Supervisor Hub to Tool Workers */}
        <path d="M 100 60 L 40 120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 100 60 L 100 150" stroke="currentColor" strokeWidth="1.75" />
        <path d="M 100 60 L 160 110" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 40 120 L 100 150" stroke="currentColor" strokeWidth="1.25" />
        <path d="M 100 150 L 160 110" stroke="currentColor" strokeWidth="1.25" />

        {/* Cyclic ReAct loop arc */}
        <path d="M 75 45 A 35 35 0 0 1 125 45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Central Supervisor Agent Node */}
        <circle cx="100" cy="60" r="12" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
        <circle cx="100" cy="60" r="4.5" fill="currentColor" />

        {/* Specialist Agent Nodes */}
        <circle cx="40" cy="120" r="9" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="40" cy="120" r="3.5" fill="currentColor" />

        <circle cx="100" cy="150" r="10" stroke="currentColor" strokeWidth="1.75" fill="currentColor" fillOpacity="0.15" />
        <circle cx="100" cy="150" r="4" fill="currentColor" />

        <circle cx="160" cy="110" r="9" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="160" cy="110" r="3.5" fill="currentColor" />
      </svg>
    </div>
  );
}
