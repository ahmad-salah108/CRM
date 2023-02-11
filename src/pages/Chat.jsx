import { Box, Divider, List, Stack, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom';
import CustomerToChat from '../components/chat/CustomerToChat'

const Chat = () => {
  const theme = useTheme();
  return (
    <Box sx={{width: '100%', border: `1px solid ${theme.palette.ddd}`, borderRadius: '7px', overflow: 'hidden'}}>
      <Stack direction={'row'} sx={{minWidth: '1000px'}}>
        <List sx={{width: '22%', bgcolor: 'background.paper', height: 'calc(100vh - 114px)', overflow: 'auto'}}>
          <Box sx={{padding: '8px 16px'}}>
            <Typography variant='h5' sx={{marginBottom: '13px'}}>المحادثات</Typography>
            <TextField variant='outlined' label='بحث' size='small' fullWidth/>
          </Box>
          {
            [...Array.from(Array(4).keys())].map(e => (<CustomerToChat id={e}/>))
          }
        </List>
        <Divider orientation='vertical' flexItem={true}/>
        <Box sx={{width: '78%'}}>
          <Outlet/>
        </Box>
      </Stack>
    </Box>
  )
}

export default Chat