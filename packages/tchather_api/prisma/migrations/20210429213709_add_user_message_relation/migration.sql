/*
  Warnings:

  - Added the required column `messageUserSenderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` ADD COLUMN     `messageUserSenderId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD FOREIGN KEY (`messageUserSenderId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
