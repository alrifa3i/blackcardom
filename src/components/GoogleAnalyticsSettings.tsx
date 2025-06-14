
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Settings, Save, Eye, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const GoogleAnalyticsSettings = () => {
  const [gaTrackingId, setGaTrackingId] = useState('G-X84CNEM0FW');
  const [conversionId, setConversionId] = useState('AW-CONVERSION_ID');
  const [conversionLabel, setConversionLabel] = useState('CONVERSION_LABEL');
  const [conversionValue, setConversionValue] = useState('1');
  const [currency, setCurrency] = useState('OMR');
  const [facebookPixelId, setFacebookPixelId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // تحميل الإعدادات من قاعدة البيانات
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .in('key', [
          'google_analytics_tracking_id',
          'google_ads_conversion_id',
          'google_ads_conversion_label',
          'google_ads_conversion_value',
          'google_ads_currency',
          'facebook_pixel_id'
        ]);
      
      if (error) throw error;
      
      // تعيين القيم من قاعدة البيانات
      data?.forEach(setting => {
        switch (setting.key) {
          case 'google_analytics_tracking_id':
            setGaTrackingId(setting.value || 'G-X84CNEM0FW');
            break;
          case 'google_ads_conversion_id':
            setConversionId(setting.value || 'AW-CONVERSION_ID');
            break;
          case 'google_ads_conversion_label':
            setConversionLabel(setting.value || 'CONVERSION_LABEL');
            break;
          case 'google_ads_conversion_value':
            setConversionValue(setting.value || '1');
            break;
          case 'google_ads_currency':
            setCurrency(setting.value || 'OMR');
            break;
          case 'facebook_pixel_id':
            setFacebookPixelId(setting.value || '');
            break;
        }
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "خطأ في تحميل الإعدادات",
        description: "سيتم استخدام القيم الافتراضية",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      
      const settingsToSave = [
        { 
          key: 'google_analytics_tracking_id', 
          value: gaTrackingId, 
          category: 'analytics',
          description: 'معرف Google Analytics 4'
        },
        { 
          key: 'google_ads_conversion_id', 
          value: conversionId, 
          category: 'analytics',
          description: 'معرف تحويل Google Ads'
        },
        { 
          key: 'google_ads_conversion_label', 
          value: conversionLabel, 
          category: 'analytics',
          description: 'تسمية التحويل Google Ads'
        },
        { 
          key: 'google_ads_conversion_value', 
          value: conversionValue, 
          category: 'analytics',
          description: 'قيمة التحويل Google Ads'
        },
        { 
          key: 'google_ads_currency', 
          value: currency, 
          category: 'analytics',
          description: 'عملة التحويل Google Ads'
        },
        { 
          key: 'facebook_pixel_id', 
          value: facebookPixelId, 
          category: 'analytics',
          description: 'معرف Facebook Pixel'
        }
      ];

      // حفظ أو تحديث كل إعداد
      for (const setting of settingsToSave) {
        const { error } = await supabase
          .from('system_settings')
          .upsert({
            key: setting.key,
            value: setting.value,
            category: setting.category,
            description: setting.description,
            data_type: 'string',
            is_public: false
          }, {
            onConflict: 'key'
          });
        
        if (error) throw error;
      }
      
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ إعدادات Google Analytics في قاعدة البيانات",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "خطأ في الحفظ",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const testAnalytics = () => {
    // محاكاة اختبار التتبع
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'test_conversion', {
        event_category: 'test',
        event_label: 'dashboard_test',
        value: parseInt(conversionValue),
        currency: currency,
        send_to: conversionId
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
                placeholder="G-X84CNEM0FW"
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleSaveSettings}
              className="bg-yellow-500 text-black hover:bg-yellow-400"
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
            </Button>
            
            <Button 
              onClick={testAnalytics}
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
              disabled={loading}
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
              <li>• تم تعيين المعرف: {gaTrackingId}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAnalyticsSettings;
