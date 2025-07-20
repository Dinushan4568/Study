-- Gramasewaka Village Management System - SQL Server 2008 Schema
-- Converted from MySQL to SQL Server syntax

-- Drop tables if they exist
IF OBJECT_ID('users', 'U') IS NOT NULL DROP TABLE users;
IF OBJECT_ID('update_requests', 'U') IS NOT NULL DROP TABLE update_requests;
IF OBJECT_ID('land_records', 'U') IS NOT NULL DROP TABLE land_records;
IF OBJECT_ID('household_members', 'U') IS NOT NULL DROP TABLE household_members;
IF OBJECT_ID('households', 'U') IS NOT NULL DROP TABLE households;
IF OBJECT_ID('individuals', 'U') IS NOT NULL DROP TABLE individuals;

-- Table: households
CREATE TABLE households (
  house_number NVARCHAR(20) NOT NULL PRIMARY KEY,
  family_name NVARCHAR(100) NULL,
  address NVARCHAR(MAX) NULL
);

-- Table: individuals
CREATE TABLE individuals (
  nic NVARCHAR(12) NOT NULL PRIMARY KEY,
  full_name NVARCHAR(100) NULL,
  short_name NVARCHAR(50) NULL,
  gender NVARCHAR(10) NULL, -- was ENUM
  address NVARCHAR(MAX) NULL,
  mobile NVARCHAR(15) NULL,
  birthdate DATE NULL,
  job NVARCHAR(MAX) NULL,
  married BIT NULL, -- was tinyint(1)
  image_url NVARCHAR(MAX) NULL,
  qualifications NVARCHAR(MAX) NULL,
  land_id NVARCHAR(50) NULL,
  documents NVARCHAR(MAX) NULL
);

-- Table: land_records
CREATE TABLE land_records (
  land_id NVARCHAR(50) NOT NULL PRIMARY KEY,
  size FLOAT NULL,
  location NVARCHAR(MAX) NULL,
  usage_type NVARCHAR(50) NULL,
  owner_nic NVARCHAR(12) NULL
);

-- Table: household_members
CREATE TABLE household_members (
  nic NVARCHAR(12) NOT NULL,
  house_number NVARCHAR(20) NOT NULL,
  PRIMARY KEY (nic, house_number)
);

-- Table: update_requests
CREATE TABLE update_requests (
  request_id INT IDENTITY(1,1) PRIMARY KEY,
  requested_by INT NULL,
  target_nic NVARCHAR(12) NULL,
  field_to_update NVARCHAR(50) NULL,
  old_value NVARCHAR(MAX) NULL,
  new_value NVARCHAR(MAX) NULL,
  status NVARCHAR(20) DEFAULT 'pending', -- was enum
  requested_at DATETIME DEFAULT GETDATE()
);

-- Table: users
CREATE TABLE users (
  user_id INT IDENTITY(1,1) PRIMARY KEY,
  username NVARCHAR(50) NOT NULL UNIQUE,
  password NVARCHAR(255) NOT NULL,
  role NVARCHAR(20) NOT NULL, -- was enum
  nic NVARCHAR(12) NULL,
  email NVARCHAR(100) NULL
);

-- Foreign keys
ALTER TABLE household_members ADD CONSTRAINT fk_hhmem_nic FOREIGN KEY (nic) REFERENCES individuals(nic) ON DELETE CASCADE;
ALTER TABLE household_members ADD CONSTRAINT fk_hhmem_house FOREIGN KEY (house_number) REFERENCES households(house_number) ON DELETE CASCADE;
ALTER TABLE individuals ADD CONSTRAINT fk_ind_land FOREIGN KEY (land_id) REFERENCES land_records(land_id) ON DELETE SET NULL;
ALTER TABLE land_records ADD CONSTRAINT fk_land_owner FOREIGN KEY (owner_nic) REFERENCES individuals(nic) ON DELETE SET NULL;
ALTER TABLE update_requests ADD CONSTRAINT fk_ur_user FOREIGN KEY (requested_by) REFERENCES users(user_id) ON DELETE CASCADE;
ALTER TABLE update_requests ADD CONSTRAINT fk_ur_nic FOREIGN KEY (target_nic) REFERENCES individuals(nic) ON DELETE CASCADE;
ALTER TABLE users ADD CONSTRAINT fk_users_nic FOREIGN KEY (nic) REFERENCES individuals(nic) ON DELETE SET NULL;

-- Example admin user (password must be a hash)
-- INSERT INTO users (username, password, role, nic, email) VALUES ('admin', '<hash>', 'admin', NULL, '');
