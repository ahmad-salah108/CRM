import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "./Message";

const ConversationBody = () => {
  const msgs = [
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
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [conversationData, setConversationData] = useState();
  const {ChatId} = useParams()
  console.log(messages)
  console.log(conversationData)

  const fetchMessages = (nextLink = `${process.env.REACT_APP_API_URL}/public/api/auth/conversations/show`)=>{
    if(!nextLink){
      return;
    }
    setLoading(true);
    fetch(
      nextLink,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          conversation_id: ChatId
        })
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
          setMessages(prev => [...prev, ...data.messages.data]);
          setConversationData(data)
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
  }

  useEffect(() => {
    fetchMessages();
  }, []);

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
      }}
      id="scrollableDiv"
    >
      {
        <InfiniteScroll
          dataLength={msgs.length}
          inverse={true}
          hasMore={true}
          scrollableTarget="scrollableDiv"
          next={() => {
            fetchMessages(conversationData.messages.next_page_url)
          }}
        >
          {messages.length > 0 &&
            messages.map(data => {
              return <Message key={data.id} data={data} conversationData={conversationData.conversation} />;
            })}
        </InfiniteScroll>
      }
    </Box>
  );
};

export default ConversationBody;
