package com.payanam.repository;

import com.payanam.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
    // Find buses by route
    List<Bus> findByFromLocationAndToLocationAndIsActiveTrue(String fromLocation, String toLocation);
    
    // Find buses by operator
    List<Bus> findByOperatorAndIsActiveTrue(String operator);
    
    // Find buses by type
    List<Bus> findByBusTypeAndIsActiveTrue(String busType);
    
    // Find buses by service type
    List<Bus> findByServiceTypeAndIsActiveTrue(String serviceType);
    
    // Find buses by depot
    List<Bus> findByDepotNameAndIsActiveTrue(String depotName);
    
    // Custom query for search with type filter
    @Query("SELECT b FROM Bus b WHERE b.fromLocation = :from AND b.toLocation = :to " +
           "AND (:busType IS NULL OR b.busType = :busType) AND b.isActive = true")
    List<Bus> findBusesByRouteAndType(@Param("from") String from, 
                                     @Param("to") String to, 
                                     @Param("busType") String busType);
    
    // NEW: Search buses with intermediate stops
    @Query("SELECT DISTINCT b FROM Bus b LEFT JOIN b.intermediateStops s WHERE " +
           "(b.fromLocation = :from AND b.toLocation = :to) OR " +
           "(b.fromLocation = :from AND s.stopName = :to) OR " +
           "(s.stopName = :from AND b.toLocation = :to) OR " +
           "(s.stopName = :from AND s.stopName = :to) " +
           "AND b.isActive = true")
    List<Bus> findBusesWithStops(@Param("from") String from, @Param("to") String to);
    
    // NEW: Find by bus number
    Bus findByBusNumber(String busNumber);

    Bus findByBusNumberAndFromLocationAndToLocation(String busNumber, String fromLocation, String toLocation);
    
    // NEW: Find active buses
    List<Bus> findByIsActiveTrue();
    
    // NEW: Search buses containing location names (fuzzy search)
    @Query("SELECT b FROM Bus b WHERE " +
           "(LOWER(b.fromLocation) LIKE LOWER(CONCAT('%', :location, '%')) OR " +
           "LOWER(b.toLocation) LIKE LOWER(CONCAT('%', :location, '%'))) AND b.isActive = true")
    List<Bus> findBusesByLocationContaining(@Param("location") String location);
    
    // NEW: Get all unique from locations
    @Query("SELECT DISTINCT b.fromLocation FROM Bus b WHERE b.isActive = true ORDER BY b.fromLocation")
    List<String> findDistinctFromLocations();
    
    // NEW: Get all unique to locations
    @Query("SELECT DISTINCT b.toLocation FROM Bus b WHERE b.isActive = true ORDER BY b.toLocation")
    List<String> findDistinctToLocations();
    
    // NEW: Get popular routes (most buses)
    @Query("SELECT b.fromLocation, b.toLocation, COUNT(b) as routeCount FROM Bus b " +
           "WHERE b.isActive = true GROUP BY b.fromLocation, b.toLocation ORDER BY routeCount DESC")
    List<Object[]> findPopularRoutes();
}