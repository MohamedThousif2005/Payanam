package com.payanam.scheduler;

import com.payanam.service.scraper.TNSTCScraper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DataCollectionScheduler {
    
    @Autowired
    private TNSTCScraper tnstcScraper;
    
    // Run every 30 minutes to collect fresh data
    @Scheduled(fixedRate = 30 * 60 * 1000)
    public void collectTNSTCData() {
        System.out.println("🔄 Scheduled TNSTC data collection started...");
        
        try {
            // Attempt to scrape fresh data from TNSTC
            var busData = tnstcScraper.scrapeTNSTCWebsite();
            
            if (!busData.isEmpty()) {
                System.out.println("✅ Collected " + busData.size() + " bus records from TNSTC");
                // Here you would save the data to database
            } else {
                System.out.println("ℹ️ No new data collected from TNSTC");
            }
            
        } catch (Exception e) {
            System.err.println("❌ Error in scheduled data collection: " + e.getMessage());
        }
    }
}