"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "@/common/swrFetcher";
import { IResponseMessage, ResponseCode } from "@/types/backendTypes";
import exp from "constants";
import { useRouter } from "next/navigation";
type experiment = {
  projectId: number;
  projectName: string;
};

function Page() {
  const {
    data,
    error,
    isLoading,
  }: {
    data: IResponseMessage<experiment[]>;
    error: any;
    isLoading: boolean;
  } = useSWR(`/api/experiments`, fetcher);
  const router = useRouter();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error || data.code != ResponseCode.Success) {
    return (
      <div>
        {error}
        {data.errorMessage}
      </div>
    );
  }

  return (
    <div className="h-screen">
      <table>
        <thead>
          <tr>
            <th>Experiment Name</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((experiment) => (
            <tr
              key={experiment.projectId}
              onClick={() => {
                router.push(`/experiments/${experiment.projectId}`);
              }}
            >
              {experiment.projectName}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
