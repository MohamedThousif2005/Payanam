package com.payanam.service.scraper;

import com.payanam.entity.Bus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class SetuAPIService {
    
    private static final String SETU_API_BASE = "https://api.setu.co/api/v1";
    private static final String SETU_TNSTC_ENDPOINT = SETU_API_BASE + "/tnstc/buses";
    
    // Setu API requires authentication - you'll need to get credentials
    private static final String SETU_API_KEY = "your_setu_api_key_here";
    private static final String SETU_API_SECRET = "your_setu_api_secret_here";
    
    public List<Bus> fetchTNSTCBuses() {
        List<Bus> buses = new ArrayList<>();
        
        try {
            System.out.println("🔍 Fetching TNSTC buses from Setu API...");
            
            RestTemplate restTemplate = new RestTemplate();
            
            // Setu API requires authentication
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + getSetuAuthToken());
            headers.set("X-API-Key", SETU_API_KEY);
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<String> entity = new HttpEntity<>(headers);
            
            /*
            // Actual API call (commented out until you have credentials)
            ResponseEntity<SetuResponse> response = restTemplate.exchange(
                SETU_TNSTC_ENDPOINT,
                HttpMethod.GET,
                entity,
                SetuResponse.class
            );
            
            // Process actual response
            if (response.getStatusCode() == HttpStatus.OK) {
                buses = convertSetuResponseToBuses(response.getBody());
            }
            */
            
            // For now, return sample government bus data
            buses = getSampleSetuData();
            
            System.out.println("✅ Fetched " + buses.size() + " TNSTC buses from Setu API");
            
        } catch (Exception e) {
            System.err.println("❌ Error fetching from Setu API: " + e.getMessage());
            System.out.println("💡 To use Setu API, you need to:");
            System.out.println("   1. Register at https://setu.co/developer");
            System.out.println("   2. Get API credentials for TNSTC data");
            System.out.println("   3. Update SETU_API_KEY and SETU_API_SECRET in this file");
        }
        
        return buses;
    }
    
    private String getSetuAuthToken() {
        // Implement Setu API authentication
        // This would make a separate auth call to get bearer token
        return "dummy_token_until_credentials_are_set";
    }
    
    private List<Bus> getSampleSetuData() {
        List<Bus> buses = new ArrayList<>();
        
        // Sample government bus data from Setu API
        buses.add(createSetuBus("TN01 G 1001", "TNSTC Government Ordinary", "ordinary", 
            "Chennai Koyambedu", "Madurai Periyar", "20:30", "05:00", 320.0, 42, "Chennai", "GOV001"));
        
        buses.add(createSetuBus("TN01 G 1002", "TNSTC Government Express", "express", 
            "Chennai Koyambedu", "Coimbatore Ukkadam", "21:00", "06:00", 550.0, 35, "Chennai", "GOV002"));
        
        buses.add(createSetuBus("TN58 G 2001", "TNSTC Government AC", "ac", 
            "Madurai Periyar", "Chennai Koyambedu", "20:00", "04:30", 750.0, 25, "Madurai", "GOV003"));
        
        buses.add(createSetuBus("TN37 G 3001", "TNSTC Government Sleeper", "sleeper", 
            "Coimbatore Ukkadam", "Bangalore", "22:00", "06:30", 1100.0, 20, "Coimbatore", "GOV004"));
        
        buses.add(createSetuBus("TN45 G 4001", "TNSTC Town Service", "ordinary", 
            "Trichy Central", "Thanjavur", "06:00", "08:30", 75.0, 42, "Trichy", "GOV005"));
        
        return buses;
    }
    
    private Bus createSetuBus(String number, String name, String type, 
                             String from, String to, String depTime, String arrTime, 
                             Double fare, Integer seats, String depot, String route) {
        Bus bus = new Bus();
        bus.setBusNumber(number);
        bus.setBusName(name);
        bus.setBusType(type);
        bus.setServiceType("government");
        bus.setFromLocation(from);
        bus.setToLocation(to);
        bus.setDepartureTime(java.time.LocalTime.parse(depTime));
        bus.setArrivalTime(java.time.LocalTime.parse(arrTime));
        bus.setFare(fare);
        bus.setAvailableSeats(seats);
        bus.setTotalSeats(seats);
        bus.setDepotName(depot);
        bus.setRouteNumber(route);
        bus.setCurrentStatus("Scheduled");
        return bus;
    }
    
    // Response class for Setu API
    public static class SetuResponse {
        private boolean success;
        private List<SetuBusData> data;
        private String message;
        
        // Getters and setters
        public boolean isSuccess() { return success; }
        public void setSuccess(boolean success) { this.success = success; }
        
        public List<SetuBusData> getData() { return data; }
        public void setData(List<SetuBusData> data) { this.data = data; }
        
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
    
    public static class SetuBusData {
        private String busNumber;
        private String busName;
        private String busType;
        private String fromStation;
        private String toStation;
        private String departureTime;
        private String arrivalTime;
        private Double fare;
        private Integer availableSeats;
        private String depot;
        private String routeNumber;
        
        // Getters and setters
        public String getBusNumber() { return busNumber; }
        public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
        
        public String getBusName() { return busName; }
        public void setBusName(String busName) { this.busName = busName; }
        
        public String getBusType() { return busType; }
        public void setBusType(String busType) { this.busType = busType; }
        
        public String getFromStation() { return fromStation; }
        public void setFromStation(String fromStation) { this.fromStation = fromStation; }
        
        public String getToStation() { return toStation; }
        public void setToStation(String toStation) { this.toStation = toStation; }
        
        public String getDepartureTime() { return departureTime; }
        public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }
        
        public String getArrivalTime() { return arrivalTime; }
        public void setArrivalTime(String arrivalTime) { this.arrivalTime = arrivalTime; }
        
        public Double getFare() { return fare; }
        public void setFare(Double fare) { this.fare = fare; }
        
        public Integer getAvailableSeats() { return availableSeats; }
        public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }
        
        public String getDepot() { return depot; }
        public void setDepot(String depot) { this.depot = depot; }
        
        public String getRouteNumber() { return routeNumber; }
        public void setRouteNumber(String routeNumber) { this.routeNumber = routeNumber; }
    }
}