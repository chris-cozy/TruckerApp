-- Users table for authentication and authorization
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('driver', 'sponsor', 'admin')),
);
-- Addresses table
CREATE TABLE Addresses (
    address_id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zipcode VARCHAR(10) NOT NULL
);
-- Drivers table
CREATE TABLE Drivers (
    user_id INT PRIMARY KEY REFERENCES Users(user_id),
    vehicle_id INT REFERENCES Vehicles(vehicle_id),
    sponsor_id INT REFERENCES Sponsors(user_id),
    address_id INT REFERENCES addresses(address_id),
    biography TEXT NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    date_of_birth DATE NOT NULL,
    drivers_license_number VARCHAR(20) NOT NULL,
    cdl_class VARCHAR(10) NOT NULL,
    years_of_experience INT NOT NULL DEFAULT 0,
    accident_count INT NOT NULL DEFAULT 0,
    violation_count INT NOT NULL DEFAULT 0,
    suspended_license_incident BOOLEAN NOT NULL DEFAULT FALSE,
    point_balance INT NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
-- Sponsors table
CREATE TABLE Sponsors (
    user_id INT PRIMARY KEY REFERENCES Users(user_id),
    organization_id INT NOT NULL REFERENCES Organizations(organization_id),
    biography TEXT NOT NULL,
    phone_number VARCHAR(15) NOT NULL
);
-- Admins table
CREATE TABLE Admins (
    user_id INT PRIMARY KEY REFERENCES Users(user_id)
);
-- Organizations table
CREATE TABLE Organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    biography TEXT NOT NULL,
    address_id INT REFERENCES Addresses(address_id)
);
-- Vehicles table
CREATE TABLE Vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    vehicle_type VARCHAR(50) NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    license_plate VARCHAR(20) NOT NULL UNIQUE,
    registration_expiry DATE NOT NULL,
    insurance_provider VARCHAR(100) NOT NULL,
    insurance_policy_number VARCHAR(50) NOT NULL,
    insurance_policy_expiry DATE NOT NULL
);
-- Applications table
CREATE TABLE Applications (
    application_id SERIAL PRIMARY KEY,
    driver_id INT NOT NULL REFERENCES Drivers(user_id),
    sponsor_id INT NOT NULL REFERENCES Sponsors(user_id),
    reason_for_sponsorship TEXT NOT NULL,
    terms_agreement BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (sponsor_id, driver_id)
);
-- Product Categories table
CREATE TABLE ProductCategories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL
);
-- Products table
CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    condition VARCHAR(20) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL REFERENCES ProductCategories(category_id)
);
-- Sponsor-Product Relationship table
CREATE TABLE SponsorInventory (
    inventory_id SERIAL PRIMARY KEY,
    sponsor_id INT NOT NULL REFERENCES Sponsors(user_id),
    product_id INT NOT NULL REFERENCES Products(product_id),
    UNIQUE (sponsor_id, product_id)
);
-- Points table
CREATE TABLE Points (
    point_id SERIAL PRIMARY KEY,
    driver_id INT NOT NULL REFERENCES Drivers(user_id),
    sponsor_id INT NOT NULL REFERENCES Sponsors(user_id),
    amount INT NOT NULL,
    reason TEXT NOT NULL,
    date TIMESTAMP NOT NULL
);
-- Orders table
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    driver_id INT NOT NULL REFERENCES Drivers(user_id),
    points_cost INT NOT NULL,
    usd_cost DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP NOT NULL
);
-- Order Products
CREATE TABLE OrderProducts (
    order_product_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES Orders(order_id),
    product_id INT NOT NULL REFERENCES Prodcuts(product_id),
    quantity INT NOT NULL,
    points_cost INT NOT NULL,
    UNIQUE(order_id, product_id)
);