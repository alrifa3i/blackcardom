
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { trackWhatsAppClick } from '@/utils/googleAnalytics';
import { getAnalyticsSettings } from '@/config/analytics';

const WhatsAppButton = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeNameEn, setEmployeeNameEn] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showArabic, setShowArabic] = useState(true);
  const [analyticsConfig, setAnalyticsConfig] = useState(null);
  const [isClicking, setIsClicking] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const omanEmployees = [
    { ar: 'أحمد المحروقي', en: 'Ahmed Al-Mahroqi' },
    { ar: 'فاطمة البوسعيدية', en: 'Fatima Al-Busaidi' },
    { ar: 'خالد الغافري', en: 'Khalid Al-Ghafri' },
    { ar: 'عائشة الريامية', en: 'Aisha Al-Riyami' },
    { ar: 'محمد الحارثي', en: 'Mohammed Al-Harthi' },
    { ar: 'زينب البلوشية', en: 'Zainab Al-Balushi' },
    { ar: 'سعيد المعمري', en: 'Said Al-Mamari' },
    { ar: 'مريم الكندية', en: 'Maryam Al-Kindi' },
    { ar: 'عبدالرحمن الشامسي', en: 'Abdulrahman Al-Shamsi' },
    { ar: 'نورا الزدجالية', en: 'Nora Al-Zadjali' }
  ];

  useEffect(() => {
    // تحميل إعدادات Analytics من قاعدة البيانات
    const loadAnalyticsConfig = async () => {
      const config = await getAnalyticsSettings();
      setAnalyticsConfig(config);
    };

    loadAnalyticsConfig();

    // اختيار موظف عشوائي عند تحميل الصفحة
    const randomEmployee = omanEmployees[Math.floor(Math.random() * omanEmployees.length)];
    setEmployeeName(randomEmployee.ar);
    setEmployeeNameEn(randomEmployee.en);
    
    // إظهار الزر بعد ثانيتين
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // تناوب الأسماء كل 3 ثوانٍ
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setShowArabic(prev => !prev);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // إعداد الاستماع للتحديثات الفورية
  useEffect(() => {
    console.log('WhatsApp Button: Setting up realtime subscription...');
    
    const channel = supabase
      .channel('whatsapp-button-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'whatsapp_contacts'
        },
        (payload) => {
          console.log('🟢 WhatsApp Button: New contact detected:', payload);
          // تحديث العداد
          setClickCount(prev => prev + 1);
          
          // إضافة تأثير بصري
          setIsClicking(true);
          setTimeout(() => setIsClicking(false), 1000);
        }
      )
      .subscribe((status) => {
        console.log('WhatsApp Button: Realtime subscription status:', status);
      });

    return () => {
      console.log('WhatsApp Button: Cleaning up realtime subscription...');
      supabase.removeChannel(channel);
    };
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
      console.log('🔄 WhatsApp Button: Logging contact...');
      const location = await getVisitorLocation();
      
      const contactData = {
        visitor_location: location,
        employee_name: employeeName,
        user_agent: navigator.userAgent || '',
        ip_address: '',
        page_url: window.location.href
      };

      console.log('📝 WhatsApp Button: Contact data to insert:', contactData);

      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .insert(contactData)
        .select();

      if (error) {
        console.error('❌ WhatsApp Button: Error logging contact:', error);
        return null;
      }

      console.log('✅ WhatsApp Button: Contact logged successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ WhatsApp Button: Exception in logWhatsAppContact:', error);
      return null;
    }
  };

  const handleWhatsAppClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // إضافة تأثير النقر
    setIsClicking(true);
    
    console.log('🎯 WhatsApp Button: Button clicked with analytics config:', analyticsConfig);
    
    try {
      // Track analytics with current configuration from database
      if (analyticsConfig) {
        trackWhatsAppClick({
          employeeName,
          pageUrl: window.location.href,
          pageTitle: document.title
        }, analyticsConfig.googleAdsConversion);
      }
      
      // تسجيل جهة الاتصال
      const contactResult = await logWhatsAppContact();
      console.log('📊 WhatsApp Button: Contact logging result:', contactResult);
      
      const firstName = employeeName.split(' ')[0];
      const message = `السلام عليكم، أود التواصل معكم بخصوص خدماتكم. تحدثت مع ${firstName}`;
      const whatsappUrl = `https://wa.me/96897844321?text=${encodeURIComponent(message)}`;
      
      // تحسين فتح الرابط للموبايل
      if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // للموبايل: استخدام location.href مباشرة
        window.location.href = whatsappUrl;
      } else {
        // للديسك توب: فتح في نافذة جديدة
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('❌ WhatsApp Button: Error in click handler:', error);
      // في حالة حدوث خطأ، جرب فتح الرابط مباشرة
      window.location.href = `https://wa.me/96897844321?text=${encodeURIComponent('السلام عليكم، أود التواصل معكم بخصوص خدماتكم')}`;
    } finally {
      // إزالة تأثير النقر بعد ثانية
      setTimeout(() => setIsClicking(false), 1000);
    }
  };

  if (!isVisible) return null;

  const currentName = showArabic ? employeeName.split(' ')[0] : employeeNameEn.split(' ')[0];

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className="relative group">
        {/* عداد المراسلات المباشر */}
        {clickCount > 0 && (
          <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse z-10">
            {clickCount}
          </div>
        )}

        {/* زر الواتساب */}
        <button
          onClick={handleWhatsAppClick}
          className={`relative bg-green-500 hover:bg-green-600 active:bg-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer touch-manipulation ${
            isClicking ? 'animate-bounce scale-125 bg-green-400' : ''
          }`}
          style={{ 
            minWidth: '50px',
            minHeight: '50px',
            boxShadow: isClicking 
              ? '0 4px 30px rgba(34, 197, 94, 0.8)' 
              : '0 4px 20px rgba(34, 197, 94, 0.4)',
            zIndex: 9999
          }}
          type="button"
          aria-label="تواصل عبر الواتساب"
        >
          {/* أيقونة الواتساب */}
          <svg 
            viewBox="0 0 24 24" 
            className={`h-6 w-6 sm:h-8 sm:w-8 fill-white transition-transform duration-300 ${
              isClicking ? 'scale-110' : ''
            }`}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.63"/>
          </svg>
          
          {/* نقطة الحالة */}
          <div className="absolute -top-1 -right-1">
            <div className={`w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white transition-all duration-300 ${
              isClicking ? 'animate-ping scale-125' : 'animate-pulse'
            }`}></div>
          </div>
        </button>
        
        {/* بطاقة المعلومات - محدثة للموبايل */}
        <div className="absolute bottom-16 right-0 sm:bottom-20 sm:right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 p-3 sm:p-4 rounded-2xl shadow-xl border border-gray-200 min-w-[180px] sm:min-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-3 h-3 bg-green-500 rounded-full transition-all duration-300 ${
                isClicking ? 'animate-ping' : 'animate-pulse'
              }`}></div>
              <div className="flex-1">
                <div 
                  className="font-semibold text-sm transition-all duration-500 ease-in-out transform"
                  key={currentName}
                >
                  {currentName}
                </div>
                <div className="text-xs text-gray-500">خدمة العملاء</div>
              </div>
            </div>
            <div className="text-xs text-green-600 font-medium">
              متاح للرد الفوري
            </div>
            {clickCount > 0 && (
              <div className="text-xs text-blue-600 font-medium mt-1">
                {clickCount} مراسلة جديدة
              </div>
            )}
            
            {/* مؤشر السهم */}
            <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white/95 border-r border-b border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
