package com.payanam.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
@Data
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;
    
    @Column(nullable = false)
    private String vehicleType; // car, bike, scooter
    
    @Column(nullable = false)
    private String vehicleName;
    
    @Column(nullable = false)
    private String brand;
    
    @Column(nullable = false)
    private String location;
    
    private String fuelType; // Petrol, Diesel, Electric
    private String transmission; // Manual, Automatic
    private Integer seats;
    private Double pricePerDay;
    private String features;
    
    @Column(nullable = false)
    private Boolean isAvailable = true;
    
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