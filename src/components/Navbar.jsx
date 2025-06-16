import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const { isUserLoggedIn, logout, user } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  function handleSignOut() {
    logout();
    localStorage.removeItem("pt-token");
    navigate('/');
  }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">LandLink</Link>
        <div className="flex items-center gap-6">
          {isUserLoggedIn ? (
            <>
              <Link to="/create" className="text-white hidden sm:inline">Create Land</Link>
              <Link to="/diagram" className="text-white hidden sm:inline">Land Diagram</Link>

              {/* Avatar + Dropdown */}
              <div className="relative">
                <img
                  src={user?.avatar || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer border border-white"
                  onClick={() => setShowDropdown(!showDropdown)}
                />
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md z-10">
                    <div className="px-4 py-2 text-gray-700 border-b border-gray-200">
                      {user?.email ?? 'User'}
                    </div>
                    <div className="px-4 py-2 text-gray-700 border-b border-gray-200">
                      Balance: ₹ {user?.balance ?? '0.00'}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logoff
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div>
              <Link to="/register" className="text-white mr-4 btn-border">Register</Link>
              <Link to="/login" className="text-white btn-border">Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
