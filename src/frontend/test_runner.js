// Pruebas de cuentas y reglas de negocio
// Carga en ámbito global simulando el navegador
global.Transaccion = require('./js/models/Transaccion');
global.Cuenta = require('./js/models/Cuenta');
global.CuentaAhorros = require('./js/models/CuentaAhorros');
global.CuentaCorriente = require('./js/models/CuentaCorriente');
global.TarjetaCredito = require('./js/models/TarjetaCredito');
global.Cliente = require('./js/models/Cliente');

const Transaccion = global.Transaccion;
const Cuenta = global.Cuenta;
const CuentaAhorros = global.CuentaAhorros;
const CuentaCorriente = global.CuentaCorriente;
const TarjetaCredito = global.TarjetaCredito;
const Cliente = global.Cliente;

let pruebasPasadas = 0;
let totalPruebas = 0;

function assert(condicion, descripcion) {
    totalPruebas++;
    if (condicion) {
        pruebasPasadas++;
        console.log(`  ✓ [PASS] ${descripcion}`);
    } else {
        console.error(`  ✗ [FAIL] ${descripcion}`);
    }
}

console.log('=== TEST 1: HERENCIA Y POLIMORFISMO DE CUENTAS ===');
const ahorros = new CuentaAhorros('AH-01', '102030', 1000000);
const corriente = new CuentaCorriente('CC-01', '102030', 1000000);
const tc = new TarjetaCredito('TC-01', '102030', 5000000, 0);

assert(ahorros instanceof Cuenta, 'CuentaAhorros hereda de Cuenta');
assert(corriente instanceof Cuenta, 'CuentaCorriente hereda de Cuenta');
assert(tc instanceof Cuenta, 'TarjetaCredito hereda de Cuenta');

console.log('\n=== TEST 2: REGLA DE AHORROS (1.5% RENDIMIENTO AL RETIRO) ===');
// Con $1.000.000, si retira $200.000:
// Rendimiento 1.5% sobre $200.000 = $3.000
// Saldo final = $1.000.000 + $3.000 - $200.000 = $803.000
const resAhorros = ahorros.calcularRetiro(200000);
assert(resAhorros.exito === true, 'Retiro en ahorros exitoso');
assert(resAhorros.rendimientoGenerado === 3000, 'Generó exactamente 1.5% de rendimiento ($3.000)');
assert(ahorros.saldo === 803000, 'Saldo final con rendimiento aplicado es $803.000');

// No permitir retirar más del saldo disponible
const resExcesoAhorros = ahorros.calcularRetiro(900000);
assert(resExcesoAhorros.exito === false, 'Rechaza retiro superior al saldo en ahorros');

console.log('\n=== TEST 3: REGLA DE CORRIENTE (20% DE SOBREGIRO) ===');
// Con $1.000.000, límite de retiro = 1.000.000 * 1.20 = $1.200.000
assert(corriente.limiteRetiroDisponible === 1200000, 'Límite con sobregiro del 20% es $1.200.000');

// Retirar $1.150.000 (usa sobregiro de $150.000, saldo resultante -$150.000)
const resCorriente = corriente.calcularRetiro(1150000);
assert(resCorriente.exito === true, 'Retiro con sobregiro autorizado con éxito');
assert(resCorriente.utilizoSobregiro === true, 'Detectó uso de sobregiro');
assert(corriente.saldo === -150000, 'Saldo negativo por sobregiro exacto (-$150.000)');

// Exceder el sobregiro (con saldo negativo no puede retirar más allá del cupo)
const resExcesoCorriente = corriente.calcularRetiro(100000);
assert(resExcesoCorriente.exito === false, 'Rechaza sobregiro mayor al 20% autorizado');

console.log('\n=== TEST 4: TARJETA DE CRÉDITO Y FÓRMULA DE AMORTIZACIÓN ===');
// Rango 1: <= 2 cuotas -> 0%
const cuota2 = tc.calcularCuotaMensual(1000000, 2);
assert(cuota2.tasaMensual === 0, 'Tasa 0% para 2 cuotas');
assert(cuota2.cuotaMensual === 500000, 'Cuota exacta $500.000 sin interés');

// Rango 2: 3-6 cuotas -> 1.9% mensual
const cuota6 = tc.calcularCuotaMensual(1200000, 6);
assert(cuota6.tasaMensual === 0.019, 'Tasa 1.9% para 6 cuotas');
// Amortización francesa: (1200000 * 0.019) / (1 - (1+0.019)^-6) = 22800 / (1 - 0.89323) = ~213567
assert(cuota6.cuotaMensual >= 213000 && cuota6.cuotaMensual <= 214000, 'Cuota amortizada calculada correctamente (~$213.567)');

// Rango 3: >= 7 cuotas -> 2.3% mensual
const cuota12 = tc.calcularCuotaMensual(1000000, 12);
assert(cuota12.tasaMensual === 0.023, 'Tasa 2.3% para 12 cuotas');
assert(cuota12.cuotaMensual > 0 && cuota12.totalIntereses > 0, 'Genera intereses para financiamiento a 12 meses');

console.log('\n=== TEST 5: SEGURIDAD Y BLOQUEO TRAS 3 INTENTOS FALLIDOS ===');
const cliente = new Cliente('123', 'Pedro Gomez', '3001112233', 'pgomez', 'ClaveSegura1');
assert(cliente.intentosRestantes === 3, 'Inicia con 3 intentos disponibles');

// Intento 1 fallido
const intento1 = cliente.validarPassword('ClaveErrada1');
assert(intento1.exito === false && cliente.intentosRestantes === 2, 'Primer fallo: quedan 2 intentos');

// Intento 2 fallido
const intento2 = cliente.validarPassword('ClaveErrada2');
assert(intento2.exito === false && cliente.intentosRestantes === 1, 'Segundo fallo: queda 1 intento');

// Intento 3 fallido -> Bloqueo
const intento3 = cliente.validarPassword('ClaveErrada3');
assert(intento3.bloqueado === true && cliente.estaBloqueado === true, 'Tercer fallo: cuenta bloqueada automáticamente');

// Intento posterior con clave correcta debe rechazarse por bloqueo
const intento4 = cliente.validarPassword('ClaveSegura1');
assert(intento4.exito === false && intento4.bloqueado === true, 'No permite acceso aun con clave correcta estando bloqueada');

console.log(`\n========================================`);
console.log(`RESULTADOS: ${pruebasPasadas}/${totalPruebas} pruebas pasadas.`);
console.log(`========================================\n`);

if (pruebasPasadas === totalPruebas) {
    process.exit(0);
} else {
    process.exit(1);
}
