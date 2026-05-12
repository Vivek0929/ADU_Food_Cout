-- ============================================================
-- ADU Canteen Seed Data
-- Run after schema.sql
-- ============================================================

USE adu_canteen_db;

-- ── Admin user (password: admin@123) ──────────────────────
INSERT IGNORE INTO users (name, email, password, role, studentId) VALUES
('Canteen Admin', 'admin@adu.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'ADMIN001'),
('Vivekananda Chary', 'vivek@adu.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 'ADU20240901'),
('Pranav Subbareddy', 'pranav@adu.edu', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 'ADU20240902');

-- ── Food Items ─────────────────────────────────────────────
INSERT IGNORE INTO foods (name, description, price, image, prepTime, category, isVegetarian, isAvailable, badge, rating) VALUES
('Masala Dosa',       'Crispy dosa with spiced potato filling',          45,  'https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?w=400&h=300&fit=crop', 8,  'Breakfast',  1, 1, 'Bestseller', 4.5),
('Idli Sambar',       'Soft idlis with tangy sambar & chutney',          35,  'https://images.unsplash.com/photo-1668236499396-a62d2d1cb0cf?w=400&h=300&fit=crop', 5,  'Breakfast',  1, 1, NULL,         4.3),
('Poha',              'Light flattened rice with veggies & nuts',        25,  'https://images.unsplash.com/photo-1614247310314-c17f87b47ef9?w=400&h=300&fit=crop', 5,  'Breakfast',  1, 1, NULL,         4.2),
('Veg Biryani',       'Fragrant basmati rice with vegetables',           80,  'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?w=400&h=300&fit=crop', 15, 'Lunch',      1, 1, 'Popular',    4.6),
('Paneer Butter Masala','Creamy tomato curry with soft paneer',          90,  'https://images.unsplash.com/photo-1708793873401-e8c6c153b76a?w=400&h=300&fit=crop', 12, 'Lunch',      1, 1, "Chef's Pick",4.7),
('Dal Tadka',         'Yellow lentils tempered with spices',             60,  'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop', 10, 'Lunch',      1, 1, NULL,         4.4),
('Vada Pav',          'Spiced potato fritter in a bun',                  20,  'https://images.unsplash.com/photo-1750767397012-3413ba4fdbc7?w=400&h=300&fit=crop', 5,  'Snacks',     1, 1, NULL,         4.4),
('Samosa',            'Crispy pastry filled with spiced potatoes & peas',15,  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop', 5,  'Snacks',     1, 1, NULL,         4.3),
('Mango Lassi',       'Chilled creamy yogurt blended with mango',        40,  'https://images.unsplash.com/photo-1619898804188-e7bad4bd2127?w=400&h=300&fit=crop', 3,  'Beverages',  1, 1, 'New',        4.5),
('Masala Chai',       'Aromatic Indian spiced tea',                      15,  'https://images.unsplash.com/photo-1648192312898-838f9b322f47?w=400&h=300&fit=crop', 3,  'Beverages',  1, 1, NULL,         4.3),
('Fresh Lime Soda',   'Tangy lime soda with a pinch of salt',            25,  'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&h=300&fit=crop', 2,  'Beverages',  1, 1, NULL,         4.2),
('Gulab Jamun',       'Soft milk dumplings in rose sugar syrup',         30,  'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?w=400&h=300&fit=crop', 5,  'Desserts',   1, 1, 'Sweet Pick', 4.6),
('Kheer',             'Creamy rice pudding with cardamom & nuts',        35,  'https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=400&h=300&fit=crop', 5,  'Desserts',   1, 1, NULL,         4.4);

-- ── Time Slots ─────────────────────────────────────────────
INSERT IGNORE INTO time_slots (time, capacity, booked, active) VALUES
('8:00 AM - 8:30 AM',   25, 5, 1),
('8:30 AM - 9:00 AM',   25, 0, 1),
('12:00 PM - 12:30 PM', 40, 0, 1),
('12:30 PM - 1:00 PM',  40, 0, 1),
('1:00 PM - 1:30 PM',   35, 0, 1),
('3:30 PM - 4:00 PM',   20, 0, 1),
('4:00 PM - 4:30 PM',   20, 0, 1);
