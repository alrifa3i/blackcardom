
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
                نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية
              </p>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">جمع المعلومات</h2>
                  <p className="text-gray-300 leading-relaxed">
                    نجمع المعلومات التي تقدمها لنا طوعاً عند التسجيل في خدماتنا أو التواصل معنا. تشمل هذه المعلومات:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-300">
                    <li>• الاسم الكامل</li>
                    <li>• عنوان البريد الإلكتروني</li>
                    <li>• رقم الهاتف</li>
                    <li>• معلومات الشركة أو المؤسسة</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">استخدام المعلومات</h2>
                  <p className="text-gray-300 leading-relaxed">
                    نستخدم المعلومات التي نجمعها للأغراض التالية:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-300">
                    <li>• تقديم وتحسين خدماتنا</li>
                    <li>• التواصل معك بخصوص طلباتك واستفساراتك</li>
                    <li>• إرسال التحديثات والإشعارات المهمة</li>
                    <li>• تخصيص تجربتك مع منصتنا</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">حماية البيانات</h2>
                  <p className="text-gray-300 leading-relaxed">
                    نطبق تدابير أمنية متقدمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الكشف. نستخدم تشفير SSL ونتبع أفضل الممارسات الأمنية في الصناعة.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">مشاركة المعلومات</h2>
                  <p className="text-gray-300 leading-relaxed">
                    لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-300">
                    <li>• عند الحصول على موافقتك الصريحة</li>
                    <li>• لتقديم الخدمات المطلوبة</li>
                    <li>• للامتثال للقوانين المعمول بها</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">حقوقك</h2>
                  <p className="text-gray-300 leading-relaxed">
                    لديك الحق في:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-300">
                    <li>• الوصول إلى معلوماتك الشخصية</li>
                    <li>• تصحيح أو تحديث معلوماتك</li>
                    <li>• طلب حذف معلوماتك</li>
                    <li>• سحب موافقتك في أي وقت</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">الاتصال بنا</h2>
                  <p className="text-gray-300 leading-relaxed">
                    إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر البريد الإلكتروني: privacy@theblackcard.om
                  </p>
                </div>

                <div className="bg-gray-700 p-6 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    آخر تحديث: ديسمبر 2024. نحتفظ بالحق في تحديث هذه السياسة في أي وقت.
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
