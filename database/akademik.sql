-- Create Database
CREATE DATABASE IF NOT EXISTS akademik;
USE akademik;

-- Create Table Mahasiswa
CREATE TABLE IF NOT EXISTS mahasiswa (
  nim varchar(10) NOT NULL PRIMARY KEY,
  nama varchar(200) NOT NULL,
  jurusan varchar(20) NOT NULL,
  email varchar(50) NOT NULL,
  no_hp varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Sample Data (optional)
INSERT INTO mahasiswa (nim, nama, jurusan, email, no_hp) VALUES
('001', 'John Doe', 'Teknik Informatika', 'john@example.com', '081234567890'),
('002', 'Jane Smith', 'Sistem Informasi', 'jane@example.com', '081234567891'),
('003', 'Ahmad Rahman', 'Teknik Komputer', 'ahmad@example.com', '081234567892');
