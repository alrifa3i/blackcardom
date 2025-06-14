
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Settings, Save, BarChart3, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WhatsAppSettings = () => {
  const [phoneNumber, setPhoneNumber] = useState('+968 9784 4321');
  const [defaultMessage, setDefaultMessage] = useState('السلام عليكم، أود التواصل معكم بخصوص خدماتكم.');
  const [businessHours, setBusinessHours] = useState('من 8:00 صباحاً إلى 10:00 مساءً');
  const [autoReplyMessage, setAutoReplyMessage] = useState('شكراً لتواصلكم معنا! سنرد عليكم في أقرب وقت ممكن.');
  const { toast } = useToast();

  const employeeNames = [
    'أحمد المحروقي',
    'فاطمة البوسعيدية', 
    'خالد الغافري',
    'عائشة الريامية',
    'محمد الحارثي',
    'زينب البلوشية',
    'سعيد المعمري',
    'مريم الكندية',
    'عبدالرحمن الشامسي',
    'نورا الزدجالية'
  ];

  const handleSaveSettings = () => {
    // هنا يمكن حفظ الإعدادات في قاعدة البيانات
    toast({
      title: "تم الحفظ",
      description: "تم حفظ إعدادات الواتساب بنجاح",
    });
  };

  const generateAnalyticsCode = () => {
    const code = `
// كود تتبع الواتساب المحدث
const trackWhatsAppClick = (employeeName) => {
  // تتبع Google Analytics
  if (window.gtag) {
    window.gtag('event', 'whatsapp_contact', {
      event_category: 'engagement',
      event_label: employeeName,
      custom_parameter_1: 'conversion_ready',
      phone_number: '${phoneNumber.replace(/\s/g, '')}',
      business_hours: '${businessHours}'
    });
  }
  
  // تسجيل في قاعدة البيانات
  fetch('/api/whatsapp-contact', {
    method: 'POST',
    body: JSON.stringify({
      employee_name: employeeName,
      phone_number: '${phoneNumber}',
      timestamp: new Date().toISOString()
    })
  });
};`;

    navigator.clipboard.writeText(code);
    toast({
      title: "تم النسخ",
      description: "تم نسخ كود التتبع إلى الحافظة",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات الواتساب الأساسية
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="phone" className="text-gray-300">رقم الواتساب</Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="+968 1234 5678"
              />
              <p className="text-gray-500 text-sm mt-1">تأكد من إضافة رمز الدولة (+968)</p>
            </div>
            
            <div>
              <Label htmlFor="message" className="text-gray-300">الرسالة الافتراضية</Label>
              <Textarea
                id="message"
                value={defaultMessage}
                onChange={(e) => setDefaultMessage(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="أدخل الرسالة الافتراضية"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="hours" className="text-gray-300">ساعات العمل</Label>
              <Input
                id="hours"
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="من 8:00 صباحاً إلى 10:00 مساءً"
              />
            </div>
            
            <div>
              <Label htmlFor="auto-reply" className="text-gray-300">رسالة الرد التلقائي</Label>
              <Textarea
                id="auto-reply"
                value={autoReplyMessage}
                onChange={(e) => setAutoReplyMessage(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="رسالة ترحيب تلقائية"
                rows={2}
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
              onClick={generateAnalyticsCode}
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              نسخ كود التتبع
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Users className="h-5 w-5" />
            أسماء الموظفين للعرض العشوائي
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4">
            <p className="text-gray-400 text-sm">الأسماء التي تظهر عشوائياً للزوار عند النقر على زر الواتساب:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {employeeNames.map((name, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                  <Badge className="bg-gray-600 text-gray-300 justify-start">
                    {name}
                  </Badge>
                  <span className="text-gray-500 text-xs">#{index + 1}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded-lg">
              <h4 className="text-green-300 font-medium mb-2">معلومات التتبع المتقدم:</h4>
              <ul className="text-green-400 text-sm space-y-1">
                <li>• يتم تتبع كل نقرة على زر الواتساب مع اسم الموظف</li>
                <li>• يتم إرسال البيانات إلى Google Analytics فوراً</li>
                <li>• يتم حفظ الموقع الجغرافي للزائر (إذا كان متاحاً)</li>
                <li>• يتم تسجيل الصفحة التي تم النقر منها</li>
                <li>• تحويل البيانات إلى Google Ads للحملات الإعلانية</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            معاينة زر الواتساب
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-600">
            <div className="relative">
              <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center mx-auto">
                <MessageCircle className="h-8 w-8" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white font-medium">تواصل معنا عبر الواتساب</p>
                <p className="text-gray-400 text-sm">{phoneNumber}</p>
                <p className="text-gray-500 text-xs mt-2">{businessHours}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSettings;
