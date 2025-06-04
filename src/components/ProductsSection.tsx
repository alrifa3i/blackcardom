
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Download, Eye, ArrowRight } from 'lucide-react';

const ProductsSection = () => {
  const products = [
    {
      title: "نظام إدارة المشاريع الذكي",
      description: "نظام متكامل لإدارة المشاريع مع تتبع المهام والتقارير التفصيلية",
      image: "/placeholder.svg",
      price: "5000 ريال",
      rating: 4.9,
      downloads: "2.5K",
      features: ["تتبع المهام", "تقارير تفصيلية", "إدارة الفرق", "تكامل مع التقويم"],
      demoUrl: "https://demo.project-manager.com",
      category: "إدارة المشاريع"
    },
    {
      title: "منصة التجارة الإلكترونية",
      description: "حل شامل للتجارة الإلكترونية مع نظام دفع متقدم وإدارة المخزون",
      image: "/placeholder.svg",
      price: "7500 ريال",
      rating: 4.8,
      downloads: "1.8K",
      features: ["نظام دفع آمن", "إدارة المخزون", "تتبع الطلبات", "تحليلات المبيعات"],
      demoUrl: "https://demo.ecommerce-platform.com",
      category: "التجارة الإلكترونية"
    },
    {
      title: "تطبيق إدارة العملاء (CRM)",
      description: "نظام متطور لإدارة علاقات العملاء وتتبع المبيعات",
      image: "/placeholder.svg",
      price: "4000 ريال",
      rating: 4.7,
      downloads: "3.2K",
      features: ["إدارة العملاء", "تتبع المبيعات", "تقارير شاملة", "أتمتة التسويق"],
      demoUrl: "https://demo.crm-system.com",
      category: "إدارة العملاء"
    },
    {
      title: "نظام إدارة المحتوى المتقدم",
      description: "منصة لإدارة المحتوى مع محرر متقدم ونظام نشر ذكي",
      image: "/placeholder.svg",
      price: "3500 ريال",
      rating: 4.6,
      downloads: "4.1K",
      features: ["محرر متقدم", "نشر مجدول", "إدارة الوسائط", "تحسين SEO"],
      demoUrl: "https://demo.cms-platform.com",
      category: "إدارة المحتوى"
    }
  ];

  const openDemo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white">منتجاتنا وأنظمتنا</Badge>
          <h2 className="text-4xl font-bold mb-4">حلول جاهزة للاستخدام الفوري</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة متميزة من الأنظمة والتطبيقات الجاهزة التي تم تطويرها بعناية لتلبية احتياجات السوق
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="service-card group overflow-hidden border-0 shadow-xl">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 right-4 bg-black text-white">
                  {product.category}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-bold">{product.title}</CardTitle>
                  <div className="text-2xl font-bold text-yellow-600">{product.price}</div>
                </div>
                <p className="text-gray-600">{product.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>{product.downloads} تحميل</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="border-black text-black hover:bg-black hover:text-white"
                    onClick={() => openDemo(product.demoUrl)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    معاينة مباشرة
                  </Button>
                  <Button className="bg-black text-white hover:bg-yellow-500 hover:text-black">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    شراء الآن
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
            عرض جميع المنتجات
            <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
