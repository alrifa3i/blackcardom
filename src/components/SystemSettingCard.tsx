
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Edit, Trash2 } from 'lucide-react';

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

interface SystemSettingCardProps {
  setting: SystemSetting;
  isEditing: boolean;
  onEdit: (id: string) => void;
  onSave: (setting: SystemSetting) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
  onValueChange: (id: string, value: string) => void;
}

const SystemSettingCard: React.FC<SystemSettingCardProps> = ({
  setting,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onValueChange
}) => {
  const renderSettingValue = () => {
    if (setting.data_type === 'boolean') {
      return (
        <Switch
          checked={setting.value === 'true'}
          onCheckedChange={(checked) => {
            if (isEditing) {
              onValueChange(setting.id, checked.toString());
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
              onValueChange(setting.id, e.target.value);
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
            onValueChange(setting.id, e.target.value);
          }
        }}
        type={setting.data_type === 'number' ? 'number' : 'text'}
        readOnly={!isEditing}
        className={`bg-gray-700 border-gray-600 text-white ${!isEditing ? 'cursor-not-allowed' : ''}`}
      />
    );
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-white font-medium">{setting.key}</h4>
          {setting.description && (
            <p className="text-gray-400 text-sm">{setting.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                onClick={() => onSave(setting)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
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
                onClick={() => onEdit(setting.id)}
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(setting.id)}
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
        {renderSettingValue()}
      </div>
    </div>
  );
};

export default SystemSettingCard;
