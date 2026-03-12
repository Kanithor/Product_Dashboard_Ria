'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProductDetail from './ProductDetail';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(20000); // Default high enough to show most items
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    
    // 1. First, Filter
    const items = data.products.filter((p: any) => {
        const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchesName = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = p.price <= maxPrice;
        return matchesCategory && matchesName && matchesPrice;
    });

    // 2. Then, Sort
    if (sortConfig !== null) {
        items.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
        });
    }
    
    return items;
    }, [data, activeCategory, searchQuery, maxPrice, sortConfig]);

    // Helper function to trigger sort
    const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';

    // If we are already sorting by this key...
    if (sortConfig && sortConfig.key === key) {
        if (sortConfig.direction === 'asc') {
        direction = 'desc'; // Step 2: Asc -> Desc
        } else if (sortConfig.direction === 'desc') {
        direction = null;   // Step 3: Desc -> Unsorted
        }
    }

    // If direction is null, we clear the config, otherwise we set the new direction
    if (direction === null) {
        setSortConfig(null);
    } else {
        setSortConfig({ key, direction });
    }
    };

  // Calculate all KPIs dynamically based on the filtered list
  const stats = useMemo(() => {
    const count = filteredProducts.length;
  
    if (count === 0) {
      return { avgPrice: "0.00", total: 0, lowStock: 0 };
    }

    const totalPrice = filteredProducts.reduce((acc: number, p: any) => acc + p.price, 0);
    const lowStockCount = filteredProducts.filter((p: any) => p.stock < 10).length;

    return {
      avgPrice: (totalPrice / count).toFixed(2),
      total: count,
      lowStock: lowStockCount
    };
  }, [filteredProducts]);

  // Extract unique categories for the filter buttons
  const categories = useMemo(() => {
    if (!data) return [];
    return ['all', ...new Set(data.products.map((p: any) => p.category))];
  }, [data]);

  if (!data) return <div className="p-10 text-slate-500 animate-pulse">Loading Intelligence...</div>;

  return (
    <div className="p-10 bg-grey-950 min-h-screen font-sans">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white-900">Ria Money Transfer Technical Test</h1>
          <p className="text-slate-500">Internal Catalog Dashboard for Stakeholders</p>
        </div>
        <div className="text-right text-xs text-slate-400 font-mono">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </header>

      {/* --- DYNAMIC INSIGHTS CARDS --- */}
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

    {/* --- ADVANCED FILTER CARD --- */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Search Input */}
            <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-800 uppercase">Search Products</label>
            <input 
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 text-slate-800 border border-slate-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            </div>

            {/* Price Range Slider */}
            <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase">Max Price: ${maxPrice}</label>
            </div>
            <input 
                type="range"
                min="0"
                max="20000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            </div>
        </div>

        {/* Category Filter (Moved inside for a clean layout) */}
        <div className="pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-500 uppercase block mb-3">Categories</label>
            <div className="flex flex-wrap gap-2">
            {categories.map((cat: any) => (
                <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${
                    activeCategory === cat 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>
    </div>

    {filteredProducts.length === 0 && (
        <div className="p-20 text-center">
            <p className="text-slate-400 mb-4">No products match your current filters.</p>
            <button 
            onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setMaxPrice(20000);
            }}
            className="text-blue-600 font-semibold hover:underline"
            >
            Reset all filters
            </button>
        </div>
    )}

      {/* --- TABLE --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
                <th 
                className="p-4 font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-all select-none"
                onClick={() => requestSort('title')}
                >
                <div className="flex items-center gap-1">
                    Product 
                    <span className="text-slate-300 w-4">
                    {sortConfig?.key === 'title' 
                        ? (sortConfig.direction === 'asc' ? '↑' : '↓') 
                        : '↕'}
                    </span>
                </div>
                </th>

                <th className="p-4 font-semibold text-slate-700">Category</th>

                <th 
                className="p-4 font-semibold text-slate-700 text-right cursor-pointer hover:bg-slate-100 transition-all select-none"
                onClick={() => requestSort('price')}
                >
                <div className="flex items-center justify-end gap-1">
                    Price 
                    <span className="text-slate-300 w-4">
                    {sortConfig?.key === 'price' 
                        ? (sortConfig.direction === 'asc' ? '↑' : '↓') 
                        : '↕'}
                    </span>
                </div>
                </th>

                <th 
                className="p-4 font-semibold text-slate-700 text-right cursor-pointer hover:bg-slate-100 transition-all select-none"
                onClick={() => requestSort('stock')}
                >
                <div className="flex items-center justify-end gap-1">
                    Stock 
                    <span className="text-slate-300 w-4">
                    {sortConfig?.key === 'stock' 
                        ? (sortConfig.direction === 'asc' ? '↑' : '↓') 
                        : '↕'}
                    </span>
                </div>
                </th>

                <th 
                className="p-4 font-semibold text-slate-700 text-right cursor-pointer hover:bg-slate-100 transition-all select-none"
                onClick={() => requestSort('rating')}
                >
                <div className="flex items-center justify-end gap-1">
                    Rating 
                    <span className="text-slate-300 w-4">
                    {sortConfig?.key === 'rating' 
                        ? (sortConfig.direction === 'asc' ? '↑' : '↓') 
                        : '↕'}
                    </span>
                </div>
                </th>
            </tr>
            </thead>
          <tbody>
            {filteredProducts.map((product: any) => (
              <tr 
                key={product.id} 
                onClick={() => setSelectedProduct(product)}
                className="border-b border-slate-50 hover:bg-blue-50/40 cursor-pointer transition-colors group"
              >
                <td className="p-4 flex items-center gap-4">
                  <img src={product.thumbnail} className="w-10 h-10 rounded object-cover shadow-sm bg-slate-100" alt="" />
                  <span className="font-medium group-hover:text-blue-600 text-slate-600 transition-colors">{product.title}</span>
                </td>
                <td className="p-4 text-slate-500 capitalize">{product.category}</td>
                <td className="p-4 text-right font-medium text-slate-900">${product.price}</td>
                <td className={`p-4 text-right font-bold ${product.stock < 10 ? 'text-red-500' : 'text-slate-400'}`}>
                  {product.stock}
                </td>
                <td className="p-4 text-right text-slate-500 capitalize">{product.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredProducts.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            No products found in this category.
          </div>
        )}
      </div>

      {/* --- DETAIL DRAWER --- */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}