
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ExternalLink, ShoppingCart, Star, Package } from 'lucide-react';
import ServiceRequestForm from './ServiceRequestForm';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const ProductsSection = () => {
  const [showServiceForm, setShowServiceForm] = useState(false);

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
      <section id="products" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">منتجاتنا</Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">منتجاتنا المتميزة</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section id="products" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">منتجاتنا</Badge>
            <h2 className="text-4xl font-bold mb-4 text-white">منتجاتنا المتميزة</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              استكشف مجموعة من المنتجات والحلول التقنية المطورة خصيصاً لتلبية احتياجاتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => {
              const productFeatures = Array.isArray(product.features) ? product.features : [];
              
              return (
                <Card key={product.id} className="modern-card border-0 shadow-xl bg-gradient-to-br from-gray-800 to-gray-700 hover:shadow-2xl transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.is_featured && (
                      <Badge className="absolute top-4 right-4 bg-yellow-500 text-black flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        مميز
                      </Badge>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-black/50 text-white border-gray-600">
                        {getCategoryLabel(product.category)}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-yellow-500 text-xl group-hover:text-yellow-400 transition-colors">
                      {product.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {product.description}
                    </p>

                    {productFeatures.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-2">المميزات الرئيسية:</h4>
                        <div className="flex flex-wrap gap-2">
                          {productFeatures.slice(0, 3).map((feature: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs border-yellow-500 text-yellow-500">
                              {feature}
                            </Badge>
                          ))}
                          {productFeatures.length > 3 && (
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                              +{productFeatures.length - 3} أخرى
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-2xl font-bold text-yellow-500">
                        ${product.price}
                      </div>
                      <div className="flex gap-2">
                        {product.demo_url && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-white hover:bg-gray-700"
                            onClick={() => window.open(product.demo_url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            عرض
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="bg-yellow-500 text-black hover:bg-yellow-400"
                          onClick={() => setShowServiceForm(true)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          طلب
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {products && products.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">لا توجد منتجات متاحة حالياً</h3>
              <p className="text-gray-500">تابعنا للحصول على آخر المنتجات والتحديثات</p>
            </div>
          )}

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 border border-yellow-500/20 rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                تحتاج منتج مخصص؟
              </h3>
              <p className="text-gray-300 mb-6">
                نقوم بتطوير حلول مخصصة تماماً لاحتياجاتك التقنية. تواصل معنا للحصول على استشارة مجانية
              </p>
              <Button 
                size="lg" 
                className="bg-yellow-500 text-black hover:bg-yellow-400"
                onClick={() => setShowServiceForm(true)}
              >
                طلب منتج مخصص
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceRequestForm 
        isOpen={showServiceForm} 
        onClose={() => setShowServiceForm(false)} 
      />
    </>
  );
};

export default ProductsSection;
