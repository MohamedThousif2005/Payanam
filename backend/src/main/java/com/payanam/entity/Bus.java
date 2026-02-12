package com.payanam.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "buses")
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long busId;
    
    @Column(nullable = false, length = 50)
    private String busNumber;
    
    @Column(nullable = false, length = 100)
    private String busName;
    
    @Column(nullable = false, length = 20)
    private String busType;
    
    @Column(nullable = false, length = 50)
    private String operator;
    
    @Column(nullable = false, length = 20)
    private String serviceType;
    
    @Column(nullable = false, length = 100)
    private String fromLocation;
    
    @Column(nullable = false, length = 100)
    private String toLocation;
    
    @Column(nullable = false)
    private LocalTime departureTime;
    
    @Column(nullable = false)
    private LocalTime arrivalTime;
    
    @Column(nullable = false)
    private Double fare;
    
    @Column(nullable = false)
    private Integer availableSeats;
    
    @Column(nullable = false)
    private Integer totalSeats;
    
    @Column(length = 50)
    private String depotName;
    
    @Column(length = 20)
    private String routeNumber;
    
    @ElementCollection
    @CollectionTable(name = "bus_stops", joinColumns = @JoinColumn(name = "bus_id"))
    private List<BusStop> intermediateStops = new ArrayList<>();
    
    private Double currentLatitude;
    private Double currentLongitude;
    
    @Column(length = 20)
    private String currentStatus;
    
    private Integer delayMinutes;
    private LocalDateTime lastUpdated;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public Bus() {}
    
    // Getters and Setters
    public Long getBusId() { return busId; }
    public void setBusId(Long busId) { this.busId = busId; }
    
    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
    
    public String getBusName() { return busName; }
    public void setBusName(String busName) { this.busName = busName; }
    
    public String getBusType() { return busType; }
    public void setBusType(String busType) { this.busType = busType; }
    
    public String getOperator() { return operator; }
    public void setOperator(String operator) { this.operator = operator; }
    
    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
    
    public String getFromLocation() { return fromLocation; }
    public void setFromLocation(String fromLocation) { this.fromLocation = fromLocation; }
    
    public String getToLocation() { return toLocation; }
    public void setToLocation(String toLocation) { this.toLocation = toLocation; }
    
    public LocalTime getDepartureTime() { return departureTime; }
    public void setDepartureTime(LocalTime departureTime) { this.departureTime = departureTime; }
    
    public LocalTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalTime arrivalTime) { this.arrivalTime = arrivalTime; }
    
    public Double getFare() { return fare; }
    public void setFare(Double fare) { this.fare = fare; }
    
    public Integer getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(Integer availableSeats) { this.availableSeats = availableSeats; }
    
    public Integer getTotalSeats() { return totalSeats; }
    public void setTotalSeats(Integer totalSeats) { this.totalSeats = totalSeats; }
    
    public String getDepotName() { return depotName; }
    public void setDepotName(String depotName) { this.depotName = depotName; }
    
    public String getRouteNumber() { return routeNumber; }
    public void setRouteNumber(String routeNumber) { this.routeNumber = routeNumber; }
    
    public List<BusStop> getIntermediateStops() { return intermediateStops; }
    public void setIntermediateStops(List<BusStop> intermediateStops) { this.intermediateStops = intermediateStops; }
    
    public Double getCurrentLatitude() { return currentLatitude; }
    public void setCurrentLatitude(Double currentLatitude) { this.currentLatitude = currentLatitude; }
    
    public Double getCurrentLongitude() { return currentLongitude; }
    public void setCurrentLongitude(Double currentLongitude) { this.currentLongitude = currentLongitude; }
    
    public String getCurrentStatus() { return currentStatus; }
    public void setCurrentStatus(String currentStatus) { this.currentStatus = currentStatus; }
    
    public Integer getDelayMinutes() { return delayMinutes; }
    public void setDelayMinutes(Integer delayMinutes) { this.delayMinutes = delayMinutes; }
    
    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
    
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
    }
    
    // Inner class for bus stops
    @Embeddable
    public static class BusStop {
        private String stopName;
        private LocalTime arrivalTime;
        private LocalTime departureTime;
        private Double distanceFromStart;
        private Double fareFromStart;
        
        public BusStop() {}
        
        public BusStop(String stopName, LocalTime arrivalTime, LocalTime departureTime, 
                      Double distanceFromStart, Double fareFromStart) {
            this.stopName = stopName;
            this.arrivalTime = arrivalTime;
            this.departureTime = departureTime;
            this.distanceFromStart = distanceFromStart;
            this.fareFromStart = fareFromStart;
        }
        
        // Getters and Setters for BusStop
        public String getStopName() { return stopName; }
        public void setStopName(String stopName) { this.stopName = stopName; }
        
        public LocalTime getArrivalTime() { return arrivalTime; }
        public void setArrivalTime(LocalTime arrivalTime) { this.arrivalTime = arrivalTime; }
        
        public LocalTime getDepartureTime() { return departureTime; }
        public void setDepartureTime(LocalTime departureTime) { this.departureTime = departureTime; }
        
        public Double getDistanceFromStart() { return distanceFromStart; }
        public void setDistanceFromStart(Double distanceFromStart) { this.distanceFromStart = distanceFromStart; }
        
        public Double getFareFromStart() { return fareFromStart; }
        public void setFareFromStart(Double fareFromStart) { this.fareFromStart = fareFromStart; }
    }
}