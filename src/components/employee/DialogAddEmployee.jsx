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

const DialogAddEmployee = ({ openAdd, handleClose, setEmployees }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [image, setImage] = useState();

  const handleAdd = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", watch("name"));
    formData.append("email", watch("email"));
    formData.append("password", watch("password"));
    formData.append("phone_NO", watch("phone_NO"));
    formData.append("ID_NO", watch("ID_NO"));
    formData.append("job", watch("job"));
    formData.append("image", image);

    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/employee/store`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (!data.status) {
          Object.keys(data.errors).slice(0, 3).forEach(e => {
            enqueueSnackbar(data.errors[e][0], {
              variant: "error",
              autoHideDuration: 2000,
            });
          });
        } else {
          handleClose();
          setEmployees((prev) =>[...prev, {
            name: watch("name"),
            email: watch("email"),
            phone_NO: watch("phone_NO"),
            ID_NO: watch("ID_NO"),
            job: watch("job"),
            image: URL.createObjectURL(image),
          }]);
          enqueueSnackbar(data.message, {
            variant: "success",
            autoHideDuration: 2000,
          });
          setTimeout(() => {
            reserFields();
          }, 1);
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

    const reserFields = ()=>{
      setValue('name', '');
      setValue('email', '');
      setValue('password', '');
      setValue('phone_NO', '');
      setValue('job', '');
      setValue('ID_NO', '');
      setImage('')
    }
    
  return (
    <Dialog open={openAdd} onClose={handleClose}>
      <form onSubmit={handleSubmit(handleAdd)}>
        <DialogTitle>إضافة موظف</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="الاسم"
            type="text"
            fullWidth
            variant="standard"
            {...register("name")}
          />
          <TextField
            margin="dense"
            label="البريد الالكتروني"
            type="email"
            fullWidth
            variant="standard"
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
            {...register("phone_NO")}
          />
          <TextField
            margin="dense"
            label="الوظيفة"
            type="text"
            fullWidth
            variant="standard"
            {...register("job")}
          />
          <TextField
            margin="dense"
            label="الرقم التعريفي"
            type="text"
            fullWidth
            variant="standard"
            {...register("ID_NO")}
          />
          <Stack direction={"row"}>
            <label
              style={{
                padding: "10px",
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              <AddPhotoAlternateIcon color="primary" fontSize="large" />
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            {image && (
              <Avatar
                src={URL.createObjectURL(image)}
                sx={{ width: "100px", height: "100px", borderRadius: "4px" }}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            className={loading ? "disabled" : ""}
            type="submit"
            variant="contained"
          >
            {loading && (
              <CircularProgress
                color="white"
                sx={{
                  width: "20px !important",
                  height: "20px !important",
                  marginInlineEnd: "5px",
                }}
              />
            )}
            موافق
          </Button>
          <Button onClick={handleClose}>إلغاء</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogAddEmployee;