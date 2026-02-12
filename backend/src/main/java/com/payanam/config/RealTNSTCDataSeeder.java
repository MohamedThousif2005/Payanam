package com.payanam.config;

import com.payanam.entity.Bus;
import com.payanam.repository.BusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.*;

@Component
@Order(2)
public class RealTNSTCDataSeeder implements CommandLineRunner {
    
    @Autowired 
    private BusRepository busRepository;
    
    private final Map<String, List<String>> districtCities = new HashMap<>();
    private final Map<String, Object[]> busTypes = new HashMap<>();
    private final Map<String, Map<String, Integer>> routeDistances = new HashMap<>();

    @Override
    public void run(String... args) throws Exception {
        System.out.println("🚀 Loading Real TNSTC Bus Data...");
        
        // Wait for basic data to be seeded
        Thread.sleep(2000);
        
        // Initialize the maps
        initializeDistrictCities();
        initializeBusTypes();
        initializeRouteDistances();
        
        if (busRepository.count() < 50) {
            System.out.println("📝 Generating additional TNSTC buses...");
            generateRealTNSTCData();
        }
        
        System.out.println("✅ TNSTC Data Loaded: " + busRepository.count() + " buses");
    }
    
    private void initializeDistrictCities() {
        districtCities.put("Chennai", Arrays.asList("Koyambedu", "CMBT", "Tambaram"));
        districtCities.put("Madurai", Arrays.asList("Periyar", "Arapalayam"));
        districtCities.put("Coimbatore", Arrays.asList("Ukkadam", "Gandhipuram"));
        districtCities.put("Trichy", Arrays.asList("Central", "Srirangam"));
        districtCities.put("Salem", Arrays.asList("New Bus Stand", "Hasthampatti"));
    }
    
    private void initializeBusTypes() {
        busTypes.put("ordinary", new Object[]{42, 2.0, "TNSTC Ordinary", "TNSTC"});
        busTypes.put("express", new Object[]{35, 2.5, "TNSTC Express", "TNSTC"});
        busTypes.put("ac", new Object[]{25, 4.0, "TNSTC AC", "TNSTC"});
    }
    
    private void initializeRouteDistances() {
        Map<String, Integer> chennaiRoutes = new HashMap<>();
        chennaiRoutes.put("Madurai", 450);
        chennaiRoutes.put("Coimbatore", 500);
        chennaiRoutes.put("Trichy", 320);
        chennaiRoutes.put("Salem", 340);
        routeDistances.put("Chennai", chennaiRoutes);
        
        Map<String, Integer> maduraiRoutes = new HashMap<>();
        maduraiRoutes.put("Chennai", 450);
        maduraiRoutes.put("Coimbatore", 230);
        maduraiRoutes.put("Trichy", 130);
        routeDistances.put("Madurai", maduraiRoutes);
    }

    private void generateRealTNSTCData() {
        List<String> districts = new ArrayList<>(districtCities.keySet());
        Random random = new Random();
        
        int busCount = 0;
        
        // Generate limited buses for testing
        for (String fromDistrict : districts) {
            for (String toDistrict : districts) {
                if (!fromDistrict.equals(toDistrict) && busCount < 20) {
                    Bus bus = generateBus(fromDistrict, toDistrict, busCount, random);
                    if (bus != null) {
                        busRepository.save(bus);
                        busCount++;
                        System.out.println("➕ Added bus: " + bus.getBusNumber());
                    }
                }
            }
        }
        
        System.out.println("🎉 Generated " + busCount + " additional TNSTC buses!");
    }
    
    private Bus generateBus(String fromDistrict, String toDistrict, int index, Random random) {
        try {
            String busType = getRandomBusType(random);
            Object[] busTypeInfo = busTypes.get(busType);
            int seats = (int) busTypeInfo[0];
            double fareMultiplier = (double) busTypeInfo[1];
            String busNamePrefix = (String) busTypeInfo[2];
            String operator = (String) busTypeInfo[3];
            
            int distance = getRouteDistance(fromDistrict, toDistrict);
            double fare = distance * fareMultiplier * (0.9 + random.nextDouble() * 0.2);
            
            String districtCode = getDistrictCode(fromDistrict);
            String busNumber = String.format("TN%s N %04d", districtCode, 2000 + index);
            
            String fromLocation = fromDistrict + " " + getRandomBusStand(fromDistrict, random);
            String toLocation = toDistrict + " " + getRandomBusStand(toDistrict, random);
            
            LocalTime[] timings = generateRealisticTimings(fromDistrict, toDistrict, random);
            
            Bus bus = new Bus();
            bus.setBusNumber(busNumber);
            bus.setBusName(busNamePrefix + " " + fromDistrict.substring(0, 3) + "-" + toDistrict.substring(0, 3));
            bus.setBusType(busType);
            bus.setOperator(operator);
            bus.setServiceType("moffusil");
            bus.setFromLocation(fromLocation);
            bus.setToLocation(toLocation);
            bus.setDepartureTime(timings[0]);
            bus.setArrivalTime(timings[1]);
            bus.setFare((double) Math.round(fare));
            bus.setAvailableSeats(seats - random.nextInt(10));
            bus.setTotalSeats(seats);
            bus.setDepotName(fromDistrict);
            bus.setRouteNumber(fromDistrict.substring(0, 3).toUpperCase() + toDistrict.substring(0, 3).toUpperCase());
            bus.setCurrentStatus("Scheduled");
            bus.setIsActive(true);
            
            return bus;
            
        } catch (Exception e) {
            System.err.println("Error generating bus: " + e.getMessage());
            return null;
        }
    }
    
    private String getDistrictCode(String district) {
        Map<String, String> districtCodes = new HashMap<>();
        districtCodes.put("Chennai", "01");
        districtCodes.put("Madurai", "58");
        districtCodes.put("Coimbatore", "37");
        districtCodes.put("Trichy", "45");
        districtCodes.put("Salem", "27");
        return districtCodes.getOrDefault(district, "01");
    }
    
    private String getRandomBusType(Random random) {
        String[] types = {"ordinary", "express", "ac"};
        return types[random.nextInt(types.length)];
    }
    
    private int getRouteDistance(String from, String to) {
        if (routeDistances.containsKey(from) && routeDistances.get(from).containsKey(to)) {
            return routeDistances.get(from).get(to);
        }
        return 200 + new Random().nextInt(200);
    }
    
    private String getRandomBusStand(String district, Random random) {
        List<String> stands = districtCities.get(district);
        return stands.get(random.nextInt(stands.size()));
    }
    
    private LocalTime[] generateRealisticTimings(String from, String to, Random random) {
        int distance = getRouteDistance(from, to);
        int travelHours = distance / 60;
        
        int departureHour = 6 + random.nextInt(16);
        int departureMinute = random.nextInt(4) * 15;
        
        LocalTime departure = LocalTime.of(departureHour, departureMinute);
        LocalTime arrival = departure.plusHours(travelHours).plusMinutes(random.nextInt(60));
        
        if (arrival.isBefore(departure)) {
            arrival = arrival.plusHours(24);
        }
        
        return new LocalTime[]{departure, arrival};
    }
}