package com.payanam.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "explore_places")
public class ExplorePlace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    private String category;

    @Column(length = 1000)
    private String description;

    private String imageUrl;

    private String location; // Map link or coordinate string

    private Double rating;

    private String bestTime;

    private String entryFee;

    @ElementCollection
    @CollectionTable(name = "place_highlights", joinColumns = @JoinColumn(name = "place_id"))
    @Column(name = "highlight")
    private java.util.List<String> highlights;

    @ElementCollection
    @CollectionTable(name = "place_must_try", joinColumns = @JoinColumn(name = "place_id"))
    @Column(name = "item")
    private java.util.List<String> mustTry;

    public ExplorePlace() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getBestTime() { return bestTime; }
    public void setBestTime(String bestTime) { this.bestTime = bestTime; }

    public String getEntryFee() { return entryFee; }
    public void setEntryFee(String entryFee) { this.entryFee = entryFee; }

    public java.util.List<String> getHighlights() { return highlights; }
    public void setHighlights(java.util.List<String> highlights) { this.highlights = highlights; }

    public java.util.List<String> getMustTry() { return mustTry; }
    public void setMustTry(java.util.List<String> mustTry) { this.mustTry = mustTry; }
}
