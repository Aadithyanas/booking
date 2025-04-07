import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await fetch(`https://booking-rqrh.onrender.com/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      toast.success('Account created successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-blue-800 to-purple-800 animate-subtle-pulse"></div>
      
      {/* Stars in the sky */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white" 
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              width: Math.random() < 0.3 ? '2px' : '1px',
              height: Math.random() < 0.3 ? '2px' : '1px',
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${(Math.random() * 3) + 2}s infinite ease-in-out alternate`
            }}
          ></div>
        ))}
      </div>
      
      {/* Mountains in background */}
      <div className="absolute bottom-20 left-0 right-0 h-32 bg-indigo-900 rounded-t-3xl"></div>
      <div className="absolute bottom-20 left-1/4 right-0 h-48 bg-indigo-900 rounded-tl-3xl"></div>
      <div className="absolute bottom-20 left-0 right-1/3 h-40 bg-purple-900 rounded-tr-3xl"></div>
      
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-800"></div>
      
      {/* Train tracks */}
      <div className="absolute bottom-14 left-0 right-0 h-2 bg-gray-600"></div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="h-14 w-4 bg-gray-700"></div>
        ))}
      </div>
      
      {/* Animated train */}
      <div className="absolute bottom-16 h-12 animate-train-movement">
        {/* Engine */}
        <div className="relative h-12 w-20 bg-red-600 rounded-t-md rounded-r-md inline-block align-bottom">
          <div className="absolute top-0 left-0 w-4 h-6 bg-gray-800"></div>
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-yellow-300 animate-pulse"></div>
          <div className="absolute -top-6 left-6 w-4 h-6 bg-gray-800 rounded-t-md"></div>
        </div>
        
        {/* Passenger cars */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="relative h-10 w-16 bg-blue-600 ml-1 inline-block align-bottom rounded">
            <div className="absolute top-2 left-2 w-4 h-4 bg-blue-200"></div>
            <div className="absolute top-2 right-2 w-4 h-4 bg-blue-200"></div>
          </div>
        ))}
      </div>
      
      {/* Steam/smoke from engine */}
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="absolute rounded-full bg-white opacity-70 animate-steam-rise"
          style={{
            bottom: `${28 + (i * 10)}px`,
            left: `${(i * 15) + 5}%`,
            width: `${(i + 1) * 8}px`,
            height: `${(i + 1) * 8}px`,
            animationDelay: `${i * 0.5}s`
          }}
        ></div>
      ))}
      
      {/* Form container */}
      <div className="max-w-md w-full space-y-6 p-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl z-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 animate-slide-down">Sign Up for Train Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="animate-slide-up">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="animate-slide-up animation-delay-100">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>
          <div className="animate-slide-up animation-delay-200">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : "Sign Up"}
          </button>
        </form>
        <p className="text-center animate-fade-in animation-delay-300">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}