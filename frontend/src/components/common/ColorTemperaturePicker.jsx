import { Box, Typography } from '@mui/material';
import { COLOR_TEMPERATURES } from '../../constants/deviceTypes';

export const ColorTemperaturePicker = ({ value, onChange }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body1" color="text.primary" sx={{ mb: 1.5 }}>
        Color Temperature
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {COLOR_TEMPERATURES.map((temp) => (
          <Box
            key={temp.id}
            onClick={() => onChange(temp.id)}
            sx={{
              flex: 1,
              height: 30,
              borderRadius: 2,
              backgroundColor: temp.color,
              cursor: 'pointer',
              border: value === temp.id ? '3px solid #fff' : '3px solid transparent',
              boxShadow: value === temp.id
                ? '0 0 0 2px rgba(46, 93, 255, 0.5)'
                : 'none',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
