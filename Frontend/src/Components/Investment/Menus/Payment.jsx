import React from "react";
import Earnings from "./Payment/TotalAmount";
import PendingAmount from "./Payment/OnGoingProjectAmount";
import { Card, CardContent, Typography, Grid } from "@mui/material";

export default function Payment() {
  return (
    <>
      <Card>
        <CardContent>
          <Earnings />
        </CardContent>{" "}
      </Card>

      <PendingAmount />
    </>
  );
}
