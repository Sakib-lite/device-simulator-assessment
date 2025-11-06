import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { DndContext } from '@dnd-kit/core';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { theme } from './theme/theme';
import { AppProvider, useApp } from './store/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TestingCanvas } from './components/layout/TestingCanvas';
import { ControlPanel } from './components/layout/ControlPanel';

const AppContent = () => {
  const { addDeviceToCanvas, canvasDevices } = useApp();
  const { enqueueSnackbar } = useSnackbar();

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id === 'canvas') {
      if (canvasDevices.length >= 5) {
        enqueueSnackbar('Maximum 5 devices allowed!', { variant: 'warning' });
        return;
      }
      const deviceType = active.data.current.type;
      addDeviceToCanvas(deviceType);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <Sidebar />
        <TestingCanvas />
        <ControlPanel />
      </Box>
    </DndContext>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2500}
        preventDuplicate
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <AppProvider>
          <AppContent />
        </AppProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
