🛒 MERN Stripe Checkout – E-Commerce Payment Flow
<p align="center"> <img src="https://img.shields.io/badge/Status-Completed-success?style=for-the-badge" /> <img src="https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge" /> <img src="https://img.shields.io/badge/Payments-Stripe-635bff?style=for-the-badge" /> <img src="https://img.shields.io/badge/Architecture-MVC-important?style=for-the-badge" /> </p> <p align="center"> <b>A clean, real-world MERN stack e-commerce checkout application using Stripe Checkout & Webhooks.</b> </p>
✨ Project Preview (GIF Demos)

🎥 Short demos showing the complete payment flow

🛍️ Product Listing & Add to Cart

🛒 Cart Management & Checkout

💳 Stripe Checkout Flow

✅ Payment Success & ❌ Failure Handling

📌 Replace the GIF URLs above with your recorded screen GIFs (ScreenToGif / Kap / Peek)

🚀 Project Overview

This project demonstrates a complete Stripe Checkout flow in a MERN stack application:

Browse products

Add items to cart

Mandatory email validation

Secure payment using Stripe Checkout

Webhook-verified payment status

Persistent order tracking in MongoDB

Designed with clean MVC backend architecture and beginner-friendly frontend flow.

🌟 Key Features
🛍️ Product Browsing

Mock product data

Clean e-commerce UI

Add to Cart functionality

🛒 Cart System

Cart icon with live item count

Add / Remove items

Review cart before checkout

📧 Checkout Validation

Email is mandatory before payment

Prevents proceeding without user email

💳 Stripe Payment Integration

Stripe Checkout Session

PCI-compliant (no card data on frontend)

Test & Live mode ready

🔔 Webhook-Driven Status Updates

Stripe Webhooks verify payment authenticity

Order status updated securely on backend

Stores PaymentIntent ID for tracking

🗄️ Order Persistence

MongoDB stores:

Purchased items

Customer email

Payment status

Stripe Session ID

Stripe PaymentIntent ID

🛠️ Tech Stack & Architecture
Frontend

React (Vite)

React Router

Context API (Cart State)

Modern responsive UI

Backend

Node.js + Express

MVC Architecture

Stripe Node SDK

Stripe Webhooks (Raw Body Verification)

Database

MongoDB Atlas

Mongoose ODM

🧠 How the Payment Flow Works
User → Add to Cart
     → Enter Email
     → Stripe Checkout Page
     → Payment Attempt
     → Stripe Webhook
     → Database Update
     → Success / Failure Page


✔ Frontend never trusts payment result
✔ Backend verifies via webhook
✔ Database updated only after Stripe confirmation

📂 Project Structure
stripe-mern-checkout/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── main.jsx
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│
├── README.md
└── .gitignore

🔧 Installation & Local Setup (Beginner Friendly)
1️⃣ Clone the Repository
git clone https://github.com/Karma-tic/stripe-mern-checkout.git
cd stripe-mern-checkout

2️⃣ Backend Setup
cd backend
npm install
cp .env.example .env


Edit .env:

PORT=5001
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...


Start backend:

node src/server.js

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Open:

http://localhost:5173

4️⃣ Stripe Webhook Setup (Required)
stripe login
stripe listen --forward-to localhost:5001/webhook


Copy whsec_... → .env → restart backend.

🧪 Stripe Test Card
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any

🎯 Assignment Checklist Coverage

✔ Product listing & cart
✔ Mandatory email validation
✔ Stripe Checkout redirect
✔ Success & failure pages
✔ MongoDB order persistence
✔ PaymentIntent ID storage
✔ Webhook-based status update
✔ MVC backend architecture
✔ Clean code & documentation

🎥 Demo Video

YouTube: https://youtu.be/Sn7Y3eTc8IY

Loom: https://www.loom.com/share/3448ab9fccbb472aaea3ea62132aa213

🛡️ Security Notes

Secrets stored in .env files

Stripe signature verification enabled

No card data stored or processed on frontend

Safe for production use

👨‍💻 Developer

Sujeet P Singh (Karmatix)
📍 Bhopal, India
🔗 GitHub: https://github.com/Karma-tic

⭐ If you like this project, give it a star!