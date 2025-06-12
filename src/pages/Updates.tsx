
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Star, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Updates = () => {
  const updates = [
    {
      version: "2.1.0",
      date: "ديسمبر 2024",
      type: "major",
      title: "تحديث شامل للأمان والأداء",
      features: [
        "تحسينات أمنية متقدمة",
        "تحسين سرعة التحميل بنسبة 40%",
        "واجهة مستخدم محدثة",
        "دعم اللغة العربية المحسن"
      ],
      status: "released"
    },
    {
      version: "2.0.5",
      date: "نوفمبر 2024",
      type: "patch",
      title: "إصلاحات وتحسينات",
      features: [
        "إصلاح مشاكل التزامن",
        "تحسين استقرار التطبيق",
        "إصلاح مشاكل عرض البيانات"
      ],
      status: "released"
    },
    {
      version: "2.0.0",
      date: "أكتوبر 2024",
      type: "major",
      title: "إطلاق الجيل الثاني",
      features: [
        "إعادة تصميم كاملة للواجهة",
        "نظام إدارة محتوى جديد",
        "تكامل مع الذكاء الاصطناعي",
        "أدوات تحليل متقدمة"
      ],
      status: "released"
    },
    {
      version: "2.2.0",
      date: "يناير 2025",
      type: "major",
      title: "ميزات الذكاء الاصطناعي المتقدمة",
      features: [
        "مساعد ذكي للعملاء",
        "تحليل تلقائي للبيانات",
        "توقعات ذكية للأداء",
        "أتمتة العمليات الروتينية"
      ],
      status: "coming"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'released':
        return <Badge className="bg-green-500 text-white">متوفر</Badge>;
      case 'coming':
        return <Badge className="bg-blue-500 text-white">قريباً</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">غير محدد</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'major':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'minor':
        return <Zap className="h-5 w-5 text-blue-500" />;
      case 'patch':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black">التحديثات</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">سجل التحديثات</h1>
              <p className="text-xl text-gray-300">
                تابع أحدث التطويرات والميزات الجديدة في منتجاتنا
              </p>
            </div>

            <div className="space-y-6">
              {updates.map((update, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(update.type)}
                        <div>
                          <CardTitle className="text-yellow-500">
                            الإصدار {update.version}
                          </CardTitle>
                          <p className="text-gray-400 text-sm">{update.date}</p>
                        </div>
                      </div>
                      {getStatusBadge(update.status)}
                    </div>
                    <h3 className="text-xl font-semibold text-white mt-4">
                      {update.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-3">الميزات الجديدة:</h4>
                        <ul className="space-y-2">
                          {update.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {update.status === 'released' && (
                        <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                          تحميل التحديث
                        </Button>
                      )}
                      
                      {update.status === 'coming' && (
                        <Button variant="outline" className="border-yellow-500 text-yellow-500">
                          <Clock className="mr-2 h-4 w-4" />
                          تنبيهني عند الإطلاق
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  اشترك في التحديثات
                </h3>
                <p className="text-gray-300 mb-6">
                  احصل على إشعارات فورية عند إطلاق ميزات وتحديثات جديدة
                </p>
                <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                  اشترك الآن
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Updates;
