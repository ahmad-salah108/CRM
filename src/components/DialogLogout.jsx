import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

const DialogLogout = ({open, handleClose, userLogout}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        تسجيل خروج
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          هل تريد تسجيل الخروج؟
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>إلغاء</Button>
        <Button onClick={()=>{userLogout(); handleClose()}} autoFocus variant="contained">
          موافق
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogLogout;
