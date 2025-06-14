
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowLeft, ChevronDown, ChevronUp, Star } from 'lucide-react';
import ServiceRequestForm from './ServiceRequestForm';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const PROJECT_ID = 'tech-services-project';

// Define types for special services
interface SpecialService {
  id: string;
  name: string;
  description?: string;
  detailed_description?: string;
  project_types?: string[];
  features?: string[];
  icon?: string;
  color?: string;
  is_featured?: boolean;
  is_active: boolean;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

const ServicesSection = () => {
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showSpecialServices, setShowSpecialServices] = useState(true);

  // Fetch regular services from database with project_id filter
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .eq('project_id', PROJECT_ID)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Fetch special services from database with proper typing and project_id filter
  const { data: specialServices = [], isLoading: specialServicesLoading } = useQuery({
    queryKey: ['special-services-public'],
    queryFn: async (): Promise<SpecialService[]> => {
      const { data, error } = await supabase
        .from('special_services')
        .select('*')
        .eq('is_active', true)
        .eq('project_id', PROJECT_ID)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return (data || []) as SpecialService[];
    }
  });

  // Default services matching the website design if no services in database
  const defaultServices = [
    {
      id: 1,
      name: "استشارات الأعمال التقنية",
      description: "استشارات متخصصة لتحسين العمليات وزيادة الكفاءة باستخدام التقنيات الحديثة",
      price: 150,
      unit: "ساعة",
      type: "consulting",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=80",
      features: ["تحليل العمليات", "اقتراح الحلول", "خطط التطوير", "التدريب والدعم"],
      is_active: true,
      project_id: PROJECT_ID
    },
    {
      id: 2,
      name: "تطوير تطبيقات الويب",
      description: "تصميم وتطوير تطبيقات ويب احترافية باستخدام أحدث التقنيات",
      price: 2000,
      unit: "مشروع",
      type: "development",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=500&q=80",
      features: ["تصميم متجاوب", "أداء عالي", "أمان متقدم", "سهولة الاستخدام"],
      is_active: true,
      project_id: PROJECT_ID
    },
    {
      id: 3,
      name: "تطوير أنظمة إدارة المخزون",
      description: "أنظمة ذكية ومتطورة لإدارة المخزون والمستودعات مع تتبع دقيق للمنتجات",
      price: 2500,
      unit: "نظام",
      type: "development",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
      features: ["تتبع المخزون", "تقارير مفصلة", "تنبيهات ذكية", "إدارة الموردين"],
      is_active: true,
      project_id: PROJECT_ID
    },
    {
      id: 4,
      name: "أنظمة الحماية السيبرانية",
      description: "حلول أمنية متطورة لحماية البيانات والأنظمة من التهديدات السيبرانية",
      price: 3500,
      unit: "نظام",
      type: "security",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=80",
      features: ["مراقبة الأمان", "كشف التهديدات", "حماية البيانات", "تقارير أمنية"],
      is_active: true,
      project_id: PROJECT_ID
    },
    {
      id: 5,
      name: "أنظمة الذكاء الاصطناعي",
      description: "تطوير حلول الذكاء الاصطناعي وتعلم الآلة المتقدمة للأعمال",
      price: 4000,
      unit: "نظام",
      type: "ai",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
      features: ["تعلم الآلة", "تحليل البيانات", "أتمتة العمليات", "توقعات ذكية"],
      is_active: true,
      project_id: PROJECT_ID
    },
    {
      id: 6,
      name: "تطوير التطبيقات المحمولة",
      description: "تطبيقات أصلية ومتطورة للهواتف الذكية والأجهزة اللوحية",
      price: 3000,
      unit: "تطبيق",
      type: "mobile",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=80",
      features: ["تطبيقات أصلية", "تصميم حديث", "أداء سريع", "متجر التطبيقات"],
      is_active: true,
      project_id: PROJECT_ID
    },
    {
      id: 7,
      name: "التسويق الرقمي الذكي",
      description: "حلول التسويق الرقمي المدعومة بالذكاء الاصطناعي والتحليلات المتقدمة",
      price: 800,
      unit: "شهر",
      type: "marketing",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80",
      features: ["حملات ذكية", "تحليل الجمهور", "تحسين الإعلانات", "تقارير شاملة"],
      is_active: true,
      project_id: PROJECT_ID
    },
    {
      id: 8,
      name: "أنظمة إدارة المحتوى",
      description: "منصات متطورة لإدارة المحتوى الرقمي والنشر الذكي",
      price: 1800,
      unit: "نظام",
      type: "cms",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=500&q=80",
      features: ["إدارة المحتوى", "نشر تلقائي", "تحسين SEO", "تحليلات المحتوى"],
      is_active: true,
      project_id: PROJECT_ID
    },
    {
      id: 9,
      name: "استشارات التحول الرقمي",
      description: "إرشاد الشركات خلال رحلة التحول الرقمي الشامل والمتطور",
      price: 200,
      unit: "ساعة",
      type: "consulting",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=500&q=80",
      features: ["تقييم الوضع الحالي", "خطة التحول", "تدريب الفرق", "دعم مستمر"],
      is_active: true,
      project_id: PROJECT_ID
    }
  ];

  // Use database services if available, otherwise use default services
  const displayServices = services.length > 0 ? services.map(service => ({
    ...service,
    image: service.image_url || `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1518770660439-4636190af475' : '1487058792275-0ad4aaf24ca7'}?auto=format&fit=crop&w=500&q=80`,
    features: ["ميزة أساسية", "دعم فني", "تدريب شامل", "ضمان الجودة"]
  })) : defaultServices.filter(service => service.project_id === PROJECT_ID);

  const visibleServices = displayServices.filter(service => service.is_active !== false);
  const displayedServices = showMore ? visibleServices : visibleServices.slice(0, 3);
  const featuredSpecialServices = specialServices.filter(service => service.is_featured);

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

          {/* Special Services Section */}
          {specialServices.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-white">خدماتنا الخاصة</h3>
                  <Badge className="bg-yellow-500 text-black">مميزة</Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSpecialServices(!showSpecialServices)}
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                >
                  {showSpecialServices ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>

              {showSpecialServices && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                  {specialServices.map((service) => (
                    <Card key={service.id} className="modern-card bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-lg group hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                      {service.is_featured && (
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className="bg-yellow-500 text-black">
                            <Star className="h-3 w-3 mr-1" />
                            مميزة
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="pb-4">
                        <div className="w-full h-48 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                          <div className="text-6xl opacity-20" style={{ color: service.color || '#3B82F6' }}>
                            {service.icon || '⭐'}
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-white mb-2">{service.name}</CardTitle>
                        <p className="text-gray-300 text-sm">{service.description}</p>
                        {service.detailed_description && (
                          <p className="text-gray-400 text-xs mt-2">{service.detailed_description}</p>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {service.features && service.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {service.project_types && service.project_types.length > 0 && (
                          <div className="pt-2 border-t border-gray-600">
                            <div className="text-xs text-gray-400 mb-2">المشاريع المرتبطة:</div>
                            <div className="flex flex-wrap gap-1">
                              {service.project_types.slice(0, 3).map((project: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {project}
                                </Badge>
                              ))}
                              {service.project_types.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{service.project_types.length - 3} المزيد
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="pt-4 border-t border-gray-600">
                          <Button 
                            className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition-colors"
                            onClick={() => setIsRequestFormOpen(true)}
                          >
                            طلب الخدمة الخاصة
                            <ArrowLeft className="mr-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Regular Services Section */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <h3 className="text-2xl font-bold text-white">خدماتنا الأساسية</h3>
            </div>
            
            {servicesLoading ? (
              <div className="text-center py-8">
                <div className="text-gray-400">جاري التحميل...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {displayedServices.map((service) => (
                  <Card key={service.id} className="modern-card bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-lg group hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="w-full h-48 bg-gray-600 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={service.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"} 
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="text-xl font-bold text-white mb-2">{service.name}</CardTitle>
                      <p className="text-gray-300 text-sm">{service.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {(service.features || ["ميزة أساسية", "دعم فني", "تدريب شامل", "ضمان الجودة"]).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-gray-600">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-yellow-500 text-black font-bold">
                            {service.price} ريال عُماني / {service.unit}
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
            )}

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
