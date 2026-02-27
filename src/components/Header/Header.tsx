import {
  Search,
  ShoppingCart,
  UserRound,
  Menu,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router";
// eslint-disable-next-line
import { motion } from "framer-motion";

function Header() {
  return (
    <div className="my-6 flex items-center">
      <div className="relative">
        <Link to="/">
          <img
            src="Logo.svg"
            alt="Logo"
            className="w-33 h-12 hover:scale-110 transition-all"
          />
        </Link>
      </div>
      <div className="flex justify-between ml-6 border-blue-400 border h-11 w-md rounded-md items-center">
        <input
          type="text"
          placeholder="Search..."
          className="outline-none px-2 relative w-full"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-black px-4 py-1 rounded-md mr-1.5 cursor-pointer"
        >
          <Search color="#fff" />
        </motion.button>
      </div>
      <div className="flex ml-auto font-bold text-md gap-6">
        <Link to="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Home
          </motion.div>
        </Link>
        <Link to="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Shop
          </motion.div>
        </Link>
        <Link to="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            About Us
          </motion.div>
        </Link>
        <Link to="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Contact Us
          </motion.div>
        </Link>
        <Link to="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <UserRound />
          </motion.div>
        </Link>
        <Link to="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ShoppingCart />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
