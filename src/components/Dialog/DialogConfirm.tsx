import * as React from 'react';

// mui core
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  renderContext: React.ReactNode
}

export default function DialogConfirm({ open, handleClose, handleSubmit, renderContext }: IProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        Confirm
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
         {renderContext}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">Cancel</Button>
        <Button onClick={handleSubmit} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
