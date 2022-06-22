import * as React from 'react';

// mui core
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface IProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  renderContext: React.ReactNode;
  renderTitle: React.ReactNode
}

export default function DialogSimple({ open, handleSubmit, handleClose, renderTitle, renderContext }: IProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {renderTitle}
      </DialogTitle>
      <DialogContent>
         {renderContext}
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
