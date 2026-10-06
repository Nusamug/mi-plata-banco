// Registro de movimientos y transacciones bancarias
class Transaccion {
    constructor(tipo, monto, saldoPosterior, detalle = '') {
        this.id = 'TX-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        const ahora = new Date();
        this.fecha = ahora.toLocaleDateString('es-CO');
        this.hora = ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        this.timestamp = ahora.getTime();
        this.tipo = tipo;
        this.monto = Number(monto);
        this.saldoPosterior = Number(saldoPosterior);
        this.detalle = detalle;
    }

    // Formato de moneda para mostrar en la interfaz
    get montoFormateado() {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(this.monto);
    }

    get saldoPosteriorFormateado() {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(this.saldoPosterior);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Transaccion;
}
