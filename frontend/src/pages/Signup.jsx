import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/api'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await authService.signup(formData)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data || 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card" 
        style={{ 
          maxWidth: '420px', 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem 2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/favicon.png" alt="Payanam Logo" style={{ width: '60px', height: '60px', marginBottom: '1rem' }} />
          <h2 style={{ 
            color: 'var(--deep-blue)', 
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: '700'
          }}>
            Create Account
          </h2>
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.95rem' }}>
            Join Payanam for the best travel experience
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              background: '#FEE2E2', 
              color: 'var(--error-red)', 
              padding: '10px 15px', 
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--deep-blue)', fontSize: '0.9rem' }}>Full Name</label>
            <input 
              type="text" 
              value={formData.fullName} 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              placeholder="Enter your full name"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '2px solid #E2E8F0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--sky-blue)'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              required 
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--deep-blue)', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '2px solid #E2E8F0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--sky-blue)'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              required 
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--deep-blue)', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Create a strong password"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '10px',
                border: '2px solid #E2E8F0',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--sky-blue)'}
              onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              required 
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="btn" 
            style={{ 
              width: '100%',
              padding: '14px',
              fontSize: '1.1rem',
              fontWeight: '600',
              background: 'linear-gradient(to right, var(--deep-blue), var(--sky-blue))',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)'
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign Up Securely'}
          </motion.button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0' }}>
          <p style={{ color: '#666', margin: 0, fontSize: '0.95rem' }}>
            Already have an account? {' '}
            <Link to="/login" style={{ color: 'var(--sky-blue)', fontWeight: '600', textDecoration: 'none' }}>
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
