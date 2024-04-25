import React, { useState } from "react";

export default function PaymentForm({
  initialInvestment,
  projectTitle,
  projectUserId,
}) {
  const itemName = projectTitle;
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(initialInvestment * quantity);

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setFinalAmount(initialInvestment);
    } else {
      setQuantity(quantity - 1);
      setFinalAmount(initialInvestment * (quantity - 1));
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
    setFinalAmount(initialInvestment * (quantity + 1));
  };

  const checkout = async () => {
    try {
      // First, make the checkout request to get the payment URL
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

      // Next, make the payment create request to save the payment details
      const paymentCreateRes = await fetch(
        "http://localhost:5000/api/payments/paymentcreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: finalAmount,
            userId: projectUserId,
            projectTitle: projectTitle,
          }),
        }
      );
      const paymentCreateData = await paymentCreateRes.json();

      // const paymentUpdateRes = await fetch(
      //   "http://localhost:5000/api/project/paymentupdate",
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       projectId: projectUserId, // Assuming projectUserId is the projectId
      //       paidAmount: finalAmount, // Use the finalAmount calculated in the form
      //       projectStatus: "started", // Set the project status to "started"
      //     }),
      //   }
      // );

      // Redirect to the payment URL returned by the checkout API
      window.location = checkoutData.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{itemName}</h1>
      <p>Price: ${initialInvestment}</p>
      <p>Id: {projectUserId}</p>
      <p>Quantity: {quantity}</p>
      <p>Total Amount: ${finalAmount}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={checkout}>Start the project</button>
    </div>
  );
}
