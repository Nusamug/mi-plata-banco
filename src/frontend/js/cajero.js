// Manejo de la interfaz del cajero, productos, transferencias por Llave Bre-B y auditoría de estructuras de datos
document.addEventListener('DOMContentLoaded', () => {
    StorageService.inicializar();
    let clienteActivo = StorageService.obtenerSesionActiva();

    if (!clienteActivo) {
        window.location.href = 'login.html';
        return;
    }

    if (clienteActivo.estaBloqueado) {
        alert('Tu cuenta se encuentra bloqueada por seguridad.');
        StorageService.cerrarSesion();
        window.location.href = 'login.html';
        return;
    }

    let cuentaSeleccionada = clienteActivo.cuentas[0] || null;

    // Elementos de la interfaz
    const txtNombreUsuario = document.getElementById('txt-nombre-usuario');
    const txtDocUsuario = document.getElementById('txt-doc-usuario');
    const txtCelUsuario = document.getElementById('txt-cel-usuario');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    const cajeroAlerta = document.getElementById('cajero-alerta');
    const contenedorCuentas = document.getElementById('contenedor-cuentas');
    const txtCuentaActivaLabel = document.getElementById('txt-cuenta-activa-label');
    const tbodyMovimientos = document.getElementById('tbody-movimientos');
    const filtroTipoMov = document.getElementById('filtro-tipo-movimiento');
    const filtroBusquedaTexto = document.getElementById('filtro-busqueda-texto');

    // Botones de auditoría de arreglos (Tema 7)
    const btnPopMovimiento = document.getElementById('btn-pop-movimiento');
    const btnShiftMovimiento = document.getElementById('btn-shift-movimiento');

    // Botones de operaciones
    const botonesOp = document.querySelectorAll('.op-btn');
    const formConsignar = document.getElementById('form-op-consignar');
    const formRetirar = document.getElementById('form-op-retirar');
    const formTransferir = document.getElementById('form-op-transferir');
    const formCredito = document.getElementById('form-op-credito');
    const helperReglaRetiro = document.getElementById('helper-regla-retiro');

    // Campos de transferencia Bre-B
    const selectTransferirCanal = document.getElementById('transferir-canal');
    const labelTransferirDestino = document.getElementById('label-transferir-destino');
    const inputTransferirDestino = document.getElementById('transferir-destino');
    const helperTransferirDestino = document.getElementById('helper-transferir-destino');

    // Tarjeta de crédito
    const tcAvisoNoCuenta = document.getElementById('tc-aviso-no-cuenta');
    const tcContenedorOperaciones = document.getElementById('tc-contenedor-operaciones');
    const btnIrEstudioTC = document.getElementById('btn-ir-estudio-tc');
    const selectTcAccion = document.getElementById('tc-accion');
    const bloqueTcCompra = document.getElementById('tc-bloque-compra');
    const bloqueTcPago = document.getElementById('tc-bloque-pago');
    const inputTcMontoCompra = document.getElementById('tc-monto-compra');
    const selectTcCuotas = document.getElementById('tc-cuotas');
    const previewTcSim = document.getElementById('tc-sim-preview');
    const inputTcComercio = document.getElementById('tc-comercio');
    const inputTcMontoPago = document.getElementById('tc-monto-pago');

    // Modales de solicitud de productos
    const modalCorriente = document.getElementById('modal-solicitud-corriente');
    const btnCerrarModalCorriente = document.getElementById('btn-cerrar-modal-corriente');
    const formSolicitarCorriente = document.getElementById('form-solicitar-corriente');
    const inputCorrienteIngresos = document.getElementById('corriente-ingresos');
    const selectCorrienteActividad = document.getElementById('corriente-actividad');
    const corrienteFeedback = document.getElementById('corriente-feedback');

    const modalCredito = document.getElementById('modal-solicitud-credito');
    const btnCerrarModalCredito = document.getElementById('btn-cerrar-modal-credito');
    const formSolicitarCredito = document.getElementById('form-solicitar-credito');
    const inputCreditoIngresos = document.getElementById('credito-ingresos');
    const selectCreditoActividad = document.getElementById('credito-actividad');
    const creditoFeedback = document.getElementById('credito-feedback');
    const boxPreaprobado = document.getElementById('credito-preaprobado-box');
    const txtPreaprobado = document.getElementById('credito-preaprobado-texto');

    // Modal de comprobante digital
    const modalComprobante = document.getElementById('modal-comprobante');
    const btnCerrarComprobante = document.getElementById('btn-cerrar-comprobante');
    const btnImprimirComprobante = document.getElementById('btn-imprimir-comprobante');
    const recTitulo = document.getElementById('rec-titulo');
    const recFechaHora = document.getElementById('rec-fecha-hora');
    const recAprobacion = document.getElementById('rec-aprobacion');
    const recTitular = document.getElementById('rec-titular');
    const recProducto = document.getElementById('rec-producto');
    const recTipo = document.getElementById('rec-tipo');
    const recDetalle = document.getElementById('rec-detalle');
    const recMonto = document.getElementById('rec-monto');
    const recSaldoNuevo = document.getElementById('rec-saldo-nuevo');

    // Modal de perfil
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

    // Efectos sonoros nativos con Web Audio API (cero dependencias externas)
    function reproducirSonido(tipo = 'click') {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const audioCtx = new AudioContext();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            if (tipo === 'click') {
                osc.frequency.setValueAtTime(450, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.07);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.07);
            } else if (tipo === 'exito') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
                osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.12); // E5
                gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.4);
            } else if (tipo === 'alerta') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(220, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.2);
            }
        } catch (e) {
            // Manejo silencioso si el navegador bloquea audio antes de interacción
        }
    }

    // Comprobante digital térmico
    function mostrarComprobante(tipoOperacion, monto, detalle, cuenta, saldoNuevo) {
        if (!modalComprobante) return;
        const formateador = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
        const ahora = new Date();
        const fechaStr = ahora.toLocaleDateString('es-CO') + ' ' + ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const codAprobacion = Math.floor(100000 + Math.random() * 900000).toString();

        if (recTitulo) recTitulo.textContent = `COMPROBANTE DE ${tipoOperacion.toUpperCase()}`;
        if (recFechaHora) recFechaHora.textContent = fechaStr;
        if (recAprobacion) recAprobacion.textContent = codAprobacion;
        if (recTitular) recTitular.textContent = clienteActivo.nombreCompleto.toUpperCase();
        if (recProducto) recProducto.textContent = `${cuenta.tipo} - ${cuenta.numeroCuenta}`;
        if (recTipo) recTipo.textContent = tipoOperacion.toUpperCase();
        if (recDetalle) recDetalle.textContent = detalle || 'Transacción en Cajero Digital';
        if (recMonto) recMonto.textContent = formateador.format(monto);
        if (recSaldoNuevo) recSaldoNuevo.textContent = formateador.format(saldoNuevo);

        modalComprobante.classList.add('active');
        reproducirSonido('exito');
    }

    if (btnCerrarComprobante) {
        btnCerrarComprobante.addEventListener('click', () => {
            modalComprobante.classList.remove('active');
        });
    }

    if (btnImprimirComprobante) {
        btnImprimirComprobante.addEventListener('click', () => {
            window.print();
        });
    }

    // Métricas KPI de resumen financiero (Uso de reduce y filter - Tema 7)
    function actualizarMetricasKPI() {
        const kpiPatrimonio = document.getElementById('kpi-patrimonio');
        const kpiRendimientos = document.getElementById('kpi-rendimientos');
        const kpiDeuda = document.getElementById('kpi-deuda');
        const kpiTotalMov = document.getElementById('kpi-total-movimientos');
        const kpiSubCuenta = document.getElementById('kpi-sub-cuenta');

        if (!kpiPatrimonio) return;

        const formateador = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });

        // Total patrimonio en cuentas ordinarias (reduce + filter)
        const totalPatrimonio = clienteActivo.cuentas
            .filter(c => c.tipo !== 'CREDITO')
            .reduce((sum, c) => sum + c.saldo, 0);

        // Rendimientos acumulados generados en cuentas de ahorros
        const rendimientosTotales = clienteActivo.cuentas
            .filter(c => c.tipo === 'AHORROS')
            .reduce((acc, c) => {
                const rendCuenta = c.movimientos
                    .filter(tx => tx.tipo === 'RETIRO')
                    .reduce((sub, tx) => sub + Math.round(tx.monto * CuentaAhorros.TASA_RENDIMIENTO), 0);
                return acc + rendCuenta;
            }, 0);

        // Deuda total acumulada en tarjetas de crédito
        const totalDeuda = clienteActivo.cuentas
            .filter(c => c.tipo === 'CREDITO')
            .reduce((sum, c) => sum + (c.deudaActual || 0), 0);

        // Movimientos registrados en la cuenta activa seleccionada
        const numMovs = (cuentaSeleccionada && cuentaSeleccionada.movimientos) ? cuentaSeleccionada.movimientos.length : 0;

        kpiPatrimonio.textContent = formateador.format(totalPatrimonio);
        kpiRendimientos.textContent = '+' + formateador.format(rendimientosTotales);
        kpiDeuda.textContent = formateador.format(totalDeuda);
        kpiTotalMov.textContent = numMovs;
        if (kpiSubCuenta && cuentaSeleccionada) {
            kpiSubCuenta.textContent = `${cuentaSeleccionada.tipo}: ${cuentaSeleccionada.numeroCuenta}`;
        }
    }

    function recargarDatosCliente() {
        clienteActivo = StorageService.buscarPorDocumento(clienteActivo.documento);
        if (!clienteActivo) {
            window.location.href = 'login.html';
            return;
        }

        txtNombreUsuario.textContent = clienteActivo.nombreCompleto;
        txtDocUsuario.textContent = clienteActivo.documento;
        txtCelUsuario.textContent = clienteActivo.celular;

        if (cuentaSeleccionada) {
            cuentaSeleccionada = clienteActivo.obtenerCuenta(cuentaSeleccionada.numeroCuenta) || clienteActivo.cuentas[0];
        } else {
            cuentaSeleccionada = clienteActivo.cuentas[0];
        }

        renderizarTarjetasCuentas();
        actualizarLabelCuentaActiva();
        renderizarHistorialMovimientos();
        actualizarMetricasKPI();
    }

    function mostrarAlertaCajero(tipo, mensaje) {
        cajeroAlerta.className = `alert alert-${tipo}`;
        cajeroAlerta.textContent = mensaje;
        cajeroAlerta.style.display = 'flex';
        setTimeout(() => {
            cajeroAlerta.style.display = 'none';
        }, 7000);
    }

    // Renderiza las cuentas activas y las tarjetas de solicitud si no tiene corriente o crédito
    function renderizarTarjetasCuentas() {
        contenedorCuentas.innerHTML = '';

        // 1. Cuentas activas del cliente
        clienteActivo.cuentas.forEach((cuenta) => {
            const esActiva = cuentaSeleccionada && cuentaSeleccionada.numeroCuenta === cuenta.numeroCuenta;
            const cardEl = document.createElement('div');

            let claseColor = 'card-ahorros';
            let labelTipo = 'Cuenta de Ahorros';
            let balanceLabel = 'Saldo Disponible';
            let balanceValor = cuenta.saldoFormateado;
            let infoExtra = '';
            let numeroMostrar = cuenta.numeroCuenta;

            if (cuenta.tipo === 'AHORROS') {
                claseColor = 'card-ahorros';
                labelTipo = 'Cuenta de Ahorros';
                infoExtra = `<span>Rendimiento: <strong>1.5% al retiro</strong></span><span>Estado: Activa</span>`;
            } else if (cuenta.tipo === 'CORRIENTE') {
                claseColor = 'card-corriente';
                labelTipo = 'Cuenta Corriente';
                const limite = cuenta.limiteRetiroDisponible;
                const formateadoLimite = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(limite);
                infoExtra = `<span>Sobregiro: <strong>20% (${formateadoLimite})</strong></span><span>Uso frecuente</span>`;
            } else if (cuenta.tipo === 'CREDITO') {
                claseColor = 'card-credito';
                labelTipo = cuenta.franquicia || 'Tarjeta de Crédito';
                balanceLabel = 'Cupo Disponible';
                balanceValor = cuenta.cupoDisponibleFormateado;
                numeroMostrar = cuenta.numeroFormateado;
                infoExtra = `<span>Cupo: <strong>${cuenta.cupoTotalFormateado}</strong></span><span>Deuda: <strong>${cuenta.deudaActualFormateada}</strong></span><span>Vence: <strong>${cuenta.fechaVencimiento || '10/31'}</strong></span>`;
            }

            cardEl.className = `bank-card ${claseColor} ${esActiva ? 'active-account' : ''}`;
            cardEl.innerHTML = `
                <div class="card-top">
                    <span class="card-type-tag">${labelTipo}</span>
                    <div class="card-chip"></div>
                </div>
                <div class="card-number">${numeroMostrar}</div>
                <div class="card-balance-label">${balanceLabel}</div>
                <div class="card-balance-value">${balanceValor}</div>
                <div class="card-extra-info">
                    ${infoExtra}
                </div>
            `;

            cardEl.addEventListener('click', () => {
                reproducirSonido('click');
                cuentaSeleccionada = cuenta;
                renderizarTarjetasCuentas();
                actualizarLabelCuentaActiva();
                renderizarHistorialMovimientos();
                actualizarMetricasKPI();

                if (cuenta.tipo === 'CREDITO') {
                    activarOperacion('credito');
                }
            });

            contenedorCuentas.appendChild(cardEl);
        });

        // 2. Si no tiene Cuenta Corriente, mostrar tarjeta de solicitud
        const tieneCorriente = clienteActivo.obtenerCuentaPorTipo('CORRIENTE');
        if (!tieneCorriente) {
            const cardPromoCorriente = document.createElement('div');
            cardPromoCorriente.className = 'bank-card';
            cardPromoCorriente.style.background = '#f1f5f9';
            cardPromoCorriente.style.border = '2px dashed var(--navy-600)';
            cardPromoCorriente.style.color = 'var(--navy-900)';
            cardPromoCorriente.innerHTML = `
                <div class="card-top">
                    <span class="product-badge badge-corriente">Disponible</span>
                    <span style="font-size: 1.3rem;">🏢</span>
                </div>
                <h4 style="font-size: 1.1rem; margin-top: 0.25rem;">Cuenta Corriente</h4>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.5rem 0 1rem;">
                    Habilita línea de sobregiro del 20% para tu actividad comercial previa certificación de ingresos.
                </p>
                <button type="button" class="btn btn-outline" id="btn-abrir-solicitud-corriente" style="font-size: 0.82rem; width: 100%; padding: 0.5rem;">
                    Solicitar Cuenta Corriente
                </button>
            `;
            contenedorCuentas.appendChild(cardPromoCorriente);

            cardPromoCorriente.querySelector('#btn-abrir-solicitud-corriente').addEventListener('click', () => {
                reproducirSonido('click');
                modalCorriente.classList.add('active');
            });
        }

        // 3. Si no tiene Tarjeta de Crédito, mostrar tarjeta de solicitud
        const tieneCredito = clienteActivo.obtenerCuentaPorTipo('CREDITO');
        if (!tieneCredito) {
            const cardPromoCredito = document.createElement('div');
            cardPromoCredito.className = 'bank-card';
            cardPromoCredito.style.background = '#fffbeb';
            cardPromoCredito.style.border = '2px dashed var(--gold-500)';
            cardPromoCredito.style.color = 'var(--navy-900)';
            cardPromoCredito.innerHTML = `
                <div class="card-top">
                    <span class="product-badge badge-credito">Preaprobado</span>
                    <span style="font-size: 1.3rem;">💳</span>
                </div>
                <h4 style="font-size: 1.1rem; margin-top: 0.25rem;">Tarjeta de Crédito Visa</h4>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.5rem 0 1rem;">
                    Difiere compras hasta 36 cuotas (0% de interés a 1 o 2 cuotas). Solicita tu estudio crediticio en 1 minuto.
                </p>
                <button type="button" class="btn btn-accent" id="btn-abrir-solicitud-credito" style="font-size: 0.82rem; width: 100%; padding: 0.5rem;">
                    Iniciar Estudio de Crédito
                </button>
            `;
            contenedorCuentas.appendChild(cardPromoCredito);

            cardPromoCredito.querySelector('#btn-abrir-solicitud-credito').addEventListener('click', () => {
                reproducirSonido('click');
                modalCredito.classList.add('active');
            });
        }
    }

    function actualizarLabelCuentaActiva() {
        if (!cuentaSeleccionada) {
            txtCuentaActivaLabel.textContent = 'Ninguna seleccionada';
            return;
        }

        txtCuentaActivaLabel.textContent = `${cuentaSeleccionada.tipo} (${cuentaSeleccionada.numeroCuenta}) - Saldo: ${cuentaSeleccionada.saldoFormateado}`;

        if (cuentaSeleccionada.tipo === 'AHORROS') {
            helperReglaRetiro.textContent = 'Regla Ahorros: Aplica 1.5% de rendimiento financiero sobre el retiro. Saldo disponible: ' + cuentaSeleccionada.saldoFormateado;
        } else if (cuentaSeleccionada.tipo === 'CORRIENTE') {
            const limite = cuentaSeleccionada.limiteRetiroDisponible;
            const limFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(limite);
            helperReglaRetiro.textContent = `Regla Corriente: Admite sobregiro del 20%. Puedes retirar hasta ${limFormateado}.`;
        } else if (cuentaSeleccionada.tipo === 'CREDITO') {
            helperReglaRetiro.textContent = `Regla Crédito: Los retiros aplican como avance en efectivo a 12 cuotas. Cupo: ${cuentaSeleccionada.cupoDisponibleFormateado}.`;
        }
    }

    // Navegación entre operaciones
    function activarOperacion(nombreOp) {
        botonesOp.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.op === nombreOp);
        });

        formConsignar.style.display = nombreOp === 'consignar' ? 'block' : 'none';
        formRetirar.style.display = nombreOp === 'retirar' ? 'block' : 'none';
        formTransferir.style.display = nombreOp === 'transferir' ? 'block' : 'none';
        formCredito.style.display = nombreOp === 'credito' ? 'block' : 'none';

        if (nombreOp === 'credito') {
            const tieneTC = Boolean(clienteActivo.obtenerCuentaPorTipo('CREDITO'));
            tcAvisoNoCuenta.style.display = tieneTC ? 'none' : 'block';
            tcContenedorOperaciones.style.display = tieneTC ? 'block' : 'none';
        }
    }

    botonesOp.forEach(btn => {
        btn.addEventListener('click', () => {
            reproducirSonido('click');
            activarOperacion(btn.dataset.op);
        });
    });

    if (btnIrEstudioTC) {
        btnIrEstudioTC.addEventListener('click', () => {
            reproducirSonido('click');
            modalCredito.classList.add('active');
        });
    }

    // Chips de montos rápidos (Consignar y Retirar)
    document.querySelectorAll('.chip-consignar').forEach(chip => {
        chip.addEventListener('click', () => {
            reproducirSonido('click');
            const inputMonto = document.getElementById('consignar-monto');
            if (inputMonto) {
                inputMonto.value = chip.dataset.monto;
                inputMonto.focus();
            }
        });
    });

    document.querySelectorAll('.chip-retiro').forEach(chip => {
        chip.addEventListener('click', () => {
            reproducirSonido('click');
            const inputMonto = document.getElementById('retirar-monto');
            if (inputMonto) {
                inputMonto.value = chip.dataset.monto;
                inputMonto.focus();
            }
        });
    });

    // 1. Consignar
    formConsignar.addEventListener('submit', (e) => {
        e.preventDefault();
        const monto = parseFloat(document.getElementById('consignar-monto').value);
        const concepto = document.getElementById('consignar-concepto').value.trim() || 'Depósito en cajero';

        if (cuentaSeleccionada.tipo === 'CREDITO') {
            mostrarAlertaCajero('warning', 'Para ingresar fondos a la Tarjeta de Crédito, utiliza la opción "Pagar Deuda".');
            reproducirSonido('alerta');
            return;
        }

        const res = cuentaSeleccionada.consignar(monto, concepto);
        if (!res.exito) {
            mostrarAlertaCajero('danger', res.mensaje);
            reproducirSonido('alerta');
            return;
        }

        StorageService.actualizarCliente(clienteActivo);
        mostrarAlertaCajero('success', res.mensaje);
        mostrarComprobante('Consignación en Efectivo', monto, concepto, cuentaSeleccionada, cuentaSeleccionada.saldo);
        formConsignar.reset();
        recargarDatosCliente();
    });

    // 2. Retirar
    formRetirar.addEventListener('submit', (e) => {
        e.preventDefault();
        const monto = parseFloat(document.getElementById('retirar-monto').value);
        const res = cuentaSeleccionada.calcularRetiro(monto);

        if (!res.exito) {
            mostrarAlertaCajero('danger', res.mensaje);
            reproducirSonido('alerta');
            return;
        }

        StorageService.actualizarCliente(clienteActivo);
        mostrarAlertaCajero('success', res.mensaje);
        mostrarComprobante('Retiro en Efectivo', monto, 'Retiro de efectivo en terminal ATM', cuentaSeleccionada, cuentaSeleccionada.saldo);
        formRetirar.reset();
        recargarDatosCliente();
    });

    // 3. Canales de Transferencia Bre-B
    selectTransferirCanal.addEventListener('change', () => {
        const canal = selectTransferirCanal.value;
        if (canal === 'LLAVE_CELULAR') {
            labelTransferirDestino.textContent = 'Celular del Destinatario (Bre-B):';
            inputTransferirDestino.placeholder = 'Ej: 3209876543 (María Fernanda)';
            helperTransferirDestino.textContent = 'Transfiere inmediatamente a cualquier cuenta asociada a este celular.';
        } else if (canal === 'LLAVE_DOCUMENTO') {
            labelTransferirDestino.textContent = 'Cédula / Documento del Destinatario (Bre-B):';
            inputTransferirDestino.placeholder = 'Ej: 987654321';
            helperTransferirDestino.textContent = 'Transfiere usando el documento de identidad como llave bancaria.';
        } else {
            labelTransferirDestino.textContent = 'Número de Cuenta Bancaria:';
            inputTransferirDestino.placeholder = 'Ej: 401-9900112-5';
            helperTransferirDestino.textContent = 'Transfiere directamente al número de cuenta registrado.';
        }
    });

    formTransferir.addEventListener('submit', (e) => {
        e.preventDefault();
        const destino = inputTransferirDestino.value.trim();
        const monto = parseFloat(document.getElementById('transferir-monto').value);
        const motivo = document.getElementById('transferir-concepto').value.trim() || 'Transferencia inmediata';
        const canal = selectTransferirCanal.value;

        if (cuentaSeleccionada.tipo === 'CREDITO') {
            mostrarAlertaCajero('warning', 'No se pueden realizar transferencias directas desde una Tarjeta de Crédito.');
            reproducirSonido('alerta');
            return;
        }

        const res = StorageService.transferir(cuentaSeleccionada.numeroCuenta, destino, monto, motivo, canal);

        if (!res.exito) {
            mostrarAlertaCajero('danger', res.mensaje);
            reproducirSonido('alerta');
            return;
        }

        mostrarAlertaCajero('success', res.mensaje);
        mostrarComprobante('Transferencia Bre-B', monto, `Destino: ${destino} (${motivo})`, cuentaSeleccionada, cuentaSeleccionada.saldo);
        formTransferir.reset();
        recargarDatosCliente();
    });

    // 4. Tarjeta de crédito
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
            mostrarAlertaCajero('danger', 'Aún no posees una Tarjeta de Crédito activa.');
            reproducirSonido('alerta');
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
                reproducirSonido('alerta');
                return;
            }

            StorageService.actualizarCliente(clienteActivo);
            mostrarAlertaCajero('success', res.mensaje);
            mostrarComprobante(`Compra Tarjeta (${cuotas} cuotas)`, monto, `Comercio: ${comercio}`, cuentaTC, cuentaTC.cupoDisponible);
            inputTcMontoCompra.value = '';
            actualizarPreviewSimuladorTC();
            recargarDatosCliente();
        } else {
            const montoPago = parseFloat(inputTcMontoPago.value);
            const res = cuentaTC.pagarDeuda(montoPago);

            if (!res.exito) {
                mostrarAlertaCajero('danger', res.mensaje);
                reproducirSonido('alerta');
                return;
            }

            StorageService.actualizarCliente(clienteActivo);
            mostrarAlertaCajero('success', res.mensaje);
            mostrarComprobante('Abono a Tarjeta de Crédito', montoPago, 'Pago a deuda de tarjeta de crédito', cuentaTC, cuentaTC.cupoDisponible);
            inputTcMontoPago.value = '';
            recargarDatosCliente();
        }
    });

    // 5. Historial de Movimientos con Filtro de Texto (filter) y Estructuras
    function renderizarHistorialMovimientos() {
        tbodyMovimientos.innerHTML = '';

        if (!cuentaSeleccionada || !cuentaSeleccionada.movimientos) {
            tbodyMovimientos.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Sin movimientos registrados.</td></tr>';
            return;
        }

        const filtro = filtroTipoMov.value;
        const textoBusqueda = filtroBusquedaTexto ? filtroBusquedaTexto.value.trim().toLowerCase() : '';

        // Filtrado dinámico de arreglos con .filter()
        const movimientos = cuentaSeleccionada.movimientos.filter(m => {
            const cumpleTipo = filtro === 'TODOS' || m.tipo === filtro;
            if (!cumpleTipo) return false;
            if (!textoBusqueda) return true;

            const matchDetalle = m.detalle && m.detalle.toLowerCase().includes(textoBusqueda);
            const matchFecha = m.fecha && m.fecha.includes(textoBusqueda);
            const matchMonto = m.monto && m.monto.toString().includes(textoBusqueda);
            return matchDetalle || matchFecha || matchMonto;
        });

        if (movimientos.length === 0) {
            tbodyMovimientos.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No se encontraron movimientos para esta cuenta con los criterios aplicados.</td></tr>';
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

    if (filtroBusquedaTexto) {
        filtroBusquedaTexto.addEventListener('input', renderizarHistorialMovimientos);
    }

    // Auditoría interactiva de Arreglos (Tema 7): pop y shift
    if (btnPopMovimiento) {
        btnPopMovimiento.addEventListener('click', () => {
            if (!cuentaSeleccionada || !cuentaSeleccionada.movimientos || cuentaSeleccionada.movimientos.length === 0) {
                mostrarAlertaCajero('warning', 'No hay movimientos en el arreglo para desapilar (.pop).');
                reproducirSonido('alerta');
                return;
            }
            const removido = cuentaSeleccionada.eliminarUltimoMovimiento();
            if (removido) {
                reproducirSonido('click');
                StorageService.actualizarCliente(clienteActivo);
                recargarDatosCliente();
                mostrarAlertaCajero('info', `⎌ Movimiento reciente desapilado con .pop(): ${removido.tipo} (${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(removido.monto)}). Restan ${cuentaSeleccionada.movimientos.length} en el arreglo.`);
            }
        });
    }

    if (btnShiftMovimiento) {
        btnShiftMovimiento.addEventListener('click', () => {
            if (!cuentaSeleccionada || !cuentaSeleccionada.movimientos || cuentaSeleccionada.movimientos.length === 0) {
                mostrarAlertaCajero('warning', 'No hay movimientos en el arreglo para depurar (.shift).');
                reproducirSonido('alerta');
                return;
            }
            const removido = cuentaSeleccionada.eliminarPrimerMovimiento();
            if (removido) {
                reproducirSonido('click');
                StorageService.actualizarCliente(clienteActivo);
                recargarDatosCliente();
                mostrarAlertaCajero('info', `🧹 Movimiento inicial depurado con .shift(): ${removido.tipo} (${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(removido.monto)}). Restan ${cuentaSeleccionada.movimientos.length} en el arreglo.`);
            }
        });
    }

    // 6. Solicitud de Cuenta Corriente
    btnCerrarModalCorriente.addEventListener('click', () => modalCorriente.classList.remove('active'));

    formSolicitarCorriente.addEventListener('submit', (e) => {
        e.preventDefault();
        const ingresos = parseFloat(inputCorrienteIngresos.value);
        const actividad = selectCorrienteActividad.value;

        const res = StorageService.solicitarCuentaCorriente(clienteActivo.documento, ingresos, actividad);

        if (!res.exito) {
            corrienteFeedback.className = 'alert alert-danger';
            corrienteFeedback.textContent = res.mensaje;
            corrienteFeedback.style.display = 'flex';
            reproducirSonido('alerta');
            return;
        }

        corrienteFeedback.className = 'alert alert-success';
        corrienteFeedback.textContent = res.mensaje;
        corrienteFeedback.style.display = 'flex';
        reproducirSonido('exito');

        setTimeout(() => {
            modalCorriente.classList.remove('active');
            corrienteFeedback.style.display = 'none';
            formSolicitarCorriente.reset();
            recargarDatosCliente();
            mostrarAlertaCajero('success', '✓ Cuenta Corriente habilitada con 20% de sobregiro.');
        }, 1500);
    });

    // 7. Estudio Crediticio para Tarjeta de Crédito
    btnCerrarModalCredito.addEventListener('click', () => modalCredito.classList.remove('active'));

    inputCreditoIngresos.addEventListener('input', () => {
        const ingresos = parseFloat(inputCreditoIngresos.value) || 0;
        if (ingresos >= 3500000) {
            boxPreaprobado.style.display = 'block';
            txtPreaprobado.innerHTML = '<strong>Cupo Aprobado: $6.000.000 COP</strong> (Franquicia Visa Gold)';
        } else if (ingresos >= 1500000) {
            boxPreaprobado.style.display = 'block';
            txtPreaprobado.innerHTML = '<strong>Cupo Aprobado: $2.500.000 COP</strong> (Franquicia Visa Clásica)';
        } else if (ingresos > 0) {
            boxPreaprobado.style.display = 'block';
            txtPreaprobado.innerHTML = '<span style="color: var(--crimson-600);">Capacidad insuficiente (Mínimo $1.500.000 COP).</span>';
        } else {
            boxPreaprobado.style.display = 'none';
        }
    });

    formSolicitarCredito.addEventListener('submit', (e) => {
        e.preventDefault();
        const ingresos = parseFloat(inputCreditoIngresos.value);
        const actividad = selectCreditoActividad.value;

        const res = StorageService.solicitarTarjetaCredito(clienteActivo.documento, ingresos, actividad);

        if (!res.exito) {
            creditoFeedback.className = 'alert alert-danger';
            creditoFeedback.textContent = res.mensaje;
            creditoFeedback.style.display = 'flex';
            reproducirSonido('alerta');
            return;
        }

        creditoFeedback.className = 'alert alert-success';
        creditoFeedback.textContent = res.mensaje;
        creditoFeedback.style.display = 'flex';
        reproducirSonido('exito');

        setTimeout(() => {
            modalCredito.classList.remove('active');
            creditoFeedback.style.display = 'none';
            formSolicitarCredito.reset();
            boxPreaprobado.style.display = 'none';
            recargarDatosCliente();
            mostrarAlertaCajero('success', '✓ Tarjeta de Crédito emitida y lista para compras.');
        }, 1500);
    });

    // 8. Perfil y seguridad
    btnAbrirPerfil.addEventListener('click', () => {
        reproducirSonido('click');
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

    btnCerrarModalPerfil.addEventListener('click', () => modalPerfil.classList.remove('active'));

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
            reproducirSonido('alerta');
            return;
        }

        let nuevaPassword = null;
        if (passNueva || passConfirm || passActual) {
            if (passActual !== clienteActivo.password) {
                mostrarFeedbackPerfil('danger', 'La contraseña actual ingresada es incorrecta.');
                reproducirSonido('alerta');
                return;
            }
            if (passNueva.length < 6) {
                mostrarFeedbackPerfil('warning', 'La nueva contraseña debe tener mínimo 6 caracteres.');
                reproducirSonido('alerta');
                return;
            }
            if (passNueva !== passConfirm) {
                mostrarFeedbackPerfil('danger', 'Las nuevas contraseñas no coinciden.');
                reproducirSonido('alerta');
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
        mostrarFeedbackPerfil('success', 'Datos actualizados exitosamente.');
        reproducirSonido('exito');

        setTimeout(() => {
            modalPerfil.classList.remove('active');
            recargarDatosCliente();
            mostrarAlertaCajero('success', 'Perfil actualizado.');
        }, 1200);
    });

    btnEliminarCuenta.addEventListener('click', () => {
        const confirmar = confirm(`¿Estás seguro de eliminar tu cuenta de usuario (${clienteActivo.nombreCompleto})?`);
        if (confirmar) {
            StorageService.eliminarCliente(clienteActivo.documento);
            alert('Cuenta eliminada.');
            window.location.href = 'index.html';
        }
    });

    btnCerrarSesion.addEventListener('click', () => {
        StorageService.cerrarSesion();
        window.location.href = 'login.html';
    });

    recargarDatosCliente();
});
