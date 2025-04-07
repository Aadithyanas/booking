import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`https://booking-rqrh.onrender.com/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      setUser(data.user); // from context

      toast.success('Login successful!');
      navigate('/booking');
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"></div>

      {/* Animated floating circles */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-xl"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-300 opacity-10 rounded-full blur-xl"></div>

      {/* Train Animation */}
      <div className="absolute bottom-8 w-full animate-train-movement">
        {/* Train Track */}
        <div className="absolute bottom-0 w-full h-2 bg-gray-800 opacity-70"></div>
        
        {/* Train Engine */}
        <div className="relative">
          <div className="absolute bottom-2 left-0 w-24 h-12 bg-blue-700 rounded-r-lg animate-subtle-pulse">
            {/* Cabin */}
            <div className="absolute top-0 right-0 w-12 h-6 bg-blue-800 rounded-tr-lg"></div>
            {/* Windows */}
            <div className="absolute top-2 left-4 w-3 h-3 bg-yellow-300 rounded-sm animate-pulse"></div>
            <div className="absolute top-2 left-10 w-3 h-3 bg-yellow-300 rounded-sm animate-pulse"></div>
            {/* Chimney */}
            <div className="absolute -top-4 left-6 w-3 h-4 bg-gray-700 rounded-t-sm"></div>
            {/* Steam */}
            <div className="absolute -top-6 left-6 w-2 h-2 bg-white rounded-full opacity-70 animate-steam-rise"></div>
            <div className="absolute -top-8 left-7 w-2 h-2 bg-white rounded-full opacity-60 animate-steam-rise"></div>
            <div className="absolute -top-10 left-5 w-2 h-2 bg-white rounded-full opacity-50 animate-steam-rise"></div>
          </div>
          
          {/* First Car */}
          <div className="absolute bottom-2 left-28 w-20 h-10 bg-purple-600 rounded-sm animate-subtle-pulse">
            <div className="absolute top-2 left-3 w-3 h-3 bg-purple-300 rounded-sm"></div>
            <div className="absolute top-2 left-10 w-3 h-3 bg-purple-300 rounded-sm"></div>
          </div>
          
          {/* Second Car */}
          <div className="absolute bottom-2 left-52 w-20 h-10 bg-pink-600 rounded-sm animate-subtle-pulse">
            <div className="absolute top-2 left-3 w-3 h-3 bg-pink-300 rounded-sm"></div>
            <div className="absolute top-2 left-10 w-3 h-3 bg-pink-300 rounded-sm"></div>
          </div>
          
          {/* Wheels */}
          <div className="absolute bottom-0 left-4 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-400"></div>
          <div className="absolute bottom-0 left-16 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-400"></div>
          <div className="absolute bottom-0 left-32 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-400"></div>
          <div className="absolute bottom-0 left-44 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-400"></div>
          <div className="absolute bottom-0 left-56 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-400"></div>
          <div className="absolute bottom-0 left-68 w-4 h-4 bg-gray-900 rounded-full border-2 border-gray-400"></div>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 p-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl z-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 animate-slide-down">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-slide-up">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="animate-slide-up animation-delay-100">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : "Login"}
          </button>
        </form>
        <p className="text-center animate-fade-in animation-delay-200">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-300"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}