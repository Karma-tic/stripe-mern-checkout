import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!email) {
      alert("Email is required before payment");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, email }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f8",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          width: "400px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Checkout</h2>

        {cartItems.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>${item.price}</span>
          </div>
        ))}

        <hr />

        <p>
          <strong>Total: ${totalAmount}</strong>
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#6772e5",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
