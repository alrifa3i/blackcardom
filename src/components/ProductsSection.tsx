
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download, ExternalLink, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PayPalButton from './PayPalButton';

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const products = [
    {
      id: 1,
      title: "نظام إدارة المخزون الذكي",
      description: "نظام متطور لإدارة المخزون مع تتبع المنتجات والتنبيهات التلقائية",
      price: "400",
      originalPrice: "400 ريال عُماني",
      downloads: "1,200+",
      rating: 4.8,
      category: "إدارة أعمال",
      demoUrl: "https://inventory-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      features: ["تتبع المخزون", "تقارير مفصلة", "تنبيهات ذكية", "إدارة الموردين"],
      isVisible: true
    },
    {
      id: 2,
      title: "نظام إدارة علاقات العملاء",
      description: "نظام CRM شامل لإدارة العملاء والمبيعات والتسويق",
      price: "350",
      originalPrice: "350 ريال عُماني",
      downloads: "890+",
      rating: 4.7,
      category: "إدارة أعمال",
      demoUrl: "https://crm-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
      features: ["إدارة العملاء", "تتبع المبيعات", "حملات تسويقية", "تقارير شاملة"],
      isVisible: true
    },
    {
      id: 3,
      title: "نظام نقاط البيع الذكي",
      description: "نظام POS متطور للمتاجر والمطاعم مع إدارة شاملة",
      price: "300",
      originalPrice: "300 ريال عُماني",
      downloads: "2,100+",
      rating: 4.9,
      category: "تجارة إلكترونية",
      demoUrl: "https://pos-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&q=80",
      features: ["معالجة سريعة", "إدارة المخزون", "تقارير مبيعات", "دعم متعدد الفروع"],
      isVisible: true
    },
    {
      id: 4,
      title: "منصة إدارة المشاريع",
      description: "أداة شاملة لإدارة المشاريع والفرق والمهام",
      price: "450",
      originalPrice: "450 ريال عُماني",
      downloads: "650+",
      rating: 4.6,
      category: "إدارة أعمال",
      demoUrl: "https://project-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
      features: ["تتبع المشاريع", "إدارة الفرق", "تقارير التقدم", "تعاون سحابي"],
      isVisible: true
    },
    {
      id: 5,
      title: "نظام إدارة الموارد البشرية",
      description: "حل متكامل لإدارة الموظفين والرواتب والحضور",
      price: "380",
      originalPrice: "380 ريال عُماني",
      downloads: "750+",
      rating: 4.5,
      category: "موارد بشرية",
      demoUrl: "https://hr-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
      features: ["إدارة الموظفين", "حساب الرواتب", "تتبع الحضور", "تقييم الأداء"],
      isVisible: true
    },
    {
      id: 6,
      title: "نظام إدارة العقارات",
      description: "منصة شاملة لإدارة العقارات والإيجارات والصيانة",
      price: "500",
      originalPrice: "500 ريال عُماني",
      downloads: "420+",
      rating: 4.8,
      category: "إدارة أعمال",
      demoUrl: "https://property-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80",
      features: ["إدارة العقارات", "تتبع الإيجارات", "طلبات الصيانة", "تقارير مالية"],
      isVisible: true
    },
    {
      id: 7,
      title: "نظام إدارة المدارس",
      description: "نظام تعليمي شامل للمدارس والمعاهد التعليمية",
      price: "600",
      originalPrice: "600 ريال عُماني",
      downloads: "320+",
      rating: 4.7,
      category: "تعليم",
      demoUrl: "https://school-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
      features: ["إدارة الطلاب", "جدولة الحصص", "تتبع الدرجات", "تواصل مع الأهل"],
      isVisible: true
    },
    {
      id: 8,
      title: "نظام إدارة المستشفيات",
      description: "حل متطور لإدارة المستشفيات والعيادات الطبية",
      price: "800",
      originalPrice: "800 ريال عُماني",
      downloads: "180+",
      rating: 4.9,
      category: "صحة",
      demoUrl: "https://hospital-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
      features: ["إدارة المرضى", "مواعيد الأطباء", "السجلات الطبية", "إدارة الأدوية"],
      isVisible: true
    },
    {
      id: 9,
      title: "نظام إدارة المطاعم المتطور",
      description: "نظام شامل لإدارة المطاعم والطلبات والتوصيل",
      price: "450",
      originalPrice: "450 ريال عُماني",
      downloads: "980+",
      rating: 4.6,
      category: "مطاعم",
      demoUrl: "https://restaurant-demo.theblack-card.com",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=80",
      features: ["إدارة القوائم", "معالجة الطلبات", "نظام التوصيل", "تقارير المبيعات"],
      isVisible: true
    }
  ];

  const visibleProducts = products.filter(product => product.isVisible);
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
            {displayedProducts.map((product) => (
              <Card key={product.id} className="modern-card bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-lg group hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="w-full h-48 bg-gray-600 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-500 text-white">{product.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-yellow-500 font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">{product.title}</CardTitle>
                  <p className="text-gray-300 text-sm">{product.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {product.downloads}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500 text-black font-bold text-lg px-3 py-1">
                        {product.originalPrice}
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-600 text-white hover:bg-gray-700"
                        onClick={() => window.open(product.demoUrl, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            <DialogTitle className="text-white">الدفع - {selectedProduct?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-300 mb-2">المبلغ المطلوب:</p>
              <p className="text-2xl font-bold text-yellow-500">{selectedProduct?.originalPrice}</p>
            </div>
            {selectedProduct && (
              <PayPalButton
                amount={selectedProduct.price}
                currency="USD"
                description={selectedProduct.title}
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
