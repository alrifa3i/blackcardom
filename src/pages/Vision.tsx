
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Heart, Users, Lightbulb, Award } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Vision = () => {
  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "الابتكار",
      description: "نسعى دائماً لتقديم حلول مبتكرة تواكب أحدث التطورات التقنية"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "الجودة",
      description: "نلتزم بأعلى معايير الجودة في جميع خدماتنا ومنتجاتنا"
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-500" />,
      title: "التعاون",
      description: "نؤمن بقوة العمل الجماعي والشراكة مع عملائنا"
    },
    {
      icon: <Heart className="h-8 w-8 text-yellow-500" />,
      title: "الشفافية",
      description: "نتعامل بصدق ووضوح في جميع تعاملاتنا التجارية"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black">رؤيتنا ورسالتنا</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">رؤيتنا ورسالتنا</h1>
              <p className="text-xl text-gray-300">
                نحو مستقبل رقمي أفضل للجميع
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* الرؤية */}
              <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="h-8 w-8 text-yellow-500" />
                    <CardTitle className="text-3xl text-white">رؤيتنا</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    أن نكون الشركة الرائدة في منطقة الخليج العربي في مجال إدارة الأنظمة والحلول التقنية المبتكرة، ونساهم في التحول الرقمي للمؤسسات والشركات لتحقيق أهدافها بكفاءة وفعالية عالية.
                  </p>
                  <p className="text-gray-300">
                    نطمح لأن نكون الخيار الأول للعملاء الذين يبحثون عن حلول تقنية موثوقة ومبتكرة تدعم نموهم ونجاحهم في العصر الرقمي.
                  </p>
                </CardContent>
              </Card>

              {/* الرسالة */}
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="h-8 w-8 text-blue-500" />
                    <CardTitle className="text-3xl text-white">رسالتنا</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    تقديم حلول تقنية متطورة وخدمات إدارة أنظمة احترافية تمكن عملاءنا من تحقيق أهدافهم الاستراتيجية، من خلال فريق خبير يجمع بين الكفاءة التقنية والإبداع في التصميم.
                  </p>
                  <p className="text-gray-300">
                    نلتزم بتقديم خدمات عالية الجودة تتميز بالموثوقية والأمان، مع ضمان رضا العملاء وتحقيق قيمة مضافة حقيقية لأعمالهم.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* القيم */}
            <Card className="bg-gray-800 border-gray-700 mb-12">
              <CardHeader>
                <CardTitle className="text-3xl text-yellow-500 text-center mb-4">قيمنا الأساسية</CardTitle>
                <p className="text-gray-300 text-center">
                  القيم التي تحرك أعمالنا وتوجه قراراتنا اليومية
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="text-center p-6 bg-gray-700 rounded-lg">
                      <div className="flex justify-center mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-gray-300 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* أهدافنا الاستراتيجية */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-3xl text-yellow-500 text-center mb-4">أهدافنا الاستراتيجية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">الأهداف قصيرة المدى (2024-2025)</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        توسيع قاعدة العملاء بنسبة 50%
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        إطلاق 3 منتجات جديدة
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        تعزيز الحضور في الأسواق المحلية
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        تطوير شراكات استراتيجية جديدة
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">الأهداف طويلة المدى (2025-2027)</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        التوسع إلى أسواق دول الخليج
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        أن نصبح من أكبر 5 شركات في المنطقة
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        تطوير مركز للبحث والتطوير
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        إطلاق برامج تدريبية متخصصة
                      </li>
                    </ul>
                  </div>
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

export default Vision;
