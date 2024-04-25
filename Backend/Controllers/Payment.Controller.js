const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../Models/Payment.Model");

exports.payment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "lkr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.paymentSuccess = async (req, res) => {
  try {
    const { amount, userId, projectTitle } = req.body;

    const newPayment = new Payment({
      amount: amount,
      userId: userId,
      projectTitle: projectTitle,
    });

    await newPayment.save();

    res.status(200).send("Payment saved successfully.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

