// Cuenta de Ahorros con rendimiento del 1.5% al momento del retiro
class CuentaAhorros extends Cuenta {
    static TASA_RENDIMIENTO = 0.015; // 1.5%

    constructor(numeroCuenta, titularId, saldoInicial = 0) {
        super(numeroCuenta, titularId, saldoInicial, 'AHORROS');
    }

    // Calcula el retiro aplicando el 1.5% de rendimiento sobre el monto retirado
    calcularRetiro(monto) {
        const valor = Number(monto);
        if (isNaN(valor) || valor <= 0) {
            return {
                exito: false,
                mensaje: 'El monto a retirar debe ser mayor a $0.',
                saldo: this._saldo
            };
        }

        // Valida que no exceda el saldo
        if (valor > this._saldo) {
            return {
                exito: false,
                mensaje: `Fondos insuficientes. Su saldo disponible es de ${this.saldoFormateado}, no puede retirar ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor)}.`,
                saldo: this._saldo
            };
        }

        // Rendimiento ganado
        const rendimiento = Math.round(valor * CuentaAhorros.TASA_RENDIMIENTO);
        this._saldo = this._saldo + rendimiento - valor;

        const txRetiro = new Transaccion(
            'RETIRO',
            valor,
            this._saldo,
            `Retiro en efectivo (+rendimiento 1.5%: +$${rendimiento.toLocaleString('es-CO')})`
        );
        this._movimientos.push(txRetiro);

        return {
            exito: true,
            mensaje: `Retiro exitoso por ${txRetiro.montoFormateado}. ¡Has ganado ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(rendimiento)} por rendimiento de ahorro (1.5%)! Nuevo saldo: ${this.saldoFormateado}`,
            saldo: this._saldo,
            rendimientoGenerado: rendimiento,
            transaccion: txRetiro
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CuentaAhorros;
}
