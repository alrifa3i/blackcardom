
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Handshake, Award, Globe, Users, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Partnerships = () => {
  const partners = [
    {
      name: "شركة التقنيات المتقدمة",
      type: "شريك تقني",
      description: "شراكة استراتيجية في تطوير الحلول السحابية",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=200&q=80",
      status: "نشط"
    },
    {
      name: "جامعة السلطان قابوس",
      type: "شريك أكاديمي",
      description: "تعاون في البحث والتطوير وتدريب الطلاب",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80",
      status: "نشط"
    },
    {
      name: "Microsoft Oman",
      type: "شريك تكنولوجيا",
      description: "شراكة في حلول Microsoft Azure والخدمات السحابية",
      logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&w=200&q=80",
      status: "نشط"
    },
    {
      name: "غرفة تجارة وصناعة عُمان",
      type: "شريك تجاري",
      description: "عضوية فعالة ومشاركة في الفعاليات التجارية",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=200&q=80",
      status: "نشط"
    }
  ];

  const partnershipTypes = [
    {
      icon: <Globe className="h-8 w-8 text-yellow-500" />,
      title: "الشراكات التقنية",
      description: "تعاون مع شركات التكنولوجيا العالمية لتقديم أحدث الحلول",
      benefits: ["وصول لأحدث التقنيات", "دعم فني متخصص", "تدريب متقدم", "شهادات معتمدة"]
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "الشراكات الأكاديمية",
      description: "تعاون مع الجامعات ومراكز البحث لتطوير المواهب والابتكار",
      benefits: ["برامج تدريبية", "مشاريع بحثية", "تطوير المواهب", "نقل المعرفة"]
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-500" />,
      title: "الشراكات التجارية",
      description: "تحالفات استراتيجية مع الشركات لتوسيع نطاق الخدمات",
      benefits: ["توسيع السوق", "تبادل الخبرات", "فرص جديدة", "نمو مشترك"]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black">الشراكات</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">شراكاتنا الاستراتيجية</h1>
              <p className="text-xl text-gray-300">
                نؤمن بقوة التعاون والشراكة في تحقيق النجاح المشترك
              </p>
            </div>

            {/* أنواع الشراكات */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {partnershipTypes.map((type, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {type.icon}
                    </div>
                    <CardTitle className="text-xl text-white">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">{type.description}</p>
                    <div className="space-y-2">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-300">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* الشركاء الحاليون */}
            <Card className="bg-gray-800 border-gray-700 mb-12">
              <CardHeader>
                <CardTitle className="text-3xl text-yellow-500 text-center mb-4">شركاؤنا الحاليون</CardTitle>
                <p className="text-gray-300 text-center">
                  نفخر بشراكاتنا مع المؤسسات الرائدة محلياً وعالمياً
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {partners.map((partner, index) => (
                    <div key={index} className="bg-gray-700 p-6 rounded-lg">
                      <div className="flex items-start gap-4">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-white">{partner.name}</h3>
                            <Badge className="bg-green-500 text-white text-xs">{partner.status}</Badge>
                          </div>
                          <Badge variant="outline" className="border-yellow-500 text-yellow-500 mb-3">
                            {partner.type}
                          </Badge>
                          <p className="text-gray-300 text-sm">{partner.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* فوائد الشراكة */}
            <Card className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 mb-12">
              <CardHeader>
                <CardTitle className="text-3xl text-white text-center mb-4">لماذا الشراكة معنا؟</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "خبرة متقدمة", desc: "أكثر من 5 سنوات في السوق" },
                    { title: "فريق محترف", desc: "خبراء معتمدون في التقنيات الحديثة" },
                    { title: "حلول مبتكرة", desc: "نطور حلول تقنية متقدمة ومخصصة" },
                    { title: "دعم مستمر", desc: "دعم فني على مدار الساعة" }
                  ].map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-yellow-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Handshake className="h-6 w-6 text-black" />
                      </div>
                      <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                      <p className="text-gray-300 text-sm">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* دعوة للشراكة */}
            <Card className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-8">
                <Handshake className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  هل تريد أن تكون شريكنا؟
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  نحن نبحث دائماً عن شركاء جدد يشاركوننا رؤيتنا في التحول الرقمي والابتكار. 
                  تواصل معنا لاستكشاف فرص الشراكة المتاحة.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                    طلب شراكة
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="border-yellow-500 text-yellow-500">
                    تحميل ملف الشراكات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partnerships;
