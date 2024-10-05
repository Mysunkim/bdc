-- CreateTable
CREATE TABLE `t_event` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_title` VARCHAR(100) NOT NULL,
    `event_content` TEXT NOT NULL,
    `event_location` VARCHAR(100) NULL,
    `event_create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `event_edit_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `event_delete_date` DATETIME(0) NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_gallery` (
    `gallery_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gallery_title` VARCHAR(100) NOT NULL,
    `gallery_content` TEXT NOT NULL,
    `gallery_image` VARCHAR(255) NULL,
    `gallery_writer` VARCHAR(100) NOT NULL,
    `gallery_create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `gallery_edit_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `gallery_delete_date` DATETIME(0) NULL,

    PRIMARY KEY (`gallery_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(100) NOT NULL,
    `user_address` VARCHAR(255) NULL,
    `user_email` VARCHAR(100) NOT NULL,
    `user_phonenumber` VARCHAR(20) NULL,
    `user_nickname` VARCHAR(50) NULL,
    `user_create_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_edit_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_delete_date` DATETIME(0) NULL,
    `user_memberid` VARCHAR(100) NULL,

    UNIQUE INDEX `user_email`(`user_email`),
    UNIQUE INDEX `user_nickname`(`user_nickname`),
    UNIQUE INDEX `t_user_user_memberid_key`(`user_memberid`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
