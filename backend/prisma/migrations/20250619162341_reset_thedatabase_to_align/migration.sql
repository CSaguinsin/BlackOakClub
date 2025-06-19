-- CreateTable
CREATE TABLE `customers` (
    `customerId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `customerEmail` VARCHAR(50) NULL,
    `customerFullName` VARCHAR(100) NULL,
    `customerAddress` VARCHAR(100) NULL,
    `customerPhoneNumber` BIGINT NULL,
    `customerCity` VARCHAR(100) NULL,
    `customerPostalCode` INTEGER NULL,

    PRIMARY KEY (`customerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiries` (
    `inquiryId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER UNSIGNED NULL,
    `inquiryTitle` VARCHAR(50) NULL,
    `inquiryDescription` VARCHAR(100) NULL,

    UNIQUE INDEX `customerId`(`customerId`),
    PRIMARY KEY (`inquiryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orderId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER UNSIGNED NULL,
    `productId` INTEGER UNSIGNED NULL,
    `orderDate` DATE NULL,
    `orderStatus` VARCHAR(50) NULL,

    INDEX `customerId`(`customerId`),
    INDEX `productId`(`productId`),
    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `productId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `productName` VARCHAR(100) NULL,
    `productDescription` VARCHAR(255) NULL,
    `productPrice` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers`(`customerId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products`(`productId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
