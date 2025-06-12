
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  MessageSquare,
  Share2,
  HelpCircle,
  Plus
} from 'lucide-react';
import AdminAuth from '@/components/AdminAuth';
import SocialMediaSettings from '@/components/SocialMediaSettings';
import FAQManagement from '@/components/FAQManagement';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminAuth onLogin={() => setIsAuthenticated(true)} />;
  }

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "1,234",
      change: "+12%",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "الطلبات الجديدة",
      value: "56",
      change: "+5%",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "المشاريع النشطة",
      value: "23",
      change: "+8%",
      icon: <BarChart3 className="h-6 w-6" />
    },
    {
      title: "الرسائل",
      value: "89",
      change: "+15%",
      icon: <MessageSquare className="h-6 w-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">لوحة التحكم الإدارية</h1>
              <p className="text-gray-400 mt-2">إدارة شاملة لجميع جوانب النظام</p>
            </div>
            <Badge className="bg-yellow-500 text-black">مدير النظام</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-green-500 text-sm">{stat.change}</p>
                  </div>
                  <div className="text-yellow-500">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* التبويبات الرئيسية */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="content" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              المحتوى
            </TabsTrigger>
            <TabsTrigger value="social" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              التواصل الاجتماعي
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              الأسئلة الشائعة
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-white data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-yellow-500">نظرة عامة على النظام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-white font-semibold mb-3">الأنشطة الأخيرة</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
                          <Users className="h-4 w-4 text-green-500" />
                          <span className="text-gray-300">مستخدم جديد سجل في النظام</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="text-gray-300">طلب خدمة جديد تم استلامه</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
                          <MessageSquare className="h-4 w-4 text-yellow-500" />
                          <span className="text-gray-300">رسالة دعم فني جديدة</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-3">المهام المعلقة</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-700 rounded">
                          <p className="text-white font-medium">مراجعة طلبات الخدمة</p>
                          <p className="text-gray-400 text-sm">5 طلبات في انتظار المراجعة</p>
                        </div>
                        <div className="p-3 bg-gray-700 rounded">
                          <p className="text-white font-medium">الرد على الرسائل</p>
                          <p className="text-gray-400 text-sm">12 رسالة في انتظار الرد</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500">إدارة المستخدمين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">قريباً - إدارة شاملة للمستخدمين</p>
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                    <Plus className="mr-2 h-4 w-4" />
                    إضافة مستخدم جديد
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500">إدارة المحتوى</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">قريباً - إدارة المحتوى والصفحات</p>
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                    <Plus className="mr-2 h-4 w-4" />
                    إضافة محتوى جديد
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <SocialMediaSettings />
          </TabsContent>

          <TabsContent value="faq">
            <FAQManagement />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-yellow-500">إعدادات النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">قريباً - إعدادات شاملة للنظام</p>
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-400">
                    <Settings className="mr-2 h-4 w-4" />
                    إدارة الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
