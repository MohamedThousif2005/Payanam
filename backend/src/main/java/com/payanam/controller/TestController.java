package com.payanam.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:8090"})
public class TestController {
    
    @GetMapping("/test")
    public Map<String, Object> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "Backend is working!");
        response.put("timestamp", new Date());
        return response;
    }
    
    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "🚀 PAYANAM Backend is running! TNSTC Integration Ready.");
        response.put("port", "8090");
        response.put("timestamp", new Date());
        return response;
    }
    
    @GetMapping("/buses/simple-locations")
    public Map<String, Object> getSimpleLocations() {
        Map<String, Object> response = new HashMap<>();
        
        List<String> fromLocations = Arrays.asList(
            "Chennai Koyambedu", 
            "Madurai Periyar", 
            "Coimbatore Ukkadam", 
            "Trichy Central",
            "Salem New Bus Stand",
            "Tirunelveli New Bus Stand"
        );
        
        List<String> toLocations = Arrays.asList(
            "Chennai Koyambedu", 
            "Madurai Periyar", 
            "Coimbatore Ukkadam", 
            "Trichy Central",
            "Salem New Bus Stand", 
            "Tirunelveli New Bus Stand"
        );
        
        response.put("fromLocations", fromLocations);
        response.put("toLocations", toLocations);
        response.put("status", "success");
        
        return response;
    }
    
    @GetMapping("/buses/simple-routes")
    public Map<String, Object> getSimpleRoutes() {
        Map<String, Object> response = new HashMap<>();
        
        List<String> popularRoutes = Arrays.asList(
            "Chennai Koyambedu → Madurai Periyar (15 buses)",
            "Chennai Koyambedu → Coimbatore Ukkadam (12 buses)",
            "Madurai Periyar → Chennai Koyambedu (15 buses)",
            "Coimbatore Ukkadam → Chennai Koyambedu (12 buses)",
            "Chennai Koyambedu → Trichy Central (10 buses)"
        );
        
        response.put("popularRoutes", popularRoutes);
        response.put("status", "success");
        
        return response;
    }
    
    @PostMapping("/buses/simple-search")
    public Map<String, Object> simpleSearch(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        String from = request.get("from");
        String to = request.get("to");
        String busType = request.get("type");
        
        // Demo bus data
        List<Map<String, Object>> buses = Arrays.asList(
            createDemoBus(1, "TN01 N 1001", "TNSTC Express", "express", from, to, "21:00", "05:30", 450.0, 35),
            createDemoBus(2, "TN01 N 1002", "TNSTC AC", "ac", from, to, "22:30", "06:00", 750.0, 25),
            createDemoBus(3, "TN01 N 1003", "TNSTC Sleeper", "sleeper", from, to, "23:00", "05:30", 550.0, 20)
        );
        
        response.put("buses", buses);
        response.put("status", "success");
        response.put("searchFrom", from);
        response.put("searchTo", to);
        response.put("searchType", busType);
        
        return response;
    }
    
    private Map<String, Object> createDemoBus(long id, String number, String name, String type, 
                                            String from, String to, String depTime, String arrTime, 
                                            double fare, int seats) {
        Map<String, Object> bus = new HashMap<>();
        bus.put("busId", id);
        bus.put("busNumber", number);
        bus.put("busName", name);
        bus.put("busType", type);
        bus.put("fromLocation", from);
        bus.put("toLocation", to);
        bus.put("departureTime", depTime);
        bus.put("arrivalTime", arrTime);
        bus.put("fare", fare);
        bus.put("availableSeats", seats);
        bus.put("totalSeats", seats);
        bus.put("depotName", "Chennai");
        bus.put("routeNumber", "DEMO" + id);
        bus.put("currentStatus", "Running");
        bus.put("serviceType", "moffusil");
        return bus;
    }
}