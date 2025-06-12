
import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const WhatsAppButton = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const omanEmployeeNames = [
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
      <div className="relative group">
        {/* شارة الإشعار */}
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1 animate-pulse shadow-lg">
          متاح الآن
        </div>
        
        {/* زر الواتساب */}
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 animate-bounce flex items-center justify-center"
          style={{ 
            animationDuration: '2s',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            boxShadow: '0 8px 32px rgba(37, 211, 102, 0.3)'
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="h-7 w-7 fill-white"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
          </svg>
        </button>
        
        {/* معلومات الموظف عند التمرير */}
        <div className="absolute bottom-16 right-0 bg-gray-900 text-white p-3 rounded-lg shadow-xl max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-sm font-semibold">تواصل معنا</p>
          </div>
          <p className="text-xs text-gray-300">موظف الخدمة: {employeeName}</p>
          <p className="text-xs text-green-400">متاح للرد الفوري</p>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
