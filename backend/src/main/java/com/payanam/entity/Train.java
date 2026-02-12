package com.payanam.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "trains")
@Data
public class Train {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trainId;
    
    @Column(nullable = false)
    private String trainNumber;
    
    @Column(nullable = false)
    private String trainName;
    
    @Column(nullable = false)
    private String fromStation;
    
    @Column(nullable = false)
    private String toStation;
    
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    
    private String trainType; // Express, Superfast, Passenger, Rajdhani, Shatabdi
    private String coachType; // AC, Sleeper, General, Chair Car
    
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