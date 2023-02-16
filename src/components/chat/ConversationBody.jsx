import { Box } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./Message";

const ConversationBody = () => {
  const messages = [
    {
      id: 1,
      msg: "محمد",
      you: true,
      time: new Date(),
    },
    {
      id: 2,
      msg: "علي",
      you: false,
      time: new Date(),
    },
    {
      id: 3,
      msg: "مرحبا",
      you: true,
      time: new Date(),
    },
    {
      id: 4,
      msg: "اختبار",
      you: false,
      time: new Date(),
    },
    {
      id: 5,
      msg: "اختبار",
      you: false,
      time: new Date(),
    },
    {
      id: 6,
      msg: "البرمجة هي عملية كتابة تعليمات وتوجيه أوامر لجهاز الحاسوب أو أي جهاز آخر مثل قارئات أقراص الدي في دي أو أجهزة استقبال الصوت والصورة في نظم الاتصالات الحديثة، لتوجيه هذا الجهاز وإعلامه بكيفية التعامل مع البيانات أو كيفية تنفيذ سلسلة من الأعمال المطلوبة تسمى خوارزمية.",
      you: true,
      time: new Date(),
    },
    {
      id: 7,
      msg: "ا والصورة في نظم الاتصالات الحديثة، لتوجيه هذا الجهاز وإعلامه بكيفية التعامل مع البيانات أو كيفية تنفيذ سلسلة من الأعمال المطلوبة تسمى خوارزمية.",
      you: false,
      time: new Date(1676220486 * 1000),
    },
  ];
  return (
    <Box
      sx={{
        flexGrow: "1",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        paddingX: "10px",
        paddingTop: "16px",
        height: "calc(100vh - 218px)"
      }}
      id="scrollableDiv"
    >
      {
        <InfiniteScroll
          dataLength={messages.length}
          inverse={true}
          hasMore={true}
          scrollableTarget="scrollableDiv"
        >
          {messages.length > 0 &&
            messages.map(({ msg, you, time, id }) => {
              return <Message key={id} you={you} time={time} message={msg} />;
            })}
        </InfiniteScroll>
      }
    </Box>
  );
};

export default ConversationBody;
