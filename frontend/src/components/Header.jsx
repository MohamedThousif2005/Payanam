import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
  const location = useLocation()

  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.reload()
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/bus', label: 'Bus' },
    { path: '/train', label: 'Train' },
    { path: '/flight', label: 'Flight' },
    { path: '/explore', label: 'Explore' },
    { path: '/car-bike', label: 'Services' }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="header"
      style={{
        background: 'var(--deep-blue)',
        padding: '1rem 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Link to="/" style={{ 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem'
              }}
            >
              <img 
                src="/favicon.png" 
                alt="Payanam Logo" 
                style={{ 
                  width: '45px', 
                  height: '45px',
                  objectFit: 'contain'
                }} 
              />
              <h1 style={{ 
                color: 'white', 
                fontSize: '1.8rem',
                fontWeight: 'bold',
                margin: 0,
                letterSpacing: '1px'
              }}>
                PAYANAM
              </h1>
            </motion.div>
          </Link>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul style={{ 
              display: 'flex', 
              listStyle: 'none', 
              gap: '1.5rem',
              margin: 0,
              padding: 0
            }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      color: location.pathname === item.path ? 'var(--warm-orange)' : 'white',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1rem',
                      padding: '0.5rem 0.8rem',
                      borderRadius: '6px',
                      transition: 'all 0.3s ease',
                      background: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1.5rem' }}>
              {user ? (
                <>
                  <span style={{ color: 'white', fontWeight: '500' }}>Hi, {user.fullName.split(' ')[0]}</span>
                  <button 
                    onClick={handleLogout}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.3)',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
                  <Link 
                    to="/signup" 
                    style={{ 
                      background: 'var(--warm-orange)', 
                      color: 'white', 
                      textDecoration: 'none', 
                      fontWeight: 'bold',
                      padding: '0.5rem 1.2rem',
                      borderRadius: '6px'
                    }}
                  >
                    Join
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Header