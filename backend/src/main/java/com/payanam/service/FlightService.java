package com.payanam.service;

import com.payanam.entity.Flight;
import com.payanam.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FlightService {
    
    @Autowired
    private FlightRepository flightRepository;
    
    public List<Flight> searchFlights(String from, String to) {
        return flightRepository.findByFromCityAndToCityAndIsActiveTrue(from, to);
    }
    
    public List<Flight> getAllFlights() {
        return flightRepository.findByIsActiveTrue();
    }
    
    public Flight saveFlight(Flight flight) {
        return flightRepository.save(flight);
    }
}