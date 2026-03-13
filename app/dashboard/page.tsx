// app/dashboard/page.tsx
'use client';
import { useDashboardData } from './hooks/useDashboardData';
import { InsightsCards } from './components/InsightsCards';
import { FilterCard } from './components/FilterCard';
import { ProductTable } from './components/ProductTable';

export default function DashboardPage() {
  const { products, stats, filters, sorting, categories, isLoading } = useDashboardData();

  if (isLoading) return <div className="p-10">Loading...</div>;

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

      <InsightsCards stats={stats} activeCategory={filters.activeCategory} />
      <FilterCard filters={filters} categories={categories} />
      <ProductTable products={products} sorting={sorting} />
    </div>
  );
}