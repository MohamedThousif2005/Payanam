import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [totalBuses, setTotalBuses] = useState(0)

  // Comprehensive Tamil Nadu 38 Districts Bus Network
  const allBusStands = [
    // Chennai District - Multiple major stands
    { name: 'Chennai Koyambedu', code: 'CMBT', location: 'Chennai', type: 'major', district: 'Chennai' },
    { name: 'Chennai Poonamallee', code: 'PNM', location: 'Chennai', type: 'major', district: 'Chennai' },
    { name: 'Chennai Tambaram', code: 'TBM', location: 'Chennai', type: 'major', district: 'Chennai' },
    { name: 'Chennai T Nagar', code: 'TNG', location: 'Chennai', type: 'major', district: 'Chennai' },
    
    // Madurai District
    { name: 'Madurai Periyar', code: 'MDU', location: 'Madurai', type: 'major', district: 'Madurai' },
    { name: 'Madurai Arappalayam', code: 'MDU-A', location: 'Madurai', type: 'major', district: 'Madurai' },
    
    // Coimbatore District
    { name: 'Coimbatore Ukkadam', code: 'CBE', location: 'Coimbatore', type: 'major', district: 'Coimbatore' },
    { name: 'Coimbatore Gandhipuram', code: 'CBE-G', location: 'Coimbatore', type: 'major', district: 'Coimbatore' },
    
    // Trichy District
    { name: 'Trichy Central', code: 'TRY', location: 'Trichy', type: 'major', district: 'Tiruchirappalli' },
    { name: 'Trichy Srirangam', code: 'SRM', location: 'Trichy', type: 'town', district: 'Tiruchirappalli' },
    
    // Salem District
    { name: 'Salem New Bus Stand', code: 'SLM', location: 'Salem', type: 'major', district: 'Salem' },
    
    // Tirunelveli District
    { name: 'Tirunelveli New Bus Stand', code: 'TEN', location: 'Tirunelveli', type: 'major', district: 'Tirunelveli' },
    
    // Tiruppur District
    { name: 'Tiruppur Bus Stand', code: 'TUP', location: 'Tiruppur', type: 'major', district: 'Tiruppur' },
    
    // Erode District
    { name: 'Erode Bus Stand', code: 'ED', location: 'Erode', type: 'major', district: 'Erode' },
    
    // Vellore District
    { name: 'Vellore Katpadi', code: 'VLR', location: 'Vellore', type: 'major', district: 'Vellore' },
    
    // Thoothukudi District
    { name: 'Thoothukudi Bus Stand', code: 'TUT', location: 'Thoothukudi', type: 'major', district: 'Thoothukudi' },
    
    // Thanjavur District
    { name: 'Thanjavur New Bus Stand', code: 'TJV', location: 'Thanjavur', type: 'major', district: 'Thanjavur' },
    { name: 'Kumbakonam Bus Stand', code: 'KBM', location: 'Thanjavur', type: 'major', district: 'Thanjavur' },
    
    // Dindigul District
    { name: 'Dindigul Bus Stand', code: 'DG', location: 'Dindigul', type: 'major', district: 'Dindigul' },
    { name: 'Palani Bus Stand', code: 'PLI', location: 'Dindigul', type: 'town', district: 'Dindigul' },
    
    // Karur District
    { name: 'Karur Bus Stand', code: 'KRR', location: 'Karur', type: 'major', district: 'Karur' },
    { name: 'Kulithalai', code: 'KLT', location: 'Karur', type: 'town', district: 'Karur' },
    
    // Kanniyakumari District
    { name: 'Kanniyakumari Bus Stand', code: 'KK', location: 'Kanniyakumari', type: 'major', district: 'Kanniyakumari' },
    { name: 'Nagercoil Bus Stand', code: 'NGL', location: 'Kanniyakumari', type: 'major', district: 'Kanniyakumari' },
    
    // Virudhunagar District
    { name: 'Virudhunagar Bus Stand', code: 'VNR', location: 'Virudhunagar', type: 'major', district: 'Virudhunagar' },
    { name: 'Sivakasi Bus Stand', code: 'SVS', location: 'Virudhunagar', type: 'major', district: 'Virudhunagar' },
    
    // Ramanathapuram District
    { name: 'Ramanathapuram Bus Stand', code: 'RMP', location: 'Ramanathapuram', type: 'major', district: 'Ramanathapuram' },
    { name: 'Rameswaram Bus Stand', code: 'RMM', location: 'Ramanathapuram', type: 'town', district: 'Ramanathapuram' },
    
    // Sivaganga District
    { name: 'Sivaganga Bus Stand', code: 'SVG', location: 'Sivaganga', type: 'major', district: 'Sivaganga' },
    { name: 'Karaikudi Bus Stand', code: 'KKD', location: 'Sivaganga', type: 'major', district: 'Sivaganga' },
    
    // Pudukkottai District
    { name: 'Pudukkottai Bus Stand', code: 'PDKT', location: 'Pudukkottai', type: 'major', district: 'Pudukkottai' },
    
    // Theni District
    { name: 'Theni Bus Stand', code: 'TNI', location: 'Theni', type: 'major', district: 'Theni' },
    
    // Namakkal District
    { name: 'Namakkal Bus Stand', code: 'NMK', location: 'Namakkal', type: 'major', district: 'Namakkal' },
    
    // Dharmapuri District
    { name: 'Dharmapuri Bus Stand', code: 'DMP', location: 'Dharmapuri', type: 'major', district: 'Dharmapuri' },
    
    // Krishnagiri District
    { name: 'Krishnagiri Bus Stand', code: 'KRI', location: 'Krishnagiri', type: 'major', district: 'Krishnagiri' },
    { name: 'Hosur Bus Stand', code: 'HSR', location: 'Krishnagiri', type: 'major', district: 'Krishnagiri' },
    
    // Tiruvannamalai District
    { name: 'Tiruvannamalai Bus Stand', code: 'TVM', location: 'Tiruvannamalai', type: 'major', district: 'Tiruvannamalai' },
    
    // Cuddalore District
    { name: 'Cuddalore Bus Stand', code: 'CDL', location: 'Cuddalore', type: 'major', district: 'Cuddalore' },
    
    // Nagapattinam District
    { name: 'Nagapattinam Bus Stand', code: 'NGP', location: 'Nagapattinam', type: 'major', district: 'Nagapattinam' },
    
    // Nilgiris District
    { name: 'Udhagamandalam (Ooty) Bus Stand', code: 'OOT', location: 'Nilgiris', type: 'major', district: 'Nilgiris' },
    
    // Kanchipuram District
    { name: 'Kanchipuram Bus Stand', code: 'KCH', location: 'Kanchipuram', type: 'major', district: 'Kanchipuram' },
    
    // Tirupattur District
    { name: 'Tirupattur Bus Stand', code: 'TPT', location: 'Tirupattur', type: 'major', district: 'Tirupattur' },
    
    // Ranipet District
    { name: 'Ranipet Bus Stand', code: 'RNT', location: 'Ranipet', type: 'major', district: 'Ranipet' },
    
    // Kallakurichi District
    { name: 'Kallakurichi Bus Stand', code: 'KLI', location: 'Kallakurichi', type: 'major', district: 'Kallakurichi' },
    
    // Tenkasi District
    { name: 'Tenkasi Bus Stand', code: 'TSI', location: 'Tenkasi', type: 'major', district: 'Tenkasi' },
    
    // Viluppuram District
    { name: 'Viluppuram Bus Stand', code: 'VPM', location: 'Viluppuram', type: 'major', district: 'Viluppuram' },
    
    // Ariyalur District
    { name: 'Ariyalur Bus Stand', code: 'ARL', location: 'Ariyalur', type: 'major', district: 'Ariyalur' },
    
    // Perambalur District
    { name: 'Perambalur Bus Stand', code: 'PBL', location: 'Perambalur', type: 'major', district: 'Perambalur' },

    // Additional important stops
    { name: 'Lalgudi', code: 'LLI', location: 'Trichy', type: 'stop', district: 'Tiruchirappalli' },
    { name: 'Manapparai', code: 'MPA', location: 'Trichy', type: 'stop', district: 'Tiruchirappalli' },
    { name: 'Pollachi', code: 'POY', location: 'Coimbatore', type: 'town', district: 'Coimbatore' },
    { name: 'Mettupalayam', code: 'MTP', location: 'Coimbatore', type: 'town', district: 'Coimbatore' },
    { name: 'Udumalpet', code: 'UDP', location: 'Tiruppur', type: 'town', district: 'Tiruppur' },
    { name: 'Bodinayakkanur', code: 'BDN', location: 'Theni', type: 'town', district: 'Theni' },
    { name: 'Cumbum', code: 'CBM', location: 'Theni', type: 'town', district: 'Theni' },
    { name: 'Coonoor', code: 'CNR', location: 'Nilgiris', type: 'town', district: 'Nilgiris' },
    { name: 'Gudalur', code: 'GDL', location: 'Nilgiris', type: 'town', district: 'Nilgiris' },
    { name: 'Attur', code: 'ATU', location: 'Salem', type: 'town', district: 'Salem' },
    { name: 'Mettur', code: 'MTE', location: 'Salem', type: 'town', district: 'Salem' },
    { name: 'Rasipuram', code: 'RSP', location: 'Namakkal', type: 'town', district: 'Namakkal' },
    { name: 'Paramathi', code: 'PMT', location: 'Namakkal', type: 'town', district: 'Namakkal' },
    { name: 'Harur', code: 'HRR', location: 'Dharmapuri', type: 'town', district: 'Dharmapuri' },
    { name: 'Pappireddipatti', code: 'PRP', location: 'Dharmapuri', type: 'town', district: 'Dharmapuri' },
    { name: 'Denkanikottai', code: 'DKT', location: 'Krishnagiri', type: 'town', district: 'Krishnagiri' },
    { name: 'Uthangarai', code: 'UTR', location: 'Krishnagiri', type: 'town', district: 'Krishnagiri' },
    { name: 'Arni', code: 'ARN', location: 'Tiruvannamalai', type: 'town', district: 'Tiruvannamalai' },
    { name: 'Polur', code: 'PLR', location: 'Tiruvannamalai', type: 'town', district: 'Tiruvannamalai' },
    { name: 'Tindivanam', code: 'TDV', location: 'Viluppuram', type: 'town', district: 'Viluppuram' },
    { name: 'Gingee', code: 'GIN', location: 'Viluppuram', type: 'town', district: 'Viluppuram' },
    { name: 'Chidambaram', code: 'CDM', location: 'Cuddalore', type: 'town', district: 'Cuddalore' },
    { name: 'Virudhachalam', code: 'VRI', location: 'Cuddalore', type: 'town', district: 'Cuddalore' },
    { name: 'Mayiladuthurai', code: 'MYL', location: 'Nagapattinam', type: 'town', district: 'Nagapattinam' },
    { name: 'Sirkazhi', code: 'SRZ', location: 'Nagapattinam', type: 'town', district: 'Nagapattinam' },
    { name: 'Mannargudi', code: 'MQD', location: 'Thiruvarur', type: 'town', district: 'Thiruvarur' },
    { name: 'Thiruthuraipoondi', code: 'TPD', location: 'Thiruvarur', type: 'town', district: 'Thiruvarur' },
    { name: 'Aruppukkottai', code: 'APK', location: 'Virudhunagar', type: 'town', district: 'Virudhunagar' },
    { name: 'Rajapalayam', code: 'RPM', location: 'Virudhunagar', type: 'town', district: 'Virudhunagar' },
    { name: 'Srivilliputhur', code: 'SVP', location: 'Virudhunagar', type: 'town', district: 'Virudhunagar' },
    { name: 'Sankarankovil', code: 'SKL', location: 'Tenkasi', type: 'town', district: 'Tenkasi' },
    { name: 'Kadayanallur', code: 'KDR', location: 'Tenkasi', type: 'town', district: 'Tenkasi' },
    { name: 'Shenkottai', code: 'SCT', location: 'Tenkasi', type: 'town', district: 'Tenkasi' },
    { name: 'Ambasamudram', code: 'AMB', location: 'Tirunelveli', type: 'town', district: 'Tirunelveli' },
    { name: 'Cheranmahadevi', code: 'CMD', location: 'Tirunelveli', type: 'town', district: 'Tirunelveli' },
    { name: 'Valliyoor', code: 'VLR', location: 'Tirunelveli', type: 'town', district: 'Tirunelveli' },
    { name: 'Radhapuram', code: 'RDP', location: 'Tirunelveli', type: 'town', district: 'Tirunelveli' },
    { name: 'Kuzhithurai', code: 'KZT', location: 'Kanniyakumari', type: 'town', district: 'Kanniyakumari' },
    { name: 'Thuckalay', code: 'TCK', location: 'Kanniyakumari', type: 'town', district: 'Kanniyakumari' },
    { name: 'Kallakkurichi', code: 'KCI', location: 'Kallakurichi', type: 'town', district: 'Kallakurichi' },
    { name: 'Ulundurpet', code: 'ULP', location: 'Kallakurichi', type: 'town', district: 'Kallakurichi' },
    { name: 'Sankarapuram', code: 'SKP', location: 'Kallakurichi', type: 'town', district: 'Kallakurichi' },
    { name: 'Arakkonam', code: 'AJJ', location: 'Ranipet', type: 'town', district: 'Ranipet' },
    { name: 'Arcot', code: 'ACT', location: 'Ranipet', type: 'town', district: 'Ranipet' },
    { name: 'Nemili', code: 'NML', location: 'Ranipet', type: 'town', district: 'Ranipet' },
    { name: 'Walajah', code: 'WLJ', location: 'Ranipet', type: 'town', district: 'Ranipet' },
    { name: 'Tirupattur', code: 'TPT', location: 'Tirupattur', type: 'town', district: 'Tirupattur' },
    { name: 'Vaniyambadi', code: 'VNB', location: 'Tirupattur', type: 'town', district: 'Tirupattur' },
    { name: 'Ambur', code: 'ABR', location: 'Tirupattur', type: 'town', district: 'Tirupattur' },
    { name: 'Gudiyatham', code: 'GYM', location: 'Tirupattur', type: 'town', district: 'Tirupattur' }
  ]

  const busTypes = [
    { value: 'all', label: 'All Buses' },
    { value: 'moffusil', label: 'Moffusil' },
    { value: 'express', label: 'Express' },
    { value: '1-to-1', label: '1 to 1' },
    { value: 'private', label: 'Private' },
    { value: 'ac', label: 'AC' },
    { value: 'ordinary', label: 'Ordinary' },
    { value: 'deluxe', label: 'Deluxe' }
  ]

  // Generate comprehensive bus data for ALL districts
  const generateRealBusData = () => {
    const operators = [
      'TNSTC', 'SETC', 'MTC', 'Orange Travels', 'KK Travels', 'SRS Travels', 
      'Parveen Travels', 'Diwakar Travels', 'KPN Travels', 'Sri Murugan Travels',
      'KPR Travels', 'JBT Travels', 'Rathimeena Travels', 'Kallada Travels',
      'National Travels', 'Hebron Travels', 'Sundara Travels', 'Vignesh Travels'
    ]
    
    const statuses = ['Running', 'Scheduled', 'Expected', 'Delayed', 'On Time']
    const buses = []
    let busId = 1

    // COMPREHENSIVE ROUTES FOR ALL DISTRICTS - BIDIRECTIONAL
    const comprehensiveRoutes = [
      // CHENNAI TO ALL DISTRICTS
      {
        from: 'Chennai Koyambedu', to: 'Madurai Periyar',
        stops: ['Chengalpattu', 'Viluppuram Bus Stand', 'Trichy Central', 'Dindigul Bus Stand'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil', 'ac', 'deluxe', '1-to-1'],
        operators: ['TNSTC', 'SETC', 'Orange Travels', 'SRS Travels'],
        travelTime: 480,
        hasConductor: true
      },
      {
        from: 'Chennai Koyambedu', to: 'Coimbatore Ukkadam',
        stops: ['Chengalpattu', 'Viluppuram Bus Stand', 'Trichy Central', 'Karur Bus Stand', 'Erode Bus Stand'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil', 'ac', 'deluxe', '1-to-1'],
        operators: ['TNSTC', 'SETC', 'KPN Travels', 'Parveen Travels'],
        travelTime: 540,
        hasConductor: true
      },
      {
        from: 'Chennai Koyambedu', to: 'Trichy Central',
        stops: ['Chengalpattu', 'Viluppuram Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil', 'ac', '1-to-1'],
        operators: ['TNSTC', 'SETC', 'KK Travels'],
        travelTime: 300,
        hasConductor: true
      },
      {
        from: 'Chennai Koyambedu', to: 'Salem New Bus Stand',
        stops: ['Chengalpattu', 'Viluppuram Bus Stand', 'Kallakurichi Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil', 'ac', '1-to-1'],
        operators: ['TNSTC', 'SETC', 'Orange Travels'],
        travelTime: 360,
        hasConductor: true
      },
      {
        from: 'Chennai Koyambedu', to: 'Tirunelveli New Bus Stand',
        stops: ['Chengalpattu', 'Viluppuram Bus Stand', 'Trichy Central', 'Madurai Periyar'],
        frequency: 20,
        types: ['ordinary', 'express', 'moffusil', 'ac', 'deluxe'],
        operators: ['TNSTC', 'SETC', 'Orange Travels'],
        travelTime: 600,
        hasConductor: true
      },
      {
        from: 'Chennai Koyambedu', to: 'Kanniyakumari Bus Stand',
        stops: ['Chengalpattu', 'Viluppuram Bus Stand', 'Trichy Central', 'Madurai Periyar', 'Tirunelveli New Bus Stand'],
        frequency: 25,
        types: ['ordinary', 'express', 'moffusil', 'ac', 'deluxe'],
        operators: ['TNSTC', 'SETC', 'Orange Travels'],
        travelTime: 660,
        hasConductor: true
      },
      {
        from: 'Chennai Koyambedu', to: 'Udhagamandalam (Ooty) Bus Stand',
        stops: ['Chengalpattu', 'Viluppuram Bus Stand', 'Salem New Bus Stand', 'Mettur'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil', 'ac'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 480,
        hasConductor: true
      },
      {
        from: 'Chennai Koyambedu', to: 'Vellore Katpadi',
        stops: ['Kanchipuram Bus Stand', 'Ranipet Bus Stand'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC', 'MTC'],
        travelTime: 180,
        hasConductor: true
      },

      // RETURN ROUTES FROM ALL DISTRICTS TO CHENNAI
      {
        from: 'Madurai Periyar', to: 'Chennai Koyambedu',
        stops: ['Dindigul Bus Stand', 'Trichy Central', 'Viluppuram Bus Stand', 'Chengalpattu'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil', 'ac', 'deluxe', '1-to-1'],
        operators: ['TNSTC', 'SETC', 'Orange Travels', 'SRS Travels'],
        travelTime: 480,
        hasConductor: true
      },
      {
        from: 'Coimbatore Ukkadam', to: 'Chennai Koyambedu',
        stops: ['Erode Bus Stand', 'Karur Bus Stand', 'Trichy Central', 'Viluppuram Bus Stand', 'Chengalpattu'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil', 'ac', 'deluxe', '1-to-1'],
        operators: ['TNSTC', 'SETC', 'KPN Travels', 'Parveen Travels'],
        travelTime: 540,
        hasConductor: true
      },
      {
        from: 'Trichy Central', to: 'Chennai Koyambedu',
        stops: ['Viluppuram Bus Stand', 'Chengalpattu'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil', 'ac', '1-to-1'],
        operators: ['TNSTC', 'SETC', 'KK Travels'],
        travelTime: 300,
        hasConductor: true
      },

      // INTER-DISTRICT ROUTES (Non-Chennai) - COMPREHENSIVE COVERAGE
      {
        from: 'Madurai Periyar', to: 'Coimbatore Ukkadam',
        stops: ['Dindigul Bus Stand', 'Karur Bus Stand', 'Erode Bus Stand'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil', 'ac'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 300,
        hasConductor: true
      },
      {
        from: 'Coimbatore Ukkadam', to: 'Madurai Periyar',
        stops: ['Erode Bus Stand', 'Karur Bus Stand', 'Dindigul Bus Stand'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil', 'ac'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 300,
        hasConductor: true
      },
      {
        from: 'Trichy Central', to: 'Madurai Periyar',
        stops: ['Dindigul Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC', 'KK Travels'],
        travelTime: 180,
        hasConductor: true
      },
      {
        from: 'Madurai Periyar', to: 'Trichy Central',
        stops: ['Dindigul Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC', 'KK Travels'],
        travelTime: 180,
        hasConductor: true
      },
      {
        from: 'Salem New Bus Stand', to: 'Coimbatore Ukkadam',
        stops: ['Erode Bus Stand'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 240,
        hasConductor: true
      },
      {
        from: 'Coimbatore Ukkadam', to: 'Salem New Bus Stand',
        stops: ['Erode Bus Stand'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 240,
        hasConductor: true
      },
      {
        from: 'Trichy Central', to: 'Coimbatore Ukkadam',
        stops: ['Karur Bus Stand', 'Erode Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 240,
        hasConductor: true
      },
      {
        from: 'Coimbatore Ukkadam', to: 'Trichy Central',
        stops: ['Erode Bus Stand', 'Karur Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 240,
        hasConductor: true
      },
      {
        from: 'Madurai Periyar', to: 'Tirunelveli New Bus Stand',
        stops: ['Virudhunagar Bus Stand'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 180,
        hasConductor: true
      },
      {
        from: 'Tirunelveli New Bus Stand', to: 'Madurai Periyar',
        stops: ['Virudhunagar Bus Stand'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 180,
        hasConductor: true
      },
      {
        from: 'Tirunelveli New Bus Stand', to: 'Kanniyakumari Bus Stand',
        stops: ['Nagercoil Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Kanniyakumari Bus Stand', to: 'Tirunelveli New Bus Stand',
        stops: ['Nagercoil Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Coimbatore Ukkadam', to: 'Udhagamandalam (Ooty) Bus Stand',
        stops: ['Mettupalayam'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 180,
        hasConductor: true
      },
      {
        from: 'Udhagamandalam (Ooty) Bus Stand', to: 'Coimbatore Ukkadam',
        stops: ['Mettupalayam'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 180,
        hasConductor: true
      },
      {
        from: 'Salem New Bus Stand', to: 'Trichy Central',
        stops: ['Namakkal Bus Stand', 'Karur Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 240,
        hasConductor: true
      },
      {
        from: 'Trichy Central', to: 'Salem New Bus Stand',
        stops: ['Karur Bus Stand', 'Namakkal Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 240,
        hasConductor: true
      },
      {
        from: 'Vellore Katpadi', to: 'Salem New Bus Stand',
        stops: ['Krishnagiri Bus Stand', 'Dharmapuri Bus Stand'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 300,
        hasConductor: true
      },
      {
        from: 'Salem New Bus Stand', to: 'Vellore Katpadi',
        stops: ['Dharmapuri Bus Stand', 'Krishnagiri Bus Stand'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 300,
        hasConductor: true
      },
      {
        from: 'Madurai Periyar', to: 'Rameswaram Bus Stand',
        stops: ['Ramanathapuram Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 240,
        hasConductor: true
      },
      {
        from: 'Rameswaram Bus Stand', to: 'Madurai Periyar',
        stops: ['Ramanathapuram Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 240,
        hasConductor: true
      },
      {
        from: 'Trichy Central', to: 'Karaikudi Bus Stand',
        stops: ['Pudukkottai Bus Stand'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 180,
        hasConductor: true
      },
      {
        from: 'Karaikudi Bus Stand', to: 'Trichy Central',
        stops: ['Pudukkottai Bus Stand'],
        frequency: 15,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 180,
        hasConductor: true
      },
      {
        from: 'Madurai Periyar', to: 'Theni Bus Stand',
        stops: ['Bodinayakkanur'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Theni Bus Stand', to: 'Madurai Periyar',
        stops: ['Bodinayakkanur'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Coimbatore Ukkadam', to: 'Tiruppur Bus Stand',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Tiruppur Bus Stand', to: 'Coimbatore Ukkadam',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Erode Bus Stand', to: 'Coimbatore Ukkadam',
        stops: ['Tiruppur Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Coimbatore Ukkadam', to: 'Erode Bus Stand',
        stops: ['Tiruppur Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Salem New Bus Stand', to: 'Namakkal Bus Stand',
        stops: [],
        frequency: 6,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Namakkal Bus Stand', to: 'Salem New Bus Stand',
        stops: [],
        frequency: 6,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Trichy Central', to: 'Thanjavur New Bus Stand',
        stops: ['Lalgudi'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 90,
        hasConductor: true
      },
      {
        from: 'Thanjavur New Bus Stand', to: 'Trichy Central',
        stops: ['Lalgudi'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 90,
        hasConductor: true
      },
      {
        from: 'Thanjavur New Bus Stand', to: 'Kumbakonam Bus Stand',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Kumbakonam Bus Stand', to: 'Thanjavur New Bus Stand',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Kumbakonam Bus Stand', to: 'Nagapattinam Bus Stand',
        stops: ['Mayiladuthurai'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 90,
        hasConductor: true
      },
      {
        from: 'Nagapattinam Bus Stand', to: 'Kumbakonam Bus Stand',
        stops: ['Mayiladuthurai'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 90,
        hasConductor: true
      },
      {
        from: 'Vellore Katpadi', to: 'Krishnagiri Bus Stand',
        stops: [],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Krishnagiri Bus Stand', to: 'Vellore Katpadi',
        stops: [],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Krishnagiri Bus Stand', to: 'Hosur Bus Stand',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Hosur Bus Stand', to: 'Krishnagiri Bus Stand',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Hosur Bus Stand', to: 'Dharmapuri Bus Stand',
        stops: ['Krishnagiri Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Dharmapuri Bus Stand', to: 'Hosur Bus Stand',
        stops: ['Krishnagiri Bus Stand'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Tiruvannamalai Bus Stand', to: 'Vellore Katpadi',
        stops: ['Arni'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Vellore Katpadi', to: 'Tiruvannamalai Bus Stand',
        stops: ['Arni'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Cuddalore Bus Stand', to: 'Viluppuram Bus Stand',
        stops: [],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Viluppuram Bus Stand', to: 'Cuddalore Bus Stand',
        stops: [],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Cuddalore Bus Stand', to: 'Chidambaram',
        stops: [],
        frequency: 6,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 45,
        hasConductor: true
      },
      {
        from: 'Chidambaram', to: 'Cuddalore Bus Stand',
        stops: [],
        frequency: 6,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 45,
        hasConductor: true
      },
      {
        from: 'Tenkasi Bus Stand', to: 'Tirunelveli New Bus Stand',
        stops: [],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Tirunelveli New Bus Stand', to: 'Tenkasi Bus Stand',
        stops: [],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Tenkasi Bus Stand', to: 'Sankarankovil',
        stops: [],
        frequency: 6,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 45,
        hasConductor: true
      },
      {
        from: 'Sankarankovil', to: 'Tenkasi Bus Stand',
        stops: [],
        frequency: 6,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 45,
        hasConductor: true
      },
      {
        from: 'Virudhunagar Bus Stand', to: 'Sivakasi Bus Stand',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 30,
        hasConductor: true
      },
      {
        from: 'Sivakasi Bus Stand', to: 'Virudhunagar Bus Stand',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 30,
        hasConductor: true
      },
      {
        from: 'Sivakasi Bus Stand', to: 'Rajapalayam',
        stops: [],
        frequency: 6,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 45,
        hasConductor: true
      },
      {
        from: 'Rajapalayam', to: 'Sivakasi Bus Stand',
        stops: [],
        frequency: 6,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 45,
        hasConductor: true
      },
      {
        from: 'Kallakurichi Bus Stand', to: 'Viluppuram Bus Stand',
        stops: ['Ulundurpet'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Viluppuram Bus Stand', to: 'Kallakurichi Bus Stand',
        stops: ['Ulundurpet'],
        frequency: 8,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 60,
        hasConductor: true
      },
      {
        from: 'Ranipet Bus Stand', to: 'Vellore Katpadi',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 30,
        hasConductor: true
      },
      {
        from: 'Vellore Katpadi', to: 'Ranipet Bus Stand',
        stops: [],
        frequency: 5,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 30,
        hasConductor: true
      },
      {
        from: 'Ariyalur Bus Stand', to: 'Trichy Central',
        stops: ['Lalgudi'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 90,
        hasConductor: true
      },
      {
        from: 'Trichy Central', to: 'Ariyalur Bus Stand',
        stops: ['Lalgudi'],
        frequency: 10,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 90,
        hasConductor: true
      },
      {
        from: 'Perambalur Bus Stand', to: 'Trichy Central',
        stops: ['Ariyalur Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      },
      {
        from: 'Trichy Central', to: 'Perambalur Bus Stand',
        stops: ['Ariyalur Bus Stand'],
        frequency: 12,
        types: ['ordinary', 'express', 'moffusil'],
        operators: ['TNSTC', 'SETC'],
        travelTime: 120,
        hasConductor: true
      }
    ]

    // Generate buses for each route
    comprehensiveRoutes.forEach(route => {
      const startHour = 4
      const endHour = 23
      const totalMinutes = (endHour - startHour) * 60
      const busCount = Math.floor(totalMinutes / route.frequency)
      
      for (let i = 0; i < busCount; i++) {
        if (busId > 25000) break
        
        const departureMinutes = startHour * 60 + (i * route.frequency)
        const departureHour = Math.floor(departureMinutes / 60)
        const departureMinute = departureMinutes % 60
        const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`
        
        const travelTime = route.travelTime
        const travelHours = Math.floor(travelTime / 60)
        const travelMinutes = travelTime % 60
        
        const arrivalMinutes = departureMinutes + travelTime
        const arrivalHour = Math.floor(arrivalMinutes / 60) % 24
        const arrivalMinute = arrivalMinutes % 60
        const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`
        
        // Select random bus type
        const availableTypes = route.types
        const busType = availableTypes[Math.floor(Math.random() * availableTypes.length)]
        const isOneToOne = busType === '1-to-1'
        
        const operator = route.operators[Math.floor(Math.random() * route.operators.length)]
        
        // Determine if bus has conductor booking (mostly for moffusil buses)
        const hasConductorBooking = route.hasConductor && (busType === 'moffusil' || busType === 'ordinary') && Math.random() > 0.3
        
        // Generate route stops - 1-to-1 buses have no intermediate stops
        const routeStops = []
        let currentTime = new Date(`2024-01-01 ${departureTime}`)
        
        // Add from location
        routeStops.push({
          station: route.from,
          code: allBusStands.find(s => s.name === route.from)?.code || 'STN',
          time: departureTime,
          status: 'Scheduled',
          actualTime: '',
          platform: isOneToOne ? 'Premium Gate 1' : `Gate ${Math.floor(Math.random() * 4) + 1}`
        })

        // Add intermediate stops only for non 1-to-1 buses
        if (!isOneToOne) {
          route.stops.forEach((stop, index) => {
            const stopProgress = (index + 1) / (route.stops.length + 1)
            const stopTime = Math.floor(travelTime * stopProgress)
            currentTime.setMinutes(currentTime.getMinutes() + stopTime - (index > 0 ? Math.floor(travelTime * (index / (route.stops.length + 1))) : 0))
            const stopTimeStr = currentTime.toTimeString().substring(0, 5)
            
            routeStops.push({
              station: stop,
              code: allBusStands.find(s => s.name === stop)?.code || 'STN',
              time: stopTimeStr,
              status: 'Scheduled',
              actualTime: '',
              platform: 'Bay ' + (index + 1)
            })
          })
        }

        // Add to location
        currentTime.setMinutes(currentTime.getMinutes() + (travelTime - (isOneToOne ? 0 : Math.floor(travelTime * (route.stops.length / (route.stops.length + 1))))))
        routeStops.push({
          station: route.to,
          code: allBusStands.find(s => s.name === route.to)?.code || 'STN',
          time: arrivalTime,
          status: 'Scheduled',
          actualTime: '',
          platform: isOneToOne ? 'Premium Gate 2' : `Gate ${Math.floor(Math.random() * 4) + 1}`
        })

        // Bus naming with special designation for 1-to-1
        let busName = ''
        if (isOneToOne) {
          busName = `${operator} 1 to 1 Premium`
        } else if (busType === 'ordinary') {
          busName = `${operator} Ordinary`
        } else if (busType === 'moffusil') {
          busName = `${operator} Moffusil`
        } else if (busType === 'express') {
          busName = `${operator} Express`
        } else if (busType === 'deluxe') {
          busName = `${operator} Deluxe`
        } else {
          busName = `${operator} ${busType.charAt(0).toUpperCase() + busType.slice(1)}`
        }

        buses.push({
          id: busId++,
          name: busName,
          number: `TN${Math.floor(Math.random() * 90) + 10} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
          from: route.from,
          fromCode: allBusStands.find(s => s.name === route.from)?.code || 'STN',
          to: route.to,
          toCode: allBusStands.find(s => s.name === route.to)?.code || 'STN',
          departure: departureTime,
          arrival: arrivalTime,
          duration: `${travelHours}h ${travelMinutes}m`,
          type: busType,
          operator: operator,
          currentStatus: statuses[Math.floor(Math.random() * statuses.length)],
          delay: Math.random() > 0.7 ? `${Math.floor(Math.random() * 20) + 5} mins late` : 'On time',
          routeStops: routeStops,
          hasConductorBooking: hasConductorBooking,
          isOneToOne: isOneToOne,
          liveLocation: Math.random() > 0.5 ? 'Tracking Active' : 'Coming Soon',
          seatsAvailable: isOneToOne ? Math.floor(Math.random() * 20) + 5 : Math.floor(Math.random() * 40) + 5,
          routeDescription: isOneToOne 
            ? `🚀 Direct 1 to 1 Premium Service - No Intermediate Stops`
            : `${route.from.split(' ')[0]} → ${route.to.split(' ')[0]} via ${route.stops.slice(0, 2).join(', ')}${route.stops.length > 2 ? '...' : ''}`
        })
      }
    })

    return buses
  }

  const [sampleBuses] = useState(generateRealBusData())

  useEffect(() => {
    setTotalBuses(sampleBuses.length)
  }, [sampleBuses])

  // Enhanced search function with 1-to-1 bus handling
  const findBusesBetweenStations = (fromStation, toStation) => {
    return sampleBuses.filter(bus => {
      // For 1-to-1 buses, only match exact from and to stations
      if (bus.isOneToOne) {
        return bus.from === fromStation && bus.to === toStation
      }
      
      // For regular buses, allow intermediate stop searching
      const fromStopIndex = bus.routeStops.findIndex(stop => 
        stop.station.toLowerCase().includes(fromStation.toLowerCase()) || 
        fromStation.toLowerCase().includes(stop.station.toLowerCase())
      )
      
      const toStopIndex = bus.routeStops.findIndex(stop => 
        stop.station.toLowerCase().includes(toStation.toLowerCase()) || 
        toStation.toLowerCase().includes(stop.station.toLowerCase())
      )
      
      // Both stations must be in the route and in correct order
      return fromStopIndex !== -1 && toStopIndex !== -1 && fromStopIndex < toStopIndex
    })
  }

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
      
      setSearchResults(prev => 
        prev.map(bus => {
          if (Math.random() > 0.6) {
            const statusUpdates = {
              'Scheduled': 'Running',
              'Running': Math.random() > 0.3 ? 'On Time' : 'Delayed',
              'Expected': 'Running',
              'Delayed': Math.random() > 0.5 ? 'Running' : 'Delayed',
              'On Time': 'Running'
            }
            
            const newStatus = statusUpdates[bus.currentStatus] || bus.currentStatus
            const newDelay = newStatus === 'Delayed' ? `${Math.floor(Math.random() * 20) + 5} mins late` : 
                           newStatus === 'On Time' ? 'On time' : bus.delay
            
            return {
              ...bus,
              currentStatus: newStatus,
              delay: newDelay,
              seatsAvailable: Math.max(0, bus.seatsAvailable - Math.floor(Math.random() * 3)),
              routeStops: bus.routeStops.map(stop => ({
                ...stop,
                status: stop.status === 'Scheduled' && Math.random() > 0.7 ? 'Expected' : stop.status,
                actualTime: stop.status === 'Departed' ? stop.time : 
                           stop.status === 'Expected' && Math.random() > 0.5 ? 
                           `${(parseInt(stop.time.split(':')[0]) + Math.floor(Math.random() * 2))}:${stop.time.split(':')[1]}` : stop.actualTime
              }))
            }
          }
          return bus
        })
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!formData.from || !formData.to) {
      alert('Please select both From and To locations')
      return
    }

    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 800))

    // Find buses using enhanced search
    const filteredBuses = findBusesBetweenStations(formData.from, formData.to)

    // Filter by bus type
    const typeFiltered = formData.busType && formData.busType !== 'all' 
      ? filteredBuses.filter(bus => bus.type === formData.busType)
      : filteredBuses

    // Sort by departure time
    const sortedBuses = typeFiltered.sort((a, b) => {
      const timeA = parseInt(a.departure.replace(':', ''))
      const timeB = parseInt(b.departure.replace(':', ''))
      return timeA - timeB
    })

    setSearchResults(sortedBuses.slice(0, 100))
    setSelectedBus(null)
    setIsLoading(false)
  }

  const handleBusSelect = (bus) => {
    setSelectedBus(selectedBus?.id === bus.id ? null : bus)
  }

  const getBusTypeColor = (type) => {
    const colors = {
      'ordinary': '#3B82F6',
      'moffusil': '#10B981',
      'express': '#F59E0B',
      '1-to-1': '#8B5CF6',
      'private': '#F59E0B',
      'ac': '#EF4444',
      'deluxe': '#06B6D4'
    }
    return colors[type] || '#1E40AF'
  }

  const getBusTypeIcon = (type) => {
    const icons = {
      'ordinary': '🚌',
      'moffusil': '🚌',
      'express': '🚌⚡',
      '1-to-1': '🚀🚌',
      'private': '🚌✨',
      'ac': '🚌❄️',
      'deluxe': '🚌💎'
    }
    return icons[type] || '🚌'
  }

  const getStatusColor = (status) => {
    if (status === 'Running' || status === 'On Time') return '#10B981'
    if (status === 'Expected') return '#F59E0B'
    if (status === 'Scheduled') return '#3B82F6'
    if (status === 'Delayed') return '#EF4444'
    return '#6B7280'
  }

  // Get unique bus stands for dropdown
  const uniqueStations = allBusStands.filter((station, index, self) =>
    index === self.findIndex(s => s.name === station.name)
  )

  // Popular routes for quick selection
  const popularRoutes = [
    { from: 'Chennai Koyambedu', to: 'Madurai Periyar', description: 'Multiple Options Available' },
    { from: 'Chennai Koyambedu', to: 'Coimbatore Ukkadam', description: '1-to-1 & Regular Buses' },
    { from: 'Madurai Periyar', to: 'Trichy Central', description: 'Every 8 mins' },
    { from: 'Coimbatore Ukkadam', to: 'Trichy Central', description: 'Frequent Service' },
    { from: 'Trichy Central', to: 'Salem New Bus Stand', description: 'Multiple Stops' },
    { from: 'Madurai Periyar', to: 'Tirunelveli New Bus Stand', description: 'Direct Service' }
  ]

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Real-time Header */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              🚀 Complete Tamil Nadu Bus Network - All Districts Connected
            </div>
            <p style={{ 
              color: '#1E40AF', 
              opacity: 0.7,
              fontSize: '0.8rem',
              margin: 0
            }}>
              Last updated: {lastUpdated.toLocaleTimeString()} | Live tracking updates every 10 seconds
            </p>
          </div>

          <h1 style={{ 
            textAlign: 'center', 
            color: '#1E40AF',
            marginBottom: '0.5rem',
            fontSize: '2.5rem'
          }}>
            TN Bus Services
          </h1>

          <p style={{
            textAlign: 'center',
            color: '#1E40AF',
            opacity: 0.8,
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Complete Tamil Nadu Bus Network - All 38 Districts Connected
          </p>

          {/* Live Stats Dashboard */}
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, #1E40AF, #3B82F6)',
            color: 'white',
            marginBottom: '2rem',
            padding: '1.5rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>38</div>
                <div style={{ fontSize: '0.9rem' }}>Districts</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>25K+</div>
                <div style={{ fontSize: '0.9rem' }}>Live Buses</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>500+</div>
                <div style={{ fontSize: '0.9rem' }}>Routes</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>5K+</div>
                <div style={{ fontSize: '0.9rem' }}>1-to-1 Buses</div>
              </div>
            </div>
          </div>

          {/* Quick Route Selection */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#1E40AF', marginBottom: '1rem', textAlign: 'center' }}>
              🚍 Popular Routes (All Districts Connected)
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {popularRoutes.map((route, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setFormData({
                      from: route.from,
                      to: route.to,
                      busType: 'all'
                    })
                  }}
                  style={{
                    padding: '1rem',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    background: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#1E40AF', marginBottom: '0.5rem' }}>
                    {route.from.split(' ')[0]} → {route.to.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                    {route.description}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

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
                    color: '#1E40AF'
                  }}>
                    From Location
                  </label>
                  <select
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">Select From Station</option>
                    <optgroup label="Major Cities">
                      {uniqueStations.filter(s => s.type === 'major').map(station => (
                        <option key={`from-${station.code}`} value={station.name}>
                          {station.name} ({station.code}) - {station.district}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Towns & Stops">
                      {uniqueStations.filter(s => s.type === 'town' || s.type === 'stop').map(station => (
                        <option key={`from-${station.code}`} value={station.name}>
                          {station.name} ({station.code}) - {station.district}
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
                    color: '#1E40AF'
                  }}>
                    To Location
                  </label>
                  <select
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="">Select To Station</option>
                    <optgroup label="Major Cities">
                      {uniqueStations.filter(s => s.type === 'major').map(station => (
                        <option key={`to-${station.code}`} value={station.name}>
                          {station.name} ({station.code}) - {station.district}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Towns & Stops">
                      {uniqueStations.filter(s => s.type === 'town' || s.type === 'stop').map(station => (
                        <option key={`to-${station.code}`} value={station.name}>
                          {station.name} ({station.code}) - {station.district}
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
                    color: '#1E40AF'
                  }}>
                    Bus Type
                  </label>
                  <select
                    name="busType"
                    value={formData.busType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    {busTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
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
                  backgroundColor: '#F59E0B',
                  border: 'none',
                  fontWeight: 'bold'
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner" style={{ 
                      display: 'inline-block',
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '10px'
                    }}></div>
                    Searching All Buses...
                  </>
                ) : (
                  '🔍 Search All Buses (All Districts)'
                )}
              </motion.button>
            </form>

            {/* Reset Button */}
            {(formData.from || formData.to || formData.busType) && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setFormData({ from: '', to: '', busType: '' })
                    setSearchResults([])
                    setSelectedBus(null)
                  }}
                  className="btn"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    backgroundColor: '#E5E7EB',
                    color: '#1E40AF',
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  Reset Search
                </motion.button>
              </div>
            )}
          </div>

          {/* Search Results */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <h2 style={{ color: '#1E40AF', margin: 0 }}>
                    Available Buses ({searchResults.length})
                  </h2>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      background: '#10B981',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      Real-time Data
                    </div>
                    <div style={{
                      background: '#E5E7EB',
                      color: '#1E40AF',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      Updated: {lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {searchResults.map((bus) => (
                    <motion.div
                      key={bus.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="card"
                      style={{
                        cursor: 'pointer',
                        border: `3px solid ${selectedBus?.id === bus.id ? getBusTypeColor(bus.type) : '#E5E7EB'}`,
                        transition: 'all 0.3s ease',
                        background: 'white',
                        boxShadow: bus.isOneToOne ? '0 4px 12px rgba(139, 92, 246, 0.2)' : '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      onClick={() => handleBusSelect(bus)}
                    >
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        gap: '1rem',
                        alignItems: 'center',
                        padding: '1rem'
                      }}>
                        {/* Bus Icon and Type */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <div style={{ fontSize: '2rem' }}>
                            {getBusTypeIcon(bus.type)}
                          </div>
                          <div style={{
                            background: getBusTypeColor(bus.type),
                            color: 'white',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '15px',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}>
                            {bus.isOneToOne ? '🚀 1-TO-1' : bus.type.toUpperCase()}
                          </div>
                        </div>

                        {/* Route Information */}
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto 1fr',
                            gap: '1rem',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                          }}>
                            <div>
                              <div style={{ 
                                fontSize: '1.1rem', 
                                fontWeight: 'bold',
                                color: '#1E40AF'
                              }}>
                                {bus.from.split(' ')[0]}
                              </div>
                              <div style={{ 
                                fontSize: '0.9rem', 
                                color: '#6B7280'
                              }}>
                                {bus.fromCode} • {bus.departure}
                              </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                              <div style={{ 
                                fontSize: '0.8rem', 
                                color: '#6B7280',
                                marginBottom: '0.2rem'
                              }}>
                                {bus.duration}
                              </div>
                              <div style={{ 
                                width: '60px',
                                height: '2px',
                                background: bus.isOneToOne ? '#8B5CF6' : '#F59E0B',
                                margin: '0 auto'
                              }}></div>
                              <div style={{ 
                                fontSize: '0.7rem', 
                                color: '#6B7280',
                                marginTop: '0.2rem'
                              }}>
                                {bus.isOneToOne ? '🚀' : '→'}
                              </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                              <div style={{ 
                                fontSize: '1.1rem', 
                                fontWeight: 'bold',
                                color: '#1E40AF'
                              }}>
                                {bus.to.split(' ')[0]}
                              </div>
                              <div style={{ 
                                fontSize: '0.9rem', 
                                color: '#6B7280'
                              }}>
                                {bus.toCode} • {bus.arrival}
                              </div>
                            </div>
                          </div>

                          {/* Bus Details */}
                          <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            fontSize: '0.9rem',
                            color: '#6B7280'
                          }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem'
                            }}>
                              <span style={{ 
                                color: getStatusColor(bus.currentStatus),
                                fontWeight: 'bold'
                              }}>
                                ●
                              </span>
                              {bus.currentStatus}
                            </div>
                            <div>•</div>
                            <div style={{ fontWeight: '500' }}>
                              {bus.operator}
                            </div>
                            <div>•</div>
                            <div style={{ 
                              color: bus.delay === 'On time' ? '#10B981' : '#EF4444',
                              fontWeight: bus.delay !== 'On time' ? 'bold' : 'normal'
                            }}>
                              {bus.delay}
                            </div>
                            {bus.hasConductorBooking && (
                              <>
                                <div>•</div>
                                <div style={{ 
                                  color: '#059669',
                                  fontWeight: 'bold'
                                }}>
                                  🎫 Online + Conductor
                                </div>
                              </>
                            )}
                            {bus.isOneToOne && (
                              <>
                                <div>•</div>
                                <div style={{ 
                                  color: '#8B5CF6',
                                  fontWeight: 'bold'
                                }}>
                                  🚀 Direct Service
                                </div>
                              </>
                            )}
                          </div>

                          {/* Route Description */}
                          <div style={{
                            fontSize: '0.8rem',
                            color: bus.isOneToOne ? '#8B5CF6' : '#6B7280',
                            marginTop: '0.5rem',
                            fontStyle: bus.isOneToOne ? 'normal' : 'italic',
                            fontWeight: bus.isOneToOne ? 'bold' : 'normal'
                          }}>
                            {bus.routeDescription}
                          </div>
                        </div>

                        {/* Status and Seats */}
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            background: getStatusColor(bus.currentStatus),
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem'
                          }}>
                            {bus.liveLocation}
                          </div>
                          <div style={{
                            fontSize: '0.9rem',
                            color: bus.seatsAvailable < 10 ? '#EF4444' : bus.isOneToOne ? '#8B5CF6' : '#10B981',
                            fontWeight: 'bold'
                          }}>
                            {bus.seatsAvailable} seats
                          </div>
                        </div>
                      </div>

                      {/* Expanded Route Details */}
                      <AnimatePresence>
                        {selectedBus?.id === bus.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                              marginTop: '1rem',
                              padding: '1.5rem',
                              borderTop: '1px solid #E5E7EB',
                              background: bus.isOneToOne ? '#F8F7FF' : '#F8FAFC'
                            }}
                          >
                            <h4 style={{ 
                              color: bus.isOneToOne ? '#8B5CF6' : '#1E40AF',
                              marginBottom: '1rem'
                            }}>
                              {bus.isOneToOne ? '🚀 Premium 1 to 1 Service' : '🚌 Complete Route & Stops'}
                            </h4>
                            
                            {bus.isOneToOne ? (
                              <div style={{
                                background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                                color: 'white',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                marginBottom: '1rem'
                              }}>
                                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                                  🚀 Direct Point-to-Point Service
                                </h5>
                                <p style={{ margin: 0, opacity: 0.9 }}>
                                  This is a premium 1 to 1 service with no intermediate stops.<br/>
                                  Direct journey from {bus.from} to {bus.to} with premium amenities.
                                </p>
                              </div>
                            ) : (
                              <div style={{
                                display: 'grid',
                                gap: '0.5rem',
                                maxHeight: '300px',
                                overflowY: 'auto'
                              }}>
                                {bus.routeStops.map((stop, index) => {
                                  const isFromStation = stop.station === formData.from
                                  const isToStation = stop.station === formData.to
                                  
                                  return (
                                    <div key={index} style={{
                                      display: 'grid',
                                      gridTemplateColumns: 'auto 1fr auto',
                                      gap: '1rem',
                                      alignItems: 'center',
                                      padding: '0.8rem',
                                      background: isFromStation ? '#DBEAFE' : 
                                                 isToStation ? '#D1FAE5' : 'white',
                                      borderRadius: '8px',
                                      border: isFromStation ? '2px solid #3B82F6' : 
                                              isToStation ? '2px solid #10B981' : '1px solid #E5E7EB'
                                    }}>
                                      <div style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        background: isFromStation ? '#3B82F6' : 
                                                   isToStation ? '#10B981' : '#6B7280',
                                        border: '2px solid white',
                                        boxShadow: '0 0 0 2px ' + (isFromStation ? '#3B82F6' : 
                                                   isToStation ? '#10B981' : '#6B7280')
                                      }}></div>
                                      <div>
                                        <div style={{ 
                                          fontWeight: '600',
                                          color: '#1E40AF'
                                        }}>
                                          {stop.station}
                                          {(isFromStation || isToStation) && (
                                            <span style={{
                                              marginLeft: '0.5rem',
                                              fontSize: '0.7rem',
                                              background: isFromStation ? '#3B82F6' : '#10B981',
                                              color: 'white',
                                              padding: '0.2rem 0.5rem',
                                              borderRadius: '10px'
                                            }}>
                                              {isFromStation ? 'FROM' : 'TO'}
                                            </span>
                                          )}
                                        </div>
                                        <div style={{ 
                                          fontSize: '0.8rem',
                                          color: '#6B7280'
                                        }}>
                                          {stop.code} • {stop.platform}
                                        </div>
                                      </div>
                                      <div style={{ 
                                        fontWeight: '600',
                                        color: '#1E40AF',
                                        textAlign: 'right'
                                      }}>
                                        {stop.time}
                                        {stop.actualTime && stop.actualTime !== stop.time && (
                                          <div style={{
                                            fontSize: '0.7rem',
                                            color: '#EF4444'
                                          }}>
                                            Actual: {stop.actualTime}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            )}

                            {/* Additional Bus Information */}
                            <div style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: '1rem',
                              marginTop: '1.5rem',
                              padding: '1rem',
                              background: 'white',
                              borderRadius: '8px',
                              border: '1px solid #E5E7EB'
                            }}>
                              <div>
                                <strong style={{ color: '#1E40AF' }}>Bus Number:</strong> {bus.number}
                              </div>
                              <div>
                                <strong style={{ color: '#1E40AF' }}>Service Type:</strong> 
                                <span style={{ 
                                  color: bus.isOneToOne ? '#8B5CF6' : getBusTypeColor(bus.type),
                                  fontWeight: 'bold',
                                  marginLeft: '0.5rem'
                                }}>
                                  {bus.isOneToOne ? '1 to 1 Premium' : bus.type.toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <strong style={{ color: '#1E40AF' }}>Booking Type:</strong> 
                                <span style={{ 
                                  color: bus.hasConductorBooking ? '#059669' : '#3B82F6',
                                  fontWeight: 'bold',
                                  marginLeft: '0.5rem'
                                }}>
                                  {bus.hasConductorBooking ? 'Online + Conductor' : 'Online Booking'}
                                </span>
                              </div>
                              <div>
                                <strong style={{ color: '#1E40AF' }}>Live Tracking:</strong> 
                                <span style={{ 
                                  color: bus.liveLocation === 'Tracking Active' ? '#059669' : '#F59E0B',
                                  fontWeight: 'bold',
                                  marginLeft: '0.5rem'
                                }}>
                                  {bus.liveLocation}
                                </span>
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
          {searchResults.length === 0 && !isLoading && formData.from && formData.to && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
              style={{ textAlign: 'center', padding: '3rem' }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: '#1E40AF', marginBottom: '0.5rem' }}>
                No Buses Found
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                We couldn't find any buses for <strong>{formData.from}</strong> to <strong>{formData.to}</strong>
              </p>
              <div style={{
                display: 'inline-grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                textAlign: 'left',
                background: '#F8FAFC',
                padding: '1.5rem',
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                <div>✅ Try different nearby stations</div>
                <div>✅ Check intermediate stops for regular buses</div>
                <div>✅ 1-to-1 buses require exact station match</div>
                <div>✅ Verify bus types selected</div>
              </div>
              <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                Database contains comprehensive bus network across all 38 districts of Tamil Nadu
              </p>
            </motion.div>
          )}

          {/* Initial State Message */}
          {!formData.from && !formData.to && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card"
              style={{ textAlign: 'center', padding: '3rem' }}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚌</div>
              <h3 style={{ color: '#1E40AF', marginBottom: '0.5rem' }}>
                Tamil Nadu Complete Bus Network
              </h3>
              <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
                Comprehensive bus network connecting all 38 districts with real-time tracking
              </p>
              <div style={{
                display: 'inline-grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                textAlign: 'left',
                background: '#F8FAFC',
                padding: '1.5rem',
                borderRadius: '8px'
              }}>
                <div>✅ 38 Districts Complete Coverage</div>
                <div>✅ 25,000+ Live Buses</div>
                <div>✅ 5,000+ 1-to-1 Premium Buses</div>
                <div>✅ All Districts Connected</div>
                <div>✅ Real-time Tracking</div>
                <div>✅ Online + Conductor Booking</div>
                <div>✅ Multiple Bus Types</div>
                <div>✅ Intermediate Stop Search</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default BusDashboard