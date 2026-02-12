package com.payanam.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SearchRequest {
    private String from;
    private String to;
    private String type;
    private LocalDate date;
    private String vehicleType;
}