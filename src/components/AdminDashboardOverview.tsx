
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Users, FileText, Activity } from 'lucide-react';
import AdminDashboardStats from './AdminDashboardStats';

interface AdminDashboardOverviewProps {
  sessionExpiry: Date | null;
}

const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  sessionExpiry
}) => {
  return (
    <div className="space-y-6">
      {/* Security Status Alert */}
      <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-green-400" />
          <div>
            <h3 className="text-green-300 font-medium">النظام محمي بالكامل</h3>
            <p className="text-green-400 text-sm">
              تم تفعيل جميع إجراءات الأمان المتقدمة
            </p>
          </div>
        </div>
      </div>

      {/* Session Info */}
      {sessionExpiry && (
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-400" />
              <span className="text-blue-300">انتهاء صلاحية الجلسة:</span>
            </div>
            <span className="text-blue-400 font-mono">
              {sessionExpiry.toLocaleString('ar-EG')}
            </span>
          </div>
        </div>
      )}

      {/* Stats */}
      <AdminDashboardStats />

      {/* Activities and Tasks */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500">الأنشطة الأخيرة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <Users className="h-4 w-4 text-green-500" />
              <span className="text-gray-300">مستخدم جديد سجل في النظام</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-gray-300">طلب خدمة جديد تم استلامه</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-700 rounded">
              <Shield className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-300">تسجيل دخول آمن جديد</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-500">حالة الأمان</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-gray-700 rounded">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-green-500" />
                <p className="text-white font-medium">تشفير SSL نشط</p>
              </div>
              <p className="text-gray-400 text-sm">جميع البيانات محمية بتشفير متقدم</p>
            </div>
            <div className="p-3 bg-gray-700 rounded">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-blue-500" />
                <p className="text-white font-medium">مراقبة النشاطات</p>
              </div>
              <p className="text-gray-400 text-sm">تسجيل جميع العمليات الإدارية</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
