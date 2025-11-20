import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function RegisterPopup({ onClose, switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/users/register", form);

      toast.success("Registration successful!");

      setLoading(false);

      // Auto switch to login after success
      setTimeout(() => {
        switchToLogin();
      }, 1200);
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/40"
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-[#DCE1DC] p-10 rounded-xl w-[550px] relative shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl text-[#4B6A5A] hover:text-black transition"
        >
          <IoMdClose />
        </button>

        <h2 className="text-4xl text-[#4B6A5A] font-['Italiana'] text-center mb-6">
          Register Yourself
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
          className="w-full mb-5 p-3 bg-[#A5BFA4] text-black placeholder-black rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          className="w-full mb-5 p-3 bg-[#A5BFA4] text-black placeholder-black rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          className="w-full mb-6 p-3 bg-[#A5BFA4] text-black placeholder-black rounded-md"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full border-2 border-[#4B6A5A] py-2 text-[#4B6A5A] font-semibold hover:bg-[#4B6A5A] hover:text-white transition rounded-md"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-5 text-[#1A1A1A]">
          Already have account?{" "}
          <span
            className="text-[#4B6A5A] cursor-pointer hover:underline"
            onClick={switchToLogin}
          >
            Login
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}
