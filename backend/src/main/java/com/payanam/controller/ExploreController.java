package com.payanam.controller;

import com.payanam.entity.ExplorePlace;
import com.payanam.service.ExploreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/explore")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ExploreController {

    @Autowired
    private ExploreService exploreService;

    @GetMapping("/places")
    public ResponseEntity<List<ExplorePlace>> getAllPlaces() {
        return ResponseEntity.ok(exploreService.getAllPlaces());
    }

    @GetMapping("/places/city/{city}")
    public ResponseEntity<List<ExplorePlace>> getPlacesByCity(@PathVariable String city) {
        return ResponseEntity.ok(exploreService.getPlacesByCity(city));
    }
}
