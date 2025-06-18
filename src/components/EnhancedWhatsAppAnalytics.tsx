
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, MapPin, Clock, User, TrendingUp, BarChart3, RefreshCw, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const EnhancedWhatsAppAnalytics = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState(0);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);

  const { data: contacts, isLoading, refetch } = useQuery({
    queryKey: ['enhanced-whatsapp-contacts'],
    queryFn: async () => {
      console.log('Enhanced: Fetching WhatsApp contacts...');
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) {
        console.error('Enhanced: Error fetching WhatsApp contacts:', error);
        throw error;
      }
      
      console.log('Enhanced: WhatsApp contacts fetched:', data?.length || 0, 'contacts');
      return data;
    },
    refetchInterval: realtimeEnabled ? 3000 : false,
  });

  // إعداد التحديثات الفورية المحسن
  useEffect(() => {
    if (!realtimeEnabled) return;

    console.log('Enhanced: Setting up WhatsApp realtime subscription...');

    const channel = supabase
      .channel('enhanced-whatsapp-analytics')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'whatsapp_contacts'
        },
        (payload) => {
          console.log('🟢 Enhanced: New WhatsApp contact received:', payload);
          setLiveUpdates(prev => prev + 1);
          
          // تحديث البيانات تلقائياً
          refetch();
          
          // إضافة تأثير بصري
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
          console.log('🔄 Enhanced: WhatsApp contact updated:', payload);
          refetch();
        }
      )
      .subscribe((status) => {
        console.log('Enhanced: WhatsApp realtime subscription status:', status);
      });

    return () => {
      console.log('Enhanced: Cleaning up WhatsApp realtime subscription...');
      supabase.removeChannel(channel);
    };
  }, [realtimeEnabled, refetch]);

  const handleRefresh = async () => {
    setRefreshing(true);
    console.log('Enhanced: Manual refresh triggered');
    await refetch();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const toggleRealtime = () => {
    setRealtimeEnabled(!realtimeEnabled);
    console.log('Enhanced: Realtime toggled to:', !realtimeEnabled);
  };

  // إحصائيات متقدمة
  const totalContacts = contacts?.length || 0;
  const todayContacts = contacts?.filter(contact => 
    new Date(contact.created_at).toDateString() === new Date().toDateString()
  ).length || 0;
  
  const yesterdayContacts = contacts?.filter(contact => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(contact.created_at).toDateString() === yesterday.toDateString();
  }).length || 0;

  const weekContacts = contacts?.filter(contact => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return new Date(contact.created_at) >= weekAgo;
  }).length || 0;

  const employeeStats = contacts?.reduce((acc: Record<string, number>, contact) => {
    acc[contact.employee_name] = (acc[contact.employee_name] || 0) + 1;
    return acc;
  }, {}) || {};

  // إحصائيات بالساعة لليوم الحالي - محسنة مع التحديثات الفورية
  const hourlyStats = contacts?.filter(contact => 
    new Date(contact.created_at).toDateString() === new Date().toDateString()
  ).reduce((acc: Record<number, number>, contact) => {
    const hour = new Date(contact.created_at).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {}) || {};

  // إحصائيات آخر 30 دقيقة للتحديثات الفورية
  const last30MinutesContacts = contacts?.filter(contact => {
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
    return new Date(contact.created_at) >= thirtyMinutesAgo;
  }).length || 0;

  console.log('Enhanced analytics state:', {
    totalContacts,
    todayContacts,
    liveUpdates,
    realtimeEnabled,
    last30MinutesContacts
  });

  return (
    <div className="space-y-6">
      {/* إشعار التحديثات المباشرة */}
      {liveUpdates > 0 && (
        <div className="bg-green-500 text-white p-3 rounded-lg flex items-center gap-2 animate-pulse">
          <Zap className="h-4 w-4" />
          <span>تم استلام {liveUpdates} مراسلة جديدة!</span>
        </div>
      )}

      {/* إحصائيات سريعة محسنة مع التحديثات الفورية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700 relative overflow-hidden">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-300">{totalContacts}</div>
            <div className="text-green-200 text-sm">إجمالي المراسلات</div>
            <div className="text-green-400 text-xs mt-1">منذ البداية</div>
            {realtimeEnabled && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700 relative overflow-hidden">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-yellow-300">{todayContacts}</div>
            <div className="text-yellow-200 text-sm">مراسلات اليوم</div>
            <div className="text-yellow-400 text-xs mt-1">
              {todayContacts > yesterdayContacts ? '+' : ''}{todayContacts - yesterdayContacts} من أمس
            </div>
            {liveUpdates > 0 && (
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-300">{last30MinutesContacts}</div>
            <div className="text-blue-200 text-sm">آخر 30 دقيقة</div>
            <div className="text-blue-400 text-xs mt-1">تحديث مباشر</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-300">{weekContacts}</div>
            <div className="text-purple-200 text-sm">هذا الأسبوع</div>
            <div className="text-purple-400 text-xs mt-1">آخر 7 أيام</div>
          </CardContent>
        </Card>
      </div>

      {/* التوزيع الزمني المحسن بالساعة مع التحديثات الفورية */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            التوزيع الزمني لليوم (بالساعة) - مباشر
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={toggleRealtime} 
              variant={realtimeEnabled ? "default" : "outline"}
              size="sm"
              className={realtimeEnabled ? "bg-green-500 text-white" : "border-gray-500 text-gray-400"}
            >
              <Zap className="h-4 w-4 mr-1" />
              {realtimeEnabled ? 'مباشر' : 'غير مباشر'}
            </Button>
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={refreshing}
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
            {Array.from({ length: 24 }, (_, hour) => {
              const hourlyCount = hourlyStats[hour] || 0;
              const maxCount = Math.max(...Object.values(hourlyStats), 1);
              const heightPercentage = hourlyCount > 0 ? (hourlyCount / maxCount) * 100 : 0;
              const currentHour = new Date().getHours();
              const isCurrentHour = hour === currentHour;
              
              return (
                <div key={hour} className="text-center">
                  <div className={`text-xs mb-1 ${isCurrentHour ? 'text-yellow-400 font-bold' : 'text-gray-400'}`}>
                    {hour}:00
                  </div>
                  <div className="h-8 bg-gray-700 rounded flex items-end justify-center relative">
                    <div 
                      className={`rounded-b w-full transition-all duration-500 ${
                        isCurrentHour 
                          ? 'bg-yellow-500 animate-pulse' 
                          : hourlyCount > 0 
                            ? 'bg-green-500' 
                            : 'bg-gray-600'
                      }`}
                      style={{ 
                        height: `${heightPercentage}%`,
                        minHeight: hourlyCount > 0 ? '8px' : '0px'
                      }}
                    ></div>
                    {isCurrentHour && hourlyCount > 0 && (
                      <div className="absolute -top-1 w-full h-full bg-yellow-400 opacity-30 rounded animate-ping"></div>
                    )}
                  </div>
                  <div className={`text-xs mt-1 ${isCurrentHour ? 'text-yellow-400 font-bold' : 'text-gray-300'}`}>
                    {hourlyCount}
                  </div>
                  {isCurrentHour && (
                    <div className="text-xs text-yellow-500 font-bold mt-1">الآن</div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* مؤشر الوقت الحقيقي */}
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${realtimeEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-gray-300">
                  {realtimeEnabled ? 'التحديث المباشر مفعل' : 'التحديث المباشر متوقف'}
                </span>
              </div>
              <div className="text-gray-400">
                آخر تحديث: {new Date().toLocaleTimeString('ar-EG')}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات الموظفين المحسنة */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <User className="h-5 w-5" />
            أداء الموظفين - مباشر
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-3">
            {Object.entries(employeeStats)
              .sort(([,a], [,b]) => b - a)
              .map(([employee, count], index) => {
                const percentage = totalContacts > 0 ? ((count / totalContacts) * 100).toFixed(1) : '0';
                const isTopPerformer = index < 3;
                
                return (
                  <div key={employee} className={`flex items-center justify-between p-3 bg-gray-700 rounded-lg transition-all duration-300 ${
                    isTopPerformer ? 'ring-2 ring-yellow-500 ring-opacity-50' : ''
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        index === 0 ? 'bg-yellow-500 text-black animate-pulse' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-gray-300 font-medium">{employee}</span>
                      {index === 0 && (
                        <Badge className="bg-yellow-500 text-black animate-pulse">
                          الأول
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-white font-bold">{count} مراسلة</div>
                        <div className="text-gray-400 text-xs">{percentage}% من الإجمالي</div>
                      </div>
                      <Badge className="bg-green-500 text-black">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        نشط
                      </Badge>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* آخر المراسلات مع التحديثات الفورية */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            آخر المراسلات - تحديث مباشر
            {liveUpdates > 0 && (
              <Badge className="bg-red-500 text-white animate-bounce">
                {liveUpdates} جديد
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-gray-400">جاري التحميل...</div>
              </div>
            ) : contacts?.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                <div className="text-gray-400">لا توجد مراسلات حالياً</div>
              </div>
            ) : (
              contacts?.slice(0, 20).map((contact, index) => {
                const isRecent = new Date(contact.created_at) > new Date(Date.now() - 5 * 60 * 1000); // آخر 5 دقائق
                
                return (
                  <Card key={contact.id} className={`bg-gray-700 border-gray-600 hover:border-yellow-500 transition-all duration-300 ${
                    isRecent ? 'ring-2 ring-green-500 ring-opacity-50 bg-green-900 bg-opacity-20' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-green-500" />
                            <span className="text-white font-medium">{contact.employee_name}</span>
                            <Badge variant="outline" className="text-xs">
                              ID: {contact.id.slice(0, 8)}
                            </Badge>
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                              <Clock className="h-3 w-3" />
                              {new Date(contact.created_at).toLocaleString('ar-EG')}
                            </div>
                            
                            {contact.visitor_location && contact.visitor_location !== 'غير محدد' && (
                              <div className="flex items-center gap-2 text-gray-400">
                                <MapPin className="h-3 w-3" />
                                <span className="text-xs truncate">{contact.visitor_location}</span>
                              </div>
                            )}
                          </div>
                          
                          {contact.page_url && (
                            <div className="text-gray-500 text-xs mt-2 p-2 bg-gray-800 rounded">
                              <strong>الصفحة:</strong> {contact.page_url.split('/').pop() || 'الرئيسية'}
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
        </CardContent>
      </Card>

      {/* معلومات التشخيص المحسنة */}
      <div className="text-xs text-gray-500 p-3 bg-gray-900 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="font-semibold">حالة الاتصال:</span> متصل
          </div>
          <div>
            <span className="font-semibold">التحديث المباشر:</span> {realtimeEnabled ? 'مفعل' : 'متوقف'}
          </div>
          <div>
            <span className="font-semibold">إجمالي المراسلات:</span> {totalContacts}
          </div>
          <div>
            <span className="font-semibold">آخر تحديث:</span> {new Date().toLocaleTimeString('ar-EG')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWhatsAppAnalytics;
