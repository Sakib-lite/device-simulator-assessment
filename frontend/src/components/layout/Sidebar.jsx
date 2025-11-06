import { Box, Typography, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import { palette } from '../../theme/palette';
import { useApp } from '../../store/AppContext';
import { DEVICE_TYPES } from '../../constants/deviceTypes';

const DraggableDevice = ({ type, icon, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${type}`,
    data: { type },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <Paper
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      elevation={0}
      sx={{
        p: 2,
        backgroundColor: palette.background.paper,
        border: `1px solid ${palette.divider}`,
        borderRadius: 2,
        cursor: 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: palette.secondary.light,
          borderColor: palette.primary.main,
        },
        ...style,
      }}
    >
      {icon}
      <Typography variant="body1">{label}</Typography>
    </Paper>
  );
};

export const Sidebar = () => {
  const { presets, canvasDevices, savePreset, loadPreset, deletePreset } = useApp();
  const { enqueueSnackbar } = useSnackbar();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState('');

  const handleSavePreset = async () => {
    if (presetName.trim() && canvasDevices.length > 0) {
      try {
        await savePreset(presetName.trim());
        setPresetName('');
        setSaveDialogOpen(false);
        enqueueSnackbar('Preset saved successfully!', { variant: 'success' });
      } catch (error) {
        console.error('Failed to save preset:', error);
        enqueueSnackbar('Failed to save preset', { variant: 'error' });
      }
    }
  };

  const handleDeletePreset = async (e, presetId) => {
    e.stopPropagation();
    try {
      await deletePreset(presetId);
      enqueueSnackbar('Preset deleted successfully!', { variant: 'success' });
    } catch (error) {
      console.error('Failed to delete preset:', error);
      enqueueSnackbar('Failed to delete preset', { variant: 'error' });
    }
  };

  const handleLoadPreset = (preset) => {
    loadPreset(preset);
    enqueueSnackbar(`Loaded preset: ${preset.name}`, { variant: 'info' });
  };

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        backgroundColor: palette.background.paper,
        borderRight: `1px solid ${palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 3,
      }}
    >
      <Box>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Devices
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <DraggableDevice
            type={DEVICE_TYPES.LIGHT}
            icon={<Box component="img" src="/assets/light-icon.svg" sx={{ width: 20, height: 20 }} />}
            label="Light"
          />
          <DraggableDevice
            type={DEVICE_TYPES.FAN}
            icon={<Box component="img" src="/assets/fan-icon.svg" sx={{ width: 20, height: 20 }} />}
            label="Fan"
          />
        </Box>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3">Saved Presets</Typography>
          {canvasDevices.length > 0 && (
            <Button
              variant="contained"
              size="small"
              onClick={() => setSaveDialogOpen(true)}
              sx={{ textTransform: 'none' }}
            >
              Save
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {presets.length === 0 ? (
            <Typography  color="text.secondary" sx={{
              border:"1px solid #94A3B8",
              borderRadius:"10px",
              padding:"10px 8px",
              fontSize:"16px",
            }}>
              Nothing added yet
            </Typography>
          ) : (
            presets.map((preset) => (
              <Paper
                key={preset.id}
                elevation={0}
                onClick={() => handleLoadPreset(preset)}
                sx={{
                  p: 2,
                  backgroundColor: palette.background.paper,
                  border: `1px solid ${palette.divider}`,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: palette.secondary.light,
                    borderColor: palette.primary.main,
                  },
                }}
              >
                <Box>
                  <Typography variant="body1">{preset.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {preset.devices?.length || 0} device(s)
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => handleDeletePreset(e, preset.id)}
                  sx={{
                    color: palette.text.secondary,
                    '&:hover': {
                      color: palette.error.main,
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))
          )}
        </Box>
      </Box>

      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Preset</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Preset Name"
            type="text"
            fullWidth
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSavePreset();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSavePreset} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
