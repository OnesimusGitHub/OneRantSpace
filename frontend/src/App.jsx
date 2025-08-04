import React from 'react'
import Navbar from './sections/Navbar.jsx'
import {Routes, Route} from 'react-router-dom'
import RantSection from './sections/RantSection.jsx'
const App = () => {
  return (
    <div className='container mx-auto max-w-7xl'>
        <Navbar/>

        <Routes>
          <Route path="/" element={<RantSection />} />
        </Routes>
    </div>
  )
  
}

export default App