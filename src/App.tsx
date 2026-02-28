import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { CartDrawer } from "./components/SidePanel/CartDrawer";
import { useProductStore } from "./data/useProductStore";

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
          </Routes>
        </div>
        <Footer />
      </div>
      <CartDrawer />
    </div>
  );
}

export default App;
