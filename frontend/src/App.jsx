import React, { useState, useEffect } from 'react'
import Navbar from './sections/Navbar.jsx'
import { Routes, Route} from 'react-router-dom'
import RantSection from './sections/RantSection.jsx'
import Dashboard from './components/Dashboard.jsx'
import Login from "./components/Login.jsx"

const App = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className='container mx-auto max-w-7xl'>
    
        <Navbar isAuthenticated={isAuthenticated} setAuth={setIsAuthenticated} />
        
        <Routes>
          <Route path="/" element={<RantSection />} />
          <Route 
            path="/dashboard" 
            element={<Dashboard setAuth={setIsAuthenticated} />} 
          />
          <Route 
            path="/login" 
            element={<Login setAuth={setIsAuthenticated} />} 
          />
        </Routes>
   
    </div>
  )
}

export default App