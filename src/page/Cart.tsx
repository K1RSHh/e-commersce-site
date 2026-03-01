import { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { Trash, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

export const Cart = () => {
  const { items, removeItem, increaseQuantity, decreaseQuantity, totalPrice } =
    useCartStore();
  const [isCouponOpen, setIsCouponOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-312.5 mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Add some products to your cart to see them here.
        </p>
        <a
          href="/"
          className="bg-black text-white px-8 py-3 rounded-md font-bold"
        >
          Return to Shop
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-312.5 mx-auto px-4 py-12 mb-10">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full border border-gray-100 rounded-sm bg-white p-6 shadow-sm">
          <div className="hidden md:flex justify-between border-b pb-4 mb-6 text-sm font-bold uppercase tracking-wider text-gray-500">
            <span className="w-1/2">Product</span>
            <span>Total</span>
          </div>

          <div className="space-y-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between border-b md:border-none pb-6 md:pb-0"
              >
                <div className="flex gap-6 w-full md:w-1/2">
                  <div className="w-24 h-24 shrink-0 bg-[#f8f9fa] rounded-md flex items-center justify-center p-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-medium text-lg leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-900 font-bold">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-400 text-xs mt-2 line-clamp-2 max-w-xs font-light">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-3 py-1 hover:bg-gray-50 border-r cursor-pointer border-gray-200"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-3 py-1 hover:bg-gray-50 border-l cursor-pointer border-gray-200"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-gray-400 cursor-pointer underline hover:text-red-600 transition-colors"
                      >
                        Remove item
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block text-lg font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-100 border border-gray-100 rounded-sm bg-white p-8 shadow-sm lg:sticky lg:top-8">
          <h2 className="text-center font-bold uppercase tracking-widest text-sm mb-8">
            Cart Totals
          </h2>

          <div className="border-b border-t border-gray-100 py-4 mb-4">
            <button
              onClick={() => setIsCouponOpen(!isCouponOpen)}
              className="flex justify-between items-center cursor-pointer w-full text-sm font-medium text-gray-700"
            >
              Add coupons
              {isCouponOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            <AnimatePresence>
              {isCouponOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 border border-gray-200 rounded p-2 text-sm outline-none focus:border-black"
                    />
                    <button className="bg-black text-white cursor-pointer px-6 py-2 rounded font-bold text-sm hover:bg-black transition-colors">
                      Apply
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mb-10">
            <span className="text-sm font-medium text-gray-600">
              Estimated total
            </span>
            <span className="text-lg font-bold">
              ${totalPrice().toFixed(2)}
            </span>
          </div>

          <Link to="/checkout">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="w-full bg-black text-white cursor-pointer py-4 rounded-sm font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Proceed to Checkout
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};
