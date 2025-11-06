import { Box, Typography, Button } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import AddIcon from '@mui/icons-material/Add';
import { palette } from '../../theme/palette';
import { useApp } from '../../store/AppContext';
import { LightDevice } from '../devices/LightDevice';
import { FanDevice } from '../devices/FanDevice';
import { DEVICE_TYPES } from '../../constants/deviceTypes';

export const TestingCanvas = () => {
  const { canvasDevices, selectedDevice, setSelectedDevice, clearCanvas } = useApp();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const renderDevice = (device) => {
    const DeviceComponent = device.type === DEVICE_TYPES.LIGHT ? LightDevice : FanDevice;
    return (
      <Box
        key={device.id}
        onClick={() => setSelectedDevice(device)}
        sx={{
          cursor: 'pointer',
          p: 2,
          borderRadius: 2,
          border: selectedDevice?.id === device.id
            ? `2px solid ${palette.primary.main}`
            : '2px solid transparent',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(46, 93, 255, 0.1)',
          },
        }}
      >
        <DeviceComponent settings={device.settings} />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, textAlign: 'center' }}
        >
          {device.name}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        backgroundColor: palette.background.canvas,
        display: 'flex',
        flexDirection: 'column',
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h2">Testing Canvas</Typography>
        {canvasDevices.length > 0 && (
          <Button
            variant="outlined"
            size="small"
            onClick={clearCanvas}
            sx={{ textTransform: 'none' }}
          >
            Clear
          </Button>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          border: `2px dashed ${palette.divider}`,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3,
          p: 3,
          minHeight: 300,
        }}
      >
        {canvasDevices.length === 0 ? (
          <Box sx={{ textAlign: 'center' }}>
            <AddIcon sx={{ fontSize: 64, color: palette.text.disabled, mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Drag and drop devices here
            </Typography>
          </Box>
        ) : (
          canvasDevices.map(renderDevice)
        )}
      </Box>
    </Box>
  );
};
