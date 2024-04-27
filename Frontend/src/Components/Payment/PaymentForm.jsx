import React, { useState } from "react";

export default function PaymentForm({
  initialInvestment,
  projectTitle,
  projectUserId,
  projectId,
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
            // You need to extract the investorId in your backend using the provided token
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
    <div>
      <h1>{itemName}</h1>
      <p>Project Id: ${projectId}</p>
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
                        