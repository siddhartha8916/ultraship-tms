-- Create the database
CREATE DATABASE ultraship_tms_db;

-- Connect to the Database
\c ultraship_tms_db;

CREATE SCHEMA IF NOT EXISTS tms_schema;

-- Drop tables if they exist (for development/reset purposes)
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS employee_classes;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;

-- 1. Users table
CREATE TABLE tms_schema.users (
  id UUID PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  middle_name VARCHAR(255),
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL
);


-- 2. Employees table (extends users)
CREATE TABLE tms_schema.employees (
  id UUID PRIMARY KEY, 
  user_id UUID NOT NULL UNIQUE,
  hire_date DATE,
  FOREIGN KEY (user_id) REFERENCES tms_schema.users(id) ON DELETE CASCADE
);

-- 3. Classes table
CREATE TABLE tms_schema.classes (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subject VARCHAR(100) NOT NULL
);

-- 4. Employee-to-Class mapping (many-to-many)
CREATE TABLE tms_schema.employee_classes (
  employee_id UUID NOT NULL,
  class_id UUID NOT NULL,
  PRIMARY KEY (employee_id, class_id),
  FOREIGN KEY (employee_id) REFERENCES tms_schema.employees(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES tms_schema.classes(id) ON DELETE CASCADE
);

-- 5. Attendance table
CREATE TABLE tms_schema.attendance (
  id UUID PRIMARY KEY,
  employee_id UUID NOT NULL,
  class_id UUID,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Absent', 'Late')),
  FOREIGN KEY (employee_id) REFERENCES tms_schema.employees(id),
  FOREIGN KEY (class_id) REFERENCES tms_schema.classes(id),
  UNIQUE (employee_id, date)
);


-- Create the user
CREATE USER tms_user WITH PASSWORD 'tms_pwd';

-- Grant connection to the database
GRANT CONNECT ON DATABASE ultraship_tms_db TO tms_user;

-- Create the public schema (if it doesn't already exist)
CREATE SCHEMA IF NOT EXISTS public;

-- Grant usage on the public schema
GRANT USAGE ON SCHEMA public TO tms_user;

-- Grant select on all tables in the public schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO tms_user;

-- Alter default privileges to grant select on new tables in the public schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO tms_user;

-- Grant USAGE and SELECT on all existing sequences in the public schema
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO tms_user;

-- Alter default privileges for new sequences in the public schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO tms_user;

-- Grant USAGE on the tms_schema
GRANT USAGE ON SCHEMA tms_schema TO tms_user;

-- Grant SELECT, INSERT, UPDATE, DELETE, REFERENCES on all existing tables in the tms_schema
GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON ALL TABLES IN SCHEMA tms_schema TO tms_user;

-- Alter default privileges for new tables in the tms_schema
ALTER DEFAULT PRIVILEGES IN SCHEMA tms_schema GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO tms_user;

-- Grant USAGE and SELECT on all existing sequences in the tms_schema
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA tms_schema TO tms_user;

-- Alter default privileges for new sequences in the tms_schema
ALTER DEFAULT PRIVILEGES IN SCHEMA tms_schema GRANT USAGE, SELECT ON SEQUENCES TO tms_user;