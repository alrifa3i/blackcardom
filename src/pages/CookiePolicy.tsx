
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black">سياسة الكوكيز</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">سياسة الكوكيز</h1>
              <p className="text-xl text-gray-300">
                كيف نستخدم ملفات تعريف الارتباط لتحسين تجربتك
              </p>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">ما هي الكوكيز؟</h2>
                  <p className="text-gray-300 leading-relaxed">
                    الكوكيز هي ملفات نصية صغيرة يتم حفظها على جهازك عند زيارة موقعنا الإلكتروني. تساعدنا هذه الملفات في تذكر تفضيلاتك وتحسين تجربة استخدامك للموقع.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">أنواع الكوكيز المستخدمة</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">الكوكيز الأساسية</h3>
                      <p className="text-gray-300">
                        ضرورية لعمل الموقع بشكل صحيح وتشمل:
                      </p>
                      <ul className="mt-2 space-y-1 text-gray-300">
                        <li>• حفظ إعدادات تسجيل الدخول</li>
                        <li>• تذكر اللغة المفضلة</li>
                        <li>• ضمان أمان الجلسة</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">كوكيز الأداء</h3>
                      <p className="text-gray-300">
                        تساعدنا في فهم كيفية تفاعل الزوار مع الموقع:
                      </p>
                      <ul className="mt-2 space-y-1 text-gray-300">
                        <li>• عدد الزوار وأكثر الصفحات زيارة</li>
                        <li>• مدة البقاء في الموقع</li>
                        <li>• مصادر الزيارة</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">كوكيز الوظائف</h3>
                      <p className="text-gray-300">
                        تحسن من تجربة المستخدم من خلال:
                      </p>
                      <ul className="mt-2 space-y-1 text-gray-300">
                        <li>• تذكر الخيارات والتفضيلات</li>
                        <li>• تخصيص المحتوى</li>
                        <li>• حفظ العناصر في قائمة المفضلة</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">إدارة الكوكيز</h2>
                  <p className="text-gray-300 leading-relaxed">
                    يمكنك التحكم في الكوكيز من خلال إعدادات متصفحك:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-300">
                    <li>• <strong>Chrome:</strong> الإعدادات > الخصوصية والأمان > الكوكيز</li>
                    <li>• <strong>Firefox:</strong> الخيارات > الخصوصية والأمان</li>
                    <li>• <strong>Safari:</strong> التفضيلات > الخصوصية</li>
                    <li>• <strong>Edge:</strong> الإعدادات > الكوكيز والأذونات</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">كوكيز الطرف الثالث</h2>
                  <p className="text-gray-300 leading-relaxed">
                    قد نستخدم خدمات طرف ثالث مثل Google Analytics لتحليل الأداء. هذه الخدمات قد تضع كوكيز خاصة بها وفقاً لسياساتها الخاصة.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">التحديثات</h2>
                  <p className="text-gray-300 leading-relaxed">
                    قد نحدث سياسة الكوكيز هذه من وقت لآخر. ننصحك بمراجعة هذه الصفحة دورياً للاطلاع على أي تغييرات.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-yellow-500 mb-4">الاتصال بنا</h2>
                  <p className="text-gray-300 leading-relaxed">
                    إذا كان لديك أي أسئلة حول استخدامنا للكوكيز، يرجى التواصل معنا عبر: cookies@theblackcard.om
                  </p>
                </div>

                <div className="bg-gray-700 p-6 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    آخر تحديث: ديسمبر 2024. باستمرارك في استخدام موقعنا، فإنك توافق على استخدام الكوكيز وفقاً لهذه السياسة.
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

export default CookiePolicy;
