import { Box, Stack } from '@mui/material'
import React from 'react'
import ConversationBody from './ConversationBody'
import ConversationFooter from './ConversationFooter'
import ConversationHeader from './ConversationHeader'

const CoversationBox = () => {
  return (
    <Stack direction={'column'} sx={{height: '100%'}}>
      <ConversationHeader/>
      <ConversationBody/>
      <ConversationFooter/>
    </Stack>
  )
}

export default CoversationBox