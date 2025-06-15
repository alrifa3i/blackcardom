
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download, ExternalLink, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import PayPalButton from './PayPalButton';

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    }
  });

  const visibleProducts = products?.filter(product => product.is_available) || [];
  const displayedProducts = showMore ? visibleProducts : visibleProducts.slice(0, 3);

  const handlePurchase = (product: any) => {
    setSelectedProduct(product);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (details: any) => {
    console.log('Payment successful:', details);
    setIsPaymentOpen(false);
    setSelectedProduct(null);
  };

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

  if (isLoading) {
    return (
      <section id="products" className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">منتجاتنا</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">حلول جاهزة للاستخدام</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              مجموعة من المنتجات التقنية المطورة خصيصاً لتلبية احتياجات الأعمال المختلفة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products" className="py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">منتجاتنا</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">حلول جاهزة للاستخدام</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              مجموعة من المنتجات التقنية المطورة خصيصاً لتلبية احتياجات الأعمال المختلفة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedProducts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-400 text-lg">لا توجد منتجات متاحة حالياً</p>
              </div>
            ) : (
              displayedProducts.map((product) => (
                <Card key={product.id} className="modern-card bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-lg group hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-full h-48 bg-gray-600 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={product.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-green-500 text-white">{getCategoryLabel(product.category)}</Badge>
                      {product.is_featured && (
                        <Badge className="bg-yellow-500 text-black">مميز</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-white mb-2">{product.name}</CardTitle>
                    <p className="text-gray-300 text-sm">{product.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {product.features && product.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.features.slice(0, 3).map((feature: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                            {feature}
                          </Badge>
                        ))}
                        {product.features.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                            +{product.features.length - 3} أخرى
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-600">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-yellow-500 text-black font-bold text-lg px-3 py-1">
                          ${product.price}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
                          onClick={() => handlePurchase(product)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          شراء الآن
                        </Button>
                        {product.demo_url && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-gray-600 text-white hover:bg-gray-700"
                            onClick={() => window.open(product.demo_url, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {visibleProducts.length > 3 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowMore(!showMore)}
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
              >
                {showMore ? (
                  <>
                    عرض أقل
                    <ChevronUp className="mr-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    استكشاف المزيد
                    <ChevronDown className="mr-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="max-w-md bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">الدفع - {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-300 mb-2">المبلغ المطلوب:</p>
              <p className="text-2xl font-bold text-yellow-500">${selectedProduct?.price}</p>
            </div>
            {selectedProduct && (
              <PayPalButton
                amount={selectedProduct.price}
                currency="USD"
                description={selectedProduct.name}
                onSuccess={handlePaymentSuccess}
                onError={(error) => console.error('Payment error:', error)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsSection;
