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
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="flex justify-center w-full bg-white">
          <h2 className="font-bold text-xl flex gap-1 my-4">
            <ShoppingCart />
            Cart
          </h2>
          <button
            onClick={closeCart}
            className="absolute left-3 top-3 cursor-pointer hover:scale-120 transition-all"
          >
            ✖
          </button>
        </div>
        <div className="mt-3 mx-2">
          {items.map((item) => (
            <div key={item.id} className="relative mb-3 bg-white rounded-md">
              <div className="flex p-2">
                <img src={item.thumbnail} alt="images" className="w-20" />
                <p className="mt-3">{item.title}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeItem(item.id)}
                  className="absolute right-3 top-2 cursor-pointer"
                >
                  <Trash size={20} color="#8a0900" />
                </motion.button>
              </div>
              <div className="flex items-center text-center mx-3 ">
                <div className="flex items-center text-center mb-2">
                  <p className="mr-1.5">Quantity: </p>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="h-7 px-2 border border-stone-400/50 cursor-pointer"
                  >
                    -
                  </button>

                  <p className="h-7 w-7 text-center border border-stone-400/50">
                    {item.quantity}
                  </p>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="h-7 px-2 border border-stone-400/50 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <div className="absolute right-3 text-lg font-bold">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 ? (
          <div className="cart-content">
            <p className="text-2xl">Your Cart is Empty</p>
            <button
              onClick={closeCart}
              className="cursor-pointer inline-block bg-black text-white px-5 py-2 mt-2"
            >
              Back To Shop
            </button>
          </div>
        ) : (
          <div className="absolute bottom-4 w-full">
            <div className="flex w-full text-center items-center mb-3">
              <p className="font-bold text-xl ml-3 mr-2">Sub Total:</p>
              <p className="font-bold text-xl">${totalPrice().toFixed(2)}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black text-white w-95 py-3 rounded-md cursor-pointer"
            >
              Checkout
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};
