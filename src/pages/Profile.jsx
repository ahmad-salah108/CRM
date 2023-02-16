import { AddPhotoAlternate } from '@mui/icons-material'
import { Avatar, Box, Button, CircularProgress, Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { token, currentUser } = useSelector(state => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [ company, setCompany ] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/setting/show`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify({
        setting_id: 1
      })
    })
    .then(res => res.json())
    .then((data) => {
      if(!data.status){
        Object.keys(data.errors).slice(0, 3).forEach(e => {
          enqueueSnackbar(data.errors[e][0], {
            variant: "error",
            autoHideDuration: 2000,
          });
        });
      }else{
        setCompany(data.setting);
        setValue('company_name', data.setting?.company_name)
        setValue('company_email', data.setting?.company_email)
        setValue('company_phone_NO', data.setting?.company_phone_NO)
      }
    })
    .catch((err) => {
      enqueueSnackbar("لا يوجد اتصال بالانترنت", {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.log(err);
    });
  },[])

  const handleSave = ()=>{
    setLoading(true);
    const formData = new FormData();
    formData.append('setting_id', company?.id);
    formData.append('company_name', watch('company_name'));
    formData.append('company_email', watch('company_email'));
    formData.append('company_phone_NO', watch('company_phone_NO'));
    formData.append('company_logo', image);
    
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/setting/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })
    .then((res) => res.json())
    .then((data) => {
      setLoading(false);
      if(!data.status){
        Object.keys(data.errors).slice(0, 3).forEach(e => {
          enqueueSnackbar(data.errors[e][0], {
            variant: "error",
            autoHideDuration: 2000,
          });
        });
      }else{
        enqueueSnackbar(data.message, {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
    })
    .catch((err) => {
      setLoading(false);
      enqueueSnackbar('لا يوجد اتصال بالانترنت', {
        variant: "error",
        autoHideDuration: 2000,
      });
      console.log(err);
    });
  }

  return (
    <Box sx={{marginInline: 'auto'}}>
      <Paper elevation={3} sx={{padding: '20px', height: 'calc(100vh - 112px)', overflow: 'auto'}}>
        <Stack direction={'column'} sx={{justifyContent: 'space-around', height: '100%', rowGap: '15px'}}>
          <Stack direction={'row'} sx={{columnGap: '80px', rowGap: '15px', flexWrap: 'wrap'}}>
            <Avatar src={currentUser.image} alt='صورة شخصية' sx={{width: '160px', height: '160px', borderRadius: '4px'}}/>
            <Stack direction={'row'} sx={{columnGap: '80px', rowGap: '15px', flexWrap: 'wrap'}}>
              <Stack direction={'column'} sx={{gap: '15px'}}>
                <Box>
                  <Typography color='a4' fontSize={'small'} sx={{marginBottom: '5px'}}>الاسم</Typography>
                  <TextField
                   InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={currentUser.name}
                  size='small'
                  />
                </Box>
                <Box>
                  <Typography color='a4' fontSize={'small'} sx={{marginBottom: '5px'}}>الوظيفة</Typography>
                  <TextField
                   InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={currentUser.job}
                  size='small'
                  />
                </Box>
                <Box>
                  <Typography color='a4' fontSize={'small'} sx={{marginBottom: '5px'}}>الايميل</Typography>
                  <TextField
                   InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={currentUser.email}
                  size='small'
                  />
                </Box>
              </Stack>
              <Stack direction={'column'} sx={{gap: '15px'}}>
                <Box>
                  <Typography color='a4' fontSize={'small'} sx={{marginBottom: '5px'}}>رقم الهوية</Typography>
                  <TextField
                   InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={currentUser.ID_NO}
                  size='small'
                  />
                </Box>
                <Box>
                  <Typography color='a4' fontSize={'small'} sx={{marginBottom: '5px'}}>رقم الهاتف</Typography>
                  <TextField
                   InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={currentUser.phone_NO}
                  size='small'
                  />
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Divider/>
          <form onSubmit={handleSubmit(handleSave)}>
            <Stack direction={'row'} sx={{flexWrap: 'wrap', justifyContent: 'space-between'}}>
              <Stack direction={'row'} sx={{columnGap: '80px', rowGap: '15px', flexWrap: 'wrap'}}>
                <Stack direction={'column'}>
                  <Avatar src={(image && URL.createObjectURL(image)) || company?.company_logo} alt='صورة الشركة' sx={{width: '160px', height: '160px', borderRadius: '4px'}}/>
                  <label style={{padding: '10px', cursor: 'pointer', width: 'fit-content'}}>
                    <AddPhotoAlternate color="primary" fontSize="large"/>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} style={{display: 'none'}} />
                  </label>
                </Stack>
                <Stack direction={'column'} sx={{gap: '15px'}}>
                  <Box>
                    <Typography color='a4' fontSize={'small'} sx={{marginBottom: '5px'}}>اسم الشركة</Typography>
                    <TextField
                      {...register("company_name")}
                      size='small'
                      />
                  </Box>
                  <Box>
                    <Typography color='a4' fontSize={'small'} sx={{marginBottom: '5px'}}>ايميل الشركة</Typography>
                    <TextField
                      {...register("company_email")}
                      type='email'
                      size='small'
                      />
                  </Box>
                  <Box>
                    <Typography color='a4' fontSize={'small'} sx={{marginBottom: '5px'}}>رقم الشركة</Typography>
                    <TextField
                      {...register("company_phone_NO")}
                      size='small'
                      />
                  </Box>
                </Stack>
              </Stack>
              <Stack direction={'column'} sx={{justifyContent: 'flex-end'}}>
                <Button variant='contained' type='submit' className={loading ? 'disabled' : ''}>
                  {loading && <CircularProgress color="white" sx={{width: '20px !important', height: '20px !important', marginInlineEnd: '5px'}}/>}
                  حفظ
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Profile