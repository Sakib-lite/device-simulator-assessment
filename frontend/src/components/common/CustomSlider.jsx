import { Box, Slider, Typography } from '@mui/material';
import { palette } from '../../theme/palette';

export const CustomSlider = ({ label, value, onChange, min = 0, max = 100, unit = '%' }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body1" color="text.primary">
          {label}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {value}{unit}
        </Typography>
      </Box>
      <Slider
        value={value}
        onChange={(e, newValue) => onChange(newValue)}
        min={min}
        max={max}
        sx={{
          color: palette.primary.main,
          height: 6,
          '& .MuiSlider-thumb': {
            width: 18,
            height: 18,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:hover': {
              boxShadow: '0 0 0 8px rgba(46, 93, 255, 0.16)',
            },
          },
          '& .MuiSlider-track': {
            border: 'none',
            height: 6,
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
            backgroundColor: palette.divider,
            height: 6,
          },
        }}
      />
    </Box>
  );
};
