import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import DialogDeleteEmployee from "./DialogDeleteEmployee";
import DialogEditEmployee from "./DialogEditEmployee";

const CardEmployee = ({employee, setEmployees}) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  return (
    <Paper elevation={3} sx={{padding: '15px', width: 'fit-content'}} className='card-animation'>
      <Stack direction={'row'} sx={{gap: '15px', alignItems: 'center'}}>
        <Avatar sx={{borderRadius: '4px', width: '120px', height: '120px'}} src="" alt-=""/>
        <Stack direction='column' sx={{gap: '7px'}}>
          <Box>
            <Typography>{employee?.name}</Typography>
            <Typography fontSize={"small"} color='fontLight'>{employee?.email}</Typography>
          </Box>
          <Stack direction={'row'} bgcolor='ef' sx={{padding: '7px', borderRadius: '4px', gap: '15px'}}>
            <Stack direction={'column'} sx={{gap: '3px'}}>
              <Typography fontSize={'small'} color='fontLight'>رقم الهاتف</Typography>
              <Typography fontSize={'small'}>{employee?.phone_NO}</Typography>
            </Stack>
            <Stack direction={'column'} sx={{gap: '3px'}}>
              <Typography fontSize={'small'} color='fontLight'>الرقم التعريفي</Typography>
              <Typography fontSize={'small'}>{employee?.ID_NO}</Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} sx={{gap: '15px'}}>
            <Button variant="contained" onClick={()=>{setOpenEdit(true)}}>تعديل</Button>
            <Button variant="outlined" onClick={()=>{setOpenDelete(true)}}>حذف</Button>
          </Stack>
        </Stack>
      </Stack>
      <DialogEditEmployee openEdit={openEdit} handleClose={()=>{setOpenEdit(false)}} employee={employee} setEmployees={setEmployees}/>
      <DialogDeleteEmployee openDelete={openDelete} handleClose={()=>{setOpenDelete(false)}} employee={employee} setEmployees={setEmployees}/>
    </Paper>
  );
};

export default CardEmployee;
