const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    stripeSessionId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
