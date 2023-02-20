import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

const DialogLogout = ({open, handleClose, userLogout}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{'& .MuiPaper-root': {padding: '8px 35px'}}}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          هل تريد تسجيل الخروج؟
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center'}}>
        <Button onClick={()=>{userLogout(); handleClose()}} autoFocus variant="contained">
          موافق
        </Button>
        <Button onClick={handleClose} variant='outlined'>إلغاء</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogLogout;
