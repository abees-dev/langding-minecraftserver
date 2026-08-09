-- ====================================================================
-- SCHEMA UPDATE SQL FOR MINECRAFT RPG SERVER & WEB TOP-UP SYSTEM
-- ====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Thêm cột `point` vào bảng `users` (nếu chưa có)
-- Lưu ý: Thực thi câu lệnh này trên database hiện tại của bạn
ALTER TABLE `users` 
  ADD COLUMN `point` BIGINT NOT NULL DEFAULT 0 AFTER `email`;

-- 2. Bảng `transactions` lưu thông tin giao dịch nạp tiền trên Web
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE `transactions` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `order_code` VARCHAR(64) NOT NULL UNIQUE,
  `username` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `amount` DECIMAL(15, 2) NOT NULL,
  `point_received` BIGINT NOT NULL,
  `status` ENUM('PENDING', 'COMPLETED', 'EXPIRED', 'FAILED') NOT NULL DEFAULT 'PENDING',
  `payment_method` VARCHAR(50) DEFAULT 'BANK_TRANSFER',
  `description` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_username` (`username`),
  INDEX `idx_order_code` (`order_code`),
  CONSTRAINT `fk_transactions_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- 3. Bảng `pending_rewards` lưu các lệnh chờ Minecraft Sub-server thực thi (On Join)
DROP TABLE IF EXISTS `pending_rewards`;
CREATE TABLE `pending_rewards` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `command` VARCHAR(512) NOT NULL,
  `status` ENUM('PENDING', 'CLAIMED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `claimed_at` DATETIME NULL,
  INDEX `idx_user_status` (`username`, `status`),
  CONSTRAINT `fk_pending_rewards_username` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
