import { create } from "zustand";

interface CartStore {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  // ... тут потім будуть cartItems, addToCart тощо
}

export const useCartStore = create<CartStore>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
