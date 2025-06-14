
import { 
  Users, 
  Settings, 
  BarChart3, 
  MessageSquare,
  Share2,
  HelpCircle,
  Globe,
  Monitor,
  TrendingUp,
  Zap,
  Package,
  Star,
  Home,
  Activity,
  Database
} from 'lucide-react';

export const menuSections = [
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
