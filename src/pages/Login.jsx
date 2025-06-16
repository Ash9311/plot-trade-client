import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [url, setUrl] = useState('http://localhost:5000/api/v1');
  const { isUserLoggedIn, login, logout, user } = useAppContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/auth/login`, { email, password });
      localStorage.setItem('pt-token', res.data.token);
      login(res?.data?.user);
      navigate('/diagram');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;