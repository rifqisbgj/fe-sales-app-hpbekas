import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { useEffect } from "react";
import privateApi from "../../api/privateApi";

const ChartVarianTerlaris = ({ token }) => {
  const [varianLaris, setData] = useState([]);
  useEffect(() => {
    getBrandLaris();
  }, []);

  const getBrandLaris = async () => {
    console.log(token);
    const res = await privateApi.get(`/dashboard/varianSold`, {
      headers: { Authorization: token },
    });
    setData(res.data.data);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 235, 235, 0.636)",
          stepSize: 1,
        },
        grid: {
          color: "rgba(184, 163, 163, 0.432)",
          borderColor: "white", // <-- this line is answer to initial question
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 235, 235, 0.636)",
        },
        grid: {
          color: "rgba(184, 163, 163, 0.432)",
          borderColor: "white", // <-- this line is answer to initial question
        },
      },
    },
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {},
  };

  const labels = varianLaris && varianLaris.map((data) => data.namavarian);

  const data = {
    labels,
    datasets: [
      {
        label: "Varian Terlaris",
        data:
          varianLaris && varianLaris.map((data) => parseInt(data.total_varian)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} className="text-white" />;
};

export default ChartVarianTerlaris;
