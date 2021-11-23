DROP DATABASE IF EXISTS SUPERMARKET_CRM;
CREATE DATABASE IF NOT EXISTS SUPERMARKET_CRM;
USE SUPERMARKET_CRM;

CREATE TABLE IF NOT EXISTS SUPERMARKET_BRANCH (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    hotline VARCHAR(20),
    `address` VARCHAR(100),
    `name` VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS EMPLOYEE (
    ssn INT PRIMARY KEY AUTO_INCREMENT,
    identityCard VARCHAR(9) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    `name` VARCHAR(100),
    `address` VARCHAR(100),
    birthday DATE,
    email VARCHAR(100) UNIQUE,
    CHECK (LENGTH(identityCard) = 9)
);

ALTER TABLE EMPLOYEE ADD (
	SBranchID INT NOT NULL,
    startWorkingDate DATE,
    FOREIGN KEY (SBranchID) 
        REFERENCES SUPERMARKET_BRANCH(ID) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS AFTER_SELLING_STAFF (
    ssn INT PRIMARY KEY,
    FOREIGN KEY (ssn)
        REFERENCES EMPLOYEE(ssn)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS MANAGER (
    ssn INT PRIMARY KEY,
    experienceYear INT,
    FOREIGN KEY (ssn)
        REFERENCES EMPLOYEE (ssn)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK (experienceYear > 2)
);

CREATE TABLE IF NOT EXISTS CATEGORY (
    `name` VARCHAR(50) PRIMARY KEY,
    `description` TEXT
);

CREATE TABLE IF NOT EXISTS PRODUCT (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100),
    mdate DATE,
    edate DATE,
    price FLOAT,
    origin VARCHAR(100),
    score INT,
    discount VARCHAR(20),
    CHECK (mdate < edate)
);

ALTER TABLE PRODUCT ADD (
    categoryName VARCHAR(50),
    FOREIGN KEY (categoryName) REFERENCES CATEGORY(`name`)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS FAVOUR(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100),
    content VARCHAR(100),
    startDate DATE,
    endDate DATE,
    quantity INT,
    `status` ENUM('applying', 'planning', 'terminated'), 
    CHECK (startDate < endDate)
);

ALTER TABLE FAVOUR ADD (
	mssn INT,
    FOREIGN KEY (mssn)
        REFERENCES MANAGER(ssn)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS VOUCHER_COUPON (
    code INT PRIMARY KEY AUTO_INCREMENT,
    `type` ENUM('voucher', 'coupon'),
    isUsed ENUM('n', 'y')
);

ALTER TABLE VOUCHER_COUPON ADD (
	favourID INT NOT NULL,
    FOREIGN KEY (favourID)
        REFERENCES FAVOUR(ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS CUSTOMER (
    ssn INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(100),
    lname VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    birthday DATE,
    score INT,
    favorite TEXT(2000),
    imageUrl TEXT(1000)
);

CREATE TABLE IF NOT EXISTS PURCHASE (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    `time` DATETIME NOT NULL
);

ALTER TABLE PURCHASE ADD (
	cssn INT NOT NULL,
    FOREIGN KEY (cssn)
        REFERENCES CUSTOMER(ssn)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- WEAK ENTITIES

CREATE TABLE IF NOT EXISTS FEEDBACK (
    cssn INT,
    `time` DATETIME NOT NULL,
    `stars` INT,
    title VARCHAR(100),
    content TEXT(2000),
    CHECK (stars BETWEEN 1 AND 5),
    PRIMARY KEY(cssn,`time`),
    FOREIGN KEY (cssn) REFERENCES CUSTOMER(ssn) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS NOTICES (
    ass_ssn INT,
    `time` DATETIME NOT NULL,
    content TEXT NOT NULL,
    title VARCHAR(200) NOT NULL,
    `url` TEXT(500),
    imageUrl TEXT(500),
    PRIMARY KEY (ass_ssn, `time`),
    FOREIGN KEY (ass_ssn)
        REFERENCES AFTER_SELLING_STAFF(ssn)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- RELATIONSHIPS

CREATE TABLE IF NOT EXISTS RESOLVES (
    ass_ssn INT,
    cssn INT NOT NULL,
    feedbackTime DATETIME NOT NULL,
    resolveTime DATETIME NOT NULL,
    content TEXT(2000),
    PRIMARY KEY (ass_ssn , cssn, feedbackTime),
    FOREIGN KEY (ass_ssn)
        REFERENCES AFTER_SELLING_STAFF(ssn)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cssn , feedbackTime) 
        REFERENCES FEEDBACK(cssn , `time`)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS APPLY_FOR_PURCHASE (
    favourID INT,
    purchaseID INT,
    discount VARCHAR(20),
    PRIMARY KEY (favourID , purchaseID),
    FOREIGN KEY (favourID)
        REFERENCES FAVOUR(ID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (purchaseID)
        REFERENCES PURCHASE(ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS TRANSACTS (
    productID INT,
    purchaseID INT,
    SBranchID INT NOT NULL,
    numberOfProducts INT,
    price FLOAT,
    score INT,
    discount VARCHAR(20), 
    PRIMARY KEY (productID, purchaseID),
    FOREIGN KEY (productID)
        REFERENCES PRODUCT(ID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (purchaseID)
        REFERENCES PURCHASE(ID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (SBranchID)
        REFERENCES SUPERMARKET_BRANCH(ID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS RECEIVES (
    ass_ssn INT,
    `time` DATETIME,
    cssn INT,
    PRIMARY KEY (ass_ssn, `time`, cssn),
    FOREIGN KEY (ass_ssn, `time`)
        REFERENCES NOTICES(ass_ssn, `time`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cssn)
        REFERENCES CUSTOMER(ssn)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS OWNS (
    vcode INT PRIMARY KEY,
    cssn INT NOT NULL,
    FOREIGN KEY (vcode)
        REFERENCES VOUCHER_COUPON(code)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cssn)
        REFERENCES CUSTOMER(ssn)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- MULTIVALUED ATTRIBUTE

CREATE TABLE IF NOT EXISTS DEGREE (
    mssn INT,
    degreeName VARCHAR(250) NOT NULL,
    PRIMARY KEY (mssn, degreeName),
    FOREIGN KEY (mssn) REFERENCES MANAGER(ssn)
);