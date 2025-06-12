
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Settings, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WhatsAppSettings = () => {
  const [phoneNumber, setPhoneNumber] = useState('+968 9784 4321');
  const [defaultMessage, setDefaultMessage] = useState('السلام عليكم، أود التواصل معكم بخصوص خدماتكم.');
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

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات الواتساب
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
            </div>
            
            <div>
              <Label htmlFor="message" className="text-gray-300">الرسالة الافتراضية</Label>
              <Input
                id="message"
                value={defaultMessage}
                onChange={(e) => setDefaultMessage(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="أدخل الرسالة الافتراضية"
              />
            </div>
          </div>
          
          <Button 
            onClick={handleSaveSettings}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Save className="h-4 w-4 mr-2" />
            حفظ الإعدادات
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            أسماء الموظفين
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-2">
            <p className="text-gray-400 text-sm mb-3">الأسماء التي تظهر عشوائياً للزوار:</p>
            <div className="grid grid-cols-2 gap-2">
              {employeeNames.map((name, index) => (
                <Badge key={index} className="bg-gray-700 text-gray-300 justify-start">
                  {name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSettings;
