// mui core
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// components
import AppBar from 'components/AppBar';

// views
import Todo from 'views/Todo';

function App() {
  return (
    <>
      <AppBar />
      <Box component="main" sx={{ p: 3, maxWidth: 1280, margin: '0 auto' }}>
        <Toolbar />
        <Todo />
      </Box>
    </>
  );
}

export default App;
