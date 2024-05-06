import React, { useRef } from "react";
import { Grid, Container, Card, CardContent, Typography, Button } from "@mui/material";
import Users from "./Report/TotalUser";
import TotalProjects from "./Report/TotalProjects";
import TotalOnGoingProjects from "./Report/TotalOngoingProjects";
import ApprovedProjects from "./Report/ApprovedProjects";
import UnApprovedProjects from "./Report/UnApprovedProjects";
import TotalInvestment from "./Report/TotalInvestment";
import GraphOne from "./Report/GraphOne";
import GraphTwo from "./Report/GraphTwo";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Overview() {
  const containerRef = useRef(null);

  const handleDownloadPDF = () => {
    if (!containerRef.current) return;
    
    html2canvas(containerRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4"); // Landscape orientation, A4 size
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("report.pdf");
    });
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
        Download Report
      </Button>
      <Grid container spacing={3} ref={containerRef}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Users
              </Typography>
              <Users />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Projects
              </Typography>
              <TotalProjects />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Ongoing Projects
              </Typography>
              <TotalOnGoingProjects />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Approved Projects
              </Typography>
              <ApprovedProjects />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Unapproved Projects
              </Typography>
              <UnApprovedProjects />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Investment
              </Typography>
              <TotalInvestment />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Graph One
              </Typography>
              <GraphOne />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Graph Two
              </Typography>
              <GraphTwo />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
