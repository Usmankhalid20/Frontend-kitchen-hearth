import React from 'react';
import DashboardCard from './DashboardCard';
// Since we don't want to install extra libraries unless needed, we will render a placeholder or a simple CSS chart.
// For a production app, we would use recharts or chart.js here.

const ChartCard = ({ title, data, type = 'bar', height = 300 }) => {
  return (
    <DashboardCard title={title}>
      <div 
        className="w-full flex items-end justify-between gap-2 pt-8" 
        style={{ height: `${height}px` }}
      >
        {data && data.length > 0 ? (
          data.map((item, index) => {
            // Calculate height percentage based on max value in data
            const maxVal = Math.max(...data.map(d => d.value));
            const heightPercent = maxVal === 0 ? 0 : (item.value / maxVal) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1 group">
                <div 
                  className="w-full bg-amber-200 hover:bg-amber-400 rounded-t-sm transition-all duration-300 relative"
                  style={{ height: `${Math.max(heightPercent, 2)}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                    {item.value} {item.label}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 truncate w-full text-center">
                  {item.label}
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No chart data available
          </div>
        )}
      </div>
    </DashboardCard>
  );
};

export default ChartCard;
