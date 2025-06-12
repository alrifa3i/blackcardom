
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const WhatsAppButton = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const omanEmployeeNames = [
    'أحمد بن سالم المحروقي',
    'فاطمة بنت محمد البوسعيدية',
    'خالد بن علي الغافري',
    'عائشة بنت سعيد الريامية',
    'محمد بن حمد الحارثي',
    'زينب بنت يوسف البلوشية',
    'سعيد بن راشد المعمري',
    'مريم بنت عبدالله الكندية',
    'عبدالرحمن بن سليمان الشامسي',
    'نورا بنت أحمد الزدجالية'
  ];

  useEffect(() => {
    // اختيار اسم موظف عشوائي عند تحميل الصفحة
    const randomName = omanEmployeeNames[Math.floor(Math.random() * omanEmployeeNames.length)];
    setEmployeeName(randomName);
    
    // إظهار الزر بعد ثانيتين
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getVisitorLocation = (): Promise<string> => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude}, ${longitude}`);
          },
          () => resolve('غير محدد')
        );
      } else {
        resolve('غير محدد');
      }
    });
  };

  const logWhatsAppContact = async () => {
    try {
      const location = await getVisitorLocation();
      
      await supabase.from('whatsapp_contacts').insert({
        visitor_location: location,
        employee_name: employeeName,
        user_agent: navigator.userAgent,
        ip_address: null, // سيتم الحصول عليه من الخادم
        page_url: window.location.href
      });
    } catch (error) {
      console.error('Error logging WhatsApp contact:', error);
    }
  };

  const handleWhatsAppClick = async () => {
    await logWhatsAppContact();
    
    const message = `السلام عليكم، أود التواصل معكم بخصوص خدماتكم. تحدثت مع ${employeeName}`;
    const whatsappUrl = `https://wa.me/96897844321?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Notification badge */}
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
          متاح الآن
        </div>
        
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 animate-bounce"
          style={{ animationDuration: '2s' }}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        
        {/* Employee info tooltip */}
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm font-semibold">تواصل معنا</p>
          <p className="text-xs text-gray-300">موظف الخدمة: {employeeName}</p>
          <p className="text-xs text-green-400">متاح للرد الفوري</p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
