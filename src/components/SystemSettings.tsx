import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Save, Plus, Trash2, Edit3 } from 'lucide-react';
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

interface NewSetting {
  category: string;
  key: string;
  value: string;
  description: string;
  data_type: 'string' | 'number' | 'boolean' | 'json';
  is_public: boolean;
}

const SystemSettings = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSetting, setNewSetting] = useState<NewSetting>({
    category: '',
    key: '',
    value: '',
    description: '',
    data_type: 'string',
    is_public: false
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('category', { ascending: true })
        .order('key', { ascending: true });
      
      if (error) throw error;
      
      // تحويل البيانات لضمان التطابق مع النوع المحدد
      const typedSettings: SystemSetting[] = (data || []).map(setting => ({
        ...setting,
        data_type: setting.data_type as 'string' | 'number' | 'boolean' | 'json'
      }));
      
      setSettings(typedSettings);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "خطأ في تحميل الإعدادات",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (id: string, updates: Partial<SystemSetting>) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('system_settings')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      setSettings(settings.map(setting => 
        setting.id === id ? { ...setting, ...updates } : setting
      ));
      
      // تسجيل النشاط
      await supabase.rpc('log_activity', {
        p_action: 'settings_updated',
        p_resource_type: 'system_setting',
        p_resource_id: id,
        p_details: { updated_fields: Object.keys(updates) }
      });
      
      toast({
        title: "تم تحديث الإعدادات بنجاح",
        description: "تم حفظ التغييرات"
      });
      
      setEditingId(null);
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "خطأ في تحديث الإعدادات",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addSetting = async () => {
    try {
      setSaving(true);
      const { data, error } = await supabase
        .from('system_settings')
        .insert([newSetting])
        .select()
        .single();
      
      if (error) throw error;
      
      // تحويل البيانات لضمان التطابق مع النوع المحدد
      const typedSetting: SystemSetting = {
        ...data,
        data_type: data.data_type as 'string' | 'number' | 'boolean' | 'json'
      };
      
      setSettings([...settings, typedSetting]);
      setNewSetting({
        category: '',
        key: '',
        value: '',
        description: '',
        data_type: 'string',
        is_public: false
      });
      setShowAddForm(false);
      
      // تسجيل النشاط
      await supabase.rpc('log_activity', {
        p_action: 'settings_created',
        p_resource_type: 'system_setting',
        p_resource_id: data.id,
        p_details: { category: newSetting.category, key: newSetting.key }
      });
      
      toast({
        title: "تم إضافة الإعداد بنجاح",
        description: "تم إنشاء إعداد جديد"
      });
    } catch (error) {
      console.error('Error adding setting:', error);
      toast({
        title: "خطأ في إضافة الإعداد",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const deleteSetting = async (id: string) => {
    try {
      const { error } = await supabase
        .from('system_settings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setSettings(settings.filter(setting => setting.id !== id));
      
      // تسجيل النشاط
      await supabase.rpc('log_activity', {
        p_action: 'settings_deleted',
        p_resource_type: 'system_setting',
        p_resource_id: id
      });
      
      toast({
        title: "تم حذف الإعداد بنجاح",
        description: "تم حذف الإعداد من النظام"
      });
    } catch (error) {
      console.error('Error deleting setting:', error);
      toast({
        title: "خطأ في حذف الإعداد",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handleValueChange = (setting: SystemSetting, value: any) => {
    let processedValue = value;
    
    if (setting.data_type === 'boolean') {
      processedValue = String(value);
    } else if (setting.data_type === 'number') {
      processedValue = String(value);
    }
    
    updateSetting(setting.id, { value: processedValue });
  };

  const renderValueInput = (setting: SystemSetting) => {
    if (editingId !== setting.id) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-gray-300 flex-1">
            {setting.data_type === 'boolean' 
              ? (setting.value === 'true' ? 'مفعل' : 'معطل')
              : setting.value}
          </span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditingId(setting.id)}
            className="text-yellow-400 hover:text-yellow-300"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    switch (setting.data_type) {
      case 'boolean':
        return (
          <div className="flex items-center gap-2">
            <Switch
              checked={setting.value === 'true'}
              onCheckedChange={(checked) => handleValueChange(setting, checked)}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setEditingId(null)}
              className="text-green-400"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        );
      case 'number':
        return (
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={setting.value}
              onChange={(e) => handleValueChange(setting, e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setEditingId(null)}
              className="text-green-400"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        );
      case 'json':
        return (
          <div className="flex items-center gap-2">
            <Textarea
              value={setting.value}
              onChange={(e) => handleValueChange(setting, e.target.value)}
              className="bg-gray-700 border-gray-600 text-white font-mono text-sm"
              rows={3}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setEditingId(null)}
              className="text-green-400"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={setting.value}
              onChange={(e) => handleValueChange(setting, e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setEditingId(null)}
              className="text-green-400"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        );
    }
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SystemSetting[]>);

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-gray-400">جاري تحميل إعدادات النظام...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-yellow-500 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              إعدادات النظام
            </CardTitle>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Plus className="h-4 w-4 mr-2" />
              إضافة إعداد جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="bg-gray-700 border-gray-600 mb-6">
              <CardHeader>
                <CardTitle className="text-white text-lg">إضافة إعداد جديد</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">الفئة</Label>
                    <Input
                      value={newSetting.category}
                      onChange={(e) => setNewSetting({...newSetting, category: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="مثل: site, features, security"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300">المفتاح</Label>
                    <Input
                      value={newSetting.key}
                      onChange={(e) => setNewSetting({...newSetting, key: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="مثل: site_name, enable_feature"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-300">القيمة</Label>
                  <Input
                    value={newSetting.value}
                    onChange={(e) => setNewSetting({...newSetting, value: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="قيمة الإعداد"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">الوصف</Label>
                  <Textarea
                    value={newSetting.description}
                    onChange={(e) => setNewSetting({...newSetting, description: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="وصف الإعداد"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">نوع البيانات</Label>
                    <Select 
                      value={newSetting.data_type} 
                      onValueChange={(value: 'string' | 'number' | 'boolean' | 'json') => 
                        setNewSetting({...newSetting, data_type: value})
                      }
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="string">نص</SelectItem>
                        <SelectItem value="number">رقم</SelectItem>
                        <SelectItem value="boolean">صحيح/خطأ</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newSetting.is_public}
                      onCheckedChange={(checked) => setNewSetting({...newSetting, is_public: checked})}
                    />
                    <Label className="text-gray-300">إعداد عام</Label>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={addSetting}
                    disabled={saving || !newSetting.category || !newSetting.key || !newSetting.value}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {saving ? "جاري الحفظ..." : "حفظ الإعداد"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-gray-600 text-gray-300"
                  >
                    إلغاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            {Object.entries(groupedSettings).map(([category, categorySettings]) => (
              <Card key={category} className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categorySettings.map((setting) => (
                      <div key={setting.id} className="border-b border-gray-600 pb-4 last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-white font-medium">{setting.key}</h4>
                              {setting.is_public && (
                                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                                  عام
                                </span>
                              )}
                              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                                {setting.data_type}
                              </span>
                            </div>
                            {setting.description && (
                              <p className="text-gray-400 text-sm mt-1">{setting.description}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteSetting(setting.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-2">
                          {renderValueInput(setting)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {Object.keys(groupedSettings).length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">لا توجد إعدادات محفوظة حالياً</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
