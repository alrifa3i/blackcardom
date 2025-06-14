
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import SystemSettingCard from './SystemSettingCard';
import { useSystemSettings } from '@/hooks/useSystemSettings';

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

const SystemSettingsContainer = () => {
  const {
    settings,
    loading,
    editingId,
    setEditingId,
    handleSaveSetting,
    handleDeleteSetting,
    handleValueChange
  } = useSystemSettings();

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
                <SystemSettingCard
                  key={setting.id}
                  setting={setting}
                  isEditing={editingId === setting.id}
                  onEdit={setEditingId}
                  onSave={handleSaveSetting}
                  onCancel={() => setEditingId(null)}
                  onDelete={handleDeleteSetting}
                  onValueChange={handleValueChange}
                />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SystemSettingsContainer;
