import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react';


interface IConfirmProps {
    open: boolean;
    title?: string;
    onClose: () => void;
    onConfirm: () => void;
}

const Confirm: React.FC<IConfirmProps> = ({open,title,onClose,onConfirm}) => {
    
    return (
    <Dialog
        open={open}
        onClose={onClose}
        >
        <DialogTitle>{title || 'Tem certeza que deseja apagar?'}</DialogTitle>
        <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={()=> {onConfirm(); onClose();}} autoFocus>
                Confirmar
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default Confirm;