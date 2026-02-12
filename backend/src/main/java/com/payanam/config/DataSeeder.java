package com.payanam.config;

import com.payanam.entity.Bus;
import com.payanam.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

@Component
@Order(1)
public class DataSeeder implements CommandLineRunner {
    
    @Autowired 
    private BusRepository busRepository;
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("🚀 STARTING DATA SEEDER...");
        
        // Wait a bit for tables to be created
        Thread.sleep(3000);
        
        long existingCount = busRepository.count();
        System.out.println("📊 Current bus count: " + existingCount);
        
        if (existingCount == 0) {
            System.out.println("📝 Seeding fresh data...");
            seedBasicBuses();
            System.out.println("✅ Data seeding completed! Total buses: " + busRepository.count());
        } else {
            System.out.println("✅ Database already has data. Skipping seeding.");
        }
    }
    
    private void seedBasicBuses() {
        try {
            // Create basic test buses
            List<Bus> buses = Arrays.asList(
                createBus("TN01 N 1001", "TNSTC Express", "express", "TNSTC", 
                         "Chennai Koyambedu", "Madurai Periyar", 
                         LocalTime.of(21, 0), LocalTime.of(5, 30), 450.0, 35, "Chennai", "CM01"),
                
                createBus("TN45 N 2001", "TNSTC Ordinary", "ordinary", "TNSTC", 
                         "Trichy Central", "Karaikudi New Bus Stand", 
                         LocalTime.of(6, 0), LocalTime.of(9, 30), 80.0, 42, "Trichy", "TK01"),
                
                createBus("TN45 N 2002", "TNSTC AC", "ac", "TNSTC", 
                         "Trichy Central", "Karaikudi New Bus Stand", 
                         LocalTime.of(8, 0), LocalTime.of(11, 0), 180.0, 25, "Trichy", "TK02"),
                
                createBus("TN45 N 2003", "TNSTC Express", "express", "TNSTC", 
                         "Trichy Central", "Pudukkottai Bus Stand", 
                         LocalTime.of(6, 30), LocalTime.of(8, 0), 45.0, 35, "Trichy", "TP01"),
                
                createBus("TN45 N 2004", "TNSTC Ordinary", "ordinary", "TNSTC", 
                         "Pudukkottai Bus Stand", "Karaikudi New Bus Stand", 
                         LocalTime.of(7, 30), LocalTime.of(9, 0), 40.0, 42, "Trichy", "PK01")
            );
            
            // Save all buses
            busRepository.saveAll(buses);
            System.out.println("✅ Successfully seeded " + buses.size() + " buses");
            
        } catch (Exception e) {
            System.err.println("❌ ERROR in seedBasicBuses: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private Bus createBus(String number, String name, String type, String operator,
                         String from, String to, LocalTime dep, LocalTime arr, 
                         Double fare, Integer seats, String depot, String route) {
        Bus bus = new Bus();
        bus.setBusNumber(number);
        bus.setBusName(name);
        bus.setBusType(type);
        bus.setOperator(operator);
        bus.setFromLocation(from);
        bus.setToLocation(to);
        bus.setDepartureTime(dep);
        bus.setArrivalTime(arr);
        bus.setFare(fare);
        bus.setAvailableSeats(seats);
        bus.setTotalSeats(seats);
        bus.setDepotName(depot);
        bus.setRouteNumber(route);
        bus.setCurrentStatus("Running");
        bus.setServiceType("moffusil");
        bus.setIsActive(true);
        
        return bus;
    }
}