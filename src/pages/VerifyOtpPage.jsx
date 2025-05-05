import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || !password) {
      setError('Email and OTP are required');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/verifyOtp`, {
        password,
        otp,
      }, { withCredentials: true });

      if (res.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error)
      setError('Invalid OTP or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">OTP</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
