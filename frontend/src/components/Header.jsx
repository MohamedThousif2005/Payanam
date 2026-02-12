import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="header"
      style={{
        background: 'var(--deep-blue)',
        padding: '1rem 0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="logo"
            >
              <h1 style={{ 
                color: 'white', 
                fontSize: '2rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                PAYANAM
              </h1>
            </motion.div>
          </Link>
          
          <nav>
            <ul style={{ 
              display: 'flex', 
              listStyle: 'none', 
              gap: '2rem',
              margin: 0
            }}>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      color: location.pathname === item.path ? 'var(--warm-orange)' : 'white',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      transition: 'all 0.3s ease',
                      background: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)'
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== item.path) {
                        e.target.style.background = 'transparent'
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

export default Header