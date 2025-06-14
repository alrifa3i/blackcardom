
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Edit2, Trash2, Eye, EyeOff, Users, Mail, Phone, Calendar } from 'lucide-react';
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
  created_at: string;
  updated_at: string;
  last_login?: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'viewer' as const,
    status: 'active' as const,
    phone: '',
    department: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "خطأ في تحميل المستخدمين",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUser) {
        // تحديث مستخدم موجود
        const { error } = await supabase
          .from('profiles')
          .update({
            username: formData.username,
            role: formData.role,
            status: formData.status,
            phone: formData.phone,
            department: formData.department
          })
          .eq('id', editingUser.id);
        
        if (error) throw error;
        
        toast({
          title: "تم تحديث المستخدم بنجاح",
          description: "تم حفظ التغييرات",
        });
      } else {
        toast({
          title: "إنشاء المستخدمين",
          description: "يتم إنشاء المستخدمين الجدد عند التسجيل في النظام",
        });
      }

      setIsDialogOpen(false);
      setEditingUser(null);
      setFormData({ username: '', email: '', role: 'viewer', status: 'active', phone: '', department: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      toast({
        title: "خطأ في حفظ المستخدم",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: UserProfile) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      department: user.department || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "تم حذف المستخدم بنجاح",
        description: "تم إزالة المستخدم من النظام",
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "خطأ في حذف المستخدم",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const toggleUserStatus = async (user: UserProfile) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({
        title: newStatus === 'active' ? "تم تفعيل المستخدم" : "تم إيقاف المستخدم",
        description: "تم تحديث حالة المستخدم",
      });
      
      fetchUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast({
        title: "خطأ في تحديث المستخدم",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const getRoleBadge = (role: string) => {
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
      <Badge className={roleColors[role as keyof typeof roleColors]}>
        {roleNames[role as keyof typeof roleNames]}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: 'bg-green-500 text-white',
      inactive: 'bg-gray-500 text-white',
      suspended: 'bg-red-500 text-white'
    };
    
    const statusNames = {
      active: 'نشط',
      inactive: 'غير نشط',
      suspended: 'موقوف'
    };
    
    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {statusNames[status as keyof typeof statusNames]}
      </Badge>
    );
  };

  const openNewDialog = () => {
    setEditingUser(null);
    setFormData({ username: '', email: '', role: 'viewer', status: 'active', phone: '', department: '' });
    setIsDialogOpen(true);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Users className="h-5 w-5" />
            إدارة المستخدمين
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog} className="bg-yellow-500 text-black hover:bg-yellow-400">
                <Plus className="mr-2 h-4 w-4" />
                تعديل المستخدم
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {editingUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="اسم المستخدم"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={!!editingUser}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="اختر الدور" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="viewer">مشاهد</SelectItem>
                        <SelectItem value="editor">محرر</SelectItem>
                        <SelectItem value="moderator">مشرف</SelectItem>
                        <SelectItem value="admin">مدير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="اختر الحالة" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="active">نشط</SelectItem>
                        <SelectItem value="inactive">غير نشط</SelectItem>
                        <SelectItem value="suspended">موقوف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder="رقم الهاتف"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="القسم"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  {loading ? 'جاري الحفظ...' : (editingUser ? 'تحديث المستخدم' : 'إضافة المستخدم')}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback className="bg-yellow-500 text-black">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-medium">{user.username}</h3>
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {user.phone}
                      </div>
                    )}
                    {user.department && (
                      <div>القسم: {user.department}</div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      انضم في: {new Date(user.created_at).toLocaleDateString('ar')}
                    </div>
                    {user.last_login && (
                      <div>آخر دخول: {new Date(user.last_login).toLocaleDateString('ar')}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(user)}
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleUserStatus(user)}
                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
                  >
                    {user.status === 'active' ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(user.id)}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {users.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">لا يوجد مستخدمين حالياً</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
