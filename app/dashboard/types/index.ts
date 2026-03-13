export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
  brand: string;
}

export interface DashboardStats {
  avg: string;
  total: number;
  lowStock: number;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc' | null;
}