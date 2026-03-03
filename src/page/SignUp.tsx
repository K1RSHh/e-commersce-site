import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsSuccess(true);

      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white font-sans px-4 pb-30">
      {isSuccess && (
        <div className="fixed top-8 right-8 z-50 animate-fade-in-down">
          <div className="bg-white border-l-8 border-green-600 shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 flex items-center gap-5">
            <div className="bg-green-600 text-white rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-black uppercase tracking-[0.2em] text-sm">
                Success
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Your account is ready to use.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md w-full">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-[0.3em] uppercase text-black mb-2">
            Create Account
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 mb-6 text-xs uppercase tracking-widest border-l-2 border-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-6 text-left">
          <div className="space-y-1">
            <label className="text-sm font-bold uppercase tracking-[0.2em] text-black ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@example.com"
              className="w-full border border-gray-200 p-4 outline-none focus:border-black transition-all text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold uppercase tracking-[0.2em] text-black ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Динамічний тип
                required
                placeholder="password"
                className="w-full border border-gray-200 p-4 pr-12 outline-none focus:border-black transition-all text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black hover:text-black transition-colors"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full bg-black text-white cursor-pointer py-5 text-xs font-bold uppercase tracking-[0.3em] shadow-lg"
          >
            Register Now
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
