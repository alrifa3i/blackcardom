
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: any;
  onEdit: (product: any) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onEdit, 
  onDelete, 
  isDeleting 
}) => {
  const getCategoryLabel = (category: string) => {
    const categories = {
      'systems': 'أنظمة',
      'ecommerce': 'تجارة إلكترونية',
      'mobile': 'تطبيقات محمولة',
      'web': 'تطبيقات ويب',
      'desktop': 'تطبيقات سطح المكتب'
    };
    return categories[category as keyof typeof categories] || category;
  };

  const productFeatures = Array.isArray(product.features) ? product.features : [];

  return (
    <Card className="bg-gray-700 border-gray-600">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {product.image_url && (
            <div className="flex-shrink-0">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white font-semibold">{product.name}</h3>
              {product.is_featured && (
                <Badge className="bg-yellow-500 text-black text-xs">مميز</Badge>
              )}
              {!product.is_available && (
                <Badge variant="secondary" className="text-xs">غير متاح</Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {getCategoryLabel(product.category)}
              </Badge>
            </div>
            <p className="text-gray-300 text-sm mb-2">{product.description}</p>
            <div className="flex items-center gap-4 text-sm mb-2">
              <span className="text-yellow-500 font-semibold text-lg">
                ${product.price}
              </span>
            </div>
            {productFeatures.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {productFeatures.slice(0, 3).map((feature: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {productFeatures.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{productFeatures.length - 3} أخرى
                  </Badge>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {product.demo_url && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(product.demo_url, '_blank')}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(product)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(product.id)}
              disabled={isDeleting}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
