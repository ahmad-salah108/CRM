import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const DialogEditEmployee = ({ openEdit, handleClose, employee, setEmployees }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);

  const handleEdit = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/employee/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: employee.id,
        name: watch("name"),
        email: watch("email"),
        password: watch("password"),
        phone_NO: watch("phone_NO"),
        ID_NO: watch("ID_NO"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if(!data.status){
          const err = data.errors.email[0] || "لا يوجد اتصال بالانترنت"
          enqueueSnackbar(err, {
            variant: "error",
            autoHideDuration: 2000,
          });
          throw new Error('error while updating employee')
        }
        handleClose();
        setEmployees(prev => prev.map(e => e.id == employee.id ? {
          ...e,
          name: watch('name'),
          email: watch('email'),
          phone_NO: watch('phone_NO'),
          ID_NO: watch('ID_NO')
        } : e))
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Dialog open={openEdit} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleEdit)}>
        <DialogTitle>تعديل الموظف</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="الاسم"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={employee?.name}
            {...register("name")}
          />
          <TextField
            margin="dense"
            label="البريد الالكتروني"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={employee?.email}
            {...register("email")}
            required
          />
          <TextField
            margin="dense"
            label="كلمة المرور"
            type="password"
            fullWidth
            variant="standard"
            {...register("password")}
            required
          />
          <TextField
            margin="dense"
            label="رقم الهاتف"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={employee?.phone_NO}
            {...register("phone_NO")}
          />
          <TextField
            margin="dense"
            label="الرقم التعريفي"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={employee?.ID_NO}
            {...register("ID_NO")}
          />
        </DialogContent>
        <DialogActions>
          <Button className={loading ? 'disabled' : ''} type="submit" variant="contained">
            {loading && <CircularProgress color="white" sx={{width: '20px !important', height: '20px !important', marginInlineEnd: '5px'}}/>}
            موافق
          </Button>
          <Button onClick={handleClose}>إلغاء</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogEditEmployee;
