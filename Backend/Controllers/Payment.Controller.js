
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode:"payment",
      line_items:req.body.items.map(item=>{
        return {
            price_data:{
                currency:"lkr",
                product_data:{
                    name:item.name
                },
                unit_amount:(item.price)*100,
            },
            quantity:item.quantity
        }
      }),
      success_url:"http://localhost:5173/success",
      cancel_url:"http://localhost:5173/cancel"
    })

    res.json({url:session.url})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
};
