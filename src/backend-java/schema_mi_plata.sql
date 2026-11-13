CREATE DATABASE IF NOT EXISTS mi_plata_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mi_plata_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(50),
    clave VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    ciudad VARCHAR(100),
    preferencias VARCHAR(150),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cuentas (
    numero_cuenta VARCHAR(30) PRIMARY KEY,
    id_usuario INT NOT NULL,
    tipo_cuenta ENUM('AHORROS', 'CORRIENTE') NOT NULL,
    saldo DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    limite_sobregiro DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    tasa_interes DECIMAL(6,4) NOT NULL DEFAULT 0.0000,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS creditos (
    id_credito INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    monto_aprobado DECIMAL(15,2) NOT NULL,
    deuda_actual DECIMAL(15,2) NOT NULL,
    plazo_meses INT NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transacciones (
    id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
    cuenta_origen VARCHAR(30) NULL,
    cuenta_destino VARCHAR(30) NULL,
    id_credito_destino INT NULL,
    tipo_transaccion VARCHAR(40) NOT NULL,
    monto DECIMAL(15,2) NOT NULL,
    descripcion VARCHAR(255),
    fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cuenta_origen) REFERENCES cuentas(numero_cuenta) ON DELETE SET NULL,
    FOREIGN KEY (cuenta_destino) REFERENCES cuentas(numero_cuenta) ON DELETE SET NULL
);

INSERT INTO usuarios (id, nombre, apellido, correo, telefono, clave, estado, ciudad, preferencias) VALUES
(101, 'Carlos', 'Restrepo', 'carlos@banco.com', '3001234567', 'Pass123*', TRUE, 'Medellín', 'Notificaciones SMS'),
(102, 'Valentina', 'Gómez', 'valentina@banco.com', '3119876543', 'Secure456*', TRUE, 'Envigado', 'Extracto digital'),
(103, 'Andrés', 'Montoya', 'andres@banco.com', '3205557788', 'Clave789*', TRUE, 'Bello', 'Atención prioritaria'),
(107, 'Sofía', 'Martínez', 'sofia@banco.com', '3146789012', 'Sofia2026*', TRUE, 'Sabaneta', 'Llave Bre-B activa'),
(108, 'Mateo', 'López', 'mateo@banco.com', '3182345678', 'Mateo2026*', TRUE, 'Itagüí', 'Extracto digital'),
(109, 'Laura', 'Jiménez', 'laura@banco.com', '3108765432', 'Laura2026*', TRUE, 'Rionegro', 'Alertas WhatsApp')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), apellido=VALUES(apellido), ciudad=VALUES(ciudad);

INSERT INTO cuentas (numero_cuenta, id_usuario, tipo_cuenta, saldo, limite_sobregiro, tasa_interes) VALUES
('1001-101', 101, 'AHORROS', 850000.00, 0.00, 0.0150),
('2001-101', 101, 'CORRIENTE', 320000.00, 150000.00, 0.0000),
('1001-102', 102, 'AHORROS', 540000.00, 0.00, 0.0150),
('2001-102', 102, 'CORRIENTE', -45000.00, 100000.00, 0.0000),
('1001-103', 103, 'AHORROS', 210000.00, 0.00, 0.0150),
('1001-107', 107, 'AHORROS', 1250000.00, 0.00, 0.0150),
('1001-108', 108, 'AHORROS', 430000.00, 0.00, 0.0150),
('2001-108', 108, 'CORRIENTE', 180000.00, 200000.00, 0.0000),
('1001-109', 109, 'AHORROS', 675000.00, 0.00, 0.0150)
ON DUPLICATE KEY UPDATE saldo=VALUES(saldo);

INSERT INTO creditos (id_credito, id_usuario, monto_aprobado, deuda_actual, plazo_meses, estado) VALUES
(1, 101, 1000000.00, 400000.00, 12, 'ACTIVO'),
(2, 102, 500000.00, 250000.00, 6, 'ACTIVO'),
(3, 103, 300000.00, 0.00, 6, 'PAGADO'),
(4, 107, 2000000.00, 1400000.00, 24, 'ACTIVO'),
(5, 108, 800000.00, 550000.00, 10, 'ACTIVO')
ON DUPLICATE KEY UPDATE deuda_actual=VALUES(deuda_actual), estado=VALUES(estado);

INSERT INTO transacciones (id_transaccion, cuenta_origen, cuenta_destino, id_credito_destino, tipo_transaccion, monto, descripcion, fecha_transaccion) VALUES
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
ON DUPLICATE KEY UPDATE monto=VALUES(monto), descripcion=VALUES(descripcion);
