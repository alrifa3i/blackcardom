import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, Download, Star, Users, Globe, ShoppingCart, Database, Smartphone, Monitor, CreditCard, Eye, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showDemoDialog, setShowDemoDialog] = useState(false);
  const [demoCredentials, setDemoCredentials] = useState({ username: '', password: '' });

  const products = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "نظام إدارة المخزون الذكي",
      description: "نظام متطور لإدارة المخزون مع تتبع المنتجات والتنبيهات التلقائية",
      price: "120 ريال عُماني",
      originalPrice: "160 ريال عُماني",
      downloads: "1,200+",
      rating: 4.8,
      category: "إدارة أعمال",
      demoUrl: "https://inventory-demo.theblack-card.com",
      loginRequired: true,
      demoCredentials: { username: "demo", password: "demo123" }
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "نظام إدارة الموارد البشرية",
      description: "حلول شاملة لإدارة الموظفين والرواتب والحضور والانصراف",
      price: "200 ريال عُماني",
      originalPrice: "250 ريال عُماني",
      downloads: "800+",
      rating: 4.9,
      category: "موارد بشرية",
      demoUrl: "https://hr-demo.theblack-card.com",
      loginRequired: true,
      demoCredentials: { username: "admin", password: "hr2024" }
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "منصة التجارة الإلكترونية",
      description: "متجر إلكتروني متكامل مع نظام دفع متطور ولوحة تحكم شاملة",
      price: "280 ريال عُماني",
      originalPrice: "350 ريال عُماني",
      downloads: "2,500+",
      rating: 4.7,
      category: "تجارة إلكترونية",
      demoUrl: "https://ecommerce-demo.theblack-card.com",
      loginRequired: false
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "نظام إدارة المحتوى التفاعلي",
      description: "منصة لإدارة المحتوى مع إمكانيات متقدمة للنشر والتفاعل",
      price: "160 ريال عُماني",
      originalPrice: "200 ريال عُماني",
      downloads: "1,800+",
      rating: 4.6,
      category: "إدارة محتوى",
      demoUrl: "https://cms-demo.theblack-card.com",
      loginRequired: true,
      demoCredentials: { username: "editor", password: "cms2024" }
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "نظام نقاط البيع السحابي",
      description: "حل متكامل لنقاط البيع مع إدارة المبيعات والمخزون والتقارير",
      price: "140 ريال عُماني",
      originalPrice: "180 ريال عُماني",
      downloads: "950+",
      rating: 4.8,
      category: "نقاط بيع",
      demoUrl: "https://pos-demo.theblack-card.com",
      loginRequired: true,
      demoCredentials: { username: "cashier", password: "pos123" }
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "تطبيق إدارة المشاريع",
      description: "تطبيق محمول لإدارة المشاريع مع تتبع المهام والفرق",
      price: "130 ريال عُماني",
      originalPrice: "170 ريال عُماني",
      downloads: "1,500+",
      rating: 4.5,
      category: "إنتاجية",
      demoUrl: "https://projects-demo.theblack-card.com",
      loginRequired: true,
      demoCredentials: { username: "manager", password: "project2024" }
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "نظام إدارة علاقات العملاء",
      description: "منصة CRM شاملة لإدارة العملاء والمبيعات والتسويق",
      price: "220 ريال عُماني",
      originalPrice: "280 ريال عُماني",
      downloads: "1,100+",
      rating: 4.9,
      category: "علاقات عملاء",
      demoUrl: "https://crm-demo.theblack-card.com",
      loginRequired: true,
      demoCredentials: { username: "sales", password: "crm2024" }
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "منصة التعلم الإلكتروني",
      description: "نظام تعليمي متطور مع دورات تفاعلية واختبارات ذكية",
      price: "260 ريال عُماني",
      originalPrice: "320 ريال عُماني",
      downloads: "2,200+",
      rating: 4.8,
      category: "تعليم",
      demoUrl: "https://learning-demo.theblack-card.com",
      loginRequired: false
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "نظام إدارة الحجوزات",
      description: "حل متكامل للحجوزات والمواعيد مع تنبيهات تلقائية",
      price: "150 ريال عُماني",
      originalPrice: "190 ريال عُماني",
      downloads: "750+",
      rating: 4.7,
      category: "خدمات",
      demoUrl: "https://booking-demo.theblack-card.com",
      loginRequired: true,
      demoCredentials: { username: "booking", password: "reserve2024" }
    }
  ];

  const openDemo = (product: any) => {
    if (product.loginRequired) {
      setSelectedProduct(product);
      setShowDemoDialog(true);
    } else {
      window.open(product.demoUrl, '_blank');
    }
  };

  const handleDemoLogin = () => {
    if (selectedProduct?.demoCredentials) {
      setDemoCredentials(selectedProduct.demoCredentials);
      toast({
        title: "تم تطبيق بيانات التجربة",
        description: `اسم المستخدم: ${selectedProduct.demoCredentials.username} | كلمة المرور: ${selectedProduct.demoCredentials.password}`
      });
    }
    window.open(selectedProduct?.demoUrl, '_blank');
    setShowDemoDialog(false);
  };

  const handlePurchase = (product: any) => {
    setSelectedProduct(product);
    setShowPaymentDialog(true);
  };

  const processPayPalPayment = () => {
    // PayPal integration logic would go here
    const paypalConfig = {
      clientId: "AbbCtePdaGiT_0SyfFgLjcJxR75XjaoF5ODOPMbYb-du_QDalqRkIVuj85laQmc0ceYnkjwYoAtN4xwP",
      amount: selectedProduct?.price.replace(/[^\d]/g, ''), // Extract numeric value
      currency: "OMR",
      description: selectedProduct?.title
    };

    // Simulate PayPal checkout
    toast({
      title: "جاري تحويلك إلى PayPal",
      description: `سيتم فتح نافذة PayPal لإتمام عملية الشراء بقيمة ${selectedProduct?.price}`
    });

    // In a real implementation, you would integrate with PayPal SDK
    setTimeout(() => {
      setShowPaymentDialog(false);
      toast({
        title: "تم إتمام عملية الشراء بنجاح!",
        description: "سيتم إرسال رابط التحميل وبيانات الدخول إلى بريدك الإلكتروني خلال 5 دقائق"
      });
    }, 2000);
  };

  return (
    <section id="products" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-500 text-black">حلول جاهزة</Badge>
          <h2 className="text-4xl font-bold mb-4 text-white">منتجات وأنظمة متطورة</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            اكتشف مجموعتنا المتميزة من الأنظمة والتطبيقات الجاهزة التي تلبي احتياجات مختلف القطاعات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="modern-card group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-gray-800 to-gray-700">
              {/* Product Preview Area */}
              <div className="relative h-48 bg-gradient-to-br from-gray-600 to-gray-500 flex items-center justify-center">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white text-xs">
                    {product.category}
                  </Badge>
                </div>
                {product.originalPrice && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white text-xs">
                      عرض خاص
                    </Badge>
                  </div>
                )}
                <div className="text-center text-gray-300">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-yellow-400 transition-all duration-300">
                    {product.icon}
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-white text-center">{product.title}</CardTitle>
                <p className="text-gray-300 text-center text-sm">{product.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-300">{product.downloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-gray-300">{product.rating}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-600 pt-4">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-2">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-yellow-500">{product.price}</span>
                    </div>
                    {product.loginRequired && (
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-1">
                        <Lock className="h-3 w-3" />
                        <span>يتطلب تسجيل دخول للمعاينة</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-blue-600 text-white hover:bg-blue-500 transition-all"
                      onClick={() => openDemo(product)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      تجربة العمل
                    </Button>
                    <Button 
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-all"
                      onClick={() => handlePurchase(product)}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      شراء الآن
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Login Dialog */}
        <Dialog open={showDemoDialog} onOpenChange={setShowDemoDialog}>
          <DialogContent className="bg-gray-900 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>تجربة العمل - {selectedProduct?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-300">للوصول إلى النسخة التجريبية، ستحتاج إلى بيانات تسجيل الدخول:</p>
              <div className="space-y-2">
                <div>
                  <Label htmlFor="demo-username">اسم المستخدم</Label>
                  <Input
                    id="demo-username"
                    value={selectedProduct?.demoCredentials?.username || ''}
                    readOnly
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="demo-password">كلمة المرور</Label>
                  <Input
                    id="demo-password"
                    value={selectedProduct?.demoCredentials?.password || ''}
                    readOnly
                    className="bg-gray-800 border-gray-600"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleDemoLogin} className="bg-yellow-500 text-black hover:bg-yellow-400">
                  فتح النسخة التجريبية
                </Button>
                <Button variant="outline" onClick={() => setShowDemoDialog(false)} className="border-gray-600">
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="bg-gray-900 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>إتمام عملية الشراء</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{selectedProduct?.title}</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {selectedProduct?.originalPrice && (
                    <span className="text-gray-400 line-through">{selectedProduct.originalPrice}</span>
                  )}
                  <span className="text-2xl font-bold text-yellow-500">{selectedProduct?.price}</span>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">ما ستحصل عليه:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• رابط تحميل النظام كاملاً</li>
                  <li>• دليل التشغيل والتثبيت</li>
                  <li>• بيانات دخول لوحة التحكم</li>
                  <li>• دعم فني لمدة 30 يوم</li>
                  <li>• تحديثات مجانية لمدة 6 أشهر</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={processPayPalPayment} 
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-500"
                >
                  الدفع عبر PayPal
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowPaymentDialog(false)}
                  className="border-gray-600"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
            عرض جميع المنتجات
            <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
