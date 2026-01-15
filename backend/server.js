const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Stripe = require("stripe");
const Order = require("./models/Order");
require("dotenv").config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.get("/health", (req, res) => {
  res.send("SERVER OK");
});

// ✅ Middleware
app.use(cors());
app.use(express.json()); // for normal APIs

// CREATE CHECKOUT

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, email } = req.body;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
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

// STRIPE WEBHOOK

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
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

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: "success" }
      ).then(() => console.log("Order marked as SUCCESS"));
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;

      Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: "failed" }
      ).then(() => console.log("Order marked as FAILED (expired)"));
    }

    res.json({ received: true });
  }
);

// MONGODB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoConnected"))
  .catch((err) => console.error("MongoDB error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
