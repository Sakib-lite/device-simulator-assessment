import { createContext, useContext, useState, useEffect } from 'react';
import { deviceAPI, presetAPI } from '../services/api';
import { DEVICE_TYPES, DEFAULT_DEVICE_SETTINGS } from '../constants/deviceTypes';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('App context not found');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [presets, setPresets] = useState([]);
  const [canvasDevices, setCanvasDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPresets();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await deviceAPI.getAll();
      setDevices(response.data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPresets = async () => {
    try {
      setLoading(true);
      const response = await presetAPI.getAll();
      setPresets(response.data);
    } catch (error) {
      console.error('Error fetching presets:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreset = async (name) => {
    try {
      setLoading(true);
      const presetData = {
        name,
        devices: canvasDevices,
      };
      const response = await presetAPI.create(presetData);
      setPresets([response.data, ...presets]);
      return response.data;
    } catch (error) {
      console.error('Error saving preset:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (preset) => {
    if (preset && preset.devices) {
      setCanvasDevices(preset.devices);
      if (preset.devices.length > 0) {
        setSelectedDevice(preset.devices[0]);
      }
    }
  };

  const deletePreset = async (id) => {
    try {
      setLoading(true);
      await presetAPI.delete(id);
      setPresets(presets.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting preset:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addDeviceToCanvas = (deviceType) => {
    const newDevice = {
      id: `device-${Date.now()}`,
      type: deviceType,
      name: `${deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} ${canvasDevices.length + 1}`,
      settings: DEFAULT_DEVICE_SETTINGS[deviceType],
    };
    setCanvasDevices([...canvasDevices, newDevice]);
    setSelectedDevice(newDevice);
  };

  const updateDeviceSettings = (deviceId, newSettings) => {
    setCanvasDevices(canvasDevices.map(device =>
      device.id === deviceId
        ? { ...device, settings: { ...device.settings, ...newSettings } }
        : device
    ));
    if (selectedDevice && selectedDevice.id === deviceId) {
      setSelectedDevice({ ...selectedDevice, settings: { ...selectedDevice.settings, ...newSettings } });
    }
  };

  const removeDeviceFromCanvas = (deviceId) => {
    setCanvasDevices(canvasDevices.filter(device => device.id !== deviceId));
    if (selectedDevice && selectedDevice.id === deviceId) {
      setSelectedDevice(null);
    }
  };

  const clearCanvas = () => {
    setCanvasDevices([]);
    setSelectedDevice(null);
  };

  const value = {
    devices,
    presets,
    canvasDevices,
    selectedDevice,
    loading,
    setSelectedDevice,
    fetchDevices,
    fetchPresets,
    savePreset,
    loadPreset,
    deletePreset,
    addDeviceToCanvas,
    updateDeviceSettings,
    removeDeviceFromCanvas,
    clearCanvas,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
