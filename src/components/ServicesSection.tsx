
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Smartphone, Globe, Shield, Zap, Users } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "تطوير التطبيقات",
      description: "تطوير تطبيقات ويب وموبايل متطورة باستخدام أحدث التقنيات",
      features: ["React & Node.js", "Flutter & React Native", "API Integration", "Cloud Deployment"],
      price: "من 2000 ريال",
      badge: "الأكثر طلباً"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "إدارة المشاريع",
      description: "إدارة احترافية للمشاريع التقنية من التخطيط حتى التسليم",
      features: ["تخطيط المشاريع", "إدارة الفرق", "متابعة التقدم", "ضمان الجودة"],
      price: "من 1500 ريال",
      badge: "خدمة مميزة"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "الحلول السحابية",
      description: "خدمات الحوسبة السحابية وإعداد البنية التحتية",
      features: ["AWS Setup", "Azure Integration", "Database Management", "Security Solutions"],
      price: "من 3000 ريال",
      badge: "تقنية متقدمة"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "الأمن السيبراني",
      description: "حماية شاملة للأنظمة والبيانات من التهديدات السيبرانية",
      features: ["تقييم الأمان", "حلول الحماية", "مراقبة الأنظمة", "تدريب الفرق"],
      price: "من 2500 ريال",
      badge: "حماية متقدمة"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-black text-white">خدماتنا المتميزة</Badge>
          <h2 className="text-4xl font-bold mb-4">حلول تقنية شاملة لنجاح مشروعك</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات التقنية المتطورة لتلبية جميع احتياجات عملك الرقمي
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="service-card group border-0 shadow-xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                    {service.icon}
                  </div>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {service.badge}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-black">{service.price}</div>
                    <Button className="bg-black text-white hover:bg-yellow-500 hover:text-black transition-all">
                      اطلب الخدمة
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
            عرض جميع الخدمات
            <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
