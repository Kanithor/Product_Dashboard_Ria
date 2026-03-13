// app/dashboard/components/ProductTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductTable } from './ProductTable';

const mockProducts = [
  { id: 1, title: 'Test Product', price: 100, category: 'test', stock: 5, thumbnail: '' }
];

const mockSorting = {
  sortConfig: null,
  requestSort: jest.fn(),
};

describe('ProductTable Component', () => {
  it('renders product rows correctly', () => {
    render(<ProductTable products={mockProducts} sorting={mockSorting} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('calls requestSort when a header is clicked', () => {
    render(<ProductTable products={mockProducts} sorting={mockSorting} />);
    
    const priceHeader = screen.getByText(/Price/i);
    fireEvent.click(priceHeader);

    expect(mockSorting.requestSort).toHaveBeenCalledWith('price');
  });
});