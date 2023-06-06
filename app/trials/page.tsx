"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Line } from "react-chartjs-2";
import ChartWrapper from "@/components/ChartWrapper";
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
const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "Dataset 2",
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};
function Page() {
  return (
    <ChartWrapper>
      <Line data={data} />
    </ChartWrapper>
  );
}

export default Page;
