import React from "react";
import TotalInvestment from "./Payment/TotalInvestment";
import PaidProjects from "./Payment/PaidProjects";
import Graph from "./Payment/PaymentGraph";
import InvestorRevenue from './Payment/TotalRevenue';

export default function Payment() {
  return (
    <>
      <TotalInvestment />
      <br />
      <InvestorRevenue/>
      <br />
      <Graph />
      <br />
      <PaidProjects />
    </>
  );
}
