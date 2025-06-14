
import { useState, useEffect } from 'react';
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

export const useSystemSettings = () => {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSetting, setNewSetting] = useState<NewSetting>({
    category: '',
    key: '',
    value: '',
    description: '',
    data_type: 'string',
    is_public: false
  });
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('category', { ascending: true })
        .order('key', { ascending: true });
      
      if (error) throw error;
      
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

  const handleValueChange = (id: string, value: string) => {
    const updatedSettings = settings.map(s => 
      s.id === id ? { ...s, value } : s
    );
    setSettings(updatedSettings);
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    editingId,
    newSetting,
    setEditingId,
    setNewSetting,
    handleSaveSetting,
    handleAddSetting,
    handleDeleteSetting,
    handleValueChange
  };
};
