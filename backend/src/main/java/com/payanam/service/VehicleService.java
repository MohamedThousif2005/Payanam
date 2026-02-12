package com.payanam.service;

import com.payanam.entity.Vehicle;
import com.payanam.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VehicleService {
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    public List<Vehicle> searchVehicles(String vehicleType, String location) {
        if (location != null && !location.isEmpty()) {
            return vehicleRepository.findByVehicleTypeAndLocationAndIsAvailableTrueAndIsActiveTrue(vehicleType, location);
        } else {
            return vehicleRepository.findByVehicleTypeAndIsAvailableTrueAndIsActiveTrue(vehicleType);
        }
    }
    
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findByIsActiveTrue();
    }
    
    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }
}