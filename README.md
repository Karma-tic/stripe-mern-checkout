#  MERN Stripe Checkout Application

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce demo application with **Stripe Checkout integration**, **webhook handling**, and **order persistence**.

This project demonstrates a complete payment flow using **Stripe Test Mode**, including success and failure handling via secure webhooks.

---

## Features

### Frontend (React + Vite)
- Ecommerce-style product listing (mock data)
- Product images with search functionality
- Add to Cart functionality
- Cart icon with live item count
- Checkout page with cart summary
- Mandatory email input before payment
- Redirect to Stripe Checkout
- Success and Cancel pages

###  Backend (Node.js + Express)
- Stripe Checkout Session creation
- Orders stored in MongoDB
- Order status lifecycle:
  - `pending` (checkout created)
  - `success` (payment confirmed)
  - `failed` (payment failed / expired)
- Stripe Webhook verification using signing secret
- Secure environment variable handling

---

## Payment Flow (How it works)

1. User adds products to cart
2. User proceeds to checkout and enters email
3. Backend creates Stripe Checkout session
4. Order is saved as `pending` in MongoDB
5. User completes payment on Stripe
6. Stripe sends webhook to backend
7. Backend updates order status (`success` / `failed`)

---

##  Stripe Test Cards

Use these test cards in **Stripe Test Mode**:

- **Success payment**: `4242 4242 4242 4242`
- **Failed payment**: `4000 0000 0000 9995`

Expiry: Any future date  
CVC: Any 3 digits  
ZIP: Any value  

---

## Tech Stack

- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Payments**: Stripe Checkout + Webhooks
- **Tools**: Stripe CLI, Git, GitHub

---

##  Environment Variables

Create a `.env` file inside `backend/` using the following keys:
NOTE: The repository history may show additional contributors due to initial code scaffolding. The implementation, integration, and submission were completed solely by me.
```env

PORT=5000
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

 How to Run Locally
Backend
cd backend
npm install
node server.js

Frontend
cd frontend
npm install
npm run dev

 Notes

This project uses Stripe Test Mode only

No real payments are processed

Webhooks are tested locally using Stripe CLI

 Demo

A demo video is included showing:
https://youtu.be/Sn7Y3eTc8IY
Product listing

0:00
Introduction to E-commerce App
1:40
Product Catalog Features
3:10
Checkout Process
6:40
Order Tracking and Management
