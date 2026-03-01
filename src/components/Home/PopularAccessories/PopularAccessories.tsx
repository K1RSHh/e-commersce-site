import { useProductStore } from "../../../store/useProductStore";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useCartStore } from "../../../store/useCartStore";

export const PopularAccessories = () => {
  const { products, isLoading } = useProductStore();
  const addItems = useCartStore((state) => state.addItem);

  const topThreeAccessories = products
    .filter((product) => product.category === "mobile-accessories")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (isLoading) {
    return <div className="text-center py-10">Loading products... ⏳</div>;
  }

  if (topThreeAccessories.length === 0) {
    return null;
  }

  return (
    <section className="max-w-312.5 mx-auto px-4 my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0f172a] rounded-xl p-6 relative overflow-hidden min-h-87.5 flex items-end">
          <img
            src="/home/girl-img.jpeg"
            alt="Promo"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        </div>

        {topThreeAccessories.map((product) => (
          <div
            key={product.id}
            className="bg-[#f8f9fa] rounded-xl p-4 flex flex-col relative group cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="h-48 flex items-center justify-center mb-4 mix-blend-multiply">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="text-left">
              <h4
                className="font-bold text-lg mb-1 truncate"
                title={product.title}
              >
                {product.title}
              </h4>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-black">${product.price}</span>
              </div>
              <motion.button
                onClick={() => addItems(product)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black cursor-pointer text-white text-sm font-semibold py-2 px-4 rounded-full w-max hover:bg-black transition-colors"
              >
                Add to cart
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
