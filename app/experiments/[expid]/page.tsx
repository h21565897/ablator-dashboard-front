"use client";
import { fetcher } from "@/common/swrFetcher";
import { IResponseMessage } from "@/types/backendTypes";
import useSWR from "swr";
import { useRouter } from "next/navigation";
type trial = {
  trialId: number;
  trialName: string;
};
export default function Page({
  params: { expid },
}: {
  params: {
    expid: string;
  };
}) {
  const { data, error, isLoading } = useSWR<IResponseMessage<trial[]>>(
    `/api/trials/${expid}`,
    fetcher
  );
  const router = useRouter();
  if (isLoading) return <p>Loading...</p>;
  if (error || data?.code != 0) return <p>{error}</p>;

  return (
    <div className="h-screen">
      <table>
        <thead>
          <tr>
            <th>Trial Name</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((trial) => (
            <tr
              key={trial.trialId}
              className="cursor-pointer hover:bg-gray-400"
              onClick={() => {
                router.push(`/trials/${trial.trialId}`);
              }}
            >
              <td>{trial.trialName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
