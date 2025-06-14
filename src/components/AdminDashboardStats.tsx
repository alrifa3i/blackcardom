
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, BarChart3, MessageSquare } from 'lucide-react';

const AdminDashboardStats = () => {
  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "1,234",
      change: "+12%",
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-500"
    },
    {
      title: "الطلبات الجديدة",
      value: "56",
      change: "+5%",
      icon: <FileText className="h-6 w-6" />,
      color: "text-green-500"
    },
    {
      title: "المشاريع النشطة",
      value: "23",
      change: "+8%",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-yellow-500"
    },
    {
      title: "الرسائل",
      value: "89",
      change: "+15%",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-800 border-gray-700 hover:border-yellow-500 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-green-500 text-sm">{stat.change}</p>
              </div>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboardStats;
