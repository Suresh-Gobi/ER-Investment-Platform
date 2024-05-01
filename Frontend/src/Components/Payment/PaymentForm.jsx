import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, Card, Container } from "@mui/material";

export default function PaymentForm({
  initialInvestment,
  projectTitle,
  projectUserId,
  projectId,
}) {
  const itemName = projectTitle;
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(initialInvestment);

  useEffect(() => {
    setFinalAmount(initialInvestment * quantity);
  }, [quantity, initialInvestment]);

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const checkout = async () => {
    try {
      const token = localStorage.getItem("token");

      const checkoutRes = await fetch(
        "http://localhost:5000/api/payments/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            items: [
              {
                id: 1,
                quantity: quantity,
                price: initialInvestment,
                name: itemName,
              },
            ],
          }),
        }
      );
      const checkoutData = await checkoutRes.json();

      // Redirect to the payment URL returned by the checkout API
      window.location.href = checkoutData.url;

      const paymentProjectRes = await fetch(
        "http://localhost:5000/api/project/paymentproject",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            projectId: projectId,
            paidAmount: finalAmount,
            startDate: new Date().toISOString(),
          }),
        }
      );
      const paymentProjectData = await paymentProjectRes.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Card style={{padding: '20px'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">{itemName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Project Id: {projectId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Price: ${initialInvestment}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Id: {projectUserId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Quantity: {quantity}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Total Amount: ${finalAmount}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={decrement}>
              -
            </Button>
            <Button variant="contained" color="primary" onClick={increment}>
              +
            </Button>
            <br />
            <br />
            <Button variant="contained" onClick={checkout}>
              Pay Now
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
