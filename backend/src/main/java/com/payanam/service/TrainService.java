package com.payanam.service;

import com.payanam.entity.Train;
import com.payanam.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TrainService {
    
    @Autowired
    private TrainRepository trainRepository;
    
    public List<Train> searchTrains(String from, String to) {
        return trainRepository.findByFromStationAndToStationAndIsActiveTrue(from, to);
    }
    
    public List<Train> getAllTrains() {
        return trainRepository.findByIsActiveTrue();
    }
    
    public Train saveTrain(Train train) {
        return trainRepository.save(train);
    }
}