import { Paper, Box } from '@mui/material';
import { PowerToggle } from '../common/PowerToggle';
import { CustomSlider } from '../common/CustomSlider';
import { palette } from '../../theme/palette';

export const FanControlPanel = ({ settings, onSettingsChange }) => {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: palette.background.paper,
        borderRadius: 3,
        border: `1px solid ${palette.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <PowerToggle
          value={settings.power}
          onChange={(value) => handleChange('power', value)}
        />

        <CustomSlider
          label="Speed"
          value={settings.speed}
          onChange={(value) => handleChange('speed', value)}
        />
      </Box>
    </Paper>
  );
};
