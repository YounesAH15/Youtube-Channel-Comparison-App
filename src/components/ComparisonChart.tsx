import React from 'react';
import type { ComparisonMetric } from '../types';

interface ComparisonChartProps {
  metrics: ComparisonMetric[];
}

export function ComparisonChart({ metrics }: ComparisonChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Channel Comparison</h2>
      <div className="space-y-6">
        {metrics.map((metric) => {
          const max = Math.max(metric.value1, metric.value2);
          const width1 = (metric.value1 / max) * 100;
          const width2 = (metric.value2 / max) * 100;

          return (
            <div key={metric.label} className="space-y-2">
              <div className="text-sm font-medium text-gray-700">
                {metric.label}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${width1}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Intl.NumberFormat().format(metric.value1)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${width2}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Intl.NumberFormat().format(metric.value2)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}