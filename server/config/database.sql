-- Users table for authentication and authorization
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('driver', 'sponsor', 'admin')),
    -- Add any other user-specific columns here
);
-- Addresses table
CREATE TABLE addresses (
    address_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id),
    street VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    zipcode VARCHAR(10)
);
-- Drivers table
CREATE TABLE drivers (
    driver_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id),
    vehicle_id INT REFERENCES vehicles(vehicle_id),
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    biography TEXT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15),
    date_of_birth DATE,
    drivers_license_number VARCHAR(20),
    cdl_class VARCHAR(10),
    years_of_experience INT,
    accident_count INT,
    violation_count INT,
    suspended_license_incident BOOLEAN,
    point_balance INT
);
-- Sponsors table
CREATE TABLE sponsors (
    sponsor_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id),
    organization_id INT REFERENCES organizations(organization_id),
    biography TEXT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number VARCHAR(15)
);
-- Admins table
CREATE TABLE admins (
    admin_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id),
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);
-- Organizations table
CREATE TABLE organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    biography TEXT
);
-- Vehicles table
CREATE TABLE vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    vehicle_type VARCHAR(50),
    make VARCHAR(50),
    model VARCHAR(50),
    license_plate VARCHAR(20) UNIQUE,
    registration_expiry DATE,
    insurance_provider VARCHAR(100),
    insurance_policy_number VARCHAR(50),
    insurance_policy_expiry DATE
);
-- Applications table
CREATE TABLE applications (
    application_id SERIAL PRIMARY KEY,
    driver_id INT REFERENCES drivers(driver_id),
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    reason_for_sponsorship TEXT,
    terms_agreement BOOLEAN
);
-- Product Categories table
CREATE TABLE product_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);
-- Products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255),
    condition VARCHAR(20),
    price DECIMAL(10, 2),
    category_id INT REFERENCES product_categories(category_id)
);
-- Sponsor-Product Relationship table
CREATE TABLE sponsor_products (
    sponsor_product_id SERIAL PRIMARY KEY,
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    product_id INT REFERENCES products(product_id),
    UNIQUE (sponsor_id, product_id)
);
-- Points table
CREATE TABLE points (
    point_id SERIAL PRIMARY KEY,
    driver_id INT REFERENCES drivers(driver_id),
    sponsor_id INT REFERENCES sponsors(sponsor_id),
    amount INT,
    reason TEXT,
    date TIMESTAMP
);
-- Orders table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    driver_id INT REFERENCES drivers(driver_id),
    product_ids INT [],
    points_cost INT,
    usd_cost DECIMAL(10, 2),
    date TIMESTAMP
);