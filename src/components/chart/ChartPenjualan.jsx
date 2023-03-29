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
import { useState } from "react";
import { useEffect } from "react";
import privateApi from "../../api/privateApi";
import moment from "moment";

const ChartPenjualan = ({ token }) => {
  const [dataPenjualan, setData] = useState([]);
  useEffect(() => {
    getDataPenjualan();
  }, []);

  const getDataPenjualan = async () => {
    const res = await privateApi.get(`/dashboard/tr`, {
      headers: { Authorization: token },
    });
    setData(res.data.data);
  };

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
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 235, 235, 0.636)",
          stepSize: 1,
        },
        grid: {
          color: "rgba(184, 163, 163, 0.432)",
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 235, 235, 0.636)",
        },
        grid: {
          color: "rgba(184, 163, 163, 0.432)",
        },
      },
    },
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
  const labels =
    dataPenjualan &&
    dataPenjualan.map((data) => moment(data.tanggal).format("dddd Do YYYY"));

  // data grafik
  const data = {
    labels,
    // data set dari hasil penjualan
    datasets: [
      {
        label: "Pendapatan",
        data: dataPenjualan && dataPenjualan.map((data) => data.pendapatan),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  // memanggil Line chart dari react-chartjs
  return <Line options={options} data={data} className="h-60 md:h-72" />;
};

export default ChartPenjualan;
