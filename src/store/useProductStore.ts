import { create } from "zustand";
import { Product, DummyJsonResponse } from "../types/product";

export interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  searchQuery: string;
  selectedCategory: string | null;
  sortOrder: "default" | "low-to-high" | "high-to-low";
  currentPage: number;
  itemsPerPage: number;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string | null) => void;
  setSortOrder: (order: "default" | "low-to-high" | "high-to-low") => void;
  setCurrentPage: (page: number) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedCategory: null,
  sortOrder: "default",
  currentPage: 1,
  itemsPerPage: 8,
  selectedTag: null,
  setSelectedTag: (tag) => set({ selectedTag: tag, currentPage: 1 }),

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const [res1, res2] = await Promise.all([
        fetch("https://dummyjson.com/products/category/smartphones"),
        fetch("https://dummyjson.com/products/category/mobile-accessories"),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      set({
        products: [...data1.products, ...data2.products],
        isLoading: false,
      });
    } catch (e) {
      set({ error: "Failed to fetch", isLoading: false });
    }
  },

  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setSelectedCategory: (selectedCategory) =>
    set({ selectedCategory, currentPage: 1 }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setCurrentPage: (currentPage) => set({ currentPage }),
}));
