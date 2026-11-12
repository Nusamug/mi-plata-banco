CREATE DATABASE IF NOT EXISTS mi_plata_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mi_plata_db;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(50),
    password VARCHAR(100) NOT NULL,
    state BOOLEAN DEFAULT TRUE,
    city VARCHAR(100),
    preferences VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS accounts (
    account_number VARCHAR(30) PRIMARY KEY,
    user_id INT NOT NULL,
    account_type ENUM('AHORROS', 'CORRIENTE') NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    overdraft_limit DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    interest_rate DECIMAL(6,4) NOT NULL DEFAULT 0.0000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS credits (
    credit_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    approved_amount DECIMAL(15,2) NOT NULL,
    current_debt DECIMAL(15,2) NOT NULL,
    term_months INT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
    tx_id INT AUTO_INCREMENT PRIMARY KEY,
    source_account VARCHAR(30) NULL,
    target_account VARCHAR(30) NULL,
    target_credit_id INT NULL,
    tx_type VARCHAR(40) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    description VARCHAR(255),
    tx_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (source_account) REFERENCES accounts(account_number) ON DELETE SET NULL,
    FOREIGN KEY (target_account) REFERENCES accounts(account_number) ON DELETE SET NULL
);

INSERT INTO users (id, name, last_name, email, phone, password, state, city, preferences) VALUES
(101, 'Carlos', 'Restrepo', 'carlos@banco.com', '3001234567', 'Pass123*', TRUE, 'Medellín', 'Notificaciones SMS'),
(102, 'Valentina', 'Gómez', 'valentina@banco.com', '3119876543', 'Secure456*', TRUE, 'Envigado', 'Extracto digital'),
(103, 'Andrés', 'Montoya', 'andres@banco.com', '3205557788', 'Clave789*', TRUE, 'Bello', 'Atención prioritaria')
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO accounts (account_number, user_id, account_type, balance, overdraft_limit, interest_rate) VALUES
('1001-101', 101, 'AHORROS', 500000.00, 0.00, 0.0150),
('2001-101', 101, 'CORRIENTE', 200000.00, 100000.00, 0.0000),
('1001-102', 102, 'AHORROS', 350000.00, 0.00, 0.0150),
('1001-103', 103, 'AHORROS', 150000.00, 0.00, 0.0150)
ON DUPLICATE KEY UPDATE balance=balance;

INSERT INTO credits (credit_id, user_id, approved_amount, current_debt, term_months, status) VALUES
(1, 101, 1000000.00, 400000.00, 12, 'ACTIVO'),
(2, 102, 500000.00, 250000.00, 6, 'ACTIVO')
ON DUPLICATE KEY UPDATE status=status;
