/**
 * ⚡ 2X ✦ Studio — Framer Motion (React 19) Recipes
 * Production motion variants matching 2X Figma keyframe curves
 */

import React from 'react';
import { motion, Variants } from 'framer-motion';

// Signature Easing Arrays
export const BEZIER = {
  snappyDecel: [0.22, 1.0, 0.36, 1.0] as const,
  springBounce: [0.34, 1.32, 0.64, 1.0] as const,
  progressCurve: [0.65, 0.0, 0.25, 1.0] as const
};

// 1. Signature Spring Pop (32% Bounce)
export const springPopVariant: Variants = {
  hidden: { scale: 0.6, opacity: 0, y: 0 },
  visible: {
    scale: [0.6, 1.32, 1.0],
    opacity: 1,
    y: -70,
    transition: {
      duration: 0.73,
      ease: BEZIER.springBounce
    }
  }
};

// 2. Net Squash & Stretch Inertia
export const netImpactVariant: Variants = {
  rest: { scaleX: 1, scaleY: 1, y: 0 },
  impact: {
    scaleX: [1, 0.88, 1.04, 1],
    scaleY: [1, 1.22, 0.94, 1],
    y: [0, 16.5, -4.5, 0],
    transition: {
      duration: 0.62,
      ease: BEZIER.snappyDecel
    }
  }
};

// 3. Staggered Word Reveal
export const wordSlideVariant: Variants = {
  hidden: { x: 44.6, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.10,
      duration: 0.30,
      ease: BEZIER.snappyDecel
    }
  })
};

// 4. Cursor Particle Trail Lifecycle
export const particleTrailVariant: Variants = {
  initial: { opacity: 0, scale: 0.55 },
  enter: {
    opacity: 1,
    scale: 1.0,
    transition: { duration: 0.22, ease: BEZIER.snappyDecel }
  },
  exit: {
    opacity: 0,
    scale: 0.82,
    transition: { delay: 0.55, duration: 0.45, ease: 'easeInOut' }
  }
};

// 5. Interactive Button Component
export const KineticButton: React.FC<{
  label: string;
  onClick?: () => void;
  className?: string;
}> = ({ label, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.18, ease: BEZIER.springBounce }}
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full font-medium transition-colors ${className}`}
    >
      {label}
    </motion.button>
  );
};
