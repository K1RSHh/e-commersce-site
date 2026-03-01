import { Search, ShoppingCart, UserRound, Menu } from "lucide-react";
import { Link } from "react-router";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { ToggleButton } from "../SidePanel/ToggleButton";
import { useState, MouseEventHandler } from "react";
import { useCartStore } from "../../store/useCartStore";

function Header() {
  const { openCart } = ToggleButton();
  const [isOpen, setIsOpen] = useState(false);
  const items = useCartStore((state) => state.items);

  return (
    <header className="my-6 flex flex-wrap md:flex-nowrap items-center">
      <div className="relative order-1 w-20">
        <Link to="/">
          <img
            src="Logo.svg"
            alt="Logo"
            className="w-33 h-12 hover:scale-110 transition-all"
          />
        </Link>
      </div>

      <div className="flex order-2 md:order-3 ml-auto font-bold text-md gap-6">
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu />
        </button>
        {isOpen && true ? (
          <div className="fixed z-50 h-full w-full top-0 left-0 bg-white text-right">
            <button
              onClick={() => setIsOpen(false)}
              className="mt-3 mr-3 text-2xl"
            >
              ✕
            </button>
            <div className="mt-10 mr-3 text-xl flex flex-col gap-3">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about-us">About Us</Link>
              <Link to="/">Contact Us</Link>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="md:flex hidden font-bold text-xl gap-6">
          <Link to="/">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Home
            </motion.div>
          </Link>
          <Link to="/shop">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Shop
            </motion.div>
          </Link>
          <Link to="/about-us">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              About Us
            </motion.div>
          </Link>
          <Link to="/">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Contact Us
            </motion.div>
          </Link>
        </div>
        <Link to="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <UserRound />
          </motion.div>
        </Link>
        <div className="relative">
          <motion.button
            onClick={openCart}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {items.length > 0 ? (
              <p className="absolute bottom-6 text-center right-0 bg-black text-white text-sm w-5 rounded-4xl">
                {items.length}
              </p>
            ) : (
              ""
            )}
            <ShoppingCart />
          </motion.button>
        </div>
      </div>
      <div className="flex order-3 md:order-2 justify-between md:ml-6 mt-5 md:mt-0 border-blue-400 border h-11 w-md rounded-md items-center">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none px-2 text-xl relative w-full"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black px-4 py-1 rounded-md mr-1.5 cursor-pointer"
        >
          <Search color="#fff" />
        </motion.button>
      </div>
      <div className="fixed bottom-12 right-5 md:right-15 z-50 ">
        <motion.button
          onClick={openCart}
          className="cursor-pointer bg-white/50 bg-blur-md shadow-2xl p-4 rounded-2xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {items.length > 0 ? (
            <p className="absolute bottom-9 text-center right-0 bg-black text-white text-sm w-5 rounded-4xl">
              {items.length}
            </p>
          ) : (
            ""
          )}
          <ShoppingCart />
        </motion.button>
      </div>
    </header>
  );
}

export default Header;
