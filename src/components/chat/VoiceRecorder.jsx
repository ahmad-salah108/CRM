import { Delete, PlayArrow, Send, Stop } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const VoiceRecorder = ({ setOpenVoice }) => {
  const { ChatId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false)
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      blobPropertyBag: {
        type: "audio/ogg",
      },
      mediaRecorderOptions: {
        type: "audio/ogg",
      },
    });
  console.log(mediaBlobUrl);

  const handleMessageVoice = () => {
    setLoading(true)
    fetch(mediaBlobUrl)
      .then((res) => res.blob())
      .then((data) => {
        const formData = new FormData();
        formData.append("conversation_id", ChatId);
        formData.append(
          "audio",
          new File([data], "voice.ogg", { type: "audio/ogg", size: data.size })
        );
        console.log(data);
        console.log(
          new File([data], "voice.ogg", { type: "audio/ogg", size: data.size })
        );
        return fetch(
          `${process.env.REACT_APP_API_URL}/public/api/auth/messages/send_voice`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      })
      .then((res) => res.json())
      .then((data) => {
        setOpenVoice(false);
        setLoading(false)
        console.log(data);
      })
      .catch((err) => {
        setOpenVoice(false);
        setLoading(false)
        console.log(err);
      });
  };

  return (
    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
      <IconButton onClick={()=>{setOpenVoice(false)}} color="error">
        <Delete />
      </IconButton>
      <audio src={mediaBlobUrl} controls />
      {status == 'recording' && <IconButton onClick={stopRecording} color="error">
        <Stop />
      </IconButton>}
      {status == 'idle' && <IconButton onClick={startRecording} color="success">
        <PlayArrow />
      </IconButton>}
      {status == 'stopped' && !loading && <IconButton onClick={handleMessageVoice} color="primary">
        <Send sx={{ transform: "rotate(180deg)" }} />
      </IconButton>}
      {loading && <CircularProgress sx={{width: '30px !important', height: '30px !important', marginLeft: '10px'}}/>}
    </Stack>
  );
};

export default VoiceRecorder;
