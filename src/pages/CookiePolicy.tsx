
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">سياسة الكوكيز</h1>
            <p className="text-xl text-gray-300">
              معلومات حول استخدام ملفات تعريف الارتباط في موقعنا
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">ما هي ملفات تعريف الارتباط؟</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p className="mb-4">
                  ملفات تعريف الارتباط (الكوكيز) هي ملفات نصية صغيرة يتم حفظها على جهازك عند زيارة موقعنا الإلكتروني. تساعدنا هذه الملفات في تحسين تجربتك وتقديم خدمات أفضل.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">أنواع الكوكيز التي نستخدمها</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">الكوكيز الأساسية</h3>
                    <p>ضرورية لتشغيل الموقع بشكل صحيح ولا يمكن تعطيلها.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">كوكيز الأداء</h3>
                    <p>تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا لتحسين الأداء.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">كوكيز الوظائف</h3>
                    <p>تتذكر اختياراتك وتفضيلاتك لتحسين تجربتك.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">كيفية إدارة الكوكيز</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p className="mb-4">
                  يمكنك التحكم في الكوكيز وحذفها من خلال إعدادات متصفحك. إليك كيفية القيام بذلك في المتصفحات الشائعة:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Chrome:</strong> الإعدادات {'>'} الخصوصية والأمان {'>'} ملفات تعريف الارتباط وبيانات المواقع الأخرى</li>
                  <li><strong>Firefox:</strong> الإعدادات {'>'} الخصوصية والأمان {'>'} ملفات تعريف الارتباط وبيانات المواقع</li>
                  <li><strong>Safari:</strong> التفضيلات {'>'} الخصوصية {'>'} إدارة بيانات الموقع</li>
                  <li><strong>Edge:</strong> الإعدادات {'>'} ملفات تعريف الارتباط وأذونات الموقع</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">موافقتك</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p>
                  باستخدام موقعنا، فإنك توافق على استخدام الكوكيز وفقاً لهذه السياسة. إذا كنت لا توافق على استخدام الكوكيز، يرجى تعطيلها من خلال إعدادات متصفحك أو تجنب استخدام الموقع.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">تحديثات السياسة</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p>
                  قد نقوم بتحديث سياسة الكوكيز من وقت لآخر. سننشر أي تغييرات على هذه الصفحة ونحدث تاريخ "آخر تحديث" أعلاه.
                </p>
                <p className="mt-4 text-sm text-gray-400">
                  آخر تحديث: 12 يونيو 2025
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">اتصل بنا</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p>
                  إذا كان لديك أي أسئلة حول سياسة الكوكيز هذه، يرجى التواصل معنا عبر:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>البريد الإلكتروني:</strong> privacy@theblackcard.com</p>
                  <p><strong>الهاتف:</strong> +968 1234 5678</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;
