import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const FanDevice = ({ settings }) => {
  const { power, speed } = settings;

  const animationDuration = power ? `${(100 - speed) / 50 + 0.5}s` : '0s';

  return (
    <Box
      sx={{
        position: 'relative',
        width: 110,
        height: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src="/assets/fan.svg"
        sx={{
          width: 110,
          height: 110,
          animation: power ? `${rotate} ${animationDuration} linear infinite` : 'none',
          filter: 'brightness(1.2)' ,
          transition: 'filter 0.3s ease',
        }}
      />
    </Box>
  );
};
