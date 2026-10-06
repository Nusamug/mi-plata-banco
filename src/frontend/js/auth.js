// Control de login, registro y bloqueo tras 3 intentos
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar inicialización de la persistencia
    StorageService.inicializar();

    // Redirigir al cajero si ya hay una sesión activa válida
    const sesionExistente = StorageService.obtenerSesionActiva();
    if (sesionExistente && !sesionExistente.estaBloqueado) {
        // Si el usuario quiere cambiar de cuenta puede cerrar sesión desde el cajero
    }

    // Elementos del DOM - Tabs
    const tabBtnLogin = document.getElementById('tab-btn-login');
    const tabBtnRegister = document.getElementById('tab-btn-register');
    const paneLogin = document.getElementById('pane-login');
    const paneRegister = document.getElementById('pane-register');

    // Elementos del DOM - Login
    const formLogin = document.getElementById('form-login');
    const inputUsername = document.getElementById('login-username');
    const inputPassword = document.getElementById('login-password');
    const btnSubmitLogin = document.getElementById('btn-submit-login');
    const badgeIntentos = document.getElementById('badge-intentos');
    const loginFeedback = document.getElementById('login-feedback');
    const btnAutorellenar = document.getElementById('btn-autorellenar');
    const btnResetDemo = document.getElementById('btn-reset-demo');

    // Elementos del DOM - Registro
    const formRegister = document.getElementById('form-register');
    const regDocumento = document.getElementById('reg-documento');
    const regNombre = document.getElementById('reg-nombre');
    const regCelular = document.getElementById('reg-celular');
    const regUsername = document.getElementById('reg-username');
    const regPassword = document.getElementById('reg-password');
    const regConfirm = document.getElementById('reg-confirm');
    const registerFeedback = document.getElementById('register-feedback');
    const btnAutorellenarRegistro = document.getElementById('btn-autorellenar-registro');

    // Manejo de Tabs
    function activarTab(nombreTab) {
        if (nombreTab === 'register') {
            tabBtnRegister.classList.add('active');
            tabBtnLogin.classList.remove('active');
            paneRegister.classList.add('active');
            paneLogin.classList.remove('active');
        } else {
            tabBtnLogin.classList.add('active');
            tabBtnRegister.classList.remove('active');
            paneLogin.classList.add('active');
            paneRegister.classList.remove('active');
        }
    }

    tabBtnLogin.addEventListener('click', () => activarTab('login'));
    tabBtnRegister.addEventListener('click', () => activarTab('register'));

    // Detectar si en la URL viene ?tab=register
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tab') === 'register') {
        activarTab('register');
    }

    // Funciones de actualización de UI del contador de intentos
    function actualizarBadgeIntentos(restantes, total = 3) {
        badgeIntentos.textContent = `${restantes} de ${total}`;
        badgeIntentos.className = 'attempts-badge';

        if (restantes === 3) {
            badgeIntentos.classList.add('safe');
        } else if (restantes === 2 || restantes === 1) {
            badgeIntentos.classList.add('warning');
        } else {
            badgeIntentos.classList.add('danger');
        }
    }

    function mostrarAlertaLogin(tipo, mensaje) {
        loginFeedback.className = `alert alert-${tipo}`;
        loginFeedback.textContent = mensaje;
        loginFeedback.style.display = 'flex';
    }

    function bloquearFormularioLogin() {
        inputUsername.disabled = true;
        inputPassword.disabled = true;
        btnSubmitLogin.disabled = true;
        actualizarBadgeIntentos(0, 3);
        mostrarAlertaLogin(
            'danger',
            '⛔ ACCESO BLOQUEADO POR SEGURIDAD: Se ha superado el límite de 3 intentos fallidos permitidos. Comuníquese con la entidad bancaria para el desbloqueo de sus credenciales.'
        );
    }

    function desbloquearFormularioLogin() {
        inputUsername.disabled = false;
        inputPassword.disabled = false;
        btnSubmitLogin.disabled = false;
        actualizarBadgeIntentos(3, 3);
        loginFeedback.style.display = 'none';
    }

    // Autorelleno de credenciales demo para Login
    if (btnAutorellenar) {
        btnAutorellenar.addEventListener('click', () => {
            inputUsername.value = 'carlos99';
            inputPassword.value = 'Pass123!';
            inputUsername.focus();
        });
    }

    // Autorelleno de datos para Registro rápido
    if (btnAutorellenarRegistro) {
        btnAutorellenarRegistro.addEventListener('click', () => {
            const num = Math.floor(1000 + Math.random() * 9000);
            regDocumento.value = '10' + num + '555';
            regNombre.value = 'Estudiante Prueba ' + num;
            regCelular.value = '311' + num + '88';
            regUsername.value = 'usuario_' + num;
            regPassword.value = 'Bancario123!';
            regConfirm.value = 'Bancario123!';
        });
    }

    // Restablecer demo para pruebas continuas del evaluador
    if (btnResetDemo) {
        btnResetDemo.addEventListener('click', () => {
            const cliente = StorageService.buscarPorUsername('carlos99');
            if (cliente) {
                cliente.desbloquear();
                StorageService.actualizarCliente(cliente);
                desbloquearFormularioLogin();
                mostrarAlertaLogin('success', '✓ Usuario demo carlos99 desbloqueado. 3 intentos restablecidos.');
            }
        });
    }

    // Validar estado inicial al tipear el nombre de usuario
    inputUsername.addEventListener('blur', () => {
        const usernameVal = inputUsername.value.trim();
        if (!usernameVal) return;

        const cliente = StorageService.buscarPorUsername(usernameVal);
        if (cliente) {
            actualizarBadgeIntentos(cliente.intentosRestantes, 3);
            if (cliente.estaBloqueado) {
                bloquearFormularioLogin();
            } else {
                desbloquearFormularioLogin();
                actualizarBadgeIntentos(cliente.intentosRestantes, 3);
            }
        } else {
            actualizarBadgeIntentos(3, 3);
        }
    });

    // Envío del Formulario de Login
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const usernameVal = inputUsername.value.trim();
        const passwordVal = inputPassword.value;

        if (!usernameVal || !passwordVal) {
            mostrarAlertaLogin('warning', 'Por favor, diligencia tu usuario y contraseña.');
            return;
        }

        const cliente = StorageService.buscarPorUsername(usernameVal);

        if (!cliente) {
            mostrarAlertaLogin('danger', 'El nombre de usuario ingresado no existe en nuestro sistema bancario.');
            return;
        }

        if (cliente.estaBloqueado) {
            bloquearFormularioLogin();
            return;
        }

        // Validación con el método de la clase POO Cliente
        const resultado = cliente.validarPassword(passwordVal);

        // Guardar el estado actualizado de intentos/bloqueo en LocalStorage
        StorageService.actualizarCliente(cliente);

        if (resultado.bloqueado) {
            bloquearFormularioLogin();
            return;
        }

        if (!resultado.exito) {
            actualizarBadgeIntentos(resultado.intentosRestantes, 3);
            mostrarAlertaLogin('danger', resultado.mensaje);
            return;
        }

        // Login Exitoso
        actualizarBadgeIntentos(3, 3);
        mostrarAlertaLogin('success', '¡Autenticación exitosa! Ingresando al cajero...');
        StorageService.guardarSesionActiva(cliente);

        setTimeout(() => {
            window.location.href = 'cajero.html';
        }, 800);
    });

    // Envío del Formulario de Registro
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();

        const doc = regDocumento.value.trim();
        const nom = regNombre.value.trim();
        const cel = regCelular.value.trim();
        const usr = regUsername.value.trim();
        const pass = regPassword.value;
        const conf = regConfirm.value;

        function mostrarAlertaReg(tipo, mensaje) {
            registerFeedback.className = `alert alert-${tipo}`;
            registerFeedback.textContent = mensaje;
            registerFeedback.style.display = 'flex';
        }

        // Validaciones de formulario
        if (!doc || !nom || !cel || !usr || !pass || !conf) {
            mostrarAlertaReg('warning', 'Todos los campos son obligatorios para la apertura de cuenta.');
            return;
        }

        if (pass.length < 6) {
            mostrarAlertaReg('warning', 'La contraseña debe contener al menos 6 caracteres.');
            return;
        }

        if (pass !== conf) {
            mostrarAlertaReg('danger', 'Las contraseñas ingresadas no coinciden. Verifícalas.');
            return;
        }

        const resultadoRegistro = StorageService.registrarNuevoCliente({
            documento: doc,
            nombreCompleto: nom,
            celular: cel,
            username: usr,
            password: pass
        });

        if (!resultadoRegistro.exito) {
            mostrarAlertaReg('danger', resultadoRegistro.mensaje);
            return;
        }

        mostrarAlertaReg('success', resultadoRegistro.mensaje);
        formRegister.reset();

        // Tras 1.5s, iniciar sesión automáticamente y enviar al cajero
        setTimeout(() => {
            StorageService.guardarSesionActiva(resultadoRegistro.cliente);
            window.location.href = 'cajero.html';
        }, 1500);
    });
});
