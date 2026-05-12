-- ============================================================
-- ADU Canteen DB Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS adu_canteen_db;
USE adu_canteen_db;

-- ── Users ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       ENUM('user', 'admin') DEFAULT 'user',
  studentId  VARCHAR(50),
  phone      VARCHAR(20),
  createdAt  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Foods ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS foods (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(150) NOT NULL,
  description  TEXT,
  price        DECIMAL(10,2) NOT NULL,
  image        VARCHAR(500),
  prepTime     INT DEFAULT 10,
  category     ENUM('Breakfast','Lunch','Snacks','Beverages','Desserts') NOT NULL,
  isVegetarian TINYINT(1) DEFAULT 1,
  isAvailable  TINYINT(1) DEFAULT 1,
  badge        VARCHAR(50),
  rating       DECIMAL(3,1) DEFAULT 4.5,
  createdAt    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Time Slots ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS time_slots (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  time      VARCHAR(50) NOT NULL,
  capacity  INT NOT NULL DEFAULT 25,
  booked    INT NOT NULL DEFAULT 0,
  active    TINYINT(1) DEFAULT 1,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── Orders ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  orderId      VARCHAR(20),
  userId       INT,
  total        DECIMAL(10,2) NOT NULL,
  status       ENUM('Pending','Preparing','Ready','Completed','Cancelled') DEFAULT 'Pending',
  timeSlotId   INT,
  timeSlot     VARCHAR(50),
  instructions TEXT,
  createdAt    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt    DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (timeSlotId) REFERENCES time_slots(id) ON DELETE SET NULL
);

-- ── Order Items ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  orderId   INT NOT NULL,
  foodId    INT,
  name      VARCHAR(150) NOT NULL,
  quantity  INT NOT NULL DEFAULT 1,
  price     DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (foodId) REFERENCES foods(id) ON DELETE SET NULL
);
