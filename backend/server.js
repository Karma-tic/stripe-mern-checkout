const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Stripe = require("stripe");
const Order = require("./models/Order");
require("dotenv").config();



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

//middleware

app.use(cors());
app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Im here");
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
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
    app.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
  const session = event.data.object;

  Order.findOneAndUpdate(
    { stripeSessionId: session.id },
    { status: "success" }
  )
    .then(() => console.log("Order marked as SUCCESS"))
    .catch((err) => console.error(" Order update failed", err));
}

if (event.type === "checkout.session.expired") {
  const session = event.data.object;

  Order.findOneAndUpdate(
    { stripeSessionId: session.id },
    { status: "failed" }
  )
    .then(() => console.log("Order marked as FAILED (expired)"))
    .catch((err) => console.error("Order update failed", err));
}
if (event.type === "payment_intent.payment_failed") {
  const paymentIntent = event.data.object;

  Order.findOneAndUpdate(
    { stripeSessionId: paymentIntent.metadata?.session_id },
    { status: "failed" }
  )
    .then(() => console.log("Order marked as FAILED (card declined)"))
    .catch((err) => console.error("Order update failed", err));
}



  res.json({ received: true });
});


    // save order as pending
    await Order.create({
      items,
      amount: totalAmount,
      status: "pending",
      stripeSessionId: session.id,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Stripe session failed" });
  }
});



//mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoConnected");
  })
  .catch((err) => {
    console.error("MongoDB error", err);
  });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
