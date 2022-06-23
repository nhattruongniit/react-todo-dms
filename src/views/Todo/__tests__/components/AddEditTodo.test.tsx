import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
// mui core
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const modalRoot = document.createElement('div')
modalRoot.setAttribute('id', 'modal-root')
document.body.appendChild(modalRoot)

const Modal = ({handleClose, children}: any) => {
  const el: any = document.createElement('div')

  React.useEffect(() => {
    modalRoot.appendChild(el)
    return () => modalRoot.removeChild(el)
  })

  return ReactDOM.createPortal(
    <div onClick={handleClose}>
      <div onClick={e => e.stopPropagation()}>
        {children}
        <hr />
        <button onClick={handleClose}>Close</button>
      </div>
    </div>,
    el,
  )
}

test('render default value', async () => {
  const handleClose = jest.fn();
  // given
  render(
    <Modal handleClose={handleClose}>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          data-testid="name"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value=""
        />
        <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            label="Status"
            data-testid="status"
            value="true"
            fullWidth
          >
            <MenuItem value="false">New</MenuItem>
            <MenuItem value="true">Completed</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Modal>,
  )

  // when
  fireEvent.click(screen.getByText(/close/i))
  // then
  expect(screen.getByTestId('name')).toBeTruthy();
  expect(screen.getByTestId('status')).toBeTruthy();
});

test('render has value after click Edit button', async () => {
  const handleClose = jest.fn();
  // given
  render(
    <Modal handleClose={handleClose}>
      <div>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          data-testid="name"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value="123"
        />
        <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            label="Status"
            data-testid="status"
            value="true"
            fullWidth
          >
            <MenuItem value="false">New</MenuItem>
            <MenuItem value="true">Completed</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Modal>,
  )
  
  // then
  expect(screen.getByTestId('name')).not.toBeNull();
  expect(screen.getByTestId('status')).not.toBeNull();
});
