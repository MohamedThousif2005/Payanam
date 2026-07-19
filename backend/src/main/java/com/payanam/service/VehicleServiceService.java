package com.payanam.service;

import com.payanam.entity.VehicleServiceItem;
import com.payanam.repository.VehicleServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VehicleServiceService {
    @Autowired
    private VehicleServiceRepository vehicleServiceRepository;

    public List<VehicleServiceItem> getAllItems() {
        return vehicleServiceRepository.findAll();
    }

    public List<VehicleServiceItem> getItemsByType(String type) {
        return vehicleServiceRepository.findByType(type);
    }
}
