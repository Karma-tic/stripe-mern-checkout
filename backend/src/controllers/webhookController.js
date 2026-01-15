const stripe = require("../config/stripe");
const Order = require("../models/Order");

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        await Order.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            status: "success",
            paymentIntentId: session.payment_intent,
            email: session.customer_email,
          }
        );

        console.log("Order marked as SUCCESS");
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;

        await Order.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            status: "failed",
            paymentIntentId: session.payment_intent,
            email: session.customer_email,
          }
        );

        console.log("Order marked as FAILED (expired)");
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error.message);
    res.status(500).json({ error: "Webhook handler failed" });
  }
};

module.exports = { handleStripeWebhook };
