import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/auth/login`, {
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:text-blue-800"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
