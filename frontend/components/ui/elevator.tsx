import React from 'react';

interface ElevatorProps {
  id: string;
  status: 'moving' | 'idle' | 'maintenance';
  phaseConsumption: {
    phase1: number;
    phase2: number;
    phase3: number;
  };
  totalConsumption: number;
}

export const Elevator = ({ id, status, phaseConsumption, totalConsumption }: ElevatorProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'moving':
        return 'bg-green-500';
      case 'maintenance':
        return 'bg-amber-500';
      default:
        return 'bg-slate-500';
    }
  };

  const currentConsumption = phaseConsumption.phase1 + phaseConsumption.phase2 + phaseConsumption.phase3;

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Elevator {id}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`} />
              <span className="text-xs capitalize text-slate-600 dark:text-slate-400">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Phase 1</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">{phaseConsumption.phase1.toFixed(2)} kW</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Phase 2</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">{phaseConsumption.phase2.toFixed(2)} kW</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">Phase 3</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">{phaseConsumption.phase3.toFixed(2)} kW</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-slate-500 dark:text-slate-400">Current Total:</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">{currentConsumption.toFixed(2)} kW</p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Usage:</p>
          <p className="text-sm font-medium text-slate-900 dark:text-white">{totalConsumption.toFixed(2)} kWh</p>
        </div>
      </div>
      
      <div className="mt-4 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ 
            width: `${(currentConsumption / totalConsumption) * 100}%`,
          }} 
        />
      </div>
    </div>
  );
};