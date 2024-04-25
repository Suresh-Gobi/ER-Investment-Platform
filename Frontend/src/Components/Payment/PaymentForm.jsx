import React, { useState } from 'react';

export default function PaymentForm() {
  const itemName = "Fireimag";
  const itemPrice = 500;
  const [quantity, setQuantity] = useState(1);
  const [finalAmount, setFinalAmount] = useState(itemPrice);

  const decrement = () => {
    if (quantity <= 1) {
      setQuantity(1);
      setFinalAmount(itemPrice);
    } else {
      setQuantity(quantity - 1);
      setFinalAmount(finalAmount - itemPrice);
    }
  };

  const increment = () => {
    setQuantity(quantity + 1);
    setFinalAmount(finalAmount + itemPrice);
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
              price: itemPrice,
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
      <p>Price: ${itemPrice}</p>
      <p>Quantity: {quantity}</p>
      <p>Total Amount: ${finalAmount}</p>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
