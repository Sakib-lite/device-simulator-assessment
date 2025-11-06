import { Paper, Box } from '@mui/material';
import { PowerToggle } from '../common/PowerToggle';
import { ColorTemperaturePicker } from '../common/ColorTemperaturePicker';
import { CustomSlider } from '../common/CustomSlider';
import { palette } from '../../theme/palette';

export const LightControlPanel = ({ settings, onSettingsChange }) => {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 1,
        backgroundColor: palette.background.paper,
        borderRadius: 3,
        border: `1px solid ${palette.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <PowerToggle
          value={settings.power}
          onChange={(value) => handleChange('power', value)}
        />

        <ColorTemperaturePicker
          value={settings.colorTemperature}
          onChange={(value) => handleChange('colorTemperature', value)}
        />

        <CustomSlider
          label="Brightness"
          value={settings.brightness}
          onChange={(value) => handleChange('brightness', value)}
          min={10}
        />
      </Box>
    </Paper>
  );
};
