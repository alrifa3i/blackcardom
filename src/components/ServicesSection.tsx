
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Smartphone, Globe, Shield, Zap, Users } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "استشارات الأعمال التقنية",
      description: "نقدم استشارات متخصصة لتحسين العمليات وزيادة الكفاءة",
      features: ["تحليل العمليات", "اقتراح الحلول", "خطط التطوير", "التدريب والدعم"],
      price: "200 ريال/ساعة",
      imageUrl: "/lovable-uploads/3eda1a51-81b1-45c6-8975-53dcc50cf0c2.png"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "تطوير الأنظمة المخصصة",
      description: "نطور أنظمة مخصصة تلبي احتياجات عملك بدقة وكفاءة عالية",
      features: ["تحليل المتطلبات", "التصميم والتطوير", "الاختبار والنشر", "الدعم والصيانة"],
      price: "ابتداءً من 5000 ريال",
      imageUrl: "/lovable-uploads/3eda1a51-81b1-45c6-8975-53dcc50cf0c2.png"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "إدارة المشاريع التقنية",
      description: "نقدم خدمات إدارة شاملة للمشاريع الفنية من التخطيط حتى التسليم",
      features: ["تخطيط المشاريع", "إدارة الفرق", "متابعة التقدم", "ضمان الجودة"],
      price: "حسب المشروع",
      imageUrl: "/lovable-uploads/3eda1a51-81b1-45c6-8975-53dcc50cf0c2.png"
    }
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-500 text-black">خدماتنا المتميزة</Badge>
          <h2 className="text-4xl font-bold mb-4 text-white">حلول تقنية شاملة لنجاح مشروعك</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات التقنية المتطورة لتلبية جميع احتياجات عملك الرقمي
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="modern-card group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800">
              {/* Image Placeholder Area */}
              <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-sm mb-2">Drop your images here or Browse</div>
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-yellow-400 transition-all duration-300">
                    {service.icon}
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-white text-center">{service.title}</CardTitle>
                <p className="text-gray-300 text-center text-sm">{service.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-yellow-500 mb-2">{service.price}</div>
                  </div>
                  <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-all">
                    طلب الخدمة
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
            عرض جميع الخدمات
            <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
