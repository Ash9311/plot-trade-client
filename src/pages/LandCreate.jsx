import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandCreate() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const [url,setUrl]= useState('http://localhost:5000/api/v1')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${url}/land/create`,
        { coordinates: { x: parseFloat(x), y: parseFloat(y) }, price: parseFloat(price) },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/diagram');
    } catch (error) {
      alert('Error creating land');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Create Land Parcel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
          placeholder="X Coordinate"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
          placeholder="Y Coordinate"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}

export default LandCreate;