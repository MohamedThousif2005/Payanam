package com.payanam.repository;

import com.payanam.entity.Route;
import com.payanam.entity.TransportType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByTransportType(TransportType transportType);
    Route findByRouteName(String routeName);
}
