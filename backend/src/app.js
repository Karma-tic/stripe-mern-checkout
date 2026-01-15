const express = require("express");
const cors = require("cors");

const checkoutRoutes = require("./routes/checkoutRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/create-checkout-session", checkoutRoutes);
app.use("/webhook", webhookRoutes);

module.exports = app;
