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

const CustomerToChat = ({id}) => {
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
      <Typography sx={{ color: theme.palette.textMuted, fontSize: "13px" }}>
        {time}
      </Typography>
    </Stack>
  );

  return (
    <NavLink to={`/chat/${id}`} className={({isActive})=> isActive ? 'active-chat' : ''} style={{display: 'inline-block',marginBottom: '5px', width: '100%'}}>
      <ListItem sx={{borderRadius: '4px'}}>
        <ListItemAvatar>
          <Avatar alt="محمد احمد" src="" sx={{ width: "46px", height: "46px" }} />
        </ListItemAvatar>
        <ListItemText
          primary={<Title name={"محمد احمد"} time={"منذ يومين"} />}
          secondary={<LastMessage msg={"الرسالة الاخيرة"} num={2} />}
        />
      </ListItem>
    </NavLink>
  );
};

export default CustomerToChat;
