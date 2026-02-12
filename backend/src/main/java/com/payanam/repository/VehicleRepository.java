package com.payanam.repository;

import com.payanam.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByVehicleTypeAndLocationAndIsAvailableTrueAndIsActiveTrue(String vehicleType, String location);
    List<Vehicle> findByVehicleTypeAndIsAvailableTrueAndIsActiveTrue(String vehicleType);
    List<Vehicle> findByLocationAndIsAvailableTrueAndIsActiveTrue(String location);
    List<Vehicle> findByIsActiveTrue();
}