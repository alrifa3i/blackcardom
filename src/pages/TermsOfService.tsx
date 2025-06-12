
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black">شروط الاستخدام</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">شروط الاستخدام</h1>
              <p className="text-xl text-gray-300">
                يرجى قراءة هذه الشروط بعناية قبل استخدام خدماتنا
              </p>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">قبول الشروط</h2>
                  <p className="text-gray-300 leading-relaxed">
                    باستخدامك لخدمات شركة الكارت الأسود، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">نطاق الخدمات</h2>
                  <p className="text-gray-300 leading-relaxed">
                    تقدم شركة الكارت الأسود خدمات متنوعة تشمل:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-300">
                    <li>• تطوير التطبيقات والمواقع الإلكترونية</li>
                    <li>• حلول إدارة الأنظمة</li>
                    <li>• الاستشارات التقنية</li>
                    <li>• التدريب والدعم الفني</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">التزامات العميل</h2>
                  <p className="text-gray-300 leading-relaxed">
                    يلتزم العميل بما يلي:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-300">
                    <li>• تقديم معلومات دقيقة وكاملة</li>
                    <li>• عدم استخدام الخدمات لأغراض غير قانونية</li>
                    <li>• احترام حقوق الملكية الفكرية</li>
                    <li>• دفع الرسوم المستحقة في الوقت المحدد</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">الملكية الفكرية</h2>
                  <p className="text-gray-300 leading-relaxed">
                    جميع حقوق الملكية الفكرية للمنتجات والخدمات المطورة تخضع للاتفاقيات المبرمة مع كل عميل. نحتفظ بحقوق الملكية الفكرية لأدواتنا وتقنياتنا الداخلية.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">السرية</h2>
                  <p className="text-gray-300 leading-relaxed">
                    نلتزم بالحفاظ على سرية جميع المعلومات التي يقدمها العملاء ولا نكشف عنها لأطراف ثالثة إلا بموافقة كتابية صريحة أو عند الضرورة القانونية.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">حدود المسؤولية</h2>
                  <p className="text-gray-300 leading-relaxed">
                    لا تتحمل شركة الكارت الأسود مسؤولية أي أضرار غير مباشرة أو عرضية قد تنتج عن استخدام خدماتنا. مسؤوليتنا محدودة بقيمة الخدمات المقدمة.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">إنهاء الخدمة</h2>
                  <p className="text-gray-300 leading-relaxed">
                    يحق لأي من الطرفين إنهاء الخدمة بإشعار مسبق حسب الشروط المتفق عليها في العقد. في حالة الإنهاء، يجب الوفاء بجميع الالتزامات المالية المستحقة.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">تعديل الشروط</h2>
                  <p className="text-gray-300 leading-relaxed">
                    نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعار العملاء بأي تغييرات جوهرية مسبقاً.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">القانون المطبق</h2>
                  <p className="text-gray-300 leading-relaxed">
                    تخضع هذه الشروط لقوانين سلطنة عُمان، وأي نزاع ينشأ عنها يُحل وفقاً للقوانين العُمانية المعمول بها.
                  </p>
                </div>

                <div className="bg-gray-700 p-6 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    آخر تحديث: ديسمبر 2024. للاستفسارات، تواصل معنا: legal@theblackcard.om
                  </p>
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

export default TermsOfService;
