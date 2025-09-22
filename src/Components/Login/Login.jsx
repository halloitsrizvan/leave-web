import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Firebase } from '../../Firebase/Config';
import LoadForAll from '../LoadForAll/LoadForAll';
import { useUser } from '../../Store/UserContext';

// Icon Components (using SVG for consistency with Signup)
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useUser();

  const formatPhoneEmail = (phoneNumber) => {
    return `${phoneNumber}@phoneauth.com`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    setLoginErr('');

    if (!phone || !password) {
      setLoginErr('Phone and password are required');
      setLoad(false);
      return;
    }

    try {
      const auth = getAuth();
      const phoneEmail = formatPhoneEmail(phone);
      await signInWithEmailAndPassword(auth, phoneEmail, password);
      setLoad(false);
      navigate('/');
    } catch (error) {
      setLoad(false);
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setLoginErr('No account found with this phone number');
      } else if (error.code === 'auth/wrong-password') {
        setLoginErr('Incorrect password. Please try again.');
      } else {
        setLoginErr('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      {load && <LoadForAll title="Logging in to your account..." />}

      <div className="relative mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="mt-2 text-gray-500">Login to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {loginErr && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700">
              {loginErr}
            </div>
          )}

          <div className="relative">
            <PhoneIcon />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <LockIcon />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          

          <div>
            <button
              type="submit"
              disabled={load}
              className="w-full rounded-lg bg-blue-600 py-3 text-center font-semibold text-white transition-transform duration-200 hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;