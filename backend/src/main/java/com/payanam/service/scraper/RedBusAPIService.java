package com.payanam.service.scraper;

import com.payanam.entity.Bus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.Map; // Add this import
import java.util.HashMap; // Add this import

@Service
public class RedBusAPIService {
    
    private static final String REDBUS_API_BASE = "https://www.redbus.in";
    private static final String REDBUS_SEARCH_API = "https://www.redbus.in/search/SearchResults";
    
    public List<Bus> fetchTNSTCBuses(String fromCity, String toCity, String travelDate) {
        List<Bus> buses = new ArrayList<>();
        
        try {
            System.out.println("🔍 Fetching TNSTC buses from RedBus API...");
            
            RestTemplate restTemplate = new RestTemplate();
            
            // For now, return sample data - implement actual API call later
            buses = getSampleRedBusData(fromCity, toCity);
            
            System.out.println("✅ Fetched " + buses.size() + " TNSTC buses from RedBus");
            
        } catch (Exception e) {
            System.err.println("❌ Error fetching from RedBus API: " + e.getMessage());
        }
        
        return buses;
    }
    
    private List<Bus> getSampleRedBusData(String fromCity, String toCity) {
        List<Bus> buses = new ArrayList<>();
        
        // Sample TNSTC bus data from RedBus
        if (fromCity.equalsIgnoreCase("Chennai") && toCity.equalsIgnoreCase("Madurai")) {
            buses.add(createRedBusBus("TN01 N 1234", "TNSTC Express (AC)", "ac", 
                "Chennai Koyambedu", "Madurai Periyar", "21:00", "05:30", 650.0, 25));
            
            buses.add(createRedBusBus("TN01 N 5678", "TNSTC Sleeper", "sleeper", 
                "Chennai Koyambedu", "Madurai Periyar", "22:30", "06:00", 450.0, 20));
            
            buses.add(createRedBusBus("TN01 N 9012", "TNSTC Ultra Deluxe", "ac", 
                "Chennai Koyambedu", "Madurai Periyar", "23:00", "05:30", 850.0, 30));
        }
        
        if (fromCity.equalsIgnoreCase("Chennai") && toCity.equalsIgnoreCase("Coimbatore")) {
            buses.add(createRedBusBus("TN01 N 3456", "TNSTC Express", "express", 
                "Chennai Koyambedu", "Coimbatore Ukkadam", "21:30", "06:00", 700.0, 35));
            
            buses.add(createRedBusBus("TN01 N 7890", "TNSTC AC", "ac", 
                "Chennai Koyambedu", "Coimbatore Ukkadam", "22:00", "05:30", 950.0, 25));
        }
        
        return buses;
    }
    
    private Bus createRedBusBus(String number, String name, String type, 
                               String from, String to, String depTime, String arrTime, 
                               Double fare, Integer seats) {
        Bus bus = new Bus();
        bus.setBusNumber(number);
        bus.setBusName(name);
        bus.setBusType(type);
        bus.setServiceType("moffusil");
        bus.setFromLocation(from);
        bus.setToLocation(to);
        bus.setDepartureTime(java.time.LocalTime.parse(depTime));
        bus.setArrivalTime(java.time.LocalTime.parse(arrTime));
        bus.setFare(fare);
        bus.setAvailableSeats(seats);
        bus.setTotalSeats(seats);
        bus.setDepotName("Chennai");
        bus.setRouteNumber("RB-" + number);
        bus.setCurrentStatus("Scheduled");
        return bus;
    }
    
    // Method to get city codes from RedBus
    public Map<String, String> getCityCodes() {
        // RedBus uses city codes instead of names
        Map<String, String> cityCodes = new HashMap<>();
        cityCodes.put("Chennai", "123");
        cityCodes.put("Madurai", "456");
        cityCodes.put("Coimbatore", "789");
        cityCodes.put("Trichy", "101");
        cityCodes.put("Salem", "112");
        cityCodes.put("Tirunelveli", "131");
        return cityCodes;
    }
}