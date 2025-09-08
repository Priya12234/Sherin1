import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ForgotPasswordPopup({ onClose, switchToLogin }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
   <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/40"
    >
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-[#DCE1DC] p-10 rounded-xl w-[500px] relative shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-3xl text-[#4B6A5A] hover:text-black transition"
        >
          <IoMdClose />
        </button>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <h2 className="text-3xl text-[#4B6A5A] font-['Italiana'] text-center mb-4">
              Forgot Password
            </h2>
            <p className="text-center text-sm mb-6">
              Enter your email to receive an OTP
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mb-5 p-3 bg-[#A5BFA4] text-black placeholder-black rounded-md"
            />
            <button
              onClick={handleNext}
              className="w-full border-2 border-[#4B6A5A] py-2 text-[#4B6A5A] font-semibold hover:bg-[#4B6A5A] hover:text-white transition rounded-md"
            >
              Send OTP
            </button>

            <p
              onClick={onClose}
              className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:underline"
            >
              ← Cancel
            </p>
          </>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <>
            <h2 className="text-3xl text-[#4B6A5A] font-['Italiana'] text-center mb-4">
              Verify OTP
            </h2>
            <p className="text-center text-sm mb-6">
              Enter the OTP sent to your email
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full mb-5 p-3 bg-[#A5BFA4] text-black placeholder-black rounded-md"
            />
            <button
              onClick={handleNext}
              className="w-full border-2 border-[#4B6A5A] py-2 text-[#4B6A5A] font-semibold hover:bg-[#4B6A5A] hover:text-white transition rounded-md"
            >
              Verify OTP
            </button>

            <p
              onClick={handleBack}
              className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:underline"
            >
              ← Back
            </p>
          </>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <>
            <h2 className="text-3xl text-[#4B6A5A] font-['Italiana'] text-center mb-4">
              Reset Password
            </h2>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full mb-5 p-3 bg-[#A5BFA4] text-black placeholder-black rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full mb-5 p-3 bg-[#A5BFA4] text-black placeholder-black rounded-md"
            />
            <button
              onClick={switchToLogin}
              className="w-full border-2 border-[#4B6A5A] py-2 text-[#4B6A5A] font-semibold hover:bg-[#4B6A5A] hover:text-white transition rounded-md"
            >
              Reset & Login
            </button>

            <p
              onClick={handleBack}
              className="mt-4 text-center text-sm text-gray-600 cursor-pointer hover:underline"
            >
              ← Back
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
