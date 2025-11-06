import { Box } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';
import { COLOR_TEMPERATURES } from '../../constants/deviceTypes';

export const LightDevice = ({ settings }) => {
  const { power, colorTemperature, brightness } = settings;
  const [lightOnSvg, setLightOnSvg] = useState('');

  useEffect(() => {
    fetch('/assets/light-on.svg')
      .then(res => res.text())
      .then(svg => setLightOnSvg(svg));
  }, []);

  const getColorValue = () => {
    const temp = COLOR_TEMPERATURES.find(t => t.id === colorTemperature);
    return temp ? temp.color : '#FFE5B4';
  };

  const opacity = power ? brightness / 100 : 1;
  const color = getColorValue();

  const coloredSvg = useMemo(() => {
    if (!lightOnSvg) return '';
    const svgWithColor = lightOnSvg.replace(/REPLACE_COLOR/g, color);
    return `data:image/svg+xml;base64,${btoa(svgWithColor)}`;
  }, [color, lightOnSvg]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: 100,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      {!power ? (
        <Box
          component="img"
          src="/assets/light.svg"
          sx={{
            width: 64,
            height: 98,
            transition: 'all 0.3s ease',
          }}
        />
      ) : (
        <Box
          component="img"
          src={coloredSvg}
          sx={{
            width: 64,
            height: 98,
            opacity: opacity,
            filter: `drop-shadow(0 0 ${30 * opacity}px ${color}) drop-shadow(0 0 ${60 * opacity}px ${color})`,
            transition: 'all 0.3s ease',
          }}
        />
      )}
    </Box>
  );
};
