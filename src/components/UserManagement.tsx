
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Edit, Save, X, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  avatar_url?: string;
  phone?: string;
  department?: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // تصحيح نوع البيانات
      const typedData = (data || []).map(user => ({
        ...user,
        status: user.status as 'active' | 'inactive' | 'suspended'
      }));
      
      setUsers(typedData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "خطأ في تحميل المستخدمين",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleUpdateUser = async (userId: string, updates: Partial<UserProfile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "تم تحديث المستخدم بنجاح",
        description: "تم حفظ التغييرات",
      });
      
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "خطأ في تحديث المستخدم",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const getRoleBadge = (role: UserProfile['role']) => {
    const roleColors = {
      admin: 'bg-red-500 text-white',
      moderator: 'bg-orange-500 text-white',
      editor: 'bg-blue-500 text-white',
      viewer: 'bg-gray-500 text-white'
    };

    const roleNames = {
      admin: 'مدير',
      moderator: 'مشرف',
      editor: 'محرر',
      viewer: 'مشاهد'
    };

    return (
      <Badge className={roleColors[role]}>
        {roleNames[role]}
      </Badge>
    );
  };

  const getStatusBadge = (status: UserProfile['status']) => {
    const statusColors = {
      active: 'bg-green-500 text-white',
      inactive: 'bg-gray-500 text-white',
      suspended: 'bg-red-500 text-white'
    };

    const statusNames = {
      active: 'نشط',
      inactive: 'غير نشط',
      suspended: 'معلق'
    };

    return (
      <Badge className={statusColors[status]}>
        {statusNames[status]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar');
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-gray-400">جاري تحميل المستخدمين...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Users className="h-5 w-5" />
            إدارة المستخدمين
          </CardTitle>
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400 text-sm">إجمالي: {users.length}</span>
          </div>
        </div>
        
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث عن المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white pl-10"
              />
            </div>
          </div>
          <div className="w-48">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="تصفية حسب الدور" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">جميع الأدوار</SelectItem>
                <SelectItem value="admin">مدير</SelectItem>
                <SelectItem value="moderator">مشرف</SelectItem>
                <SelectItem value="editor">محرر</SelectItem>
                <SelectItem value="viewer">مشاهد</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{user.username}</h3>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <label className="text-gray-400 text-xs">الدور</label>
                      {editingId === user.id ? (
                        <Select 
                          value={user.role} 
                          onValueChange={(value: 'admin' | 'moderator' | 'editor' | 'viewer') => {
                            const updatedUsers = users.map(u => 
                              u.id === user.id ? { ...u, role: value } : u
                            );
                            setUsers(updatedUsers);
                          }}
                        >
                          <SelectTrigger className="bg-gray-600 border-gray-500 text-white h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="admin">مدير</SelectItem>
                            <SelectItem value="moderator">مشرف</SelectItem>
                            <SelectItem value="editor">محرر</SelectItem>
                            <SelectItem value="viewer">مشاهد</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1">{getRoleBadge(user.role)}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-gray-400 text-xs">الحالة</label>
                      {editingId === user.id ? (
                        <Select 
                          value={user.status} 
                          onValueChange={(value: 'active' | 'inactive' | 'suspended') => {
                            const updatedUsers = users.map(u => 
                              u.id === user.id ? { ...u, status: value } : u
                            );
                            setUsers(updatedUsers);
                          }}
                        >
                          <SelectTrigger className="bg-gray-600 border-gray-500 text-white h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="active">نشط</SelectItem>
                            <SelectItem value="inactive">غير نشط</SelectItem>
                            <SelectItem value="suspended">معلق</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1">{getStatusBadge(user.status)}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-gray-400 text-xs">القسم</label>
                      {editingId === user.id ? (
                        <Input
                          value={user.department || ''}
                          onChange={(e) => {
                            const updatedUsers = users.map(u => 
                              u.id === user.id ? { ...u, department: e.target.value } : u
                            );
                            setUsers(updatedUsers);
                          }}
                          className="bg-gray-600 border-gray-500 text-white h-8"
                          placeholder="القسم"
                        />
                      ) : (
                        <div className="text-gray-300 text-sm mt-1">
                          {user.department || 'غير محدد'}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-gray-400 text-xs">تاريخ التسجيل</label>
                      <div className="text-gray-300 text-sm mt-1">
                        {formatDate(user.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {editingId === user.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleUpdateUser(user.id, {
                          role: user.role,
                          status: user.status,
                          department: user.department
                        })}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          fetchUsers(); // إعادة تحميل البيانات الأصلية
                        }}
                        className="border-gray-600 text-gray-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(user.id)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">
                {searchTerm || roleFilter !== 'all' 
                  ? 'لا توجد مستخدمين يطابقون المرشحات المحددة'
                  : 'لا توجد مستخدمين مسجلين حالياً'
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
