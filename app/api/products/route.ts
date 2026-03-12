// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();
    const allProducts = data.products;

    // --- AGGREGATION LOGIC (The "Insight" part) ---
    
    // 1. Calculate Average Price
    const avgPrice = allProducts.reduce((acc: number, p: any) => acc + p.price, 0) / allProducts.length;

    // 2. Identify Low Stock (Actionable for stakeholders)
    const lowStockItems = allProducts.filter((p: any) => p.stock < 10);

    // 3. Group by Category for a Chart
    const categoryCounts = allProducts.reduce((acc: any, p: any) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});

    // Return a custom object designed specifically for your dashboard
    return NextResponse.json({
      products: allProducts,
      insights: {
        averagePrice: avgPrice.toFixed(2),
        lowStockCount: lowStockItems.length,
        totalProducts: allProducts.length,
        categoryDistribution: Object.entries(categoryCounts).map(([name, value]) => ({ name, value }))
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}