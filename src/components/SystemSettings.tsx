
import React from 'react';
import SystemSettingsContainer from './SystemSettingsContainer';
import SystemSettingForm from './SystemSettingForm';
import { useSystemSettings } from '@/hooks/useSystemSettings';

const SystemSettings = () => {
  const {
    newSetting,
    setNewSetting,
    handleAddSetting
  } = useSystemSettings();

  return (
    <div className="space-y-6">
      <SystemSettingsContainer />
      <SystemSettingForm
        newSetting={newSetting}
        onNewSettingChange={setNewSetting}
        onAddSetting={handleAddSetting}
      />
    </div>
  );
};

export default SystemSettings;
