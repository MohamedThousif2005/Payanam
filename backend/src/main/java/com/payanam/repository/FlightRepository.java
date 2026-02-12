package com.payanam.repository;

import com.payanam.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByFromCityAndToCityAndIsActiveTrue(String fromCity, String toCity);
    List<Flight> findByFlightClassAndIsActiveTrue(String flightClass);
    List<Flight> findByIsActiveTrue();
}