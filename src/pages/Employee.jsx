import { Add } from "@mui/icons-material";
import { Box, Button, Fab, Grid, Paper, Skeleton, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CardEmployee from "../components/employee/CardEmployee";
import CardSkeleton from "../components/employee/CardSkeleton";
import DialogAddEmployee from "../components/employee/DialogAddEmployee";

const Employee = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/employee/index`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
          setEmployees(data.user)
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
  }, []);

  return (
    <Grid
    container
    sx={{rowGap: '24px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
      {loading && 
        <>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
        </>
      }
      {!loading && employees?.map(employee => (
        <CardEmployee key={employee?.id} employee={employee} setEmployees={setEmployees}/>
      ))}
      <DialogAddEmployee openAdd={openAdd} handleClose={()=>{setOpenAdd(false)}} setEmployees={setEmployees}/>
      <Fab sx={{position: 'fixed', bottom: '30px', left: '80px'}} color="primary" aria-label="add" onClick={()=>{setOpenAdd(true)}}>
        <Add />
      </Fab>
    </Grid>
  );
};

export default Employee;
