// Clase base para las cuentas bancarias
class Cuenta {
    constructor(numeroCuenta, titularId, saldoInicial = 0, tipo = 'GENERICA') {
        if (new.target === Cuenta) {
            throw new TypeError("No se puede instanciar la clase abstracta Cuenta directamente.");
        }
        this._numeroCuenta = String(numeroCuenta);
        this._titularId = String(titularId);
        this._saldo = Math.max(0, Number(saldoInicial));
        this._tipo = tipo;
        this._movimientos = [];
    }

    // Getters de acceso
    get numeroCuenta() {
        return this._numeroCuenta;
    }

    get titularId() {
        return this._titularId;
    }

    get saldo() {
        return this._saldo;
    }

    get tipo() {
        return this._tipo;
    }

    get movimientos() {
        return [...this._movimientos].sort((a, b) => b.timestamp - a.timestamp);
    }

    get saldoFormateado() {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(this._saldo);
    }

    // Ingreso de dinero a la cuenta
    consignar(monto, detalle = 'Consignación en efectivo') {
        const valor = Number(monto);
        if (isNaN(valor) || valor <= 0) {
            return {
                exito: false,
                mensaje: 'El monto a consignar debe ser un valor numérico positivo mayor a $0.',
                saldo: this._saldo
            };
        }

        this._saldo += valor;
        const tx = new Transaccion('CONSIGNACION', valor, this._saldo, detalle);
        this._movimientos.push(tx);

        return {
            exito: true,
            mensaje: `Consignación exitosa por ${tx.montoFormateado}. Nuevo saldo: ${this.saldoFormateado}`,
            saldo: this._saldo,
            transaccion: tx
        };
    }

    // Método que implementa cada tipo de cuenta
    calcularRetiro(monto) {
        throw new Error("El método calcularRetiro() debe ser implementado por la subclase.");
    }

    registrarMovimiento(transaccion) {
        this._movimientos.push(transaccion);
    }

    // Métodos de manipulación de estructuras de datos (Arreglos: pop, shift, reduce)
    eliminarUltimoMovimiento() {
        if (this._movimientos.length === 0) return null;
        return this._movimientos.pop();
    }

    eliminarPrimerMovimiento() {
        if (this._movimientos.length === 0) return null;
        return this._movimientos.shift();
    }

    // Calcula el total acumulado de dinero movido usando reduce y filter
    obtenerTotalDebitos() {
        return this._movimientos
            .filter(tx => tx.tipo === 'RETIRO' || tx.tipo === 'TRANSFERENCIA_ENVIADA' || tx.tipo === 'COMPRA_CREDITO')
            .reduce((total, tx) => total + tx.monto, 0);
    }

    obtenerTotalCreditos() {
        return this._movimientos
            .filter(tx => tx.tipo === 'CONSIGNACION' || tx.tipo === 'TRANSFERENCIA_RECIBIDA' || tx.tipo === 'PAGO_TARJETA')
            .reduce((total, tx) => total + tx.monto, 0);
    }

    toJSON() {
        return {
            numeroCuenta: this._numeroCuenta,
            titularId: this._titularId,
            saldo: this._saldo,
            tipo: this._tipo,
            movimientos: this._movimientos
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cuenta;
}
