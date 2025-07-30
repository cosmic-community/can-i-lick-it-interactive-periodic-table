'use client'

import { useState, useCallback } from 'react';
import type { Element, PeriodicTableProps } from '@/types';
import ElementTile from './ElementTile';
import Tooltip from './Tooltip';
import { getElementGridPosition } from '@/lib/elements-data';

export default function PeriodicTable({ 
  elements, 
  onElementClick, 
  highlightedElement 
}: PeriodicTableProps) {
  const [tooltip, setTooltip] = useState<{
    element: Element;
    position: { x: number; y: number };
    visible: boolean;
  } | null>(null);

  const handleElementHover = useCallback((element: Element, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - 10;

    setTooltip({
      element,
      position: { x, y },
      visible: true
    });
  }, []);

  const handleElementLeave = useCallback(() => {
    setTooltip(prev => prev ? { ...prev, visible: false } : null);
  }, []);

  const handleElementClick = useCallback((element: Element) => {
    onElementClick?.(element);
  }, [onElementClick]);

  // Sort elements by atomic number
  const sortedElements = [...elements].sort((a, b) => 
    a.metadata.atomic_number - b.metadata.atomic_number
  );

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <div className="periodic-grid">
        {sortedElements.map((element) => {
          const position = getElementGridPosition(
            element.metadata.period, 
            element.metadata.group
          );
          
          return (
            <ElementTile
              key={element.id}
              element={element}
              onClick={handleElementClick}
              onMouseEnter={handleElementHover}
              onMouseLeave={handleElementLeave}
              isHighlighted={highlightedElement === element.metadata.symbol}
              style={{
                gridColumn: position.gridColumn,
                gridRow: position.gridRow,
              }}
            />
          );
        })}
      </div>

      {/* Empty spaces for lanthanides and actinides labels */}
      <div 
        className="absolute text-xs text-gray-600 dark:text-gray-400 font-medium flex items-center justify-center"
        style={{
          gridColumn: 3,
          gridRow: 6,
          left: '11.1%',
          top: '60%',
        }}
      >
        La*
      </div>
      
      <div 
        className="absolute text-xs text-gray-600 dark:text-gray-400 font-medium flex items-center justify-center"
        style={{
          gridColumn: 3,
          gridRow: 7,
          left: '11.1%',
          top: '70%',
        }}
      >
        Ac**
      </div>

      {/* Lanthanides and Actinides series labels */}
      <div className="mt-8 text-center">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span className="mr-4">* Lanthanides</span>
          <span>** Actinides</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <Tooltip
          element={tooltip.element}
          position={tooltip.position}
          visible={tooltip.visible}
        />
      )}
    </div>
  );
}