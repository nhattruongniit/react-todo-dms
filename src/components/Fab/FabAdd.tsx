import * as React from 'react';

// mui core
import Fab from '@mui/material/Fab';

// mui icons
import AddIcon from '@mui/icons-material/Add';

function FabAdd({ ...props }) {
  return (
    <Fab 
      color="primary" 
      aria-label="add"
      data-testid="add"
      sx={{
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
        '&:hover': {
          backgroundColor: '#6666ff'
        }
      }}
      {...props}
    >
      <AddIcon />
    </Fab>
  )
}

export default FabAdd;