import { Avatar, Box, IconButton, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ConversationHeader = () => {
  const theme = useTheme();
  return (
    <Box sx={{padding: '16px', background: theme.palette.secondary.main, color: '#fff'}}>
      <Stack direction={'row'} sx={{justifyContent: 'space-between'}}>
        <Stack direction={'row'} sx={{alignItems: 'center', gap: '20px'}}>
          <Avatar alt="محمد احمد" src='' sx={{width: '46px', height: '46px'}}/>
          <Typography>محمد احمد</Typography>
        </Stack>
        <IconButton sx={{padding: '11px'}} color="white">
          <MoreVertIcon />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default ConversationHeader