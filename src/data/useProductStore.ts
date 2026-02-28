import { create } from "zustand";
import { Product, DummyJsonResponse } from "../types/product";

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const [smartphonesRes, accessoriesRes] = await Promise.all([
        fetch("https://dummyjson.com/products/category/smartphones"),
        fetch("https://dummyjson.com/products/category/mobile-accessories"),
      ]);

      if (!smartphonesRes.ok || !accessoriesRes.ok) {
        throw new Error("Unable to load products");
      }

      const smartphonesData = await smartphonesRes.json();
      const accessoriesData = await accessoriesRes.json();

      const combinedProduct = [
        ...smartphonesData.products,
        ...accessoriesData.products,
      ];

      set({ products: combinedProduct, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Something went wrong", isLoading: false });
    }
  },
}));
