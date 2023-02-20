import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import ProgressProvider from "../utils/ProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { Box, Grid, Paper, Stack } from "@mui/material";
import CardHome from "../components/home/CardHome";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
// data for chart
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const dataVertical = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [0, 70, 100, 210, 200, 140, 611],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [10, 100, 200, 420, 800, 340, 811],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Home = () => {
  return (
    <>
      <Grid
        container
        sx={{
          rowGap: "24px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "80px",
        }}
      >
        <CardHome />
        <CardHome />
        <CardHome />
        <CardHome />
        {/* <Box sx={{width: '100px'}}>
        <ProgressProvider valueStart={0} valueEnd={66}>
          {(value) => <CircularProgressbar value={value} text={`${value}%`} />}
        </ProgressProvider>
      </Box> */}
      </Grid>
      <Grid
        container
        sx={{
          rowGap: "24px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Grid
          item
          lg={7}
          xs={12}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <Paper elevation={3} sx={{ width: "100%", height: "360px", display: 'grid', placeItems: 'center' }}><Bar options={options} data={dataVertical} /></Paper>
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <Paper elevation={3} sx={{ padding: "30px" }}>
            {/* <Box sx={{ width: "350px", height: "350px" }}> */}
            <Doughnut data={data} />
            {/* </Box> */}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
