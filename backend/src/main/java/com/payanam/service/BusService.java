// BusService.java - Updated with real-time data
package com.payanam.service;

import com.payanam.entity.Bus;
import com.payanam.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class BusService {
    
    @Autowired
    private BusRepository busRepository;
    
    // Cache for real-time bus locations
    private final Map<String, BusRealTimeData> realTimeCache = new ConcurrentHashMap<>();
    
    // Real-time data class
    private static class BusRealTimeData {
        Double latitude;
        Double longitude;
        String currentStatus;
        Integer delayMinutes;
        LocalDateTime lastUpdated;
        Integer currentSpeed;
    }
    
    public List<Bus> searchBuses(String from, String to, String busType) {
        try {
            System.out.println("🔍 Searching buses from: " + from + " to: " + to + " type: " + busType);
            
            List<Bus> buses;
            if (busType != null && !busType.isEmpty() && !busType.equals("all")) {
                buses = busRepository.findBusesByRouteAndType(from, to, busType);
            } else {
                buses = busRepository.findByFromLocationAndToLocationAndIsActiveTrue(from, to);
            }
            
            // Enhance with real-time data
            buses.forEach(this::enhanceWithRealTimeData);
            
            System.out.println("✅ Found " + buses.size() + " buses for route: " + from + " → " + to);
            return buses;
            
        } catch (Exception e) {
            System.err.println("❌ Error searching buses: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
    
    public List<Bus> getAllBuses() {
        try {
            List<Bus> buses = busRepository.findByIsActiveTrue();
            buses.forEach(this::enhanceWithRealTimeData);
            return buses;
        } catch (Exception e) {
            System.err.println("Error getting all buses: " + e.getMessage());
            return new ArrayList<>();
        }
    }
    
    // Enhanced search with stops and real-time data
    public List<Bus> enhancedSearch(String from, String to, String busType, String operator) {
        try {
            List<Bus> buses = searchBuses(from, to, busType);
            
            // Filter by operator if specified
            if (operator != null && !operator.equals("All Operators")) {
                buses = buses.stream()
                        .filter(bus -> bus.getOperator().equals(operator))
                        .collect(java.util.stream.Collectors.toList());
            }
            
            // Add real-time tracking data
            buses.forEach(bus -> {
                updateRealTimeTracking(bus);
            });
            
            return buses;
            
        } catch (Exception e) {
            System.err.println("Error in enhanced search: " + e.getMessage());
            return new ArrayList<>();
        }
    }
    
    // Real-time tracking update
    private void updateRealTimeTracking(Bus bus) {
        String busNumber = bus.getBusNumber();
        BusRealTimeData realTimeData = realTimeCache.get(busNumber);
        
        if (realTimeData == null) {
            realTimeData = generateRealTimeData(bus);
            realTimeCache.put(busNumber, realTimeData);
        }
        
        // Update bus with real-time data
        bus.setCurrentLatitude(realTimeData.latitude);
        bus.setCurrentLongitude(realTimeData.longitude);
        bus.setCurrentStatus(realTimeData.currentStatus);
        bus.setDelayMinutes(realTimeData.delayMinutes);
        bus.setLastUpdated(realTimeData.lastUpdated);
    }
    
    private BusRealTimeData generateRealTimeData(Bus bus) {
        BusRealTimeData data = new BusRealTimeData();
        Random random = new Random();
        
        // Generate realistic coordinates based on route
        String from = bus.getFromLocation().toLowerCase();
        String to = bus.getToLocation().toLowerCase();
        
        // Base coordinates for major cities in Tamil Nadu
        Map<String, double[]> cityCoordinates = new HashMap<>();
        cityCoordinates.put("chennai", new double[]{13.0827, 80.2707});
        cityCoordinates.put("madurai", new double[]{9.9252, 78.1198});
        cityCoordinates.put("coimbatore", new double[]{11.0168, 76.9558});
        cityCoordinates.put("trichy", new double[]{10.7905, 78.7047});
        cityCoordinates.put("salem", new double[]{11.6643, 78.1460});
        
        // Find base coordinates
        double[] fromCoords = cityCoordinates.getOrDefault("chennai", new double[]{13.0827, 80.2707});
        double[] toCoords = cityCoordinates.getOrDefault("chennai", new double[]{13.0827, 80.2707});
        
        for (String city : cityCoordinates.keySet()) {
            if (from.contains(city)) fromCoords = cityCoordinates.get(city);
            if (to.contains(city)) toCoords = cityCoordinates.get(city);
        }
        
        // Generate position along route (simulated)
        double progress = random.nextDouble() * 0.8 + 0.1; // 10-90% along route
        data.latitude = fromCoords[0] + (toCoords[0] - fromCoords[0]) * progress + (random.nextDouble() - 0.5) * 0.1;
        data.longitude = fromCoords[1] + (toCoords[1] - fromCoords[1]) * progress + (random.nextDouble() - 0.5) * 0.1;
        
        // Status and delay
        String[] statuses = {"Running", "Delayed", "On Time", "Stopped", "Departed"};
        data.currentStatus = statuses[random.nextInt(statuses.length)];
        data.delayMinutes = data.currentStatus.equals("Delayed") ? 5 + random.nextInt(55) : 0;
        data.lastUpdated = LocalDateTime.now().minusMinutes(random.nextInt(10));
        data.currentSpeed = 40 + random.nextInt(60); // km/h
        
        return data;
    }
    
    private void enhanceWithRealTimeData(Bus bus) {
        updateRealTimeTracking(bus);
        
        // Update available seats randomly (simulating real-time bookings)
        Random random = new Random();
        int currentSeats = bus.getAvailableSeats();
        if (currentSeats > 0 && random.nextDouble() < 0.1) { // 10% chance of seat change
            bus.setAvailableSeats(Math.max(0, currentSeats - random.nextInt(3)));
        }
    }
    
    // Scheduled task to update real-time data every 30 seconds
    @Scheduled(fixedRate = 30000)
    public void updateAllRealTimeData() {
        try {
            List<Bus> activeBuses = busRepository.findByIsActiveTrue();
            for (Bus bus : activeBuses) {
                updateRealTimeTracking(bus);
            }
            System.out.println("🔄 Updated real-time data for " + activeBuses.size() + " buses");
        } catch (Exception e) {
            System.err.println("Error updating real-time data: " + e.getMessage());
        }
    }
    
    // Get bus tracking with detailed real-time information
    public Map<String, Object> getBusTrackingDetails(String busNumber) {
        Map<String, Object> trackingInfo = new HashMap<>();
        
        try {
            Bus bus = busRepository.findByBusNumber(busNumber);
            if (bus != null) {
                updateRealTimeTracking(bus);
                
                trackingInfo.put("bus", bus);
                trackingInfo.put("currentLocation", Map.of(
                    "latitude", bus.getCurrentLatitude(),
                    "longitude", bus.getCurrentLongitude(),
                    "address", getLocationAddress(bus.getCurrentLatitude(), bus.getCurrentLongitude())
                ));
                trackingInfo.put("speed", getRandomSpeed());
                trackingInfo.put("nextStop", getNextStop(bus));
                trackingInfo.put("eta", calculateETA(bus));
                trackingInfo.put("lastUpdated", bus.getLastUpdated());
            }
        } catch (Exception e) {
            System.err.println("Error getting bus tracking: " + e.getMessage());
        }
        
        return trackingInfo;
    }
    
    private String getLocationAddress(Double lat, Double lng) {
        // Simplified address lookup based on coordinates
        if (lat == null || lng == null) return "Location not available";
        
        // This would integrate with Google Maps API in production
        return "Near " + (Math.random() > 0.5 ? "Bus Stop" : "Highway") + ", Tamil Nadu";
    }
    
    private Integer getRandomSpeed() {
        return 40 + new Random().nextInt(60); // 40-100 km/h
    }
    
    private String getNextStop(Bus bus) {
        if (bus.getIntermediateStops() != null && !bus.getIntermediateStops().isEmpty()) {
            return bus.getIntermediateStops().get(0).getStopName();
        }
        return bus.getToLocation();
    }
    
    private String calculateETA(Bus bus) {
        // Simplified ETA calculation
        Random random = new Random();
        int minutes = 30 + random.nextInt(180); // 30min to 3.5 hours
        return LocalTime.now().plusMinutes(minutes).toString().substring(0, 5);
    }
    
    // Existing methods remain the same...
    public List<Bus> getBusesByDepot(String depotName) {
        try {
            List<Bus> buses = busRepository.findByDepotNameAndIsActiveTrue(depotName);
            buses.forEach(this::enhanceWithRealTimeData);
            return buses;
        } catch (Exception e) {
            System.err.println("Error getting buses by depot: " + e.getMessage());
            return new ArrayList<>();
        }
    }
    
    public List<Bus> getBusesByServiceType(String serviceType) {
        try {
            List<Bus> buses = busRepository.findByServiceTypeAndIsActiveTrue(serviceType);
            buses.forEach(this::enhanceWithRealTimeData);
            return buses;
        } catch (Exception e) {
            System.err.println("Error getting buses by service type: " + e.getMessage());
            return new ArrayList<>();
        }
    }
    
    public List<Bus> searchBusesByLocation(String location) {
        try {
            List<Bus> buses = busRepository.findBusesByLocationContaining(location);
            buses.forEach(this::enhanceWithRealTimeData);
            return buses;
        } catch (Exception e) {
            System.err.println("Error searching buses by location: " + e.getMessage());
            return new ArrayList<>();
        }
    }
    
    public List<String> getAllFromLocations() {
        try {
            List<String> locations = busRepository.findDistinctFromLocations();
            if (locations == null || locations.isEmpty()) {
                return getDefaultLocations();
            }
            return locations;
        } catch (Exception e) {
            System.err.println("Error getting from locations: " + e.getMessage());
            return getDefaultLocations();
        }
    }
    
    public List<String> getAllToLocations() {
        try {
            List<String> locations = busRepository.findDistinctToLocations();
            if (locations == null || locations.isEmpty()) {
                return getDefaultLocations();
            }
            return locations;
        } catch (Exception e) {
            System.err.println("Error getting to locations: " + e.getMessage());
            return getDefaultLocations();
        }
    }
    
    public List<String> getPopularRoutes() {
        try {
            List<Object[]> popularRoutes = busRepository.findPopularRoutes();
            if (popularRoutes == null || popularRoutes.isEmpty()) {
                return getDefaultPopularRoutes();
            }
            
            return popularRoutes.stream()
                    .limit(10)
                    .map(route -> {
                        String from = route[0] != null ? route[0].toString() : "Unknown";
                        String to = route[1] != null ? route[1].toString() : "Unknown";
                        Long count = route[2] != null ? (Long) route[2] : 0L;
                        return from + " → " + to + " (" + count + " buses)";
                    })
                    .collect(java.util.stream.Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error getting popular routes: " + e.getMessage());
            return getDefaultPopularRoutes();
        }
    }
    
    public Bus getBusTracking(String busNumber) {
        try {
            Bus bus = busRepository.findByBusNumber(busNumber);
            if (bus != null) {
                updateRealTimeTracking(bus);
                return bus;
            }
            return null;
        } catch (Exception e) {
            System.err.println("Error getting bus tracking: " + e.getMessage());
            return null;
        }
    }
    
    public List<String> getAllOperators() {
        List<String> operators = new ArrayList<>();
        operators.add("All Operators");
        operators.add("TNSTC");
        operators.addAll(privateOperators);
        return operators;
    }
    
    private List<String> getDefaultLocations() {
        return Arrays.asList(
            "Chennai - Koyambedu CMBT", 
            "Madurai - Periyar Bus Stand", 
            "Coimbatore - Ukkadam Bus Stand", 
            "Trichy - Central Bus Stand",
            "Salem - New Bus Stand",
            "Tirunelveli - New Bus Stand",
            "Pudukkottai - Bus Stand",
            "Karaikudi - New Bus Stand"
        );
    }
    
    private List<String> getDefaultPopularRoutes() {
        return Arrays.asList(
            "Chennai - Koyambedu CMBT → Madurai - Periyar Bus Stand (150 buses)",
            "Chennai - Koyambedu CMBT → Coimbatore - Ukkadam Bus Stand (120 buses)",
            "Madurai - Periyar Bus Stand → Chennai - Koyambedu CMBT (150 buses)",
            "Chennai - Koyambedu CMBT → Trichy - Central Bus Stand (100 buses)",
            "Coimbatore - Ukkadam Bus Stand → Chennai - Koyambedu CMBT (120 buses)",
            "Trichy - Central Bus Stand → Karaikudi - New Bus Stand (80 buses)",
            "Trichy - Central Bus Stand → Pudukkottai - Bus Stand (60 buses)",
            "Pudukkottai - Bus Stand → Karaikudi - New Bus Stand (50 buses)"
        );
    }
    
    private final List<String> privateOperators = Arrays.asList(
        "Orange Travels", "Parveen Travels", "SRS Travels", "KK Travels", 
        "PKR Transport", "Sri Murugan Travels", "KPN Travels", "Diwakar Travels"
    );
    
    public Bus saveBus(Bus bus) {
        try {
            return busRepository.save(bus);
        } catch (Exception e) {
            System.err.println("Error saving bus: " + e.getMessage());
            return null;
        }
    }
    
    public Bus getBusById(Long id) {
        try {
            return busRepository.findById(id).orElse(null);
        } catch (Exception e) {
            System.err.println("Error getting bus by id: " + e.getMessage());
            return null;
        }
    }
}