-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `userPassword` VARCHAR(191) NOT NULL,
UNIQUE INDEX `User.userName_unique`(`userName`),
UNIQUE INDEX `User.userEmail_unique`(`userEmail`),

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `messageId` VARCHAR(191) NOT NULL,
    `messageText` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversation` (
    `conversationId` VARCHAR(191) NOT NULL,
    `conversationName` VARCHAR(191) NOT NULL,
    `conversationType` ENUM('ONE_TO_ONE', 'GROUP') NOT NULL,

    PRIMARY KEY (`conversationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attachement` (
    `attachementId` VARCHAR(191) NOT NULL,
    `attachementFileType` VARCHAR(191) NOT NULL,
    `attachementFileName` VARCHAR(191) NOT NULL,
    `attachementUrl` VARCHAR(191) NOT NULL,
    `attachementMessageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attachementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ConversationToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,
UNIQUE INDEX `_ConversationToUser_AB_unique`(`A`, `B`),
INDEX `_ConversationToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ConversationToMessage` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,
UNIQUE INDEX `_ConversationToMessage_AB_unique`(`A`, `B`),
INDEX `_ConversationToMessage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Attachement` ADD FOREIGN KEY (`attachementMessageId`) REFERENCES `Message`(`messageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConversationToUser` ADD FOREIGN KEY (`A`) REFERENCES `Conversation`(`conversationId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConversationToUser` ADD FOREIGN KEY (`B`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConversationToMessage` ADD FOREIGN KEY (`A`) REFERENCES `Conversation`(`conversationId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ConversationToMessage` ADD FOREIGN KEY (`B`) REFERENCES `Message`(`messageId`) ON DELETE CASCADE ON UPDATE CASCADE;
