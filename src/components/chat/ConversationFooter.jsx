import { Box, Button, IconButton, Stack, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

const ConversationFooter = () => {
  const fileInput = useRef();
  const theme = useTheme();
  return (
    <Box sx={{padding: '3px 8px', background: theme.palette.eee}}>
      <Stack direction={'row'}>
        <input type="file" ref={fileInput} style={{display: 'none'}}/>
        <IconButton color='primary' onClick={()=>fileInput.current.click()}>
            <AttachFileIcon/>
        </IconButton>
        <form onSubmit={(e)=>{e.preventDefault(); console.log('submit')}} style={{display: 'flex',flexGrow: '1'}}>
          <input type="text" placeholder='اكتب رسالة' style={{flexGrow: '1', border: 'none', outline: 'none', background: 'inherit'}}/>
          <IconButton type='submit' color='primary'><SendIcon sx={{transform: 'rotate(180deg)'}}/></IconButton>
        </form>
      </Stack>
    </Box>
  )
}

export default ConversationFooter