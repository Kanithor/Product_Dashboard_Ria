import React from 'react';

export const InsightsCards = ({ stats, activeCategory }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      {/* Average Price Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all">
          <p className="text-sm font-medium text-slate-500 uppercase">
          {activeCategory === 'all' ? 'Avg. Catalog Price' : `Avg. ${activeCategory} Price`}
          </p>
          <p className="text-3xl font-bold text-blue-600 tracking-tight">
          ${stats.avgPrice}
          </p>
      </div>

      {/* Total Products Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-all">
          <p className="text-sm font-medium text-slate-500 uppercase">
          {activeCategory === 'all' ? 'Total Products' : `${activeCategory} Count`}
          </p>
          <p className="text-3xl font-bold text-slate-900">
          {stats.total} <span className="text-lg font-normal text-slate-400">Items</span>
          </p>
      </div>

      {/* Low Stock Card */}
      <div className={`p-6 rounded-xl shadow-sm border-l-4 transition-all ${
        stats.lowStock > 0 
        ? 'bg-red-50/70 border-l-red-500 border-y-slate-200 border-r-slate-200' 
        : 'bg-white border-l-green-500 border-y-slate-200 border-r-slate-200'
    }`}>
        <p className={`text-sm font-medium uppercase ${stats.lowStock > 0 ? 'text-red-600' : 'text-green-600'}`}>
        {activeCategory === 'all' ? 'Global Low Stock' : `${activeCategory} items with low stock`}
        </p>
        <p className={`text-3xl font-bold ${stats.lowStock > 0 ? 'text-red-700' : 'text-green-700'}`}>
        {stats.lowStock}
        </p>
        <p className="text-xs mt-1 text-slate-500">Items with &lt; 10 units</p>
    </div>
  </div>
);
