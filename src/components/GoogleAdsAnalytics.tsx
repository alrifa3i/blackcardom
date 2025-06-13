import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  MousePointer, 
  Eye, 
  Users,
  RefreshCw,
  Calendar,
  Target,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GoogleAdsAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  // بيانات وهمية لعرض التحليلات (في التطبيق الحقيقي ستأتي من Google Ads API)
  const [analytics, setAnalytics] = useState({
    totalSpend: 2450,
    impressions: 145000,
    clicks: 3250,
    conversions: 89,
    ctr: 2.24,
    cpc: 0.75,
    conversionRate: 2.74,
    costPerConversion: 27.53,
    whatsappClicks: 156,
    whatsappConversions: 32
  });

  useEffect(() => {
    setLastUpdated(new Date());
  }, []);

  const refreshData = async () => {
    setLoading(true);
    
    // محاكاة تحديث البيانات
    setTimeout(() => {
      setAnalytics(prev => ({
        ...prev,
        totalSpend: prev.totalSpend + Math.floor(Math.random() * 100),
        impressions: prev.impressions + Math.floor(Math.random() * 1000),
        clicks: prev.clicks + Math.floor(Math.random() * 50),
        conversions: prev.conversions + Math.floor(Math.random() * 5),
        whatsappClicks: prev.whatsappClicks + Math.floor(Math.random() * 10),
        whatsappConversions: prev.whatsappConversions + Math.floor(Math.random() * 3)
      }));
      
      setLastUpdated(new Date());
      setLoading(false);
      
      toast({
        title: "تم تحديث البيانات",
        description: "تم تحديث تحليلات Google Ads بنجاح",
      });
    }, 2000);
  };

  const metrics = [
    {
      title: "إجمالي الإنفاق",
      value: `$${analytics.totalSpend.toLocaleString()}`,
      icon: <DollarSign className="h-5 w-5" />,
      change: "+12.5%",
      changeType: "increase"
    },
    {
      title: "مرات الظهور",
      value: analytics.impressions.toLocaleString(),
      icon: <Eye className="h-5 w-5" />,
      change: "+8.3%",
      changeType: "increase"
    },
    {
      title: "النقرات",
      value: analytics.clicks.toLocaleString(),
      icon: <MousePointer className="h-5 w-5" />,
      change: "+15.7%",
      changeType: "increase"
    },
    {
      title: "التحويلات",
      value: analytics.conversions.toString(),
      icon: <Target className="h-5 w-5" />,
      change: "+22.1%",
      changeType: "increase"
    }
  ];

  const whatsappMetrics = [
    {
      title: "نقرات الواتساب من الإعلانات",
      value: analytics.whatsappClicks.toString(),
      description: "عدد النقرات على زر الواتساب من خلال الإعلانات"
    },
    {
      title: "تحويلات الواتساب",
      value: analytics.whatsappConversions.toString(),
      description: "عدد المحادثات التي تمت عبر الواتساب من الإعلانات"
    },
    {
      title: "معدل تحويل الواتساب",
      value: `${((analytics.whatsappConversions / analytics.whatsappClicks) * 100).toFixed(1)}%`,
      description: "نسبة المحادثات إلى النقرات"
    },
    {
      title: "تكلفة التحويل عبر الواتساب",
      value: `$${(analytics.totalSpend / analytics.whatsappConversions).toFixed(2)}`,
      description: "متوسط تكلفة الحصول على محادثة واتساب"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">تحليلات Google Ads - الواتساب</h2>
          <p className="text-gray-400">
            آخر تحديث: {lastUpdated ? lastUpdated.toLocaleString('ar-SA') : 'لم يتم التحديث بعد'}
          </p>
        </div>
        <Button 
          onClick={refreshData}
          disabled={loading}
          className="bg-yellow-500 text-black hover:bg-yellow-400"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'جاري التحديث...' : 'تحديث البيانات'}
        </Button>
      </div>

      {/* إحصائيات عامة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-green-500 text-xs">{metric.change}</span>
                  </div>
                </div>
                <div className="text-yellow-500">
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* إحصائيات الواتساب المخصصة */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            تحليلات الواتساب من Google Ads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatsappMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold">{metric.title}</h3>
                  <Badge className="bg-green-500 text-white">{metric.value}</Badge>
                </div>
                <p className="text-gray-400 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* نصائح التحسين */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500">نصائح لتحسين الأداء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <h4 className="text-blue-400 font-semibold mb-2">💡 نصيحة للتحسين</h4>
              <p className="text-gray-300 text-sm">
                معدل تحويل الواتساب الخاص بك {((analytics.whatsappConversions / analytics.whatsappClicks) * 100).toFixed(1)}%. 
                جرب تحسين نص الإعلان ليشجع على التواصل المباشر عبر الواتساب.
              </p>
            </div>
            
            <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">✅ أداء جيد</h4>
              <p className="text-gray-300 text-sm">
                تكلفة التحويل عبر الواتساب منخفضة نسبياً. استمر في استهداف نفس الجمهور.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <h4 className="text-yellow-400 font-semibold mb-2">⚠️ تحتاج انتباه</h4>
              <p className="text-gray-300 text-sm">
                راقب جودة المحادثات عبر الواتساب للتأكد من أنها تؤدي إلى مبيعات فعلية.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAdsAnalytics;
