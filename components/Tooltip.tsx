'use client'

import { useEffect, useState } from 'react';
import type { TooltipProps } from '@/types';
import { getSafetyLevelInfo } from '@/lib/elements-data';

export default function Tooltip({ element, position, visible }: TooltipProps) {
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const safetyInfo = getSafetyLevelInfo(element.metadata.safety_level);

  useEffect(() => {
    if (!visible) return;

    // Calculate tooltip position to keep it on screen
    const tooltipWidth = 250;
    const tooltipHeight = 100;
    const padding = 16;

    let x = position.x - tooltipWidth / 2;
    let y = position.y - tooltipHeight - 10;

    // Adjust if tooltip goes off the right edge
    if (x + tooltipWidth > window.innerWidth - padding) {
      x = window.innerWidth - tooltipWidth - padding;
    }

    // Adjust if tooltip goes off the left edge
    if (x < padding) {
      x = padding;
    }

    // Adjust if tooltip goes off the top edge
    if (y < padding) {
      y = position.y + 60; // Show below the element instead
    }

    setTooltipStyle({
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      zIndex: 1000,
    });
  }, [position, visible]);

  if (!visible) return null;

  return (
    <div
      className={`tooltip ${visible ? 'visible' : ''}`}
      style={tooltipStyle}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{safetyInfo.emoji}</span>
        <div>
          <div className="font-bold text-sm">
            {element.metadata.element_name} ({element.metadata.symbol})
          </div>
          <div className="text-xs opacity-80">
            Atomic Number: {element.metadata.atomic_number}
          </div>
        </div>
      </div>
      
      <div className="text-sm font-medium mb-1">
        {safetyInfo.label}
      </div>
      
      <div className="text-sm">
        {element.metadata.lick_description}
      </div>
    </div>
  );
}