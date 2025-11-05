import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  confirmColor?: 'primary' | 'error' | 'inherit';
  isLoading?: boolean;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  confirmColor = 'primary',
  isLoading = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose} 
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth 
      maxWidth="xs" 
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={onClose} 
          color="inherit"
          disabled={isLoading}
        >
          Cancelar
        </Button>
        
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          autoFocus 
          disabled={isLoading}
        >
          {isLoading ? 'Aguarde...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
