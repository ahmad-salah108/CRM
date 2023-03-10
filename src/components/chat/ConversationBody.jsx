import { Box, CircularProgress, styled } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import Pusher from "pusher-js";

const ConversationBody = ({ setConversation }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [conversationData, setConversationData] = useState();
  const [arrivalMessage, setArrivalMessage] = useState();
  const { ChatId } = useParams();
  const navigate = useNavigate();
  const divScroll = useRef();

  const StyledBox = styled(Box)({
    flexGrow: "1",
    overflow: "auto",
    display: "flex",
    flexDirection: "column-reverse",
    padding: "16px 10px 0",
    height: "calc(100vh - 218px)",
    "& .infinite-scroll-component ": {
      overflow: "initial",
    },
  });

  const fetchMessages = (
    nextLink = `${process.env.REACT_APP_API_URL}/public/api/auth/conversations/show`
  ) => {
    if (!nextLink) {
      return;
    }
    setLoading(true);
    fetch(nextLink, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversation_id: ChatId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (!data.status) {
          navigate("/chat/not-found");
        } else {
          setMessages((prev) => [...prev, ...data.messages.data]);
          setConversationData(data);
          setConversation(data.conversation);
        }
      })
      .catch((err) => {
        setLoading(false);
        navigate("/chat/not-found");
        console.log(err);
      });
  };

  // reset and fetch messages again whenever ChatId changes
  useEffect(() => {
    setMessages([]);
    setConversationData("");
    fetchMessages();
  }, [ChatId]);

  // Pusher, real time messages
  useEffect(() => {
    const pusher = new Pusher("baba382db1e49c335622", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("Staff-Management");
    channel.bind("message-sent", (data) => {
      setArrivalMessage(data);
    });
  }, []);

  // scroll down when a new message arrives
  useEffect(() => {
    if (arrivalMessage?.message.conversation_id == ChatId) {
      setMessages((prev) => [arrivalMessage?.message, ...prev]);
      setTimeout(() => {
        divScroll.current.scrollTop = divScroll.current.scrollHeight;
      }, 1);
    }
  }, [arrivalMessage]);

  return (
    <StyledBox id="scrollableDiv" ref={divScroll}>
      {
        <InfiniteScroll
          dataLength={messages?.length}
          inverse={true}
          hasMore={true}
          scrollableTarget="scrollableDiv"
          style={{ display: "flex", flexDirection: "column-reverse" }}
          // fetch the next messages page when reaching the top
          next={() => {
            fetchMessages(conversationData.messages.next_page_url);
          }}
        >
          {messages.length > 0 &&
            messages.map((data) => {
              return (
                <Message
                  key={data.id}
                  data={data}
                  conversationData={conversationData.conversation}
                />
              );
            })}
          {loading && <CircularProgress sx={{ margin: "15px auto" }} />}
        </InfiniteScroll>
      }
    </StyledBox>
  );
};

export default ConversationBody;
