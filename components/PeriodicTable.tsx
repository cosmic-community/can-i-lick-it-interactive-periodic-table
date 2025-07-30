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

  // Separate main table elements from lanthanides and actinides
  const mainTableElements = sortedElements.filter(element => {
    const atomicNumber = element.metadata.atomic_number;
    // Exclude lanthanides (57-71) and actinides (89-103) from main table
    return !((atomicNumber >= 57 && atomicNumber <= 71) || (atomicNumber >= 89 && atomicNumber <= 103));
  });

  const lanthanides = sortedElements.filter(element => {
    const atomicNumber = element.metadata.atomic_number;
    return atomicNumber >= 57 && atomicNumber <= 71;
  });

  const actinides = sortedElements.filter(element => {
    const atomicNumber = element.metadata.atomic_number;
    return atomicNumber >= 89 && atomicNumber <= 103;
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Main periodic table */}
      <div className="periodic-grid">
        {mainTableElements.map((element) => {
          const position = getElementGridPosition(
            element.metadata.period, 
            element.metadata.group,
            element.metadata.atomic_number
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

        {/* Placeholders for lanthanides and actinides in main table */}
        <div 
          className="element-tile bg-gray-200 dark:bg-gray-700 border-dashed opacity-60"
          style={{
            gridColumn: 3,
            gridRow: 6,
          }}
        >
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium text-center">
            57-71
          </div>
        </div>
        
        <div 
          className="element-tile bg-gray-200 dark:bg-gray-700 border-dashed opacity-60"
          style={{
            gridColumn: 3,
            gridRow: 7,
          }}
        >
          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium text-center">
            89-103
          </div>
        </div>
      </div>

      {/* Lanthanides and Actinides series */}
      <div className="mt-8">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
          Lanthanides (La-Lu)
        </div>
        <div className="lanthanides-grid">
          {lanthanides.map((element, index) => (
            <ElementTile
              key={element.id}
              element={element}
              onClick={handleElementClick}
              onMouseEnter={handleElementHover}
              onMouseLeave={handleElementLeave}
              isHighlighted={highlightedElement === element.metadata.symbol}
              style={{
                gridColumn: index + 1,
                gridRow: 1,
              }}
            />
          ))}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 mt-4 text-center">
          Actinides (Ac-Lr)
        </div>
        <div className="actinides-grid">
          {actinides.map((element, index) => (
            <ElementTile
              key={element.id}
              element={element}
              onClick={handleElementClick}
              onMouseEnter={handleElementHover}
              onMouseLeave={handleElementLeave}
              isHighlighted={highlightedElement === element.metadata.symbol}
              style={{
                gridColumn: index + 1,
                gridRow: 1,
              }}
            />
          ))}
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