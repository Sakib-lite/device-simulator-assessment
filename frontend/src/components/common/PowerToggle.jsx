import { Box, Switch, Typography } from '@mui/material';

export const PowerToggle = ({ value, onChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Typography variant="body1" color="text.primary">
        Power
      </Typography>
      <Switch
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </Box>
  );
};
