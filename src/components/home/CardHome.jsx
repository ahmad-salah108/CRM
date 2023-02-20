import { ChatBubble } from "@mui/icons-material";
import { Box, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

const CardHome = () => {
  const theme = useTheme();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Paper elevation={3} sx={{ padding: "30px" }} className="card-animation">
        <Stack
          direction={"row"}
          sx={{ justifyContent: "center", alignItems: "center", gap: "45px" }}
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
    </Grid>
  );
};

export default CardHome;
