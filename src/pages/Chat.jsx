import { Box, Divider, Stack, useTheme } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom';
import ChatDetails from '../components/chat/ChatDetails';

const Chat = () => {
  const theme = useTheme();
  return (
    <Box sx={{width: '100%', border: `1px solid ${theme.palette.ddd}`, borderRadius: '7px', overflow: 'hidden'}}>
      <Stack direction={'row'} sx={{minWidth: '1000px'}}>
        <ChatDetails/>
        <Divider orientation='vertical' flexItem={true}/>
        <Box sx={{width: '78%'}}>
          <Outlet/>
        </Box>
      </Stack>
    </Box>
  )
}

export default Chat