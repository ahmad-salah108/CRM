import {
  Box,
  CircularProgress,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomerToChat from "./CustomerToChat";
import Pusher from 'pusher-js';

const ChatDetails = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_API_URL}/public/api/auth/conversations/chats`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
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
          setConversations(data.conversations);
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

    
    const pusher = new Pusher("baba382db1e49c335622", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("Staff-Management");
    channel.bind("message-sent", (data) => {
      setConversations(prev => {
        if(prev?.id == data?.message?.conversation_id){
          return {...prev, [prev.messages]: data.message}
        }else{
          return prev;
        }
      })
    });
    channel.bind("conversation-created",(data)=>{
      setConversations(prev => [data.conversation, ...prev]);
    });
  }, []);
  return (
    <Box sx={{ width: "22%", padding: "8px 12px" }}>
      <Box sx={{ padding: "8px 0 8px" }}>
        <Typography variant="h5" sx={{ marginBottom: "13px" }}>
          المحادثات
        </Typography>
        <TextField variant="outlined" label="بحث" size="small" fullWidth />
      </Box>
      <List
        sx={{
          bgcolor: "background.paper",
          height: "calc(100vh - 231px)",
          overflow: "auto",
        }}
      >
        {loading && (
          <Stack
            direction={"row"}
            sx={{ justifyContent: "center", marginTop: "50px" }}
          >
            <CircularProgress />
          </Stack>
        )}
        {!loading &&
          (conversations.length > 0 ? (
            conversations.map((e) => <CustomerToChat key={e.id} data={e} />)
          ) : conversations.length == 0 ? (
            <Typography variant="h5" color="a4" sx={{ textAlign: "center" }}>
              لا يوجد محادثات
            </Typography>
          ) : (
            ""
          ))}
      </List>
    </Box>
  );
};

export default ChatDetails;
