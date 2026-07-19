package com.payanam.repository;

import com.payanam.entity.ExplorePlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExplorePlaceRepository extends JpaRepository<ExplorePlace, Long> {
    List<ExplorePlace> findByCity(String city);
    ExplorePlace findByName(String name);
}
