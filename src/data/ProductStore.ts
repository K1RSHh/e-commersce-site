import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

interface ProductStore {
  product: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProduct: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  product: [],
  isLoading: false,
  error: null,

  fetchProduct: async () => {
    set({ isLoading: true, error: null });

    try {
      const [smartphonesRes, accessoriesRes] = await Promise.all([
        fetch("'https://dummyjson.com/products/category/smartphones'"),
        fetch("https://dummyjson.com/products/category/mobile-accessories"),
      ]);

      if (!smartphonesRes.ok || !accessoriesRes.ok) {
        throw new Error("Unable to load products");
      }

      const smartphonesData = await smartphonesRes.json();
      const accessoriesData = await accessoriesRes.json();

      const combinedProduct = [...smartphonesData, ...accessoriesData];

      set({ product: combinedProduct, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Something went wrong", isLoading: false });
    }
  },
}));
