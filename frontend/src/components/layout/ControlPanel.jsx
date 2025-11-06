import { Box, Typography } from '@mui/material';
import { palette } from '../../theme/palette';
import { useApp } from '../../store/AppContext';
import { LightControlPanel } from '../devices/LightControlPanel';
import { FanControlPanel } from '../devices/FanControlPanel';
import { DEVICE_TYPES } from '../../constants/deviceTypes';

export const ControlPanel = () => {
  const { selectedDevice, updateDeviceSettings } = useApp();

  if (!selectedDevice) {
    return null;
  }

  const handleSettingsChange = (newSettings) => {
    updateDeviceSettings(selectedDevice.id, newSettings);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 8,
        right: 24,
        zIndex: 1000,
        minWidth: 400,
      }}
    >

      {selectedDevice.type === DEVICE_TYPES.LIGHT ? (
        <LightControlPanel
          settings={selectedDevice.settings}
          onSettingsChange={handleSettingsChange}
        />
      ) : (
        <FanControlPanel
          settings={selectedDevice.settings}
          onSettingsChange={handleSettingsChange}
        />
      )}
    </Box>
  );
};
