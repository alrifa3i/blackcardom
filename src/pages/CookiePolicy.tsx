
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 pt-16">
            <Badge className="mb-4 bg-yellow-500 text-black">سياسة الكوكيز</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">سياسة ملفات تعريف الارتباط</h1>
            <p className="text-xl text-gray-300">
              معلومات شاملة حول استخدامنا لملفات تعريف الارتباط في موقع شركة الكارت الأسود
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">ما هي ملفات تعريف الارتباط (الكوكيز)؟</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right space-y-4">
                <p>
                  ملفات تعريف الارتباط (الكوكيز) هي ملفات نصية صغيرة يتم حفظها على جهازك (الكمبيوتر، الهاتف الذكي، أو الجهاز اللوحي) عند زيارة موقعنا الإلكتروني. تساعدنا هذه الملفات في:
                </p>
                <ul className="space-y-2 mr-6">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>تحسين تجربتك أثناء تصفح الموقع</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>تذكر تفضيلاتك وإعداداتك</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>تحليل كيفية استخدام الموقع لتطويره</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>تقديم خدمات مخصصة ومحتوى ملائم</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">أنواع الكوكيز التي نستخدمها</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <div className="space-y-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">1. الكوكيز الأساسية (ضرورية)</h3>
                    <p className="mb-2">هذه الكوكيز ضرورية لتشغيل الموقع بشكل صحيح ولا يمكن تعطيلها:</p>
                    <ul className="space-y-1 mr-4">
                      <li>• تسجيل الدخول والأمان</li>
                      <li>• حفظ سلة التسوق أو الطلبات</li>
                      <li>• تفضيلات اللغة والعملة</li>
                      <li>• إعدادات الخصوصية</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">2. كوكيز الأداء والتحليل</h3>
                    <p className="mb-2">تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا:</p>
                    <ul className="space-y-1 mr-4">
                      <li>• عدد الزوار والصفحات المشاهدة</li>
                      <li>• مصادر الزيارات (محركات البحث، وسائل التواصل)</li>
                      <li>• الوقت المستغرق في كل صفحة</li>
                      <li>• تحديد الصفحات الأكثر شعبية</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">3. كوكيز الوظائف والتخصيص</h3>
                    <p className="mb-2">تتذكر اختياراتك وتفضيلاتك لتحسين تجربتك:</p>
                    <ul className="space-y-1 mr-4">
                      <li>• إعدادات الموقع المفضلة</li>
                      <li>• المحتوى المخصص بناءً على اهتماماتك</li>
                      <li>• حفظ النماذج المملوءة جزئياً</li>
                      <li>• تذكر الخدمات التي تصفحتها</li>
                    </ul>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">4. كوكيز التسويق والإعلان (اختيارية)</h3>
                    <p className="mb-2">تُستخدم لتقديم إعلانات أكثر صلة بك:</p>
                    <ul className="space-y-1 mr-4">
                      <li>• تتبع زياراتك عبر مواقع مختلفة</li>
                      <li>• بناء ملف تعريفي لاهتماماتك</li>
                      <li>• تقديم إعلانات مخصصة</li>
                      <li>• قياس فعالية الحملات الإعلانية</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">كيفية إدارة والتحكم في الكوكيز</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p className="mb-4">
                  يمكنك التحكم في الكوكيز وإدارتها من خلال عدة طرق:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">إعدادات المتصفح</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Chrome:</strong> الإعدادات ← الخصوصية والأمان ← ملفات تعريف الارتباط وبيانات المواقع الأخرى</li>
                      <li><strong>Firefox:</strong> الإعدادات ← الخصوصية والأمان ← ملفات تعريف الارتباط وبيانات المواقع</li>
                      <li><strong>Safari:</strong> التفضيلات ← الخصوصية ← إدارة بيانات الموقع</li>
                      <li><strong>Edge:</strong> الإعدادات ← ملفات تعريف الارتباط وأذونات الموقع</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-2">أدوات إدارة الخصوصية</h4>
                    <p>يمكنك أيضاً استخدام أدوات وإضافات متصفح مثل:</p>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>Ghostery - لحجب الكوكيز التتبعية</li>
                      <li>Privacy Badger - لمنع التتبع</li>
                      <li>uBlock Origin - لحجب الإعلانات والتتبع</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">الخدمات الخارجية والكوكيز</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p className="mb-4">
                  قد نستخدم خدمات من أطراف ثالثة موثوقة قد تضع كوكيز على جهازك:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span><strong>Google Analytics:</strong> لتحليل حركة المرور وسلوك المستخدمين</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span><strong>وسائل التواصل الاجتماعي:</strong> أزرار المشاركة من فيسبوك، تويتر، لينكد إن</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span><strong>خدمات الدفع:</strong> للمعاملات الآمنة عبر الإنترنت</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span><strong>خدمات العملاء:</strong> أدوات الدردشة المباشرة والدعم</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">موافقتك وحقوقك</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <div className="space-y-4">
                  <p>
                    باستخدام موقعنا، فإنك توافق على استخدام الكوكيز وفقاً لهذه السياسة. لديك الحق في:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>قبول أو رفض الكوكيز:</strong> يمكنك اختيار قبول أو رفض أنواع معينة من الكوكيز</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>حذف الكوكيز:</strong> إزالة الكوكيز المحفوظة على جهازك في أي وقت</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>تغيير الإعدادات:</strong> تعديل تفضيلات الكوكيز متى شئت</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span><strong>السؤال والاستفسار:</strong> الحصول على مزيد من المعلومات حول استخدامنا للكوكيز</span>
                    </li>
                  </ul>
                  
                  <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 p-4 rounded-lg mt-4">
                    <p className="text-yellow-400 font-semibold">ملاحظة مهمة:</p>
                    <p className="text-gray-300 mt-2">
                      إذا اخترت تعطيل الكوكيز الأساسية، قد لا تعمل بعض وظائف الموقع بشكل صحيح. الكوكيز الأساسية ضرورية لضمان أمان وسلاسة تجربتك.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">تحديثات السياسة</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p className="mb-4">
                  قد نقوم بتحديث سياسة الكوكيز من وقت لآخر لتعكس التغييرات في ممارساتنا أو لأسباب تشغيلية أو قانونية أو تنظيمية. سننشر أي تغييرات على هذه الصفحة ونحدث تاريخ "آخر تحديث".
                </p>
                <p className="text-gray-400">
                  نوصي بمراجعة هذه السياسة بانتظام للبقاء على اطلاع بكيفية استخدامنا للكوكيز.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500 text-right">اتصل بنا</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 text-right">
                <p className="mb-4">
                  إذا كان لديك أي أسئلة حول سياسة الكوكيز هذه أو ترغب في ممارسة حقوقك، يرجى التواصل معنا:
                </p>
                <div className="bg-gray-700 p-6 rounded-lg">
                  <div className="space-y-2">
                    <p><strong className="text-yellow-500">البريد الإلكتروني:</strong> privacy@theblackcard.om</p>
                    <p><strong className="text-yellow-500">الهاتف:</strong> +968 9784 4321</p>
                    <p><strong className="text-yellow-500">العنوان:</strong> مسقط، سلطنة عُمان</p>
                    <p><strong className="text-yellow-500">ساعات العمل:</strong> الأحد - الخميس، 8:00 ص - 6:00 م</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  <strong>آخر تحديث:</strong> 12 يونيو 2025
                </p>
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
