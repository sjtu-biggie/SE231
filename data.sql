SET FOREIGN_KEY_CHECKS = 0;
INSERT INTO `role` VALUES (1, 'ROLE_ADMIN') ON DUPLICATE KEY UPDATE id= 1;
INSERT INTO `role` VALUES (2, 'ROLE_EDITOR') ON DUPLICATE KEY UPDATE id= 2;
INSERT INTO `role` VALUES (3, 'ROLE_USER') ON DUPLICATE KEY UPDATE id= 3;

INSERT INTO `users_roles` VALUES (1, 1) ON DUPLICATE KEY UPDATE user_id = 1;
INSERT INTO `users_roles` VALUES (1, 2) ON DUPLICATE KEY UPDATE user_id = 1;
INSERT INTO `users_roles` VALUES (1, 3) ON DUPLICATE KEY UPDATE user_id = 1;
INSERT INTO `users_roles` VALUES (2, 2) ON DUPLICATE KEY UPDATE user_id = 2;
INSERT INTO `users_roles` VALUES (2, 3) ON DUPLICATE KEY UPDATE user_id = 2;
INSERT INTO `users_roles` VALUES (3, 3) ON DUPLICATE KEY UPDATE user_id = 3;

INSERT INTO `user` VALUES (1, TRUE, NULL, NULL, '$2a$10$nPV9AOEqUi2Yc.t8NG09B.Ps3/aSIlR2SN5AtEBuAy3rsiwXpynaa', 'admin') ON DUPLICATE KEY UPDATE id= 1;
INSERT INTO `user` VALUES (2, TRUE, NULL, NULL, '$2a$10$BurYABJA4fnIRccPMSgeX.LyPY8TTXJnK.I7OZQZbhSkMGgwS8jDi', 'editor') ON DUPLICATE KEY UPDATE id= 2;
INSERT INTO `user` VALUES (3, TRUE, NULL, NULL, '$2a$10$amAhhuQuxDOPvpl/A6zRe.QcfZG8tniK2EalQducjIJeXXvnF25F2', 'user') ON DUPLICATE KEY UPDATE id= 3;

INSERT INTO `authority` VALUES (1, 'comment') ON DUPLICATE KEY UPDATE id= 1;

INSERT INTO `roles_authorities` VALUES (1, 1) ON DUPLICATE KEY UPDATE role_id = 1;
INSERT INTO `roles_authorities` VALUES (2, 1) ON DUPLICATE KEY UPDATE role_id = 2;
INSERT INTO `roles_authorities` VALUES (3, 1) ON DUPLICATE KEY UPDATE role_id = 3;

INSERT INTO `users_revoked_authorities` VALUES (2, 1) ON DUPLICATE KEY UPDATE user_id = user_id;

SET FOREIGN_KEY_CHECKS = 1 ;