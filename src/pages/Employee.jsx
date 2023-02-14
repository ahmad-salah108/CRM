import { Box, Paper, Skeleton, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CardEmployee from "../components/employee/CardEmployee";
import CardSkeleton from "../components/employee/CardSkeleton";

const Employee = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/public/api/auth/employee/index`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          enqueueSnackbar("لا يوجد اتصال بالانترنت", {
            variant: "error",
            autoHideDuration: 2000,
          });
          setLoading(false);
          throw new Error("البريد الالكتروني او كلمة المرور غير صحيحة");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setEmployees(data.user)
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err);
      });
  }, []);

  return (
    <Stack
      direction={"row"}
      sx={{
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {loading && 
        <>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
        </>
      }
      {!loading && employees?.map(employee => (
        <CardEmployee key={employee?.id} employee={employee} setEmployees={setEmployees}/>
      ))}
    </Stack>
  );
};

export default Employee;
