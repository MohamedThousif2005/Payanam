import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ExploreDashboard = () => {
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const tamilnaduCities = [
    'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem',
    'Tirunelveli', 'Erode', 'Vellore', 'Thoothukudi', 'Ooty',
    'Kanyakumari', 'Hosur', 'Dindigul', 'Thanjavur', 'Rameswaram',
    'Kodaikanal', 'Yercaud', 'Yelagiri', 'Kumbakonam', 'Chettinad'
  ]

  const categories = [
    { value: 'all', label: 'All Places', icon: '🏛️' },
    { value: 'temple', label: 'Temples', icon: '🛕' },
    { value: 'beach', label: 'Beaches', icon: '🏖️' },
    { value: 'hill', label: 'Hill Stations', icon: '⛰️' },
    { value: 'historical', label: 'Historical', icon: '🏰' },
    { value: 'park', label: 'Parks & Nature', icon: '🌳' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'food', label: 'Food & Dining', icon: '🍽️' }
  ]

  // Places data for each city
  const cityPlaces = {
    'Chennai': [
      {
        id: 1,
        name: 'Marina Beach',
        category: 'beach',
        description: 'Second longest urban beach in the world',
        image: '🏖️',
        rating: '4.5',
        bestTime: '6 AM - 8 PM',
        entryFee: 'Free',
        highlights: ['Sunrise Views', 'Beach Activities', 'Local Food Stalls'],
        mustTry: ['Murukku', 'Bhel Puri', 'Fresh Coconut Water']
      },
      {
        id: 2,
        name: 'Kapaleeshwarar Temple',
        category: 'temple',
        description: 'Ancient Shiva temple with Dravidian architecture',
        image: '🛕',
        rating: '4.7',
        bestTime: '6 AM - 12 PM, 4 PM - 8 PM',
        entryFee: 'Free',
        highlights: ['Dravidian Architecture', 'Prayer Services', 'Cultural Events'],
        mustTry: ['Prasadam', 'Temple Pond View']
      },
      {
        id: 3,
        name: 'Government Museum',
        category: 'historical',
        description: 'Second oldest museum in India with rich collections',
        image: '🏛️',
        rating: '4.2',
        bestTime: '9:30 AM - 5 PM',
        entryFee: '₹20',
        highlights: ['Bronze Gallery', 'Archaeological Section', 'Art Collection'],
        mustTry: ['Guided Tour', 'Photography']
      },
      {
        id: 4,
        name: 'Phoenix MarketCity',
        category: 'shopping',
        description: 'Largest shopping mall in Chennai',
        image: '🛍️',
        rating: '4.4',
        bestTime: '10 AM - 10 PM',
        entryFee: 'Free',
        highlights: ['Branded Stores', 'Food Court', 'Entertainment Zone'],
        mustTry: ['Multi-cuisine Food', 'Movie Experience']
      }
    ],
    'Madurai': [
      {
        id: 1,
        name: 'Meenakshi Amman Temple',
        category: 'temple',
        description: 'Historic Hindu temple dedicated to Meenakshi and Sundareshwarar',
        image: '🛕',
        rating: '4.8',
        bestTime: '5 AM - 12:30 PM, 4 PM - 9:30 PM',
        entryFee: 'Free',
        highlights: ['Gopurams', 'Golden Lotus Tank', 'Evening Ceremony'],
        mustTry: ['Prasadam', 'Temple Art']
      },
      {
        id: 2,
        name: 'Thirumalai Nayakkar Palace',
        category: 'historical',
        description: '17th-century palace built by King Thirumalai Nayak',
        image: '🏰',
        rating: '4.3',
        bestTime: '9 AM - 5 PM',
        entryFee: '₹50',
        highlights: ['Crown Room', 'Dance Hall', 'Light & Sound Show'],
        mustTry: ['Light Show', 'Photography']
      },
      {
        id: 3,
        name: 'Gandhi Memorial Museum',
        category: 'historical',
        description: 'Museum dedicated to Mahatma Gandhi',
        image: '🏛️',
        rating: '4.1',
        bestTime: '10 AM - 1 PM, 2 PM - 5:45 PM',
        entryFee: 'Free',
        highlights: ['Personal Artifacts', 'Freedom Struggle Gallery', 'Library'],
        mustTry: ['Documentary Show', 'Book Store']
      }
    ],
    'Ooty': [
      {
        id: 1,
        name: 'Ooty Lake',
        category: 'park',
        description: 'Artificial lake popular for boating and picnics',
        image: '🚤',
        rating: '4.3',
        bestTime: '9 AM - 6 PM',
        entryFee: '₹20',
        highlights: ['Boating', 'Toy Train', 'Photography'],
        mustTry: ['Boat Ride', 'Local Snacks']
      },
      {
        id: 2,
        name: 'Botanical Gardens',
        category: 'park',
        description: '55-acre garden with diverse plant species',
        image: '🌳',
        rating: '4.6',
        bestTime: '7 AM - 6:30 PM',
        entryFee: '₹30',
        highlights: ['Flower Show', 'Fossil Tree', 'Italian Garden'],
        mustTry: ['Flower Exhibition', 'Nature Walk']
      },
      {
        id: 3,
        name: 'Doddabetta Peak',
        category: 'hill',
        description: 'Highest peak in the Nilgiri Mountains',
        image: '⛰️',
        rating: '4.4',
        bestTime: '8 AM - 5 PM',
        entryFee: '₹25',
        highlights: ['Viewpoint', 'Telescope House', 'Nature Trails'],
        mustTry: ['Mountain View', 'Photography']
      }
    ],
    'Kanyakumari': [
      {
        id: 1,
        name: 'Vivekananda Rock Memorial',
        category: 'historical',
        description: 'Memorial built on rock where Swami Vivekananda meditated',
        image: '🪨',
        rating: '4.7',
        bestTime: '8 AM - 4 PM',
        entryFee: '₹40',
        highlights: ['Meditation Hall', 'Viewpoint', 'Ferry Ride'],
        mustTry: ['Sunrise View', 'Ferry Experience']
      },
      {
        id: 2,
        name: 'Thiruvalluvar Statue',
        category: 'historical',
        description: '133-feet tall stone statue of poet Thiruvalluvar',
        image: '🗿',
        rating: '4.5',
        bestTime: '8 AM - 4 PM',
        entryFee: '₹40',
        highlights: ['Architecture', 'Ocean View', 'Cultural Significance'],
        mustTry: ['Photography', 'Learn about Tamil Literature']
      },
      {
        id: 3,
        name: 'Sunrise Point',
        category: 'beach',
        description: 'Famous spot to witness sunrise and sunset',
        image: '🌅',
        rating: '4.8',
        bestTime: '6 AM - 6 PM',
        entryFee: 'Free',
        highlights: ['Sunrise View', 'Sunset View', 'Beach Walk'],
        mustTry: ['Sunrise Photography', 'Beach Activities']
      }
    ],
    'Coimbatore': [
      {
        id: 1,
        name: 'Marudhamalai Temple',
        category: 'temple',
        description: 'Hill temple dedicated to Lord Murugan',
        image: '🛕',
        rating: '4.6',
        bestTime: '6 AM - 8 PM',
        entryFee: 'Free',
        highlights: ['Hill Location', 'Architecture', 'Spiritual Atmosphere'],
        mustTry: ['Prasadam', 'Hill View']
      },
      {
        id: 2,
        name: 'Black Thunder Water Park',
        category: 'park',
        description: 'One of the largest water theme parks in India',
        image: '💦',
        rating: '4.4',
        bestTime: '10:30 AM - 6 PM',
        entryFee: '₹800-1200',
        highlights: ['Water Rides', 'Wave Pool', 'Adventure Activities'],
        mustTry: ['Water Slides', 'Wave Pool']
      },
      {
        id: 3,
        name: 'G.D. Naidu Museum',
        category: 'historical',
        description: 'Science and technology museum',
        image: '🔬',
        rating: '4.2',
        bestTime: '9:30 AM - 5:30 PM',
        entryFee: '₹50',
        highlights: ['Innovations Gallery', 'Science Exhibits', 'Educational Tours'],
        mustTry: ['Interactive Exhibits', 'Learning Experience']
      }
    ]
  }

  const getCategoryColor = (category) => {
    const colors = {
      temple: 'var(--golden-yellow)',
      beach: 'var(--sky-blue)',
      hill: 'var(--forest-green)',
      historical: 'var(--warm-orange)',
      park: 'var(--success-green)',
      shopping: 'var(--deep-blue)',
      food: 'var(--error-red)',
      all: 'var(--deep-blue)'
    }
    return colors[category] || 'var(--deep-blue)'
  }

  const getCategoryIcon = (category) => {
    const icons = {
      temple: '🛕',
      beach: '🏖️',
      hill: '⛰️',
      historical: '🏰',
      park: '🌳',
      shopping: '🛍️',
      food: '🍽️',
      all: '🏛️'
    }
    return icons[category] || '🏛️'
  }

  const filteredPlaces = selectedCity 
    ? cityPlaces[selectedCity]?.filter(place => 
        selectedCategory === 'all' || place.category === selectedCategory
      ) || []
    : []

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
            Explore Tamil Nadu
          </h1>

          <p style={{
            textAlign: 'center',
            color: 'var(--deep-blue)',
            fontSize: '1.2rem',
            opacity: 0.8,
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto'
          }}>
            Discover amazing places to visit across Tamil Nadu's beautiful cities
          </p>

          {/* City Selection */}
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            <h3 style={{ 
              color: 'var(--deep-blue)',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              🗺️ Select a City to Explore
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {tamilnaduCities.map(city => (
                <motion.button
                  key={city}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCity(city)}
                  style={{
                    padding: '1rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: selectedCity === city ? 'var(--sky-blue)' : 'var(--soft-gray)',
                    color: selectedCity === city ? 'white' : 'var(--deep-blue)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {city}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
              style={{ maxWidth: '1000px', margin: '0 auto 2rem auto' }}
            >
              <h3 style={{ 
                color: 'var(--deep-blue)',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                🎯 Filter by Category
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '0.5rem'
              }}>
                {categories.map(category => (
                  <motion.button
                    key={category.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.value)}
                    style={{
                      padding: '0.75rem',
                      border: 'none',
                      borderRadius: '8px',
                      background: selectedCategory === category.value ? getCategoryColor(category.value) : 'var(--soft-gray)',
                      color: selectedCategory === category.value ? 'white' : 'var(--deep-blue)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                    <span style={{ fontSize: '0.8rem' }}>{category.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Places Grid */}
          <AnimatePresence>
            {selectedCity && filteredPlaces.length > 0 && (
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
                  🎪 Places to Visit in {selectedCity} ({filteredPlaces.length})
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '1200px',
                  margin: '0 auto'
                }}>
                  {filteredPlaces.map((place) => (
                    <motion.div
                      key={place.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="card"
                      style={{
                        borderLeft: `4px solid ${getCategoryColor(place.category)}`
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '2.5rem' }}>{place.image}</span>
                          <div>
                            <h3 style={{ color: 'var(--deep-blue)', margin: '0 0 0.25rem 0' }}>
                              {place.name}
                            </h3>
                            <p style={{ 
                              color: 'var(--deep-blue)', 
                              opacity: 0.7, 
                              margin: 0,
                              fontSize: '0.9rem'
                            }}>
                              {place.description}
                            </p>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            color: 'var(--success-green)', 
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            marginBottom: '0.25rem'
                          }}>
                            ⭐ {place.rating}
                          </div>
                          <div style={{ 
                            color: 'var(--deep-blue)',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {place.entryFee}
                          </div>
                        </div>
                      </div>

                      <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div>
                          <strong style={{ color: 'var(--deep-blue)', fontSize: '0.9rem' }}>
                            🕐 Best Time:
                          </strong>
                          <div style={{ color: 'var(--deep-blue)', fontSize: '0.8rem' }}>
                            {place.bestTime}
                          </div>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--deep-blue)', fontSize: '0.9rem' }}>
                            💰 Entry Fee:
                          </strong>
                          <div style={{ color: 'var(--deep-blue)', fontSize: '0.8rem' }}>
                            {place.entryFee}
                          </div>
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ 
                          color: 'var(--deep-blue)', 
                          marginBottom: '0.5rem', 
                          display: 'block',
                          fontSize: '0.9rem'
                        }}>
                          ✨ Highlights:
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {place.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: 'var(--soft-gray)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '12px',
                                fontSize: '0.7rem',
                                color: 'var(--deep-blue)'
                              }}
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ 
                          color: 'var(--deep-blue)', 
                          marginBottom: '0.5rem', 
                          display: 'block',
                          fontSize: '0.9rem'
                        }}>
                          🍽️ Must Try:
                        </strong>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {place.mustTry.map((item, idx) => (
                            <span
                              key={idx}
                              style={{
                                background: 'var(--warm-orange)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '12px',
                                fontSize: '0.7rem',
                                color: 'white'
                              }}
                            >
                              {item}
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
                            backgroundColor: 'var(--sky-blue)'
                          }}
                        >
                          📍 Get Directions
                        </motion.button>
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
                          ℹ️ More Info
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No City Selected */}
          {!selectedCity && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ textAlign: 'center', marginTop: '3rem' }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
              <h2 style={{ 
                color: 'var(--deep-blue)',
                marginBottom: '1rem'
              }}>
                Select a City to Explore
              </h2>
              <p style={{ 
                color: 'var(--deep-blue)', 
                fontSize: '1.1rem',
                opacity: 0.7,
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Choose from our list of beautiful Tamil Nadu cities to discover amazing places to visit, eat, and experience.
              </p>
            </motion.div>
          )}

          {/* No Places Found */}
          {selectedCity && filteredPlaces.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', marginTop: '3rem' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ 
                color: 'var(--deep-blue)',
                marginBottom: '1rem'
              }}>
                No places found in {selectedCity}
              </h3>
              <p style={{ 
                color: 'var(--deep-blue)', 
                fontSize: '1rem',
                opacity: 0.7
              }}>
                Try selecting a different category or check back later for more places.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ExploreDashboard