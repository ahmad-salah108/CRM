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
      .then((res) => {
        if (!res.ok) {
          enqueueSnackbar("لا يوجد اتصال بالانترنت", {
            variant: "error",
            autoHideDuration: 2000,
          });
          setLoading(false);
          throw new Error("البريد الالكتروني او كلمة المرور غير صحيحة");
        }
        return res.json();
      })
      .then((data) => {
        setConversations(data.conversations);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err);
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
        {loading && <Stack direction={'row'} sx={{justifyContent: 'center', marginTop: '50px'}}><CircularProgress /></Stack>}
        {!loading && conversations?.map((e) => <CustomerToChat data={e} />)}
      </List>
    </Box>
  );
};

export default ChatDetails;
