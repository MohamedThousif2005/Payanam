package com.payanam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableScheduling
@RestController
public class PayanamApplication {

    public static void main(String[] args) {
        SpringApplication.run(PayanamApplication.class, args);
    }

    // Simple test endpoint
    @GetMapping("/")
    public String home() {
        return "🚀 PAYANAM Backend is running! Use /api/transport/health to check status.";
    }

    @GetMapping("/test")
    public String test() {
        return "✅ Test endpoint working! Backend is running on port 8090";
    }
}