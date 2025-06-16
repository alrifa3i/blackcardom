
import React from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: any[];
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onEdit, 
  onDelete, 
  isDeleting 
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400">لا توجد منتجات حالياً</div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
};

export default ProductList;
