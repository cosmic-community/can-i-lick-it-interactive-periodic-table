// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Specific object types for our periodic table
interface Element extends CosmicObject {
  type: 'elements';
  metadata: {
    symbol: string;           // Chemical symbol (H, He, Li, etc.)
    atomic_number: number;    // Position in periodic table
    safety_level: SafetyLevel; // Lickability rating
    lick_description: string; // Humorous tooltip text
    element_group?: string;   // Metal, Nonmetal, Noble Gas, etc.
    period: number;          // Periodic table row
    group: number;           // Periodic table column (1-18)
    element_name: string;    // Full element name
  };
}

// Safety levels for element lickability
type SafetyLevel = 'green' | 'yellow' | 'red' | 'purple';

// Safety level descriptions
interface SafetyLevelInfo {
  color: string;
  bgColor: string;
  label: string;
  description: string;
  emoji: string;
}

// Type for creating new element data
type CreateElementData = Omit<Element, 'id' | 'created_at' | 'modified_at'>;

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Component prop types
interface PeriodicTableProps {
  elements: Element[];
  onElementClick?: (element: Element) => void;
  highlightedElement?: string | null;
}

interface ElementTileProps {
  element: Element;
  onClick?: (element: Element) => void;
  isHighlighted?: boolean;
  style?: React.CSSProperties;
}

interface TooltipProps {
  element: Element;
  position: { x: number; y: number };
  visible: boolean;
}

interface LegendProps {
  className?: string;
}

interface DarkModeToggleProps {
  className?: string;
}

// Utility types
type ElementPosition = {
  period: number;
  group: number;
  gridColumn: number;
  gridRow: number;
};

// Type guards for runtime validation
function isElement(obj: CosmicObject): obj is Element {
  return obj.type === 'elements';
}

// Export all types
export type {
  CosmicObject,
  Element,
  SafetyLevel,
  SafetyLevelInfo,
  CreateElementData,
  CosmicResponse,
  PeriodicTableProps,
  ElementTileProps,
  TooltipProps,
  LegendProps,
  DarkModeToggleProps,
  ElementPosition,
};

export { isElement };