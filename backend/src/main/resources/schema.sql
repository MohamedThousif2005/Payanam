-- Create buses table
CREATE TABLE IF NOT EXISTS buses (
    bus_id BIGSERIAL PRIMARY KEY,
    bus_number VARCHAR(50) NOT NULL,
    bus_name VARCHAR(100) NOT NULL,
    bus_type VARCHAR(20) NOT NULL,
    operator VARCHAR(50) NOT NULL,
    service_type VARCHAR(20) NOT NULL,
    from_location VARCHAR(100) NOT NULL,
    to_location VARCHAR(100) NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    fare DOUBLE PRECISION NOT NULL,
    available_seats INTEGER NOT NULL,
    total_seats INTEGER NOT NULL,
    depot_name VARCHAR(50),
    route_number VARCHAR(20),
    current_latitude DOUBLE PRECISION,
    current_longitude DOUBLE PRECISION,
    current_status VARCHAR(20),
    delay_minutes INTEGER,
    last_updated TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create bus_stops table for intermediate stops
CREATE TABLE IF NOT EXISTS bus_stops (
    bus_id BIGINT NOT NULL,
    stop_name VARCHAR(100),
    arrival_time TIME,
    departure_time TIME,
    distance_from_start DOUBLE PRECISION,
    fare_from_start DOUBLE PRECISION,
    FOREIGN KEY (bus_id) REFERENCES buses(bus_id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bus_from_location ON buses(from_location);
CREATE INDEX IF NOT EXISTS idx_bus_to_location ON buses(to_location);
CREATE INDEX IF NOT EXISTS idx_bus_operator ON buses(operator);
CREATE INDEX IF NOT EXISTS idx_bus_type ON buses(bus_type);
CREATE INDEX IF NOT EXISTS idx_bus_active ON buses(is_active);