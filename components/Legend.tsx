import type { LegendProps } from '@/types';
import { safetyLevels } from '@/lib/elements-data';

export default function Legend({ className = '' }: LegendProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 ${className}`}>
      <h3 className="text-lg font-bold mb-4 text-center">Lickability Legend</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(safetyLevels).map(([level, info]) => (
          <div key={level} className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded border-2 border-white shadow-sm flex-shrink-0"
              style={{ backgroundColor: info.color }}
            />
            <div>
              <div className="font-medium text-sm">
                {info.emoji} {info.label}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {info.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          <strong>Disclaimer:</strong> Please don't actually lick any elements. This is for educational and entertainment purposes only!
        </p>
      </div>
    </div>
  );
}