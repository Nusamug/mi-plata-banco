// Servicio de almacenamiento en LocalStorage con estudio crediticio y transferencias por Llave Bre-B
class StorageService {
    static CLAVE_CLIENTES = 'mi_plata_clientes_v1';
    static CLAVE_SESION = 'mi_plata_sesion_activa_v1';

    // Generadores con numeración bancaria realista
    static generarNumeroAhorros() {
        const aleatorio = Math.floor(1000000 + Math.random() * 9000000);
        const digitoControl = Math.floor(Math.random() * 10);
        return `401-${aleatorio}-${digitoControl}`;
    }

    static generarNumeroCorriente() {
        const aleatorio = Math.floor(1000000 + Math.random() * 9000000);
        const digitoControl = Math.floor(Math.random() * 10);
        return `201-${aleatorio}-${digitoControl}`;
    }

    static generarNumeroTarjeta() {
        // BIN 4509 (Visa Colombia) seguido de 12 dígitos
        const parte1 = '4509';
        const parte2 = String(Math.floor(1000 + Math.random() * 9000));
        const parte3 = String(Math.floor(1000 + Math.random() * 9000));
        const parte4 = String(Math.floor(1000 + Math.random() * 9000));
        return `${parte1}${parte2}${parte3}${parte4}`;
    }

    // Inicializa clientes demo para facilitar sustentación
    static inicializar() {
        const guardados = localStorage.getItem(StorageService.CLAVE_CLIENTES);
        if (!guardados) {
            const clienteDemo = new Cliente(
                '1020304050',
                'Carlos Alberto Morales',
                '3104567890',
                'carlos99',
                'Pass123!'
            );

            // Cuentas del cliente demo
            const ahorros = new CuentaAhorros('401-8392104-2', clienteDemo.documento, 2500000);
            ahorros.registrarMovimiento(new Transaccion('CONSIGNACION', 2500000, 2500000, 'Depósito de apertura'));
            clienteDemo.agregarCuenta(ahorros);

            const corriente = new CuentaCorriente('201-5120491-0', clienteDemo.documento, 1200000);
            corriente.registrarMovimiento(new Transaccion('CONSIGNACION', 1200000, 1200000, 'Apertura cuenta corriente comercial'));
            clienteDemo.agregarCuenta(corriente);

            const tc = new TarjetaCredito('4509812034915521', clienteDemo.documento, 5000000, 0, {
                franquicia: 'VISA GOLD',
                fechaVencimiento: '10/31',
                cvv: '742'
            });
            tc.registrarMovimiento(new Transaccion('APERTURA', 5000000, 5000000, 'Asignación de cupo de crédito'));
            clienteDemo.agregarCuenta(tc);

            // Segundo cliente para pruebas de transferencias por Llave Bre-B
            const clienteTercero = new Cliente(
                '987654321',
                'María Fernanda Ospina',
                '3209876543',
                'mafe_ospina',
                'Banco2026*'
            );
            const ahorrosTercero = new CuentaAhorros('401-9900112-5', clienteTercero.documento, 850000);
            ahorrosTercero.registrarMovimiento(new Transaccion('CONSIGNACION', 850000, 850000, 'Saldo inicial'));
            clienteTercero.agregarCuenta(ahorrosTercero);

            StorageService.guardarClientes([clienteDemo, clienteTercero]);
        }
    }

    // Convierte JSON plano a instancias completas de las clases
    static hidratarCliente(raw) {
        const cliente = new Cliente(
            raw.documento,
            raw.nombreCompleto,
            raw.celular,
            raw.username,
            raw.password
        );
        cliente.intentosFallidos = raw.intentosFallidos || 0;
        cliente.estaBloqueado = Boolean(raw.estaBloqueado);
        cliente.fechaRegistro = raw.fechaRegistro || new Date().toLocaleDateString('es-CO');

        if (Array.isArray(raw.cuentas)) {
            cliente.cuentas = raw.cuentas.map(c => {
                let inst;
                if (c._tipo === 'AHORROS' || c.tipo === 'AHORROS') {
                    inst = new CuentaAhorros(c._numeroCuenta || c.numeroCuenta, c._titularId || c.titularId, c._saldo ?? c.saldo);
                } else if (c._tipo === 'CORRIENTE' || c.tipo === 'CORRIENTE') {
                    inst = new CuentaCorriente(c._numeroCuenta || c.numeroCuenta, c._titularId || c.titularId, c._saldo ?? c.saldo);
                } else if (c._tipo === 'CREDITO' || c.tipo === 'CREDITO') {
                    inst = new TarjetaCredito(
                        c._numeroCuenta || c.numeroCuenta,
                        c._titularId || c.titularId,
                        c._cupoTotal || c.cupoTotal || 3000000,
                        c._deudaActual || c.deudaActual || 0,
                        {
                            franquicia: c._franquicia || c.franquicia || 'VISA',
                            fechaVencimiento: c._fechaVencimiento || c.fechaVencimiento || '10/31',
                            cvv: c._cvv || c.cvv || '123'
                        }
                    );
                    inst._comprasActivas = c._comprasActivas || [];
                } else {
                    return null;
                }

                const movs = c._movimientos || c.movimientos || [];
                inst._movimientos = movs.map(m => {
                    const tx = new Transaccion(m.tipo, m.monto, m.saldoPosterior, m.detalle);
                    tx.id = m.id;
                    tx.fecha = m.fecha;
                    tx.hora = m.hora;
                    tx.timestamp = m.timestamp;
                    return tx;
                });

                return inst;
            }).filter(Boolean);
        }

        return cliente;
    }

    static obtenerClientes() {
        StorageService.inicializar();
        try {
            const data = localStorage.getItem(StorageService.CLAVE_CLIENTES);
            if (!data) return [];
            const parsed = JSON.parse(data);
            return parsed.map(c => StorageService.hidratarCliente(c));
        } catch (error) {
            console.error('Error al recuperar clientes:', error);
            return [];
        }
    }

    static guardarClientes(clientes) {
        localStorage.setItem(StorageService.CLAVE_CLIENTES, JSON.stringify(clientes));
    }

    static buscarPorUsername(username) {
        const clientes = StorageService.obtenerClientes();
        return clientes.find(c => c.username.toLowerCase() === String(username).toLowerCase().trim()) || null;
    }

    static buscarPorDocumento(documento) {
        const clientes = StorageService.obtenerClientes();
        return clientes.find(c => c.documento === String(documento).trim()) || null;
    }

    static buscarPorCelular(celular) {
        const clientes = StorageService.obtenerClientes();
        const celLimpio = String(celular).replace(/\D/g, '');
        return clientes.find(c => String(c.celular).replace(/\D/g, '') === celLimpio) || null;
    }

    static actualizarCliente(clienteActualizado) {
        const clientes = StorageService.obtenerClientes();
        const indice = clientes.findIndex(c => c.documento === clienteActualizado.documento);
        if (indice !== -1) {
            clientes[indice] = clienteActualizado;
        } else {
            clientes.push(clienteActualizado);
        }
        StorageService.guardarClientes(clientes);

        const sesion = StorageService.obtenerSesionActiva();
        if (sesion && sesion.documento === clienteActualizado.documento) {
            StorageService.guardarSesionActiva(clienteActualizado);
        }
    }

    static eliminarCliente(documento) {
        let clientes = StorageService.obtenerClientes();
        clientes = clientes.filter(c => c.documento !== String(documento).trim());
        StorageService.guardarClientes(clientes);

        const sesion = StorageService.obtenerSesionActiva();
        if (sesion && sesion.documento === String(documento).trim()) {
            StorageService.cerrarSesion();
        }
    }

    static guardarSesionActiva(cliente) {
        sessionStorage.setItem(StorageService.CLAVE_SESION, JSON.stringify(cliente));
    }

    static obtenerSesionActiva() {
        const data = sessionStorage.getItem(StorageService.CLAVE_SESION);
        if (!data) return null;
        try {
            return StorageService.hidratarCliente(JSON.parse(data));
        } catch (e) {
            return null;
        }
    }

    static cerrarSesion() {
        sessionStorage.removeItem(StorageService.CLAVE_SESION);
    }

    // REGISTRO REALISTA: Solo apertura la Cuenta de Ahorros como producto base
    static registrarNuevoCliente({ documento, nombreCompleto, celular, username, password }) {
        const clientes = StorageService.obtenerClientes();

        if (clientes.some(c => c.username.toLowerCase() === username.toLowerCase().trim())) {
            return { exito: false, mensaje: 'El nombre de usuario ya existe. Elige otro.' };
        }

        if (clientes.some(c => c.documento === documento.trim())) {
            return { exito: false, mensaje: 'El documento ya está registrado en el banco.' };
        }

        if (clientes.some(c => c.celular === celular.trim())) {
            return { exito: false, mensaje: 'El número de celular ya está registrado con otra cuenta.' };
        }

        const nuevoCliente = new Cliente(documento, nombreCompleto, celular, username, password);

        // Apertura exclusiva de Cuenta de Ahorros con bono inicial
        const numeroAhorros = StorageService.generarNumeroAhorros();
        const cuentaAhorros = new CuentaAhorros(numeroAhorros, nuevoCliente.documento, 100000);
        cuentaAhorros.registrarMovimiento(new Transaccion('CONSIGNACION', 100000, 100000, 'Bono de bienvenida por apertura'));
        nuevoCliente.agregarCuenta(cuentaAhorros);

        clientes.push(nuevoCliente);
        StorageService.guardarClientes(clientes);

        return {
            exito: true,
            mensaje: `¡Bienvenido(a)! Se ha creado tu Cuenta de Ahorros (${numeroAhorros}) con un bono de bienvenida de $100.000 COP.`,
            cliente: nuevoCliente
        };
    }

    // ESTUDIO Y APERTURA DE CUENTA CORRIENTE
    static solicitarCuentaCorriente(documento, ingresosMensuales, actividadEconomica = 'Empleado') {
        const cliente = StorageService.buscarPorDocumento(documento);
        if (!cliente) return { exito: false, mensaje: 'Cliente no encontrado.' };

        if (cliente.obtenerCuentaPorTipo('CORRIENTE')) {
            return { exito: false, mensaje: 'Ya cuentas con una Cuenta Corriente activa en el banco.' };
        }

        const ingresos = Number(ingresosMensuales);
        const INGRESO_MINIMO = 2000000; // $2.000.000 COP mínimo para cupo comercial

        if (isNaN(ingresos) || ingresos < INGRESO_MINIMO) {
            return {
                exito: false,
                mensaje: `Estudio no aprobado: Se requiere certificar ingresos mensuales mínimos de $2.000.000 COP para acceder a Cuenta Corriente con sobregiro comercial. Ingreso reportado: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(ingresos || 0)}.`
            };
        }

        const numeroCorriente = StorageService.generarNumeroCorriente();
        const nuevaCorriente = new CuentaCorriente(numeroCorriente, cliente.documento, 0);
        nuevaCorriente.registrarMovimiento(new Transaccion('APERTURA', 0, 0, `Apertura aprobada (${actividadEconomica}) - Sobregiro autorizado: 20%`));
        cliente.agregarCuenta(nuevaCorriente);

        StorageService.actualizarCliente(cliente);

        return {
            exito: true,
            mensaje: `¡Cuenta Corriente Aprobada! Se ha habilitado tu cuenta comercial ${numeroCorriente} con autorización de sobregiro del 20%.`,
            cuenta: nuevaCorriente
        };
    }

    // ESTUDIO Y ASIGNACIÓN DE TARJETA DE CRÉDITO
    static solicitarTarjetaCredito(documento, ingresosMensuales, actividadEconomica = 'Empleado') {
        const cliente = StorageService.buscarPorDocumento(documento);
        if (!cliente) return { exito: false, mensaje: 'Cliente no encontrado.' };

        if (cliente.obtenerCuentaPorTipo('CREDITO')) {
            return { exito: false, mensaje: 'Ya cuentas con una Tarjeta de Crédito asignada.' };
        }

        const ingresos = Number(ingresosMensuales);
        const INGRESO_MINIMO = 1500000;

        if (isNaN(ingresos) || ingresos < INGRESO_MINIMO) {
            return {
                exito: false,
                mensaje: `Estudio crediticio no aprobado: Tu capacidad de endeudamiento no alcanza el mínimo requerido ($1.500.000 COP). Ingreso reportado: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(ingresos || 0)}.`
            };
        }

        // Asignación de cupo y franquicia según ingresos
        let cupoAprobado = 2500000;
        let franquicia = 'VISA CLÁSICA';

        if (ingresos >= 3500000) {
            cupoAprobado = 6000000;
            franquicia = 'VISA GOLD';
        }

        const numeroTarjeta = StorageService.generarNumeroTarjeta();
        const nuevaTarjeta = new TarjetaCredito(numeroTarjeta, cliente.documento, cupoAprobado, 0, {
            franquicia,
            fechaVencimiento: '10/31',
            cvv: String(Math.floor(100 + Math.random() * 900))
        });

        nuevaTarjeta.registrarMovimiento(new Transaccion('APERTURA', cupoAprobado, cupoAprobado, `Emisión de ${franquicia} con cupo aprobado de ${nuevaTarjeta.cupoTotalFormateado}`));
        cliente.agregarCuenta(nuevaTarjeta);

        StorageService.actualizarCliente(cliente);

        return {
            exito: true,
            mensaje: `¡Felicidades! Crédito aprobado: Se emitió tu ${franquicia} (${nuevaTarjeta.numeroFormateado}) con un cupo asignado de ${nuevaTarjeta.cupoTotalFormateado}.`,
            tarjeta: nuevaTarjeta
        };
    }

    // TRANSFERENCIAS: Soporta Número de Cuenta y Llaves Bre-B (Celular o Documento)
    static transferir(numCuentaOrigen, destinoIdentificador, monto, motivo = 'Transferencia bancaria', tipoDestino = 'CUENTA') {
        const valor = Number(monto);
        if (isNaN(valor) || valor <= 0) {
            return { exito: false, mensaje: 'El monto a transferir debe ser mayor a $0.' };
        }

        const clientes = StorageService.obtenerClientes();
        let cuentaOrigen = null;
        let titularOrigen = null;
        let cuentaDestino = null;
        let titularDestino = null;

        // Buscar cuenta de origen
        for (const c of clientes) {
            const encontrada = c.cuentas.find(cta => cta.numeroCuenta === numCuentaOrigen);
            if (encontrada) {
                cuentaOrigen = encontrada;
                titularOrigen = c;
                break;
            }
        }

        if (!cuentaOrigen) {
            return { exito: false, mensaje: 'La cuenta de origen no existe.' };
        }

        // Buscar cuenta de destino según tipo (Llave Celular, Llave Documento o Número de Cuenta)
        const idLimpio = String(destinoIdentificador).trim();

        if (tipoDestino === 'LLAVE_CELULAR') {
            const celLimpio = idLimpio.replace(/\D/g, '');
            titularDestino = clientes.find(c => String(c.celular).replace(/\D/g, '') === celLimpio);
            if (titularDestino) {
                // Se transfiere a su cuenta de ahorros principal
                cuentaDestino = titularDestino.obtenerCuentaPorTipo('AHORROS') || titularDestino.cuentas[0];
            }
        } else if (tipoDestino === 'LLAVE_DOCUMENTO') {
            titularDestino = clientes.find(c => c.documento === idLimpio);
            if (titularDestino) {
                cuentaDestino = titularDestino.obtenerCuentaPorTipo('AHORROS') || titularDestino.cuentas[0];
            }
        } else {
            // Búsqueda por número de cuenta directo
            for (const c of clientes) {
                const encontrada = c.cuentas.find(cta => cta.numeroCuenta === idLimpio);
                if (encontrada) {
                    cuentaDestino = encontrada;
                    titularDestino = c;
                    break;
                }
            }
        }

        if (!titularDestino || !cuentaDestino) {
            const detalleTipo = tipoDestino === 'LLAVE_CELULAR' ? 'celular' : (tipoDestino === 'LLAVE_DOCUMENTO' ? 'cédula' : 'número de cuenta');
            return { exito: false, mensaje: `No se encontró ningún cuentahabiente asociado al ${detalleTipo} ingresado.` };
        }

        if (cuentaOrigen.numeroCuenta === cuentaDestino.numeroCuenta) {
            return { exito: false, mensaje: 'No puedes transferir fondos a la misma cuenta de origen.' };
        }

        if (cuentaOrigen.saldo < valor) {
            return {
                exito: false,
                mensaje: `Saldo insuficiente en tu cuenta de origen. Saldo disponible: ${cuentaOrigen.saldoFormateado}.`
            };
        }

        // Ejecutar transferencia
        cuentaOrigen._saldo -= valor;
        cuentaDestino._saldo += valor;

        const esBreB = tipoDestino.startsWith('LLAVE_');
        const canalTexto = esBreB ? 'vía Llave Bre-B' : 'vía número de cuenta';

        const txSalida = new Transaccion(
            'TRANSFERENCIA_ENVIADA',
            valor,
            cuentaOrigen._saldo,
            `Transferencia enviada a ${titularDestino.nombreCompleto} (${canalTexto}): ${motivo}`
        );
        cuentaOrigen.registrarMovimiento(txSalida);

        const txEntrada = new Transaccion(
            'TRANSFERENCIA_RECIBIDA',
            valor,
            cuentaDestino._saldo,
            `Transferencia recibida de ${titularOrigen.nombreCompleto} (${canalTexto}): ${motivo}`
        );
        cuentaDestino.registrarMovimiento(txEntrada);

        StorageService.guardarClientes(clientes);

        const sesion = StorageService.obtenerSesionActiva();
        if (sesion) {
            if (sesion.documento === titularOrigen.documento) {
                StorageService.guardarSesionActiva(titularOrigen);
            } else if (sesion.documento === titularDestino.documento) {
                StorageService.guardarSesionActiva(titularDestino);
            }
        }

        return {
            exito: true,
            mensaje: `Transferencia por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor)} enviada exitosamente a ${titularDestino.nombreCompleto} (${canalTexto}).`,
            nuevoSaldo: cuentaOrigen.saldo,
            transaccion: txSalida
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageService;
}
