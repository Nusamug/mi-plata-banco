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
    const btnReiniciarDemo = document.getElementById('btn-reiniciar-cajero-demo');
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
    const inputRetirarMonto = document.getElementById('retirar-monto');
    const previewRetiroSim = document.getElementById('retiro-sim-preview');

    // Campos de transferencia Bre-B
    const selectTransferirCanal = document.getElementById('transferir-canal');
    const labelTransferirDestino = document.getElementById('label-transferir-destino');
    const inputTransferirDestino = document.getElementById('transferir-destino');
    const helperTransferirDestino = document.getElementById('helper-transferir-destino');
    const btnChipMiOtraCuenta = document.getElementById('btn-chip-mi-otra-cuenta');

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
    const txtTcDeudaResumen = document.getElementById('txt-tc-deuda-resumen');
    const txtTcCuotaResumen = document.getElementById('txt-tc-cuota-resumen');
    const btnTcPagarCuota = document.getElementById('btn-tc-pagar-cuota');
    const btnTcPagarTotal = document.getElementById('btn-tc-pagar-total');
    const selectTcOrigenPago = document.getElementById('tc-origen-pago');

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

    const formateadorCOP = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    });

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
    function mostrarComprobante(tipoOperacion, monto, detalle, cuenta, saldoNuevo, fechaHoraPersonalizada = null) {
        if (!modalComprobante) return;
        const ahora = new Date();
        const fechaStr = fechaHoraPersonalizada || (ahora.toLocaleDateString('es-CO') + ' ' + ahora.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        const codAprobacion = Math.floor(100000 + Math.random() * 900000).toString();

        const numMostrado = cuenta.tipo === 'CREDITO' ? cuenta.numeroFormateado : cuenta.numeroCuenta;

        if (recTitulo) recTitulo.textContent = `COMPROBANTE DE ${tipoOperacion.toUpperCase()}`;
        if (recFechaHora) recFechaHora.textContent = fechaStr;
        if (recAprobacion) recAprobacion.textContent = codAprobacion;
        if (recTitular) recTitular.textContent = clienteActivo.nombreCompleto.toUpperCase();
        if (recProducto) recProducto.textContent = `${cuenta.tipo} · ${numMostrado}`;
        if (recTipo) recTipo.textContent = tipoOperacion.toUpperCase();
        if (recDetalle) recDetalle.textContent = detalle || 'Transacción en Cajero Digital';
        if (recMonto) recMonto.textContent = formateadorCOP.format(monto);
        if (recSaldoNuevo) recSaldoNuevo.textContent = formateadorCOP.format(saldoNuevo);

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

        // 1. Total patrimonio en cuentas ordinarias (reduce + filter)
        const totalPatrimonio = clienteActivo.cuentas
            .filter(c => c.tipo !== 'CREDITO')
            .reduce((sum, c) => sum + c.saldo, 0);

        // 2. Rendimientos acumulados generados en cuentas de ahorros (1.5% sobre retiros)
        const rendimientosTotales = clienteActivo.cuentas
            .filter(c => c.tipo === 'AHORROS')
            .reduce((acc, c) => {
                const rendCuenta = c.movimientos
                    .filter(tx => tx.tipo === 'RETIRO')
                    .reduce((sub, tx) => sub + Math.round(tx.monto * CuentaAhorros.TASA_RENDIMIENTO), 0);
                return acc + rendCuenta;
            }, 0);

        // 3. Deuda total acumulada en tarjetas de crédito
        const totalDeuda = clienteActivo.cuentas
            .filter(c => c.tipo === 'CREDITO')
            .reduce((sum, c) => sum + (c.deudaActual || 0), 0);

        // 4. Movimientos registrados en la cuenta activa seleccionada
        const numMovs = (cuentaSeleccionada && cuentaSeleccionada.movimientos) ? cuentaSeleccionada.movimientos.length : 0;

        kpiPatrimonio.textContent = formateadorCOP.format(totalPatrimonio);
        kpiRendimientos.textContent = '+' + formateadorCOP.format(rendimientosTotales);
        kpiDeuda.textContent = formateadorCOP.format(totalDeuda);
        kpiTotalMov.textContent = numMovs;
        if (kpiSubCuenta && cuentaSeleccionada) {
            kpiSubCuenta.textContent = `${cuentaSeleccionada.tipo}: ${cuentaSeleccionada.numeroCuenta}`;
        }
    }

    // Actualiza el resumen de deuda en la pestaña de pago de Tarjeta de Crédito
    function actualizarResumenPagoTC() {
        const cuentaTC = clienteActivo.obtenerCuentaPorTipo('CREDITO');
        if (!cuentaTC || !txtTcDeudaResumen || !txtTcCuotaResumen) return;

        txtTcDeudaResumen.textContent = cuentaTC.deudaActualFormateada;
        txtTcCuotaResumen.textContent = formateadorCOP.format(cuentaTC.cuotaMensualEstimada);
    }

    // Simulador matemático en vivo para Retiros (Ahorros 1.5%, Corriente 20% sobregiro, Crédito avance)
    function actualizarPreviewRetiro() {
        if (!previewRetiroSim || !cuentaSeleccionada) return;
        const monto = parseFloat(inputRetirarMonto.value) || 0;

        if (monto <= 0) {
            previewRetiroSim.innerHTML = 'Selecciona o escribe un monto para previsualizar el cálculo bancario.';
            return;
        }

        if (cuentaSeleccionada.tipo === 'AHORROS') {
            const bono = Math.round(monto * CuentaAhorros.TASA_RENDIMIENTO);
            const saldoFinal = cuentaSeleccionada.saldo + bono - monto;
            if (monto > cuentaSeleccionada.saldo) {
                previewRetiroSim.innerHTML = `<span style="color: var(--crimson-600); font-weight: 600;">⚠️ Excede tu saldo disponible (${cuentaSeleccionada.saldoFormateado}). En Ahorros no hay sobregiro.</span>`;
            } else {
                previewRetiroSim.innerHTML = `
                    <div><strong>Regla Ahorros (1.5% rendimiento):</strong> Ganas <strong style="color: var(--emerald-600);">+${formateadorCOP.format(bono)}</strong> por este retiro.</div>
                    <div>Saldo final proyectado: <strong>${formateadorCOP.format(saldoFinal)}</strong></div>
                `;
            }
        } else if (cuentaSeleccionada.tipo === 'CORRIENTE') {
            const maxDisponible = cuentaSeleccionada.limiteRetiroDisponible;
            const saldoFinal = cuentaSeleccionada.saldo - monto;
            if (monto > maxDisponible) {
                previewRetiroSim.innerHTML = `<span style="color: var(--crimson-600); font-weight: 600;">⚠️ Excede el tope máximo con 20% de sobregiro (${formateadorCOP.format(maxDisponible)}).</span>`;
            } else if (saldoFinal < 0) {
                previewRetiroSim.innerHTML = `
                    <div><strong>Regla Corriente (Uso de Sobregiro 20%):</strong> Utilizarás <strong style="color: var(--crimson-600);">${formateadorCOP.format(Math.abs(saldoFinal))}</strong> de cupo de sobregiro.</div>
                    <div>Saldo final en sobregiro: <strong>${formateadorCOP.format(saldoFinal)}</strong></div>
                `;
            } else {
                previewRetiroSim.innerHTML = `
                    <div><strong>Retiro ordinario sin usar sobregiro.</strong></div>
                    <div>Saldo final proyectado: <strong>${formateadorCOP.format(saldoFinal)}</strong></div>
                `;
            }
        } else if (cuentaSeleccionada.tipo === 'CREDITO') {
            if (monto > cuentaSeleccionada.cupoDisponible) {
                previewRetiroSim.innerHTML = `<span style="color: var(--crimson-600); font-weight: 600;">⚠️ Supera el cupo disponible de tu tarjeta (${cuentaSeleccionada.cupoDisponibleFormateado}).</span>`;
            } else {
                const sim = cuentaSeleccionada.calcularCuotaMensual(monto, 12);
                previewRetiroSim.innerHTML = `
                    <div><strong>Avance en Efectivo a 12 cuotas (Tasa ${sim.tasaPorcentaje}):</strong></div>
                    <div>Cuota fija mensual: <strong>${formateadorCOP.format(sim.cuotaMensual)}</strong> | Cupo restante: <strong>${formateadorCOP.format(cuentaSeleccionada.cupoDisponible - monto)}</strong></div>
                `;
            }
        }
    }

    if (inputRetirarMonto) {
        inputRetirarMonto.addEventListener('input', actualizarPreviewRetiro);
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
        actualizarResumenPagoTC();
        actualizarPreviewRetiro();
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
                const formateadoLimite = formateadorCOP.format(limite);
                const estadoSobregiro = cuenta.saldo < 0 ? `<span style="color: #fca5a5; font-weight: 700;">En Sobregiro</span>` : `<span>Uso comercial</span>`;
                infoExtra = `<span>Tope (+20%): <strong>${formateadoLimite}</strong></span>${estadoSobregiro}`;
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
                actualizarPreviewRetiro();

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
            cardPromoCorriente.style.background = '#f6f6f9';
            cardPromoCorriente.style.border = '2px dashed var(--cesde-charcoal)';
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
            cardPromoCredito.style.background = '#fdf2f8';
            cardPromoCredito.style.border = '2px dashed var(--cesde-magenta)';
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

        const etiquetaSaldo = cuentaSeleccionada.tipo === 'CREDITO'
            ? `Cupo Disp: ${cuentaSeleccionada.cupoDisponibleFormateado}`
            : `Saldo: ${cuentaSeleccionada.saldoFormateado}`;

        txtCuentaActivaLabel.textContent = `${cuentaSeleccionada.tipo} (${cuentaSeleccionada.numeroCuenta}) · ${etiquetaSaldo}`;

        if (cuentaSeleccionada.tipo === 'AHORROS') {
            helperReglaRetiro.textContent = 'Regla Ahorros: Aplica 1.5% de rendimiento financiero sobre el monto retirado. Disponible: ' + cuentaSeleccionada.saldoFormateado;
        } else if (cuentaSeleccionada.tipo === 'CORRIENTE') {
            const limite = cuentaSeleccionada.limiteRetiroDisponible;
            helperReglaRetiro.textContent = `Regla Corriente: Admite sobregiro del 20%. Puedes retirar hasta ${formateadorCOP.format(limite)}.`;
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
            actualizarResumenPagoTC();
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

    // Chips de montos rápidos (Consignar, Retirar, Transferir, TC y Estudios)
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
            if (inputRetirarMonto) {
                inputRetirarMonto.value = chip.dataset.monto;
                actualizarPreviewRetiro();
                inputRetirarMonto.focus();
            }
        });
    });

    document.querySelectorAll('.chip-transferir-monto').forEach(chip => {
        chip.addEventListener('click', () => {
            reproducirSonido('click');
            const inputMonto = document.getElementById('transferir-monto');
            if (inputMonto) {
                inputMonto.value = chip.dataset.monto;
                inputMonto.focus();
            }
        });
    });

    document.querySelectorAll('.chip-tc-compra').forEach(chip => {
        chip.addEventListener('click', () => {
            reproducirSonido('click');
            if (inputTcMontoCompra) {
                inputTcMontoCompra.value = chip.dataset.monto;
                actualizarPreviewSimuladorTC();
                inputTcMontoCompra.focus();
            }
        });
    });

    document.querySelectorAll('.chip-ingreso-corriente').forEach(chip => {
        chip.addEventListener('click', () => {
            reproducirSonido('click');
            if (inputCorrienteIngresos) {
                inputCorrienteIngresos.value = chip.dataset.monto;
            }
        });
    });

    document.querySelectorAll('.chip-ingreso-tc').forEach(chip => {
        chip.addEventListener('click', () => {
            reproducirSonido('click');
            if (inputCreditoIngresos) {
                inputCreditoIngresos.value = chip.dataset.monto;
                inputCreditoIngresos.dispatchEvent(new Event('input'));
            }
        });
    });

    // Directorio rápido de destinatarios Bre-B
    document.querySelectorAll('.chip-contacto-breb').forEach(chip => {
        chip.addEventListener('click', () => {
            reproducirSonido('click');
            selectTransferirCanal.value = chip.dataset.canal;
            selectTransferirCanal.dispatchEvent(new Event('change'));
            inputTransferirDestino.value = chip.dataset.destino;
        });
    });

    if (btnChipMiOtraCuenta) {
        btnChipMiOtraCuenta.addEventListener('click', () => {
            reproducirSonido('click');
            const otraCuenta = clienteActivo.cuentas.find(
                c => c.tipo !== 'CREDITO' && (!cuentaSeleccionada || c.numeroCuenta !== cuentaSeleccionada.numeroCuenta)
            );
            if (!otraCuenta) {
                mostrarAlertaCajero('warning', 'Solo tienes una cuenta de depósito activa. Solicita primero tu Cuenta Corriente para transferir entre tus propias cuentas.');
                return;
            }
            selectTransferirCanal.value = 'CUENTA';
            selectTransferirCanal.dispatchEvent(new Event('change'));
            inputTransferirDestino.value = otraCuenta.numeroCuenta;
            document.getElementById('transferir-concepto').value = `Traspaso propio hacia ${otraCuenta.tipo}`;
        });
    }

    // 1. Consignar
    formConsignar.addEventListener('submit', (e) => {
        e.preventDefault();
        const monto = parseFloat(document.getElementById('consignar-monto').value);
        const concepto = document.getElementById('consignar-concepto').value.trim() || 'Depósito en cajero';

        if (cuentaSeleccionada.tipo === 'CREDITO') {
            mostrarAlertaCajero('warning', 'Para abonar dinero a la Tarjeta de Crédito, hemos cambiado a la pestaña "T. Crédito -> Pagar / Abonar a la Deuda".');
            activarOperacion('credito');
            selectTcAccion.value = 'pago';
            selectTcAccion.dispatchEvent(new Event('change'));
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
        document.getElementById('consignar-concepto').value = 'Depósito en cajero';
        recargarDatosCliente();
    });

    // 2. Retirar
    formRetirar.addEventListener('submit', (e) => {
        e.preventDefault();
        const monto = parseFloat(inputRetirarMonto.value);
        const res = cuentaSeleccionada.calcularRetiro(monto);

        if (!res.exito) {
            mostrarAlertaCajero('danger', res.mensaje);
            reproducirSonido('alerta');
            return;
        }

        StorageService.actualizarCliente(clienteActivo);
        mostrarAlertaCajero('success', res.mensaje);
        const detalleRecibo = res.transaccion ? res.transaccion.detalle : 'Retiro de efectivo en terminal ATM';
        const saldoPost = cuentaSeleccionada.tipo === 'CREDITO' ? cuentaSeleccionada.cupoDisponible : cuentaSeleccionada.saldo;
        mostrarComprobante('Retiro en Efectivo', monto, detalleRecibo, cuentaSeleccionada, saldoPost);
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
            mostrarAlertaCajero('warning', 'Selecciona tu Cuenta de Ahorros o Corriente arriba para enviar transferencias.');
            reproducirSonido('alerta');
            return;
        }

        const res = StorageService.transferir(cuentaSeleccionada.numeroCuenta, destino, monto, motivo, canal);

        if (!res.exito) {
            mostrarAlertaCajero('danger', res.mensaje);
            reproducirSonido('alerta');
            return;
        }

        recargarDatosCliente();
        mostrarAlertaCajero('success', res.mensaje);
        mostrarComprobante('Transferencia Bre-B', monto, `A: ${res.destinatarioNombre} (${res.canalTexto}) · ${motivo}`, cuentaSeleccionada, res.nuevoSaldo);
        formTransferir.reset();
        document.getElementById('transferir-concepto').value = 'Transferencia inmediata Bre-B';
    });

    // 4. Tarjeta de crédito (Compras y Pagos)
    selectTcAccion.addEventListener('change', () => {
        const esCompra = selectTcAccion.value === 'compra';
        bloqueTcCompra.style.display = esCompra ? 'block' : 'none';
        bloqueTcPago.style.display = esCompra ? 'none' : 'block';
        actualizarResumenPagoTC();
    });

    if (btnTcPagarCuota) {
        btnTcPagarCuota.addEventListener('click', () => {
            reproducirSonido('click');
            const cuentaTC = clienteActivo.obtenerCuentaPorTipo('CREDITO');
            if (!cuentaTC || cuentaTC.deudaActual <= 0) {
                mostrarAlertaCajero('info', 'Tu tarjeta de crédito no tiene deuda pendiente en este momento.');
                return;
            }
            inputTcMontoPago.value = cuentaTC.cuotaMensualEstimada;
            inputTcMontoPago.focus();
        });
    }

    if (btnTcPagarTotal) {
        btnTcPagarTotal.addEventListener('click', () => {
            reproducirSonido('click');
            const cuentaTC = clienteActivo.obtenerCuentaPorTipo('CREDITO');
            if (!cuentaTC || cuentaTC.deudaActual <= 0) {
                mostrarAlertaCajero('info', 'Tu tarjeta de crédito no tiene deuda pendiente en este momento.');
                return;
            }
            inputTcMontoPago.value = cuentaTC.deudaActual;
            inputTcMontoPago.focus();
        });
    }

    function actualizarPreviewSimuladorTC() {
        const cuentaTC = clienteActivo.obtenerCuentaPorTipo('CREDITO');
        if (!cuentaTC) return;

        const monto = parseFloat(inputTcMontoCompra.value) || 0;
        const cuotas = parseInt(selectTcCuotas.value, 10) || 1;

        if (monto > 0) {
            try {
                const sim = cuentaTC.calcularCuotaMensual(monto, cuotas);
                previewTcSim.innerHTML = `
                    <div>Cuota fija mensual: <strong>${formateadorCOP.format(sim.cuotaMensual)}</strong> | Tasa: <strong>${sim.tasaPorcentaje}</strong></div>
                    <div>Intereses totales: <strong>${formateadorCOP.format(sim.totalIntereses)}</strong> | Total diferido: <strong>${formateadorCOP.format(sim.totalPagar)}</strong></div>
                `;
            } catch (e) {
                previewTcSim.textContent = 'Monto no válido para cálculo.';
            }
        } else {
            previewTcSim.innerHTML = 'Ingresa o selecciona un valor para calcular la cuota mensual.';
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
            mostrarComprobante(`Compra Tarjeta (${cuotas} cuotas)`, monto, `Comercio: ${comercio} · Cuota: ${formateadorCOP.format(res.amortizacion.cuotaMensual)}/mes`, cuentaTC, cuentaTC.cupoDisponible);
            inputTcMontoCompra.value = '';
            actualizarPreviewSimuladorTC();
            recargarDatosCliente();
        } else {
            const montoPago = parseFloat(inputTcMontoPago.value);
            const medioPago = selectTcOrigenPago ? selectTcOrigenPago.value : 'EFECTIVO';

            if (isNaN(montoPago) || montoPago <= 0) {
                mostrarAlertaCajero('warning', 'Ingresa un valor válido mayor a $0 para abonar a la tarjeta.');
                reproducirSonido('alerta');
                return;
            }

            if (cuentaTC.deudaActual <= 0) {
                mostrarAlertaCajero('info', 'La tarjeta de crédito se encuentra en $0 de deuda.');
                return;
            }

            const montoEfectivo = Math.min(montoPago, cuentaTC.deudaActual);
            let detalleOrigen = 'Abono en efectivo por cajero';

            // Si eligió debitar desde Ahorros o Corriente
            if (medioPago === 'AHORROS' || medioPago === 'CORRIENTE') {
                const cuentaDebito = clienteActivo.obtenerCuentaPorTipo(medioPago);
                if (!cuentaDebito) {
                    mostrarAlertaCajero('danger', `No tienes una cuenta ${medioPago} activa para debitar el pago.`);
                    reproducirSonido('alerta');
                    return;
                }
                const maxDisp = cuentaDebito.tipo === 'CORRIENTE' ? cuentaDebito.limiteRetiroDisponible : cuentaDebito.saldo;
                if (montoEfectivo > maxDisp) {
                    mostrarAlertaCajero('danger', `Fondos insuficientes en tu cuenta ${medioPago} (${cuentaDebito.numeroCuenta}) para cubrir ${formateadorCOP.format(montoEfectivo)}.`);
                    reproducirSonido('alerta');
                    return;
                }
                cuentaDebito._saldo -= montoEfectivo;
                cuentaDebito.registrarMovimiento(
                    new Transaccion('RETIRO', montoEfectivo, cuentaDebito._saldo, `Débito para pago de Tarjeta de Crédito (${cuentaTC.numeroFormateado})`)
                );
                detalleOrigen = `Débito desde cuenta ${medioPago} (${cuentaDebito.numeroCuenta})`;
            }

            const res = cuentaTC.pagarDeuda(montoEfectivo, detalleOrigen);
            if (!res.exito) {
                mostrarAlertaCajero('danger', res.mensaje);
                reproducirSonido('alerta');
                return;
            }

            StorageService.actualizarCliente(clienteActivo);
            mostrarAlertaCajero('success', res.mensaje);
            mostrarComprobante('Abono a Tarjeta de Crédito', res.montoPagado, detalleOrigen, cuentaTC, cuentaTC.cupoDisponible);
            inputTcMontoPago.value = '';
            recargarDatosCliente();
        }
    });

    // 5. Historial de Movimientos con Filtro de Texto (.filter) y Reimpresión de Recibo
    function renderizarHistorialMovimientos() {
        tbodyMovimientos.innerHTML = '';

        if (!cuentaSeleccionada || !cuentaSeleccionada.movimientos) {
            tbodyMovimientos.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">Sin movimientos registrados.</td></tr>';
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
            const matchTipo = m.tipo && m.tipo.toLowerCase().includes(textoBusqueda);
            return matchDetalle || matchFecha || matchMonto || matchTipo;
        });

        if (movimientos.length === 0) {
            tbodyMovimientos.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No se encontraron movimientos para esta cuenta con los criterios aplicados.</td></tr>';
            return;
        }

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
                    <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">
                        ${tx.tipo.replace('_', ' ')}
                    </span>
                </td>
                <td>${tx.detalle || 'Transacción en cajero'}</td>
                <td class="tx-amount ${claseMonto}">
                    ${signo}${formateadorCOP.format(tx.monto)}
                </td>
                <td style="font-weight: 600;">
                    ${formateadorCOP.format(tx.saldoPosterior)}
                </td>
                <td style="text-align: center;">
                    <button type="button" class="btn-ver-recibo chip-btn" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" title="Ver e imprimir comprobante térmico">
                        🧾
                    </button>
                </td>
            `;

            tr.querySelector('.btn-ver-recibo').addEventListener('click', () => {
                mostrarComprobante(
                    tx.tipo.replace('_', ' '),
                    tx.monto,
                    tx.detalle,
                    cuentaSeleccionada,
                    tx.saldoPosterior,
                    `${tx.fecha} ${tx.hora}`
                );
            });

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
                mostrarAlertaCajero('info', `⎌ Último movimiento desapilado con .pop(): ${removido.tipo} (${formateadorCOP.format(removido.monto)}). Saldo sincronizado a ${cuentaSeleccionada.saldoFormateado}.`);
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
                mostrarAlertaCajero('info', `🧹 Primer movimiento histórico depurado con .shift(): ${removido.tipo} (${formateadorCOP.format(removido.monto)}). Restan ${cuentaSeleccionada.movimientos.length} en el arreglo.`);
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
        }, 1400);
    });

    // 7. Estudio Crediticio para Tarjeta de Crédito
    btnCerrarModalCredito.addEventListener('click', () => modalCredito.classList.remove('active'));

    inputCreditoIngresos.addEventListener('input', () => {
        const ingresos = parseFloat(inputCreditoIngresos.value) || 0;
        if (ingresos >= 3500000) {
            boxPreaprobado.style.display = 'block';
            txtPreaprobado.innerHTML = '<strong>Cupo Aprobado: $6.000.000 COP</strong> (Franquicia Visa Gold · 16 dígitos)';
        } else if (ingresos >= 1500000) {
            boxPreaprobado.style.display = 'block';
            txtPreaprobado.innerHTML = '<strong>Cupo Aprobado: $2.500.000 COP</strong> (Franquicia Visa Clásica · 16 dígitos)';
        } else if (ingresos > 0) {
            boxPreaprobado.style.display = 'block';
            txtPreaprobado.innerHTML = '<span style="color: var(--crimson-600);">Capacidad insuficiente (Mínimo requerido: $1.500.000 COP).</span>';
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
        }, 1400);
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

    if (btnReiniciarDemo) {
        btnReiniciarDemo.addEventListener('click', () => {
            reproducirSonido('click');
            StorageService.restablecerDatosDemo();
            cuentaSeleccionada = null;
            recargarDatosCliente();
            mostrarAlertaCajero('success', '🔄 Datos de prueba restablecidos a sus valores iniciales.');
        });
    }

    btnCerrarSesion.addEventListener('click', () => {
        StorageService.cerrarSesion();
        window.location.href = 'login.html';
    });

    recargarDatosCliente();
});
