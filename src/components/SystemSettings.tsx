
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, Plus, Edit, Trash2 } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSetting, setNewSetting] = useState({
    category: '',
    key: '',
    value: '',
    description: '',
    data_type: 'string' as const,
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
      
      // تصحيح نوع البيانات
      const typedData = (data || []).map(setting => ({
        ...setting,
        data_type: setting.data_type as 'string' | 'number' | 'boolean' | 'json'
      }));
      
      setSettings(typedData);
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

  const handleSaveSetting = async (setting: SystemSetting) => {
    try {
      const { error } = await supabase
        .from('system_settings')
        .update({
          value: setting.value,
          description: setting.description,
          is_public: setting.is_public
        })
        .eq('id', setting.id);
      
      if (error) throw error;
      
      toast({
        title: "تم حفظ الإعداد بنجاح",
        description: `تم تحديث ${setting.key}`,
      });
      
      setEditingId(null);
      fetchSettings();
    } catch (error) {
      console.error('Error updating setting:', error);
      toast({
        title: "خطأ في حفظ الإعداد",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handleAddSetting = async () => {
    try {
      const { error } = await supabase
        .from('system_settings')
        .insert([newSetting]);
      
      if (error) throw error;
      
      toast({
        title: "تم إضافة الإعداد بنجاح",
        description: `تم إنشاء ${newSetting.key}`,
      });
      
      setNewSetting({
        category: '',
        key: '',
        value: '',
        description: '',
        data_type: 'string',
        is_public: false
      });
      
      fetchSettings();
    } catch (error) {
      console.error('Error adding setting:', error);
      toast({
        title: "خطأ في إضافة الإعداد",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSetting = async (id: string) => {
    try {
      const { error } = await supabase
        .from('system_settings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "تم حذف الإعداد بنجاح",
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

  const renderSettingValue = (setting: SystemSetting) => {
    const isEditing = editingId === setting.id;
    
    if (setting.data_type === 'boolean') {
      return (
        <Switch
          checked={setting.value === 'true'}
          onCheckedChange={(checked) => {
            if (isEditing) {
              const updatedSettings = settings.map(s => 
                s.id === setting.id ? { ...s, value: checked.toString() } : s
              );
              setSettings(updatedSettings);
            }
          }}
          disabled={!isEditing}
        />
      );
    }
    
    if (setting.data_type === 'json') {
      return (
        <Textarea
          value={setting.value}
          onChange={(e) => {
            if (isEditing) {
              const updatedSettings = settings.map(s => 
                s.id === setting.id ? { ...s, value: e.target.value } : s
              );
              setSettings(updatedSettings);
            }
          }}
          readOnly={!isEditing}
          className={`bg-gray-700 border-gray-600 text-white font-mono text-sm ${!isEditing ? 'cursor-not-allowed' : ''}`}
          rows={3}
        />
      );
    }
    
    return (
      <Input
        value={setting.value}
        onChange={(e) => {
          if (isEditing) {
            const updatedSettings = settings.map(s => 
              s.id === setting.id ? { ...s, value: e.target.value } : s
            );
            setSettings(updatedSettings);
          }
        }}
        type={setting.data_type === 'number' ? 'number' : 'text'}
        readOnly={!isEditing}
        className={`bg-gray-700 border-gray-600 text-white ${!isEditing ? 'cursor-not-allowed' : ''}`}
      />
    );
  };

  const groupedSettings = settings.reduce((groups, setting) => {
    if (!groups[setting.category]) {
      groups[setting.category] = [];
    }
    groups[setting.category].push(setting);
    return groups;
  }, {} as Record<string, SystemSetting[]>);

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-gray-400">جاري تحميل الإعدادات...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(groupedSettings).map(([category, categorySettings]) => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 capitalize">
                {category}
              </h3>
              <div className="space-y-4">
                {categorySettings.map((setting) => (
                  <div key={setting.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-white font-medium">{setting.key}</h4>
                        {setting.description && (
                          <p className="text-gray-400 text-sm">{setting.description}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {editingId === setting.id ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSaveSetting(setting)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                              className="border-gray-600 text-gray-300"
                            >
                              إلغاء
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(setting.id)}
                              className="border-gray-600 text-gray-300 hover:bg-gray-600"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteSetting(setting.id)}
                              className="border-red-600 text-red-400 hover:bg-red-600/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">القيمة</Label>
                      {renderSettingValue(setting)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* إضافة إعداد جديد */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Plus className="h-5 w-5" />
            إضافة إعداد جديد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">التصنيف</Label>
              <Input
                value={newSetting.category}
                onChange={(e) => setNewSetting({ ...newSetting, category: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="مثال: site, security"
              />
            </div>
            <div>
              <Label className="text-gray-300">المفتاح</Label>
              <Input
                value={newSetting.key}
                onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="مثال: site_name"
              />
            </div>
          </div>
          
          <div>
            <Label className="text-gray-300">القيمة</Label>
            <Input
              value={newSetting.value}
              onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div>
            <Label className="text-gray-300">الوصف</Label>
            <Input
              value={newSetting.description}
              onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">نوع البيانات</Label>
              <Select value={newSetting.data_type} onValueChange={(value: 'string' | 'number' | 'boolean' | 'json') => setNewSetting({ ...newSetting, data_type: value })}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="string">نص</SelectItem>
                  <SelectItem value="number">رقم</SelectItem>
                  <SelectItem value="boolean">منطقي</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <Switch
                checked={newSetting.is_public}
                onCheckedChange={(checked) => setNewSetting({ ...newSetting, is_public: checked })}
              />
              <Label className="text-gray-300">متاح للجمهور</Label>
            </div>
          </div>
          
          <Button
            onClick={handleAddSetting}
            disabled={!newSetting.category || !newSetting.key || !newSetting.value}
            className="bg-yellow-500 text-black hover:bg-yellow-400"
          >
            <Plus className="h-4 w-4 mr-2" />
            إضافة الإعداد
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
