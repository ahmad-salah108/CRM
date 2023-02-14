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
import bg from "./../assets/login-background.png";
import { useRef } from "react";

const LoginPaper = styled(Paper)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(345px, 90%)",
  height: "450px",
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
  const [loading, setLoading] = useState(false);
  const errMessage = useRef();

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
          errMessage.current.textContent = 'البريد الالكتروني او كلمة المرور غير صحيحة';
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
          <LoginPaper
            elevation={3}
            sx={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPositionY: "-200px",
              backgroundPositionX: "-40px",
              backgroundRepeat: "no-repeat"
            }}
          >
            <Stack
              direction={"column"}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ textAlign: "center", color: '#fff', marginTop: '30px' }}>
                تسجيل دخول
              </Typography>
              <Stack direction={"column"} sx={{ gap: "23px", width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="البريد الالكتروني"
                  fullWidth
                  size="small"
                  type={'email'}
                  {...register("email")}
                  required
                />
                <TextField
                  variant="outlined"
                  label="كلمة المرور"
                  fullWidth
                  size="small"
                  type={"password"}
                  {...register("password")}
                  required
                />
                <Typography sx={{textAlign: 'center', fontSize: '14px'}} color={'error'} ref={errMessage}></Typography>
                {!loading && (
                  <Button type="submit" variant="contained" size="large">
                    تسجيل دخول
                  </Button>
                )}
                {loading && (
                  <Button
                    variant="contained"
                    sx={{ pointerEvents: "none", opacity: "0.5" }}
                  >
                    <CircularProgress
                      sx={{
                        width: "30px !important",
                        height: "30px !important",
                      }}
                      color="white"
                    />
                  </Button>
                )}
              </Stack>
            </Stack>
          </LoginPaper>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
