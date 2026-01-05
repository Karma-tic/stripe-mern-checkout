import ProductList from "../components/ProductList";
import CartIcon from "../components/CartIcon";

function Home() {
  return (
    <div style={{ padding: "30px", maxWidth: "1100px", margin: "auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Simple Store</h2>
        <CartIcon />
      </header>

      <ProductList />
    </div>
  );
}

export default Home;
