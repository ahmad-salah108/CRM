import { Box } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./Message";

const ConversationBody = () => {
  const messages = [
    {
      msg: "محمد",
      you: true,
      time: new Date(),
    },
    {
      msg: "علي",
      you: false,
      time: new Date(),
    },
    {
      msg: "مرحبا",
      you: true,
      time: new Date(),
    },
    {
      msg: "اختبار",
      you: false,
      time: new Date(),
    },
    {
      msg: "اختبار",
      you: false,
      time: new Date(),
    },
    {
      msg: "البرمجة هي عملية كتابة تعليمات وتوجيه أوامر لجهاز الحاسوب أو أي جهاز آخر مثل قارئات أقراص الدي في دي أو أجهزة استقبال الصوت والصورة في نظم الاتصالات الحديثة، لتوجيه هذا الجهاز وإعلامه بكيفية التعامل مع البيانات أو كيفية تنفيذ سلسلة من الأعمال المطلوبة تسمى خوارزمية.",
      you: true,
      time: new Date(),
    },
    {
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
        height: "calc(100vh - 218px)",
        // '& .infinite-scroll-component__outerdiv':{
        //   height: '100%'
        // },
        // '& .infinite-scroll-component':{
        //   height: '100%'
        // }
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
            messages.map(({ msg, you, time }) => {
              return <Message you={you} time={time} message={msg} />;
            })}
        </InfiniteScroll>
      }
    </Box>
  );
};

export default ConversationBody;
