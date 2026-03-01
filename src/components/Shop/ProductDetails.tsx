import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
// eslint-disable-next-line
import { motion } from "framer-motion";
import { useCartStore } from "../../store/useCartStore";
import { useProductStore } from "../../store/useProductStore";
import ProductCard from "./ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useProductStore();
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.id === Number(id));

  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0] || product.thumbnail);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-20 text-2xl">
        Product not found or loading...
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-312.5 mx-auto px-4 py-8 mb-15">
      <div className="text-sm text-gray-500 mb-8 text-left">
        <Link to="/" className="hover:text-black cursor-pointer">
          Home
        </Link>
        /
        <Link className="hover:text-black cursor-pointer" to="/shop">
          Shop
        </Link>
        /<span className="text-black font-medium">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2">
          <div className="bg-[#f8f9fa] rounded-xl flex justify-center items-center p-8 mb-4 h-100">
            <img
              src={mainImage}
              alt={product.title}
              className="max-h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`w-24 cursor-pointer h-24 shrink-0 border-2 rounded-lg bg-[#f8f9fa] p-2 flex justify-center items-center transition-all ${mainImage === img ? "border-black" : "border-transparent hover:border-gray-300"}`}
              >
                <img
                  src={img}
                  alt={`thumb-${index}`}
                  className="max-h-full object-contain mix-blend-multiply"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-4 py-3 border-x border-gray-300 min-w-12 text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="bg-black cursor-pointer text-white px-8 py-3.5 rounded-md font-bold  flex-1 md:flex-none"
            >
              Add to cart
            </motion.button>
          </div>

          <div className="border-t border-gray-200 pt-6 text-sm text-gray-600 space-y-2">
            <p>
              <span className="text-black font-semibold">Category:</span>{" "}
              <span className="capitalize">
                {product.category.replace("-", " ")}
              </span>
            </p>
            {product.tags && (
              <p>
                <span className="text-black font-semibold">Tags:</span>{" "}
                {product.tags.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-gray-200 pt-8">
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 cursor-pointer text-lg font-medium transition-colors relative ${activeTab === "description" ? "text-black" : "text-gray-400 hover:text-black"}`}
          >
            Description
            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 cursor-pointer text-lg font-medium transition-colors relative ${activeTab === "reviews" ? "text-black" : "text-gray-400 hover:text-black"}`}
          >
            Reviews ({product.reviews?.length || 0})
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
            )}
          </button>
        </div>

        <div className="text-gray-600 leading-relaxed max-w-4xl">
          {activeTab === "description" ? (
            <p>{product.description}</p>
          ) : (
            <div>
              <p className="mb-6">There are no reviews yet.</p>
              <div className="max-w-2xl">
                <p className="text-black font-bold mb-2">
                  Be the first to review "{product.title}"
                </p>
                <p className="text-sm mb-6">
                  Your email address will not be published. Required fields are
                  marked *
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 text-black">
                      Your review *
                    </label>
                    <textarea className="w-full border border-gray-300 rounded p-2 h-32 outline-none focus:border-black" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-1 text-black">
                        Name *
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-black">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded p-2 outline-none focus:border-black"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="save-info"
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label
                      htmlFor="save-info"
                      className="text-sm cursor-pointer"
                    >
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </label>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-black text-white cursor-pointer px-8 py-3 rounded font-bold transition-colors mt-4"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">Related products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
