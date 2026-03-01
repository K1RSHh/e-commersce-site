import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/Shop/ProductCard";

export default function Shop() {
  const {
    products,
    fetchProducts,
    selectedCategory,
    setSelectedCategory,
    selectedTag,
    setSelectedTag,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    itemsPerPage,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const allTags = Array.from(new Set(products.flatMap((p) => p.tags || [])));
  const categories = Array.from(new Set(products.map((p) => p.category)));

  let filtered = products.filter((p) => {
    const matchCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    const matchTag = selectedTag ? p.tags?.includes(selectedTag) : true;
    return matchCategory && matchTag;
  });

  if (sortOrder === "low-to-high")
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortOrder === "high-to-low")
    filtered = [...filtered].sort((a, b) => b.price - a.price);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = filtered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="max-w-312 mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 mb-15">
      <aside className="w-full md:w-64 shrink-0 space-y-8">
        <div>
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Categories</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-sm cursor-pointer ${!selectedCategory ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
              >
                All Categories
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm cursor-pointer capitalize ${selectedCategory === cat ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
                >
                  {cat.replace("-", " ")}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4 border-b pb-2">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${!selectedTag ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200 hover:border-black"}`}
            >
              #all
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-xs cursor-pointer rounded-full border transition-all ${selectedTag === tag ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200 hover:border-black"}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-500 font-medium">
            Found{" "}
            <span className="text-black font-bold">{filtered.length}</span>{" "}
            products
          </p>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="border p-2 text-sm rounded-md outline-none bg-white cursor-pointer"
          >
            <option value="default">Default sorting</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>

        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed rounded-xl">
            <p className="text-gray-400">
              No products found with these filters 🔍
            </p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
              className="mt-4 text-blue-600 underline  cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-10 cursor-pointer h-10 flex items-center justify-center rounded-md border transition-all ${currentPage === i + 1 ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200 hover:border-black"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
