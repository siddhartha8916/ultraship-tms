-- Create the database
CREATE DATABASE ultraship_tms_db;

-- Connect to the Database
\c ultraship_tms_db;

CREATE SCHEMA IF NOT EXISTS tms_schema;

-- Drop tables if they exist (for development/reset purposes)
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
  updated_at TIMESTAMP
  role VARCHAR(50) NOT NULL CONSTRAINT role_check CHECK (role IN ('admin', 'employee')),
);


-- 2. Employees table (extends users)
CREATE TABLE tms_schema.employees (
  user_id            UUID PRIMARY KEY,
  job_title          VARCHAR(100) NOT NULL,
  department         VARCHAR(100),
  hire_date          DATE NOT NULL,
  employment_type    VARCHAR(50),
  employee_status    VARCHAR(50),
  work_location      VARCHAR(100),
  salary             DECIMAL(10, 2),
  bonus              DECIMAL(10, 2),
  bank_account       VARCHAR(50),
  benefits_eligible  BOOLEAN DEFAULT FALSE,
  leave_balance      INT DEFAULT 0,
  work_shift         VARCHAR(50),
  created_at         TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP,

  -- Foreign key to users table
  CONSTRAINT fk_employee_user
    FOREIGN KEY (user_id)
    REFERENCES tms_schema.users(id)
    ON DELETE CASCADE
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