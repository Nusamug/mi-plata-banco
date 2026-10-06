// Control del simulador de cuotas en la landing page
document.addEventListener('DOMContentLoaded', () => {
    StorageService.inicializar();

    const inputMonto = document.getElementById('sim-monto');
    const selectCuotas = document.getElementById('sim-cuotas');
    const btnCalcular = document.getElementById('btn-calcular-simulador');

    const txtTasa = document.getElementById('sim-tasa-aplicada');
    const txtCuota = document.getElementById('sim-cuota-mensual');
    const txtIntereses = document.getElementById('sim-intereses-totales');
    const txtTotal = document.getElementById('sim-total-pagar');

    const simuladorTC = new TarjetaCredito('TC-SIMULADOR', '00000000', 10000000, 0);

    function actualizarSimulacion() {
        const monto = parseFloat(inputMonto.value);
        const cuotas = parseInt(selectCuotas.value, 10);

        if (isNaN(monto) || monto <= 0) {
            alert('Ingresa un monto válido mayor a $0.');
            return;
        }

        try {
            const resultado = simuladorTC.calcularCuotaMensual(monto, cuotas);

            const formateador = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0
            });

            txtTasa.textContent = resultado.tasaPorcentaje + ' mes';
            txtCuota.textContent = formateador.format(resultado.cuotaMensual);
            txtIntereses.textContent = formateador.format(resultado.totalIntereses);
            txtTotal.textContent = formateador.format(resultado.totalPagar);
        } catch (error) {
            console.error('Error al calcular:', error);
        }
    }

    if (btnCalcular) {
        btnCalcular.addEventListener('click', actualizarSimulacion);
    }
    if (selectCuotas) {
        selectCuotas.addEventListener('change', actualizarSimulacion);
    }

    actualizarSimulacion();
});
