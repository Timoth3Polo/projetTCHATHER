/*
  Warnings:

  - You are about to drop the `Attachement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Attachement` DROP FOREIGN KEY `Attachement_ibfk_1`;

-- DropTable
DROP TABLE `Attachement`;

-- CreateTable
CREATE TABLE `Attachment` (
    `attachmentId` VARCHAR(191) NOT NULL,
    `attachmentFileType` VARCHAR(191) NOT NULL,
    `attachmentFileName` VARCHAR(191) NOT NULL,
    `attachmentUrl` VARCHAR(191) NOT NULL,
    `attachmentMessageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attachmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attachment` ADD FOREIGN KEY (`attachmentMessageId`) REFERENCES `Message`(`messageId`) ON DELETE CASCADE ON UPDATE CASCADE;
