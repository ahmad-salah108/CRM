import { Box, List, TextField, Typography } from "@mui/material";
import React from "react";
import CustomerToChat from "./CustomerToChat";

const ChatDetails = () => {
  return (
    <Box sx={{width: '22%', padding: '8px 12px'}}>
      <Box sx={{ padding: "8px 0 8px" }}>
        <Typography variant="h5" sx={{ marginBottom: "13px" }}>
          المحادثات
        </Typography>
        <TextField variant="outlined" label="بحث" size="small" fullWidth />
      </Box>
      <List
        sx={{
          bgcolor: "background.paper",
          height: "calc(100vh - 223px)",
          overflow: "auto",
        }}
      >
        {[...Array.from(Array(4).keys())].map((e) => (
          <CustomerToChat id={e} />
        ))}
      </List>
    </Box>
  );
};

export default ChatDetails;
