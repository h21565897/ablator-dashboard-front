import React, { ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
};
function ChartWrapper({ children }: Props) {
  return <div className={"w-96"}>{children}</div>;
}

export default ChartWrapper;
