package com.payanam.service;

import com.payanam.entity.*;
import com.payanam.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EnhancedTransportService {

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private RouteStopRepository routeStopRepository;

    @Autowired
    private TransitServiceRepository transitServiceRepository;

    public List<Map<String, Object>> searchTransport(String from, String to, TransportType type) {
        List<Route> routes = routeRepository.findByTransportType(type);
        List<Map<String, Object>> results = new ArrayList<>();

        for (Route route : routes) {
            Optional<RouteStop> fromStopOpt = route.getStops().stream()
                    .filter(s -> s.getStopName().toLowerCase().contains(from.toLowerCase()))
                    .findFirst();

            Optional<RouteStop> toStopOpt = route.getStops().stream()
                    .filter(s -> s.getStopName().toLowerCase().contains(to.toLowerCase()))
                    .findFirst();

            if (fromStopOpt.isPresent() && toStopOpt.isPresent()) {
                RouteStop fromStop = fromStopOpt.get();
                RouteStop toStop = toStopOpt.get();

                if (fromStop.getStopOrder() < toStop.getStopOrder()) {
                    // Valid route
                    List<TransitService> services = transitServiceRepository.findAll().stream()
                            .filter(ts -> ts.getRoute().getId().equals(route.getId()))
                            .collect(Collectors.toList());

                    for (TransitService service : services) {
                        Map<String, Object> result = new HashMap<>();
                        result.put("serviceId", service.getId());
                        result.put("serviceNumber", service.getServiceNumber());
                        result.put("serviceName", service.getServiceName());
                        result.put("operator", service.getOperator());
                        result.put("fromStop", fromStop.getStopName());
                        result.put("toStop", toStop.getStopName());
                        result.put("departureTime", fromStop.getDepartureTime());
                        result.put("arrivalTime", toStop.getArrivalTime());
                        result.put("fare", calculateFare(service, fromStop, toStop));
                        result.put("availableSeats", service.getAvailableSeats());
                        result.put("status", service.getCurrentStatus());
                        result.put("routeStops", route.getStops());
                        
                        // Add real-time status
                        result.put("realTimeInfo", calculateRealTimeStatus(route.getStops()));
                        
                        results.add(result);
                    }
                }
            }
        }
        return results;
    }

    private Double calculateFare(TransitService service, RouteStop from, RouteStop to) {
        if (from.getFareFromStart() != null && to.getFareFromStart() != null) {
            return to.getFareFromStart() - from.getFareFromStart();
        }
        return service.getBaseFare();
    }

    public Map<String, Object> calculateRealTimeStatus(List<RouteStop> stops) {
        LocalTime now = LocalTime.now();
        Map<String, Object> status = new HashMap<>();
        
        stops.sort(Comparator.comparing(RouteStop::getStopOrder));
        
        RouteStop firstStop = stops.get(0);
        RouteStop lastStop = stops.get(stops.size() - 1);
        
        if (now.isBefore(firstStop.getDepartureTime())) {
            status.put("currentStatus", "Scheduled");
            status.put("position", "At " + firstStop.getStopName());
            status.put("nextStop", firstStop.getStopName());
            status.put("progress", 0);
            return status;
        }
        
        if (now.isAfter(lastStop.getArrivalTime())) {
            status.put("currentStatus", "Completed");
            status.put("position", "Arrived at " + lastStop.getStopName());
            status.put("progress", 100);
            return status;
        }
        
        for (int i = 0; i < stops.size(); i++) {
            RouteStop current = stops.get(i);
            
            // Check if currently at a stop
            if ((now.equals(current.getArrivalTime()) || now.isAfter(current.getArrivalTime())) && 
                (now.equals(current.getDepartureTime()) || now.isBefore(current.getDepartureTime()))) {
                status.put("currentStatus", "At Stop");
                status.put("position", "At " + current.getStopName());
                status.put("nextStop", i < stops.size() - 1 ? stops.get(i+1).getStopName() : "Destination");
                status.put("progress", (int) (((double)i / (stops.size()-1)) * 100));
                return status;
            }
            
            // Check if between stops
            if (i < stops.size() - 1) {
                RouteStop next = stops.get(i + 1);
                if (now.isAfter(current.getDepartureTime()) && now.isBefore(next.getArrivalTime())) {
                    status.put("currentStatus", "Running");
                    status.put("position", "Between " + current.getStopName() + " and " + next.getStopName());
                    status.put("lastPassed", current.getStopName());
                    status.put("nextStop", next.getStopName());
                    status.put("eta", next.getArrivalTime());
                    
                    // Progress percentage between these two stops
                    long totalDuration = Duration.between(current.getDepartureTime(), next.getArrivalTime()).toMinutes();
                    long elapsed = Duration.between(current.getDepartureTime(), now).toMinutes();
                    double segmentProgress = (double) elapsed / totalDuration;
                    
                    int totalProgress = (int) ((((double)i + segmentProgress) / (stops.size()-1)) * 100);
                    status.put("progress", totalProgress);
                    return status;
                }
            }
        }
        
        status.put("currentStatus", "Unknown");
        return status;
    }
}
