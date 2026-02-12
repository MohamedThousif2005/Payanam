package com.payanam.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Entity
@Table(name = "flights")
@Data
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long flightId;
    
    @Column(nullable = false)
    private String flightNumber;
    
    @Column(nullable = false)
    private String airline;
    
    @Column(nullable = false)
    private String fromAirport;
    
    @Column(nullable = false)
    private String toAirport;
    
    private String fromCity;
    private String toCity;
    
    private LocalDate departureDate;
    private LocalDate arrivalDate;
    
    private String departureTime;
    private String arrivalTime;
    
    private String flightClass; // Economy, Business, First
    private Double fare;
    private Integer availableSeats;
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}