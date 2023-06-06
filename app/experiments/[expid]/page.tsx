"use client";

export default function Page({
  params: { expid },
}: {
  params: {
    expid: string;
  };
}) {
  return <p>Post: {expid}</p>;
}
