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
  Database,
  Briefcase,
  Code,
  MessageCircle,
  Cog,
  FileText
} from 'lucide-react';

export const menuSections = [
  {
    title: "نظرة عامة",
    items: [
      {
        id: "overview",
        name: "الرئيسية",
        description: "نظرة عامة على النظام",
        icon: BarChart3
      }
    ]
  },
  {
    title: "إدارة المحتوى",
    items: [
      {
        id: "services",
        name: "الخدمات",
        description: "إدارة خدمات الشركة",
        icon: Briefcase
      },
      {
        id: "special-services", 
        name: "الخدمات المميزة",
        description: "إدارة الخدمات الخاصة",
        icon: Star
      },
      {
        id: "products",
        name: "المنتجات",
        description: "إدارة منتجات الشركة",
        icon: Package
      },
      {
        id: "website-projects",
        name: "مشاريع المواقع",
        description: "إدارة مشاريع تطوير المواقع",
        icon: Globe
      },
      {
        id: "web-applications",
        name: "تطبيقات الويب",
        description: "إدارة تطبيقات الويب",
        icon: Code
      }
    ]
  },
  {
    title: "التحليلات والإحصائيات",
    items: [
      {
        id: "whatsapp",
        name: "تحليلات الواتساب المتقدمة",
        description: "إحصائيات مفصلة للواتساب",
        icon: MessageCircle
      },
      {
        id: "google-ads",
        name: "تحليلات Google Ads",
        description: "مراقبة الحملات الإعلانية",
        icon: TrendingUp
      },
      {
        id: "google-analytics-settings",
        name: "إعدادات Google Analytics",
        description: "تكوين تتبع التحويلات",
        icon: BarChart3
      }
    ]
  },
  {
    title: "الإعدادات",
    items: [
      {
        id: "whatsapp-settings",
        name: "إعدادات الواتساب",
        description: "تخصيص زر وإعدادات الواتساب",
        icon: Settings
      },
      {
        id: "social",
        name: "وسائل التواصل",
        description: "إدارة روابط التواصل الاجتماعي",
        icon: Share2
      },
      {
        id: "faq",
        name: "الأسئلة الشائعة",
        description: "إدارة الأسئلة والأجوبة",
        icon: HelpCircle
      }
    ]
  },
  {
    title: "إدارة النظام",
    items: [
      {
        id: "users",
        name: "المستخدمين",
        description: "إدارة حسابات المستخدمين",
        icon: Users
      },
      {
        id: "system-settings",
        name: "إعدادات النظام",
        description: "الإعدادات العامة للنظام",
        icon: Cog
      },
      {
        id: "activity-logs",
        name: "سجل الأنشطة",
        description: "مراقبة نشاطات النظام",
        icon: FileText
      }
    ]
  }
];
