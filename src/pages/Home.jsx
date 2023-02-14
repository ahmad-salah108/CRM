import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import ProgressProvider from "../utils/ProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Paper, Stack } from "@mui/material";
import CardHome from "../components/home/CardHome";

ChartJS.register(ArcElement, Tooltip, Legend);
// data for chart
const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Home = () => {
  
  return (
    <Stack direction={'column'} sx={{gap: '24px'}}>
      <Stack direction={'row'} sx={{justifyContent: 'center', flexWrap: 'wrap', rowGap: '20px', columnGap: '22px', padding: '24px'}} bgcolor="bgLight">
        <CardHome/>
        <CardHome/>
        <CardHome/>
        <CardHome/>
        <CardHome/>
      </Stack>
      {/* <Box sx={{width: '100px'}}>
        <ProgressProvider valueStart={0} valueEnd={66}>
          {(value) => <CircularProgressbar value={value} text={`${value}%`} />}
        </ProgressProvider>
      </Box> */}
      <Stack direction={'row'} sx={{justifyContent: 'center', flexWrap: 'wrap', gap: '24px'}}>
        <Paper elevation={3} sx={{width: '63%',padding: '30px'}}>
        </Paper>
        <Paper elevation={3} sx={{padding: '30px'}}>
          <Box sx={{width: '350px', height: '350px'}}>
            <Doughnut data={data} />
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default Home;
