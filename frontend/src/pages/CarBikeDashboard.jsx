import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CarBikeDashboard = () => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    location: '',
    pickupDate: '',
    returnDate: ''
  })

  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [activeTab, setActiveTab] = useState('rental') // rental, workshops, taxi

  const tamilnaduCities = [
    'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem',
    'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Ooty',
    'Kanyakumari', 'Hosur', 'Dindigul', 'Thanjavur'
  ]

  const vehicleTypes = [
    { value: 'car', label: 'Car', icon: '🚗' },
    { value: 'bike', label: 'Bike', icon: '🏍️' },
    { value: 'scooter', label: 'Scooter', icon: '🛵' }
  ]

  // Sample rental vehicles
  const sampleVehicles = [
    { 
      type: 'car', 
      name: 'Maruti Swift Dzire', 
      brand: 'Maruti Suzuki',
      fuel: 'Petrol', 
      transmission: 'Manual',
      seats: 5,
      price: '₹1,200/day',
      image: '🚗',
      features: ['AC', 'Music System', 'Airbags', 'Power Steering'],
      location: 'Chennai',
      available: true
    },
    { 
      type: 'car', 
      name: 'Hyundai Creta', 
      brand: 'Hyundai',
      fuel: 'Diesel', 
      transmission: 'Automatic',
      seats: 5,
      price: '₹2,500/day',
      image: '🚙',
      features: ['AC', 'GPS', 'Sunroof', 'Airbags', 'Rear Camera'],
      location: 'Coimbatore',
      available: true
    },
    { 
      type: 'bike', 
      name: 'Royal Enfield Classic 350', 
      brand: 'Royal Enfield',
      fuel: 'Petrol', 
      transmission: 'Manual',
      seats: 2,
      price: '₹800/day',
      image: '🏍️',
      features: ['Helmet', 'Insurance', 'Roadside Assistance'],
      location: 'Madurai',
      available: true
    },
    { 
      type: 'scooter', 
      name: 'Honda Activa 6G', 
      brand: 'Honda',
      fuel: 'Petrol', 
      transmission: 'Automatic',
      seats: 2,
      price: '₹400/day',
      image: '🛵',
      features: ['Helmet', 'Good Mileage', 'Easy to Ride'],
      location: 'Chennai',
      available: true
    }
  ]

  // Workshop data
  const workshops = [
    {
      id: 1,
      name: 'Auto Care Service Center',
      type: 'multi-brand',
      services: ['General Service', 'AC Repair', 'Tyre Change', 'Battery Replacement'],
      address: '123 GST Road, Chennai',
      phone: '+91 9876543210',
      rating: '4.5',
      openNow: true,
      emergency: true,
      location: 'Chennai'
    },
    {
      id: 2,
      name: 'Bike Masters Workshop',
      type: 'bike-specialist',
      services: ['Engine Repair', 'Chain Service', 'Brake Service', 'Oil Change'],
      address: '456 Avinashi Road, Coimbatore',
      phone: '+91 9876543211',
      rating: '4.3',
      openNow: true,
      emergency: true,
      location: 'Coimbatore'
    },
    {
      id: 3,
      name: 'Car Spa & Service',
      type: 'car-specialist',
      services: ['Car Wash', 'Denting Painting', 'Full Service', 'Wheel Alignment'],
      address: '789 Madurai Bypass, Madurai',
      phone: '+91 9876543212',
      rating: '4.7',
      openNow: false,
      emergency: false,
      location: 'Madurai'
    },
    {
      id: 4,
      name: '24x7 Emergency Repair',
      type: 'emergency',
      services: ['Towing Service', 'Flat Tyre', 'Jump Start', 'Lockout Service'],
      address: '321 Trichy Road, Salem',
      phone: '+91 9876543213',
      rating: '4.8',
      openNow: true,
      emergency: true,
      location: 'Salem'
    }
  ]

  // Taxi services
  const taxiServices = [
    {
      id: 1,
      name: 'Quick Cabs',
      type: 'local',
      vehicles: ['Sedan', 'SUV', 'Hatchback'],
      baseFare: '₹50',
      perKm: '₹15',
      bookingFee: '₹20',
      phone: '+91 9876543220',
      appAvailable: true,
      rating: '4.4',
      location: 'Chennai'
    },
    {
      id: 2,
      name: 'City Ride Taxis',
      type: 'outstation',
      vehicles: ['Innova', 'Sedan', 'Luxury'],
      baseFare: '₹100',
      perKm: '₹18',
      bookingFee: '₹30',
      phone: '+91 9876543221',
      appAvailable: true,
      rating: '4.6',
      location: 'Coimbatore'
    },
    {
      id: 3,
      name: 'Budget Travels',
      type: 'budget',
      vehicles: ['Hatchback', 'Compact Sedan'],
      baseFare: '₹40',
      perKm: '₹12',
      bookingFee: '₹15',
      phone: '+91 9876543222',
      appAvailable: false,
      rating: '4.2',
      location: 'Madurai'
    },
    {
      id: 4,
      name: 'Luxury Rides',
      type: 'premium',
      vehicles: ['Mercedes', 'BMW', 'Audi'],
      baseFare: '₹200',
      perKm: '₹25',
      bookingFee: '₹50',
      phone: '+91 9876543223',
      appAvailable: true,
      rating: '4.9',
      location: 'Chennai'
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
    // Filter vehicles based on search criteria
    const filteredVehicles = sampleVehicles.filter(vehicle => {
      const matchesType = !formData.vehicleType || vehicle.type === formData.vehicleType
      const matchesLocation = !formData.location || vehicle.location === formData.location
      return matchesType && matchesLocation
    })
    setSearchResults(filteredVehicles)
    setSelectedVehicle(null)
    setActiveTab('rental')
  }

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(selectedVehicle?.name === vehicle.name ? null : vehicle)
  }

  const getVehicleTypeColor = (type) => {
    const colors = {
      car: 'var(--sky-blue)',
      bike: 'var(--warm-orange)',
      scooter: 'var(--forest-green)'
    }
    return colors[type] || 'var(--deep-blue)'
  }

  const filteredWorkshops = workshops.filter(workshop => 
    !formData.location || workshop.location === formData.location
  )

  const filteredTaxis = taxiServices.filter(taxi => 
    !formData.location || taxi.location === formData.location
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
            Car & Bike Services
          </h1>

          {/* Search Form */}
          <div className="card" style={{ maxWidth: '900px', margin: '0 auto 3rem auto' }}>
            <form onSubmit={handleSearch}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr auto',
                gap: '1rem',
                alignItems: 'end'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: 'var(--deep-blue)'
                  }}>
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
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
                    <option value="">All Vehicles</option>
                    {vehicleTypes.map(vehicle => (
                      <option key={vehicle.value} value={vehicle.value}>
                        {vehicle.icon} {vehicle.label}
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
                    Location
                  </label>
                  <select
                    name="location"
                    value={formData.location}
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
                    <option value="">All Locations</option>
                    {tamilnaduCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                  style={{
                    padding: '12px 24px',
                    fontSize: '1rem',
                    height: 'fit-content',
                    backgroundColor: 'var(--golden-yellow)',
                    color: 'var(--deep-blue)'
                  }}
                >
                  Search
                </motion.button>
              </div>
            </form>
          {/* Reset Search Button */}
  {(formData.vehicleType || formData.location) && (
    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setFormData({
            vehicleType: '',
            location: '',
            pickupDate: '',
            returnDate: ''
          })
          setSearchResults([])
          setSelectedVehicle(null)
          setActiveTab('rental')
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

          {/* Tab Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2rem',
            borderBottom: '2px solid var(--soft-gray)'
          }}>
            <div style={{ display: 'flex', gap: '0' }}>
              {[
                { id: 'rental', label: '🚗 Vehicle Rental', count: searchResults.length },
                { id: 'workshops', label: '🔧 Workshops', count: filteredWorkshops.length },
                { id: 'taxi', label: '🚕 Taxi Services', count: filteredTaxis.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '1rem 2rem',
                    border: 'none',
                    background: activeTab === tab.id ? 'var(--golden-yellow)' : 'transparent',
                    color: activeTab === tab.id ? 'var(--deep-blue)' : 'var(--deep-blue)',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    borderBottom: activeTab === tab.id ? '3px solid var(--golden-yellow)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Rental Vehicles Tab */}
          <AnimatePresence>
            {activeTab === 'rental' && searchResults.length > 0 && (
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
                  Available Vehicles ({searchResults.length})
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  {searchResults.map((vehicle) => (
                    <motion.div
                      key={vehicle.name}
                      whileHover={{ scale: 1.02 }}
                      className="card"
                      style={{
                        cursor: 'pointer',
                        borderLeft: `4px solid ${getVehicleTypeColor(vehicle.type)}`,
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handleVehicleSelect(vehicle)}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '2.5rem' }}>{vehicle.image}</span>
                          <div>
                            <h3 style={{ color: 'var(--deep-blue)', margin: '0 0 0.25rem 0' }}>
                              {vehicle.name}
                            </h3>
                            <p style={{ 
                              color: 'var(--deep-blue)', 
                              opacity: 0.7, 
                              margin: 0,
                              fontSize: '0.9rem'
                            }}>
                              {vehicle.brand} • {vehicle.location}
                            </p>
                          </div>
                        </div>
                        <span style={{ 
                          color: 'var(--success-green)', 
                          fontWeight: 'bold',
                          fontSize: '1.2rem'
                        }}>
                          {vehicle.price}
                        </span>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <p style={{ 
                          color: 'var(--deep-blue)', 
                          opacity: 0.8,
                          marginBottom: '0.5rem'
                        }}>
                          {vehicle.fuel} • {vehicle.transmission} • {vehicle.seats} seats
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {vehicle.features.map((feature, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: 'var(--soft-gray)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: 'var(--deep-blue)'
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary"
                        style={{
                          width: '100%',
                          padding: '10px',
                          fontSize: '1rem'
                        }}
                      >
                        Book Now
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Workshops Tab */}
          <AnimatePresence>
            {activeTab === 'workshops' && (
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
                  🛠️ Workshops & Service Centers ({filteredWorkshops.length})
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  {filteredWorkshops.map((workshop) => (
                    <motion.div
                      key={workshop.id}
                      whileHover={{ scale: 1.02 }}
                      className="card"
                      style={{
                        borderLeft: `4px solid ${workshop.emergency ? 'var(--error-red)' : 'var(--forest-green)'}`
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <h3 style={{ color: 'var(--deep-blue)', margin: '0 0 0.5rem 0' }}>
                            {workshop.name}
                            {workshop.emergency && (
                              <span style={{
                                marginLeft: '0.5rem',
                                fontSize: '0.7rem',
                                background: 'var(--error-red)',
                                color: 'white',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '12px'
                              }}>
                                🚨 24/7 Emergency
                              </span>
                            )}
                          </h3>
                          <p style={{ 
                            color: 'var(--deep-blue)', 
                            opacity: 0.7, 
                            margin: '0 0 0.5rem 0',
                            fontSize: '0.9rem'
                          }}>
                            📍 {workshop.address}
                          </p>
                          <p style={{ 
                            color: 'var(--deep-blue)', 
                            opacity: 0.7, 
                            margin: 0,
                            fontSize: '0.9rem'
                          }}>
                            📞 {workshop.phone}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            color: 'var(--success-green)', 
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            marginBottom: '0.25rem'
                          }}>
                            ⭐ {workshop.rating}
                          </div>
                          <div style={{ 
                            color: workshop.openNow ? 'var(--success-green)' : 'var(--error-red)',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {workshop.openNow ? '🟢 Open Now' : '🔴 Closed'}
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ 
                          color: 'var(--deep-blue)', 
                          marginBottom: '0.5rem', 
                          display: 'block'
                        }}>
                          Services Offered:
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {workshop.services.map((service, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: 'var(--soft-gray)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: 'var(--deep-blue)'
                              }}
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '0.9rem',
                            backgroundColor: 'var(--forest-green)'
                          }}
                        >
                          📞 Call Now
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '0.9rem',
                            backgroundColor: 'var(--sky-blue)'
                          }}
                        >
                          📍 Get Directions
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Taxi Services Tab */}
          <AnimatePresence>
            {activeTab === 'taxi' && (
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
                  🚕 Taxi & Cab Services ({filteredTaxis.length})
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  {filteredTaxis.map((taxi) => (
                    <motion.div
                      key={taxi.id}
                      whileHover={{ scale: 1.02 }}
                      className="card"
                      style={{
                        borderLeft: `4px solid ${
                          taxi.type === 'premium' ? 'var(--golden-yellow)' : 
                          taxi.type === 'budget' ? 'var(--forest-green)' : 'var(--sky-blue)'
                        }`
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <h3 style={{ color: 'var(--deep-blue)', margin: '0 0 0.5rem 0' }}>
                            {taxi.name}
                            {taxi.appAvailable && (
                              <span style={{
                                marginLeft: '0.5rem',
                                fontSize: '0.7rem',
                                background: 'var(--success-green)',
                                color: 'white',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '12px'
                              }}>
                                📱 App Available
                              </span>
                            )}
                          </h3>
                          <p style={{ 
                            color: 'var(--deep-blue)', 
                            opacity: 0.7, 
                            margin: 0,
                            fontSize: '0.9rem'
                          }}>
                            📞 {taxi.phone}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            color: 'var(--success-green)', 
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            marginBottom: '0.25rem'
                          }}>
                            ⭐ {taxi.rating}
                          </div>
                          <div style={{ 
                            color: 'var(--deep-blue)',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            textTransform: 'capitalize'
                          }}>
                            {taxi.type}
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ 
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '0.5rem',
                          marginBottom: '1rem'
                        }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--deep-blue)', opacity: 0.7 }}>Base Fare</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--deep-blue)' }}>{taxi.baseFare}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--deep-blue)', opacity: 0.7 }}>Per Km</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--deep-blue)' }}>{taxi.perKm}</div>
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--deep-blue)', opacity: 0.7 }}>Booking Fee</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--deep-blue)' }}>{taxi.bookingFee}</div>
                          </div>
                        </div>

                        <strong style={{ 
                          color: 'var(--deep-blue)', 
                          marginBottom: '0.5rem', 
                          display: 'block'
                        }}>
                          Available Vehicles:
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {taxi.vehicles.map((vehicle, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: 'var(--soft-gray)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                color: 'var(--deep-blue)'
                              }}
                            >
                              {vehicle}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-primary"
                          style={{
                            flex: 1,
                            padding: '10px',
                            fontSize: '0.9rem',
                            backgroundColor: 'var(--warm-orange)'
                          }}
                        >
                          📞 Call to Book
                        </motion.button>
                        {taxi.appAvailable && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary"
                            style={{
                              flex: 1,
                              padding: '10px',
                              fontSize: '0.9rem'
                            }}
                          >
                            📱 Book via App
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results Message */}
          {searchResults.length === 0 && activeTab === 'rental' && formData.location && (
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
                No vehicles found in {formData.location}
              </p>
            </motion.div>
          )}

          {/* Initial State */}
          {searchResults.length === 0 && !formData.location && activeTab === 'rental' && (
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
                Select a location to explore services
              </h2>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CarBikeDashboard