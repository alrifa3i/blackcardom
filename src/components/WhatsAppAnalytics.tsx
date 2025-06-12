
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, MapPin, Clock, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const WhatsAppAnalytics = () => {
  const { data: contacts, isLoading } = useQuery({
    queryKey: ['whatsapp-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('whatsapp_contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    }
  });

  const totalContacts = contacts?.length || 0;
  const todayContacts = contacts?.filter(contact => 
    new Date(contact.created_at).toDateString() === new Date().toDateString()
  ).length || 0;

  const employeeStats = contacts?.reduce((acc: any, contact) => {
    acc[contact.employee_name] = (acc[contact.employee_name] || 0) + 1;
    return acc;
  }, {}) || {};

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-yellow-500 flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          تحليلات واتساب
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{totalContacts}</div>
              <div className="text-gray-300 text-sm">إجمالي المراسلات</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{todayContacts}</div>
              <div className="text-gray-300 text-sm">مراسلات اليوم</div>
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
            إحصائيات الموظفين
          </h3>
          <div className="grid gap-2">
            {Object.entries(employeeStats).map(([employee, count]) => (
              <div key={employee} className="flex items-center justify-between p-3 bg-gray-700 rounded">
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
              contacts?.map((contact) => (
                <Card key={contact.id} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="h-4 w-4 text-green-500" />
                          <span className="text-white font-medium">{contact.employee_name}</span>
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
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppAnalytics;
