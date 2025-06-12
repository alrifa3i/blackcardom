
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black">سياسة الخصوصية</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">سياسة الخصوصية</h1>
              <p className="text-xl text-gray-300">
                نحن في شركة الكارت الأسود نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية
              </p>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">جمع المعلومات والبيانات</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    نقوم بجمع المعلومات التي تقدمها لنا طوعاً عند استخدام خدماتنا أو التواصل معنا:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>المعلومات الشخصية:</strong> الاسم الكامل، عنوان البريد الإلكتروني، رقم الهاتف</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>معلومات الشركة:</strong> اسم الشركة، طبيعة العمل، المتطلبات التقنية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>بيانات الاستخدام:</strong> معلومات حول كيفية استخدامك لموقعنا وخدماتنا</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>معلومات التواصل:</strong> تفاصيل استفساراتك ومراسلاتك معنا</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">كيفية استخدام المعلومات</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    نستخدم المعلومات التي نجمعها للأغراض المشروعة التالية:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>تقديم وتطوير خدماتنا التقنية بأعلى جودة ممكنة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>التواصل معك بخصوص طلباتك واستفساراتك وتقديم الدعم الفني</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>إرسال التحديثات المهمة حول مشاريعك والخدمات الجديدة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>تخصيص تجربتك وتحسين خدماتنا بناءً على احتياجاتك</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>الامتثال للقوانين المعمول بها في سلطنة عُمان</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">حماية وأمان البيانات</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    نطبق أعلى معايير الأمان لحماية بياناتك:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>تشفير البيانات باستخدام بروتوكولات SSL/TLS المتقدمة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>أنظمة حماية متعددة الطبقات ضد الوصول غير المصرح</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>نسخ احتياطية منتظمة ومؤمنة لضمان استمرارية الخدمة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>تدريب فريقنا على أفضل ممارسات أمان المعلومات</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">مشاركة المعلومات مع الغير</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    نحن ملتزمون بعدم بيع أو تأجير أو مشاركة معلوماتك الشخصية مع أطراف ثالثة، إلا في الحالات المحددة والمشروعة التالية:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>عند حصولنا على موافقتك الصريحة والمكتوبة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>لتقديم الخدمات المطلوبة مع شركاء موثوقين (مع ضمانات الحماية)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>للامتثال للقوانين والأنظمة المعمول بها في السلطنة</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>لحماية حقوقنا القانونية والدفاع عنها عند الضرورة</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">حقوقك كمستخدم</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    لديك الحقوق التالية فيما يتعلق ببياناتك الشخصية:
                  </p>
                  <ul className="mt-4 space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حق الوصول:</strong> طلب نسخة من بياناتك الشخصية المحفوظة لدينا</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حق التصحيح:</strong> تحديث أو تصحيح معلوماتك الشخصية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حق الحذف:</strong> طلب حذف بياناتك الشخصية (في حدود القانون)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حق سحب الموافقة:</strong> إلغاء موافقتك على معالجة بياناتك في أي وقت</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حق النقل:</strong> الحصول على بياناتك بصيغة قابلة للنقل</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">الاتصال بنا</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    لأي استفسارات حول سياسة الخصوصية أو لممارسة حقوقك، يرجى التواصل معنا:
                  </p>
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <div className="space-y-2 text-gray-300">
                      <p><strong className="text-yellow-500">البريد الإلكتروني:</strong> privacy@theblackcard.om</p>
                      <p><strong className="text-yellow-500">الهاتف:</strong> +968 9784 4321</p>
                      <p><strong className="text-yellow-500">العنوان:</strong> مسقط، سلطنة عُمان</p>
                      <p><strong className="text-yellow-500">مسؤول حماية البيانات:</strong> admin@theblackcard.om</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-6 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    <strong>آخر تحديث:</strong> 12 يونيو 2025. نحتفظ بالحق في تحديث هذه السياسة من وقت لآخر. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو عبر موقعنا الإلكتروني.
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

export default PrivacyPolicy;
