
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, Activity, Clock, Filter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ActivityLog {
  id: string;
  user_id?: string;
  action: string;
  resource_type?: string;
  resource_id?: string;
  details: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  profiles?: {
    username: string;
    email: string;
  };
}

const ActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [logs, searchTerm, actionFilter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activity_logs')
        .select(`
          *,
          profiles:user_id(username, email)
        `)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast({
        title: "خطأ في تحميل سجل النشاطات",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.profiles?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.profiles?.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (actionFilter !== 'all') {
      filtered = filtered.filter(log => log.action === actionFilter);
    }

    setFilteredLogs(filtered);
  };

  const getActionBadge = (action: string) => {
    const actionColors = {
      user_registered: 'bg-green-500 text-white',
      user_login: 'bg-blue-500 text-white',
      user_logout: 'bg-gray-500 text-white',
      settings_updated: 'bg-orange-500 text-white',
      service_created: 'bg-purple-500 text-white',
      service_updated: 'bg-yellow-500 text-black',
      service_deleted: 'bg-red-500 text-white',
      default: 'bg-gray-600 text-white'
    };

    const actionNames = {
      user_registered: 'تسجيل مستخدم',
      user_login: 'تسجيل دخول',
      user_logout: 'تسجيل خروج',
      settings_updated: 'تحديث إعدادات',
      service_created: 'إنشاء خدمة',
      service_updated: 'تحديث خدمة',
      service_deleted: 'حذف خدمة',
    };

    return (
      <Badge className={actionColors[action as keyof typeof actionColors] || actionColors.default}>
        {actionNames[action as keyof typeof actionNames] || action}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('ar'),
      time: date.toLocaleTimeString('ar')
    };
  };

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-gray-400">جاري تحميل سجل النشاطات...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            سجل النشاطات
          </CardTitle>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400 text-sm">آخر 100 نشاط</span>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <Input
              placeholder="البحث في النشاطات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="w-48">
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="تصفية حسب النشاط" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">جميع النشاطات</SelectItem>
                {uniqueActions.map(action => (
                  <SelectItem key={action} value={action}>{action}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const dateTime = formatDate(log.created_at);
            
            return (
              <div key={log.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getActionBadge(log.action)}
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Clock className="h-3 w-3" />
                        {dateTime.date} - {dateTime.time}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {log.profiles && (
                        <div className="flex items-center gap-1 text-gray-300 text-sm">
                          <User className="h-3 w-3" />
                          <span>{log.profiles.username} ({log.profiles.email})</span>
                        </div>
                      )}
                      
                      {log.resource_type && (
                        <div className="text-gray-400 text-sm">
                          المورد: {log.resource_type}
                          {log.resource_id && ` - ${log.resource_id}`}
                        </div>
                      )}
                      
                      {log.details && Object.keys(log.details).length > 0 && (
                        <div className="bg-gray-800 p-2 rounded text-xs text-gray-300 font-mono">
                          {JSON.stringify(log.details, null, 2)}
                        </div>
                      )}
                      
                      {log.ip_address && (
                        <div className="text-gray-500 text-xs">
                          IP: {log.ip_address}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">
                {searchTerm || actionFilter !== 'all' 
                  ? 'لا توجد نشاطات تطابق المرشحات المحددة'
                  : 'لا توجد نشاطات مسجلة حالياً'
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLogs;
