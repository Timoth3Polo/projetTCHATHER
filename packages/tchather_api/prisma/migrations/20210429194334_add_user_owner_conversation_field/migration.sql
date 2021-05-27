/*
  Warnings:

  - Added the required column `conversationUserOwnerId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Conversation` ADD COLUMN     `conversationUserOwnerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Conversation` ADD FOREIGN KEY (`conversationUserOwnerId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
