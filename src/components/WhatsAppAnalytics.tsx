
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, MapPin, Clock, User, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const WhatsAppAnalytics = () => {
  const [liveUpdates, setLiveUpdates] = useState(0);

  const { data: contacts, isLoading, refetch } = useQuery({
    queryKey: ['whatsapp-contacts'],
    queryFn: async () => {
      console.log('Fetching WhatsApp contacts...');
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching WhatsApp contacts:', error);
        throw error;
      }
      
      console.log('WhatsApp contacts fetched:', data?.length || 0, 'contacts');
      return data;
    },
    refetchInterval: 5000,
  });

  // إعداد التحديثات الفورية المحسن
  useEffect(() => {
    console.log('Setting up WhatsApp realtime subscription...');
    
    const channel = supabase
      .channel('whatsapp-analytics-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'whatsapp_contacts'
        },
        (payload) => {
          console.log('🟢 New WhatsApp contact received via realtime:', payload);
          setLiveUpdates(prev => prev + 1);
          
          // تحديث البيانات فوراً
          refetch();
          
          // إزالة التأثير بعد 3 ثوانٍ
          setTimeout(() => {
            setLiveUpdates(prev => Math.max(0, prev - 1));
          }, 3000);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'whatsapp_contacts'
        },
        (payload) => {
          console.log('🔄 WhatsApp contact updated via realtime:', payload);
          refetch();
        }
      )
      .subscribe((status) => {
        console.log('WhatsApp realtime subscription status:', status);
      });

    return () => {
      console.log('Cleaning up WhatsApp realtime subscription...');
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const totalContacts = contacts?.length || 0;
  const todayContacts = contacts?.filter(contact => 
    new Date(contact.created_at).toDateString() === new Date().toDateString()
  ).length || 0;

  const employeeStats = contacts?.reduce((acc: any, contact) => {
    acc[contact.employee_name] = (acc[contact.employee_name] || 0) + 1;
    return acc;
  }, {}) || {};

  console.log('Current analytics state:', {
    totalContacts,
    todayContacts,
    liveUpdates,
    employeeStats
  });

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-yellow-500 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          تحليلات واتساب - مباشر
          {liveUpdates > 0 && (
            <Badge className="bg-red-500 text-white animate-pulse">
              <Zap className="h-3 w-3 mr-1" />
              {liveUpdates} جديد
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* إشعار التحديثات المباشرة */}
        {liveUpdates > 0 && (
          <div className="bg-green-500 text-white p-2 rounded-lg flex items-center gap-2 animate-bounce">
            <Zap className="h-4 w-4" />
            <span className="text-sm">تم استلام {liveUpdates} مراسلة جديدة!</span>
          </div>
        )}

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-700 border-gray-600 relative overflow-hidden">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{totalContacts}</div>
              <div className="text-gray-300 text-sm">إجمالي المراسلات</div>
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-700 border-gray-600 relative overflow-hidden">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{todayContacts}</div>
              <div className="text-gray-300 text-sm">مراسلات اليوم</div>
              {liveUpdates > 0 && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{Object.keys(employeeStats).length}</div>
              <div className="text-gray-300 text-sm">موظفين نشطين</div>
            </CardContent>
          </Card>
        </div>

        {/* إحصائيات الموظفين */}
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <User className="h-4 w-4" />
            إحصائيات الموظفين - مباشر
          </h3>
          <div className="grid gap-2">
            {Object.entries(employeeStats).map(([employee, count]) => (
              <div key={employee} className="flex items-center justify-between p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                <span className="text-gray-300">{employee}</span>
                <Badge className="bg-green-500 text-black">{count as number} مراسلة</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* آخر المراسلات */}
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            آخر المراسلات
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-4">
                <div className="text-gray-400">جاري التحميل...</div>
              </div>
            ) : contacts?.length === 0 ? (
              <div className="text-center py-4">
                <div className="text-gray-400">لا توجد مراسلات حالياً</div>
              </div>
            ) : (
              contacts?.map((contact, index) => {
                const isRecent = new Date(contact.created_at) > new Date(Date.now() - 2 * 60 * 1000); // آخر دقيقتين
                
                return (
                  <Card key={contact.id} className={`bg-gray-700 border-gray-600 transition-all duration-300 ${
                    isRecent ? 'ring-2 ring-green-500 ring-opacity-50 bg-green-900 bg-opacity-20' : ''
                  }`}>
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="h-4 w-4 text-green-500" />
                            <span className="text-white font-medium">{contact.employee_name}</span>
                            {isRecent && (
                              <Badge className="bg-green-500 text-white text-xs animate-pulse">
                                جديد
                              </Badge>
                            )}
                            {index === 0 && (
                              <Badge className="bg-yellow-500 text-black text-xs">
                                الأحدث
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Clock className="h-3 w-3" />
                            {new Date(contact.created_at).toLocaleString('ar-EG')}
                          </div>
                          {contact.visitor_location && contact.visitor_location !== 'غير محدد' && (
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                              <MapPin className="h-3 w-3" />
                              <span className="text-xs">{contact.visitor_location}</span>
                            </div>
                          )}
                          {contact.page_url && (
                            <div className="text-gray-500 text-xs mt-1">
                              الصفحة: {contact.page_url.split('/').pop() || 'الرئيسية'}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* معلومات التشخيص */}
        <div className="text-xs text-gray-500 p-2 bg-gray-900 rounded">
          حالة الاتصال: متصل | إجمالي المراسلات: {totalContacts} | آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppAnalytics;
