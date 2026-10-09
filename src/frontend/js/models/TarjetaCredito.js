// Tarjeta de Crédito con cálculo de cuotas por amortización francesa
class TarjetaCredito extends Cuenta {
    constructor(numeroCuenta, titularId, cupoTotal = 3000000, deudaInicial = 0, opciones = {}) {
        super(numeroCuenta, titularId, cupoTotal - deudaInicial, 'CREDITO');
        this._cupoTotal = Number(cupoTotal);
        this._deudaActual = Math.max(0, Number(deudaInicial));
        this._comprasActivas = [];
        
        // Datos bancarios estándar de tarjeta plástica
        this._franquicia = opciones.franquicia || 'VISA';
        this._fechaVencimiento = opciones.fechaVencimiento || '10/31';
        this._cvv = opciones.cvv || String(Math.floor(100 + Math.random() * 900));
    }

    get cupoTotal() {
        return this._cupoTotal;
    }

    get deudaActual() {
        return this._deudaActual;
    }

    get cupoDisponible() {
        return Math.max(0, this._cupoTotal - this._deudaActual);
    }

    get franquicia() {
        return this._franquicia;
    }

    get fechaVencimiento() {
        return this._fechaVencimiento;
    }

    get cvv() {
        return this._cvv;
    }

    // Formato de 16 dígitos en bloques de 4
    get numeroFormateado() {
        const digitos = String(this._numeroCuenta).replace(/\D/g, '');
        if (digitos.length === 16) {
            return digitos.replace(/(\d{4})(?=\d)/g, '$1 ');
        }
        return this._numeroCuenta;
    }

    get cupoTotalFormateado() {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(this._cupoTotal);
    }

    get deudaActualFormateada() {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(this._deudaActual);
    }

    get cupoDisponibleFormateado() {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(this.cupoDisponible);
    }

    // Tasa según el número de cuotas
    static obtenerTasaMensual(cuotas) {
        const n = parseInt(cuotas, 10);
        if (n <= 2) return 0.00;
        if (n <= 6) return 0.019;
        return 0.023;
    }

    // Fórmula de amortización: Cuota = (P * i) / (1 - (1 + i)^-n)
    calcularCuotaMensual(capital, cuotas) {
        const p = Number(capital);
        const n = parseInt(cuotas, 10);
        const i = TarjetaCredito.obtenerTasaMensual(n);

        if (isNaN(p) || p <= 0 || isNaN(n) || n <= 0) {
            throw new Error("Capital y cuotas deben ser valores positivos.");
        }

        let cuotaMensual = 0;
        if (i === 0) {
            cuotaMensual = Math.round(p / n);
        } else {
            cuotaMensual = Math.round((p * i) / (1 - Math.pow(1 + i, -n)));
        }

        const totalPagar = cuotaMensual * n;
        const totalIntereses = Math.max(0, totalPagar - p);

        return {
            capital: p,
            cuotas: n,
            tasaMensual: i,
            tasaPorcentaje: (i * 100).toFixed(1) + '%',
            cuotaMensual,
            totalPagar,
            totalIntereses
        };
    }

    // Registra una compra con cargo al cupo
    realizarCompra(monto, cuotas, comercio = 'Compra general') {
        const valor = Number(monto);
        const n = parseInt(cuotas, 10) || 1;

        if (isNaN(valor) || valor <= 0) {
            return { exito: false, mensaje: 'El monto de la compra debe ser mayor a $0.' };
        }

        if (valor > this.cupoDisponible) {
            return {
                exito: false,
                mensaje: `Cupo insuficiente. Tu cupo disponible es ${this.cupoDisponibleFormateado} y la compra es por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor)}.`
            };
        }

        const amortizacion = this.calcularCuotaMensual(valor, n);
        this._deudaActual += valor;
        this._saldo = this.cupoDisponible;

        const detalle = `Compra en ${comercio} (${n} cuota${n > 1 ? 's' : ''} a ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amortizacion.cuotaMensual)}/mes - Tasa: ${amortizacion.tasaPorcentaje})`;
        const tx = new Transaccion('COMPRA_CREDITO', valor, this.cupoDisponible, detalle);
        this._movimientos.push(tx);

        this._comprasActivas.push({
            id: tx.id,
            monto: valor,
            cuotas: n,
            cuotaMensual: amortizacion.cuotaMensual,
            totalPagar: amortizacion.totalPagar,
            tasaPorcentaje: amortizacion.tasaPorcentaje,
            comercio,
            fecha: tx.fecha
        });

        return {
            exito: true,
            mensaje: `Compra aprobada en ${comercio}. Cuota mensual estimada: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amortizacion.cuotaMensual)} a ${n} meses (${amortizacion.tasaPorcentaje} mes). Cupo restante: ${this.cupoDisponibleFormateado}`,
            amortizacion,
            transaccion: tx
        };
    }

    // Los retiros en tarjeta aplican como un avance
    calcularRetiro(monto) {
        return this.realizarCompra(monto, 12, 'Avance en efectivo cajero');
    }

    // Paga parte o la totalidad de la deuda y libera cupo
    pagarDeuda(monto) {
        const valor = Number(monto);
        if (isNaN(valor) || valor <= 0) {
            return { exito: false, mensaje: 'El monto de pago debe ser mayor a $0.' };
        }

        if (this._deudaActual === 0) {
            return { exito: false, mensaje: 'La tarjeta no presenta saldo pendiente por pagar.' };
        }

        const montoEfectivo = Math.min(valor, this._deudaActual);
        this._deudaActual -= montoEfectivo;
        this._saldo = this.cupoDisponible;

        const tx = new Transaccion('PAGO_TARJETA', montoEfectivo, this.cupoDisponible, 'Abono a deuda de tarjeta de crédito');
        this._movimientos.push(tx);

        return {
            exito: true,
            mensaje: `Pago exitoso por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(montoEfectivo)}. Deuda actual: ${this.deudaActualFormateada}. Cupo disponible: ${this.cupoDisponibleFormateado}`,
            deudaActual: this._deudaActual,
            cupoDisponible: this.cupoDisponible,
            transaccion: tx
        };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            cupoTotal: this._cupoTotal,
            deudaActual: this._deudaActual,
            comprasActivas: this._comprasActivas,
            franquicia: this._franquicia,
            fechaVencimiento: this._fechaVencimiento,
            cvv: this._cvv
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TarjetaCredito;
}
