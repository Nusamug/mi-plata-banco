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
(103, 'Andrés', 'Montoya', 'andres@banco.com', '3205557788', 'Clave789*', TRUE, 'Bello', 'Atención prioritaria'),
(107, 'Sofía', 'Martínez', 'sofia@banco.com', '3146789012', 'Sofia2026*', TRUE, 'Sabaneta', 'Llave Bre-B activa'),
(108, 'Mateo', 'López', 'mateo@banco.com', '3182345678', 'Mateo2026*', TRUE, 'Itagüí', 'Extracto digital'),
(109, 'Laura', 'Jiménez', 'laura@banco.com', '3108765432', 'Laura2026*', TRUE, 'Rionegro', 'Alertas WhatsApp')
ON DUPLICATE KEY UPDATE name=VALUES(name), last_name=VALUES(last_name), city=VALUES(city);

INSERT INTO accounts (account_number, user_id, account_type, balance, overdraft_limit, interest_rate) VALUES
('1001-101', 101, 'AHORROS', 850000.00, 0.00, 0.0150),
('2001-101', 101, 'CORRIENTE', 320000.00, 150000.00, 0.0000),
('1001-102', 102, 'AHORROS', 540000.00, 0.00, 0.0150),
('2001-102', 102, 'CORRIENTE', -45000.00, 100000.00, 0.0000),
('1001-103', 103, 'AHORROS', 210000.00, 0.00, 0.0150),
('1001-107', 107, 'AHORROS', 1250000.00, 0.00, 0.0150),
('1001-108', 108, 'AHORROS', 430000.00, 0.00, 0.0150),
('2001-108', 108, 'CORRIENTE', 180000.00, 200000.00, 0.0000),
('1001-109', 109, 'AHORROS', 675000.00, 0.00, 0.0150)
ON DUPLICATE KEY UPDATE balance=VALUES(balance);

INSERT INTO credits (credit_id, user_id, approved_amount, current_debt, term_months, status) VALUES
(1, 101, 1000000.00, 400000.00, 12, 'ACTIVO'),
(2, 102, 500000.00, 250000.00, 6, 'ACTIVO'),
(3, 103, 300000.00, 0.00, 6, 'PAGADO'),
(4, 107, 2000000.00, 1400000.00, 24, 'ACTIVO'),
(5, 108, 800000.00, 550000.00, 10, 'ACTIVO')
ON DUPLICATE KEY UPDATE current_debt=VALUES(current_debt), status=VALUES(status);

INSERT INTO transactions (tx_id, source_account, target_account, target_credit_id, tx_type, amount, description, tx_date) VALUES
(1, NULL, '1001-101', NULL, 'CONSIGNACION', 500000.00, 'Deposito inicial de nomina', '2026-11-08 09:15:00'),
(2, NULL, '1001-107', NULL, 'CONSIGNACION', 1500000.00, 'Consignacion en efectivo sucursal', '2026-11-08 11:30:00'),
(3, NULL, '1001-109', NULL, 'CONSIGNACION', 800000.00, 'Consignacion bono de apertura', '2026-11-09 08:45:00'),
(4, NULL, '1001-102', NULL, 'CONSIGNACION', 450000.00, 'Consignacion transferencia externa', '2026-11-09 14:20:00'),
(5, '1001-101', NULL, NULL, 'RETIRO', 120000.00, 'Retiro en cajero de cuenta AHORROS 1001-101', '2026-11-10 10:05:00'),
(6, '2001-102', NULL, NULL, 'RETIRO', 145000.00, 'Retiro con sobregiro en cuenta CORRIENTE 2001-102', '2026-11-10 16:40:00'),
(7, '1001-109', NULL, NULL, 'RETIRO', 125000.00, 'Retiro en efectivo cajero automatico', '2026-11-11 09:10:00'),
(8, '1001-107', '1001-101', NULL, 'TRANSFERENCIA', 250000.00, 'Pago desarrollo modulo web', '2026-11-11 11:25:00'),
(9, '1001-101', '1001-103', NULL, 'TRANSFERENCIA', 90000.00, 'Transferencia gastos compartidos', '2026-11-11 15:50:00'),
(10, '2001-101', '1001-108', NULL, 'TRANSFERENCIA', 180000.00, 'Pago proveedor materiales', '2026-11-11 17:15:00'),
(11, '1001-108', '1001-102', NULL, 'TRANSFERENCIA', 90000.00, 'Reembolso compra grupal', '2026-11-12 08:30:00'),
(12, '1001-101', NULL, 1, 'PAGO_CREDITO', 600000.00, 'Abono parcial a credito #1', '2026-11-12 10:15:00'),
(13, '1001-102', NULL, 2, 'PAGO_CREDITO', 250000.00, 'Abono cuota credito #2', '2026-11-12 12:00:00'),
(14, '1001-103', NULL, 3, 'PAGO_CREDITO', 300000.00, 'Pago total credito #3 (Liquidado)', '2026-11-12 14:10:00'),
(15, '1001-107', NULL, 4, 'PAGO_CREDITO', 600000.00, 'Abono anticipado a credito #4', '2026-11-12 16:45:00')
ON DUPLICATE KEY UPDATE amount=VALUES(amount), description=VALUES(description);
