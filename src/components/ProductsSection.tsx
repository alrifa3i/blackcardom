
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download, Star, Users, Globe, ShoppingCart, Database, Smartphone, Monitor } from 'lucide-react';

const ProductsSection = () => {
  const products = [
    {
      icon: <Database className="h-8 w-8" />,
      title: "نظام إدارة المخزون الذكي",
      description: "نظام متطور لإدارة المخزون مع تتبع المنتجات والتنبيهات التلقائية",
      price: "2500 ريال",
      downloads: "1,200+",
      rating: 4.8,
      category: "إدارة أعمال",
      demoUrl: "https://inventory-demo.theblack-card.com",
      loginRequired: true
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "نظام إدارة الموارد البشرية",
      description: "حلول شاملة لإدارة الموظفين والرواتب والحضور والانصراف",
      price: "4000 ريال",
      downloads: "800+",
      rating: 4.9,
      category: "موارد بشرية",
      demoUrl: "https://hr-demo.theblack-card.com",
      loginRequired: true
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "منصة التجارة الإلكترونية",
      description: "متجر إلكتروني متكامل مع نظام دفع متعدد ولوحة تحكم شاملة",
      price: "6000 ريال",
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
      price: "3500 ريال",
      downloads: "1,800+",
      rating: 4.6,
      category: "إدارة محتوى",
      demoUrl: "https://cms-demo.theblack-card.com",
      loginRequired: true
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "نظام نقاط البيع السحابي",
      description: "حل متكامل لنقاط البيع مع إدارة المبيعات والمخزون والتقارير",
      price: "3000 ريال",
      downloads: "950+",
      rating: 4.8,
      category: "نقاط بيع",
      demoUrl: "https://pos-demo.theblack-card.com",
      loginRequired: true
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "تطبيق إدارة المشاريع",
      description: "تطبيق محمول لإدارة المشاريع مع تتبع المهام والفرق",
      price: "2800 ريال",
      downloads: "1,500+",
      rating: 4.5,
      category: "إنتاجية",
      demoUrl: "https://projects-demo.theblack-card.com",
      loginRequired: true
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "نظام إدارة علاقات العملاء",
      description: "منصة CRM شاملة لإدارة العملاء والمبيعات والتسويق",
      price: "4500 ريال",
      downloads: "1,100+",
      rating: 4.9,
      category: "علاقات عملاء",
      demoUrl: "https://crm-demo.theblack-card.com",
      loginRequired: true
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "منصة التعلم الإلكتروني",
      description: "نظام تعليمي متطور مع دورات تفاعلية واختبارات ذكية",
      price: "5500 ريال",
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
      price: "3200 ريال",
      downloads: "750+",
      rating: 4.7,
      category: "خدمات",
      demoUrl: "https://booking-demo.theblack-card.com",
      loginRequired: true
    }
  ];

  const openDemo = (url: string, loginRequired: boolean) => {
    if (loginRequired) {
      // في المستقبل يمكن إضافة نافذة لإدخال بيانات الدخول
      alert('يتطلب بيانات دخول - سيتم التواصل معك لتوفير حساب تجريبي');
    }
    window.open(url, '_blank');
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
                <div className="text-center text-gray-300">
                  <div className="text-xs mb-2">Drop your images here or Browse</div>
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
                    <div className="text-2xl font-bold text-yellow-500 mb-2">{product.price}</div>
                    {product.loginRequired && (
                      <p className="text-xs text-gray-400">يتطلب حساب للمعاينة</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-all"
                      onClick={() => openDemo(product.demoUrl, product.loginRequired)}
                    >
                      عرض المعاينة
                    </Button>
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                      طلب الشراء
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
