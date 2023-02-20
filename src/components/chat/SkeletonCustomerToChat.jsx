import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const SkeletonCustomerToChat = () => {
  return (
    <Stack direction={'row'} sx={{gap: '10px', width: '100%'}}>
      <Skeleton variant="circular" animation='wave' width={46} height={46} />
      <Stack direction={'column'} sx={{width: 'calc(100% - 46px)'}}>
        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '30%' }} />
        <Skeleton variant="text" sx={{ fontSize: '1rem', width: '70%' }} />
      </Stack>
    </Stack>
  )
}

export default SkeletonCustomerToChat