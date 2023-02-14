import { Box, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

const CardSkeleton = () => {
  return (
    <Paper elevation={3} sx={{ padding: "15px", width: "fit-content" }}>
      <Stack direction={"row"} sx={{ gap: "15px", alignItems: "center" }}>
        <Skeleton animation="wave" width={150} height={150} />
        <Stack direction="column" sx={{}}>
          <Box>
            <Skeleton animation="wave" width={50} height={20} />
            <Skeleton animation="wave" width={100} height={20} />
          </Box>
          <Skeleton animation="wave" width={130} height={90} />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CardSkeleton;
