import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download, Eye, ArrowRight } from 'lucide-react';

const ProductsSection = () => {
  const products = [
    {
      title: "نظام إدارة علاقات العملاء",
      description: "حل متكامل لإدارة العملاء وتحسين المبيعات",
      image: "/lovable-uploads/0ae28439-a628-4b57-b4e1-2a51f507ea4a.png",
      price: "3200 ريال",
      rating: 4.7,
      downloads: "400+ تحميل",
      features: ["إدارة العملاء", "تتبع المبيعات", "تقارير شاملة", "أتمتة التسويق"],
      demoUrl: "https://demo.crm-system.com",
      category: "إدارة الأعمال",
      badge: "تجربة"
    },
    {
      title: "منصة إدارة المحتوى الذكية",
      description: "منصة متطورة لإدارة المحتوى مع ذكاء اصطناعي مدمج",
      image: "/lovable-uploads/0ae28439-a628-4b57-b4e1-2a51f507ea4a.png",
      price: "1800 ريال",
      rating: 4.8,
      downloads: "300+ تحميل",
      features: ["محرر متقدم", "نشر مجدول", "إدارة الوسائط", "تحسين SEO"],
      demoUrl: "https://demo.cms-platform.com",
      category: "إدارة المحتوى",
      badge: "مختبر"
    },
    {
      title: "نظام إدارة المشاريع المتقدم",
      description: "نظام شامل لإدارة المشاريع مع أدوات متقدمة للتخطيط والمتابعة",
      image: "/lovable-uploads/0ae28439-a628-4b57-b4e1-2a51f507ea4a.png",
      price: "2500 ريال",
      rating: 4.9,
      downloads: "500+ تحميل",
      features: ["تتبع المهام", "تقارير تفصيلية", "إدارة الفرق", "تكامل مع التقويم"],
      demoUrl: "https://demo.project-manager.com",
      category: "إدارة المشاريع",
      badge: "مختبر"
    },
    {
      title: "نظام إدارة المخزون الذكي",
      description: "حل متكامل لإدارة المخزون مع تتبع آلي للكميات",
      image: "/lovable-uploads/0ae28439-a628-4b57-b4e1-2a51f507ea4a.png",
      price: "2200 ريال",
      rating: 4.6,
      downloads: "250+ تحميل",
      features: ["تتبع المخزون", "تنبيهات نقص", "تقارير المبيعات", "إدارة الموردين"],
      demoUrl: "https://demo.inventory-system.com",
      category: "إدارة المخزون",
      badge: "تجربة"
    },
    {
      title: "منصة التجارة الإلكترونية",
      description: "منصة شاملة لإنشاء وإدارة المتاجر الإلكترونية",
      image: "/lovable-uploads/0ae28439-a628-4b57-b4e1-2a51f507ea4a.png",
      price: "4500 ريال",
      rating: 4.9,
      downloads: "600+ تحميل",
      features: ["واجهة تسوق", "نظام دفع آمن", "إدارة الطلبات", "تتبع الشحن"],
      demoUrl: "https://demo.ecommerce-platform.com",
      category: "التجارة الإلكترونية",
      badge: "مختبر"
    },
    {
      title: "نظام إدارة الموارد البشرية",
      description: "حل شامل لإدارة الموظفين والرواتب والحضور",
      image: "/lovable-uploads/0ae28439-a628-4b57-b4e1-2a51f507ea4a.png",
      price: "3800 ريال",
      rating: 4.5,
      downloads: "350+ تحميل",
      features: ["إدارة الموظفين", "نظام الحضور", "حساب الرواتب", "تقييم الأداء"],
      demoUrl: "https://demo.hr-system.com",
      category: "الموارد البشرية",
      badge: "تجربة"
    }
  ];

  const openDemo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="products" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-500 text-black">منتجاتنا وأنظمتنا</Badge>
          <h2 className="text-4xl font-bold mb-4 text-white">حلول جاهزة للاستخدام الفوري</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            مجموعة متميزة من الأنظمة والتطبيقات الجاهزة التي تم تطويرها بعناية لتلبية احتياجات السوق
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="modern-card group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className={`${product.badge === 'تجربة' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'}`}>
                    {product.badge}
                  </Badge>
                </div>
                <div className="text-center text-gray-400">
                  <div className="text-xs mb-2">Drop your images here or Browse</div>
                  {/* Product Icon/Logo */}
                  <div className="w-16 h-12 bg-red-600 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-xs">LOGO</span>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-bold text-white">{product.title}</CardTitle>
                </div>
                <p className="text-gray-300 text-sm">{product.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-yellow-500">{product.rating}</span>
                  </div>
                  <div className="text-gray-400">{product.downloads}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500 mb-4">{product.price}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black text-xs"
                    onClick={() => openDemo(product.demoUrl)}
                  >
                    تجربة
                  </Button>
                  <Button className="bg-white text-black hover:bg-gray-200 text-xs">
                    التفاصيل
                  </Button>
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
