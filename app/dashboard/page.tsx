'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ProductDetail from './ProductDetail';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  // Use useMemo to filter products efficiently when activeCategory changes
  const filteredProducts = useMemo(() => {
    if (!data) return [];
    if (activeCategory === 'all') return data.products;
    return data.products.filter((p: any) => p.category === activeCategory);
  }, [data, activeCategory]);

  // 1. Calculate the dynamic average based on what is currently filtered
  const dynamicAvgPrice = useMemo(() => {
    if (filteredProducts.length === 0) return "0.00";
    const total = filteredProducts.reduce((acc: number, p: any) => acc + p.price, 0);
    return (total / filteredProducts.length).toFixed(2);
  }, [filteredProducts]);

  // 2. You can also calculate a dynamic total for that category
  const dynamicTotal = filteredProducts.length;

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
          <h1 className="text-3xl font-bold text-white-900">Product Insights</h1>
          <p className="text-slate-500">Internal Catalog Dashboard</p>
        </div>
        <div className="text-right text-xs text-slate-400 font-mono">
          Last Updated: {new Date().toLocaleDateString()}
        </div>
      </header>

      {/* --- INSIGHTS CARDS (Summary) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500 uppercase">
            {activeCategory === 'all' ? 'Avg. Catalog Price' : `Avg. ${activeCategory} Price`}
            </p>
            <p className="text-3xl font-bold text-blue-600 tracking-tight transition-all">
            ${dynamicAvgPrice}
            </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-black uppercase">Total Items</p>
          <p className="text-3xl text-black font-bold">{data.insights.totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-red-500 bg-red-50/20">
          <p className="text-sm font-medium text-red-600 uppercase">Low Stock Alerts</p>
          <p className="text-3xl font-bold text-red-700">{data.insights.lowStockCount}</p>
        </div>
      </div>

      {/* --- FILTER CARD --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">Filter by Category:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-slate-700">Product</th>
              <th className="p-4 font-semibold text-slate-700">Category</th>
              <th className="p-4 font-semibold text-slate-700 text-right">Price</th>
              <th className="p-4 font-semibold text-slate-700 text-right">Stock</th>
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