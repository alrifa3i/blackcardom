
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Download, ExternalLink, Book } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <section className="py-20 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 md:px-6 pt-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-yellow-500 text-black">التوثيق</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">مركز التوثيق</h1>
              <p className="text-xl text-gray-300">
                دليل شامل لاستخدام خدماتنا ومنتجاتنا التقنية
              </p>
            </div>

            <Tabs defaultValue="apis" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                <TabsTrigger value="apis" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  واجهات البرمجة
                </TabsTrigger>
                <TabsTrigger value="integration" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  التكامل
                </TabsTrigger>
                <TabsTrigger value="tutorials" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  الدروس التعليمية
                </TabsTrigger>
                <TabsTrigger value="examples" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                  أمثلة الكود
                </TabsTrigger>
              </TabsList>

              <TabsContent value="apis" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-yellow-500 flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        REST API
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">
                        واجهة برمجة تطبيقات RESTful لإدارة البيانات والخدمات
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">الإصدار:</span>
                          <span className="text-white">v2.1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">آخر تحديث:</span>
                          <span className="text-white">ديسمبر 2024</span>
                        </div>
                      </div>
                      <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        عرض التوثيق
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-yellow-500 flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        GraphQL API
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">
                        واجهة GraphQL لاستعلامات مرنة وفعالة
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">الإصدار:</span>
                          <span className="text-white">v1.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">آخر تحديث:</span>
                          <span className="text-white">نوفمبر 2024</span>
                        </div>
                      </div>
                      <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        عرض التوثيق
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="integration" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500">دليل التكامل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">البدء السريع</h3>
                      <ol className="space-y-2 text-gray-300">
                        <li>1. إنشاء حساب المطور</li>
                        <li>2. الحصول على مفاتيح API</li>
                        <li>3. تثبيت SDK المناسب</li>
                        <li>4. إعداد التكامل الأول</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">المكتبات المدعومة</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['JavaScript', 'Python', 'PHP', 'Java', 'C#', 'Ruby', 'Go', 'Swift'].map((lang) => (
                          <div key={lang} className="bg-gray-700 p-3 rounded text-center">
                            <span className="text-white">{lang}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tutorials" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "إنشاء تطبيق ويب بسيط",
                      description: "تعلم كيفية بناء تطبيق ويب من الصفر باستخدام أدواتنا",
                      duration: "30 دقيقة",
                      level: "مبتدئ"
                    },
                    {
                      title: "تكامل نظام الدفع",
                      description: "دليل خطوة بخطوة لتكامل بوابات الدفع المختلفة",
                      duration: "45 دقيقة",
                      level: "متوسط"
                    },
                    {
                      title: "بناء API متقدم",
                      description: "تطوير واجهة برمجة تطبيقات قابلة للتوسع وآمنة",
                      duration: "60 دقيقة",
                      level: "متقدم"
                    },
                    {
                      title: "أمان التطبيقات",
                      description: "أفضل الممارسات لحماية تطبيقاتك من التهديدات",
                      duration: "40 دقيقة",
                      level: "متوسط"
                    }
                  ].map((tutorial, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">{tutorial.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                            {tutorial.level}
                          </Badge>
                          <Badge variant="outline" className="border-gray-500 text-gray-300">
                            {tutorial.duration}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">{tutorial.description}</p>
                        <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400">
                          <Book className="mr-2 h-4 w-4" />
                          بدء الدرس
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-yellow-500">أمثلة الكود</CardTitle>
                    <p className="text-gray-300">نماذج جاهزة للاستخدام في مشاريعك</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "نموذج تسجيل الدخول",
                          language: "React + TypeScript",
                          description: "نموذج كامل للمصادقة والتحقق"
                        },
                        {
                          title: "لوحة تحكم إدارية",
                          language: "Vue.js",
                          description: "واجهة إدارية متكاملة مع الرسوم البيانية"
                        },
                        {
                          title: "تطبيق محمول",
                          language: "React Native",
                          description: "تطبيق متكامل للهواتف الذكية"
                        },
                        {
                          title: "API خلفي",
                          language: "Node.js + Express",
                          description: "خادم API مع قاعدة بيانات"
                        }
                      ].map((example, index) => (
                        <div key={index} className="bg-gray-700 p-4 rounded-lg">
                          <h4 className="text-white font-semibold mb-2">{example.title}</h4>
                          <p className="text-gray-300 text-sm mb-3">{example.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge className="bg-yellow-500 text-black">{example.language}</Badge>
                            <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-500">
                              <Download className="mr-2 h-3 w-3" />
                              تحميل
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Documentation;
