
import { 
  BarChart3, 
  Users, 
  Settings, 
  MessageCircle, 
  HelpCircle, 
  Globe, 
  Smartphone, 
  TrendingUp, 
  Eye,
  Wrench,
  Package,
  FolderOpen,
  Code,
  Activity,
  Search
} from 'lucide-react';

export const adminMenuSections = [
  {
    id: 'overview',
    title: 'نظرة عامة',
    icon: BarChart3,
    description: 'إحصائيات ولوحة تحكم عامة'
  },
  {
    id: 'services',
    title: 'إدارة الخدمات',
    icon: Wrench,
    description: 'إدارة خدمات الشركة'
  },
  {
    id: 'special-services',
    title: 'الخدمات المتخصصة',
    icon: Settings,
    description: 'إدارة الخدمات المتخصصة'
  },
  {
    id: 'products',
    title: 'إدارة المنتجات',
    icon: Package,
    description: 'إدارة منتجات الشركة'
  },
  {
    id: 'projects',
    title: 'إدارة المشاريع',
    icon: FolderOpen,
    description: 'إدارة جميع المشاريع'
  },
  {
    id: 'website-projects',
    title: 'مشاريع تصميم المواقع',
    icon: Globe,
    description: 'إدارة مشاريع تصميم المواقع'
  },
  {
    id: 'web-applications',
    title: 'تطبيقات الويب',
    icon: Code,
    description: 'إدارة تطبيقات الويب'
  },
  {
    id: 'whatsapp',
    title: 'تحليلات واتساب',
    icon: MessageCircle,
    description: 'إحصائيات وتحليلات واتساب'
  },
  {
    id: 'google-ads',
    title: 'تحليلات إعلانات جوجل',
    icon: TrendingUp,
    description: 'إحصائيات إعلانات جوجل'
  },
  {
    id: 'google-analytics-settings',
    title: 'إعدادات Google Analytics',
    icon: BarChart3,
    description: 'إعدادات وربط Google Analytics'
  },
  {
    id: 'whatsapp-settings',
    title: 'إعدادات واتساب',
    icon: MessageCircle,
    description: 'إعدادات أرقام واتساب'
  },
  {
    id: 'social',
    title: 'وسائل التواصل',
    icon: Smartphone,
    description: 'إدارة روابط وسائل التواصل'
  },
  {
    id: 'faq',
    title: 'الأسئلة الشائعة',
    icon: HelpCircle,
    description: 'إدارة الأسئلة والأجوبة'
  },
  {
    id: 'users',
    title: 'إدارة المستخدمين',
    icon: Users,
    description: 'إدارة حسابات المستخدمين'
  },
  {
    id: 'system-settings',
    title: 'إعدادات النظام',
    icon: Settings,
    description: 'إعدادات عامة للنظام'
  },
  {
    id: 'activity-logs',
    title: 'سجل الأنشطة',
    icon: Activity,
    description: 'مراجعة سجل أنشطة النظام'
  }
];
