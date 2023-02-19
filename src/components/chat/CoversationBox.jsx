import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import ConversationBody from './ConversationBody'
import ConversationFooter from './ConversationFooter'
import ConversationHeader from './ConversationHeader'

const CoversationBox = () => {
  const [conversation, setConversation] = useState('');

  return (
    <Stack direction={'column'} sx={{height: '100%'}}>
      <ConversationHeader conversation={conversation}/>
      <ConversationBody setConversation={setConversation}/>
      <ConversationFooter/>
    </Stack>
  )
}

export default CoversationBox