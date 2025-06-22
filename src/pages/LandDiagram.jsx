import { useEffect, useState } from 'react';
import React from 'react';

import { useAppContext } from '../context/AppContext';
import { Stage, Layer, Rect, Text } from 'react-konva';
import axios from 'axios';

function LandDiagram() {
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const { isUserLoggedIn, login, logout, user } = useAppContext();
  const [url, setUrl] = useState('http://localhost:5000/api/v1')
  useEffect(() => {
    axios.get(`${url}/land`).then((res) => setLands(res.data));
  }, []);

  const handleBid = async () => {
    try {
      await axios.post(
        `${url}/bid/place`,
        { landId: selectedLand._id, amount: parseFloat(bidAmount) },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Bid placed successfully!');
      setBidAmount('');
    } catch (error) {
      alert('Error placing bid');
    }
  };

  const handleFill = (land) => {
    if (isOwner(land)) {
      return '#60a5fa';
    }
    return land?.isForSale ? 'green' : 'gray';
  }

  const isOwner = (land) => {
    if (land?.ownerId?.email == user.email) {
      return true;
    }
    return false;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Land Diagram</h1>
      <Stage width={800} height={600} className="border rounded shadow-lg bg-gray-100">
        <Layer>
          {lands.map((land) => (
            <React.Fragment key={land._id}>
              <Rect
                x={land.coordinates.x}
                y={land.coordinates.y}
                width={100}
                height={100}
                fill={handleFill(land)}
                cornerRadius={8}
                shadowBlur={5}
                shadowColor="rgba(0,0,0,0.2)"
                shadowOffset={{ x: 2, y: 2 }}
                shadowOpacity={0.4}
                stroke="#ffffff"
                strokeWidth={1}
                onClick={() => setSelectedLand(land)}
                onMouseEnter={(e) => {
                  const container = e.target.getStage().container();
                  container.style.cursor = 'pointer';
                }}
                onMouseLeave={(e) => {
                  const container = e.target.getStage().container();
                  container.style.cursor = 'default';
                }}
              />

              <Text
                x={land.coordinates.x + 10}
                y={land.coordinates.y + 40}
                text={land.ownerId?.email?.split('@')[0] || 'Unknown'}
                fontSize={12}
                fontStyle="bold"
                fill="#fff"
                shadowColor="black"
                shadowBlur={4}
                shadowOffset={{ x: 1, y: 1 }}
                shadowOpacity={0.6}
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>

      {selectedLand && (
        <div className="fixed top-[70px] right-0 w-[30rem] h-[calc(100vh-70px)] bg-white shadow-2xl border-l border-gray-200 p-6 overflow-y-auto z-50 rounded-l-lg">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors text-2xl font-bold"
            onClick={() => setSelectedLand(null)}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Land Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Land Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Land ID:</span> {selectedLand._id}</p>
              <p><span className="font-medium">Owner:</span> {selectedLand.ownerId?.email || "N/A"}</p>
              <p><span className="font-medium">Price:</span> ₹ {selectedLand.price}</p>
            </div>
          </div>

          {/* Conditional Owner Info */}
          {isOwner(selectedLand) && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded border border-green-200">
              You are the owner of this land.
            </div>
          )}

          {/* Bid Section */}
          {selectedLand.isForSale && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Place a Bid</h3>
              <div className="flex flex-col gap-3">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleBid}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                >
                  Place Bid
                </button>
              </div>
            </div>
          )}
        </div>
      )}


    </div>
  );
}

export default LandDiagram;