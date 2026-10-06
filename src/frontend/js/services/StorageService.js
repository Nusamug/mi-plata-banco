// Servicio para guardar y consultar datos en LocalStorage
class StorageService {
    static CLAVE_CLIENTES = 'mi_plata_clientes_v1';
    static CLAVE_SESION = 'mi_plata_sesion_activa_v1';

    // Carga clientes iniciales si no existen
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

            // Cuentas demo iniciales
            const ahorros = new CuentaAhorros('AH-7801-92', clienteDemo.documento, 2500000);
            ahorros.registrarMovimiento(new Transaccion('CONSIGNACION', 2500000, 2500000, 'Depósito de apertura'));
            clienteDemo.agregarCuenta(ahorros);

            const corriente = new CuentaCorriente('CC-4502-33', clienteDemo.documento, 1200000);
            corriente.registrarMovimiento(new Transaccion('CONSIGNACION', 1200000, 1200000, 'Apertura cuenta corriente'));
            clienteDemo.agregarCuenta(corriente);

            const tc = new TarjetaCredito('TC-5520-88', clienteDemo.documento, 5000000, 0);
            tc.registrarMovimiento(new Transaccion('APERTURA', 5000000, 5000000, 'Cupo aprobado'));
            clienteDemo.agregarCuenta(tc);

            // Segundo cliente para pruebas de transferencias
            const clienteTercero = new Cliente(
                '987654321',
                'María Fernanda Ospina',
                '3209876543',
                'mafe_ospina',
                'Banco2026*'
            );
            const ahorrosTercero = new CuentaAhorros('AH-9900-11', clienteTercero.documento, 850000);
            ahorrosTercero.registrarMovimiento(new Transaccion('CONSIGNACION', 850000, 850000, 'Saldo inicial'));
            clienteTercero.agregarCuenta(ahorrosTercero);

            StorageService.guardarClientes([clienteDemo, clienteTercero]);
        }
    }

    // Convierte los objetos JSON a instancias de las clases POO
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
                        c._deudaActual || c.deudaActual || 0
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

    // Obtiene clientes almacenados
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

    // Elimina un cliente
    static eliminarCliente(documento) {
        let clientes = StorageService.obtenerClientes();
        clientes = clientes.filter(c => c.documento !== String(documento).trim());
        StorageService.guardarClientes(clientes);

        const sesion = StorageService.obtenerSesionActiva();
        if (sesion && sesion.documento === String(documento).trim()) {
            StorageService.cerrarSesion();
        }
    }

    // Control de sesión activa
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

    // Registra un nuevo usuario y le crea sus cuentas
    static registrarNuevoCliente({ documento, nombreCompleto, celular, username, password }) {
        const clientes = StorageService.obtenerClientes();

        if (clientes.some(c => c.username.toLowerCase() === username.toLowerCase().trim())) {
            return { exito: false, mensaje: 'El nombre de usuario ya existe. Elige otro.' };
        }

        if (clientes.some(c => c.documento === documento.trim())) {
            return { exito: false, mensaje: 'El documento ya está registrado.' };
        }

        const nuevoCliente = new Cliente(documento, nombreCompleto, celular, username, password);
        const aleatorio = Math.floor(1000 + Math.random() * 9000);

        const cuentaAhorros = new CuentaAhorros(`AH-${aleatorio}-1`, nuevoCliente.documento, 100000);
        cuentaAhorros.registrarMovimiento(new Transaccion('CONSIGNACION', 100000, 100000, 'Bono de bienvenida'));
        nuevoCliente.agregarCuenta(cuentaAhorros);

        const cuentaCorriente = new CuentaCorriente(`CC-${aleatorio}-2`, nuevoCliente.documento, 0);
        nuevoCliente.agregarCuenta(cuentaCorriente);

        const tarjetaCredito = new TarjetaCredito(`TC-${aleatorio}-3`, nuevoCliente.documento, 2000000, 0);
        tarjetaCredito.registrarMovimiento(new Transaccion('APERTURA', 2000000, 2000000, 'Cupo aprobado'));
        nuevoCliente.agregarCuenta(tarjetaCredito);

        clientes.push(nuevoCliente);
        StorageService.guardarClientes(clientes);

        return {
            exito: true,
            mensaje: 'Registro exitoso. Se asignaron tus cuentas y un bono de $100.000 en ahorros.',
            cliente: nuevoCliente
        };
    }

    // Envío de dinero entre cuentas
    static transferir(numCuentaOrigen, numCuentaDestino, monto, motivo = 'Transferencia bancaria') {
        const valor = Number(monto);
        if (isNaN(valor) || valor <= 0) {
            return { exito: false, mensaje: 'El monto a transferir debe ser mayor a $0.' };
        }

        if (numCuentaOrigen === numCuentaDestino) {
            return { exito: false, mensaje: 'No puedes transferir a la misma cuenta de origen.' };
        }

        const clientes = StorageService.obtenerClientes();
        let cuentaOrigen = null;
        let titularOrigen = null;
        let cuentaDestino = null;
        let titularDestino = null;

        for (const cliente of clientes) {
            for (const c of cliente.cuentas) {
                if (c.numeroCuenta === numCuentaOrigen) {
                    cuentaOrigen = c;
                    titularOrigen = cliente;
                }
                if (c.numeroCuenta === numCuentaDestino) {
                    cuentaDestino = c;
                    titularDestino = cliente;
                }
            }
        }

        if (!cuentaOrigen) {
            return { exito: false, mensaje: 'La cuenta de origen no existe.' };
        }
        if (!cuentaDestino) {
            return { exito: false, mensaje: 'La cuenta de destino no existe.' };
        }

        if (cuentaOrigen.saldo < valor) {
            return {
                exito: false,
                mensaje: `Saldo insuficiente. Saldo disponible: ${cuentaOrigen.saldoFormateado}.`
            };
        }

        cuentaOrigen._saldo -= valor;
        cuentaDestino._saldo += valor;

        const txSalida = new Transaccion(
            'TRANSFERENCIA_ENVIADA',
            valor,
            cuentaOrigen._saldo,
            `Transferencia enviada a ${numCuentaDestino} (${titularDestino.nombreCompleto}): ${motivo}`
        );
        cuentaOrigen.registrarMovimiento(txSalida);

        const txEntrada = new Transaccion(
            'TRANSFERENCIA_RECIBIDA',
            valor,
            cuentaDestino._saldo,
            `Transferencia recibida de ${numCuentaOrigen} (${titularOrigen.nombreCompleto}): ${motivo}`
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
            mensaje: `Transferencia por ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(valor)} enviada a ${titularDestino.nombreCompleto}.`,
            nuevoSaldo: cuentaOrigen.saldo,
            transaccion: txSalida
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageService;
}
