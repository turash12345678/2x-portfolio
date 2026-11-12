/**
 * ⚡ 2X ✦ Studio — Figma Native Keyframe Automation Helpers
 * Production helper functions for scripting keyframes via applyManualKeyframeTrack
 */

// 1. Signature Easing Curves
export const EASINGS = {
  SNAPPY_DECEL: { x1: 0.22, y1: 1.0, x2: 0.36, y2: 1.0 },
  SPRING_OVERSHOOT_32: { x1: 0.34, y1: 1.32, x2: 0.64, y2: 1.0 },
  PROGRESS_RAMPING: { x1: 0.65, y1: 0.0, x2: 0.25, y2: 1.0 },
  LINEAR: { x1: 0.0, y1: 0.0, x2: 1.0, y2: 1.0 },
  SMOOTH_INOUT: { x1: 0.42, y1: 0.0, x2: 0.58, y2: 1.0 }
};

/**
 * Format cubic bezier curve into Figma plugin format
 */
export function formatBezier(bezier = EASINGS.SNAPPY_DECEL) {
  return {
    type: 'CUSTOM_CUBIC_BEZIER',
    easingFunctionCubicBezier: bezier
  };
}

/**
 * Build a scale spring track (click depression -> spring pop -> settle)
 * @param {number} startTime
 * @param {number} endTime
 * @param {number} pressScale e.g. 0.90
 * @param {number} bounceScale e.g. 1.08
 */
export function buildSpringButtonTrack(startTime = 1.0, endTime = 1.6, pressScale = 0.92, bounceScale = 1.08) {
  const mid1 = startTime + (endTime - startTime) * 0.35;
  const mid2 = startTime + (endTime - startTime) * 0.70;

  return {
    baseValue: { type: 'VECTOR', value: { x: 1, y: 1 } },
    keyframes: [
      { timelinePosition: 0.0, value: { type: 'VECTOR', value: { x: 1, y: 1 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
      { timelinePosition: startTime, value: { type: 'VECTOR', value: { x: 1, y: 1 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
      { timelinePosition: mid1, value: { type: 'VECTOR', value: { x: pressScale, y: pressScale } }, easing: formatBezier(EASINGS.SPRING_OVERSHOOT_32) },
      { timelinePosition: mid2, value: { type: 'VECTOR', value: { x: bounceScale, y: bounceScale } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
      { timelinePosition: endTime, value: { type: 'VECTOR', value: { x: 1, y: 1 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) }
    ]
  };
}

/**
 * Build a vertical elevation/hover track (Y offset and scale)
 */
export function buildHoverElevationTrack(startTime, duration, yOffset = -8, scale = 1.03) {
  const returnTime = startTime + duration;
  return {
    positionTrack: {
      baseValue: { type: 'VECTOR', value: { x: 0, y: 0 } },
      keyframes: [
        { timelinePosition: 0.0, value: { type: 'VECTOR', value: { x: 0, y: 0 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
        { timelinePosition: startTime, value: { type: 'VECTOR', value: { x: 0, y: 0 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
        { timelinePosition: startTime + 0.3, value: { type: 'VECTOR', value: { x: 0, y: yOffset } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
        { timelinePosition: returnTime - 0.3, value: { type: 'VECTOR', value: { x: 0, y: yOffset } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
        { timelinePosition: returnTime, value: { type: 'VECTOR', value: { x: 0, y: 0 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) }
      ]
    },
    scaleTrack: {
      baseValue: { type: 'VECTOR', value: { x: 1, y: 1 } },
      keyframes: [
        { timelinePosition: 0.0, value: { type: 'VECTOR', value: { x: 1, y: 1 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
        { timelinePosition: startTime, value: { type: 'VECTOR', value: { x: 1, y: 1 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
        { timelinePosition: startTime + 0.3, value: { type: 'VECTOR', value: { x: scale, y: scale } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
        { timelinePosition: returnTime - 0.3, value: { type: 'VECTOR', value: { x: scale, y: scale } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) },
        { timelinePosition: returnTime, value: { type: 'VECTOR', value: { x: 1, y: 1 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) }
      ]
    }
  };
}

/**
 * Animate an interactive cursor waypoint trajectory across multiple target coordinates
 * @param {object} cursorNode
 * @param {Array<{t: number, x: number, y: number, click?: boolean}>} waypoints
 * @param {number} totalDuration e.g. 5.0
 */
export async function animateCursorJourney(cursorNode, waypoints, totalDuration = 5.0) {
  const posKeyframes = [
    { timelinePosition: 0.0, value: { type: 'VECTOR', value: { x: waypoints[0].x, y: waypoints[0].y } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) }
  ];

  const scaleKeyframes = [
    { timelinePosition: 0.0, value: { type: 'VECTOR', value: { x: 1, y: 1 } }, easing: formatBezier(EASINGS.SNAPPY_DECEL) }
  ];

  for (const wp of waypoints) {
    posKeyframes.push({
      timelinePosition: wp.t,
      value: { type: 'VECTOR', value: { x: wp.x, y: wp.y } },
      easing: formatBezier(EASINGS.SNAPPY_DECEL)
    });

    if (wp.click) {
      scaleKeyframes.push({
        timelinePosition: wp.t,
        value: { type: 'VECTOR', value: { x: 1, y: 1 } },
        easing: formatBezier(EASINGS.SNAPPY_DECEL)
      });
      scaleKeyframes.push({
        timelinePosition: wp.t + 0.12,
        value: { type: 'VECTOR', value: { x: 0.88, y: 0.88 } },
        easing: formatBezier(EASINGS.SPRING_OVERSHOOT_32)
      });
      scaleKeyframes.push({
        timelinePosition: wp.t + 0.30,
        value: { type: 'VECTOR', value: { x: 1.0, y: 1.0 } },
        easing: formatBezier(EASINGS.SNAPPY_DECEL)
      });
    }
  }

  // Zero-hitch loop return
  posKeyframes.push({
    timelinePosition: totalDuration,
    value: { type: 'VECTOR', value: { x: waypoints[0].x, y: waypoints[0].y } },
    easing: formatBezier(EASINGS.SNAPPY_DECEL)
  });
  scaleKeyframes.push({
    timelinePosition: totalDuration,
    value: { type: 'VECTOR', value: { x: 1, y: 1 } },
    easing: formatBezier(EASINGS.SNAPPY_DECEL)
  });

  cursorNode.applyManualKeyframeTrack({ type: 'PROPERTY', name: 'POSITION' }, {
    baseValue: { type: 'VECTOR', value: { x: waypoints[0].x, y: waypoints[0].y } },
    keyframes: posKeyframes
  });

  cursorNode.applyManualKeyframeTrack({ type: 'PROPERTY', name: 'SCALE_XY' }, {
    baseValue: { type: 'VECTOR', value: { x: 1, y: 1 } },
    keyframes: scaleKeyframes
  });
}
