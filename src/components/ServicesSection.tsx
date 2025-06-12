
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowLeft } from 'lucide-react';
import ServiceRequestForm from './ServiceRequestForm';

const ServicesSection = () => {
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  // بيانات الخدمات - ستأتي من لوحة التحكم لاحقاً
  const services = [
    {
      id: 1,
      title: "استشارات الأعمال التقنية",
      description: "نقدم استشارات متخصصة لتحسين العمليات وزيادة الكفاءة باستخدام أحدث التقنيات",
      price: "25 ريال عُماني/ساعة",
      image: "/placeholder.svg",
      features: ["تحليل العمليات", "اقتراح الحلول", "خطط التطوير", "التدريب والدعم"]
    },
    {
      id: 2,
      title: "تطوير تطبيقات الويب",
      description: "تصميم وتطوير مواقع وتطبيقات ويب احترافية بأحدث التقنيات",
      price: "500 ريال عُماني للمشروع",
      image: "/placeholder.svg",
      features: ["تصميم متجاوب", "أداء عالي", "أمان متقدم", "سهولة الاستخدام"]
    },
    {
      id: 3,
      title: "تطوير أنظمة إدارة المخزون",
      description: "أنظمة ذكية لإدارة المخزون والمبيعات مع تقارير تفصيلية",
      price: "1000 ريال عُماني للنظام",
      image: "/placeholder.svg",
      features: ["تتبع المخزون", "تقارير مفصلة", "تنبيهات ذكية", "إدارة الموردين"]
    }
  ];

  return (
    <>
      <section id="services" className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-yellow-500 text-black">خدماتنا</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">خدمات احترافية متخصصة</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات التقنية المتطورة لتلبية احتياجات عملك وتحقيق أهدافك الرقمية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <Card key={service.id} className="modern-card bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-lg group hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="w-full h-48 bg-gray-600 rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">{service.title}</CardTitle>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-yellow-500 text-black font-bold">
                        {service.price}
                      </Badge>
                    </div>
                    
                    <Button 
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
                      onClick={() => setIsRequestFormOpen(true)}
                    >
                      طلب الخدمة
                      <ArrowLeft className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ServiceRequestForm 
        isOpen={isRequestFormOpen} 
        onClose={() => setIsRequestFormOpen(false)} 
      />
    </>
  );
};

export default ServicesSection;
