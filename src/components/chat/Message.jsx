import {
  Typography,
  styled,
  Button,
  MenuItem,
  Menu,
  Avatar,
  Grid,
  Dialog,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";

const BoxTime = styled(Box)({
  color: "#A4A4A4",
  display: "flex",
  alignItems: "center",
});

export default function Message({ message, you, time }) {
  const MessageText = styled(Typography)(({ theme }) => ({
    // ...(lang == 'en' ? {
    //   borderRadius: you ? "12px 12px 12px 0px" : "12px 12px 0px 12px",
    // } : {
    borderRadius: you ? "12px 12px 12px 0px" : "12px 12px 0px 12px",
    // }),
    backgroundColor: you ? theme.palette.primary.main : theme.palette.eee,
    color: you ? "#fff" : "",
    width: "fit-content",
    fontSize: "16px",
    fontWieght: "400",
    padding: "8px",
    display: "flex",
    marginBottom: "6px",
  }));
  return (
    <Box
      sx={{
        marginBottom: "16px",
        display: "flex",
        justifyContent: you ? "flex-start" : "flex-end",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            columnGap: "5px",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          <>
            <MessageText
              sx={{
                maxWidth: "450px",
                '& .read-more-button': {
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }
              }}
            >
              <ReadMoreReact
                text={message || ""}
                min={80}
                max={200}
                readMoreText={"اقرأ المزيد"}
              />
            </MessageText>
          </>
          {!you && <Avatar src={""} alt={"asd"} />}
        </Box>
        <BoxTime sx={{ marginTop: "2px" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
            <ReactTimeAgo date={time} locale="ar" />
          </Typography>
        </BoxTime>
      </Box>
    </Box>
  );
}
