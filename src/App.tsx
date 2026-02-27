import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./page/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { CartDrawer } from "./components/SidePanel/CartDrawer";

function App() {
  return (
    <div>
      <div className="min-h-screen w-full flex flex-col justify-between">
        <Header />
        <div className="m-auto">
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
