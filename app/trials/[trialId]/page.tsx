"use client";
import React, { use } from "react";
import useSWR from "swr";
import { fetcher } from "@/common/swrFetcher";
import { IResponseMessage, ResponseCode } from "@/types/backendTypes";
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
type scalerRecordType = {
  scalerId: number;
  trialId: number;
  scaler: string;
};
type parsedScalerRecordType = {
  step: number;
  _timestamp: string;
  [key: string]: any;
};
type labelsAndDataSetsType = {
  [key: string]: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
};
function Page({
  params: { trialId },
}: {
  params: {
    trialId: string;
  };
}) {
  const { data, error, isLoading } = useSWR<
    IResponseMessage<scalerRecordType[]>
  >(`/api/scalers/${trialId}`, fetcher);
  if (isLoading) return <div>Loading...</div>;
  if (error || data?.code != ResponseCode.Success) {
    return (
      <div>
        {error}
        {data?.errorMessage}
      </div>
    );
  }
  let parsedScalerRecords: parsedScalerRecordType[] = [];
  let labelsAndDataSets: labelsAndDataSetsType = {};
  data.data.forEach((scalerRecord) => {
    let scaler = JSON.parse(scalerRecord.scaler);
    parsedScalerRecords.push(scaler);
  });
  parsedScalerRecords.sort((a, b) => a.step - b.step);
  parsedScalerRecords.forEach((parsedScalerRecord) => {
    for (let property in parsedScalerRecord) {
      if (property != "step" && property != "_timestamp") {
        if (!labelsAndDataSets[property]) {
          labelsAndDataSets[property] = {
            labels: [],
            datasets: [
              {
                label: property,
                data: [],
              },
            ],
          };
        }
        labelsAndDataSets[property].labels.push(
          parsedScalerRecord.step.toString()
        );
        labelsAndDataSets[property].datasets[0].data.push(
          parsedScalerRecord[property]
        );
      }
    }
  });

  return (
    <div className="flex flex-wrap justify-start shrink-0">
      {Object.keys(labelsAndDataSets).map((key) => (
        <ChartWrapper key={key}>
          <Line data={labelsAndDataSets[key]} />
        </ChartWrapper>
      ))}
    </div>
  );
}

export default Page;
