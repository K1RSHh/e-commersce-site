import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { CartDrawer } from "./components/SidePanel/CartDrawer";
import { useProductStore } from "./store/useProductStore";
import Shop from "./page/Shop";
import ProductDetails from "./components/Shop/ProductDetails";
import { Cart } from "./page/Cart";
import { Checkout } from "./page/Checkout";
import AboutUs from "./page/AboutUs";
import ContactUS from "./page/ContactUs";
import SignUp from "./page/SignUp";

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
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUS />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <CartDrawer />
    </div>
  );
}

export default App;
