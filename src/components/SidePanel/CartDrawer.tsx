import { useCartStore } from "../SidePanel/useCartStore";
import { ShoppingCart } from "lucide-react";
import "./CartDrawer.css"; // Твій CSS для анімації

export const CartDrawer = () => {
  const { isCartOpen, closeCart } = useCartStore();

  return (
    <>
      {/* Темний фон (бекдроп), який закриває кошик по кліку */}
      {isCartOpen && <div className="cart-backdrop" onClick={closeCart} />}

      {/* Сама панель кошика */}
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="flex justify-center w-full">
          <h2 className="font-bold text-xl flex gap-1 my-4">
            <ShoppingCart />
            Cart
          </h2>
          <button
            onClick={closeCart}
            className="absolute left-3 top-2 cursor-pointer hover:scale-120 transition-all"
          >
            ✖
          </button>
        </div>

        <div className="cart-content">
          <p className="text-2xl">Your Cart is Empty</p>
          <button
            onClick={closeCart}
            className="cursor-pointer inline-block bg-black text-white px-5 py-2 mt-2"
          >
            Back To Shop
          </button>
        </div>
      </div>
    </>
  );
};
