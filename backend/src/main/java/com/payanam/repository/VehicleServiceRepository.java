package com.payanam.repository;

import com.payanam.entity.VehicleServiceItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VehicleServiceRepository extends JpaRepository<VehicleServiceItem, Long> {
    List<VehicleServiceItem> findByType(String type);
    List<VehicleServiceItem> findByCity(String city);
}
