import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LandDiagram from './pages/LandDiagram';
import Login from './pages/Login';
import Register from './pages/Register';
import LandCreate from './pages/LandCreate';
import { AppProvider } from './context/AppContext';

function App() {

  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagram" element={<LandDiagram />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<LandCreate />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App
