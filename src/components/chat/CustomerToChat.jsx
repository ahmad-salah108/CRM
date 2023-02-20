import {
  Avatar,
  Box,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { NavLink } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import ImageIcon from '@mui/icons-material/Image';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NoteIcon from '@mui/icons-material/Note';

const NewMessages = styled(Box)(({ theme }) => ({
  width: "18px",
  height: "18px",
  background: theme.palette.primary.main,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  fontSize: "11px",
  color: "#fff",
}));

const LastMessage = ({ msg, num }) => (
  <Stack
    direction={"row"}
    sx={{ justifyContent: "space-between", alignItems: "center" }}
  >
    <Box>{msg}</Box>
    <NewMessages>{num}</NewMessages>
  </Stack>
);

const CustomerToChat = ({ data }) => {
  const theme = useTheme();

  const Title = ({ name, time }) => (
    <Stack
      direction={"row"}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "7px",
      }}
    >
      <Box>{name}</Box>
      <Typography sx={{ color: theme.palette.textMuted, fontSize: "11px", textAlign: 'end' }}>
        <ReactTimeAgo date={time} locale="ar" />
      </Typography>
    </Stack>
  );

  let lastMsg =
    data?.messages?.type == "chat"
      ? (data.messages?.body.length > 10 ? data.messages?.body.slice(0, 10) + '...' : data.messages?.body)
      : data?.messages?.type == "image"
      ? <Stack direction={'row'}><ImageIcon fontSize="small"/><Typography fontSize="small">صورة</Typography></Stack>
      : data?.messages?.type == "video"
      ? <Stack direction={'row'}><VideoFileIcon fontSize="small"/><Typography fontSize="small">فيديو</Typography></Stack>
      : data?.messages?.type == "ptt" || data?.messages?.type == "audio"
      ? <Stack direction={'row'}><KeyboardVoiceIcon fontSize="small"/><Typography fontSize={'small'}>رسالة صوتية</Typography></Stack>
      : data?.messages?.type == "document"
      ? <Stack direction={'row'}><InsertDriveFileIcon fontSize="small"/><Typography fontSize="small">ملف</Typography></Stack>
      : data?.messages?.type == "sticker"
      ? <Stack direction={'row'}><NoteIcon fontSize="small"/><Typography fontSize="small">ملصق</Typography></Stack>
      : "";

  return (
    <NavLink
      to={`/chat/${data.id}`}
      className={({ isActive }) => (isActive ? "active-chat" : "")}
      style={{ display: "inline-block", marginBottom: "5px", width: "100%" }}
    >
      <ListItem sx={{ borderRadius: "4px" }}>
        <ListItemAvatar>
          <Avatar
            alt="محمد احمد"
            src={data?.image}
            sx={{ width: "46px", height: "46px" }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Title name={data.name ? data.name : "أنا"} time={new Date(data.last_time * 1000)} />
          }
          secondary={<LastMessage msg={lastMsg} num={2} />}
        />
      </ListItem>
    </NavLink>
  );
};

export default CustomerToChat;
