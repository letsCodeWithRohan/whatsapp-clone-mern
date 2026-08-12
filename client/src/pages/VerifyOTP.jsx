import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  // Location state se email uthao, agar refresh hua toh sessionStorage se uthao
  const email = location.state?.email || sessionStorage.getItem('resetEmail');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  // Guard: Agar email exist nahi karta, toh wapas forgot-password bhejo
  useEffect(() => {
    if (!email) {
        toast.error('Provide email first to verify OTP');
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  // Resend Timer Logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // OTP Input Focus Shift Handling
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace handling
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 6) {
      alert('Please enter complete 6-digit OTP');
      return;
    }

    try {
      // API Call to Backend: send email & enteredOtp
      console.log('Verifying OTP:', enteredOtp, 'for email:', email);

      // Verify success hone par sessionStorage clear kar do
      sessionStorage.removeItem('resetEmail');

      alert('OTP Verified Successfully!');
      // Navigate to Reset Password Page or Dashboard
      // navigate('/reset-password');
    } catch (error) {
      alert('Invalid or Expired OTP');
    }
  };

  const handleResend = () => {
    setTimer(30);
    alert(`New OTP sent to ${email}`);
    // Call resend OTP API here
  };

  return (
    <div className="min-h-screen bg-[#11161d] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1b232e] border border-gray-800 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Verify OTP 📩</h2>
        <p className="text-gray-400 text-sm mb-6">
          Sent to <span className="text-emerald-400 font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          {/* 6 Digit Box */}
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-bold bg-[#11161d] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#00a884] hover:bg-[#008f70] text-white font-medium py-3 rounded-lg text-sm transition-colors"
          >
            Verify OTP
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-400">
            Didn't receive code?{' '}
            {timer > 0 ? (
              <span className="text-gray-500">Resend in {timer}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="text-emerald-600 hover:underline font-medium"
              >
                Resend OTP
              </button>
            )}
          </p>

          <button
            onClick={() => {
              sessionStorage.removeItem('resetEmail');
              navigate('/forgot-password');
            }}
            className="text-xs text-blue-500 hover:underline block mx-auto"
          >
            Change Email
          </button>
        </div>
      </div>
    </div>
  );
}