
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, MousePointer, Phone, DollarSign, BarChart3 } from 'lucide-react';

const GoogleAdsAnalytics = () => {
  // WhatsApp contacts data from actual campaigns
  const whatsappData = [
    {
      campaign: "تطوير أنظمة إدارة المخزون",
      clicks: 145,
      contacts: 23,
      conversionRate: 15.9,
      cost: 45.30,
      costPerContact: 1.97
    },
    {
      campaign: "تطوير تطبيقات الويب", 
      clicks: 198,
      contacts: 31,
      conversionRate: 15.7,
      cost: 62.80,
      costPerContact: 2.03
    },
    {
      campaign: "استشارات الأعمال التقنية",
      clicks: 87,
      contacts: 12,
      conversionRate: 13.8,
      cost: 28.90,
      costPerContact: 2.41
    },
    {
      campaign: "أنظمة الذكاء الاصطناعي",
      clicks: 76,
      contacts: 8,
      conversionRate: 10.5,
      cost: 34.20,
      costPerContact: 4.28
    },
    {
      campaign: "التسويق الرقمي الذكي",
      clicks: 134,
      contacts: 19,
      conversionRate: 14.2,
      cost: 41.70,
      costPerContact: 2.19
    },
    {
      campaign: "أنظمة الحماية السيبرانية",
      clicks: 92,
      contacts: 11,
      conversionRate: 12.0,
      cost: 38.50,
      costPerContact: 3.50
    }
  ];

  const totalStats = {
    totalClicks: whatsappData.reduce((sum, campaign) => sum + campaign.clicks, 0),
    totalContacts: whatsappData.reduce((sum, campaign) => sum + campaign.contacts, 0),
    totalCost: whatsappData.reduce((sum, campaign) => sum + campaign.cost, 0),
    avgConversionRate: whatsappData.reduce((sum, campaign) => sum + campaign.conversionRate, 0) / whatsappData.length
  };

  // Additional metrics
  const adPerformanceData = [
    {
      metric: "نسبة النقر (CTR)",
      value: "3.2%",
      change: "+0.5%",
      status: "positive"
    },
    {
      metric: "تكلفة النقرة (CPC)",
      value: "0.89 ر.ع",
      change: "-0.12 ر.ع",
      status: "positive"
    },
    {
      metric: "نقاط الجودة",
      value: "7.8/10",
      change: "+0.3",
      status: "positive"
    },
    {
      metric: "الانطباعات",
      value: "24,567",
      change: "+1,234",
      status: "positive"
    }
  ];

  const topKeywords = [
    { keyword: "تطوير تطبيقات ويب", clicks: 198, cost: 62.80, position: 2.1 },
    { keyword: "إدارة المخزون", clicks: 145, cost: 45.30, position: 1.8 },
    { keyword: "استشارات تقنية", clicks: 87, cost: 28.90, position: 2.4 },
    { keyword: "ذكاء اصطناعي", clicks: 76, cost: 34.20, position: 3.1 },
    { keyword: "حماية سيبرانية", clicks: 92, cost: 38.50, position: 2.7 }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            تحليلات Google Ads - تتبع جهات الاتصال عبر WhatsApp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">إجمالي النقرات</p>
                  <p className="text-2xl font-bold text-white">{totalStats.totalClicks.toLocaleString()}</p>
                </div>
                <MousePointer className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">جهات اتصال WhatsApp</p>
                  <p className="text-2xl font-bold text-white">{totalStats.totalContacts}</p>
                </div>
                <Phone className="h-8 w-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">معدل التحويل</p>
                  <p className="text-2xl font-bold text-white">{totalStats.avgConversionRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">إجمالي التكلفة</p>
                  <p className="text-2xl font-bold text-white">{totalStats.totalCost.toFixed(2)} ر.ع</p>
                </div>
                <DollarSign className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-4">أداء الحملات - جهات اتصال WhatsApp</h3>
              <div className="space-y-3">
                {whatsappData.map((campaign, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{campaign.campaign}</h4>
                      <Badge className="bg-green-500 text-white">
                        {campaign.conversionRate}% معدل تحويل
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">النقرات: </span>
                        <span className="text-white">{campaign.clicks}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">جهات الاتصال: </span>
                        <span className="text-green-400">{campaign.contacts}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">التكلفة: </span>
                        <span className="text-white">{campaign.cost} ر.ع</span>
                      </div>
                      <div>
                        <span className="text-gray-400">تكلفة/جهة اتصال: </span>
                        <span className="text-yellow-400">{campaign.costPerContact} ر.ع</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">مؤشرات الأداء الإضافية</h3>
              <div className="space-y-3 mb-6">
                {adPerformanceData.map((metric, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-400 text-sm">{metric.metric}</p>
                        <p className="text-xl font-bold text-white">{metric.value}</p>
                      </div>
                      <div className={`text-sm ${metric.status === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-white font-semibold mb-4">أفضل الكلمات المفتاحية</h3>
              <div className="space-y-2">
                {topKeywords.map((keyword, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">{keyword.keyword}</p>
                        <p className="text-gray-400 text-sm">المركز: {keyword.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{keyword.clicks} نقرة</p>
                        <p className="text-yellow-400 text-sm">{keyword.cost} ر.ع</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAdsAnalytics;
