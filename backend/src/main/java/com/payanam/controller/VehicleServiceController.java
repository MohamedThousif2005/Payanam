package com.payanam.controller;

import com.payanam.entity.VehicleServiceItem;
import com.payanam.service.VehicleServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicle-services")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class VehicleServiceController {

    @Autowired
    private VehicleServiceService vehicleServiceService;

    @GetMapping
    public ResponseEntity<List<VehicleServiceItem>> getAllItems() {
        return ResponseEntity.ok(vehicleServiceService.getAllItems());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<VehicleServiceItem>> getItemsByType(@PathVariable String type) {
        return ResponseEntity.ok(vehicleServiceService.getItemsByType(type));
    }
}
