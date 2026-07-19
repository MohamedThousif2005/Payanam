package com.payanam.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicle_service_items")
public class VehicleServiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type; // rental, workshop, taxi

    private String vehicleType; // car, bike, scooter (for rentals)

    private String city;

    private String address;

    private String phone;

    private String price; // e.g., ₹1,200/day or ₹15/km

    private Double rating;

    @Column(length = 500)
    private String services; // Comma separated list of services

    public VehicleServiceItem() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }
}
