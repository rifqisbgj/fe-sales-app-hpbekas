import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    responsive: true,
    /**
     * Default legends are ugly and impossible to style.
     * See examples in charts.html to add your own legends
     *  */
    legend: {
      display: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  },
};

// memberikan label pada grafik
const labels = ["January", "February", "March", "April", "May", "June", "July"];

// data grafik
const data = {
  labels,
  // data set dari hasil penjualan
  datasets: [
    {
      label: "Dataset 1",
      data: [250000, 350000, 400000, 601000, 230000, 900000, 120000],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const ChartPenjualan = () => {
  // memanggil Line chart dari react-chartjs
  return <Line options={options} data={data} />;
};

export default ChartPenjualan;
