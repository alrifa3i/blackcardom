
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import ServiceRequestForm from './ServiceRequestForm';

const ServicesSection = () => {
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // بيانات الخدمات - ستأتي من لوحة التحكم لاحقاً
  const services = [
    {
      id: 1,
      title: "استشارات الأعمال التقنية",
      description: "نقدم استشارات متخصصة لتحسين العمليات وزيادة الكفاءة باستخدام أحدث التقنيات",
      price: "25 ريال عُماني/ساعة",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
      features: ["تحليل العمليات", "اقتراح الحلول", "خطط التطوير", "التدريب والدعم"],
      isVisible: true
    },
    {
      id: 2,
      title: "تطوير تطبيقات الويب",
      description: "تصميم وتطوير مواقع وتطبيقات ويب احترافية بأحدث التقنيات",
      price: "500 ريال عُماني للمشروع",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&q=80",
      features: ["تصميم متجاوب", "أداء عالي", "أمان متقدم", "سهولة الاستخدام"],
      isVisible: true
    },
    {
      id: 3,
      title: "تطوير أنظمة إدارة المخزون",
      description: "أنظمة ذكية لإدارة المخزون والمبيعات مع تقارير تفصيلية",
      price: "1000 ريال عُماني للنظام",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      features: ["تتبع المخزون", "تقارير مفصلة", "تنبيهات ذكية", "إدارة الموردين"],
      isVisible: true
    },
    {
      id: 4,
      title: "تطوير التطبيقات المحمولة",
      description: "تطبيقات أصلية ومتقدمة للهواتف الذكية والأجهزة اللوحية",
      price: "750 ريال عُماني للتطبيق",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
      features: ["تطبيقات أصلية", "تصميم حديث", "أداء سريع", "متجر التطبيقات"],
      isVisible: true
    },
    {
      id: 5,
      title: "أنظمة الذكاء الاصطناعي",
      description: "تطوير حلول الذكاء الاصطناعي وتعلم الآلة للأعمال",
      price: "1500 ريال عُماني للنظام",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
      features: ["تعلم الآلة", "تحليل البيانات", "أتمتة العمليات", "توقعات ذكية"],
      isVisible: true
    },
    {
      id: 6,
      title: "أنظمة الحماية السيبرانية",
      description: "حماية شاملة للبيانات والأنظمة من التهديدات السيبرانية",
      price: "800 ريال عُماني للنظام",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80",
      features: ["مراقبة الأمان", "كشف التهديدات", "حماية البيانات", "تقارير أمنية"],
      isVisible: true
    },
    {
      id: 7,
      title: "أنظمة إدارة المحتوى",
      description: "أنظمة متطورة لإدارة المحتوى الرقمي والنشر",
      price: "600 ريال عُماني للنظام",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
      features: ["إدارة المحتوى", "نشر تلقائي", "تحسين SEO", "تحليلات المحتوى"],
      isVisible: true
    },
    {
      id: 8,
      title: "التسويق الرقمي الذكي",
      description: "حلول التسويق الرقمي المدعومة بالذكاء الاصطناعي",
      price: "400 ريال عُماني/شهر",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
      features: ["حملات ذكية", "تحليل الجمهور", "تحسين الإعلانات", "تقارير شاملة"],
      isVisible: true
    },
    {
      id: 9,
      title: "استشارات التحول الرقمي",
      description: "إرشاد الشركات خلال رحلة التحول الرقمي الشامل",
      price: "300 ريال عُماني/ساعة",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=80",
      features: ["تقييم الوضع الحالي", "خطة التحول", "تدريب الفرق", "دعم مستمر"],
      isVisible: true
    }
  ];

  const visibleServices = services.filter(service => service.isVisible);
  const displayedServices = showMore ? visibleServices : visibleServices.slice(0, 3);

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
            {displayedServices.map((service) => (
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

          {visibleServices.length > 3 && (
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

      <ServiceRequestForm 
        isOpen={isRequestFormOpen} 
        onClose={() => setIsRequestFormOpen(false)} 
      />
    </>
  );
};

export default ServicesSection;
