import * as React from 'react';

// mui core
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const DrawerAppBar: React.FC = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Todo App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default DrawerAppBar;
