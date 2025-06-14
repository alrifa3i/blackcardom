
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, Settings, Globe, Shield, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SystemSetting {
  id: string;
  category: string;
  key: string;
  value: string;
  description?: string;
  data_type: 'string' | 'number' | 'boolean' | 'json';
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const SystemSettings = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    category: '',
    key: '',
    value: '',
    description: '',
    data_type: 'string' as const,
    is_public: false
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "خطأ في تحميل الإعدادات",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingSetting) {
        // تحديث إعداد موجود
        const { error } = await supabase
          .from('system_settings')
          .update(formData)
          .eq('id', editingSetting.id);
        
        if (error) throw error;
        
        toast({
          title: "تم تحديث الإعداد بنجاح",
          description: "تم حفظ التغييرات",
        });
      } else {
        // إنشاء إعداد جديد
        const { error } = await supabase
          .from('system_settings')
          .insert([formData]);
        
        if (error) throw error;
        
        toast({
          title: "تم إضافة الإعداد بنجاح",
          description: "تم إنشاء إعداد جديد",
        });
      }

      setIsDialogOpen(false);
      setEditingSetting(null);
      setFormData({ category: '', key: '', value: '', description: '', data_type: 'string', is_public: false });
      fetchSettings();
    } catch (error) {
      console.error('Error saving setting:', error);
      toast({
        title: "خطأ في حفظ الإعداد",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (setting: SystemSetting) => {
    setEditingSetting(setting);
    setFormData({
      category: setting.category,
      key: setting.key,
      value: setting.value,
      description: setting.description || '',
      data_type: setting.data_type,
      is_public: setting.is_public
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الإعداد؟')) return;

    try {
      const { error } = await supabase
        .from('system_settings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "تم حذف الإعداد بنجاح",
        description: "تم إزالة الإعداد من النظام",
      });
      
      fetchSettings();
    } catch (error) {
      console.error('Error deleting setting:', error);
      toast({
        title: "خطأ في حذف الإعداد",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'site': return <Globe className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'features': return <Zap className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    const categoryColors = {
      site: 'bg-blue-500 text-white',
      security: 'bg-red-500 text-white',
      features: 'bg-green-500 text-white',
      default: 'bg-gray-500 text-white'
    };
    
    return (
      <Badge className={categoryColors[category as keyof typeof categoryColors] || categoryColors.default}>
        {getCategoryIcon(category)}
        <span className="mr-1">{category}</span>
      </Badge>
    );
  };

  const categories = ['all', ...Array.from(new Set(settings.map(s => s.category)))];
  const filteredSettings = selectedCategory === 'all' 
    ? settings 
    : settings.filter(s => s.category === selectedCategory);

  const openNewDialog = () => {
    setEditingSetting(null);
    setFormData({ category: '', key: '', value: '', description: '', data_type: 'string', is_public: false });
    setIsDialogOpen(true);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات النظام
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="تصفية حسب الفئة" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">جميع الفئات</SelectItem>
                {categories.slice(1).map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openNewDialog} className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Plus className="mr-2 h-4 w-4" />
                  إضافة إعداد
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-gray-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    {editingSetting ? 'تعديل الإعداد' : 'إضافة إعداد جديد'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="الفئة (مثل: site, security)"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="المفتاح (مثل: site_name)"
                        value={formData.key}
                        onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                        required
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="القيمة"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      required
                      rows={3}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <Input
                      placeholder="الوصف (اختياري)"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Select value={formData.data_type} onValueChange={(value: any) => setFormData({ ...formData, data_type: value })}>
                        <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                          <SelectValue placeholder="نوع البيانات" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-gray-600">
                          <SelectItem value="string">نص</SelectItem>
                          <SelectItem value="number">رقم</SelectItem>
                          <SelectItem value="boolean">صحيح/خطأ</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_public"
                        checked={formData.is_public}
                        onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="is_public" className="text-white">إعداد عام</label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
                  >
                    {loading ? 'جاري الحفظ...' : (editingSetting ? 'تحديث الإعداد' : 'إضافة الإعداد')}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredSettings.map((setting) => (
            <div key={setting.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryBadge(setting.category)}
                    <h3 className="text-white font-medium">{setting.key}</h3>
                    {setting.is_public && (
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        عام
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      {setting.data_type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-300 text-sm font-mono bg-gray-800 p-2 rounded">
                      {setting.value}
                    </p>
                    {setting.description && (
                      <p className="text-gray-400 text-xs">{setting.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(setting)}
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(setting.id)}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredSettings.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">لا توجد إعدادات في هذه الفئة</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemSettings;
