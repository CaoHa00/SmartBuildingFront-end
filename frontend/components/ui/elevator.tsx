import React from 'react';

interface ElevatorProps {
  id: string;
  status: 'moving' | 'idle' | 'maintenance';
  electricityConsumption: number;
}

export const Elevator = ({ id, status, electricityConsumption }: ElevatorProps) => {
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
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {electricityConsumption} kWh
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Current Usage
          </p>
        </div>
      </div>
      
      <div className="mt-4 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ 
            width: `${(electricityConsumption / 5) * 100}%`,
          }} 
        />
      </div>
    </div>
  );
};