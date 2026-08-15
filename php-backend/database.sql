CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('admin', 'client') NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `files` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `project_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  `uploader_type` ENUM('admin','client') NOT NULL,
  `uploader_id` INT NOT NULL,
  `uploader_name` VARCHAR(255),
  `file_name` VARCHAR(255) NOT NULL,
  `file_path` VARCHAR(500) NOT NULL,
  `file_size` INT,
  `file_type` VARCHAR(50),
  `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('new','reviewed') DEFAULT 'new'
);

-- Optional: Insert a test admin and a test client
-- password is 'password123'
INSERT INTO `users` (`name`, `email`, `password_hash`, `role`) VALUES 
('Admin User', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Demo Client', 'client@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'client');
