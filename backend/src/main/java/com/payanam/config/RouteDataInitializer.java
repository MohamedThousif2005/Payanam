package com.payanam.config;

import com.payanam.entity.*;
import com.payanam.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.*;

@Component
public class RouteDataInitializer implements CommandLineRunner {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private RouteStopRepository routeStopRepository;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private TransitServiceRepository transitServiceRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (routeRepository.count() > 200) {
            System.out.println("🌱 Database already heavily seeded. Skipping initialization.");
            return;
        }

        System.out.println("🚀 Starting data initialization for routes and stops...");

        // 1. Basic Routes (101 routes)
        String basicRoutesCsv = 
            "1,Chennai,Trichy\n" +
            "2,Chennai,Madurai\n" +
            "3,Chennai,Coimbatore\n" +
            "4,Trichy,Salem\n" +
            "5,Trichy,Madurai\n" +
            "6,Coimbatore,Salem\n" +
            "7,Salem,Chennai\n" +
            "8,Madurai,Rameswaram\n" +
            "9,Karur,Karaikudi\n" +
            "10,Trichy,Tanjore\n" +
            "11,Tanjore,Nagapattinam\n" +
            "12,Chennai,Vellore\n" +
            "13,Vellore,Salem\n" +
            "14,Salem,Erode\n" +
            "15,Erode,Coimbatore\n" +
            "16,Coimbatore,Pollachi\n" +
            "17,Madurai,Dindigul\n" +
            "18,Dindigul,Karur\n" +
            "19,Karur,Salem\n" +
            "20,Chennai,Pondicherry\n" +
            "21,Pondicherry,Cuddalore\n" +
            "22,Cuddalore,Chidambaram\n" +
            "23,Chidambaram,Tanjore\n" +
            "24,Tanjore,Trichy\n" +
            "25,Trichy,Karur\n" +
            "26,Karur,Erode\n" +
            "27,Erode,Tiruppur\n" +
            "28,Tiruppur,Coimbatore\n" +
            "29,Coimbatore,Ooty\n" +
            "30,Ooty,Mysore\n" +
            "31,Mysore,Bangalore\n" +
            "32,Bangalore,Chennai\n" +
            "33,Bangalore,Salem\n" +
            "34,Salem,Trichy\n" +
            "35,Trichy,Pudukottai\n" +
            "36,Pudukottai,Karaikudi\n" +
            "37,Karaikudi,Ramanathapuram\n" +
            "38,Ramanathapuram,Rameswaram\n" +
            "39,Madurai,Tirunelveli\n" +
            "40,Tirunelveli,Kanyakumari\n" +
            "41,Kanyakumari,Nagercoil\n" +
            "42,Nagercoil,Madurai\n" +
            "43,Chennai,Tirupati\n" +
            "44,Tirupati,Vellore\n" +
            "45,Vellore,Chennai\n" +
            "46,Chennai,Salem\n" +
            "47,Salem,Madurai\n" +
            "48,Madurai,Coimbatore\n" +
            "49,Coimbatore,Chennai\n" +
            "50,Chennai,Erode\n" +
            "51,Erode,Chennai\n" +
            "52,Chennai,Trichy\n" +
            "53,Trichy,Chennai\n" +
            "54,Chennai,Salem\n" +
            "55,Salem,Chennai\n" +
            "56,Chennai,Madurai\n" +
            "57,Madurai,Chennai\n" +
            "58,Chennai,Coimbatore\n" +
            "59,Coimbatore,Chennai\n" +
            "60,Chennai,Tirunelveli\n" +
            "61,Tirunelveli,Chennai\n" +
            "62,Chennai,Kanyakumari\n" +
            "63,Kanyakumari,Chennai\n" +
            "64,Salem,Tiruppur\n" +
            "65,Tiruppur,Salem\n" +
            "66,Erode,Karur\n" +
            "67,Karur,Erode\n" +
            "68,Trichy,Dindigul\n" +
            "69,Dindigul,Trichy\n" +
            "70,Madurai,Trichy\n" +
            "71,Trichy,Madurai\n" +
            "72,Coimbatore,Erode\n" +
            "73,Erode,Coimbatore\n" +
            "74,Chennai,Villupuram\n" +
            "75,Villupuram,Chennai\n" +
            "76,Villupuram,Trichy\n" +
            "77,Trichy,Villupuram\n" +
            "78,Chennai,Kanchipuram\n" +
            "79,Kanchipuram,Chennai\n" +
            "80,Kanchipuram,Vellore\n" +
            "81,Vellore,Kanchipuram\n" +
            "82,Chennai,Tiruvallur\n" +
            "83,Tiruvallur,Chennai\n" +
            "84,Tiruvallur,Vellore\n" +
            "85,Vellore,Tiruvallur\n" +
            "86,Madurai,Sivagangai\n" +
            "87,Sivagangai,Madurai\n" +
            "88,Sivagangai,Karaikudi\n" +
            "89,Karaikudi,Sivagangai\n" +
            "90,Tirunelveli,Tuticorin\n" +
            "91,Tuticorin,Tirunelveli\n" +
            "92,Tuticorin,Madurai\n" +
            "93,Madurai,Tuticorin\n" +
            "94,Salem,Krishnagiri\n" +
            "95,Krishnagiri,Salem\n" +
            "96,Krishnagiri,Bangalore\n" +
            "97,Bangalore,Krishnagiri\n" +
            "98,Chennai,Krishnagiri\n" +
            "99,Krishnagiri,Chennai\n" +
            "100,Coimbatore,Palakkad\n" +
            "101,Palakkad,Coimbatore";

        Map<String, Route> routeMap = new HashMap<>();

        for (String routeLine : basicRoutesCsv.split("\n")) {
            String[] parts = routeLine.split(",");
            if (parts.length < 3) continue;
            
            String routeId = parts[0];
            String source = parts[1];
            String destination = parts[2];
            String routeName = source + " - " + destination;
            
            Route route = routeRepository.findByRouteName(routeName);
            if (route == null) {
                route = new Route();
                route.setRouteName(routeName);
                route.setTransportType(TransportType.BUS);
                route = routeRepository.save(route);
            }
            routeMap.put(routeName, route);

            // Also create a Bus for this route to ensure search works
            String busNumber = "TN-" + String.format("%02d", Integer.parseInt(routeId) % 99) + "-B-" + String.format("%04d", Integer.parseInt(routeId));
            if (busRepository.findByBusNumber(busNumber) == null) {
                Bus bus = new Bus();
                bus.setBusNumber(busNumber);
                bus.setBusName("Express " + source + " to " + destination);
                bus.setBusType(Integer.parseInt(routeId) % 2 == 0 ? "AC" : "Non-AC");
                bus.setOperator(Integer.parseInt(routeId) % 3 == 0 ? "Parveen Travels" : "TNSTC");
                bus.setServiceType("Express");
                bus.setFromLocation(source);
                bus.setToLocation(destination);
                bus.setDepartureTime(LocalTime.of(6 + (Integer.parseInt(routeId) % 12), 0));
                bus.setArrivalTime(bus.getDepartureTime().plusHours(4));
                bus.setFare(300.0 + (Integer.parseInt(routeId) * 5));
                bus.setAvailableSeats(30 + (Integer.parseInt(routeId) % 10));
                bus.setTotalSeats(40);
                bus.setRouteNumber(routeId);
                bus.setIsActive(true);
                bus = busRepository.save(bus);

                // Create TransitService for basic buses so they show in unified search
                TransitService ts = transitServiceRepository.findByServiceNumber(busNumber);
                if (ts == null) {
                    ts = new TransitService();
                    ts.setServiceNumber(busNumber);
                }
                ts.setRoute(route);
                ts.setServiceName(bus.getBusName());
                ts.setOperator(bus.getOperator());
                ts.setBaseFare(bus.getFare());
                ts.setAvailableSeats(bus.getAvailableSeats());
                ts.setTotalSeats(bus.getTotalSeats());
                ts.setCurrentStatus("Scheduled");
                transitServiceRepository.save(ts);
            }
        }

        // 2. Detailed Stop Data (25 detailed routes)
        String stopsCsv = 
            "1,Chennai,1,06:00,06:05,0,0\n" +
            "1,Villupuram,2,08:00,08:05,150,100\n" +
            "1,Perambalur,3,10:00,10:05,250,180\n" +
            "1,Trichy,4,12:00,12:05,350,250\n" +
            "\n" +
            "2,Chennai,1,07:00,07:05,0,0\n" +
            "2,Villupuram,2,09:00,09:05,150,100\n" +
            "2,Trichy,3,12:00,12:05,300,200\n" +
            "2,Madurai,4,15:00,15:05,450,300\n" +
            "\n" +
            "3,Chennai,1,05:30,05:35,0,0\n" +
            "3,Salem,2,11:00,11:05,300,200\n" +
            "3,Tiruppur,3,13:00,13:05,380,260\n" +
            "3,Coimbatore,4,14:30,14:35,420,300\n" +
            "\n" +
            "4,Trichy,1,06:00,06:05,0,0\n" +
            "4,Perambalur,2,07:30,07:35,60,50\n" +
            "4,Attur,3,09:30,09:35,140,120\n" +
            "4,Salem,4,11:00,11:05,200,180\n" +
            "\n" +
            "5,Trichy,1,08:00,08:05,0,0\n" +
            "5,Dindigul,2,10:30,10:35,120,100\n" +
            "5,Madurai,3,12:00,12:05,160,140\n" +
            "5,Virudhunagar,4,13:30,13:35,200,180\n" +
            "\n" +
            "6,Coimbatore,1,06:30,06:35,0,0\n" +
            "6,Tiruppur,2,07:30,07:35,60,50\n" +
            "6,Erode,3,09:00,09:05,120,100\n" +
            "6,Salem,4,11:00,11:05,200,180\n" +
            "\n" +
            "7,Salem,1,06:00,06:05,0,0\n" +
            "7,Attur,2,07:30,07:35,60,50\n" +
            "7,Villupuram,3,10:30,10:35,180,140\n" +
            "7,Chennai,4,13:30,13:35,300,250\n" +
            "\n" +
            "8,Madurai,1,07:00,07:05,0,0\n" +
            "8,Ramanathapuram,2,10:00,10:05,150,120\n" +
            "8,Paramakudi,3,11:30,11:35,200,160\n" +
            "8,Rameswaram,4,13:00,13:05,250,200\n" +
            "\n" +
            "9,Karur,1,09:00,09:05,0,0\n" +
            "9,Trichy,2,10:30,10:35,80,70\n" +
            "9,Pudukottai,3,12:00,12:05,140,120\n" +
            "9,Karaikudi,4,13:30,13:35,200,180\n" +
            "\n" +
            "10,Trichy,1,06:30,06:35,0,0\n" +
            "10,Tanjore,2,08:00,08:05,60,50\n" +
            "10,Kumbakonam,3,09:30,09:35,120,100\n" +
            "10,Nagapattinam,4,11:00,11:05,180,150\n" +
            "\n" +
            "11,Tanjore,1,07:00,07:05,0,0\n" +
            "11,Kumbakonam,2,08:30,08:35,50,40\n" +
            "11,Mayiladuthurai,3,09:30,09:35,90,80\n" +
            "11,Nagapattinam,4,10:30,10:35,130,110\n" +
            "\n" +
            "12,Chennai,1,08:00,08:05,0,0\n" +
            "12,Kanchipuram,2,09:30,09:35,80,60\n" +
            "12,Arcot,3,10:30,10:35,120,100\n" +
            "12,Vellore,4,11:30,11:35,150,120\n" +
            "\n" +
            "13,Vellore,1,07:00,07:05,0,0\n" +
            "13,Krishnagiri,2,09:00,09:05,120,100\n" +
            "13,Dharmapuri,3,10:00,10:05,160,130\n" +
            "13,Salem,4,11:00,11:05,200,180\n" +
            "\n" +
            "14,Salem,1,06:00,06:05,0,0\n" +
            "14,Erode,2,07:30,07:35,60,50\n" +
            "14,Perundurai,3,08:30,08:35,90,70\n" +
            "14,Tiruppur,4,09:30,09:35,120,100\n" +
            "\n" +
            "15,Erode,1,08:00,08:05,0,0\n" +
            "15,Tiruppur,2,09:00,09:05,50,40\n" +
            "15,Avinashi,3,10:00,10:05,90,70\n" +
            "15,Coimbatore,4,10:30,10:35,120,100\n" +
            "\n" +
            "16,Chennai,1,06:00,06:05,0,0\n" +
            "16,Tiruvallur,2,07:00,07:05,40,30\n" +
            "16,Arakkonam,3,08:30,08:35,90,70\n" +
            "16,Vellore,4,10:00,10:05,150,120\n" +
            "\n" +
            "17,Chennai,1,07:30,07:35,0,0\n" +
            "17,Chengalpattu,2,08:30,08:35,50,40\n" +
            "17,Villupuram,3,10:30,10:35,150,120\n" +
            "17,Cuddalore,4,12:00,12:05,200,160\n" +
            "\n" +
            "18,Cuddalore,1,06:30,06:35,0,0\n" +
            "18,Chidambaram,2,07:30,07:35,40,30\n" +
            "18,Sirkazhi,3,08:30,08:35,80,60\n" +
            "18,Mayiladuthurai,4,09:30,09:35,120,100\n" +
            "\n" +
            "19,Madurai,1,06:00,06:05,0,0\n" +
            "19,Dindigul,2,07:30,07:35,60,50\n" +
            "19,Karur,3,09:30,09:35,140,120\n" +
            "19,Erode,4,11:30,11:35,220,180\n" +
            "\n" +
            "20,Coimbatore,1,06:00,06:05,0,0\n" +
            "20,Pollachi,2,07:30,07:35,60,50\n" +
            "20,Udumalpet,3,09:30,09:35,140,120\n" +
            "20,Dindigul,4,11:30,11:35,220,180\n" +
            "\n" +
            "21,Salem,1,07:00,07:05,0,0\n" +
            "21,Krishnagiri,2,08:30,08:35,80,70\n" +
            "21,Hosur,3,10:00,10:05,140,120\n" +
            "21,Bangalore,4,12:00,12:05,220,180\n" +
            "\n" +
            "22,Bangalore,1,06:00,06:05,0,0\n" +
            "22,Hosur,2,07:30,07:35,50,40\n" +
            "22,Krishnagiri,3,09:00,09:05,100,80\n" +
            "22,Salem,4,11:00,11:05,180,150\n" +
            "\n" +
            "23,Tirunelveli,1,06:00,06:05,0,0\n" +
            "23,Kovilpatti,2,07:30,07:35,60,50\n" +
            "23,Tuticorin,3,09:00,09:05,120,100\n" +
            "23,Thoothukudi,4,10:00,10:05,150,120\n" +
            "\n" +
            "24,Madurai,1,07:00,07:05,0,0\n" +
            "24,Sivagangai,2,08:00,08:05,40,30\n" +
            "24,Karaikudi,3,09:30,09:35,90,70\n" +
            "24,Ramanathapuram,4,11:30,11:35,150,120\n" +
            "\n" +
            "25,Tirunelveli,1,06:30,06:35,0,0\n" +
            "25,Nagercoil,2,08:30,08:35,80,70\n" +
            "25,Kanyakumari,3,09:30,09:35,110,90\n" +
            "25,Suchindram,4,10:30,10:35,130,110";

        Map<String, List<String[]>> stopGroups = new LinkedHashMap<>();
        for (String line : stopsCsv.split("\n")) {
            if (line.trim().isEmpty()) continue;
            String[] parts = line.split(",");
            if (parts.length < 7) continue;
            String routeId = parts[0].trim();
            stopGroups.computeIfAbsent(routeId, k -> new ArrayList<>()).add(parts);
        }

        for (Map.Entry<String, List<String[]>> entry : stopGroups.entrySet()) {
            List<String[]> stops = entry.getValue();
            String source = stops.get(0)[1].trim();
            String destination = stops.get(stops.size() - 1)[1].trim();
            String routeName = source + " - " + destination;

            // Get or Create Route
            Route route = routeMap.get(routeName);
            if (route == null) {
                route = new Route(routeName, TransportType.BUS);
                routeRepository.save(route);
                routeMap.put(routeName, route);
            }

            // Add Stops
            route.getStops().clear();
            List<Bus.BusStop> busStops = new ArrayList<>();
            
            for (String[] stopParts : stops) {
                String stopName = stopParts[1].trim();
                int order = Integer.parseInt(stopParts[2].trim());
                LocalTime arrival = LocalTime.parse(stopParts[3].trim());
                LocalTime departure = LocalTime.parse(stopParts[4].trim());
                double distance = Double.parseDouble(stopParts[5].trim());
                double fare = Double.parseDouble(stopParts[6].trim());

                RouteStop rs = new RouteStop(stopName, order, arrival, departure);
                rs.setDistanceFromStart(distance);
                rs.setFareFromStart(fare);
                route.addStop(rs);
                
                busStops.add(new Bus.BusStop(stopName, arrival, departure, distance, fare));
            }
            routeRepository.save(route);

            // Create/Update 3 Buses for each detailed route with different timings
            for (int i = 0; i < 3; i++) {
                String busNumber = "TN-" + (1000 + (Integer.parseInt(entry.getKey()) * 10) + i);
                Bus bus = busRepository.findByBusNumber(busNumber);
                if (bus == null) {
                    bus = new Bus();
                    bus.setBusNumber(busNumber);
                    bus.setBusName((i == 0 ? "Early " : i == 1 ? "Day " : "Night ") + "Express " + entry.getKey());
                    bus.setBusType(i == 1 ? "AC Sleeper" : "Express");
                    bus.setOperator(i == 0 ? "TNSTC" : "Parveen Travels");
                    bus.setServiceType(i == 1 ? "AC" : "Non-AC");
                }
                
                bus.setFromLocation(source);
                bus.setToLocation(destination);
                
                // Shift timings for each bus
                int hourShift = i * 6; // 0, 6, 12 hours shift
                LocalTime baseDep = LocalTime.parse(stops.get(0)[4].trim());
                LocalTime baseArr = LocalTime.parse(stops.get(stops.size() - 1)[3].trim());
                
                bus.setDepartureTime(baseDep.plusHours(hourShift));
                bus.setArrivalTime(baseArr.plusHours(hourShift));
                bus.setFare(Double.parseDouble(stops.get(stops.size() - 1)[6].trim()) + (i * 50));
                bus.setAvailableSeats(30 + (i * 5));
                bus.setTotalSeats(40);
                
                // Adjust stop timings for this specific bus
                List<Bus.BusStop> specificBusStops = new ArrayList<>();
                for (Bus.BusStop originalStop : busStops) {
                    specificBusStops.add(new Bus.BusStop(
                        originalStop.getStopName(),
                        originalStop.getArrivalTime().plusHours(hourShift),
                        originalStop.getDepartureTime().plusHours(hourShift),
                        originalStop.getDistanceFromStart(),
                        originalStop.getFareFromStart()
                    ));
                }
                
                bus.setIntermediateStops(specificBusStops);
                bus.setIsActive(true);
                bus = busRepository.save(bus);

                // Create TransitService for each bus
                TransitService ts = transitServiceRepository.findByServiceNumber(busNumber);
                if (ts == null) {
                    ts = new TransitService();
                    ts.setServiceNumber(busNumber);
                }
                ts.setRoute(route);
                ts.setServiceName(bus.getBusName());
                ts.setOperator(bus.getOperator());
                ts.setBaseFare(bus.getFare());
                ts.setAvailableSeats(bus.getAvailableSeats());
                ts.setTotalSeats(bus.getTotalSeats());
                ts.setCurrentStatus("Scheduled");
                transitServiceRepository.save(ts);
            }
        }

        System.out.println("🚆 Seeding Train Routes...");
        
        // 3. Train Routes
        String[] trainRoutes = {
            "T1,Pandian Express,12638,Chennai Egmore,Madurai Junction,TRAIN,MS,VM,VRI,TPJ,DG,MDU",
            "T2,Vaigai Express,12635,Chennai Egmore,Madurai Junction,TRAIN,MS,TBM,CGL,VM,VRI,TPJ,DG,MDU",
            "T3,Nellai Express,12631,Chennai Egmore,Tirunelveli Junction,TRAIN,MS,VM,VRI,TPJ,DG,MDU,TEN",
            "T4,Cheran Express,12673,Chennai Central,Coimbatore Junction,TRAIN,MAS,AJJ,KPD,JTJ,SA,ED,TUP,CBE",
            "T5,Kovai Express,12675,Chennai Central,Coimbatore Junction,TRAIN,MAS,AJJ,KPD,JTJ,SA,ED,TUP,CBE",
            "T6,Rockfort Express,12667,Chennai Egmore,Trichy Junction,TRAIN,MS,TBM,CGL,VM,VRI,ALU,TPJ"
        };

        Map<String, String> stationFullNames = new HashMap<>();
        stationFullNames.put("MS", "Chennai Egmore");
        stationFullNames.put("VM", "Villupuram Junction");
        stationFullNames.put("VRI", "Vriddhachalam Junction");
        stationFullNames.put("TPJ", "Tiruchirappalli Junction");
        stationFullNames.put("DG", "Dindigul Junction");
        stationFullNames.put("MDU", "Madurai Junction");
        stationFullNames.put("TBM", "Tambaram");
        stationFullNames.put("CGL", "Chengalpattu");
        stationFullNames.put("TEN", "Tirunelveli Junction");
        stationFullNames.put("MAS", "Chennai Central");
        stationFullNames.put("AJJ", "Arakkonam Junction");
        stationFullNames.put("KPD", "Vellore Katpadi");
        stationFullNames.put("JTJ", "Jolarpettai Junction");
        stationFullNames.put("SA", "Salem Junction");
        stationFullNames.put("ED", "Erode Junction");
        stationFullNames.put("TUP", "Tiruppur");
        stationFullNames.put("CBE", "Coimbatore Junction");
        stationFullNames.put("ALU", "Ariyalur");

        for (String tr : trainRoutes) {
            String[] parts = tr.split(",");
            String name = parts[1];
            String number = parts[2];
            String source = parts[3];
            String dest = parts[4];
            
            String routeName = source + " - " + dest + " (" + name + ")";
            Route route = routeRepository.findByRouteName(routeName);
            if (route == null) {
                route = new Route();
                route.setRouteName(routeName);
                route.setTransportType(TransportType.TRAIN);
                route = routeRepository.save(route);
            }
            
            // Add stops
            route.getStops().clear();
            LocalTime startTime = LocalTime.of(20, 0); // Default 8 PM start
            if (name.contains("Vaigai") || name.contains("Kovai")) startTime = LocalTime.of(13, 0); // Afternoon
            
            for (int i = 6; i < parts.length; i++) {
                String code = parts[i];
                String stationName = stationFullNames.getOrDefault(code, code);
                int order = i - 5;
                
                LocalTime arr = startTime.plusHours(order * 1).plusMinutes(i * 5);
                LocalTime dep = arr.plusMinutes(5);
                
                RouteStop rs = new RouteStop(stationName, order, arr, dep);
                rs.setDistanceFromStart(order * 100.0);
                rs.setFareFromStart(order * 80.0);
                route.addStop(rs);
            }
            routeRepository.save(route);
            
            // Create TransitService
            TransitService ts = transitServiceRepository.findByServiceNumber(number);
            if (ts == null) {
                ts = new TransitService();
                ts.setServiceNumber(number);
            }
            ts.setRoute(route);
            ts.setServiceName(name);
            ts.setOperator("Indian Railways");
            ts.setBaseFare(450.0);
            ts.setAvailableSeats(500);
            ts.setTotalSeats(1200);
            ts.setCurrentStatus("Scheduled");
            transitServiceRepository.save(ts);
        }

        System.out.println("✅ Data initialization completed successfully!");
    }
}
