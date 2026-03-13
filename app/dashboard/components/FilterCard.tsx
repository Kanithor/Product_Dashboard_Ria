import React from 'react';

export const FilterCard = ({ filters, categories }: any) => {
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory, maxPrice, setMaxPrice } = filters;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Search</label>
          <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="px-4 py-2 border text-slate-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Max Price: ${maxPrice}</label>
          <input 
            type="range" min="0" max="20000" step="1" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
      <div className="pt-4 border-t">
        <div className="flex flex-wrap gap-2">
        <label className="text-xs font-bold text-slate-500 uppercase">Filter by Category</label><br />
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-md text-xs font-semibold capitalize ${
                activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};