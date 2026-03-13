'use client';

import React from 'react';

export default function ProductDetail({ product, onClose }: { product: any, onClose: () => void }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
        <button 
          onClick={onClose}
          className="mb-6 text-slate-400 hover:text-slate-900 transition-colors"
        >
          ← Close Details [X]
        </button>

        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full aspect-square object-cover rounded-xl mb-6 bg-slate-100" 
        />

        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{product.category}</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-1">{product.title}</h2>
            <p className="text-2xl font-semibold text-slate-900 mt-2">${product.price}</p>
          </div>

          <div className="flex gap-4 border-y border-slate-100 py-4">
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-500 uppercase">Rating</p>
              <p className="font-bold text-slate-900">{product.rating} / 5</p>
            </div>
            <div className="flex-1 text-center border-x border-slate-100">
              <p className="text-xs text-slate-500 uppercase">Stock</p>
              <p className={`font-bold ${product.stock < 10 ? 'text-red-600' : 'text-slate-900'}`}>{product.stock}</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-slate-500 uppercase">Brand</p>
              <p className="font-bold text-slate-900">{product.brand || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}