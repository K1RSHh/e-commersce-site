import { Product } from "../../types/product";
import { useCartStore } from "../../store/useCartStore";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { Link } from "react-router";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const addItems = useCartStore((state) => state.addItem);
  return (
    <div
      key={product.id}
      className="bg-[#f8f9fa] rounded-xl p-4 flex flex-col relative group cursor-pointer hover:shadow-lg transition-shadow"
    >
      <Link
        to={`/product/${product.id}`}
        className="h-48 flex items-center justify-center mb-4 mix-blend-multiply"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
        />
      </Link>

      <div className="text-left">
        <Link to={`/product/:${product.id}`}>
          <h4 className="font-bold text-lg mb-1 truncate" title={product.title}>
            {product.title}
          </h4>
        </Link>

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
  );
}

export default ProductCard;
