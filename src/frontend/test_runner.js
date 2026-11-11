// Pruebas de cuentas, estructuras de datos, estudios crediticios y reglas de negocio bancarias
global.Transaccion = require('./js/models/Transaccion');
global.Cuenta = require('./js/models/Cuenta');
global.CuentaAhorros = require('./js/models/CuentaAhorros');
global.CuentaCorriente = require('./js/models/CuentaCorriente');
global.TarjetaCredito = require('./js/models/TarjetaCredito');
global.Cliente = require('./js/models/Cliente');
global.StorageService = require('./js/services/StorageService');

const Transaccion = global.Transaccion;
const Cuenta = global.Cuenta;
const CuentaAhorros = global.CuentaAhorros;
const CuentaCorriente = global.CuentaCorriente;
const TarjetaCredito = global.TarjetaCredito;
const Cliente = global.Cliente;
const StorageService = global.StorageService;

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

console.log('=== TEST 1: HERENCIA Y POLIMORFISMO DE CUENTAS (TEMA 8) ===');
const ahorros = new CuentaAhorros('401-8392104-2', '102030', 1000000);
const corriente = new CuentaCorriente('201-5120491-0', '102030', 1000000);
const tc = new TarjetaCredito('4509812034915521', '102030', 5000000, 0, {
    franquicia: 'VISA GOLD',
    fechaVencimiento: '10/31',
    cvv: '742'
});

assert(ahorros instanceof Cuenta, 'CuentaAhorros hereda de Cuenta');
assert(corriente instanceof Cuenta, 'CuentaCorriente hereda de Cuenta');
assert(tc instanceof Cuenta, 'TarjetaCredito hereda de Cuenta');

console.log('\n=== TEST 2: REGLA DE AHORROS (1.5% RENDIMIENTO AL RETIRO) ===');
const resAhorros = ahorros.calcularRetiro(200000);
assert(resAhorros.exito === true, 'Retiro en ahorros exitoso');
assert(resAhorros.rendimientoGenerado === 3000, 'Generó exactamente 1.5% de rendimiento ($3.000)');
assert(ahorros.saldo === 803000, 'Saldo final con rendimiento aplicado es $803.000');

const resExcesoAhorros = ahorros.calcularRetiro(900000);
assert(resExcesoAhorros.exito === false, 'Rechaza retiro superior al saldo en ahorros');

console.log('\n=== TEST 3: REGLA DE CORRIENTE (20% DE SOBREGIRO Y PERSISTENCIA) ===');
assert(corriente.limiteRetiroDisponible === 1200000, 'Límite con sobregiro del 20% es $1.200.000');

const resCorriente = corriente.calcularRetiro(1150000);
assert(resCorriente.exito === true, 'Retiro con sobregiro autorizado con éxito');
assert(resCorriente.utilizoSobregiro === true, 'Detectó uso de sobregiro');
assert(corriente.saldo === -150000, 'Saldo negativo por sobregiro exacto (-$150.000)');

const resExcesoCorriente = corriente.calcularRetiro(100000);
assert(resExcesoCorriente.exito === false, 'Rechaza sobregiro mayor al 20% autorizado');

// Verificar que la hidratación de StorageService conserva el saldo negativo de sobregiro
const clienteTemp = new Cliente('102030', 'Carlos Test', '3100001111', 'ctest', '123456');
clienteTemp.agregarCuenta(corriente);
const clienteHidratado = StorageService.hidratarCliente(JSON.parse(JSON.stringify(clienteTemp)));
assert(clienteHidratado.obtenerCuentaPorTipo('CORRIENTE').saldo === -150000, 'Hidratación de LocalStorage preserva saldo negativo de sobregiro (-$150.000)');

console.log('\n=== TEST 4: TARJETA DE CRÉDITO REALISTA Y FÓRMULA DE AMORTIZACIÓN ===');
assert(tc.numeroFormateado === '4509 8120 3491 5521', 'Formato de 16 dígitos en bloques de 4');
assert(tc.franquicia === 'VISA GOLD', 'Franquicia asignada correctamente');
assert(tc.fechaVencimiento === '10/31', 'Fecha de vencimiento bancaria válida');

const cuota2 = tc.calcularCuotaMensual(1000000, 2);
assert(cuota2.tasaMensual === 0, 'Tasa 0% para 2 cuotas');
assert(cuota2.cuotaMensual === 500000, 'Cuota exacta $500.000 sin interés');

const cuota6 = tc.calcularCuotaMensual(1200000, 6);
assert(cuota6.tasaMensual === 0.019, 'Tasa 1.9% para 6 cuotas');
assert(cuota6.cuotaMensual >= 213000 && cuota6.cuotaMensual <= 214000, 'Cuota amortizada calculada correctamente (~$213.567)');

const cuota12 = tc.calcularCuotaMensual(1000000, 12);
assert(cuota12.tasaMensual === 0.023, 'Tasa 2.3% para 12 cuotas');
assert(cuota12.cuotaMensual > 0 && cuota12.totalIntereses > 0, 'Genera intereses para financiamiento a 12 meses');

const resCompraTC = tc.realizarCompra(600000, 2, 'Almacenes Éxito');
assert(resCompraTC.exito === true && tc.deudaActual === 600000, 'Compra con tarjeta incrementa deuda a $600.000');
assert(tc.cuotaMensualEstimada === 300000, 'Cuota mensual estimada calculada con .reduce() es $300.000');

const resPagoTC = tc.pagarDeuda(300000);
assert(resPagoTC.exito === true && tc.deudaActual === 300000, 'Abono a tarjeta libera cupo y reduce deuda a $300.000');

console.log('\n=== TEST 5: SEGURIDAD Y BLOQUEO TRAS 3 INTENTOS FALLIDOS ===');
const cliente = new Cliente('123', 'Pedro Gomez', '3001112233', 'pgomez', 'ClaveSegura1');
assert(cliente.intentosRestantes === 3, 'Inicia con 3 intentos disponibles');

const intento1 = cliente.validarPassword('ClaveErrada1');
assert(intento1.exito === false && cliente.intentosRestantes === 2, 'Primer fallo: quedan 2 intentos');

const intento2 = cliente.validarPassword('ClaveErrada2');
assert(intento2.exito === false && cliente.intentosRestantes === 1, 'Segundo fallo: queda 1 intento');

const intento3 = cliente.validarPassword('ClaveErrada3');
assert(intento3.bloqueado === true && cliente.estaBloqueado === true, 'Tercer fallo: cuenta bloqueada automáticamente');

const intento4 = cliente.validarPassword('ClaveSegura1');
assert(intento4.exito === false && intento4.bloqueado === true, 'No permite acceso aun con clave correcta estando bloqueada');

console.log('\n=== TEST 6: MÉTODOS DE ARREGLOS EN CUENTA (POP, SHIFT, REDUCE, FILTER - TEMA 7) ===');
const cPrueba = new CuentaAhorros('401-0000001-1', '999', 500000);
cPrueba.registrarMovimiento(new Transaccion('APERTURA', 500000, 500000, 'Apertura inicial'));
cPrueba.consignar(100000, 'Consignacion 1'); // Saldo: 600.000
cPrueba.consignar(50000, 'Consignacion 2');  // Saldo: 650.000
cPrueba.calcularRetiro(30000);               // Saldo: 650.000 + 450 - 30.000 = 620.450
assert(cPrueba.movimientos.length === 4, 'Tiene 4 movimientos registrados con .push()');

const creditos = cPrueba.obtenerTotalCreditos();
assert(creditos === 150000, 'Reduce y filter calcularon $150.000 de créditos');

const debitos = cPrueba.obtenerTotalDebitos();
assert(debitos === 30000, 'Reduce y filter calcularon $30.000 de débitos');

const ultimo = cPrueba.eliminarUltimoMovimiento();
assert(ultimo.tipo === 'RETIRO' && cPrueba.movimientos.length === 3, 'pop() removió el último movimiento (RETIRO)');
assert(cPrueba.saldo === 650000, 'pop() restauró el saldo contable previo ($650.000)');

const primero = cPrueba.eliminarPrimerMovimiento();
assert(primero.tipo === 'APERTURA' && cPrueba.movimientos.length === 2, 'shift() removió el primer movimiento histórico');


console.log('\n=== TEST 7: ECOSISTEMA BRE-B INTEROPERABLE (CELULAR, CÉDULA, ALIAS) ===');
const mockStorage = {};
global.localStorage = {
    getItem: (k) => mockStorage[k] || null,
    setItem: (k, v) => { mockStorage[k] = String(v); },
    removeItem: (k) => { delete mockStorage[k]; }
};

// Cargar clientes demo en el mock storage
StorageService.guardarClientes(StorageService.crearClientesDemo());
const demoClientes = StorageService.obtenerClientes();
const cCarlos = demoClientes[0];
const cMaria = demoClientes[1];

// 1. Transferencia por Llave Celular
const resBrebCel = StorageService.transferir(
    cCarlos.cuentas[0].numeroCuenta,
    cMaria.celular,
    50000,
    'Almuerzo equipo',
    'LLAVE_CELULAR'
);
assert(resBrebCel.exito === true, 'Transferencia exitosa por Llave Bre-B Celular');
assert(resBrebCel.nuevoSaldo === 2450000, 'Debita $50.000 de la cuenta origen de Carlos');

// 2. Transferencia de regreso por Llave Documento (Cédula)
const resBrebDoc = StorageService.transferir(
    cMaria.cuentas[0].numeroCuenta,
    cCarlos.documento,
    20000,
    'Reembolso café',
    'LLAVE_DOCUMENTO'
);
assert(resBrebDoc.exito === true, 'Transferencia exitosa por Llave Bre-B Cédula');

// 3. Transferencia por Llave Alfanumérica (Username / Alias)
const resBrebAlias = StorageService.transferir(
    cCarlos.cuentas[0].numeroCuenta,
    '@mafe_ospina',
    10000,
    'Aporte Bre-B',
    'LLAVE_ALFANUMERICA'
);
assert(resBrebAlias.exito === true, 'Transferencia exitosa por Llave Bre-B Alias (@mafe_ospina)');

// 4. Rechazar llave inexistente
const resBrebInvalida = StorageService.transferir(
    cCarlos.cuentas[0].numeroCuenta,
    '3000000000',
    15000,
    'Prueba fallo',
    'LLAVE_CELULAR'
);
assert(resBrebInvalida.exito === false, 'Rechaza transferencia a Llave Bre-B no registrada');

// 5. Rechazar fondos insuficientes
const resBrebSinFondos = StorageService.transferir(
    cCarlos.cuentas[0].numeroCuenta,
    cMaria.celular,
    999999999,
    'Exceso fondos',
    'LLAVE_CELULAR'
);
assert(resBrebSinFondos.exito === false, 'Rechaza transferencia si los fondos son insuficientes');

console.log(`\n========================================`);
console.log(`RESULTADOS: ${pruebasPasadas}/${totalPruebas} pruebas pasadas.`);
console.log(`========================================\n`);

if (pruebasPasadas === totalPruebas) {
    process.exit(0);
} else {
    process.exit(1);
}
