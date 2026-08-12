import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Check if the user is already logged in
    setEmail(sessionStorage.getItem('resetEmail') || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Backend API Call
      const res = await axios.post('http://localhost:3000/api/auth/forgot-password', { email });

      if (res.status === 200) {
        toast.success(res.data.message);
      }

      if (res.status === 400) {
        toast.error(res.data.message);
        setLoading(false);
        return;
      }

      // 2. Email ko sessionStorage me save karo (taaki refresh pe na ude)
      sessionStorage.setItem('resetEmail', email);

      // 3. OTP page par navigate karo (saath me state bhi bhej sakte ho)
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      toast.error('Error sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-300 flex items-center justify-center overflow-hidden h-[100dvh] w-full">
      <div className="bg-base-100 flex w-3/5 h-9/10 rounded-lg p-2">
        <div className="md:w-1/2 hidden relative h-full rounded-lg bg-[url('https://images.unsplash.com/photo-1750096319146-6310519b5af2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D')] bg-cover bg-center rounded-l-md md:flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>
          <div className="flex items-center p-5 gap-2 z-30">
            <FaWhatsapp className="text-green-500 text-xl" />
            <h1 className="text-sm font-semibold">Whatsapp Clone</h1>
          </div>
          <div className="p-5 z-30 flex flex-col gap-3">
            <h1 className="text-3xl">
              Simple, secure
              <br />& reliable
            </h1>
            <p className="text-xs mb-3 text-emerald-200">
              Nobody can see or read your chats, not even Whatsapp Clone.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full flex items-center justify-center h-full">
          <form className="flex-col gap-3 flex w-4/5" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold">Forgot Password 🔑</h1>
            <p className="text-gray-500 text-sm">
              Enter your email address and we'll send you an OTP to reset your
              password.
            </p>
            <div className="flex flex-col -gap-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email address</legend>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Enter your email here"
                  required
                />
              </fieldset>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn hover:bg-emerald-500 bg-emerald-600"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
            <p className="text-center text-sm">
              <span className="text-gray-500 me-1">
                Remember your password?
              </span>
              <Link className="text-blue-600 underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
