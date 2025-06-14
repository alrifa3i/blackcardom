
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus } from 'lucide-react';

interface NewSetting {
  category: string;
  key: string;
  value: string;
  description: string;
  data_type: 'string' | 'number' | 'boolean' | 'json';
  is_public: boolean;
}

interface SystemSettingFormProps {
  newSetting: NewSetting;
  onNewSettingChange: (newSetting: NewSetting) => void;
  onAddSetting: () => void;
}

const SystemSettingForm: React.FC<SystemSettingFormProps> = ({
  newSetting,
  onNewSettingChange,
  onAddSetting
}) => {
  return (
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
              onChange={(e) => onNewSettingChange({ ...newSetting, category: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="مثال: site, security"
            />
          </div>
          <div>
            <Label className="text-gray-300">المفتاح</Label>
            <Input
              value={newSetting.key}
              onChange={(e) => onNewSettingChange({ ...newSetting, key: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="مثال: site_name"
            />
          </div>
        </div>
        
        <div>
          <Label className="text-gray-300">القيمة</Label>
          <Input
            value={newSetting.value}
            onChange={(e) => onNewSettingChange({ ...newSetting, value: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        
        <div>
          <Label className="text-gray-300">الوصف</Label>
          <Input
            value={newSetting.description}
            onChange={(e) => onNewSettingChange({ ...newSetting, description: e.target.value })}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gray-300">نوع البيانات</Label>
            <Select 
              value={newSetting.data_type} 
              onValueChange={(value: 'string' | 'number' | 'boolean' | 'json') => 
                onNewSettingChange({ ...newSetting, data_type: value })
              }
            >
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
              onCheckedChange={(checked) => onNewSettingChange({ ...newSetting, is_public: checked })}
            />
            <Label className="text-gray-300">متاح للجمهور</Label>
          </div>
        </div>
        
        <Button
          onClick={onAddSetting}
          disabled={!newSetting.category || !newSetting.key || !newSetting.value}
          className="bg-yellow-500 text-black hover:bg-yellow-400"
        >
          <Plus className="h-4 w-4 mr-2" />
          إضافة الإعداد
        </Button>
      </CardContent>
    </Card>
  );
};

export default SystemSettingForm;
