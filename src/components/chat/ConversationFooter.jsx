import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useRef } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VoiceRecorder from "./VoiceRecorder";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useEffect } from "react";

const ConversationFooter = () => {
  const fileInput = useRef();
  const theme = useTheme();
  const { ChatId } = useParams();
  const { token } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [fileToSend, setFileToSend] = useState();
  const [openVoice, setOpenVoice] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleMessage = () => {
    const msg = watch("message");
    setValue("message", "");
    if (msg && msg.trim() != "") {
      fetch(
        `${process.env.REACT_APP_API_URL}/public/api/auth/messages/send_message`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            conversation_id: ChatId,
            body: msg,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.status) {
            console.log(data);
            Object.keys(data.errors)
              .slice(0, 3)
              .forEach((e) => {
                enqueueSnackbar(data.errors[e][0], {
                  variant: "error",
                  autoHideDuration: 2000,
                });
              });
          } else {
            console.log(data);
          }
        })
        .catch((err) => {
          enqueueSnackbar("لا يوجد اتصال بالانترنت", {
            variant: "error",
            autoHideDuration: 2000,
          });
          console.log(err);
        });
    }
  };

  const handleMessageImage = () => {
    const file = fileToSend;
    const caption = watch("messageImage");
    setFileToSend("");
    setValue("messageImage", "");
    fileInput.current.value = null;

    const formData = new FormData();
    formData.append("conversation_id", ChatId);
    formData.append("image", file);
    formData.append("caption", caption);

    fetch(
      `${process.env.REACT_APP_API_URL}/public/api/auth/messages/send_image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          Object.keys(data.errors)
            .slice(0, 3)
            .forEach((e) => {
              enqueueSnackbar(data.errors[e][0], {
                variant: "error",
                autoHideDuration: 2000,
              });
            });
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        enqueueSnackbar("لا يوجد اتصال بالانترنت", {
          variant: "error",
          autoHideDuration: 2000,
        });
        console.log(err);
      });
  };

  const handleMessageVideo = () => {
    const file = fileToSend;
    const caption = watch("messageVideo");
    setFileToSend("");
    setValue("messageVideo", "");
    fileInput.current.value = null;

    const formData = new FormData();
    formData.append("conversation_id", ChatId);
    formData.append("video", file);
    formData.append("caption", caption);

    fetch(
      `${process.env.REACT_APP_API_URL}/public/api/auth/messages/send_video`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          enqueueSnackbar("لا يجب أن يزيد حجم الفيديو عن 16.384 ميجابايت", {
            variant: "error",
            autoHideDuration: 2000,
          });
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        enqueueSnackbar("لا يوجد اتصال بالانترنت", {
          variant: "error",
          autoHideDuration: 2000,
        });
        console.log(err);
      });
  };

  const handleMessageDocument = () => {
    const file = fileToSend;
    const caption = watch("messageDocument");
    setFileToSend("");
    setValue("messageDocument", "");
    fileInput.current.value = null;

    const formData = new FormData();
    formData.append("conversation_id", ChatId);
    formData.append("document", file);
    formData.append("caption", caption);

    fetch(
      `${process.env.REACT_APP_API_URL}/public/api/auth/messages/send_document`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          enqueueSnackbar("حجم الملف تجاوز الحد المسموح", {
            variant: "error",
            autoHideDuration: 2000,
          });
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        enqueueSnackbar("حجم الملف تجاوز الحد المسموح", {
          variant: "error",
          autoHideDuration: 2000,
        });
        console.log(err);
      });
  };

  // close divs when click outside
  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!document.querySelector(".close-fileToSend").contains(e.target)) {
        setFileToSend("");
        fileInput.current.value = null;
      }
    });
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      {fileToSend && (
        <Stack
          direction={"column"}
          sx={{
            position: "absolute",
            bottom: "50px",
            left: "4px",
            padding: "8px 15px 5px 15px",
            borderRadius: "4px",
            width: "500px",
            maxWidth: "500px",
          }}
          bgcolor="eee"
          className="close-fileToSend"
        >
          {fileToSend.type.split("/")[0] == "image" ? (
            <form
              onSubmit={handleSubmit(handleMessageImage)}
              style={{ width: "100%" }}
            >
              <IconButton
                sx={{ marginBottom: "5px" }}
                onClick={() => {
                  setFileToSend("");
                  fileInput.current.value = null;
                }}
              >
                <Close />
              </IconButton>
              <img
                src={URL.createObjectURL(fileToSend)}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "contain",
                  borderRadius: "4px",
                }}
              />
              <Stack direction="row" sx={{ width: "100%" }}>
                <input
                  type="text"
                  placeholder="اكتب رسالة فرعية"
                  autoComplete="off"
                  style={{
                    flexGrow: "1",
                    border: "none",
                    outline: "none",
                    background: "inherit",
                  }}
                  {...register("messageImage")}
                />
                <IconButton type="submit" color="primary">
                  <SendIcon sx={{ transform: "rotate(180deg)" }} />
                </IconButton>
              </Stack>
            </form>
          ) : fileToSend.type.split("/")[0] == "video" ? (
            <form
              onSubmit={handleSubmit(handleMessageVideo)}
              style={{ width: "100%" }}
            >
              <IconButton
                sx={{ marginBottom: "5px" }}
                onClick={() => {
                  setFileToSend();
                  fileInput.current.value = null;
                }}
              >
                <Close />
              </IconButton>
              <video
                controls
                style={{ borderRadius: "12px", width: "100%", height: "250px" }}
              >
                <source src={URL.createObjectURL(fileToSend)} />
              </video>
              <Stack direction="row" sx={{ width: "100%" }}>
                <input
                  type="text"
                  placeholder="اكتب رسالة فرعية"
                  autoComplete="off"
                  style={{
                    flexGrow: "1",
                    border: "none",
                    outline: "none",
                    background: "inherit",
                  }}
                  {...register("messageVideo")}
                />
                <IconButton type="submit" color="primary">
                  <SendIcon sx={{ transform: "rotate(180deg)" }} />
                </IconButton>
              </Stack>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit(handleMessageDocument)}
              style={{ width: "100%" }}
            >
              <IconButton
                sx={{ marginBottom: "5px" }}
                onClick={() => {
                  setFileToSend();
                  fileInput.current.value = null;
                }}
              >
                <Close />
              </IconButton>
              <Stack direction="row">
                <InsertDriveFileIcon />
                <Typography>{fileToSend.name}</Typography>
              </Stack>
              <Stack direction="row" sx={{ width: "100%" }}>
                <input
                  type="text"
                  placeholder="اكتب رسالة فرعية"
                  autoComplete="off"
                  style={{
                    flexGrow: "1",
                    border: "none",
                    outline: "none",
                    background: "inherit",
                  }}
                  {...register("messageDocument")}
                />
                <IconButton type="submit" color="primary">
                  <SendIcon sx={{ transform: "rotate(180deg)" }} />
                </IconButton>
              </Stack>
            </form>
          )}
        </Stack>
      )}
      {openVoice && !fileToSend && (
        <Stack
          direction={"column"}
          sx={{
            position: "absolute",
            bottom: "50px",
            right: "21px",
            padding: "8px",
            borderRadius: "4px",
            width: "fit-content",
            maxWidth: "500px",
          }}
          bgcolor="eee"
        >
          <VoiceRecorder setOpenVoice={setOpenVoice} />
        </Stack>
      )}
      <Box sx={{ padding: "3px 8px", background: theme.palette.eee }}>
        <Stack direction={"row"}>
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={(e) => {
              setFileToSend(e.target.files[0]);
              console.log(e);
            }}
          />
          <IconButton color="primary" onClick={() => fileInput.current.click()}>
            <AttachFileIcon />
          </IconButton>
          <form
            onSubmit={handleSubmit(handleMessage)}
            style={{ display: "flex", flexGrow: "1" }}
          >
            <input
              type="text"
              placeholder="اكتب رسالة"
              autoComplete="off"
              style={{
                flexGrow: "1",
                border: "none",
                outline: "none",
                background: "inherit",
              }}
              {...register("message")}
            />
            {watch("message") && watch("message").trim() != "" ? (
              <IconButton type="submit" color="primary">
                <SendIcon sx={{ transform: "rotate(180deg)" }} />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                onClick={() => {
                  setOpenVoice((prev) => !prev);
                }}
              >
                <KeyboardVoiceIcon />
              </IconButton>
            )}
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default ConversationFooter;
