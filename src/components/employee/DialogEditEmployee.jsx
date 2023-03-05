import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

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
  const [image, setImage] = useState();

  const handleEdit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('user_id', employee.id);
    formData.append('name', 'asdasd');
    formData.append('email', watch("email"));
    formData.append('password', watch("password"));
    formData.append('phone_NO', watch("phone_NO"));
    formData.append('ID_NO', watch("ID_NO"));
    formData.append('job', watch("job"));
    formData.append('image', image);
    
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/employee/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
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
          setEmployees(prev => prev.map(e => e.id == employee.id ? {
            ...e,
            name: watch('name'),
            email: watch('email'),
            phone_NO: watch('phone_NO'),
            ID_NO: watch('ID_NO'),
            job: watch('job'),
            ...(image && {image: URL.createObjectURL(image)})
          } : e))
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 2000,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('لا يوجد اتصال بالانترنت', {
          variant: "error",
          autoHideDuration: 2000,
        });
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
            sx={{marginBottom: '10px'}}
            {...register("name")}
          />
          <TextField
            margin="dense"
            label="البريد الالكتروني"
            type="email"
            fullWidth
            variant="standard"
            defaultValue={employee?.email}
            sx={{marginBottom: '10px'}}
            {...register("email")}
          />
          <TextField
            margin="dense"
            label="كلمة المرور"
            type="password"
            fullWidth
            variant="standard"
            sx={{marginBottom: '10px'}}
            {...register("password")}
          />
          <TextField
            margin="dense"
            label="رقم الهاتف"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={employee?.phone_NO}
            sx={{marginBottom: '10px'}}
            {...register("phone_NO")}
          />
          <TextField
            margin="dense"
            label="الوظيفة"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={employee?.job}
            sx={{marginBottom: '10px'}}
            {...register("job")}
          />
          <TextField
            margin="dense"
            label="الرقم التعريفي"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={employee?.ID_NO}
            sx={{marginBottom: '10px'}}
            {...register("ID_NO")}
          />
          <Stack direction={'row'}>
            <label style={{padding: '10px', cursor: 'pointer', width: 'fit-content'}}>
              <AddPhotoAlternateIcon color="primary" fontSize="large"/>
              <input type="file" onChange={(e)=>setImage(e.target.files[0])} style={{display: 'none'}} />
            </label>
            {image ? <Avatar src={URL.createObjectURL(image)} sx={{width: '100px', height: '100px', borderRadius: '4px'}}/> : <Avatar src={employee?.image} sx={{width: '100px', height: '100px', borderRadius: '4px'}}/>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button className={loading ? 'disabled' : ''} type="submit" variant="contained">
            {loading && <CircularProgress color="white" sx={{width: '20px !important', height: '20px !important', marginInlineEnd: '5px'}}/>}
            موافق
          </Button>
          <Button onClick={handleClose} variant='outlined'>إلغاء</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogEditEmployee;
