import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "./Message";
import Pusher from 'pusher-js';

const ConversationBody = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [conversationData, setConversationData] = useState();
  const [arrivalMessage, setArrivalMessage] = useState();
  const {ChatId} = useParams()
  console.log(messages)
  console.log(conversationData)
  const chatLoading = useRef();
  const divScroll = useRef();

  const fetchMessages = (nextLink = `${process.env.REACT_APP_API_URL}/public/api/auth/conversations/show`)=>{
    if(!nextLink){
      console.log('asd')
      chatLoading.current.style.display = 'none';
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
    setMessages([])
    setConversationData('')
    fetchMessages();
  }, [ChatId]);

  useEffect(()=>{
    const pusher = new Pusher("baba382db1e49c335622", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe('Staff-Management');
    channel.bind("message-sent",(data)=>{
        console.log(data)
        setArrivalMessage(data)
    });
  },[])

  useEffect(()=>{
    if(arrivalMessage?.message.conversation_id == ChatId){
      setMessages(prev => [arrivalMessage?.message, ...prev]);
      setTimeout(() => {
        divScroll.current.scrollTop = divScroll.current.scrollHeight;
      }, 1);
    }
  },[arrivalMessage])

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
        '& .infinite-scroll-component ': {
          overflow: 'initial'
        }
      }}
      id="scrollableDiv"
      ref={divScroll}
    >
      {
        <InfiniteScroll
          dataLength={messages?.length}
          inverse={true}
          hasMore={true}
          scrollableTarget="scrollableDiv"
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          loader={<CircularProgress ref={chatLoading} id="chatLoading" sx={{margin: '15px auto'}}/>}
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
