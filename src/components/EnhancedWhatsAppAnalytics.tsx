
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, MapPin, Clock, User, TrendingUp, BarChart3, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const EnhancedWhatsAppAnalytics = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: contacts, isLoading, refetch } = useQuery({
    queryKey: ['whatsapp-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      return data;
    }
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 1000);
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

  const employeeStats = contacts?.reduce((acc: any, contact) => {
    acc[contact.employee_name] = (acc[contact.employee_name] || 0) + 1;
    return acc;
  }, {}) || {};

  // إحصائيات بالساعة لليوم الحالي
  const hourlyStats = contacts?.filter(contact => 
    new Date(contact.created_at).toDateString() === new Date().toDateString()
  ).reduce((acc: any, contact) => {
    const hour = new Date(contact.created_at).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {}) || {};

  const conversionRate = totalContacts > 0 ? ((todayContacts / totalContacts) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* إحصائيات سريعة محسنة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-300">{totalContacts}</div>
            <div className="text-green-200 text-sm">إجمالي المراسلات</div>
            <div className="text-green-400 text-xs mt-1">منذ البداية</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-yellow-300">{todayContacts}</div>
            <div className="text-yellow-200 text-sm">مراسلات اليوم</div>
            <div className="text-yellow-400 text-xs mt-1">
              {todayContacts > yesterdayContacts ? '+' : ''}{todayContacts - yesterdayContacts} من أمس
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-300">{weekContacts}</div>
            <div className="text-blue-200 text-sm">هذا الأسبوع</div>
            <div className="text-blue-400 text-xs mt-1">آخر 7 أيام</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-300">{conversionRate}%</div>
            <div className="text-purple-200 text-sm">معدل التحويل</div>
            <div className="text-purple-400 text-xs mt-1">من إجمالي الزيارات</div>
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات بالساعة */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            التوزيع الزمني لليوم (بالساعة)
          </CardTitle>
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
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
            {Array.from({ length: 24 }, (_, hour) => (
              <div key={hour} className="text-center">
                <div className="text-xs text-gray-400 mb-1">{hour}:00</div>
                <div className="h-8 bg-gray-700 rounded flex items-end justify-center">
                  <div 
                    className="bg-yellow-500 rounded-b w-full transition-all duration-300"
                    style={{ 
                      height: `${hourlyStats[hour] ? (hourlyStats[hour] / Math.max(...Object.values(hourlyStats))) * 100 : 0}%`,
                      minHeight: hourlyStats[hour] ? '8px' : '0px'
                    }}
                  ></div>
                </div>
                <div className="text-xs text-gray-300 mt-1">{hourlyStats[hour] || 0}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات الموظفين المحسنة */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <User className="h-5 w-5" />
            أداء الموظفين
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-3">
            {Object.entries(employeeStats)
              .sort(([,a], [,b]) => (b as number) - (a as number))
              .map(([employee, count], index) => {
                const percentage = totalContacts > 0 ? ((count as number / totalContacts) * 100).toFixed(1) : '0';
                return (
                  <div key={employee} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-black' :
                        index === 1 ? 'bg-gray-400 text-black' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-gray-300 font-medium">{employee}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-white font-bold">{count as number} مراسلة</div>
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

      {/* آخر المراسلات */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            آخر المراسلات المفصلة
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
              contacts?.slice(0, 20).map((contact) => (
                <Card key={contact.id} className="bg-gray-700 border-gray-600 hover:border-yellow-500 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-green-500" />
                          <span className="text-white font-medium">{contact.employee_name}</span>
                          <Badge variant="outline" className="text-xs">
                            ID: {contact.id.slice(0, 8)}
                          </Badge>
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedWhatsAppAnalytics;
