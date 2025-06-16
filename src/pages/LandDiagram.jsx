import { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import axios from 'axios';

function LandDiagram() {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [url,setUrl]= useState('http://localhost:5000/api/v1')
  useEffect(() => {
    axios.get(`${url}/land`).then((res) => setLands(res.data));
  }, []);

  const handleBid = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bid/place`,
        { landId: selectedLand._id, amount: parseFloat(bidAmount) },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Bid placed successfully!');
      setBidAmount('');
    } catch (error) {
      alert('Error placing bid');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Land Diagram</h1>
      <Stage width={800} height={600} className="border">
        <Layer>
          {lands.map((land) => (
            <Rect
              key={land._id}
              x={land.coordinates.x}
              y={land.coordinates.y}
              width={100}
              height={100}
              fill={land.isForSale ? 'green' : 'gray'}
              onClick={() => setSelectedLand(land)}
            />
          ))}
          {lands.map((land) => (
            <Text
              key={`text-${land._id}`}
              x={land.coordinates.x + 10}
              y={land.coordinates.y + 40}
              text={`Owner: ${land.ownerId.email}`}
              fontSize={12}
              fill="white"
            />
          ))}
        </Layer>
      </Stage>
      {selectedLand && (
        <div className="mt-4">
          <h2 className="text-xl">Land ID: {selectedLand._id}</h2>
          <p>Owner: {selectedLand.ownerId.email}</p>
          <p>Price: {selectedLand.price}</p>
          {selectedLand.isForSale && (
            <div className="flex gap-2">
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount"
                className="border p-2"
              />
              <button onClick={handleBid} className="bg-blue-500 text-white p-2">
                Place Bid
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LandDiagram;