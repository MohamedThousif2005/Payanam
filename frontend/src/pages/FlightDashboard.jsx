import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FlightDashboard = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    flightClass: '',
    date: ''
  })

  const [selectedFlight, setSelectedFlight] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  // Airport data
  const airports = [
    // Tamil Nadu Airports
    { name: 'Chennai International Airport', code: 'MAA', city: 'Chennai', type: 'domestic' },
    { name: 'Coimbatore International Airport', code: 'CJB', city: 'Coimbatore', type: 'domestic' },
    { name: 'Madurai Airport', code: 'IXM', city: 'Madurai', type: 'domestic' },
    { name: 'Tiruchirappalli International Airport', code: 'TRZ', city: 'Trichy', type: 'domestic' },
    
    // Major Indian Airports
    { name: 'Indira Gandhi International Airport', code: 'DEL', city: 'Delhi', type: 'international' },
    { name: 'Chhatrapati Shivaji Maharaj International Airport', code: 'BOM', city: 'Mumbai', type: 'international' },
    { name: 'Kempegowda International Airport', code: 'BLR', city: 'Bangalore', type: 'international' },
    { name: 'Rajiv Gandhi International Airport', code: 'HYD', city: 'Hyderabad', type: 'international' },
    
    // International Airports
    { name: 'Dubai International Airport', code: 'DXB', city: 'Dubai', type: 'international' },
    { name: 'Singapore Changi Airport', code: 'SIN', city: 'Singapore', type: 'international' },
    { name: 'Kuala Lumpur International Airport', code: 'KUL', city: 'Kuala Lumpur', type: 'international' }
  ]

  const flightClasses = [
    { value: 'all', label: 'All Classes' },
    { value: 'economy', label: 'Economy' },
    { value: 'premium_economy', label: 'Premium Economy' },
    { value: 'business', label: 'Business' },
    { value: 'first', label: 'First Class' }
  ]

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]
  
  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormatted = tomorrow.toISOString().split('T')[0]

  // Sample flights with current dates
  const sampleFlights = [
    {
      id: 1,
      airline: 'Air India',
      number: 'AI430',
      from: 'Chennai International Airport',
      fromCode: 'MAA',
      to: 'Indira Gandhi International Airport',
      toCode: 'DEL',
      departure: '06:00 AM',
      arrival: '08:45 AM',
      duration: '2h 45m',
      type: 'domestic',
      class: 'Economy',
      price: '₹4,500',
      date: today,
      currentStatus: 'Scheduled',
      delay: 'On time',
      aircraft: 'Airbus A320',
      routeStops: [
        { phase: 'Check-in', time: '04:00 AM', status: 'Open', gate: 'Counter 12-18' },
        { phase: 'Boarding', time: '05:30 AM', status: 'Scheduled', gate: 'Gate 23' },
        { phase: 'Departure', time: '06:00 AM', status: 'Scheduled', gate: 'Runway 07' },
        { phase: 'In-flight', time: '06:00 AM - 08:45 AM', status: 'Scheduled', gate: 'Airborne' },
        { phase: 'Arrival', time: '08:45 AM', status: 'Scheduled', gate: 'Terminal 3' },
        { phase: 'Baggage', time: '09:00 AM', status: 'Scheduled', gate: 'Carousel 5' }
      ]
    },
    {
      id: 2,
      airline: 'IndiGo',
      number: '6E234',
      from: 'Chennai International Airport',
      fromCode: 'MAA',
      to: 'Dubai International Airport',
      toCode: 'DXB',
      departure: '02:30 PM',
      arrival: '06:45 PM',
      duration: '4h 15m',
      type: 'international',
      class: 'Economy',
      price: '₹18,500',
      date: today,
      currentStatus: 'Scheduled',
      delay: 'On time',
      aircraft: 'Airbus A321',
      routeStops: [
        { phase: 'Check-in', time: '12:30 PM', status: 'Open', gate: 'Counter 25-30' },
        { phase: 'Security', time: '01:30 PM', status: 'Scheduled', gate: 'Security A' },
        { phase: 'Boarding', time: '02:00 PM', status: 'Scheduled', gate: 'Gate 15' },
        { phase: 'Departure', time: '02:30 PM', status: 'Scheduled', gate: 'Runway 12' },
        { phase: 'In-flight', time: '02:30 PM - 06:45 PM', status: 'Scheduled', gate: 'Airborne' },
        { phase: 'Arrival', time: '06:45 PM', status: 'Scheduled', gate: 'Terminal 1' },
        { phase: 'Immigration', time: '07:00 PM', status: 'Scheduled', gate: 'Counter 8-12' }
      ]
    },
    {
      id: 3,
      airline: 'SpiceJet',
      number: 'SG567',
      from: 'Coimbatore International Airport',
      fromCode: 'CJB',
      to: 'Kempegowda International Airport',
      toCode: 'BLR',
      departure: '09:15 AM',
      arrival: '10:30 AM',
      duration: '1h 15m',
      type: 'domestic',
      class: 'Economy',
      price: '₹3,200',
      date: today,
      currentStatus: 'Scheduled',
      delay: 'On time',
      aircraft: 'Boeing 737',
      routeStops: [
        { phase: 'Check-in', time: '07:45 AM', status: 'Open', gate: 'Counter 5-8' },
        { phase: 'Boarding', time: '08:45 AM', status: 'Scheduled', gate: 'Gate 3' },
        { phase: 'Departure', time: '09:15 AM', status: 'Scheduled', gate: 'Runway 09' },
        { phase: 'In-flight', time: '09:15 AM - 10:30 AM', status: 'Scheduled', gate: 'Airborne' },
        { phase: 'Arrival', time: '10:30 AM', status: 'Scheduled', gate: 'Terminal 1' }
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
    
    if (!formData.from || !formData.to || !formData.date) {
      alert('Please select From, To airports and Date')
      return
    }

    setHasSearched(true)
    
    // Filter flights based on search criteria
    const filteredFlights = sampleFlights.filter(flight => {
      const matchesRoute = flight.from === formData.from && flight.to === formData.to
      const matchesClass = !formData.flightClass || formData.flightClass === 'all' || flight.class.toLowerCase() === formData.flightClass
      const matchesDate = flight.date === formData.date
      
      return matchesRoute && matchesClass && matchesDate
    })

    setSearchResults(filteredFlights)
    setSelectedFlight(null)
  }

  const handleFlightSelect = (flight) => {
    setSelectedFlight(selectedFlight?.id === flight.id ? null : flight)
  }

  const getFlightTypeColor = (type) => {
    const colors = {
      domestic: 'var(--forest-green)',
      international: 'var(--warm-orange)'
    }
    return colors[type] || 'var(--deep-blue)'
  }

  const getFlightIcon = (type) => {
    return type === 'international' ? '✈️' : '🛫'
  }

  const getStatusColor = (status) => {
    if (status === 'Open') return 'var(--success-green)'
    if (status === 'Scheduled') return 'var(--sky-blue)'
    if (status === 'Completed') return 'var(--forest-green)'
    return 'var(--deep-blue)'
  }

  // Get unique airports for dropdown
  const uniqueAirports = airports.filter((airport, index, self) =>
    index === self.findIndex(a => a.code === airport.code)
  )

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ 
            textAlign: 'center', 
            color: 'var(--deep-blue)',
            marginBottom: '2rem',
            fontSize: '2.5rem'
          }}>
            Flight Services
          </h1>

          {/* Search Form */}
          <div className="card" style={{ maxWidth: '1000px', margin: '0 auto 3rem auto' }}>
            <form onSubmit={handleSearch}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--deep-blue)'
                  }}>
                    From Airport
                  </label>
                  <select
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--soft-gray)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">Select Departure</option>
                    <optgroup label="Tamil Nadu Airports">
                      {uniqueAirports.filter(a => a.type === 'domestic').map(airport => (
                        <option key={`from-${airport.code}`} value={airport.name}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="International Airports">
                      {uniqueAirports.filter(a => a.type === 'international').map(airport => (
                        <option key={`from-${airport.code}`} value={airport.name}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--deep-blue)'
                  }}>
                    To Airport
                  </label>
                  <select
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--soft-gray)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">Select Destination</option>
                    <optgroup label="Indian Airports">
                      {uniqueAirports.filter(a => a.type === 'domestic').map(airport => (
                        <option key={`to-${airport.code}`} value={airport.name}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="International Airports">
                      {uniqueAirports.filter(a => a.type === 'international').map(airport => (
                        <option key={`to-${airport.code}`} value={airport.name}>
                          {airport.city} ({airport.code})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--deep-blue)'
                  }}>
                    Travel Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={today}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--soft-gray)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--deep-blue)'
                  }}>
                    Class
                  </label>
                  <select
                    name="flightClass"
                    value={formData.flightClass}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid var(--soft-gray)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    {flightClasses.map(cls => (
                      <option key={cls.value} value={cls.value}>
                        {cls.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  fontSize: '1.1rem',
                  padding: '15px',
                  backgroundColor: 'var(--warm-orange)'
                }}
              >
                Search Flights
              </motion.button>
            </form>
            {/* Reset Search Button */}
  {(formData.from || formData.to || formData.flightClass || formData.date) && (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setFormData({
            from: '',
            to: '',
            flightClass: '',
            date: ''
          })
          setSearchResults([])
          setSelectedFlight(null)
          setHasSearched(false)
        }}
        className="btn"
        style={{
          padding: '10px 20px',
          fontSize: '0.9rem',
          backgroundColor: 'var(--soft-gray)',
          color: 'var(--deep-blue)'
        }}
      >
        Reset Search
      </motion.button>
    </div>
  )}
</div>

          {/* Results Section */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ marginTop: '2rem' }}
              >
                <h2 style={{ 
                  color: 'var(--deep-blue)',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>
                  Available Flights ({searchResults.length})
                </h2>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  {searchResults.map((flight) => (
                    <motion.div
                      key={flight.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="card"
                      style={{
                        cursor: 'pointer',
                        borderLeft: `4px solid ${getFlightTypeColor(flight.type)}`,
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handleFlightSelect(flight)}
                    >
                      {/* Flight Summary */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gap: '1rem',
                        alignItems: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '2rem' }}>
                            {getFlightIcon(flight.type)}
                          </span>
                          <div>
                            <h3 style={{ 
                              color: 'var(--deep-blue)', 
                              margin: '0 0 0.25rem 0',
                              fontSize: '1.3rem'
                            }}>
                              {flight.airline}
                            </h3>
                            <p style={{ 
                              color: 'var(--deep-blue)', 
                              opacity: 0.7, 
                              margin: 0,
                              fontSize: '0.9rem'
                            }}>
                              {flight.number} • {flight.class}
                            </p>
                          </div>
                        </div>
                        
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ 
                            color: 'var(--deep-blue)', 
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            marginBottom: '0.25rem'
                          }}>
                            {flight.fromCode} → {flight.toCode}
                          </div>
                          <div style={{ 
                            color: 'var(--deep-blue)', 
                            opacity: 0.8,
                            fontSize: '0.9rem'
                          }}>
                            {flight.departure} - {flight.arrival} ({flight.duration})
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            color: 'var(--success-green)', 
                            fontWeight: 'bold',
                            fontSize: '1.4rem',
                            marginBottom: '0.25rem'
                          }}>
                            {flight.price}
                          </div>
                          <div style={{ 
                            color: 'var(--warm-orange)', 
                            fontSize: '0.8rem'
                          }}>
                            {flight.currentStatus} • {flight.delay}
                          </div>
                        </div>
                      </div>

                      {/* Flight Details - Animated */}
                      <AnimatePresence>
                        {selectedFlight?.id === flight.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              marginTop: '1.5rem',
                              paddingTop: '1.5rem',
                              borderTop: '1px solid var(--soft-gray)'
                            }}
                          >
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: '1rem',
                              marginBottom: '1.5rem'
                            }}>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Flight Number:</strong>
                                <div>{flight.number}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>From:</strong>
                                <div>{flight.from} ({flight.fromCode})</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>To:</strong>
                                <div>{flight.to} ({flight.toCode})</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Departure:</strong>
                                <div>{flight.departure}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Arrival:</strong>
                                <div>{flight.arrival}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Duration:</strong>
                                <div>{flight.duration}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Class:</strong>
                                <div>{flight.class}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Aircraft:</strong>
                                <div>{flight.aircraft}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Type:</strong>
                                <div style={{ textTransform: 'capitalize' }}>{flight.type}</div>
                              </div>
                            </div>

                            {/* Flight Journey Timeline */}
                            <div style={{ marginBottom: '1rem' }}>
                              <strong style={{ 
                                color: 'var(--deep-blue)', 
                                marginBottom: '1rem', 
                                display: 'block',
                                fontSize: '1.1rem'
                              }}>
                                ✈️ Flight Journey Timeline
                              </strong>
                              <div style={{
                                background: 'var(--soft-gray)',
                                padding: '1rem',
                                borderRadius: '8px',
                                maxHeight: '400px',
                                overflowY: 'auto'
                              }}>
                                {flight.routeStops.map((stop, index) => (
                                  <div
                                    key={`${flight.number}-${index}`}
                                    style={{
                                      display: 'grid',
                                      gridTemplateColumns: '100px 1fr auto',
                                      gap: '1rem',
                                      alignItems: 'center',
                                      padding: '0.75rem',
                                      background: 'white',
                                      marginBottom: '0.5rem',
                                      borderRadius: '6px',
                                      border: `2px solid ${getStatusColor(stop.status)}`
                                    }}
                                  >
                                    <div style={{ 
                                      fontWeight: 'bold',
                                      color: 'var(--deep-blue)',
                                      fontSize: '0.9rem'
                                    }}>
                                      {stop.time}
                                    </div>
                                    <div>
                                      <div style={{ 
                                        fontWeight: 'bold',
                                        color: 'var(--deep-blue)'
                                      }}>
                                        {stop.phase}
                                      </div>
                                      <div style={{ 
                                        fontSize: '0.8rem',
                                        color: 'var(--deep-blue)',
                                        opacity: 0.7
                                      }}>
                                        {stop.gate}
                                      </div>
                                    </div>
                                    <div style={{ 
                                      fontSize: '0.8rem',
                                      color: getStatusColor(stop.status),
                                      fontWeight: 'bold',
                                      textAlign: 'right'
                                    }}>
                                      {stop.status === 'Open' ? '✅ Open' :
                                       stop.status === 'Scheduled' ? '⏳ Scheduled' :
                                       '✅ Completed'}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Book Button */}
                            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary"
                                style={{
                                  padding: '12px 30px',
                                  fontSize: '1rem',
                                  backgroundColor: 'var(--warm-orange)',
                                  fontWeight: 'bold'
                                }}
                              >
                                Book Flight for {flight.price}
                              </motion.button>
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

          {/* No Results Message - Only show after search */}
          {hasSearched && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', marginTop: '3rem' }}
            >
              <p style={{ 
                color: 'var(--deep-blue)', 
                fontSize: '1.2rem',
                opacity: 0.7
              }}>
                No flights found for the selected route and date.
              </p>
            </motion.div>
          )}

          {/* Initial State - Show popular routes only when no search has been done */}
          {!hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: '3rem' }}
            >
              <h2 style={{ 
                color: 'var(--deep-blue)',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Popular Flight Routes
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1000px',
                margin: '0 auto'
              }}>
                {[
                  { from: 'Chennai (MAA)', to: 'Delhi (DEL)', desc: 'Domestic • 2h 45m', price: 'From ₹4,500' },
                  { from: 'Chennai (MAA)', to: 'Dubai (DXB)', desc: 'International • 4h 15m', price: 'From ₹18,500' },
                  { from: 'Coimbatore (CJB)', to: 'Bangalore (BLR)', desc: 'Domestic • 1h 15m', price: 'From ₹3,200' }
                ].map((route, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="card"
                    style={{
                      borderLeft: '4px solid var(--warm-orange)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                    onClick={() => {
                      const fromAirport = uniqueAirports.find(a => a.code === route.from.split(' ')[1].replace('(', '').replace(')', ''))
                      const toAirport = uniqueAirports.find(a => a.code === route.to.split(' ')[1].replace('(', '').replace(')', ''))
                      if (fromAirport && toAirport) {
                        setFormData(prev => ({ 
                          ...prev, 
                          from: fromAirport.name, 
                          to: toAirport.name,
                          date: today
                        }))
                      }
                    }}
                  >
                    <h3 style={{ color: 'var(--deep-blue)', margin: '0 0 1rem 0' }}>
                      {route.from} → {route.to}
                    </h3>
                    <p style={{ color: 'var(--deep-blue)', opacity: 0.7, margin: '0 0 0.5rem 0' }}>
                      {route.desc}
                    </p>
                    <div style={{ 
                      color: 'var(--success-green)', 
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      marginBottom: '0.5rem'
                    }}>
                      {route.price}
                    </div>
                    <div style={{ 
                      color: 'var(--warm-orange)', 
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>
                      Click to search this route
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default FlightDashboard