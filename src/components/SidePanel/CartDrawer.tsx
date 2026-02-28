import { ToggleButton } from "./ToggleButton";
import { ShoppingCart, Trash } from "lucide-react";
import "./CartDrawer.css";
import { useCartStore } from "../../store/useCartStore";
// eslint-disable-next-line
import { motion } from "framer-motion";

export const CartDrawer = () => {
  const { isCartOpen, closeCart } = ToggleButton();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice);

  return (
    <section className="relative">
      {isCartOpen && <div className="cart-backdrop" onClick={closeCart} />}
      <div
        className={`cart-drawer ${isCartOpen ? "open" : ""} flex flex-col h-full`}
      >
        <div className="flex justify-center w-full bg-white  shrink-0">
          <h2 className="font-bold text-xl flex gap-1 my-4">
            <ShoppingCart />
            Cart
          </h2>
          <button
            onClick={closeCart}
            className="absolute left-3 top-3 cursor-pointer hover:scale-120 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-2xl">Your Cart is Empty</p>
              <button
                onClick={closeCart}
                className="cursor-pointer inline-block bg-black text-white px-5 py-2 mt-4"
              >
                Back To Shop
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="relative mb-3 bg-white rounded-md p-2"
              >
                <div className="flex">
                  <img
                    src={item.thumbnail}
                    alt="images"
                    className="w-20 object-contain"
                  />
                  <p className="mt-3 ml-2 text-sm font-medium">{item.title}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeItem(item.id)}
                    className="absolute right-3 top-2 cursor-pointer"
                  >
                    <Trash size={18} color="#8a0900" />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between mt-4 px-1">
                  <div className="flex items-center">
                    <p className="mr-1">Quantity </p>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-7 px-2 border border-stone-400/50 cursor-pointer hover:bg-gray-100"
                    >
                      -
                    </button>
                    <p className="h-7 w-8 flex items-center justify-center border-y border-stone-400/50">
                      {item.quantity}
                    </p>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="h-7 px-2 border border-stone-400/50 cursor-pointer hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="p-4  bg-white shrink-0">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-xl">Sub Total:</p>
              <p className="font-bold text-xl">${totalPrice().toFixed(2)}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-black text-white w-full py-4 rounded-md cursor-pointer font-bold"
            >
              Checkout
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};
