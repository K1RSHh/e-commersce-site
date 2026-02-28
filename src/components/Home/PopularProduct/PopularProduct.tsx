import { useProductStore } from "../../../data/useProductStore";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useCartStore } from "../../../store/useCartStore";

export const PopularProduct = () => {
  const { products, isLoading } = useProductStore();
  const addItems = useCartStore((state) => state.addItem);

  const topThreeAccessories = products
    .filter((product) => product.category === "mobile-accessories")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 12);

  if (isLoading) {
    return <div className="text-center py-10">Loading products... ⏳</div>;
  }

  if (topThreeAccessories.length === 0) {
    return null;
  }

  return (
    <section className="max-w-312.5 mx-auto px-4 my-12">
      <p className="text-4xl font-bold text-left mb-5">Popular product</p>
      <div className="grid grid-cols-2 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="bg-[#f8f9fa] w-full h-34 mt-15 rounded-2xl flex flex-col justify-between">
        <p className="mt-6 text-xl">
          Fusce in gravida mauris. Sed at ornare elit, quis faucibus elit.
        </p>
        <p className="mb-5 text-xl font-bold">-Madalin.</p>
      </div>
    </section>
  );
};
