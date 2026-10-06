// Representa a un cliente del banco con sus credenciales y cuentas
class Cliente {
    static MAX_INTENTOS_FALLIDOS = 3;

    constructor(documento, nombreCompleto, celular, username, password) {
        this.documento = String(documento).trim();
        this.nombreCompleto = String(nombreCompleto).trim();
        this.celular = String(celular).trim();
        this.username = String(username).trim().toLowerCase();
        this.password = String(password);
        this.intentosFallidos = 0;
        this.estaBloqueado = false;
        this.fechaRegistro = new Date().toLocaleDateString('es-CO');
        this.cuentas = [];
    }

    get intentosRestantes() {
        return Math.max(0, Cliente.MAX_INTENTOS_FALLIDOS - this.intentosFallidos);
    }

    agregarCuenta(cuenta) {
        this.cuentas.push(cuenta);
    }

    obtenerCuenta(numeroCuenta) {
        return this.cuentas.find(c => c.numeroCuenta === String(numeroCuenta)) || null;
    }

    obtenerCuentaPorTipo(tipo) {
        return this.cuentas.find(c => c.tipo.toUpperCase() === tipo.toUpperCase()) || null;
    }

    // Valida la clave y bloquea al tercer intento fallido
    validarPassword(passwordIngresada) {
        if (this.estaBloqueado) {
            return {
                exito: false,
                bloqueado: true,
                intentosRestantes: 0,
                mensaje: 'Tu cuenta se encuentra bloqueada por seguridad tras 3 intentos fallidos. Comunícate con la entidad bancaria.'
            };
        }

        if (this.password === passwordIngresada) {
            this.intentosFallidos = 0;
            return {
                exito: true,
                bloqueado: false,
                intentosRestantes: Cliente.MAX_INTENTOS_FALLIDOS,
                mensaje: 'Credenciales validadas exitosamente.'
            };
        }

        this.intentosFallidos++;

        if (this.intentosFallidos >= Cliente.MAX_INTENTOS_FALLIDOS) {
            this.estaBloqueado = true;
            return {
                exito: false,
                bloqueado: true,
                intentosRestantes: 0,
                mensaje: '¡Alerta de Seguridad! Has superado el límite de 3 intentos permitidos. Tu cuenta ha sido bloqueada automáticamente.'
            };
        }

        return {
            exito: false,
            bloqueado: false,
            intentosRestantes: this.intentosRestantes,
            mensaje: `Contraseña incorrecta. Te restan ${this.intentosRestantes} intento(s) antes del bloqueo de seguridad.`
        };
    }

    // Quita el bloqueo de la cuenta
    desbloquear() {
        this.intentosFallidos = 0;
        this.estaBloqueado = false;
    }

    // Actualiza datos de perfil
    actualizarDatos({ nombreCompleto, celular, password }) {
        if (nombreCompleto) this.nombreCompleto = String(nombreCompleto).trim();
        if (celular) this.celular = String(celular).trim();
        if (password) this.password = String(password);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cliente;
}
