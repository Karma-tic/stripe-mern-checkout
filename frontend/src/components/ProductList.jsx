import { useState } from "react";
import { useCart } from "../context/CartContext";

const productsData = [
  {
    id: 1,
    name: "T-Shirt",
    price: 20,
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    name: "Shoes",
    price: 50,
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    name: "Jacket",
    price: 80,
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 4,
    name: "Jeans",
    price: 40,
    image: "https://picsum.photos/300/200?random=4",
  },
  {
    id: 5,
    name: "Backpack",
    price: 35,
    image: "https://picsum.photos/300/200?random=5",
  },
  {
    id: 6,
    name: "Cap",
    price: 15,
    image: "https://picsum.photos/300/200?random=6",
  },
  {
    id: 7,
    name: "Sunglasses",
    price: 25,
    image: "https://picsum.photos/300/200?random=7",
  },
  {
    id: 8,
    name: "Hoodie",
    price: 60,
    image: "https://picsum.photos/300/200?random=8",
  },
];


function ProductList() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          margin: "20px 0",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* Product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px" }}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>

              <button
                onClick={() => addToCart(product)}
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  background: "#6772e5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
