import { useState, useMemo, useEffect } from 'react';
import { Product, SortConfig } from '../types';

export function useDashboardData() {
  const [data, setData] = useState<{ products: Product[] } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setData);
  }, []);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig?.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = null;
    }
    setSortConfig(direction ? { key, direction } : null);
  };

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    let items = data.products.filter(p => (
      (activeCategory === 'all' || p.category === activeCategory) &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      p.price <= maxPrice
    ));

    if (sortConfig) {
      items.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [data, searchQuery, activeCategory, maxPrice, sortConfig]);

  const stats = useMemo(() => ({
    total: filteredProducts.length,
    avgPrice: filteredProducts.length ? (filteredProducts.reduce((acc, p) => acc + p.price, 0) / filteredProducts.length).toFixed(2) : "0",
    lowStock: filteredProducts.filter(p => p.stock < 10).length
  }), [filteredProducts]);

  return {
    products: filteredProducts,
    categories: data ? ['all', ...Array.from(new Set(data.products.map(p => p.category)))] : [],
    stats,
    filters: { searchQuery, setSearchQuery, activeCategory, setActiveCategory, maxPrice, setMaxPrice },
    sorting: { sortConfig, requestSort },
    isLoading: !data
  };
}