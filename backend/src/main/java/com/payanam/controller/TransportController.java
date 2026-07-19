package com.payanam.controller;

import com.payanam.dto.SearchRequest;
import com.payanam.entity.*;
import com.payanam.service.*;
import com.payanam.repository.BusRepository; // ADD THIS IMPORT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/api/transport")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class TransportController {
    
    @Autowired
    private BusService busService;
    
    @Autowired
    private BusRepository busRepository;

    @Autowired
    private EnhancedTransportService enhancedTransportService;
    
    // Health check
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "🚀 PAYANAM Backend is running! TNSTC Integration Ready.");
        response.put("port", "8090");
        response.put("database", "PostgreSQL");
        return ResponseEntity.ok(response);
    }

    // Bus endpoints
    @PostMapping("/unified-search")
    public ResponseEntity<?> unifiedSearch(@RequestBody Map<String, String> request) {
        try {
            String from = request.get("from");
            String to = request.get("to");
            String typeStr = request.get("type"); // BUS, TRAIN, FLIGHT
            
            TransportType type = TransportType.valueOf(typeStr.toUpperCase());
            List<Map<String, Object>> results = enhancedTransportService.searchTransport(from, to, type);
            
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/buses")
    public ResponseEntity<List<Bus>> getAllBuses() {
        return ResponseEntity.ok(busService.getAllBuses());
    }
    
    @GetMapping("/buses/depot/{depotName}")
    public ResponseEntity<List<Bus>> getBusesByDepot(@PathVariable String depotName) {
        return ResponseEntity.ok(busService.getBusesByDepot(depotName));
    }
    
    @GetMapping("/buses/service/{serviceType}")
    public ResponseEntity<List<Bus>> getBusesByServiceType(@PathVariable String serviceType) {
        return ResponseEntity.ok(busService.getBusesByServiceType(serviceType));
    }
    
    // Get all available from locations
    @GetMapping("/buses/from-locations")
    public ResponseEntity<List<String>> getAllFromLocations() {
        return ResponseEntity.ok(busService.getAllFromLocations());
    }

    // Get all available to locations  
    @GetMapping("/buses/to-locations")
    public ResponseEntity<List<String>> getAllToLocations() {
        return ResponseEntity.ok(busService.getAllToLocations());
    }

    // Search buses by location (fuzzy search)
    @GetMapping("/buses/search/location/{location}")
    public ResponseEntity<List<Bus>> searchBusesByLocation(@PathVariable String location) {
        return ResponseEntity.ok(busService.searchBusesByLocation(location));
    }

    // Get popular routes
    @GetMapping("/buses/popular-routes")
    public ResponseEntity<List<String>> getPopularRoutes() {
        return ResponseEntity.ok(busService.getPopularRoutes());
    }

    // Get TNSTC depots
    @GetMapping("/buses/depots")
    public ResponseEntity<List<String>> getTNSTCDepots() {
        List<String> depots = Arrays.asList(
            "Chennai", "Madurai", "Coimbatore", "Trichy", "Salem",
            "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul"
        );
        return ResponseEntity.ok(depots);
    }
    
    // Simple locations endpoint for frontend
    @GetMapping("/buses/simple-locations")
    public ResponseEntity<Map<String, Object>> getSimpleLocations() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<String> fromLocations = busService.getAllFromLocations();
            List<String> toLocations = busService.getAllToLocations();
            
            response.put("fromLocations", fromLocations);
            response.put("toLocations", toLocations);
            response.put("status", "success");
            response.put("count", fromLocations.size());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error fetching locations: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    // Simple routes endpoint for frontend
    @GetMapping("/buses/simple-routes")
    public ResponseEntity<Map<String, Object>> getSimpleRoutes() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<String> popularRoutes = busService.getPopularRoutes();
            response.put("popularRoutes", popularRoutes);
            response.put("status", "success");
            response.put("count", popularRoutes.size());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error fetching routes: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    // Simple search endpoint for frontend
    @PostMapping("/buses/simple-search")
    public ResponseEntity<Map<String, Object>> simpleSearch(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        String from = request.get("from");
        String to = request.get("to");
        String busType = request.get("type");
        
        try {
            if (from == null || to == null) {
                response.put("status", "error");
                response.put("message", "From and To locations are required");
                return ResponseEntity.badRequest().body(response);
            }
            
            List<Bus> buses = busService.searchBuses(from, to, busType);
            response.put("buses", buses);
            response.put("status", "success");
            response.put("searchFrom", from);
            response.put("searchTo", to);
            response.put("searchType", busType);
            response.put("count", buses.size());
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error searching buses: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    // Enhanced search with stops
    @PostMapping("/buses/enhanced-search")
    public ResponseEntity<Map<String, Object>> enhancedSearch(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        String from = request.get("from");
        String to = request.get("to");
        String busType = request.get("type");
        String operator = request.get("operator");
        
        try {
            List<Bus> buses = busService.searchBuses(from, to, busType);
            
            // Filter by operator if specified
            if (operator != null && !operator.equals("All Operators")) {
                buses = buses.stream()
                        .filter(bus -> bus.getOperator().equals(operator))
                        .collect(java.util.stream.Collectors.toList());
            }
            
            response.put("buses", buses);
            response.put("status", "success");
            response.put("searchFrom", from);
            response.put("searchTo", to);
            response.put("searchType", busType);
            response.put("operator", operator);
            response.put("count", buses.size());
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error searching buses: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    // Bus tracking endpoint
    @GetMapping("/buses/track/{busNumber}")
    public ResponseEntity<Map<String, Object>> trackBus(@PathVariable String busNumber) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Bus bus = busService.getBusTracking(busNumber);
            if (bus != null) {
                response.put("status", "success");
                response.put("bus", bus);
                response.put("tracking", Map.of(
                    "latitude", bus.getCurrentLatitude(),
                    "longitude", bus.getCurrentLongitude(),
                    "lastUpdated", bus.getLastUpdated()
                ));
            } else {
                response.put("status", "error");
                response.put("message", "Bus not found");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error tracking bus: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    // Get all operators
    @GetMapping("/buses/operators")
    public ResponseEntity<List<String>> getAllOperators() {
        return ResponseEntity.ok(busService.getAllOperators());
    }
    
    // Get bus stops for a specific bus
    @GetMapping("/buses/{busNumber}/stops")
    public ResponseEntity<Map<String, Object>> getBusStops(@PathVariable String busNumber) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Bus bus = busRepository.findByBusNumber(busNumber); // This should work now
            if (bus != null) {
                response.put("status", "success");
                response.put("busNumber", busNumber);
                response.put("stops", bus.getIntermediateStops());
                response.put("route", bus.getFromLocation() + " → " + bus.getToLocation());
            } else {
                response.put("status", "error");
                response.put("message", "Bus not found");
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error fetching stops: " + e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }
    
    // Statistics endpoint
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        try {
            long busCount = busService.getAllBuses().size();
            
            stats.put("buses", busCount);
            stats.put("message", "📊 PAYANAM Statistics");
            stats.put("database", "PostgreSQL");
            
        } catch (Exception e) {
            stats.put("error", "Unable to fetch statistics");
        }
        
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/buses/test-locations")
    public ResponseEntity<Map<String, Object>> testLocations() {
        Map<String, Object> response = new HashMap<>();
        
        List<String> fromLocations = Arrays.asList(
            "Chennai Koyambedu", 
            "Madurai Periyar", 
            "Coimbatore Ukkadam", 
            "Trichy Central",
            "Salem New Bus Stand"
        );
        
        List<String> toLocations = Arrays.asList(
            "Chennai Koyambedu", 
            "Madurai Periyar", 
            "Coimbatore Ukkadam", 
            "Trichy Central",
            "Salem New Bus Stand"
        );
        
        response.put("fromLocations", fromLocations);
        response.put("toLocations", toLocations);
        response.put("status", "success");
        response.put("timestamp", new Date());
        response.put("database", "PostgreSQL");
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/buses/debug")
public ResponseEntity<Map<String, Object>> debugBuses() {
    Map<String, Object> response = new HashMap<>();
    
    try {
        long totalBuses = busRepository.count();
        List<Bus> allBuses = busService.getAllBuses();
        
        response.put("status", "success");
        response.put("totalBusesInDB", totalBuses);
        response.put("activeBuses", allBuses.size());
        response.put("allBuses", allBuses);
        response.put("database", "PostgreSQL");
        
    } catch (Exception e) {
        response.put("status", "error");
        response.put("message", "Debug error: " + e.getMessage());
    }
    
    return ResponseEntity.ok(response);
}
@GetMapping("/debug-db")
public ResponseEntity<Map<String, Object>> debugDatabase() {
    Map<String, Object> response = new HashMap<>();
    
    try {
        // Check if DataSeeder is running
        long totalBuses = busRepository.count();
        List<Bus> allBuses = busRepository.findAll();
        
        response.put("status", "success");
        response.put("totalBusesInDatabase", totalBuses);
        response.put("isDataSeederRunning", totalBuses > 0);
        response.put("allBusCount", allBuses.size());
        
        // List first 5 buses if any exist
        if (!allBuses.isEmpty()) {
            List<Map<String, Object>> busList = new ArrayList<>();
            for (int i = 0; i < Math.min(5, allBuses.size()); i++) {
                Bus bus = allBuses.get(i);
                Map<String, Object> busInfo = new HashMap<>();
                busInfo.put("busNumber", bus.getBusNumber());
                busInfo.put("from", bus.getFromLocation());
                busInfo.put("to", bus.getToLocation());
                busInfo.put("type", bus.getBusType());
                busList.add(busInfo);
            }
            response.put("sampleBuses", busList);
        }
        
    } catch (Exception e) {
        response.put("status", "error");
        response.put("message", "Database error: " + e.getMessage());
    }
    
    return ResponseEntity.ok(response);
}
// Add this to TransportController.java
@GetMapping("/test-db")
public ResponseEntity<Map<String, Object>> testDatabase() {
    Map<String, Object> response = new HashMap<>();
    
    try {
        // Test basic database operations
        long count = busRepository.count();
        boolean canSave = false;
        
        // Try to save a test bus
        Bus testBus = new Bus();
        testBus.setBusNumber("TEST001");
        testBus.setBusName("Test Bus");
        testBus.setBusType("ordinary");
        testBus.setOperator("TNSTC");
        testBus.setFromLocation("Test From");
        testBus.setToLocation("Test To");
        testBus.setDepartureTime(LocalTime.now());
        testBus.setArrivalTime(LocalTime.now().plusHours(2));
        testBus.setFare(100.0);
        testBus.setAvailableSeats(40);
        testBus.setTotalSeats(40);
        testBus.setCurrentStatus("Running");
        testBus.setServiceType("moffusil");
        testBus.setIsActive(true);
        
        Bus savedBus = busRepository.save(testBus);
        canSave = savedBus != null;
        
        // Clean up test data
        if (savedBus != null) {
            busRepository.delete(savedBus);
        }
        
        response.put("status", "success");
        response.put("databaseConnected", true);
        response.put("currentBusCount", count);
        response.put("canSaveToDatabase", canSave);
        response.put("message", "PostgreSQL connection is working");
        
    } catch (Exception e) {
        response.put("status", "error");
        response.put("databaseConnected", false);
        response.put("message", "Database error: " + e.getMessage());
    }
    
    return ResponseEntity.ok(response);
}

// Add these new endpoints to your existing TransportController.java

// Real-time bus tracking with detailed information
@GetMapping("/buses/{busNumber}/real-time-tracking")
public ResponseEntity<Map<String, Object>> getRealTimeTracking(@PathVariable String busNumber) {
    Map<String, Object> response = new HashMap<>();
    
    try {
        Map<String, Object> trackingInfo = busService.getBusTrackingDetails(busNumber);
        
        if (!trackingInfo.isEmpty()) {
            response.put("status", "success");
            response.put("tracking", trackingInfo);
            response.put("timestamp", LocalDateTime.now());
        } else {
            response.put("status", "error");
            response.put("message", "Bus not found or tracking unavailable");
        }
    } catch (Exception e) {
        response.put("status", "error");
        response.put("message", "Error fetching real-time tracking: " + e.getMessage());
    }
    
    return ResponseEntity.ok(response);
}

// Get buses near a location (simulated GPS)
@GetMapping("/buses/near-location")
public ResponseEntity<Map<String, Object>> getBusesNearLocation(
        @RequestParam Double latitude,
        @RequestParam Double longitude,
        @RequestParam(defaultValue = "10") Double radiusKm) {
    
    Map<String, Object> response = new HashMap<>();
    
    try {
        // This would integrate with actual GPS data in production
        // For now, return sample buses near the location
        List<Bus> nearbyBuses = busService.getAllBuses().stream()
                .limit(20) // Limit for demo
                .collect(java.util.stream.Collectors.toList());
        
        response.put("status", "success");
        response.put("buses", nearbyBuses);
        response.put("count", nearbyBuses.size());
        response.put("yourLocation", Map.of("lat", latitude, "lng", longitude));
        
    } catch (Exception e) {
        response.put("status", "error");
        response.put("message", "Error finding nearby buses: " + e.getMessage());
    }
    
    return ResponseEntity.ok(response);
}

// Live bus status dashboard
@GetMapping("/buses/live-dashboard")
public ResponseEntity<Map<String, Object>> getLiveDashboard() {
    Map<String, Object> response = new HashMap<>();
    
    try {
        List<Bus> allBuses = busService.getAllBuses();
        
        long totalBuses = allBuses.size();
        long runningBuses = allBuses.stream().filter(b -> "Running".equals(b.getCurrentStatus())).count();
        long delayedBuses = allBuses.stream().filter(b -> "Delayed".equals(b.getCurrentStatus())).count();
        long scheduledBuses = allBuses.stream().filter(b -> "Scheduled".equals(b.getCurrentStatus())).count();
        
        response.put("status", "success");
        response.put("dashboard", Map.of(
            "totalBuses", totalBuses,
            "runningBuses", runningBuses,
            "delayedBuses", delayedBuses,
            "scheduledBuses", scheduledBuses,
            "onTimePercentage", totalBuses > 0 ? ((double) (totalBuses - delayedBuses) / totalBuses * 100) : 0,
            "lastUpdated", LocalDateTime.now()
        ));
        
    } catch (Exception e) {
        response.put("status", "error");
        response.put("message", "Error generating dashboard: " + e.getMessage());
    }
    
    return ResponseEntity.ok(response);
}

// Search buses with multiple filters
@PostMapping("/buses/advanced-search")
public ResponseEntity<Map<String, Object>> advancedSearch(@RequestBody Map<String, Object> searchRequest) {
    Map<String, Object> response = new HashMap<>();
    
    try {
        String from = (String) searchRequest.get("from");
        String to = (String) searchRequest.get("to");
        String busType = (String) searchRequest.get("busType");
        String operator = (String) searchRequest.get("operator");
        String serviceType = (String) searchRequest.get("serviceType");
        String timeRange = (String) searchRequest.get("timeRange");
        
        List<Bus> buses = busService.searchBuses(from, to, busType);
        
        // Apply additional filters
        if (operator != null && !operator.equals("All Operators")) {
            buses = buses.stream()
                    .filter(bus -> bus.getOperator().equals(operator))
                    .collect(java.util.stream.Collectors.toList());
        }
        
        if (serviceType != null && !serviceType.equals("all")) {
            buses = buses.stream()
                    .filter(bus -> serviceType.equals(bus.getServiceType()))
                    .collect(java.util.stream.Collectors.toList());
        }
        
        // Filter by time range
        if (timeRange != null && !timeRange.equals("all")) {
            buses = filterByTimeRange(buses, timeRange);
        }
        
        response.put("status", "success");
        response.put("buses", buses);
        response.put("filters", searchRequest);
        response.put("count", buses.size());
        
    } catch (Exception e) {
        response.put("status", "error");
        response.put("message", "Error in advanced search: " + e.getMessage());
    }
    
    return ResponseEntity.ok(response);
}

private List<Bus> filterByTimeRange(List<Bus> buses, String timeRange) {
    LocalTime now = LocalTime.now();
    
    return buses.stream().filter(bus -> {
        LocalTime depTime = bus.getDepartureTime();
        switch (timeRange) {
            case "morning": return depTime.isAfter(LocalTime.of(5, 0)) && depTime.isBefore(LocalTime.of(12, 0));
            case "afternoon": return depTime.isAfter(LocalTime.of(12, 0)) && depTime.isBefore(LocalTime.of(17, 0));
            case "evening": return depTime.isAfter(LocalTime.of(17, 0)) && depTime.isBefore(LocalTime.of(22, 0));
            case "night": return depTime.isAfter(LocalTime.of(22, 0)) || depTime.isBefore(LocalTime.of(5, 0));
            default: return true;
        }
    }).collect(java.util.stream.Collectors.toList());
}
}