// Cuenta Corriente con sobregiro del 20%
class CuentaCorriente extends Cuenta {
    static PORCENTAJE_SOBREGIRO = 0.20; // 20%

    constructor(numeroCuenta, titularId, saldoInicial = 0) {
        super(numeroCuenta, titularId, saldoInicial, 'CORRIENTE');
    }

    // Límite máximo de retiro incluyendo el sobregiro del 20%
    get limiteRetiroDisponible() {
        if (this._saldo > 0) {
            return this._saldo * (1 + CuentaCorriente.PORCENTAJE_SOBREGIRO);
        }
        return 0;
    }

    // Calcula el retiro permitiendo saldo negativo hasta el 20% del saldo positivo
    calcularRetiro(monto) {
        const valor = Number(monto);
        if (isNaN(valor) || valor <= 0) {
            return {
                exito: false,
                mensaje: 'El monto a retirar debe ser mayor a $0.',
                saldo: this._saldo
            };
        }

        const maximoPermitido = this.limiteRetiroDisponible;

        if (valor > maximoPermitido) {
            return {
                exito: false,
                mensaje: `Operación denegada. El retiro excede el límite máximo autorizado de ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(maximoPermitido)} (saldo actual ${this.saldoFormateado} + 20% de sobregiro).`,
                saldo: this._saldo
            };
        }

        this._saldo -= valor;

        const utilizoSobregiro = this._saldo < 0;
        const montoSobregiro = utilizoSobregiro ? Math.abs(this._saldo) : 0;

        const detalle = utilizoSobregiro
            ? `Retiro en cuenta corriente (uso de sobregiro: -$${montoSobregiro.toLocaleString('es-CO')})`
            : 'Retiro en cuenta corriente';

        const txRetiro = new Transaccion('RETIRO', valor, this._saldo, detalle);
        this._movimientos.push(txRetiro);

        return {
            exito: true,
            mensaje: `Retiro exitoso por ${txRetiro.montoFormateado}.${utilizoSobregiro ? ` Se aplicó sobregiro bancario por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(montoSobregiro)}.` : ''} Nuevo saldo: ${this.saldoFormateado}`,
            saldo: this._saldo,
            utilizoSobregiro,
            montoSobregiro,
            transaccion: txRetiro
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CuentaCorriente;
}
