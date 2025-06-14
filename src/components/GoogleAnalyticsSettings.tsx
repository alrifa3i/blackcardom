
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Settings, Save, Eye, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GoogleAnalyticsSettings = () => {
  const [gaTrackingId, setGaTrackingId] = useState('G-XXXXXXXXXX');
  const [conversionId, setConversionId] = useState('AW-CONVERSION_ID');
  const [conversionLabel, setConversionLabel] = useState('CONVERSION_LABEL');
  const [conversionValue, setConversionValue] = useState('1');
  const [currency, setCurrency] = useState('OMR');
  const [facebookPixelId, setFacebookPixelId] = useState('');
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // هنا يمكن حفظ الإعدادات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات Google Analytics بنجاح",
    });
  };

  const testAnalytics = () => {
    // محاكاة اختبار التتبع
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'test_conversion', {
        event_category: 'test',
        event_label: 'dashboard_test',
        value: 1,
        currency: currency
      });
      
      toast({
        title: "تم الاختبار",
        description: "تم إرسال حدث اختبار إلى Google Analytics",
      });
    } else {
      toast({
        title: "خطأ في الاختبار",
        description: "Google Analytics غير مفعل",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            إعدادات Google Analytics
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="ga-tracking" className="text-gray-300">معرف Google Analytics 4</Label>
              <Input
                id="ga-tracking"
                value={gaTrackingId}
                onChange={(e) => setGaTrackingId(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="G-XXXXXXXXXX"
              />
              <p className="text-gray-500 text-sm mt-1">يمكن العثور عليه في Google Analytics → الإدارة → معلومات التتبع</p>
            </div>
            
            <div>
              <Label htmlFor="conversion-id" className="text-gray-300">معرف تحويل Google Ads</Label>
              <Input
                id="conversion-id"
                value={conversionId}
                onChange={(e) => setConversionId(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="AW-XXXXXXXXXX"
              />
            </div>
            
            <div>
              <Label htmlFor="conversion-label" className="text-gray-300">تسمية التحويل</Label>
              <Input
                id="conversion-label"
                value={conversionLabel}
                onChange={(e) => setConversionLabel(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="conversion_label"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="conversion-value" className="text-gray-300">قيمة التحويل</Label>
                <Input
                  id="conversion-value"
                  value={conversionValue}
                  onChange={(e) => setConversionValue(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="1"
                />
              </div>
              
              <div>
                <Label htmlFor="currency" className="text-gray-300">العملة</Label>
                <Input
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="OMR"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="facebook-pixel" className="text-gray-300">Facebook Pixel ID (اختياري)</Label>
              <Input
                id="facebook-pixel"
                value={facebookPixelId}
                onChange={(e) => setFacebookPixelId(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Facebook Pixel ID"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleSaveSettings}
              className="bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Save className="h-4 w-4 mr-2" />
              حفظ الإعدادات
            </Button>
            
            <Button 
              onClick={testAnalytics}
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              اختبار التتبع
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            حالة التتبع
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
              <span className="text-gray-300">Google Analytics 4</span>
              <Badge className={gaTrackingId.startsWith('G-') ? "bg-green-500 text-black" : "bg-red-500 text-white"}>
                {gaTrackingId.startsWith('G-') ? "نشط" : "غير مفعل"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
              <span className="text-gray-300">Google Ads Conversion</span>
              <Badge className={conversionId.startsWith('AW-') ? "bg-green-500 text-black" : "bg-red-500 text-white"}>
                {conversionId.startsWith('AW-') ? "نشط" : "غير مفعل"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
              <span className="text-gray-300">Facebook Pixel</span>
              <Badge className={facebookPixelId ? "bg-green-500 text-black" : "bg-gray-500 text-white"}>
                {facebookPixelId ? "نشط" : "معطل"}
              </Badge>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 font-medium">معلومات مهمة</span>
            </div>
            <ul className="text-blue-400 text-sm space-y-1">
              <li>• تأكد من إضافة سكريبت Google Analytics في header الموقع</li>
              <li>• قم بربط موقعك بـ Google Ads لتتبع التحويلات</li>
              <li>• اختبر التتبع قبل تفعيل الحملات الإعلانية</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAnalyticsSettings;
