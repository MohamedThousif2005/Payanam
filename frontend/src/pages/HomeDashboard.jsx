import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const HomeDashboard = () => {
  const transportCards = [
    {
      title: 'Bus',
      description: 'Explore Tamil Nadu by tracking and traveling on buses',
      path: '/bus',
      color: 'var(--sky-blue)',
      icon: '🚌'
    },
    {
      title: 'Train',
      description: 'Track trains between Tamil Nadu and various destinations',
      path: '/train',
      color: 'var(--forest-green)',
      icon: '🚆'
    },
    {
      title: 'Flight',
      description: 'Find the best global flight deals connecting Tamil Nadu',
      path: '/flight',
      color: 'var(--warm-orange)',
      icon: '✈️'
    },
    {
      title: 'Car & Bike',
      description: 'Rent cars and bikes anytime, anywhere for your journey',
      path: '/car-bike',
      color: 'var(--golden-yellow)',
      icon: '🚗'
    },
    {
      title: 'Explore',
      description: 'Discover amazing places across Tamil Nadu',
      path: '/explore',
      color: 'var(--error-red)',
      icon: '🗺️'
    }
  ]

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <motion.img
            src="/favicon.png"
            alt="Payanam Logo Large"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: '180px',
              height: '180px',
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
            }}
          />
          <h1 style={{ 
            fontSize: '3.5rem', 
            color: 'var(--deep-blue)',
            marginBottom: '1rem',
            fontWeight: '800',
            background: 'linear-gradient(45deg, var(--deep-blue), var(--sky-blue))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome to PAYANAM
          </h1>
          <p style={{ 
            fontSize: '1.4rem', 
            color: 'var(--deep-blue)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Your trusted travel companion across Tamil Nadu and beyond
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {transportCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={card.path} style={{ textDecoration: 'none' }}>
                <div className="card" style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: `linear-gradient(135deg, ${card.color}20, ${card.color}40)`,
                  border: `2px solid ${card.color}30`
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem'
                  }}>
                    {card.icon}
                  </div>
                  <h3 style={{
                    color: 'var(--deep-blue)',
                    marginBottom: '1rem',
                    fontSize: '1.5rem'
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    color: 'var(--deep-blue)',
                    opacity: 0.8,
                    lineHeight: '1.5'
                  }}>
                    {card.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeDashboard