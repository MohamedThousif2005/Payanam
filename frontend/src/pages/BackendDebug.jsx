import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './BusDashboard.css'

const BusDashboard = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    busType: ''
  })

  const [selectedBus, setSelectedBus] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Comprehensive Tamil Nadu bus stands data covering all 38 districts
  const allBusStands = [
    // Chennai District
    { name: 'Chennai Koyambedu', code: 'CMBT', location: 'Chennai', type: 'major' },
    { name: 'Chennai Tambaram', code: 'TBM', location: 'Chennai', type: 'major' },
    
    // Madurai District
    { name: 'Madurai Periyar', code: 'MDU', location: 'Madurai', type: 'major' },
    { name: 'Madurai Arapalayam', code: 'ARP', location: 'Madurai', type: 'major' },
    
    // Coimbatore District
    { name: 'Coimbatore Ukkadam', code: 'CBE', location: 'Coimbatore', type: 'major' },
    { name: 'Coimbatore Gandhipuram', code: 'GDP', location: 'Coimbatore', type: 'major' },
    
    // Trichy District
    { name: 'Trichy Central', code: 'TRY', location: 'Trichy', type: 'major' },
    { name: 'Trichy Srirangam', code: 'SRM', location: 'Trichy', type: 'stop' },
    
    // Salem District
    { name: 'Salem New Bus Stand', code: 'SLM', location: 'Salem', type: 'major' },
    
    // Karur District
    { name: 'Karur', code: 'KRR', location: 'Karur', type: 'major' },
    { name: 'Karur New Bus Stand', code: 'KRR', location: 'Karur', type: 'major' },
    { name: 'Kulithalai', code: 'KLT', location: 'Karur', type: 'stop' },
    { name: 'Aravakurichi', code: 'AVK', location: 'Karur', type: 'stop' },
    
    // Other major districts
    { name: 'Tiruppur', code: 'TUP', location: 'Tiruppur', type: 'major' },
    { name: 'Erode', code: 'ED', location: 'Erode', type: 'major' },
    { name: 'Tirunelveli', code: 'TEN', location: 'Tirunelveli', type: 'major' },
    { name: 'Thoothukudi', code: 'TUT', location: 'Thoothukudi', type: 'major' },
    { name: 'Nagercoil', code: 'NGL', location: 'Kanyakumari', type: 'major' },
    { name: 'Dindigul', code: 'DG', location: 'Dindigul', type: 'major' },
    { name: 'Thanjavur', code: 'TJV', location: 'Thanjavur', type: 'major' },
    { name: 'Kumbakonam', code: 'KBM', location: 'Thanjavur', type: 'major' },
    { name: 'Pudukkottai', code: 'PDKT', location: 'Pudukkottai', type: 'major' },
    { name: 'Karaikudi', code: 'KKD', location: 'Sivaganga', type: 'major' },
    { name: 'Ramanathapuram', code: 'RMP', location: 'Ramanathapuram', type: 'major' },
    { name: 'Virudhunagar', code: 'VNR', location: 'Virudhunagar', type: 'major' },
    { name: 'Theni', code: 'TNI', location: 'Theni', type: 'major' },
    { name: 'Vellore', code: 'VLR', location: 'Vellore', type: 'major' },
    { name: 'Krishnagiri', code: 'KRI', location: 'Krishnagiri', type: 'major' },
    { name: 'Hosur', code: 'HSR', location: 'Krishnagiri', type: 'major' },
    { name: 'Dharmapuri', code: 'DMP', location: 'Dharmapuri', type: 'major' },
    { name: 'Tiruvannamalai', code: 'TVM', location: 'Tiruvannamalai', type: 'major' },
    { name: 'Villupuram', code: 'VPM', location: 'Villupuram', type: 'major' },
    { name: 'Cuddalore', code: 'CDL', location: 'Cuddalore', type: 'major' },
    { name: 'Nagapattinam', code: 'NGP', location: 'Nagapattinam', type: 'major' },
    { name: 'Mayiladuthurai', code: 'MYL', location: 'Nagapattinam', type: 'major' },
    { name: 'Thiruvarur', code: 'TVR', location: 'Thiruvarur', type: 'major' },
    { name: 'Kanchipuram', code: 'KPM', location: 'Kanchipuram', type: 'major' },
    { name: 'Chengalpattu', code: 'CGL', location: 'Chengalpattu', type: 'major' },
    { name: 'Ranipet', code: 'RNP', location: 'Ranipet', type: 'major' },
    { name: 'Tirupattur', code: 'TPT', location: 'Tirupattur', type: 'major' },
    { name: 'Kallakurichi', code: 'KLC', location: 'Kallakurichi', type: 'major' },
    { name: 'Tenkasi', code: 'TKS', location: 'Tenkasi', type: 'major' },
    { name: 'Sivakasi', code: 'SVS', location: 'Virudhunagar', type: 'major' },
    { name: 'Rajapalayam', code: 'RJM', location: 'Virudhunagar', type: 'major' },
    { name: 'Pollachi', code: 'PLC', location: 'Coimbatore', type: 'major' },
    { name: 'Palani', code: 'PLI', location: 'Dindigul', type: 'major' },
    { name: 'Bodinayakkanur', code: 'BKN', location: 'Theni', type: 'major' },
    { name: 'Ambur', code: 'AMR', location: 'Tirupattur', type: 'major' },
    { name: 'Vaniyambadi', code: 'VNB', location: 'Tirupattur', type: 'major' },
    { name: 'Tindivanam', code: 'TDM', location: 'Villupuram', type: 'major' },
    { name: 'Panruti', code: 'PNR', location: 'Cuddalore', type: 'major' },
    { name: 'Chidambaram', code: 'CDM', location: 'Cuddalore', type: 'major' },
    { name: 'Nagore', code: 'NGR', location: 'Nagapattinam', type: 'major' },
    { name: 'Velankanni', code: 'VLN', location: 'Nagapattinam', type: 'major' },
    { name: 'Mannargudi', code: 'MGD', location: 'Thiruvarur', type: 'major' },
    { name: 'Pattukkottai', code: 'PTK', location: 'Thanjavur', type: 'major' },
    { name: 'Aranthangi', code: 'ATI', location: 'Pudukkottai', type: 'major' },
    { name: 'Devakottai', code: 'DKT', location: 'Sivaganga', type: 'major' },
    { name: 'Paramakudi', code: 'PMK', location: 'Ramanathapuram', type: 'major' },
    { name: 'Ilayangudi', code: 'ILG', location: 'Sivaganga', type: 'major' },
    { name: 'Sivaganga', code: 'SVG', location: 'Sivaganga', type: 'major' },
    { name: 'Manamadurai', code: 'MND', location: 'Sivaganga', type: 'major' },
    { name: 'Aruppukkottai', code: 'APK', location: 'Virudhunagar', type: 'major' },
    { name: 'Sattur', code: 'STR', location: 'Virudhunagar', type: 'major' },
    { name: 'Srivilliputhur', code: 'SVP', location: 'Virudhunagar', type: 'major' },
    { name: 'Rajapalayam', code: 'RJM', location: 'Virudhunagar', type: 'major' },
    { name: 'Periyakulam', code: 'PKM', location: 'Theni', type: 'major' },
    { name: 'Uthamapalayam', code: 'UPM', location: 'Theni', type: 'major' },
    { name: 'Cumbum', code: 'CBM', location: 'Theni', type: 'major' },
    { name: 'Bodi', code: 'BDI', location: 'Theni', type: 'major' },
    { name: 'Gudalur', code: 'GDL', location: 'Theni', type: 'major' },
    { name: 'Chinnamanur', code: 'CNM', location: 'Theni', type: 'major' },
    { name: 'Andipatti', code: 'ADP', location: 'Theni', type: 'major' },
    { name: 'Kadayanallur', code: 'KYN', location: 'Tenkasi', type: 'major' },
    { name: 'Sankarankovil', code: 'SKL', location: 'Tenkasi', type: 'major' },
    { name: 'Puliyangudi', code: 'PLD', location: 'Tenkasi', type: 'major' },
    { name: 'Shenkottai', code: 'SHT', location: 'Tenkasi', type: 'major' },
    { name: 'Ambasamudram', code: 'AMB', location: 'Tirunelveli', type: 'major' },
    { name: 'Cheranmahadevi', code: 'CMD', location: 'Tirunelveli', type: 'major' },
    { name: 'Valliyoor', code: 'VLR', location: 'Tirunelveli', type: 'major' },
    { name: 'Nanguneri', code: 'NNR', location: 'Tirunelveli', type: 'major' },
    { name: 'Radhapuram', code: 'RDP', location: 'Tirunelveli', type: 'major' },
    { name: 'Kovilpatti', code: 'KVP', location: 'Thoothukudi', type: 'major' },
    { name: 'Ettayapuram', code: 'ETP', location: 'Thoothukudi', type: 'major' },
    { name: 'Vilathikulam', code: 'VTM', location: 'Thoothukudi', type: 'major' },
    { name: 'Udangudi', code: 'UDG', location: 'Thoothukudi', type: 'major' },
    { name: 'Tiruchendur', code: 'TCR', location: 'Thoothukudi', type: 'major' },
    { name: 'Srivaikuntam', code: 'SVT', location: 'Thoothukudi', type: 'major' },
    { name: 'Ottapidaram', code: 'OTP', location: 'Thoothukudi', type: 'major' },
    { name: 'Kayathar', code: 'KYT', location: 'Thoothukudi', type: 'major' },
    { name: 'Kanyakumari', code: 'KKM', location: 'Kanyakumari', type: 'major' },
    { name: 'Kuzhithurai', code: 'KZT', location: 'Kanyakumari', type: 'major' },
    { name: 'Colachel', code: 'CCL', location: 'Kanyakumari', type: 'major' },
    { name: 'Nagercoil Town', code: 'NCT', location: 'Kanyakumari', type: 'major' },
    { name: 'Rajakkamangalam', code: 'RJM', location: 'Kanyakumari', type: 'major' },
    { name: 'Thuckalay', code: 'TKY', location: 'Kanyakumari', type: 'major' },
    { name: 'Kurunthancode', code: 'KTC', location: 'Kanyakumari', type: 'major' },
    { name: 'Marthandam', code: 'MTM', location: 'Kanyakumari', type: 'major' },
    { name: 'Killiyoor', code: 'KYR', location: 'Kanyakumari', type: 'major' },
    { name: 'Thiruvattar', code: 'TVT', location: 'Kanyakumari', type: 'major' },
    { name: 'Munchirai', code: 'MCR', location: 'Kanyakumari', type: 'major' },
    { name: 'Pacode', code: 'PCD', location: 'Kanyakumari', type: 'major' }
  ]

  const busTypes = [
    { value: '', label: 'All Types' },
    { value: 'ordinary', label: 'Ordinary' },
    { value: 'express', label: 'Express' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'ac', label: 'AC' },
    { value: 'sleeper', label: 'Sleeper' },
    { value: 'moffusil', label: 'Moffusil' }
  ]

  // Enhanced sample bus data with comprehensive routes and location tracking
  const sampleBuses = [
    // Karur to Trichy routes
    {
      id: 1,
      busNumber: 'TN 47 AB 1234',
      busName: 'TNSTC Express',
      type: 'express',
      operator: 'TNSTC',
      from: 'Karur',
      to: 'Trichy Central',
      departure: '06:00 AM',
      arrival: '08:30 AM',
      duration: '2h 30m',
      fare: 85,
      seats: 42,
      available: 15,
      status: 'Running',
      currentLocation: 'Near Kulithalai',
      nextStop: 'Musiri',
      estimatedArrival: '07:45 AM',
      routeStops: [
        { stop: 'Karur', time: '06:00 AM', status: 'Departed', actualTime: '06:00 AM', platform: '1' },
        { stop: 'Thanthoni', time: '06:20 AM', status: 'Departed', actualTime: '06:18 AM', platform: '-' },
        { stop: 'Kulithalai', time: '06:50 AM', status: 'Expected', actualTime: '06:48 AM', platform: '-' },
        { stop: 'Musiri', time: '07:30 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Trichy Central', time: '08:30 AM', status: 'Scheduled', actualTime: '', platform: '3' }
      ]
    },
    {
      id: 2,
      busNumber: 'TN 47 CD 5678',
      busName: 'TNSTC Ordinary',
      type: 'ordinary',
      operator: 'TNSTC',
      from: 'Karur',
      to: 'Trichy Central',
      departure: '07:30 AM',
      arrival: '10:15 AM',
      duration: '2h 45m',
      fare: 65,
      seats: 42,
      available: 28,
      status: 'Scheduled',
      currentLocation: 'At Karur Bus Stand',
      nextStop: 'Thanthoni',
      estimatedArrival: '07:50 AM',
      routeStops: [
        { stop: 'Karur', time: '07:30 AM', status: 'Scheduled', actualTime: '', platform: '2' },
        { stop: 'Thanthoni', time: '07:50 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Kulithalai', time: '08:20 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Musiri', time: '09:00 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Trichy Central', time: '10:15 AM', status: 'Scheduled', actualTime: '', platform: '4' }
      ]
    },
    {
      id: 3,
      busNumber: 'TN 47 EF 9012',
      busName: 'Private Deluxe',
      type: 'deluxe',
      operator: 'KK Travels',
      from: 'Karur',
      to: 'Trichy Central',
      departure: '09:00 AM',
      arrival: '11:15 AM',
      duration: '2h 15m',
      fare: 120,
      seats: 36,
      available: 8,
      status: 'Scheduled',
      currentLocation: 'At Depot',
      nextStop: 'Karur',
      estimatedArrival: '09:00 AM',
      routeStops: [
        { stop: 'Karur', time: '09:00 AM', status: 'Scheduled', actualTime: '', platform: '1' },
        { stop: 'Kulithalai', time: '09:40 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Trichy Central', time: '11:15 AM', status: 'Scheduled', actualTime: '', platform: '2' }
      ]
    },
    // Chennai to Madurai
    {
      id: 4,
      busNumber: 'TN 01 GH 3456',
      busName: 'TNSTC AC',
      type: 'ac',
      operator: 'TNSTC',
      from: 'Chennai Koyambedu',
      to: 'Madurai Periyar',
      departure: '10:00 PM',
      arrival: '05:00 AM',
      duration: '7h',
      fare: 650,
      seats: 32,
      available: 12,
      status: 'Running',
      currentLocation: 'Near Chengalpattu',
      nextStop: 'Villupuram',
      estimatedArrival: '11:45 PM',
      routeStops: [
        { stop: 'Chennai Koyambedu', time: '10:00 PM', status: 'Departed', actualTime: '10:00 PM', platform: '15' },
        { stop: 'Chengalpattu', time: '11:00 PM', status: 'Departed', actualTime: '10:55 PM', platform: '-' },
        { stop: 'Villupuram', time: '12:30 AM', status: 'Expected', actualTime: '', platform: '-' },
        { stop: 'Trichy Central', time: '02:30 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Dindigul', time: '04:00 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Madurai Periyar', time: '05:00 AM', status: 'Scheduled', actualTime: '', platform: '8' }
      ]
    },
    // Coimbatore to Chennai
    {
      id: 5,
      busNumber: 'TN 37 IJ 7890',
      busName: 'Orange Travels Sleeper',
      type: 'sleeper',
      operator: 'Orange Travels',
      from: 'Coimbatore Ukkadam',
      to: 'Chennai Koyambedu',
      departure: '09:30 PM',
      arrival: '05:00 AM',
      duration: '7h 30m',
      fare: 750,
      seats: 24,
      available: 6,
      status: 'Scheduled',
      currentLocation: 'At Depot',
      nextStop: 'Coimbatore Ukkadam',
      estimatedArrival: '09:30 PM',
      routeStops: [
        { stop: 'Coimbatore Ukkadam', time: '09:30 PM', status: 'Scheduled', actualTime: '', platform: '4' },
        { stop: 'Tiruppur', time: '10:30 PM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Erode', time: '11:30 PM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Salem', time: '01:00 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Krishnagiri', time: '02:30 AM', status: 'Scheduled', actualTime: '', platform: '-' },
        { stop: 'Chennai Koyambedu', time: '05:00 AM', status: 'Scheduled', actualTime: '', platform: '12' }
      ]
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    
    if (!formData.from || !formData.to) {
      alert('Please select both From and To locations')
      return
    }

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Enhanced search logic to find buses that have both from and to stops in their route
      const results = sampleBuses.filter(bus => {
        const fromStop = bus.routeStops.find(stop => stop.stop === formData.from)
        const toStop = bus.routeStops.find(stop => stop.stop === formData.to)
        
        if (!fromStop || !toStop) return false
        
        // Check if from station comes before to station in the route
        const fromIndex = bus.routeStops.findIndex(stop => stop.stop === formData.from)
        const toIndex = bus.routeStops.findIndex(stop => stop.stop === formData.to)
        
        return fromIndex < toIndex && (!formData.busType || bus.type === formData.busType)
      })
      
      setSearchResults(results)
      setIsLoading(false)
      setLastUpdated(new Date())
    }, 1500)
  }

  const handleReset = () => {
    setFormData({ from: '', to: '', busType: '' })
    setSearchResults([])
    setSelectedBus(null)
  }

  const handleBusSelect = (bus) => {
    setSelectedBus(selectedBus?.id === bus.id ? null : bus)
  }

  const getBusTypeColor = (type) => {
    const colors = {
      'ordinary': '#3b82f6',
      'express': '#10b981',
      'deluxe': '#8b5cf6',
      'ac': '#ef4444',
      'sleeper': '#f59e0b',
      'moffusil': '#06b6d4'
    }
    return colors[type] || '#6b7280'
  }

  const getBusTypeIcon = (type) => {
    const icons = {
      'ordinary': '🚌',
      'express': '🚌⚡',
      'deluxe': '🚌💎',
      'ac': '🚌❄️',
      'sleeper': '🚌🛌',
      'moffusil': '🚌🏙️'
    }
    return icons[type] || '🚌'
  }

  const getStatusColor = (status) => {
    if (status === 'Departed') return '#10b981'
    if (status === 'Expected') return '#f59e0b'
    if (status === 'Scheduled') return '#3b82f6'
    return '#6b7280'
  }

  return (
    <div className="bus-dashboard">
      <div className="container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-section"
        >
          <h1 className="dashboard-title">Tamil Nadu Bus Dashboard</h1>
          <p className="dashboard-subtitle">
            Comprehensive bus services across all 38 districts of Tamil Nadu
          </p>
          
          {/* Location Feature Notice */}
          <div className="location-feature-notice">
            <p>📌 Live Location Tracking Available! Real-time bus tracking with route information.</p>
          </div>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="search-form"
        >
          <form onSubmit={handleSearch}>
            <div className="search-grid">
              {/* From Location */}
              <div className="form-group">
                <label className="form-label">From</label>
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  placeholder="Departure location"
                  className="form-input"
                  list="fromLocations"
                />
                <datalist id="fromLocations">
                  {allBusStands.map((stand, index) => (
                    <option key={index} value={stand.name} />
                  ))}
                </datalist>
              </div>

              {/* To Location */}
              <div className="form-group">
                <label className="form-label">To</label>
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="Destination location"
                  className="form-input"
                  list="toLocations"
                />
                <datalist id="toLocations">
                  {allBusStands.map((stand, index) => (
                    <option key={index} value={stand.name} />
                  ))}
                </datalist>
              </div>

              {/* Bus Type */}
              <div className="form-group">
                <label className="form-label">Bus Type</label>
                <select
                  name="busType"
                  value={formData.busType}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {busTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <button type="submit" className="search-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-small"></span>
                    Searching...
                  </>
                ) : (
                  'Search Buses'
                )}
              </button>
            </div>
          </form>

          {/* Reset Button */}
          {(formData.from || formData.to || formData.busType) && (
            <div className="reset-section">
              <button type="button" onClick={handleReset} className="btn-secondary">
                Reset Search
              </button>
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="loading-state"
            >
              <div className="spinner"></div>
              <p>Searching for available buses...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {searchResults.length > 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="results-section"
            >
              <h2 className="results-title">
                Available Buses ({searchResults.length})
              </h2>
              
              <div className="buses-list">
                {searchResults.map((bus) => (
                  <motion.div
                    key={bus.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`bus-card ${selectedBus?.id === bus.id ? 'expanded' : ''}`}
                    style={{ borderLeftColor: getBusTypeColor(bus.type) }}
                    onClick={() => handleBusSelect(bus)}
                  >
                    <div className="bus-summary">
                      <div className="bus-header">
                        <span className="bus-icon">
                          {getBusTypeIcon(bus.type)}
                        </span>
                        <div className="bus-info">
                          <h3 className="bus-name">{bus.busName}</h3>
                          <p className="bus-details">
                            {bus.busNumber} • {bus.operator}
                          </p>
                        </div>
                      </div>
                      
                      <div className="route-info">
                        <div className="route">{bus.from} → {bus.to}</div>
                        <div className="timing">
                          {bus.departure} - {bus.arrival} ({bus.duration})
                        </div>
                      </div>

                      <div className="bus-meta">
                        <div className="seats-available">
                          {bus.available} seats available
                        </div>
                        <div className="status" style={{ color: getBusTypeColor(bus.type) }}>
                          {bus.status} • ₹{bus.fare}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {selectedBus?.id === bus.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bus-details-expanded"
                        >
                          <div className="details-grid">
                            <div className="detail-item">
                              <strong>Bus Number</strong>
                              <div>{bus.busNumber}</div>
                            </div>
                            <div className="detail-item">
                              <strong>Operator</strong>
                              <div>{bus.operator}</div>
                            </div>
                            <div className="detail-item">
                              <strong>Bus Type</strong>
                              <div style={{ color: getBusTypeColor(bus.type), fontWeight: 'bold' }}>
                                {bus.type.charAt(0).toUpperCase() + bus.type.slice(1)}
                              </div>
                            </div>
                            <div className="detail-item">
                              <strong>Duration</strong>
                              <div>{bus.duration}</div>
                            </div>
                            <div className="detail-item">
                              <strong>Fare</strong>
                              <div>₹{bus.fare}</div>
                            </div>
                            <div className="detail-item">
                              <strong>Seats Available</strong>
                              <div className={bus.available < 10 ? 'seats-count low-seats' : ''}>
                                {bus.available} / {bus.seats}
                              </div>
                            </div>
                          </div>

                          {/* Live Location & Route Tracking */}
                          <div style={{ marginBottom: '1.5rem' }}>
                            <strong style={{ 
                              color: '#1e40af', 
                              marginBottom: '1rem', 
                              display: 'block',
                              fontSize: '1.1rem'
                            }}>
                              🚌 Live Location & Route Tracking
                            </strong>
                            
                            {/* Current Location Info */}
                            <div className="sample-location-data">
                              <div className="location-info">
                                <div className="location-item">
                                  <strong>Current Location</strong>
                                  <span>{bus.currentLocation}</span>
                                </div>
                                <div className="location-item">
                                  <strong>Next Stop</strong>
                                  <span>{bus.nextStop}</span>
                                </div>
                                <div className="location-item">
                                  <strong>Estimated Arrival</strong>
                                  <span>{bus.estimatedArrival}</span>
                                </div>
                                <div className="location-item">
                                  <strong>Bus Status</strong>
                                  <span>{bus.status}</span>
                                </div>
                              </div>
                            </div>

                            {/* Route Stops with Status */}
                            <div style={{
                              background: '#f8fafc',
                              padding: '1rem',
                              borderRadius: '12px',
                              borderLeft: '4px solid #3b82f6',
                              marginTop: '1rem',
                              maxHeight: '400px',
                              overflowY: 'auto'
                            }}>
                              {bus.routeStops.map((stop, index) => {
                                const fromIndex = bus.routeStops.findIndex(s => s.stop === formData.from)
                                const toIndex = bus.routeStops.findIndex(s => s.stop === formData.to)
                                const isInSearchedRoute = index >= fromIndex && index <= toIndex
                                
                                return (
                                  <div
                                    key={`${bus.id}-${stop.stop}`}
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: '80px 1fr auto',
                                      gap: '1rem',
                                      alignItems: 'center',
                                      padding: '0.75rem',
                                      background: isInSearchedRoute 
                                        ? (stop.status === 'Departed' ? '#dcfce7' :
                                           stop.status === 'Expected' ? '#fef3c7' :
                                           '#dbeafe')
                                        : 'white',
                                      marginBottom: '0.5rem',
                                      borderRadius: '6px',
                                      border: isInSearchedRoute 
                                        ? `2px solid ${getStatusColor(stop.status)}`
                                        : '1px solid #e2e8f0'
                                    }}
                                  >
                                    <div style={{ 
                                      fontWeight: 'bold',
                                      color: '#1e40af',
                                      fontSize: '0.9rem'
                                    }}>
                                      {stop.time}
                                    </div>
                                    <div>
                                      <div style={{ 
                                        fontWeight: 'bold',
                                        color: '#1e40af'
                                      }}>
                                        {stop.stop}
                                        {isInSearchedRoute && (
                                          <span style={{
                                            marginLeft: '0.5rem',
                                            fontSize: '0.7rem',
                                            background: getStatusColor(stop.status),
                                            color: 'white',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '12px'
                                          }}>
                                            {stop.status}
                                          </span>
                                        )}
                                      </div>
                                      <div style={{ 
                                        fontSize: '0.8rem',
                                        color: '#64748b'
                                      }}>
                                        {stop.platform && stop.platform !== '-' ? `Platform ${stop.platform}` : 'Bus Stop'}
                                      </div>
                                      {stop.actualTime && stop.actualTime !== stop.time && (
                                        <div style={{ 
                                          fontSize: '0.7rem',
                                          color: '#f59e0b',
                                          fontStyle: 'italic'
                                        }}>
                                          Actual: {stop.actualTime}
                                        </div>
                                      )}
                                    </div>
                                    <div style={{ 
                                      fontSize: '0.8rem',
                                      color: getStatusColor(stop.status),
                                      fontWeight: 'bold',
                                      textAlign: 'right'
                                    }}>
                                      {stop.status}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          <div className="action-buttons">
                            <button className="btn-primary">Book Now</button>
                            <button className="btn-secondary">View Details</button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results State */}
        <AnimatePresence>
          {searchResults.length === 0 && !isLoading && formData.from && formData.to && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="no-results"
            >
              <div className="no-results-content">
                <h3>No buses found</h3>
                <p>Try adjusting your search criteria or check different routes.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Last Updated */}
        {searchResults.length > 0 && (
          <div className="last-updated">
            <p>Last updated: {lastUpdated.toLocaleTimeString()}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BusDashboard