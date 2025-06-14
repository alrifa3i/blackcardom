import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  MessageSquare,
  Share2,
  HelpCircle,
  Plus,
  Globe,
  Code,
  TrendingUp,
  Zap,
  Package,
  FolderOpen,
  Monitor,
  Smartphone,
  Shield,
  Brain,
  Megaphone,
  FileEdit,
  Home,
  ChevronRight,
  Star,
  Activity,
  Database,
  LogOut
} from 'lucide-react';
import AdminAuth from '@/components/AdminAuth';
import SocialMediaSettings from '@/components/SocialMediaSettings';
import FAQManagement from '@/components/FAQManagement';
import WebsiteProjectsManagement from '@/components/WebsiteProjectsManagement';
import WebApplicationsManagement from '@/components/WebApplicationsManagement';
import WhatsAppAnalytics from '@/components/WhatsAppAnalytics';
import WhatsAppSettings from '@/components/WhatsAppSettings';
import GoogleAdsAnalytics from '@/components/GoogleAdsAnalytics';
import ServicesManagement from '@/components/ServicesManagement';
import ProductsManagement from '@/components/ProductsManagement';
import SpecialServicesManagement from '@/components/SpecialServicesManagement';
import UserManagement from '@/components/UserManagement';
import SystemSettings from '@/components/SystemSettings';
import ActivityLogs from '@/components/ActivityLogs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [currentAdmin, setCurrentAdmin] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // التحقق من جلسة المدير
    const checkAuth = () => {
      const isAuth = localStorage.getItem('admin_authenticated');
      const username = localStorage.getItem('admin_username');
      const loginTime = localStorage.getItem('admin_login_time');
      
      if (isAuth === 'true' && username) {
        setCurrentAdmin({
          username,
          loginTime: loginTime ? new Date(loginTime) : new Date(),
          role: 'admin'
        });
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      // تسجيل نشاط تسجيل الخروج
      const username = localStorage.getItem('admin_username');
      if (username) {
        await supabase.rpc('log_activity', {
          p_action: 'admin_logout',
          p_details: { username, logout_type: 'admin_panel', timestamp: new Date().toISOString() }
        });
      }
      
      // حذف بيانات الجلسة
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_username');
      localStorage.removeItem('admin_login_time');
      
      setIsAuthenticated(false);
      setCurrentAdmin(null);
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "شكراً لاستخدامك لوحة التحكم"
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      
      // حذف بيانات الجلسة حتى لو فشل التسجيل
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_username');
      localStorage.removeItem('admin_login_time');
      setIsAuthenticated(false);
      setCurrentAdmin(null);
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "1,234",
      change: "+12%",
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-500"
    },
    {
      title: "الطلبات الجديدة",
      value: "56",
      change: "+5%",
      icon: <FileText className="h-6 w-6" />,
      color: "text-green-500"
    },
    {
      title: "المشاريع النشطة",
      value: "23",
      change: "+8%",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-yellow-500"
    },
    {
      title: "الرسائل",
      value: "89",
      change: "+15%",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "text-purple-500"
    }
  ];

  const menuSections = [
    {
      title: "النظرة العامة",
      items: [
        { id: 'overview', name: 'لوحة التحكم الرئيسية', icon: Home, description: 'عرض الإحصائيات العامة' }
      ]
    },
    {
      title: "إدارة المحتوى والخدمات",
      items: [
        { id: 'services', name: 'إدارة الخدمات', icon: Zap, description: 'إضافة وتعديل الخدمات الأساسية' },
        { id: 'special-services', name: 'خدماتنا الخاصة', icon: Star, description: 'إدارة الخدمات المميزة والمتخصصة' },
        { id: 'products', name: 'إدارة المنتجات', icon: Package, description: 'إدارة المنتجات والعروض' },
        { id: 'faq', name: 'الأسئلة الشائعة', icon: HelpCircle, description: 'إدارة الأسئلة والأجوبة' }
      ]
    },
    {
      title: "إدارة المشاريع",
      items: [
        { id: 'website-projects', name: 'مشاريع المواقع', icon: Globe, description: 'مشاريع تطوير المواقع' },
        { id: 'web-applications', name: 'تطبيقات الويب', icon: Monitor, description: 'تطبيقات الويب المتقدمة' }
      ]
    },
    {
      title: "التسويق والإعلانات",
      items: [
        { id: 'whatsapp', name: 'تحليلات واتساب', icon: MessageSquare, description: 'إحصائيات المراسلات' },
        { id: 'google-ads', name: 'إعلانات جوجل', icon: TrendingUp, description: 'تحليلات الحملات الإعلانية' },
        { id: 'social', name: 'وسائل التواصل', icon: Share2, description: 'إدارة الشبكات الاجتماعية' }
      ]
    },
    {
      title: "إدارة النظام",
      items: [
        { id: 'users', name: 'إدارة المستخدمين', icon: Users, description: 'إدارة حسابات المستخدمين والأدوار' },
        { id: 'system-settings', name: 'إعدادات النظام', icon: Database, description: 'إعدادات وتكوين النظام' },
        { id: 'activity-logs', name: 'سجل النشاطات', icon: Activity, description: 'مراقبة أنشطة النظام' },
        { id: 'whatsapp-settings', name: 'إعدادات واتساب', icon: Settings, description: 'تكوين أرقام واتساب' }
      ]
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-green-500 text-sm">{stat.change}</p>
                      </div>
                      <div className={stat.color}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* الأنشطة الأخيرة */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-yellow-500">الأنشطة الأخيرة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-yellow-500">المهام المعلقة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-700 rounded">
                    <p className="text-white font-medium">مراجعة طلبات الخدمة</p>
                    <p className="text-gray-400 text-sm">5 طلبات في انتظار المراجعة</p>
                  </div>
                  <div className="p-3 bg-gray-700 rounded">
                    <p className="text-white font-medium">الرد على الرسائل</p>
                    <p className="text-gray-400 text-sm">12 رسالة في انتظار الرد</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'services':
        return <ServicesManagement />;
      case 'special-services':
        return <SpecialServicesManagement />;
      case 'products':
        return <ProductsManagement />;
      case 'website-projects':
        return <WebsiteProjectsManagement />;
      case 'web-applications':
        return <WebApplicationsManagement />;
      case 'whatsapp':
        return <WhatsAppAnalytics />;
      case 'google-ads':
        return <GoogleAdsAnalytics />;
      case 'whatsapp-settings':
        return <WhatsAppSettings />;
      case 'social':
        return <SocialMediaSettings />;
      case 'faq':
        return <FAQManagement />;
      case 'users':
        return <UserManagement />;
      case 'system-settings':
        return <SystemSettings />;
      case 'activity-logs':
        return <ActivityLogs />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* الهيدر */}
      <div className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">لوحة التحكم الإدارية</h1>
              <p className="text-gray-400 text-sm">إدارة شاملة لجميع جوانب النظام</p>
            </div>
            <div className="flex items-center gap-4">
              {currentAdmin && (
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-white font-medium">{currentAdmin.username}</p>
                    <p className="text-gray-400 text-xs">مدير النظام</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
                    {currentAdmin.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
              <Badge className="bg-yellow-500 text-black">مدير النظام</Badge>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* القائمة الجانبية */}
        <div className="w-80 bg-gray-900 border-r border-gray-700 min-h-screen">
          <div className="p-4">
            <div className="space-y-6">
              {menuSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-gray-400 text-sm font-semibold mb-3 px-2">{section.title}</h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-right transition-colors ${
                          activeSection === item.id
                            ? 'bg-yellow-500 text-black'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <div className="flex-1 text-right">
                          <div className="font-medium">{item.name}</div>
                          <div className={`text-xs ${activeSection === item.id ? 'text-black/70' : 'text-gray-500'}`}>
                            {item.description}
                          </div>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${
                          activeSection === item.id ? 'rotate-90' : ''
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
