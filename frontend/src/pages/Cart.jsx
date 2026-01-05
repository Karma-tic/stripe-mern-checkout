import { useState } from "react";

function Cart() {
  const [cartItems] = useState([
    { name: "T-Shirt", price: 20, quantity: 1 },
    { name: "Shoes", price: 50, quantity: 1 },
  ]);

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "30px",
        width: "350px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Cart
      </h2>

      {cartItems.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>{item.name} (x{item.quantity})</span>
          <span>${item.price}</span>
        </div>
      ))}

      <button
        onClick={handleCheckout}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "10px",
          background: "#6772e5",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Checkout
      </button>
    </div>
  </div>
);

}

export default Cart;
