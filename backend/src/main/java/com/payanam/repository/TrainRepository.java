package com.payanam.repository;

import com.payanam.entity.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {
    List<Train> findByFromStationAndToStationAndIsActiveTrue(String fromStation, String toStation);
    List<Train> findByTrainTypeAndIsActiveTrue(String trainType);
    List<Train> findByIsActiveTrue();
}