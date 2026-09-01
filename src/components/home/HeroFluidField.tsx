'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroFluidField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Mathematical grid parameters
    const cols = 50;
    const rows = 28;
    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, width, height);

      // Grid spacing
      const spacingX = width / (cols - 1);
      const spacingY = height / (rows - 1);

      const points: { x: number; y: number; z: number }[][] = [];

      // Calculate 3D mathematical manifold points
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * spacingX;
          const baseY = r * spacingY;

          // Distance to mouse
          const dx = baseX - mouseX;
          const dy = baseY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseEffect = Math.max(0, 1 - dist / 380);

          // Harmonic wave superposition equation
          const wave1 = Math.sin(c * 0.22 + time * 1.2) * 20;
          const wave2 = Math.cos(r * 0.26 - time * 0.95) * 16;
          const wave3 = Math.sin((c + r) * 0.14 + time * 0.7) * 12;
          const interactiveWave = Math.sin(dist * 0.028 - time * 2.2) * (mouseEffect * 32);

          const elevation = wave1 + wave2 + wave3 + interactiveWave;

          points[r][c] = {
            x: baseX,
            y: baseY + elevation * 0.7,
            z: elevation
          };
        }
      }

      // Draw high-contrast manifold connection lines
      ctx.lineWidth = 0.85;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];

          // Horizontal line
          if (c < cols - 1) {
            const nextPt = points[r][c + 1];
            const normalizedZ = (pt.z + 35) / 75; // 0 to 1
            const alpha = Math.max(0.12, Math.min(0.48, normalizedZ));

            ctx.strokeStyle = isDark
              ? `rgba(148, 163, 184, ${alpha * 0.7})`
              : `rgba(51, 65, 85, ${alpha * 0.65})`; // Clear and crisp on white

            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);
            ctx.stroke();
          }

          // Vertical line
          if (r < rows - 1) {
            const downPt = points[r + 1][c];
            const normalizedZ = (pt.z + 35) / 75;
            const alpha = Math.max(0.1, Math.min(0.42, normalizedZ));

            ctx.strokeStyle = isDark
              ? `rgba(148, 163, 184, ${alpha * 0.55})`
              : `rgba(71, 85, 105, ${alpha * 0.55})`;

            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(downPt.x, downPt.y);
            ctx.stroke();
          }

          // Node points
          if ((r + c) % 2 === 0) {
            const isCrest = pt.z > 14;
            const radius = isCrest ? 1.75 : 1.1;

            if (isDark) {
              ctx.fillStyle = isCrest
                ? 'rgba(56, 189, 248, 0.95)'
                : 'rgba(226, 232, 240, 0.45)';
            } else {
              // High contrast for White Theme
              ctx.fillStyle = isCrest
                ? 'rgba(2, 132, 199, 0.95)'
                : 'rgba(15, 23, 42, 0.45)';
            }

            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div suppressHydrationWarning className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      {/* 60fps GPU Mathematical Fluid Wave Manifold Canvas */}
      <canvas 
        ref={canvasRef} 
        suppressHydrationWarning
        className="absolute inset-0 w-full h-full block" 
      />

      {/* Optical Spotlight Vignette (Tuned for high visibility in Light & Dark mode) */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(255,255,255,0.65)_90%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,#0b0f19_90%)]" 
      />

      {/* Edge Blending Fade */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white dark:from-[#0b0f19] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white dark:from-[#0b0f19] to-transparent" />
    </div>
  );
}
