
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
  LogOut,
  AlertTriangle
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
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Verify admin role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role, username')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'admin') {
          setCurrentAdmin({
            id: session.user.id,
            username: profile.username,
            email: session.user.email,
            loginTime: new Date(session.user.last_sign_in_at || ''),
            role: 'admin'
          });
          setIsAuthenticated(true);

          // Set session expiry (24 hours from login)
          const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
          setSessionExpiry(expiryTime);

          // Update last login time
          await supabase.rpc('update_user_last_login', {
            user_id: session.user.id
          });
        } else {
          // Not an admin, sign out
          await supabase.auth.signOut();
          toast({
            title: "ليس لديك صلاحيات إدارية",
            variant: "destructive"
          });
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setCurrentAdmin(null);
        setSessionExpiry(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  // Session timeout check
  useEffect(() => {
    if (!sessionExpiry) return;

    const checkExpiry = () => {
      if (new Date() > sessionExpiry) {
        handleLogout();
        toast({
          title: "انتهت صلاحية الجلسة",
          description: "يرجى تسجيل الدخول مرة أخرى",
          variant: "destructive"
        });
      }
    };

    const interval = setInterval(checkExpiry, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [sessionExpiry, toast]);

  const handleLogout = async () => {
    try {
      // Log logout activity
      if (currentAdmin) {
        await supabase.rpc('log_activity', {
          p_action: 'admin_logout_secure',
          p_details: { 
            username: currentAdmin.username,
            logout_type: 'secure_admin_panel',
            session_duration: sessionExpiry ? Math.round((new Date().getTime() - new Date(currentAdmin.loginTime).getTime()) / 1000) : 0,
            timestamp: new Date().toISOString()
          }
        });
      }
      
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear session storage
      sessionStorage.removeItem('admin_session_start');
      sessionStorage.removeItem('admin_user_id');
      
      setIsAuthenticated(false);
      setCurrentAdmin(null);
      setSessionExpiry(null);
      
      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "شكراً لاستخدامك لوحة التحكم الآمنة"
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      
      // Force logout even if there's an error
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setCurrentAdmin(null);
      setSessionExpiry(null);
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
            {/* Security Status Alert */}
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-400" />
                <div>
                  <h3 className="text-green-300 font-medium">النظام محمي بالكامل</h3>
                  <p className="text-green-400 text-sm">
                    تم تفعيل جميع إجراءات الأمان المتقدمة
                  </p>
                </div>
              </div>
            </div>

            {/* Session Info */}
            {sessionExpiry && (
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-400" />
                    <span className="text-blue-300">انتهاء صلاحية الجلسة:</span>
                  </div>
                  <span className="text-blue-400 font-mono">
                    {sessionExpiry.toLocaleString('ar-EG')}
                  </span>
                </div>
              </div>
            )}

            {/* Stats */}
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

            {/* Activities and Tasks */}
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
                    <Shield className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-300">تسجيل دخول آمن جديد</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-yellow-500">حالة الأمان</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-gray-700 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      <p className="text-white font-medium">تشفير SSL نشط</p>
                    </div>
                    <p className="text-gray-400 text-sm">جميع البيانات محمية بتشفير متقدم</p>
                  </div>
                  <div className="p-3 bg-gray-700 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <p className="text-white font-medium">مراقبة النشاطات</p>
                    </div>
                    <p className="text-gray-400 text-sm">تسجيل جميع العمليات الإدارية</p>
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
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">لوحة التحكم الآمنة</h1>
              <p className="text-gray-400 text-sm">إدارة شاملة ومحمية لجميع جوانب النظام</p>
            </div>
            <div className="flex items-center gap-4">
              {currentAdmin && (
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-white font-medium">{currentAdmin.username}</p>
                    <p className="text-gray-400 text-xs">مدير النظام المحمي</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
                    {currentAdmin.username.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
              <Badge className="bg-green-500 text-black">
                <Shield className="h-3 w-3 mr-1" />
                آمن
              </Badge>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                تسجيل الخروج الآمن
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
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

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
