import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { CartDrawer } from "./components/SidePanel/CartDrawer";
import { useProductStore } from "./data/useProductStore";
import Shop from "./page/Shop";
import ProductDetails from "./components/Shop/ProductDetails";
import { Cart } from "./components/Cart/Cart";
import { Checkout } from "./components/Checkout/Checkout";

function App() {
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="min-h-screen w-full flex flex-col overflow-x-hidden p-1 justify-between m-auto md:w-312.5">
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <CartDrawer />
    </div>
  );
}

export default App;
