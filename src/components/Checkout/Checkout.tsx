import { useCartStore } from "../../store/useCartStore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ChevronDown, AlertCircle } from "lucide-react";

const ErrorMessage = ({ message }: { message?: string }) => (
  <div className="min-h-5 mt-1">
    {message && (
      <span className="text-red-500 text-[11px] block animate-in fade-in duration-200">
        {message}
      </span>
    )}
  </div>
);

interface Country {
  name: string;
  code: string;
}

export const Checkout = () => {
  const { items, totalPrice } = useCartStore();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States (US)",
    region: "",
    zip: "",
    phone: "",
    addNote: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [countries, setCountries] = useState<Country[]>([]);
  const [useSelectForRegion, setUseSelectForRegion] = useState(true);

  const usStates = ["California", "New York", "Texas", "Florida", "Illinois"];

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .map((c: any) => ({ name: c.name.common, code: c.cca2 }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountries(sorted);
      });
  }, []);

  const handleBlur = (field: string, value: string) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: "This field is required" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFormData({
      ...formData,
      country: val,
      region: val === "United States (US)" ? usStates[0] : "",
    });
    setUseSelectForRegion(val === "United States (US)");
  };

  return (
    <div className="max-w-312.5 mx-auto mb-15 px-4 py-12 flex flex-col lg:flex-row gap-16 items-start">
      <div className="flex-1 space-y-10 w-full">
        <section>
          <h2 className="text-lg font-medium mb-4">Contact information</h2>
          <input
            type="email"
            placeholder="Email address"
            className={`w-full border-b p-3  outline-none transition-all ${errors.email ? "border-red-500" : "border-gray-300 focus:border-black"}`}
            onBlur={(e) => handleBlur("email", e.target.value)}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <ErrorMessage message={errors.email} />
          <p className="text-[11px] text-gray-400">
            You are currently checking out as a guest.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium mb-6">Billing address</h2>

          <div className="flex flex-col gap-1 relative">
            <label className="text-[9px] uppercase font-bold text-gray-400 absolute top-2 left-3">
              Country/Region
            </label>
            <select
              value={formData.country}
              onChange={handleCountryChange}
              className="w-full border border-gray-200 cursor-pointer rounded-md p-3 pt-6 bg-white font-medium outline-none focus:border-black appearance-none"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
              size={16}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First name"
                className={`w-full border border-gray-200 rounded-md p-3 outline-none focus:border-black ${errors.firstName ? "border-red-500" : ""}`}
                onBlur={(e) => handleBlur("firstName", e.target.value)}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <ErrorMessage message={errors.firstName} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last name"
                className={`w-full border border-gray-200 rounded-md p-3 outline-none focus:border-black ${errors.lastName ? "border-red-500" : ""}`}
                onBlur={(e) => handleBlur("lastName", e.target.value)}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <ErrorMessage message={errors.lastName} />
            </div>
          </div>

          <input
            type="text"
            placeholder="Address"
            className="w-full border border-gray-200 rounded-md p-3 outline-none focus:border-black"
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <p className="text-[11px] text-gray-400">
            + Add apartment, suite, etc.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full border border-gray-200 rounded-md p-3 outline-none focus:border-black"
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />

            <div className="relative">
              <label className="text-[9px] uppercase font-bold text-gray-400 absolute top-2 left-3">
                State/Region
              </label>
              {useSelectForRegion ? (
                <select
                  className="w-full border border-gray-200 rounded-md p-3 pt-6 bg-white outline-none appearance-none"
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                >
                  {usStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-md p-3 pt-6 outline-none"
                  placeholder="Region"
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                />
              )}
              {useSelectForRegion && (
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                  size={16}
                />
              )}
            </div>

            <input
              type="text"
              placeholder="ZIP Code"
              className="w-full border border-gray-200 rounded-md p-3 outline-none focus:border-black"
              onChange={(e) =>
                setFormData({ ...formData, zip: e.target.value })
              }
            />
          </div>

          <input
            type="number"
            placeholder="Phone (optional)"
            className="w-full border border-gray-200 rounded-md p-3 outline-none focus:border-black"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-medium">Payment options</h2>
          <div className="bg-[#fff5f5] border border-[#feb2b2] rounded-md p-4 flex gap-3 items-start animate-in slide-in-from-top-2">
            <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-gray-800 leading-tight">
              There are no payment methods available. Please contact us for help
              placing your order.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="note"
              className="w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
              onChange={(e) =>
                setFormData({ ...formData, addNote: e.target.checked })
              }
            />
            <label
              htmlFor="note"
              className="text-sm cursor-pointer select-none"
            >
              Add a note to your order
            </label>
          </div>

          <p className="text-[11px] text-gray-500 leading-relaxed">
            By proceeding with your purchase you agree to our{" "}
            <span className="underline cursor-pointer">
              Terms and Conditions
            </span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
          </p>

          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <Link
              to="/cart"
              className="text-sm font-medium hover:underline flex items-center gap-2"
            >
              ← Return to Cart
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-black cursor-pointer text-white px-10 py-4 rounded-md font-bold shadow-md active:scale-95"
              onClick={() => {
                const fields = ["email", "firstName", "lastName"];
                fields.forEach((f) => handleBlur(f, (formData as any)[f]));
              }}
            >
              Place Order
            </motion.button>
          </div>
        </section>
      </div>

      <aside className="w-full lg:w-112.5 bg-[#fbfbfb] border border-gray-100 p-8 rounded-sm lg:sticky lg:top-10 shadow-sm">
        <h2 className="text-lg font-bold mb-8 border-b pb-4">Order summary</h2>

        <div className="space-y-6 mb-8 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="relative w-16 h-16 bg-white border border-gray-100 rounded p-2 shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-[13px] font-bold leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
              <span className="font-bold text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t pt-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold">${totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-black pt-4 border-t border-dashed border-gray-200">
            <span>Total</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
