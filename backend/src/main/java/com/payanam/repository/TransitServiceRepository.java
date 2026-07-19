package com.payanam.repository;

import com.payanam.entity.TransitService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransitServiceRepository extends JpaRepository<TransitService, Long> {
    TransitService findByServiceNumber(String serviceNumber);
}
