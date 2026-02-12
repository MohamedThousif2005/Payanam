import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TrainDashboard = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    trainType: '',
    date: ''
  })

  const [selectedTrain, setSelectedTrain] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  // Complete station data with all stops and proper order
  const allStations = [
    { name: 'Chennai Egmore', code: 'MS', location: 'Chennai' },
    { name: 'Tambaram', code: 'TBM', location: 'Chennai' },
    { name: 'Chengalpattu', code: 'CGL', location: 'Chengalpattu' },
    { name: 'Villupuram Junction', code: 'VM', location: 'Villupuram' },
    { name: 'Vriddhachalam Junction', code: 'VRI', location: 'Vriddhachalam' },
    { name: 'Tiruchirappalli Junction', code: 'TPJ', location: 'Trichy' },
    { name: 'Manapparai', code: 'MPA', location: 'Manapparai' },
    { name: 'Dindigul Junction', code: 'DG', location: 'Dindigul' },
    { name: 'Ambaturai', code: 'ABI', location: 'Ambaturai' },
    { name: 'Kodaikanal Road', code: 'KQN', location: 'Kodaikanal' },
    { name: 'Madurai Junction', code: 'MDU', location: 'Madurai' },
    
    // Additional stations
    { name: 'Chennai Central', code: 'MAS', location: 'Chennai' },
    { name: 'Coimbatore Junction', code: 'CBE', location: 'Coimbatore' },
    { name: 'Tirunelveli Junction', code: 'TEN', location: 'Tirunelveli' }
  ]

  const trainTypes = [
    { value: 'all', label: 'All Trains' },
    { value: 'superfast', label: 'Superfast' },
    { value: 'express', label: 'Express' },
    { value: 'passenger', label: 'Passenger' }
  ]

  // Sample trains with complete route data
  const sampleTrains = [
    {
      id: 1,
      name: 'Pandian Express',
      number: '12638',
      from: 'Chennai Egmore',
      fromCode: 'MS',
      to: 'Madurai Junction',
      toCode: 'MDU',
      departure: '09:00 PM',
      arrival: '06:30 AM',
      duration: '9h 30m',
      type: 'superfast',
      coaches: 'S1-S12, B1-B8, A1-A4, HA1',
      operator: 'Indian Railways',
      currentStatus: 'Running',
      delay: 'On time',
      routeStops: [
        { station: 'Chennai Egmore', code: 'MS', time: '09:00 PM', status: 'Departed', actualTime: '09:00 PM', platform: '7' },
        { station: 'Tambaram', code: 'TBM', time: '09:28 PM', status: 'Departed', actualTime: '09:26 PM', platform: '4' },
        { station: 'Chengalpattu', code: 'CGL', time: '09:58 PM', status: 'Departed', actualTime: '09:55 PM', platform: '3' },
        { station: 'Villupuram Junction', code: 'VM', time: '11:30 PM', status: 'Expected', actualTime: '11:28 PM', platform: '2' },
        { station: 'Vriddhachalam Junction', code: 'VRI', time: '12:15 AM', status: 'Scheduled', actualTime: '', platform: '1' },
        { station: 'Tiruchirappalli Junction', code: 'TPJ', time: '02:45 AM', status: 'Scheduled', actualTime: '', platform: '5' },
        { station: 'Manapparai', code: 'MPA', time: '03:30 AM', status: 'Scheduled', actualTime: '', platform: '2' },
        { station: 'Dindigul Junction', code: 'DG', time: '04:45 AM', status: 'Scheduled', actualTime: '', platform: '3' },
        { station: 'Ambaturai', code: 'ABI', time: '05:15 AM', status: 'Scheduled', actualTime: '', platform: '1' },
        { station: 'Kodaikanal Road', code: 'KQN', time: '05:45 AM', status: 'Scheduled', actualTime: '', platform: '2' },
        { station: 'Madurai Junction', code: 'MDU', time: '06:30 AM', status: 'Scheduled', actualTime: '', platform: '1' }
      ]
    },
    {
      id: 2,
      name: 'Vaigai Express',
      number: '12635',
      from: 'Chennai Egmore',
      fromCode: 'MS',
      to: 'Madurai Junction',
      toCode: 'MDU',
      departure: '03:10 PM',
      arrival: '10:45 PM',
      duration: '7h 35m',
      type: 'superfast',
      coaches: 'C1-C10, B1-B6, A1-A2',
      operator: 'Indian Railways',
      currentStatus: 'Scheduled',
      delay: 'On time',
      routeStops: [
        { station: 'Chennai Egmore', code: 'MS', time: '03:10 PM', status: 'Scheduled', actualTime: '', platform: '5' },
        { station: 'Tambaram', code: 'TBM', time: '03:38 PM', status: 'Scheduled', actualTime: '', platform: '3' },
        { station: 'Chengalpattu', code: 'CGL', time: '04:08 PM', status: 'Scheduled', actualTime: '', platform: '2' },
        { station: 'Villupuram Junction', code: 'VM', time: '05:40 PM', status: 'Scheduled', actualTime: '', platform: '4' },
        { station: 'Vriddhachalam Junction', code: 'VRI', time: '06:25 PM', status: 'Scheduled', actualTime: '', platform: '1' },
        { station: 'Tiruchirappalli Junction', code: 'TPJ', time: '08:55 PM', status: 'Scheduled', actualTime: '', platform: '6' },
        { station: 'Dindigul Junction', code: 'DG', time: '09:45 PM', status: 'Scheduled', actualTime: '', platform: '2' },
        { station: 'Madurai Junction', code: 'MDU', time: '10:45 PM', status: 'Scheduled', actualTime: '', platform: '3' }
      ]
    },
    {
      id: 3,
      name: 'Guruvayur Express',
      number: '16128',
      from: 'Chennai Egmore',
      fromCode: 'MS',
      to: 'Tiruchirappalli Junction',
      toCode: 'TPJ',
      departure: '08:45 PM',
      arrival: '05:15 AM',
      duration: '8h 30m',
      type: 'express',
      coaches: 'S1-S15, B1-B8, A1-A5, GS1-GS3',
      operator: 'Indian Railways',
      currentStatus: 'Scheduled',
      delay: 'On time',
      routeStops: [
        { station: 'Chennai Egmore', code: 'MS', time: '08:45 PM', status: 'Scheduled', actualTime: '', platform: '6' },
        { station: 'Tambaram', code: 'TBM', time: '09:13 PM', status: 'Scheduled', actualTime: '', platform: '4' },
        { station: 'Chengalpattu', code: 'CGL', time: '09:43 PM', status: 'Scheduled', actualTime: '', platform: '3' },
        { station: 'Villupuram Junction', code: 'VM', time: '11:15 PM', status: 'Scheduled', actualTime: '', platform: '2' },
        { station: 'Vriddhachalam Junction', code: 'VRI', time: '12:00 AM', status: 'Scheduled', actualTime: '', platform: '1' },
        { station: 'Tiruchirappalli Junction', code: 'TPJ', time: '05:15 AM', status: 'Scheduled', actualTime: '', platform: '4' }
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
      alert('Please select both From and To stations')
      return
    }

    // Simple search logic - find trains that have both from and to stations in their route
    const filteredTrains = sampleTrains.filter(train => {
      const fromStop = train.routeStops.find(stop => stop.station === formData.from)
      const toStop = train.routeStops.find(stop => stop.station === formData.to)
      
      if (!fromStop || !toStop) return false
      
      // Check if from station comes before to station in the route
      const fromIndex = train.routeStops.findIndex(stop => stop.station === formData.from)
      const toIndex = train.routeStops.findIndex(stop => stop.station === formData.to)
      
      return fromIndex < toIndex
    })

    setSearchResults(filteredTrains)
    setSelectedTrain(null)
  }

  const handleTrainSelect = (train) => {
    setSelectedTrain(selectedTrain?.id === train.id ? null : train)
  }

  const getTrainTypeColor = (type) => {
    const colors = {
      superfast: 'var(--warm-orange)',
      express: 'var(--forest-green)',
      passenger: 'var(--sky-blue)'
    }
    return colors[type] || 'var(--deep-blue)'
  }

  const getTrainTypeIcon = (type) => {
    const icons = {
      superfast: '🚄',
      express: '🚆',
      passenger: '🚃'
    }
    return icons[type] || '🚆'
  }

  const getStatusColor = (status) => {
    if (status === 'Departed') return 'var(--success-green)'
    if (status === 'Expected') return 'var(--warning-amber)'
    if (status === 'Scheduled') return 'var(--sky-blue)'
    return 'var(--deep-blue)'
  }

  // Get unique stations for dropdown (remove duplicates by name)
  const uniqueStations = allStations.filter((station, index, self) =>
    index === self.findIndex(s => s.name === station.name)
  )

  // Coach position layout component
  const CoachPositionLayout = ({ train }) => {
    const coachLayout = [
      { type: 'SLRD', number: '' },
      { type: 'GEN', number: '' },
      { type: 'GEN', number: '' },
      { type: 'S7', number: '7' },
      { type: 'S6', number: '6' },
      { type: 'S5', number: '5' },
      { type: 'S4', number: '4' },
      { type: 'S3', number: '3' },
      { type: 'S2', number: '2' },
      { type: 'S1', number: '1' }
    ]

    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <strong style={{ 
          color: 'var(--deep-blue)', 
          marginBottom: '0.5rem', 
          display: 'block',
          fontSize: '1.1rem'
        }}>
          Coach Position (Engine → Guard)
        </strong>
        
        {/* Warning Message */}
        <div style={{
          background: 'var(--warning-amber)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          ⚠️ WARNING! Coach position may not be accurate. Please verify at station.
        </div>

        {/* Simple Horizontal Coach Layout */}
        <div style={{
          background: 'var(--soft-gray)',
          padding: '1rem',
          borderRadius: '8px',
          border: '2px solid var(--deep-blue)'
        }}>
          {/* Coach Types Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem',
            padding: '0 0.5rem'
          }}>
            {coachLayout.map((coach, index) => (
              <div key={index} style={{
                textAlign: 'center',
                minWidth: '50px'
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  color: 'var(--deep-blue)'
                }}>
                  {coach.type}
                </div>
              </div>
            ))}
          </div>

          {/* Coach Numbers Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 0.5rem'
          }}>
            {coachLayout.map((coach, index) => (
              <div key={index} style={{
                textAlign: 'center',
                minWidth: '50px'
              }}>
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: coach.number ? 'var(--warm-orange)' : 'transparent',
                  height: '20px'
                }}>
                  {coach.number}
                </div>
              </div>
            ))}
          </div>

          {/* Direction Arrow */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.5rem',
            padding: '0 0.5rem',
            fontSize: '0.7rem',
            color: 'var(--deep-blue)',
            fontWeight: 'bold'
          }}>
            <span>ENGINE END</span>
            <span>→</span>
            <span>GUARD END</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.5rem',
          marginTop: '1rem',
          fontSize: '0.8rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--sky-blue)',
              borderRadius: '2px'
            }}></div>
            <span><strong>SLRD</strong>: Sleeper Coach</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--forest-green)',
              borderRadius: '2px'
            }}></div>
            <span><strong>GEN</strong>: General Coach</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: 'var(--warm-orange)',
              borderRadius: '2px'
            }}></div>
            <span><strong>S1-S7</strong>: Sitting Coach</span>
          </div>
        </div>
      </div>
    )
  }

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
            Train Services
          </h1>

          {/* Search Form */}
          <div className="card" style={{ maxWidth: '900px', margin: '0 auto 3rem auto' }}>
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
                    From Station
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
                    <option value="">Select From Station</option>
                    {uniqueStations.map(station => (
                      <option key={`from-${station.code}`} value={station.name}>
                        {station.name} ({station.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--deep-blue)'
                  }}>
                    To Station
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
                    <option value="">Select To Station</option>
                    {uniqueStations.map(station => (
                      <option key={`to-${station.code}`} value={station.name}>
                        {station.name} ({station.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--deep-blue)'
                  }}>
                    Train Type
                  </label>
                  <select
                    name="trainType"
                    value={formData.trainType}
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
                    {trainTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--deep-blue)'
                  }}>
                    Journey Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
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
                  backgroundColor: 'var(--forest-green)'
                }}
              >
                Search Trains
              </motion.button>
            </form>
            {/* Reset Search Button */}
  {(formData.from || formData.to || formData.trainType || formData.date) && (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setFormData({
            from: '',
            to: '',
            trainType: '',
            date: ''
          })
          setSearchResults([])
          setSelectedTrain(null)
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
                  Available Trains ({searchResults.length})
                </h2>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  {searchResults.map((train) => (
                    <motion.div
                      key={train.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="card"
                      style={{
                        cursor: 'pointer',
                        borderLeft: `4px solid ${getTrainTypeColor(train.type)}`,
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handleTrainSelect(train)}
                    >
                      {/* Train Summary */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gap: '1rem',
                        alignItems: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '2rem' }}>
                            {getTrainTypeIcon(train.type)}
                          </span>
                          <div>
                            <h3 style={{ 
                              color: 'var(--deep-blue)', 
                              margin: '0 0 0.25rem 0',
                              fontSize: '1.3rem'
                            }}>
                              {train.name}
                            </h3>
                            <p style={{ 
                              color: 'var(--deep-blue)', 
                              opacity: 0.7, 
                              margin: 0,
                              fontSize: '0.9rem'
                            }}>
                              {train.number} • {train.operator}
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
                            {formData.from} → {formData.to}
                          </div>
                          <div style={{ 
                            color: 'var(--deep-blue)', 
                            opacity: 0.8,
                            fontSize: '0.9rem'
                          }}>
                            {train.departure} - {train.arrival} ({train.duration})
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            color: 'var(--forest-green)', 
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            marginBottom: '0.5rem'
                          }}>
                            {train.type.toUpperCase()}
                          </div>
                          <div style={{ 
                            color: 'var(--warm-orange)', 
                            fontSize: '0.8rem'
                          }}>
                            {train.currentStatus} • {train.delay}
                          </div>
                        </div>
                      </div>

                      {/* Train Details - Animated */}
                      <AnimatePresence>
                        {selectedTrain?.id === train.id && (
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
                                <strong style={{ color: 'var(--deep-blue)' }}>Train Number:</strong>
                                <div>{train.number}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>From:</strong>
                                <div>{train.from} ({train.fromCode})</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>To:</strong>
                                <div>{train.to} ({train.toCode})</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Your Journey:</strong>
                                <div>{formData.from} → {formData.to}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Departure:</strong>
                                <div>{train.departure}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Arrival:</strong>
                                <div>{train.arrival}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Duration:</strong>
                                <div>{train.duration}</div>
                              </div>
                              <div>
                                <strong style={{ color: 'var(--deep-blue)' }}>Type:</strong>
                                <div style={{ textTransform: 'capitalize' }}>{train.type}</div>
                              </div>
                            </div>

                            {/* Coach Information */}
                            <div style={{ marginBottom: '1.5rem' }}>
                              <strong style={{ 
                                color: 'var(--deep-blue)', 
                                marginBottom: '0.5rem', 
                                display: 'block',
                                fontSize: '1.1rem'
                              }}>
                                Coach Information
                              </strong>
                              <div style={{
                                background: 'var(--soft-gray)',
                                padding: '1rem',
                                borderRadius: '8px'
                              }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                  <strong style={{ color: 'var(--deep-blue)' }}>Available Coaches:</strong>
                                  <div style={{ 
                                    color: 'var(--deep-blue)',
                                    fontSize: '0.9rem',
                                    marginTop: '0.25rem'
                                  }}>
                                    {train.coaches}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Coach Position Layout */}
                            <CoachPositionLayout train={train} />

                            {/* Live Route Tracking */}
                            <div style={{ marginBottom: '1rem' }}>
                              <strong style={{ 
                                color: 'var(--deep-blue)', 
                                marginBottom: '1rem', 
                                display: 'block',
                                fontSize: '1.1rem'
                              }}>
                                🚆 Live Route & Tracking
                              </strong>
                              <div style={{
                                background: 'var(--soft-gray)',
                                padding: '1rem',
                                borderRadius: '8px',
                                maxHeight: '400px',
                                overflowY: 'auto'
                              }}>
                                {train.routeStops.map((stop, index) => {
                                  const fromIndex = train.routeStops.findIndex(s => s.station === formData.from)
                                  const toIndex = train.routeStops.findIndex(s => s.station === formData.to)
                                  const isInSearchedRoute = index >= fromIndex && index <= toIndex
                                  
                                  return (
                                    <div
                                      key={`${train.number}-${stop.code}`}
                                      style={{
                                        display: 'grid',
                                        gridTemplateColumns: '80px 1fr auto',
                                        gap: '1rem',
                                        alignItems: 'center',
                                        padding: '0.75rem',
                                        background: isInSearchedRoute 
                                          ? (stop.status === 'Departed' ? 'var(--success-green)' + '20' :
                                             stop.status === 'Expected' ? 'var(--warning-amber)' + '20' :
                                             'var(--sky-blue)' + '20')
                                          : 'white',
                                        marginBottom: '0.5rem',
                                        borderRadius: '6px',
                                        border: isInSearchedRoute 
                                          ? `2px solid ${getStatusColor(stop.status)}`
                                          : '1px solid var(--soft-gray)'
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
                                          {stop.station}
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
                                          color: 'var(--deep-blue)',
                                          opacity: 0.7
                                        }}>
                                          {stop.code} {stop.platform && `• Platform ${stop.platform}`}
                                        </div>
                                        {stop.actualTime && stop.actualTime !== stop.time && (
                                          <div style={{ 
                                            fontSize: '0.7rem',
                                            color: 'var(--warm-orange)',
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
                                        {isInSearchedRoute ? (
                                          stop.status === 'Departed' ? '✅ Departed' :
                                          stop.status === 'Expected' ? '🟡 Expected' :
                                          '⏳ Scheduled'
                                        ) : ''}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
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

          {/* No Results Message */}
          {searchResults.length === 0 && formData.from && formData.to && (
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
                No trains found for {formData.from} to {formData.to}
              </p>
            </motion.div>
          )}

          {/* Initial State - Show popular routes */}
          {searchResults.length === 0 && !formData.from && !formData.to && (
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
                Popular Train Routes
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                maxWidth: '1000px',
                margin: '0 auto'
              }}>
                {[
                  { from: 'Chennai Egmore', to: 'Madurai Junction', desc: 'Via all stops' },
                  { from: 'Chennai Egmore', to: 'Tiruchirappalli Junction', desc: 'Direct to Trichy' },
                  { from: 'Tambaram', to: 'Madurai Junction', desc: 'From Tambaram' },
                  { from: 'Dindigul Junction', to: 'Madurai Junction', desc: 'Short journey' }
                ].map((route, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="card"
                    style={{
                      borderLeft: '4px solid var(--forest-green)',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, from: route.from, to: route.to }))
                    }}
                  >
                    <h3 style={{ color: 'var(--deep-blue)', margin: '0 0 1rem 0' }}>
                      {route.from.split(' ')[0]} → {route.to.split(' ')[0]}
                    </h3>
                    <p style={{ color: 'var(--deep-blue)', opacity: 0.7, margin: 0 }}>
                      {route.desc}
                    </p>
                    <div style={{ 
                      color: 'var(--forest-green)', 
                      fontSize: '0.8rem',
                      marginTop: '1rem',
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

export default TrainDashboard