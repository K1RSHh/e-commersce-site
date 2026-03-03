import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form date:", formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 font-sans">
      <div className="flex flex-col text-left justify-center pt-8">
        <h2 className="text-3xl font-medium tracking-widest uppercase mb-4 text-gray-900">
          MESSAGE US
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Suspendisse imperdiet ullamcorper turpis, ut dictum arcu placerat et.
          Phasellus iaculis urna eu finibus aliquet
        </p>
      </div>

      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Contact Us</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 p-3 outline-none focus:border-black transition-colors"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 outline-none focus:border-black transition-colors"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Contact number"
            className="w-full border border-gray-300 p-3 outline-none focus:border-black transition-colors"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <textarea
            placeholder="Message"
            rows={5}
            className="w-full border border-gray-300 p-3 outline-none focus:border-black transition-colors resize-none"
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          ></textarea>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="bg-black cursor-pointer text-white px-10 py-3 text-sm font-bold uppercase tracking-widest"
            >
              SUBMIT
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
