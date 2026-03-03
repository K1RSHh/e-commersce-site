import { Search, ShoppingCart, UserRound, Menu } from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleButton } from "../SidePanel/ToggleButton";
import { useState, MouseEventHandler } from "react";
import { useCartStore } from "../../store/useCartStore";
import { useMemo } from "react";
import { Product } from "../../types/product";

function Header({ products = [] }: { products?: Product[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const items = useCartStore((state) => state.items);
  const { openCart } = ToggleButton();
  const [isOpen, setIsOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return products
      .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5);
  }, [searchTerm, products]);

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
              <Link to="/contact-us">Contact Us</Link>
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
          <Link to="/contact-us">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Contact Us
            </motion.div>
          </Link>
        </div>
        <Link to="/sign-up">
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
      <div className="relative flex order-3 md:order-2 justify-between md:ml-6 mt-5 md:mt-0 border-blue-400 border h-11 w-full md:w-md rounded-md items-center bg-white">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none px-4 text-lg w-full bg-transparent"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black px-4 py-2 mr-1 rounded-md flex items-center cursor-pointer"
        >
          <Search color="#fff" size={20} />
        </motion.button>

        <AnimatePresence>
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-12 left-0 w-full bg-white shadow-2xl rounded-md overflow-hidden z-50 border border-gray-100"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    key={product.id}
                    onClick={() => setSearchTerm("")}
                    className="flex items-center gap-4 p-3 hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex justify-between w-2/2">
                      <p className="text-sm font-bold text-black line-clamp-1">
                        {product.title}
                      </p>
                      <p className="text-md text-blue-500 font-bold">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400 text-sm">
                  No products found
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
