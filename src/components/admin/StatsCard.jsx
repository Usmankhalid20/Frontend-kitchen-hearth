import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = "amber" }) => {
  const isPositive = trend === 'up';
  const isNeutral = trend === 'neutral';
  const isNegative = trend === 'down';

  const colorClasses = {
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    gray: "bg-gray-50 text-gray-600"
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.gray}`}>
          <Icon className="w-6 h-6" />
        </div>
        
        {trend && (
          <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'}`}>
            {isPositive && <ArrowUpRight className="w-4 h-4 mr-1" />}
            {isNegative && <ArrowDownRight className="w-4 h-4 mr-1" />}
            {isNeutral && <Minus className="w-4 h-4 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <h4 className="text-gray-500 text-sm font-medium">{title}</h4>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
