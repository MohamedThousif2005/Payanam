package com.payanam.service;

import com.payanam.entity.ExplorePlace;
import com.payanam.repository.ExplorePlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExploreService {
    @Autowired
    private ExplorePlaceRepository explorePlaceRepository;

    public List<ExplorePlace> getAllPlaces() {
        return explorePlaceRepository.findAll();
    }

    public List<ExplorePlace> getPlacesByCity(String city) {
        return explorePlaceRepository.findByCity(city);
    }
}
