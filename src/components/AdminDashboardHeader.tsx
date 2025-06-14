
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, LogOut } from 'lucide-react';

interface AdminDashboardHeaderProps {
  currentAdmin: any;
  sessionExpiry: Date | null;
  onLogout: () => Promise<void>;
}

const AdminDashboardHeader: React.FC<AdminDashboardHeaderProps> = ({
  currentAdmin,
  sessionExpiry,
  onLogout
}) => {
  return (
    <div className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">لوحة التحكم الآمنة</h1>
            <p className="text-gray-400 text-sm">إدارة شاملة ومحمية لجميع جوانب النظام</p>
          </div>
          <div className="flex items-center gap-4">
            {currentAdmin && (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-white font-medium">{currentAdmin.username}</p>
                  <p className="text-gray-400 text-xs">مدير النظام المحمي</p>
                </div>
                <div className="w-10 h-10 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
                  {currentAdmin.username.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <Badge className="bg-green-500 text-black">
              <Shield className="h-3 w-3 mr-1" />
              آمن
            </Badge>
            <Button 
              onClick={onLogout}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              تسجيل الخروج الآمن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
