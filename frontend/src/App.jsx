import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomeDashboard from './pages/HomeDashboard'
import BusDashboard from './pages/BusDashboard'
import TrainDashboard from './pages/TrainDashboard'
import FlightDashboard from './pages/FlightDashboard'
import CarBikeDashboard from './pages/CarBikeDashboard'
import ExploreDashboard from './pages/ExploreDashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/bus" element={<BusDashboard />} />
          <Route path="/train" element={<TrainDashboard />} />
          <Route path="/flight" element={<FlightDashboard />} />
          <Route path="/car-bike" element={<CarBikeDashboard />} />
          <Route path="/explore" element={<ExploreDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App