/*
 Navicat Premium Dump SQL

 Source Server         : DB TEST
 Source Server Type    : MySQL
 Source Server Version : 100627 (10.6.27-MariaDB-ubu2204)
 Source Host           : 185.207.166.70:1026
 Source Schema         : s21917_prison-rpg

 Target Server Type    : MySQL
 Target Server Version : 100627 (10.6.27-MariaDB-ubu2204)
 File Encoding         : 65001

 Date: 10/08/2026 00:30:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `realname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `ip` varchar(40) CHARACTER SET ascii COLLATE ascii_bin NULL DEFAULT NULL,
  `lastlogin` bigint NULL DEFAULT NULL,
  `x` double NOT NULL DEFAULT 0,
  `y` double NOT NULL DEFAULT 0,
  `z` double NOT NULL DEFAULT 0,
  `world` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'world',
  `regdate` bigint NOT NULL DEFAULT 0,
  `regip` varchar(40) CHARACTER SET ascii COLLATE ascii_bin NULL DEFAULT NULL,
  `yaw` float NULL DEFAULT NULL,
  `pitch` float NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `point` bigint NOT NULL DEFAULT 0,
  `isLogged` smallint NOT NULL DEFAULT 0,
  `hasSession` smallint NOT NULL DEFAULT 0,
  `totp` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'abeess', 'ABeess', '$SHA$6fae1986f0be3aaf$4e2d499da3a3a51d2a27a37eba58c62f8b2b79770fec6f34e9298f2ab06fe573', '14.191.125.63', 1786296245852, 0, 0, 0, 'world', 1786296241424, '14.191.125.63', NULL, NULL, NULL, 0, 0, 1, NULL);

SET FOREIGN_KEY_CHECKS = 1;
