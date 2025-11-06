export const DEVICE_TYPES = {
  LIGHT: 'light',
  FAN: 'fan',
};

export const COLOR_TEMPERATURES = [
  { id: 'warm', label: 'Warm', color: '#FFE5B4' },
  { id: 'neutral', label: 'Neutral', color: '#F0F8FF' },
  { id: 'cool', label: 'Cool', color: '#87CEEB' },
  { id: 'pink', label: 'Pink', color: '#FFB6C1' },
];

export const DEFAULT_DEVICE_SETTINGS = {
  [DEVICE_TYPES.LIGHT]: {
    power: false,
    colorTemperature: 'warm',
    brightness: 70,
  },
  [DEVICE_TYPES.FAN]: {
    power: false,
    speed: 64,
  },
};
