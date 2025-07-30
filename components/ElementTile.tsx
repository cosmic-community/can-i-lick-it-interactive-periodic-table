'use client'

import { memo } from 'react';
import type { Element } from '@/types';
import { getSafetyColor } from '@/lib/elements-data';
import { clsx } from 'clsx';

interface ElementTileProps {
  element: Element;
  onClick?: (element: Element) => void;
  onMouseEnter?: (element: Element, event: React.MouseEvent) => void;
  onMouseLeave?: () => void;
  isHighlighted?: boolean;
  style?: React.CSSProperties;
}

const ElementTile = memo(function ElementTile({
  element,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isHighlighted = false,
  style
}: ElementTileProps) {
  const safetyColor = getSafetyColor(element.metadata.safety_level);

  const handleClick = () => {
    onClick?.(element);
  };

  const handleMouseEnter = (event: React.MouseEvent) => {
    onMouseEnter?.(element, event);
  };

  return (
    <div
      className={clsx(
        'element-tile',
        'select-none',
        isHighlighted && 'element-highlighted ring-4 ring-blue-400 ring-opacity-75'
      )}
      style={{
        backgroundColor: safetyColor,
        ...style
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      title={`${element.metadata.element_name} (${element.metadata.symbol})`}
    >
      {/* Atomic number */}
      <div className="element-number absolute top-0.5 left-0.5 sm:top-1 sm:left-1">
        {element.metadata.atomic_number}
      </div>

      {/* Element symbol */}
      <div className="element-symbol">
        {element.metadata.symbol}
      </div>

      {/* Element name (hidden on small screens) */}
      <div className="hidden sm:block text-xs text-white opacity-90 text-center leading-tight mt-0.5">
        {element.metadata.element_name}
      </div>
    </div>
  );
});

export default ElementTile;