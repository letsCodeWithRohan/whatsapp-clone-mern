import React, { useState, useRef } from 'react';

// Left Hero Banner Component to maintain consistency across pages
const AuthHeroBanner = () => {
  return (
    <div className="relative flex-1 hidden md:flex flex-col justify-between p-8 rounded-2xl overflow-hidden bg-cover bg-center min-h-[550px]"
         style={{
           backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')` // Placeholder matching your image style
         }}>
      {/* Brand Header */}
      <div className="flex items-center gap-2 text-white font-semibold text-lg z-10">
        <svg className="w-6 h-6 fill-emerald-500" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
        Whatsapp Clone
      </div>

      {/* Hero Text */}
      <div className="z-10 text-white space-y-2 mb-4">
        <h2 className="text-3xl font-bold leading-tight">
          Simple, secure <br /> & reliable
        </h2>
        <p className="text-xs text-emerald-400 font-medium">
          Nobody can see or read your chats, not even Whatsapp Clone.
        </p>
      </div>
    </div>
  );
};

export default function AuthFlow() {
  const [step, setStep] = useState('forgot'); // 'forgot' | 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Handle Forgot Password Form Submission
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Logic to send OTP email
      setStep('otp');
    }
  };

  // Handle OTP Input Navigation
  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
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

  // Handle OTP Verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      alert(`OTP Verified Successfully: ${enteredOtp}`);
      // Redirect or open New Password modal/screen
    }
  };

  return (
    <div className="min-h-screen bg-[#11161d] flex items-center justify-center p-4 sm:p-6 font-sans">
      {/* Outer Card Container */}
      <div className="w-full max-w-4xl bg-[#1b232e] border border-gray-800/60 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-8 items-stretch">
        
        {/* Left Visual Banner */}
        <AuthHeroBanner />

        {/* Right Dynamic Form Container */}
        <div className="flex-1 flex flex-col justify-center px-2 sm:px-6 py-4">
          
          {/* STEP 1: FORGOT PASSWORD */}
          {step === 'forgot' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  Forgot Password 🔑
                </h1>
                <p className="text-gray-400 text-sm mt-2">
                  Enter your email address and we'll send you an OTP to reset your password.
                </p>
              </div>

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-200 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#11161d] border border-gray-700/80 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00a884] hover:bg-[#008f70] text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-md mt-2"
                >
                  Send OTP
                </button>
              </form>

              <div className="text-center">
                <p className="text-xs text-gray-400">
                  Remember your password?{' '}
                  <a href="#login" className="text-blue-500 hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'otp' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  Verify OTP 📩
                </h1>
                <p className="text-gray-400 text-sm mt-2">
                  Enter the 6-digit code sent to <span className="text-white font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                {/* 6 Digit OTP Inputs */}
                <div className="flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-11 h-12 sm:w-12 sm:h-12 text-center text-lg font-bold bg-[#11161d] border border-gray-700/80 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00a884] hover:bg-[#008f70] text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-md"
                >
                  Verify Code
                </button>
              </form>

              <div className="text-center space-y-2">
                <p className="text-xs text-gray-400">
                  Didn't receive the code?{' '}
                  <button 
                    type="button" 
                    className="text-emerald-400 hover:underline font-medium"
                    onClick={() => alert("OTP Resent!")}
                  >
                    Resend Code
                  </button>
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => setStep('forgot')}
                    className="text-xs text-blue-500 hover:underline"
                  >
                    Change Email
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}