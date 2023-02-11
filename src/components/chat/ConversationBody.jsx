import { Box } from "@mui/material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ConversationBody = () => {
  const messages = ['محمد', 'مرحبا', 'علي', 'اختبار'];
  return (
    <Box
      sx={{
        flexGrow: '1',
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        paddingX: "10px",
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
            messages.map((msg) => {
              return (
                <div>
                  {msg}
                  {/* <Message
                    canPen={true}
                    key={msg.id + "sbhwvgf"}
                    msg={msg}
                    message={msg.message}
                    you={user.id === +msg.user_id}
                    user={msg.message_user}
                    time={msg.created_at}
                    handleReply={handleReply}
                    setPinnedMessage={setPinnedMessage}
                  /> */}
                </div>
              );
            })}
        </InfiniteScroll>
      }
    </Box>
  );
};

export default ConversationBody;
