import React, {useState} from 'react';
import ProductDetail from './ProductDetail';

export const ProductTable = ({ products, sorting, onProductClick }: any) => {
  const { sortConfig, requestSort } = sorting;
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const getIcon = (key: string) => {
    if (sortConfig?.key !== key) return '↕';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
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
            {products.map((product: any) => (
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
                 {products.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            No products found in this category.
          </div>
        )}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );


    {/* <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="p-4 cursor-pointer" onClick={() => requestSort('title')}>Product {getIcon('title')}</th>
            <th className="p-4">Category</th>
            <th className="p-4 text-right cursor-pointer" onClick={() => requestSort('price')}>Price {getIcon('price')}</th>
            <th className="p-4 text-right cursor-pointer" onClick={() => requestSort('stock')}>Stock {getIcon('stock')}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => onProductClick(p)}>
              <td className="p-4 flex items-center gap-3">
                <img src={p.thumbnail} className="w-10 h-10 rounded" alt="" />
                {p.title}
              </td>
              <td className="p-4 capitalize text-slate-500">{p.category}</td>
              <td className="p-4 text-right font-medium">${p.price}</td>
              <td className={`p-4 text-right font-bold ${p.stock < 10 ? 'text-red-500' : ''}`}>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ); */}
};