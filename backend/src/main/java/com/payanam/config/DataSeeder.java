package com.payanam.config;

import com.payanam.entity.*;
import com.payanam.repository.*;
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
    
    @Autowired private RouteRepository routeRepository;
    @Autowired private TransitServiceRepository transitServiceRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ExplorePlaceRepository explorePlaceRepository;
    @Autowired private VehicleServiceRepository vehicleServiceRepository;
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("🚀 STARTING ENHANCED DATA SEEDER...");
        
        if (routeRepository.count() == 0) {
            seedRoutesAndServices();
        }
        
        if (explorePlaceRepository.count() == 0) {
            seedExplorePlaces();
        }
        
        if (vehicleServiceRepository.count() == 0) {
            seedVehicleServices();
        }

        if (userRepository.count() == 0) {
            seedUsers();
        }

        System.out.println("✅ Data seeding completed!");
    }
    
    private void seedRoutesAndServices() {
        // Route 1: Chennai to Madurai
        Route chennaiToMadurai = new Route("Chennai to Madurai (Night Service)", TransportType.BUS);
        chennaiToMadurai.addStop(createStop("Chennai Koyambedu", 1, "21:00:00", "21:00:00", 0.0, 0.0));
        chennaiToMadurai.addStop(createStop("Chengalpattu", 2, "22:30:00", "22:40:00", 60.0, 80.0));
        chennaiToMadurai.addStop(createStop("Viluppuram Bus Stand", 3, "00:30:00", "00:45:00", 160.0, 220.0));
        chennaiToMadurai.addStop(createStop("Trichy Central", 4, "03:00:00", "03:15:00", 320.0, 380.0));
        chennaiToMadurai.addStop(createStop("Madurai Periyar", 5, "05:30:00", "05:30:00", 450.0, 450.0));
        routeRepository.save(chennaiToMadurai);

        transitServiceRepository.save(createService(chennaiToMadurai, "TN 01 N 1001", "TNSTC Ultra Deluxe", "TNSTC", 450.0, 30, 40, "Running"));
        transitServiceRepository.save(createService(chennaiToMadurai, "TN 01 N 1002", "SETC AC Sleeper", "SETC", 750.0, 15, 30, "Scheduled"));

        // Route 2: Chennai to Coimbatore
        Route chennaiToCbe = new Route("Chennai to Coimbatore (Salem Route)", TransportType.BUS);
        chennaiToCbe.addStop(createStop("Chennai Koyambedu", 1, "20:00:00", "20:00:00", 0.0, 0.0));
        chennaiToCbe.addStop(createStop("Vellore Katpadi", 2, "23:00:00", "23:15:00", 140.0, 150.0));
        chennaiToCbe.addStop(createStop("Salem New Bus Stand", 3, "02:30:00", "02:45:00", 340.0, 350.0));
        chennaiToCbe.addStop(createStop("Erode Bus Stand", 4, "04:00:00", "04:15:00", 400.0, 420.0));
        chennaiToCbe.addStop(createStop("Coimbatore Ukkadam", 5, "06:00:00", "06:00:00", 500.0, 520.0));
        routeRepository.save(chennaiToCbe);

        transitServiceRepository.save(createService(chennaiToCbe, "TN 38 N 4001", "SETC Classic", "SETC", 520.0, 35, 40, "Running"));

        // Route 3: Coimbatore to Madurai
        Route cbeToMadurai = new Route("Coimbatore to Madurai (Dindigul Route)", TransportType.BUS);
        cbeToMadurai.addStop(createStop("Coimbatore Ukkadam", 1, "07:00:00", "07:00:00", 0.0, 0.0));
        cbeToMadurai.addStop(createStop("Pollachi", 2, "08:15:00", "08:25:00", 45.0, 40.0));
        cbeToMadurai.addStop(createStop("Palani Bus Stand", 3, "09:45:00", "10:00:00", 100.0, 90.0));
        cbeToMadurai.addStop(createStop("Dindigul Bus Stand", 4, "11:30:00", "11:45:00", 160.0, 150.0));
        cbeToMadurai.addStop(createStop("Madurai Periyar", 5, "13:00:00", "13:00:00", 220.0, 210.0));
        routeRepository.save(cbeToMadurai);

        transitServiceRepository.save(createService(cbeToMadurai, "TN 33 N 5001", "TNSTC Express", "TNSTC", 210.0, 40, 40, "Running"));

        // Route 4: Madurai to Kanyakumari
        Route maduraiToKk = new Route("Madurai to Kanyakumari (NH 44)", TransportType.BUS);
        maduraiToKk.addStop(createStop("Madurai Periyar", 1, "10:00:00", "10:00:00", 0.0, 0.0));
        maduraiToKk.addStop(createStop("Virudhunagar Bus Stand", 2, "11:15:00", "11:25:00", 55.0, 50.0));
        maduraiToKk.addStop(createStop("Tirunelveli New Bus Stand", 3, "13:45:00", "14:00:00", 160.0, 150.0));
        maduraiToKk.addStop(createStop("Nagercoil Bus Stand", 4, "15:30:00", "15:45:00", 230.0, 220.0));
        maduraiToKk.addStop(createStop("Kanniyakumari Bus Stand", 5, "16:30:00", "16:30:00", 250.0, 240.0));
        routeRepository.save(maduraiToKk);

        transitServiceRepository.save(createService(maduraiToKk, "TN 72 N 6001", "TNSTC Deluxe", "TNSTC", 240.0, 25, 42, "Running"));

        // Route 5: Salem to Hosur
        Route salemToHosur = new Route("Salem to Hosur (Industrial Route)", TransportType.BUS);
        salemToHosur.addStop(createStop("Salem New Bus Stand", 1, "08:00:00", "08:00:00", 0.0, 0.0));
        salemToHosur.addStop(createStop("Dharmapuri Bus Stand", 2, "09:30:00", "09:45:00", 65.0, 60.0));
        salemToHosur.addStop(createStop("Krishnagiri Bus Stand", 3, "11:00:00", "11:15:00", 115.0, 110.0));
        salemToHosur.addStop(createStop("Hosur Bus Stand", 4, "12:30:00", "12:30:00", 165.0, 160.0));
        routeRepository.save(salemToHosur);

        transitServiceRepository.save(createService(salemToHosur, "TN 24 N 7001", "TNSTC 1 to 1", "TNSTC", 160.0, 42, 42, "Running"));

        // Route 6: Trichy to Karaikudi
        Route trichyToKaraikudi = new Route("Trichy to Karaikudi (Moffusil)", TransportType.BUS);
        trichyToKaraikudi.addStop(createStop("Trichy Central", 1, "06:00:00", "06:00:00", 0.0, 0.0));
        trichyToKaraikudi.addStop(createStop("Pudukkottai Bus Stand", 2, "07:30:00", "07:45:00", 55.0, 45.0));
        trichyToKaraikudi.addStop(createStop("Karaikudi New Bus Stand", 3, "09:30:00", "09:30:00", 100.0, 85.0));
        routeRepository.save(trichyToKaraikudi);

        transitServiceRepository.save(createService(trichyToKaraikudi, "TN 45 N 2001", "TNSTC Ordinary", "TNSTC", 85.0, 42, 42, "Scheduled"));

        // Train 1: Pandian Express
        Route pandianExpress = new Route("Pandian Express", TransportType.TRAIN);
        pandianExpress.addStop(createStop("Chennai Egmore", 1, "21:40:00", "21:40:00", 0.0, 0.0));
        pandianExpress.addStop(createStop("Tambaram", 2, "22:00:00", "22:10:00", 25.0, 50.0));
        pandianExpress.addStop(createStop("Trichy Junction", 3, "04:00:00", "04:10:00", 340.0, 240.0));
        pandianExpress.addStop(createStop("Madurai Junction", 4, "06:30:00", "06:30:00", 495.0, 320.0));
        routeRepository.save(pandianExpress);

        transitServiceRepository.save(createService(pandianExpress, "12637", "Pandian Express", "Indian Railways", 320.0, 120, 800, "Running"));
    }

    private void seedExplorePlaces() {
        ExplorePlace marina = new ExplorePlace();
        marina.setName("Marina Beach");
        marina.setCity("Chennai");
        marina.setCategory("beach");
        marina.setDescription("Second longest urban beach in the world.");
        marina.setImageUrl("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800");
        marina.setRating(4.5);
        explorePlaceRepository.save(marina);

        ExplorePlace meenakshi = new ExplorePlace();
        meenakshi.setName("Meenakshi Amman Temple");
        meenakshi.setCity("Madurai");
        meenakshi.setCategory("temple");
        meenakshi.setDescription("Historic Hindu temple dedicated to Meenakshi and Sundareshwarar.");
        meenakshi.setImageUrl("https://images.unsplash.com/photo-1600100397561-433ff984dd93?auto=format&fit=crop&q=80&w=800");
        meenakshi.setRating(4.8);
        explorePlaceRepository.save(meenakshi);

        ExplorePlace kanyakumari = new ExplorePlace();
        kanyakumari.setName("Vivekananda Rock Memorial");
        kanyakumari.setCity("Kanniyakumari");
        kanyakumari.setCategory("memorial");
        kanyakumari.setDescription("Popular tourist monument in Vavathurai, Kanyakumari.");
        kanyakumari.setImageUrl("https://images.unsplash.com/photo-1589197331516-4d839633b42a?auto=format&fit=crop&q=80&w=800");
        kanyakumari.setRating(4.7);
        explorePlaceRepository.save(kanyakumari);
    }

    private void seedVehicleServices() {
        VehicleServiceItem car1 = new VehicleServiceItem();
        car1.setName("Quick Car Rentals");
        car1.setType("rental");
        car1.setVehicleType("car");
        car1.setCity("Chennai");
        car1.setPhone("+91 9876543210");
        car1.setPrice("₹1,200/day");
        car1.setRating(4.3);
        car1.setServices("Manual, Automatic, Diesel, Petrol");
        vehicleServiceRepository.save(car1);

        VehicleServiceItem shop1 = new VehicleServiceItem();
        shop1.setName("Auto Care Workshop");
        shop1.setType("workshop");
        shop1.setCity("Trichy");
        shop1.setPhone("+91 9876543211");
        shop1.setRating(4.5);
        shop1.setServices("Oil Change, Tire Repair, Engine check");
        vehicleServiceRepository.save(shop1);
    }

    private void seedUsers() {
        User guest = new User();
        guest.setEmail("guest@payanam.com");
        guest.setPassword("guest123");
        guest.setFullName("Guest User");
        userRepository.save(guest);
    }

    private RouteStop createStop(String name, Integer order, String arr, String dep, Double dist, Double fare) {
        RouteStop stop = new RouteStop();
        stop.setStopName(name);
        stop.setStopOrder(order);
        stop.setArrivalTime(LocalTime.parse(arr));
        stop.setDepartureTime(LocalTime.parse(dep));
        stop.setDistanceFromStart(dist);
        stop.setFareFromStart(fare);
        return stop;
    }

    private TransitService createService(Route route, String number, String name, String operator, Double fare, Integer available, Integer total, String status) {
        TransitService service = new TransitService();
        service.setRoute(route);
        service.setServiceNumber(number);
        service.setServiceName(name);
        service.setOperator(operator);
        service.setBaseFare(fare);
        service.setAvailableSeats(available);
        service.setTotalSeats(total);
        service.setCurrentStatus(status);
        return service;
    }
}