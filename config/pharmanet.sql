-- CREATE DATABASE Pharmanet  

USE Pharmanet;

CREATE TABLE Pharmacy (
	Pharmacy_id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    License_number VARCHAR(50) UNIQUE,
    Contact VARCHAR(15),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(50),
    Address_no VARCHAR(20),
    Street VARCHAR(100),
    Town VARCHAR(50),
    Province VARCHAR(30),
    Postal_code VARCHAR(10),
    Longitude DECIMAL(10,6),
    Latitude DECIMAL(10,6),
    Googlemap_link VARCHAR(225),
    Registration_certificate LONGBLOB,
    Owner_proof LONGBLOB,
    Address_proof LONGBLOB
);

CREATE TABLE Staff (
	staff_id INT AUTO_INCREMENT PRIMARY KEY,
    Pharmacy_id INT,
    First_name VARCHAR(50),
    Last_name VARCHAR(50),
    Full_name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Address_no VARCHAR(20),
    Street VARCHAR(100),
    Town VARCHAR(50),
    Province VARCHAR(30),
    Postal_code VARCHAR(10),
	NIC VARCHAR(20),
    Contact VARCHAR(20),
    EPF_num INT, 
	Gender ENUM('Male', 'Female') NOT NULL,
    User_name VARCHAR(50),
    Password VARCHAR(50),    
    Bank_name VARCHAR(100),
    Account_num VARCHAR(50),
    Branch VARCHAR(50),
	Role ENUM('Pharmacist' , 'Owner', 'Stock Manager', 'Cashier') NOT NULL,
    Registered_day DATE,
    Resignation_day DATE,
    NIC_proof LONGBLOB,
    Bank_details_proof LONGBLOB,
    Mark VARCHAR(50),
    FOREIGN KEY (Pharmacy_id) REFERENCES Pharmacy(Pharmacy_id)
);

CREATE TABLE Medicine (
	Medicine_id INT AUTO_INCREMENT PRIMARY KEY,
    Generic_name VARCHAR(225),
    Schedule VARCHAR(50),
    Registration_num VARCHAR(50),
	Serial_num VARCHAR(50),
    Brand_name VARCHAR(100),
	Dosage_code VARCHAR(50),
    Country_code VARCHAR(20),
    Pack_size VARCHAR(20),
    Pack_type VARCHAR(50),
    Manu_code VARCHAR(100),
    Agent_code VARCHAR(100),
    Price DECIMAL(10,2),
    Discount VARCHAR(10) DEFAULT 0,
    Stock INT,
    Public_stock INT DEFAULT 0
);

CREATE TABLE Customer (
	Customer_id INT AUTO_INCREMENT PRIMARY KEY,
    First_name VARCHAR(50),
    Last_name VARCHAR(50),
    Full_name VARCHAR(100),
    NIC VARCHAR(20),
    Date_of_birth DATE,
    Address_no VARCHAR(20),
    Street VARCHAR(100),
    Town VARCHAR(50),
    Province VARCHAR(30),
    Postal_code VARCHAR(10),
    Bank_name VARCHAR(100),
    Account_num VARCHAR(50),
    Branch VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(50)     
);

CREATE TABLE Orders (
	Order_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id INT,
    Staff_id INT,
    Medicine_id INT,
    Quantity INT,
    Order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    Order_type ENUM('Online','Handon') NOT NULL,
    Status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY(Customer_id) REFERENCES Customer(Customer_id),
    FOREIGN KEY (Staff_id) REFERENCES Staff(Staff_id),
    FOREIGN KEY (Medicine_id) REFERENCES Medicine(Medicine_id)
);

CREATE TABLE Transactions (
	Transaction_id INT AUTO_INCREMENT PRImARY KEY,
    Order_id INT,
    Value DECIMAL(10,2),
    Payment_method ENUM('Cash', 'Card', 'Online'),
    Status ENUM('Pending', 'Success', 'Failed'),
    Transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Order_id) REFERENCES Orders(Order_id)
);

CREATE TABLE Notifications (
	notification_id INT AUTO_INCREMENT PRIMARY KEY,
    Staff_id INT,
    Customer_id INT,
    Message TEXT,
    Type VARCHAR(50),
    Sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Staff_id) REFERENCES Staff(Staff_id),
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id)
);

CREATE TABLE Selling_items (
	Item_id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Brand VARCHAR(100),
    Code VARCHAR(50)
);

CREATE TABLE Attendance (
	Attendence_id INT AUTO_INCREMENT PRIMARY KEY,
    Staff_id INT,
    Date DATE,
    Arrival_time TIME,
    Dispatch_time TIME,
    FOREIGN KEY (Staff_id) REFERENCES Staff(Staff_id)
);