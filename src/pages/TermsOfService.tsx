
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
              <Badge className="mb-4 bg-yellow-500 text-black">شروط الخدمة</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">شروط الخدمة والاستخدام</h1>
              <p className="text-xl text-gray-300">
                يرجى قراءة هذه الشروط بعناية قبل استخدام خدمات شركة الكارت الأسود
              </p>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">قبول الشروط والأحكام</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    باستخدامك لخدمات شركة الكارت الأسود، سواء عبر الموقع الإلكتروني أو التطبيقات أو أي منصة أخرى، فإنك تؤكد موافقتك الكاملة على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    هذه الاتفاقية سارية المفعول من تاريخ أول استخدام للخدمة وتستمر حتى إنهائها وفقاً لهذه الشروط.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">نطاق الخدمات المقدمة</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    تقدم شركة الكارت الأسود مجموعة شاملة من الخدمات التقنية المتطورة:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>تطوير المواقع الإلكترونية:</strong> مواقع تجارية، تعليمية، وحكومية بأحدث التقنيات</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>تطبيقات الويب:</strong> أنظمة إدارة مخصصة وحلول برمجية متقدمة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حلول إدارة الأنظمة:</strong> تصميم وتطوير أنظمة إدارية شاملة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الاستشارات التقنية:</strong> توجيه وإرشاد في اختيار الحلول التقنية المناسبة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>التدريب والدعم:</strong> تدريب الفرق وتقديم الدعم الفني المستمر</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الصيانة والتطوير:</strong> صيانة دورية وتحديثات مستمرة</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">التزامات العميل ومسؤولياته</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    يلتزم العميل بالمسؤوليات التالية:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>دقة المعلومات:</strong> تقديم معلومات صحيحة ودقيقة وكاملة عن المشروع والمتطلبات</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الاستخدام المشروع:</strong> عدم استخدام الخدمات لأغراض غير قانونية أو ضارة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>احترام الملكية الفكرية:</strong> عدم انتهاك حقوق الطبع والنشر أو العلامات التجارية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الالتزام المالي:</strong> دفع الرسوم المستحقة في المواعيد المحددة وفقاً للاتفاق</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>التعاون:</strong> تقديم المحتوى والمواد اللازمة في الوقت المناسب</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الامتثال للقوانين:</strong> ضمان أن المحتوى يتوافق مع قوانين سلطنة عُمان</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">حقوق الملكية الفكرية</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    حقوق الملكية الفكرية للمشاريع المطورة تخضع للاتفاقيات المحددة مع كل عميل:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حقوق العميل:</strong> العميل يحتفظ بحقوق الملكية الفكرية للمحتوى والتصميمات المخصصة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حقوق الشركة:</strong> نحتفظ بحقوق الملكية الفكرية لأدواتنا وتقنياتنا الداخلية وإطارات العمل</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الحقوق المشتركة:</strong> يمكن الاتفاق على حقوق مشتركة للابتكارات المطورة خلال المشروع</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>استخدام العلامة التجارية:</strong> لا يحق لأي طرف استخدام علامة الطرف الآخر دون إذن مكتوب</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">السرية وحماية المعلومات</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    نلتزم بأعلى معايير السرية والحماية:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>سرية تامة:</strong> جميع المعلومات والبيانات التي يقدمها العملاء تعامل بسرية تامة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>عدم الإفشاء:</strong> لا نكشف المعلومات لأطراف ثالثة إلا بموافقة كتابية صريحة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الحماية التقنية:</strong> استخدام أحدث تقنيات الحماية والتشفير</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>تدريب الفريق:</strong> جميع أعضاء فريقنا ملتزمون باتفاقيات السرية</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">حدود المسؤولية والضمانات</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    مسؤوليتنا محددة وفقاً للشروط التالية:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>ضمان الجودة:</strong> نضمن تقديم خدمات عالية الجودة وفقاً للمعايير المتفق عليها</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حدود المسؤولية:</strong> مسؤوليتنا محدودة بقيمة الخدمات المقدمة ولا تشمل الأضرار غير المباشرة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>استثناءات:</strong> لا نتحمل مسؤولية الأضرار الناتجة عن سوء استخدام العميل للخدمة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>القوة القاهرة:</strong> لا نتحمل مسؤولية التأخير الناتج عن ظروف خارجة عن سيطرتنا</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">إنهاء الخدمة وحل النزاعات</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    شروط إنهاء الخدمة وحل النزاعات:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>إنهاء الخدمة:</strong> يحق لأي من الطرفين إنهاء الخدمة بإشعار مسبق وفقاً لشروط العقد</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الالتزامات المالية:</strong> يجب الوفاء بجميع الالتزامات المالية المستحقة حتى تاريخ الإنهاء</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حل النزاعات:</strong> نسعى لحل النزاعات ودياً، وفي حالة عدم التوصل لحل يُحال النزاع للقضاء العُماني</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>استمرارية الالتزامات:</strong> التزامات السرية والملكية الفكرية تستمر حتى بعد انتهاء الخدمة</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">تعديل الشروط والقانون المطبق</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    نحتفظ بالحق في تعديل هذه الشروط مع الإشعار المسبق. جميع الخدمات تخضع لقوانين سلطنة عُمان.
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>التعديلات:</strong> سيتم إشعار العملاء بأي تغييرات جوهرية قبل 30 يوماً من تطبيقها</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>القانون الحاكم:</strong> تخضع هذه الشروط لقوانين سلطنة عُمان حصرياً</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>الاختصاص القضائي:</strong> محاكم سلطنة عُمان هي المختصة بنظر أي نزاع</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-700 p-6 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    <strong>آخر تحديث:</strong> 12 يونيو 2025<br/>
                    <strong>للاستفسارات القانونية:</strong> legal@theblackcard.om<br/>
                    <strong>للاستفسارات العامة:</strong> info@theblackcard.om<br/>
                    <strong>هاتف:</strong> +968 9784 4321
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
