// Manejo de la interfaz y operaciones del cajero
document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificación de Seguridad y Sesión
    StorageService.inicializar();
    let clienteActivo = StorageService.obtenerSesionActiva();

    if (!clienteActivo) {
        // Redirigir a login si no hay sesión
        window.location.href = 'login.html';
        return;
    }

    if (clienteActivo.estaBloqueado) {
        alert('Tu cuenta se encuentra bloqueada por seguridad. Inicia sesión nuevamente.');
        StorageService.cerrarSesion();
        window.location.href = 'login.html';
        return;
    }

    // Cuenta actualmente seleccionada para operar
    let cuentaSeleccionada = clienteActivo.cuentas[0] || null;

    // Elementos del DOM - Encabezado y Datos de Usuario
    const txtNombreUsuario = document.getElementById('txt-nombre-usuario');
    const txtDocUsuario = document.getElementById('txt-doc-usuario');
    const txtCelUsuario = document.getElementById('txt-cel-usuario');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    const cajeroAlerta = document.getElementById('cajero-alerta');
    const contenedorCuentas = document.getElementById('contenedor-cuentas');
    const txtCuentaActivaLabel = document.getElementById('txt-cuenta-activa-label');
    const tbodyMovimientos = document.getElementById('tbody-movimientos');
    const filtroTipoMov = document.getElementById('filtro-tipo-movimiento');

    // Elementos de Operaciones Rápidas
    const botonesOp = document.querySelectorAll('.op-btn');
    const formConsignar = document.getElementById('form-op-consignar');
    const formRetirar = document.getElementById('form-op-retirar');
    const formTransferir = document.getElementById('form-op-transferir');
    const formCredito = document.getElementById('form-op-credito');
    const helperReglaRetiro = document.getElementById('helper-regla-retiro');

    // Elementos Tarjeta de Crédito
    const selectTcAccion = document.getElementById('tc-accion');
    const bloqueTcCompra = document.getElementById('tc-bloque-compra');
    const bloqueTcPago = document.getElementById('tc-bloque-pago');
    const inputTcMontoCompra = document.getElementById('tc-monto-compra');
    const selectTcCuotas = document.getElementById('tc-cuotas');
    const previewTcSim = document.getElementById('tc-sim-preview');
    const inputTcComercio = document.getElementById('tc-comercio');
    const inputTcMontoPago = document.getElementById('tc-monto-pago');

    // Elementos Modal Perfil
    const btnAbrirPerfil = document.getElementById('btn-abrir-perfil');
    const btnCerrarModalPerfil = document.getElementById('btn-cerrar-modal-perfil');
    const modalPerfil = document.getElementById('modal-perfil');
    const formEditarPerfil = document.getElementById('form-editar-perfil');
    const perfilDoc = document.getElementById('perfil-doc');
    const perfilUsername = document.getElementById('perfil-username');
    const perfilNombre = document.getElementById('perfil-nombre');
    const perfilCelular = document.getElementById('perfil-celular');
    const perfilPassActual = document.getElementById('perfil-pass-actual');
    const perfilPassNueva = document.getElementById('perfil-pass-nueva');
    const perfilPassConfirm = document.getElementById('perfil-pass-confirm');
    const perfilFeedback = document.getElementById('perfil-feedback');
    const btnEliminarCuenta = document.getElementById('btn-eliminar-cuenta');

    // Inicializar Datos en Pantalla
    function recargarDatosCliente() {
        // Refrescar desde LocalStorage para sincronía
        clienteActivo = StorageService.buscarPorDocumento(clienteActivo.documento);
        if (!clienteActivo) {
            window.location.href = 'login.html';
            return;
        }

        txtNombreUsuario.textContent = clienteActivo.nombreCompleto;
        txtDocUsuario.textContent = clienteActivo.documento;
        txtCelUsuario.textContent = clienteActivo.celular;

        // Mantener la cuenta seleccionada o asignar la primera
        if (cuentaSeleccionada) {
            cuentaSeleccionada = clienteActivo.obtenerCuenta(cuentaSeleccionada.numeroCuenta) || clienteActivo.cuentas[0];
        } else {
            cuentaSeleccionada = clienteActivo.cuentas[0];
        }

        renderizarTarjetasCuentas();
        actualizarLabelCuentaActiva();
        renderizarHistorialMovimientos();
    }

    function mostrarAlertaCajero(tipo, mensaje) {
        cajeroAlerta.className = `alert alert-${tipo}`;
        cajeroAlerta.textContent = mensaje;
        cajeroAlerta.style.display = 'flex';
        // Autoocultar tras 7 segundos
        setTimeout(() => {
            cajeroAlerta.style.display = 'none';
        }, 7000);
    }

    // Renderizado de Tarjetas de Productos Financieros
    function renderizarTarjetasCuentas() {
        contenedorCuentas.innerHTML = '';

        clienteActivo.cuentas.forEach((cuenta) => {
            const esActiva = cuentaSeleccionada && cuentaSeleccionada.numeroCuenta === cuenta.numeroCuenta;
            const cardEl = document.createElement('div');

            let claseColor = 'card-ahorros';
            let labelTipo = 'Cuenta de Ahorros';
            let balanceLabel = 'Saldo Disponible';
            let balanceValor = cuenta.saldoFormateado;
            let infoExtra = '';

            if (cuenta.tipo === 'AHORROS') {
                claseColor = 'card-ahorros';
                labelTipo = 'Cuenta de Ahorros';
                infoExtra = `<span>Rendimiento: <strong>1.5% al retiro</strong></span><span>Estado: Activa</span>`;
            } else if (cuenta.tipo === 'CORRIENTE') {
                claseColor = 'card-corriente';
                labelTipo = 'Cuenta Corriente';
                const limite = cuenta.limiteRetiroDisponible;
                const formateadoLimite = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(limite);
                infoExtra = `<span>Sobregiro: <strong>20% máx (${formateadoLimite})</strong></span><span>Uso frecuente</span>`;
            } else if (cuenta.tipo === 'CREDITO') {
                claseColor = 'card-credito';
                labelTipo = 'Tarjeta de Crédito';
                balanceLabel = 'Cupo Disponible';
                balanceValor = cuenta.cupoDisponibleFormateado;
                infoExtra = `<span>Cupo Total: <strong>${cuenta.cupoTotalFormateado}</strong></span><span>Deuda: <strong>${cuenta.deudaActualFormateada}</strong></span>`;
            }

            cardEl.className = `bank-card ${claseColor} ${esActiva ? 'active-account' : ''}`;
            cardEl.innerHTML = `
                <div class="card-top">
                    <span class="card-type-tag">${labelTipo}</span>
                    <div class="card-chip"></div>
                </div>
                <div class="card-number">${cuenta.numeroCuenta}</div>
                <div class="card-balance-label">${balanceLabel}</div>
                <div class="card-balance-value">${balanceValor}</div>
                <div class="card-extra-info">
                    ${infoExtra}
                </div>
            `;

            cardEl.addEventListener('click', () => {
                cuentaSeleccionada = cuenta;
                renderizarTarjetasCuentas();
                actualizarLabelCuentaActiva();
                renderizarHistorialMovimientos();

                // Si selecciona tarjeta de crédito, conmutar directamente a la pestaña de crédito
                if (cuenta.tipo === 'CREDITO') {
                    activarOperacion('credito');
                }
            });

            contenedorCuentas.appendChild(cardEl);
        });
    }

    function actualizarLabelCuentaActiva() {
        if (!cuentaSeleccionada) {
            txtCuentaActivaLabel.textContent = 'Ninguna seleccionada';
            return;
        }

        txtCuentaActivaLabel.textContent = `${cuentaSeleccionada.tipo} (${cuentaSeleccionada.numeroCuenta}) - Saldo: ${cuentaSeleccionada.saldoFormateado}`;

        // Actualizar ayuda contextual para el retiro
        if (cuentaSeleccionada.tipo === 'AHORROS') {
            helperReglaRetiro.textContent = 'Regla Ahorros: Aplica 1.5% de rendimiento financiero sobre el retiro. Saldo máx: ' + cuentaSeleccionada.saldoFormateado;
        } else if (cuentaSeleccionada.tipo === 'CORRIENTE') {
            const limite = cuentaSeleccionada.limiteRetiroDisponible;
            const limFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(limite);
            helperReglaRetiro.textContent = `Regla Corriente: Admite sobregiro del 20%. Puedes retirar hasta ${limFormateado}.`;
        } else if (cuentaSeleccionada.tipo === 'CREDITO') {
            helperReglaRetiro.textContent = `Regla Crédito: Los retiros aplican como avance en efectivo a 12 cuotas. Cupo disponible: ${cuentaSeleccionada.cupoDisponibleFormateado}.`;
        }
    }

    // Navegación de Formularios de Operación
    function activarOperacion(nombreOp) {
        botonesOp.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.op === nombreOp);
        });

        formConsignar.style.display = nombreOp === 'consignar' ? 'block' : 'none';
        formRetirar.style.display = nombreOp === 'retirar' ? 'block' : 'none';
        formTransferir.style.display = nombreOp === 'transferir' ? 'block' : 'none';
        formCredito.style.display = nombreOp === 'credito' ? 'block' : 'none';
    }

    botonesOp.forEach(btn => {
        btn.addEventListener('click', () => {
            activarOperacion(btn.dataset.op);
        });
    });

    // 1. Operación: Consignar
    formConsignar.addEventListener('submit', (e) => {
        e.preventDefault();
        const monto = parseFloat(document.getElementById('consignar-monto').value);
        const concepto = document.getElementById('consignar-concepto').value.trim() || 'Depósito en cajero';

        if (cuentaSeleccionada.tipo === 'CREDITO') {
            mostrarAlertaCajero('warning', 'Para ingresar fondos a la Tarjeta de Crédito, utiliza la opción "Pagar Deuda".');
            return;
        }

        const res = cuentaSeleccionada.consignar(monto, concepto);
        if (!res.exito) {
            mostrarAlertaCajero('danger', res.mensaje);
            return;
        }

        StorageService.actualizarCliente(clienteActivo);
        mostrarAlertaCajero('success', res.mensaje);
        formConsignar.reset();
        recargarDatosCliente();
    });

    // Retiro de dinero
    formRetirar.addEventListener('submit', (e) => {
        e.preventDefault();
        const monto = parseFloat(document.getElementById('retirar-monto').value);

        const res = cuentaSeleccionada.calcularRetiro(monto);

        if (!res.exito) {
            mostrarAlertaCajero('danger', res.mensaje);
            return;
        }

        StorageService.actualizarCliente(clienteActivo);
        mostrarAlertaCajero('success', res.mensaje);
        formRetirar.reset();
        recargarDatosCliente();
    });

    // 3. Operación: Transferir
    formTransferir.addEventListener('submit', (e) => {
        e.preventDefault();
        const cuentaDestino = document.getElementById('transferir-destino').value.trim();
        const monto = parseFloat(document.getElementById('transferir-monto').value);
        const motivo = document.getElementById('transferir-concepto').value.trim() || 'Transferencia inmediata';

        if (cuentaSeleccionada.tipo === 'CREDITO') {
            mostrarAlertaCajero('warning', 'No se pueden realizar transferencias directas desde una Tarjeta de Crédito.');
            return;
        }

        const res = StorageService.transferir(cuentaSeleccionada.numeroCuenta, cuentaDestino, monto, motivo);

        if (!res.exito) {
            mostrarAlertaCajero('danger', res.mensaje);
            return;
        }

        mostrarAlertaCajero('success', res.mensaje);
        formTransferir.reset();
        recargarDatosCliente();
    });

    // 4. Operaciones de Tarjeta de Crédito
    selectTcAccion.addEventListener('change', () => {
        const esCompra = selectTcAccion.value === 'compra';
        bloqueTcCompra.style.display = esCompra ? 'block' : 'none';
        bloqueTcPago.style.display = esCompra ? 'none' : 'block';
    });

    function actualizarPreviewSimuladorTC() {
        const cuentaTC = clienteActivo.obtenerCuentaPorTipo('CREDITO');
        if (!cuentaTC) return;

        const monto = parseFloat(inputTcMontoCompra.value) || 0;
        const cuotas = parseInt(selectTcCuotas.value, 10) || 1;

        if (monto > 0) {
            try {
                const sim = cuentaTC.calcularCuotaMensual(monto, cuotas);
                const formateador = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
                previewTcSim.innerHTML = `
                    Cuota mensual: <strong>${formateador.format(sim.cuotaMensual)}</strong> | 
                    Tasa: <strong>${sim.tasaPorcentaje}</strong> | 
                    Total: <strong>${formateador.format(sim.totalPagar)}</strong>
                `;
            } catch (e) {
                previewTcSim.textContent = 'Monto no válido para cálculo.';
            }
        } else {
            previewTcSim.innerHTML = 'Ingresa un valor para calcular la cuota mensual.';
        }
    }

    inputTcMontoCompra.addEventListener('input', actualizarPreviewSimuladorTC);
    selectTcCuotas.addEventListener('change', actualizarPreviewSimuladorTC);

    formCredito.addEventListener('submit', (e) => {
        e.preventDefault();
        const cuentaTC = clienteActivo.obtenerCuentaPorTipo('CREDITO');
        if (!cuentaTC) {
            mostrarAlertaCajero('danger', 'El cliente no tiene una Tarjeta de Crédito activa.');
            return;
        }

        const accion = selectTcAccion.value;

        if (accion === 'compra') {
            const monto = parseFloat(inputTcMontoCompra.value);
            const cuotas = parseInt(selectTcCuotas.value, 10);
            const comercio = inputTcComercio.value.trim() || 'Comercio general';

            const res = cuentaTC.realizarCompra(monto, cuotas, comercio);
            if (!res.exito) {
                mostrarAlertaCajero('danger', res.mensaje);
                return;
            }

            StorageService.actualizarCliente(clienteActivo);
            mostrarAlertaCajero('success', res.mensaje);
            inputTcMontoCompra.value = '';
            actualizarPreviewSimuladorTC();
            recargarDatosCliente();
        } else {
            // Pago de Deuda
            const montoPago = parseFloat(inputTcMontoPago.value);
            const res = cuentaTC.pagarDeuda(montoPago);

            if (!res.exito) {
                mostrarAlertaCajero('danger', res.mensaje);
                return;
            }

            StorageService.actualizarCliente(clienteActivo);
            mostrarAlertaCajero('success', res.mensaje);
            inputTcMontoPago.value = '';
            recargarDatosCliente();
        }
    });

    // 5. Historial de Movimientos
    function renderizarHistorialMovimientos() {
        tbodyMovimientos.innerHTML = '';

        if (!cuentaSeleccionada || !cuentaSeleccionada.movimientos) {
            tbodyMovimientos.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Sin movimientos registrados.</td></tr>';
            return;
        }

        const filtro = filtroTipoMov.value;
        const movimientos = cuentaSeleccionada.movimientos.filter(m => {
            if (filtro === 'TODOS') return true;
            return m.tipo === filtro;
        });

        if (movimientos.length === 0) {
            tbodyMovimientos.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No se encontraron movimientos para esta cuenta con el filtro aplicado.</td></tr>';
            return;
        }

        const formateador = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

        movimientos.forEach(tx => {
            const tr = document.createElement('tr');
            const esEgreso = tx.tipo === 'RETIRO' || tx.tipo === 'TRANSFERENCIA_ENVIADA' || tx.tipo === 'COMPRA_CREDITO';
            const claseMonto = esEgreso ? 'negative' : 'positive';
            const signo = esEgreso ? '-' : '+';

            tr.innerHTML = `
                <td>
                    <div style="font-weight: 600;">${tx.fecha}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${tx.hora}</div>
                </td>
                <td>
                    <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase;">
                        ${tx.tipo.replace('_', ' ')}
                    </span>
                </td>
                <td>${tx.detalle || 'Transacción en cajero'}</td>
                <td class="tx-amount ${claseMonto}">
                    ${signo}${formateador.format(tx.monto)}
                </td>
                <td style="font-weight: 600;">
                    ${formateador.format(tx.saldoPosterior)}
                </td>
            `;
            tbodyMovimientos.appendChild(tr);
        });
    }

    filtroTipoMov.addEventListener('change', renderizarHistorialMovimientos);

    // 6. Modal de Perfil y CRUD de Usuario
    btnAbrirPerfil.addEventListener('click', () => {
        perfilDoc.value = clienteActivo.documento;
        perfilUsername.value = clienteActivo.username;
        perfilNombre.value = clienteActivo.nombreCompleto;
        perfilCelular.value = clienteActivo.celular;
        perfilPassActual.value = '';
        perfilPassNueva.value = '';
        perfilPassConfirm.value = '';
        perfilFeedback.style.display = 'none';
        modalPerfil.classList.add('active');
    });

    btnCerrarModalPerfil.addEventListener('click', () => {
        modalPerfil.classList.remove('active');
    });

    modalPerfil.addEventListener('click', (e) => {
        if (e.target === modalPerfil) {
            modalPerfil.classList.remove('active');
        }
    });

    // Guardar Edición de Perfil
    formEditarPerfil.addEventListener('submit', (e) => {
        e.preventDefault();
        const nuevoNombre = perfilNombre.value.trim();
        const nuevoCelular = perfilCelular.value.trim();
        const passActual = perfilPassActual.value;
        const passNueva = perfilPassNueva.value;
        const passConfirm = perfilPassConfirm.value;

        function mostrarFeedbackPerfil(tipo, msg) {
            perfilFeedback.className = `alert alert-${tipo}`;
            perfilFeedback.textContent = msg;
            perfilFeedback.style.display = 'flex';
        }

        if (!nuevoNombre || !nuevoCelular) {
            mostrarFeedbackPerfil('warning', 'El nombre y celular son obligatorios.');
            return;
        }

        let nuevaPassword = null;
        if (passNueva || passConfirm || passActual) {
            if (passActual !== clienteActivo.password) {
                mostrarFeedbackPerfil('danger', 'La contraseña actual ingresada es incorrecta.');
                return;
            }
            if (passNueva.length < 6) {
                mostrarFeedbackPerfil('warning', 'La nueva contraseña debe tener mínimo 6 caracteres.');
                return;
            }
            if (passNueva !== passConfirm) {
                mostrarFeedbackPerfil('danger', 'Las nuevas contraseñas no coinciden.');
                return;
            }
            nuevaPassword = passNueva;
        }

        clienteActivo.actualizarDatos({
            nombreCompleto: nuevoNombre,
            celular: nuevoCelular,
            password: nuevaPassword || undefined
        });

        StorageService.actualizarCliente(clienteActivo);
        mostrarFeedbackPerfil('success', '✓ Datos del cliente actualizados exitosamente.');

        setTimeout(() => {
            modalPerfil.classList.remove('active');
            recargarDatosCliente();
            mostrarAlertaCajero('success', 'Perfil y credenciales actualizados.');
        }, 1200);
    });

    // Eliminar cuenta del usuario
    btnEliminarCuenta.addEventListener('click', () => {
        const confirmar = confirm(`¿Estás completamente seguro de eliminar tu cuenta de usuario (${clienteActivo.nombreCompleto})? Esta acción borrará permanentemente todas tus cuentas bancarias asociadas.`);
        if (confirmar) {
            StorageService.eliminarCliente(clienteActivo.documento);
            alert('Tu cuenta de usuario ha sido eliminada del sistema.');
            window.location.href = 'index.html';
        }
    });

    // 7. Cerrar Sesión
    btnCerrarSesion.addEventListener('click', () => {
        StorageService.cerrarSesion();
        window.location.href = 'login.html';
    });

    // Render Inicial
    recargarDatosCliente();
});
