import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSilce";
import wave from "./../assets/wave.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useState } from "react";

const LoginPaper = styled(Paper)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(345px, 90%)",
  height: "380px",
  padding: "30px",
  display: "grid",
  placeItems: "center",
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/public/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: watch("email"),
        password: watch("password"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          enqueueSnackbar("البريد الالكتروني او كلمة المرور غير صحيحة", {
            variant: "error",
            autoHideDuration: 2000,
          });
          setLoading(false);
          throw new Error("البريد الالكتروني او كلمة المرور غير صحيحة");
        }
        return res.json();
      })
      .then((data) => {
        dispatch(login(data));
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${wave})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <form onSubmit={handleSubmit(handleLogin)}>
        <Box>
          <LoginPaper elevation={3}>
            <Stack
              direction={"column"}
              sx={{
                gap: "40px",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                تسجيل دخول
              </Typography>
              <Stack direction={"column"} sx={{ gap: "23px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="البريد الالكتروني"
                  fullWidth
                  size="small"
                  {...register("email")}
                />
                <TextField
                  variant="outlined"
                  label="كلمة المرور"
                  fullWidth
                  size="small"
                  type={"password"}
                  {...register("password")}
                />
                {!loading && <Button type="submit" variant="contained" size="large">
                  تسجيل دخول
                </Button>}
                {loading && <Button
                  variant="contained"
                  sx={{ pointerEvents: "none", opacity: "0.5" }}
                >
                  <CircularProgress
                    sx={{ width: "30px !important", height: "30px !important" }}
                    color="white"
                  />
                </Button>}
              </Stack>
            </Stack>
          </LoginPaper>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
