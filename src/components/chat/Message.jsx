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
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { FileIcon, defaultStyles } from 'react-file-icon';

const BoxTime = styled(Box)({
  color: "#A4A4A4",
  display: "flex",
  alignItems: "center",
});

export default function Message({ data, conversationData }) {
  const theme = useTheme();
  const documentExtention = data?.media && data?.media.split(".");
  const documentName = data?.media && data?.media.split("/");

  const MessageText = styled(Typography)(({ theme }) => ({
    // ...(lang == 'en' ? {
    //   borderRadius: data.fromMe == '1' ? "12px 12px 12px 0px" : "12px 12px 0px 12px",
    // } : {
    borderRadius:
      data.fromMe == "1" ? "12px 12px 12px 0px" : "12px 12px 0px 12px",
    // }),
    backgroundColor:
      data.fromMe == "1" ? theme.palette.primary.main : theme.palette.eee,
    color: data.fromMe == "1" ? "#fff" : "",
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
        justifyContent: data.fromMe == "1" ? "flex-start" : "flex-end",
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
            {data.type == "audio" ? (
              <audio controls>
                <source src={data?.media} />
              </audio>
            ) : (
              <MessageText
                sx={{
                  maxWidth: "450px",
                  "& .read-more-button": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                {data.type == "image" || data.type == "sticker" ? (
                  <Stack direction={"column"}>
                    <a
                      href={data?.media}
                      target="_blank"
                      style={{ display: "grid", placeItems: "center" }}
                    >
                      <img
                        src={data?.media}
                        style={{
                          width: "100%",
                          borderRadius: "12px",
                          maxHeight: "244px",
                        }}
                      />
                    </a>
                    {data.body && <ReadMoreReact
                      text={data?.body}
                      min={80}
                      max={200}
                      readMoreText={"???????? ????????????"}
                    />}
                  </Stack>
                ) : data.type == "video" ? (
                  <Stack direction={"column"}>
                    <video
                      controls
                      width="300"
                      height={"300"}
                      style={{
                        borderRadius: "12px",
                        background: theme.palette.black,
                      }}
                    >
                      <source src={data?.media} />
                    </video>
                    {data.body && <ReadMoreReact
                      text={data?.body}
                      min={80}
                      max={200}
                      readMoreText={"???????? ????????????"}
                    />}
                  </Stack>
                ) : data.type == "document" ? (
                  <Stack direction={"column"} sx={{gap: '10px'}}>
                    <a
                      href={data?.media}
                      target="_blank"
                      style={{
                        display: "grid",
                        placeItems: "center",
                        textDecoration: "underline",
                      }}
                    >
                      <Stack direction={"row"} sx={{ gap: "5px", '& svg': {width: '20px'}, alignItems: 'center' }}>
                        <FileIcon extension={documentExtention[documentExtention.length - 1]} {...defaultStyles[documentExtention[documentExtention.length - 1]]} /> {documentName[documentName.length - 1].slice(2)}
                      </Stack>
                    </a>
                    {data.body && <ReadMoreReact
                      text={data?.body}
                      min={80}
                      max={200}
                      readMoreText={"???????? ????????????"}
                    />}
                  </Stack>
                ) : (
                  <ReadMoreReact
                    text={data.body}
                    min={80}
                    max={200}
                    readMoreText={"???????? ????????????"}
                  />
                )}
              </MessageText>
            )}
          </>
          {data.fromMe == "0" && (
            <Avatar src={conversationData?.image} alt={"???????? ??????????"} />
          )}
        </Box>
        <BoxTime sx={{ marginTop: "2px" }}>
          <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
            <ReactTimeAgo date={data.created_at} locale="ar" />
          </Typography>
        </BoxTime>
      </Box>
    </Box>
  );
}
