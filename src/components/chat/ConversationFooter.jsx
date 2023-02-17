import { Box, Button, IconButton, Stack, useTheme } from "@mui/material";
import React, { useRef } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useState } from "react";

const ConversationFooter = () => {
  const fileInput = useRef();
  const theme = useTheme();
  const { ChatId } = useParams();
  const { token } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [fileToSend, setFileToSend] = useState();
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

  return (
    <Box sx={{position: 'relative'}}>
      {fileToSend && (
        <Stack direction={"column"} sx={{position: 'absolute', bottom: '46px', left: '0', padding: '15px', borderRadius: '4px', maxHeight: '180px', maxWidth: '180px'}} bgcolor='eee'>
          {fileToSend.type.split("/")[0] == "image" ? (
            <img
              src={URL.createObjectURL(fileToSend)}
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: '4px' }}
            />
          ) : (
            ""
          )}
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
            <IconButton type="submit" color="primary">
              <SendIcon sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default ConversationFooter;
