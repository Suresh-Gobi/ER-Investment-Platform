import React from "react";
import TotalInvestment from "./Payment/TotalInvestment";
import PaidProjects from "./Payment/PaidProjects";
import Graph from "./Payment/PaymentGraph";

export default function Payment() {
  return (
    <>
      <TotalInvestment />
      <br />
      <Graph />
      <br />
      <PaidProjects />
    </>
  );
}
