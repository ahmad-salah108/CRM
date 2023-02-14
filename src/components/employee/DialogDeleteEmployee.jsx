import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React from 'react'
import { useState } from "react";
import { useSelector } from "react-redux";

const DialogDeleteEmployee = ({openDelete, handleClose, employee, setEmployees}) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);

  const handleDelete = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/employee/delete`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: employee.id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if(!data.status){
          Object.keys(data.errors).slice(0, 3).forEach(e => {
            enqueueSnackbar(data.errors[e][0], {
              variant: "error",
              autoHideDuration: 2000,
            });
          });
        }else{
          handleClose();
          // remove employee from list
          setEmployees(prev => prev.filter(e => e.id != employee.id))
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 2000,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("لا يوجد اتصال بالانترنت", {
          variant: "error",
          autoHideDuration: 2000,
        });
        console.log(err);
      });
  };

  return (
    <Dialog open={openDelete} onClose={handleClose}>
    {/* <DialogTitle>تعديل الموظف</DialogTitle> */}
    <DialogContent>
      <Typography sx={{padding: '0 20px'}}>هل تريد حذف الموظف؟</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDelete} variant='contained' className={loading ? 'disabled' : ''}>
        {loading && <CircularProgress color="white" sx={{width: '20px !important', height: '20px !important', marginInlineEnd: '5px'}}/>}
        موافق
        </Button>
      <Button onClick={handleClose}>إلغاء</Button>
    </DialogActions>
  </Dialog>
  )
}

export default DialogDeleteEmployee