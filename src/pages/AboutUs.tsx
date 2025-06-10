
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Target, Award, Globe, Code, Smartphone, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative hero-gradient min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center text-white space-y-8">
            <Badge className="bg-yellow-500 text-black hover:bg-yellow-400 text-sm">
              من نحن
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="gradient-text">The Black Card</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              نحن فريق متخصص في تطوير الحلول التقنية المتقدمة وإدارة المشاريع الرقمية، نسعى لتحويل أفكارك إلى واقع رقمي مبتكر يحقق أهدافك ويتجاوز توقعاتك.
            </p>
            <Link to="/">
              <Button size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400">
                العودة للرئيسية
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">قصتنا</h2>
              <p className="text-lg text-gray-300">
                بدأنا رحلتنا من شغفنا بالتكنولوجيا والرغبة في تقديم حلول مبتكرة تلبي احتياجات العصر الرقمي. على مدى السنوات الماضية، نجحنا في تطوير وتنفيذ أكثر من 50 مشروعاً متنوعاً في مختلف القطاعات.
              </p>
              <p className="text-lg text-gray-300">
                نؤمن بأن التكنولوجيا يجب أن تكون في خدمة الإنسان، ولذلك نركز على تطوير حلول سهلة الاستخدام وفعالة تحقق النتائج المرجوة بأقل تعقيد.
              </p>
            </div>
            <div className="relative">
              <Card className="modern-card bg-gradient-to-br from-gray-800 to-gray-700 border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-yellow-500">50+</div>
                      <div className="text-sm text-gray-300">مشروع مكتمل</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-500">5+</div>
                      <div className="text-sm text-gray-300">سنوات خبرة</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-500">100%</div>
                      <div className="text-sm text-gray-300">رضا العملاء</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-yellow-500">24/7</div>
                      <div className="text-sm text-gray-300">دعم فني</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">قيمنا ومبادئنا</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتضمن تقديم أفضل الخدمات لعملائنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Target className="h-8 w-8" />,
                title: "التميز",
                description: "نسعى دائماً لتحقيق أعلى معايير الجودة في كل ما نقوم به"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "العمل الجماعي",
                description: "نؤمن بقوة التعاون والعمل كفريق واحد لتحقيق النجاح"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "الابتكار",
                description: "نبحث باستمرار عن طرق جديدة ومبتكرة لحل التحديات"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "الشفافية",
                description: "نتعامل بصدق وشفافية مع عملائنا في جميع مراحل العمل"
              }
            ].map((value, index) => (
              <Card key={index} className="modern-card text-center p-6 border-0 shadow-lg bg-gradient-to-br from-gray-800 to-gray-700">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-yellow-500 text-black rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">خدماتنا المتميزة</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات التقنية المتقدمة لتلبية جميع احتياجاتك الرقمية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-8 w-8" />,
                title: "تطوير التطبيقات",
                description: "تطوير تطبيقات ويب ومحمولة متقدمة باستخدام أحدث التقنيات",
                features: ["تطبيقات الويب", "تطبيقات الجوال", "أنظمة إدارة", "واجهات المستخدم"]
              },
              {
                icon: <Smartphone className="h-8 w-8" />,
                title: "الحلول الذكية",
                description: "حلول ذكية ومتكاملة لإدارة الأعمال وتحسين الكفاءة",
                features: ["أتمتة العمليات", "ذكاء اصطناعي", "تحليل البيانات", "إنترنت الأشياء"]
              },
              {
                icon: <Database className="h-8 w-8" />,
                title: "إدارة البيانات",
                description: "إدارة وتحليل البيانات لاتخاذ قرارات مدروسة ومبنية على الحقائق",
                features: ["قواعد البيانات", "التحليل المتقدم", "التقارير الذكية", "أمان البيانات"]
              }
            ].map((service, index) => (
              <Card key={index} className="modern-card p-6 border-0 shadow-lg bg-gradient-to-br from-gray-800 to-gray-700">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-center">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">الأسئلة الشائعة</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              إجابات على أهم الأسئلة التي قد تدور في ذهنك حول خدماتنا
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "ما هي المدة الزمنية لتطوير المشاريع؟",
                answer: "تختلف المدة حسب حجم وتعقيد المشروع، لكن عادة ما تتراوح بين 2-12 أسبوع. نقدم جدولاً زمنياً مفصلاً في بداية كل مشروع."
              },
              {
                question: "هل تقدمون الدعم الفني بعد التسليم؟",
                answer: "نعم، نقدم دعماً فنياً شاملاً لمدة 6 أشهر مجاناً، ويمكن تمديدها حسب الحاجة بخطط دعم مرنة."
              },
              {
                question: "ما هي التقنيات التي تستخدمونها؟",
                answer: "نستخدم أحدث التقنيات مثل React، Node.js، Python، MongoDB، وغيرها حسب متطلبات المشروع."
              },
              {
                question: "هل يمكنكم العمل على مشاريع كبيرة ومعقدة؟",
                answer: "بالطبع، لدينا خبرة واسعة في تطوير مشاريع كبيرة ومعقدة للشركات والمؤسسات الحكومية."
              },
              {
                question: "كيف يمكنني طلب خدمة أو الحصول على عرض سعر؟",
                answer: "يمكنك التواصل معنا عبر نموذج الاتصال أو الاتصال المباشر، وسنقوم بدراسة مشروعك وتقديم عرض مفصل خلال 48 ساعة."
              }
            ].map((faq, index) => (
              <Card key={index} className="modern-card bg-gradient-to-br from-gray-800 to-gray-700 border-0">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-white">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
