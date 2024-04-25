import React, { useState } from 'react';

export default function PaymentForm({ initialInvestment, projectTitle }) {
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
      const res = await fetch("http://localhost:5000/api/payments/checkout", {
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
      });
      const data = await res.json();
      window.location = data.url; // Redirect to Stripe Checkout page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>{itemName}</h1>
      <p>Price: ${initialInvestment}</p>
      <p>Quantity: {quantity}</p>
      <p>Total Amount: ${finalAmount}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={checkout}>Start the project</button>
    </div>
  );
}
