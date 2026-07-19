package com.payanam.config;

import com.payanam.entity.ExplorePlace;
import com.payanam.repository.ExplorePlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Component
public class PlaceDataInitializer implements CommandLineRunner {

    @Autowired
    private ExplorePlaceRepository placeRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (placeRepository.count() > 30) {
            System.out.println("🗺️ Database already seeded with enough tourist places. Skipping.");
            return;
        }

        System.out.println("🚀 Starting data initialization for more tourist places...");

        List<ExplorePlace> places = Arrays.asList(
            // Chennai
            createPlace("Marina Beach", "Chennai", "beach", "The world's second longest urban beach, perfect for evening walks and street food.", "https://images.unsplash.com/photo-1590133322355-62a755d8dccd?auto=format&fit=crop&q=80&w=800", 4.5, "6 AM - 8 PM", "Free", Arrays.asList("Sunrise Views", "Beach Activities", "Local Food Stalls"), Arrays.asList("Murukku", "Bhel Puri", "Fresh Coconut Water")),
            createPlace("Kapaleeshwarar Temple", "Chennai", "temple", "A stunning 7th-century Dravidian temple dedicated to Lord Shiva, located in Mylapore.", "https://images.unsplash.com/photo-1600100397561-483ddefaa2b2?auto=format&fit=crop&q=80&w=800", 4.7, "6 AM - 12 PM, 4 PM - 8 PM", "Free", Arrays.asList("Dravidian Architecture", "Prayer Services", "Cultural Events"), Arrays.asList("Prasadam", "Temple Pond View")),
            createPlace("VGP Marine Kingdom", "Chennai", "park", "India's first and largest walk-through aquarium with an underwater tunnel.", "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800", 4.6, "9:30 AM - 8 PM", "₹695", Arrays.asList("Underwater Tunnel", "Shark Feeding", "Global Marine Life"), Arrays.asList("Underwater Walk", "Photography")),
            createPlace("Vandalur Zoo", "Chennai", "park", "Arignar Anna Zoological Park, one of the largest zoos in Southeast Asia.", "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=800", 4.4, "9 AM - 5 PM", "₹90", Arrays.asList("Safari", "White Tiger", "Butterfly Park"), Arrays.asList("Lion Safari", "Forest Walk")),
            
            // Madurai
            createPlace("Meenakshi Amman Temple", "Madurai", "temple", "An architectural marvel with 14 gopurams, famous for its intricate carvings and spiritual energy.", "https://images.unsplash.com/photo-1610123598147-f632aa18b275?auto=format&fit=crop&q=80&w=800", 4.9, "5 AM - 12:30 PM, 4 PM - 9:30 PM", "Free", Arrays.asList("Gopurams", "Golden Lotus Tank", "Evening Ceremony"), Arrays.asList("Prasadam", "Temple Art")),
            createPlace("Thirumalai Nayakkar Mahal", "Madurai", "historical", "A 17th-century palace built by King Thirumalai Nayak, known for its massive white pillars.", "https://images.unsplash.com/photo-1621344441053-294060852e96?auto=format&fit=crop&q=80&w=800", 4.4, "9 AM - 5 PM", "₹50", Arrays.asList("Crown Room", "Dance Hall", "Light & Sound Show"), Arrays.asList("Light Show", "Photography")),
            createPlace("Alagar Koyil", "Madurai", "temple", "A temple dedicated to Lord Vishnu, situated on a picturesque hill surrounded by greenery.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", 4.6, "6 AM - 8 PM", "Free", Arrays.asList("Hill Temple", "Natural Springs", "Architectural Beauty"), Arrays.asList("Dip in Spring", "Trekking")),
            
            // Coimbatore
            createPlace("Adiyogi Shiva Statue", "Coimbatore", "temple", "The world's largest bust sculpture, dedicated to the first yogi, located at the Isha Yoga Center.", "https://images.unsplash.com/photo-1544011501-a2ef25890c48?auto=format&fit=crop&q=80&w=800", 4.8, "6 AM - 8 PM", "Free", Arrays.asList("Massive Sculpture", "Meditation Hall", "Peaceful Environment"), Arrays.asList("Meditation", "Evening Aarti")),
            createPlace("Marudhamalai Temple", "Coimbatore", "temple", "A popular hill temple dedicated to Lord Murugan, offering panoramic views of the city.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", 4.6, "6 AM - 8 PM", "Free", Arrays.asList("Hill Location", "Architecture", "Spiritual Atmosphere"), Arrays.asList("Prasadam", "Hill View")),
            createPlace("Gass Forest Museum", "Coimbatore", "historical", "A government run natural history museum with unique collections of flora and fauna.", "https://images.unsplash.com/photo-1503455634946-1f068266d58d?auto=format&fit=crop&q=80&w=800", 4.3, "9 AM - 5:30 PM", "₹10", Arrays.asList("Timber Samples", "Wildlife Trophies", "Ancient Artifacts"), Arrays.asList("Guided Tour")),
            
            // Trichy
            createPlace("Srirangam Ranganathaswamy Temple", "Trichy", "temple", "One of the largest functioning religious complexes in the world, spread over 156 acres.", "https://images.unsplash.com/photo-1611002214172-792c1f90b59a?auto=format&fit=crop&q=80&w=800", 4.9, "6 AM - 9 PM", "Free", Arrays.asList("Vast Complex", "Gopurams", "River Views"), Arrays.asList("Prasadam", "Morning Prayer")),
            createPlace("Rockfort Temple", "Trichy", "historical", "An ancient temple perched on a massive 83-meter high rock, accessible by climbing 400+ steps.", "https://images.unsplash.com/photo-1611002214172-792c1f90b59a?auto=format&fit=crop&q=80&w=800", 4.7, "6 AM - 8 PM", "Free", Arrays.asList("Ancient Rock", "City View", "Temple History"), Arrays.asList("Climbing the Rock", "Photography")),
            createPlace("Kallanai Dam", "Trichy", "historical", "Also known as Grand Anicut, it is one of the oldest water-diversion structures in the world still in use.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800", 4.5, "All day", "Free", Arrays.asList("Engineering Marvel", "River View", "Picnic Spot"), Arrays.asList("Walk on Dam", "Fresh River Fish")),
            
            // Thanjavur
            createPlace("Brihadeeswara Temple", "Thanjavur", "historical", "A UNESCO World Heritage site, this Chola masterpiece is famous for its 216-foot tall vimana.", "https://images.unsplash.com/photo-1544011501-a2ef25890c48?auto=format&fit=crop&q=80&w=800", 5.0, "6 AM - 12:30 PM, 4 PM - 8:30 PM", "Free", Arrays.asList("Chola Architecture", "Massive Nandi", "Big Vimana"), Arrays.asList("Architecture Study", "Sunset Photography")),
            createPlace("Saraswathi Mahal Library", "Thanjavur", "historical", "One of the oldest libraries in Asia with a rare collection of manuscripts and books.", "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800", 4.6, "10 AM - 5:30 PM", "₹10", Arrays.asList("Rare Manuscripts", "Ancient Maps", "Museum Section"), Arrays.asList("Reading Section", "Exhibition")),
            
            // Kanyakumari
            createPlace("Vivekananda Rock Memorial", "Kanyakumari", "historical", "Built on a small rock island where Swami Vivekananda meditated, located at the confluence of three seas.", "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800", 4.8, "8 AM - 4 PM", "₹40", Arrays.asList("Meditation Hall", "Viewpoint", "Ferry Ride"), Arrays.asList("Sunrise View", "Ferry Experience")),
            createPlace("Padmanabhapuram Palace", "Kanyakumari", "historical", "A magnificent wooden palace of the 16th century, showcasing Kerala style architecture.", "https://images.unsplash.com/photo-1621344441053-294060852e96?auto=format&fit=crop&q=80&w=800", 4.7, "9 AM - 4:30 PM", "₹50", Arrays.asList("Wood Carvings", "Clock Tower", "Durbar Hall"), Arrays.asList("Guided Palace Walk")),
            
            // Ooty & Kodaikanal
            createPlace("Government Botanical Garden", "Ooty", "park", "A lush garden with over 1000 species of plants, famous for its annual flower show.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800", 4.5, "7 AM - 6:30 PM", "₹30", Arrays.asList("Flower Show", "Fossil Tree", "Italian Garden"), Arrays.asList("Flower Exhibition", "Nature Walk")),
            createPlace("Kodai Lake", "Kodaikanal", "park", "A star-shaped lake situated in the heart of the hill station, ideal for cycling and rowing.", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800", 4.6, "9 AM - 6 PM", "Free", Arrays.asList("Cycling Path", "Horse Riding", "Boating"), Arrays.asList("Cycling around lake", "Boating")),
            createPlace("Pillar Rocks", "Kodaikanal", "hill", "Three giant rock pillars standing vertically at a height of 400 feet.", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", 4.7, "9 AM - 4 PM", "₹5", Arrays.asList("Scenic View", "Cliffs", "Mist Views"), Arrays.asList("Photography", "Viewpoint")),
            createPlace("Coaker's Walk", "Kodaikanal", "hill", "A 1 km long paved pedestrian path along the edge of steep slopes.", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800", 4.5, "7 AM - 7 PM", "₹20", Arrays.asList("Panoramic View", "Valley View", "Telescope House"), Arrays.asList("Valley Viewing", "Morning Walk")),
            
            // Rameswaram
            createPlace("Ramanathaswamy Temple", "Rameswaram", "temple", "Famous for its longest corridor in the world and the 22 holy wells (tirthas) for ritual bathing.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", 4.8, "5 AM - 1 PM, 3 PM - 9 PM", "Free", Arrays.asList("Longest Corridor", "Holy Wells", "Ocean View"), Arrays.asList("Sea Bathing", "Holy Dip")),
            createPlace("Dhanushkodi Beach", "Rameswaram", "beach", "The ghost town at the edge of India where the Bay of Bengal meets the Indian Ocean.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800", 4.9, "6 AM - 6 PM", "Free", Arrays.asList("Confluence of Seas", "Old Ruins", "Pristine Beach"), Arrays.asList("4x4 Ride", "Photography")),
            
            // Others
            createPlace("Shore Temple", "Mahabalipuram", "historical", "An 8th-century granite temple built on the shores of the Bay of Bengal, a masterpiece of Pallava art.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", 4.7, "6 AM - 6 PM", "₹40", Arrays.asList("Stone Carvings", "Ocean Background", "UNESCO Site"), Arrays.asList("Ancient Art Study", "Beach Walk")),
            createPlace("Promenade Beach", "Pondicherry", "beach", "A 1.5 km long stretch of beach with a scenic walkway, statues, and cafes.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", 4.4, "All day", "Free", Arrays.asList("Scenic Walkway", "French Quarter", "Gandhi Statue"), Arrays.asList("Evening Stroll", "French Bakery")),
            createPlace("Airavatesvara Temple", "Kumbakonam", "historical", "A UNESCO World Heritage site known for its exquisite stone carvings and musical steps.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", 4.8, "6 AM - 8 PM", "Free", Arrays.asList("Musical Steps", "Stone Carvings", "Chola Art"), Arrays.asList("Art Photography")),
            createPlace("Nataraja Temple", "Chidambaram", "temple", "One of the most significant temples for Lord Shiva, represented here as the Lord of Dance.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", 4.7, "6 AM - 12 PM, 4 PM - 9 PM", "Free", Arrays.asList("Cosmic Dance Statue", "Gold Roof", "Ancient Rituals"), Arrays.asList("Evening Aarti", "Architecture Walk")),
            createPlace("Golden Temple", "Vellore", "temple", "A spiritual park spread over 100 acres, with a temple coated in 1500 kg of pure gold.", "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", 4.7, "8 AM - 8 PM", "Free", Arrays.asList("Golden Temple", "Massive Gardens", "Night Illumination"), Arrays.asList("Evening Walk", "Golden Glow View"))
        );

        for (ExplorePlace place : places) {
            ExplorePlace existing = placeRepository.findByName(place.getName());
            if (existing != null) {
                existing.setImageUrl(place.getImageUrl());
                existing.setCategory(place.getCategory());
                placeRepository.save(existing);
            } else {
                placeRepository.save(place);
            }
        }
        System.out.println("✅ Tourist places updated with accurate images!");
    }

    private ExplorePlace createPlace(String name, String city, String category, String description, String imageUrl, Double rating, String bestTime, String entryFee, List<String> highlights, List<String> mustTry) {
        ExplorePlace place = new ExplorePlace();
        place.setName(name);
        place.setCity(city);
        place.setCategory(category);
        place.setDescription(description);
        place.setImageUrl(imageUrl);
        place.setRating(rating);
        place.setBestTime(bestTime);
        place.setEntryFee(entryFee);
        place.setHighlights(highlights);
        place.setMustTry(mustTry);
        place.setLocation("https://www.google.com/maps/search/" + name.replace(" ", "+") + "+" + city);
        return place;
    }
}
