import { ChatBubble } from "@mui/icons-material";
import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const CardHome = () => {
  const theme = useTheme();
  return (
    <Paper elevation={3} sx={{ padding: "30px 40px" }} className='card-animation'>
      <Stack
        direction={"row"}
        sx={{ justifyContent: "center", alignItems: "center", gap: "20px" }}
      >
        <Stack direction={"column"}>
          <Typography variant="h4">150</Typography>
          <Typography color="cardText">عدد المحادثات</Typography>
        </Stack>
        <Box
          sx={{
            borderRadius: "50%",
            padding: "15px",
            background: theme.palette.primaryLight,
            display: "grid",
            placeItems: "center",
          }}
        >
          <ChatBubble fontSize="large" color="primary" />
        </Box>
      </Stack>
    </Paper>
  );
};

export default CardHome;
