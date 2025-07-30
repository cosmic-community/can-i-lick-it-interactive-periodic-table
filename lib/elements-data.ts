import type { Element, SafetyLevel, SafetyLevelInfo } from '@/types';

// Safety level information
export const safetyLevels: Record<SafetyLevel, SafetyLevelInfo> = {
  green: {
    color: '#22c55e',
    bgColor: 'bg-lick-safe',
    label: 'Sure, it\'s probably fine',
    description: 'These elements are generally safe to lick (though we still don\'t recommend it)',
    emoji: '🟩'
  },
  yellow: {
    color: '#eab308',
    bgColor: 'bg-lick-caution',
    label: 'Maybe not a good idea',
    description: 'These elements might cause some unpleasant effects',
    emoji: '🟨'
  },
  red: {
    color: '#ef4444',
    bgColor: 'bg-lick-danger',
    label: 'You really shouldn\'t',
    description: 'These elements are toxic and dangerous',
    emoji: '🟥'
  },
  purple: {
    color: '#a855f7',
    bgColor: 'bg-lick-deadly',
    label: 'Please reconsider',
    description: 'These elements are extremely dangerous and often radioactive',
    emoji: '🟪'
  }
};

// Fallback element data if Cosmic is not available
export const fallbackElements: Element[] = [
  {
    id: '1',
    slug: 'h',
    title: 'Hydrogen',
    type: 'elements',
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      symbol: 'H',
      atomic_number: 1,
      safety_level: 'green' as SafetyLevel,
      lick_description: 'It\'s just gas! Though it might make you burp in a very high-pitched voice.',
      element_group: 'Nonmetal',
      period: 1,
      group: 1,
      element_name: 'Hydrogen'
    }
  },
  {
    id: '2',
    slug: 'he',
    title: 'Helium',
    type: 'elements',
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      symbol: 'He',
      atomic_number: 2,
      safety_level: 'green' as SafetyLevel,
      lick_description: 'Totally inert! Though licking a gas is... challenging.',
      element_group: 'Noble Gas',
      period: 1,
      group: 18,
      element_name: 'Helium'
    }
  },
  {
    id: '3',
    slug: 'li',
    title: 'Lithium',
    type: 'elements',
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      symbol: 'Li',
      atomic_number: 3,
      safety_level: 'yellow' as SafetyLevel,
      lick_description: 'Might stabilize your mood, but also might burn your tongue. Not worth it.',
      element_group: 'Alkali Metal',
      period: 2,
      group: 1,
      element_name: 'Lithium'
    }
  },
  {
    id: '4',
    slug: 'be',
    title: 'Beryllium',
    type: 'elements',
    created_at: new Date().toISOString(),
    modified_at: new Date().toISOString(),
    metadata: {
      symbol: 'Be',
      atomic_number: 4,
      safety_level: 'red' as SafetyLevel,
      lick_description: 'Extremely toxic! Your tongue would be the least of your worries.',
      element_group: 'Alkaline Earth Metal',
      period: 2,
      group: 2,
      element_name: 'Beryllium'
    }
  },
  // Add more elements as needed for demonstration
];

// Helper function to get safety level info
export function getSafetyLevelInfo(level: SafetyLevel): SafetyLevelInfo {
  return safetyLevels[level];
}

// Helper function to get background color class
export function getSafetyColor(level: SafetyLevel): string {
  return safetyLevels[level].color;
}

// Helper function to calculate grid position
export function getElementGridPosition(
  period: number, 
  group: number, 
  atomicNumber?: number
): { gridColumn: number; gridRow: number } {
  // Special positioning for specific elements
  
  // Hydrogen (H) - atomic number 1
  if (atomicNumber === 1) {
    return { gridColumn: 1, gridRow: 1 };
  }
  
  // Helium (He) - atomic number 2
  if (atomicNumber === 2) {
    return { gridColumn: 18, gridRow: 1 };
  }
  
  // Elements in periods 2-3: standard positioning
  if (period === 2 || period === 3) {
    // Period 2: Li-Ne (atomic numbers 3-10)
    // Period 3: Na-Ar (atomic numbers 11-18)
    if (atomicNumber && atomicNumber >= 3 && atomicNumber <= 10) {
      // Period 2 elements
      const positions = [
        { gridColumn: 1, gridRow: 2 }, // Li
        { gridColumn: 2, gridRow: 2 }, // Be
        { gridColumn: 13, gridRow: 2 }, // B
        { gridColumn: 14, gridRow: 2 }, // C
        { gridColumn: 15, gridRow: 2 }, // N
        { gridColumn: 16, gridRow: 2 }, // O
        { gridColumn: 17, gridRow: 2 }, // F
        { gridColumn: 18, gridRow: 2 }, // Ne
      ];
      const index = atomicNumber - 3;
      return positions[index] || { gridColumn: group, gridRow: period };
    }
    
    if (atomicNumber && atomicNumber >= 11 && atomicNumber <= 18) {
      // Period 3 elements
      const positions = [
        { gridColumn: 1, gridRow: 3 }, // Na
        { gridColumn: 2, gridRow: 3 }, // Mg
        { gridColumn: 13, gridRow: 3 }, // Al
        { gridColumn: 14, gridRow: 3 }, // Si
        { gridColumn: 15, gridRow: 3 }, // P
        { gridColumn: 16, gridRow: 3 }, // S
        { gridColumn: 17, gridRow: 3 }, // Cl
        { gridColumn: 18, gridRow: 3 }, // Ar
      ];
      const index = atomicNumber - 11;
      return positions[index] || { gridColumn: group, gridRow: period };
    }
  }
  
  // Transition metals and other elements: use standard group positioning
  // But skip lanthanides and actinides (they get special treatment)
  if (atomicNumber && ((atomicNumber >= 57 && atomicNumber <= 71) || (atomicNumber >= 89 && atomicNumber <= 103))) {
    // These will be handled separately in the component
    return { gridColumn: 3, gridRow: period };
  }
  
  // Standard positioning for most elements
  return { gridColumn: group, gridRow: period };
}

// Get random element for the random button feature
export function getRandomElement(elements: Element[]): Element | null {
  if (!elements || elements.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * elements.length);
  const element = elements[randomIndex];
  return element || null;
}