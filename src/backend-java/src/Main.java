import models.Admin;
import models.Credito;
import models.Cuenta;
import models.CuentaAhorros;
import models.CuentaCorriente;
import models.Transaccion;
import models.User;
import services.BankService;
import services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {

    private static final Scanner scanner = new Scanner(System.in);
    private static final UserService userService = new UserService();
    private static final BankService bankService = new BankService();

    public static void main(String[] args) {
        System.out.println("===================================================");
        System.out.println("   BIENVENIDO A MI PLATA - BACKEND BANCARIO JAVA   ");
        System.out.println("===================================================");

        int option;
        do {
            System.out.println("\n==================== PORTAL MI PLATA ====================");
            System.out.println("1. Iniciar Sesion como Cliente");
            System.out.println("2. Registrarme (Crear Nuevo Usuario)");
            System.out.println("3. Entrar como Administrador");
            System.out.println("0. Salir");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> handleClientLogin();
                case 2 -> handleClientRegistration();
                case 3 -> handleAdminLogin();
                case 0 -> System.out.println("\nGracias por utilizar Mi Plata. Hasta pronto.");
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);

        scanner.close();
    }

    private static void handleClientLogin() {
        System.out.println("\n--- INICIAR SESION (CLIENTE) ---");
        System.out.print("ID o Correo Electronico (ej. 101 o carlos@banco.com): ");
        String identifier = readString();
        System.out.print("Password: ");
        String password = readString();

        User user = userService.authenticateUser(identifier, password);
        if (user == null) {
            System.out.println("\n[ERROR] Credenciales invalidas o usuario inactivo.");
            return;
        }

        System.out.println("\n[EXITO] Bienvenido, " + user.getFullName() + ".");
        menuClient(user);
    }

    private static void handleClientRegistration() {
        System.out.println("\n--- REGISTRO DE NUEVO CLIENTE ---");
        User newUser = createUserFromInput();
        if (newUser == null) {
            return;
        }

        String accNumber = generateUniqueAccountNumber("1001", newUser.getId());
        CuentaAhorros savings = new CuentaAhorros(accNumber, newUser.getId(), 0.0, 0.015);
        if (bankService.createAccount(savings)) {
            bankService.deposit(accNumber, 100000.0);
            System.out.println("[EXITO] Cuenta de Ahorros aperturada: " + accNumber + " (Bono inicial: $100000.00)");
        }

        menuClient(newUser);
    }

    private static void handleAdminLogin() {
        System.out.println("\n--- ACCESO ADMINISTRADOR ---");
        System.out.println("(Acceso por defecto -> Usuario/ID: admin@banco.com | Clave: Admin123*)");
        System.out.print("Usuario o ID Administrador: ");
        String identifier = readString();
        System.out.print("Password Administrador: ");
        String password = readString();

        Admin admin = userService.authenticateAdmin(identifier, password);
        if (admin == null) {
            System.out.println("\n[ERROR] Credenciales de administrador incorrectas.");
            return;
        }

        menuAdmin(admin);
    }

    private static void menuClient(User sessionUser) {
        User activeUser = sessionUser;
        int option;
        do {
            System.out.println("\n=========== SESION CLIENTE: " + activeUser.getFullName()
                    + " (ID: " + activeUser.getId() + ") ===========");
            System.out.println("1. Mis Cuentas Bancarias");
            System.out.println("2. Abrir Nueva Cuenta (Ahorros / Corriente)");
            System.out.println("3. Consignar a una de mis Cuentas");
            System.out.println("4. Retirar de una de mis Cuentas");
            System.out.println("5. Transferir a otro Usuario / Cuenta");
            System.out.println("6. Mis Creditos y Pagos");
            System.out.println("7. Historial de Mis Movimientos");
            System.out.println("8. Mi Perfil (Consultar / Actualizar)");
            System.out.println("0. Cerrar Sesion");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> printAccountList(bankService.getAccountsByUser(activeUser.getId()),
                        "No tienes cuentas registradas.");
                case 2 -> handleClientOpenAccount(activeUser);
                case 3 -> handleClientDeposit(activeUser);
                case 4 -> handleClientWithdraw(activeUser);
                case 5 -> handleClientTransfer(activeUser);
                case 6 -> menuClientCredits(activeUser);
                case 7 -> printTransactions(bankService.getTransactionsByUser(activeUser.getId()));
                case 8 -> {
                    System.out.println("\n--- MI PERFIL ---");
                    System.out.println(activeUser);
                    System.out.print("Desea actualizar sus datos? (S/N): ");
                    if (scanner.nextLine().trim().equalsIgnoreCase("S")) {
                        updateUserById(activeUser.getId());
                        User refreshed = userService.selectUserById(activeUser.getId());
                        if (refreshed != null) {
                            activeUser = refreshed;
                        }
                    }
                }
                case 0 -> System.out.println("\n[INFO] Sesion de cliente cerrada.");
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void menuClientCredits(User activeUser) {
        int option;
        do {
            System.out.println("\n--- MIS CREDITOS Y PAGOS ---");
            System.out.println("1. Ver Mis Creditos");
            System.out.println("2. Solicitar Nuevo Credito");
            System.out.println("3. Pagar Credito desde una de mis Cuentas");
            System.out.println("0. Volver");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> printCreditList(bankService.getCreditsByUser(activeUser.getId()),
                        "No tienes creditos registrados.");
                case 2 -> {
                    System.out.print("Monto del credito a solicitar: ");
                    double amount = readDouble();
                    System.out.print("Plazo en meses: ");
                    int termMonths = readInt();
                    Credito credit = bankService.requestCredit(activeUser.getId(), amount, termMonths);
                    if (credit != null) {
                        System.out.println("\n[EXITO] Credito aprobado:\n" + credit);
                    } else {
                        System.out.println("\n[ERROR] No se pudo aprobar el credito (verifique monto y plazo).");
                    }
                }
                case 3 -> handleClientPayCredit(activeUser);
                case 0 -> { }
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void menuAdmin(Admin admin) {
        int option;
        do {
            System.out.println("\n=========== PANEL ADMINISTRADOR: " + admin.getFullName()
                    + " [" + admin.getRol() + "] ===========");
            System.out.println("1. Gestion de Usuarios (CRUD)");
            System.out.println("2. Listar Todas las Cuentas Bancarias");
            System.out.println("3. Consultar Cuentas por Usuario");
            System.out.println("4. Listar Todos los Creditos");
            System.out.println("5. Auditoria Global de Transacciones");
            System.out.println("0. Cerrar Sesion Admin");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> menuUser();
                case 2 -> printAccountList(bankService.getAllAccounts(), "No hay cuentas registradas.");
                case 3 -> {
                    System.out.print("Ingrese ID del usuario: ");
                    int userId = readInt();
                    printAccountList(bankService.getAccountsByUser(userId),
                            "El usuario " + userId + " no tiene cuentas registradas.");
                }
                case 4 -> printCreditList(bankService.getAllCredits(), "No hay creditos registrados.");
                case 5 -> menuAdminTransactions();
                case 0 -> System.out.println("\n[INFO] Sesion de administrador cerrada.");
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void menuUser() {
        int option;
        do {
            System.out.println("\n--- GESTION DE USUARIOS ---");
            System.out.println("1. Registrar Nuevo Usuario");
            System.out.println("2. Consultar Usuario por ID");
            System.out.println("3. Listar Todos los Usuarios");
            System.out.println("4. Actualizar Datos de Usuario");
            System.out.println("5. Eliminar Usuario");
            System.out.println("6. Contar Total de Usuarios");
            System.out.println("0. Volver al Panel Administrador");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> createUserFromInput();
                case 2 -> handleSelectUserById();
                case 3 -> handleSelectAllUsers();
                case 4 -> {
                    System.out.println("\n--- ACTUALIZAR USUARIO ---");
                    System.out.print("Ingrese el ID del usuario a modificar: ");
                    updateUserById(readInt());
                }
                case 5 -> handleDeleteUser();
                case 6 -> handleCountUsers();
                case 0 -> { }
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void menuAdminTransactions() {
        int option;
        do {
            System.out.println("\n--- AUDITORIA DE TRANSACCIONES ---");
            System.out.println("1. Listar Todas las Transacciones");
            System.out.println("2. Consultar Movimientos por Numero de Cuenta");
            System.out.println("0. Volver");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> printTransactions(bankService.getAllTransactions());
                case 2 -> {
                    System.out.print("Numero de cuenta: ");
                    printTransactions(bankService.getTransactionsByAccount(readString()));
                }
                case 0 -> { }
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void handleClientOpenAccount(User activeUser) {
        System.out.println("\n--- ABRIR NUEVA CUENTA ---");
        System.out.println("Tipo de cuenta: 1 = Ahorros | 2 = Corriente");
        System.out.print("Seleccione tipo: ");
        int type = readInt();
        if (type != 1 && type != 2) {
            System.out.println("[ERROR] Tipo de cuenta invalido.");
            return;
        }

        String prefix = (type == 1) ? "1001" : "2001";
        String suggested = generateUniqueAccountNumber(prefix, activeUser.getId());
        System.out.print("Numero de cuenta (Enter para '" + suggested + "'): ");
        String accNumber = readOptionalString(suggested);

        System.out.print("Saldo inicial: ");
        double balance = readDouble();

        Cuenta account;
        if (type == 1) {
            account = new CuentaAhorros(accNumber, activeUser.getId(), balance, 0.015);
        } else {
            System.out.print("Cupo de sobregiro (ej. 100000): ");
            double overdraft = readDouble();
            account = new CuentaCorriente(accNumber, activeUser.getId(), balance, overdraft);
        }

        if (bankService.createAccount(account)) {
            System.out.println("\n[EXITO] Cuenta creada:\n" + account);
        } else {
            System.out.println("\n[ERROR] No se pudo crear la cuenta (verifique numero o saldo).");
        }
    }

    private static void handleClientDeposit(User activeUser) {
        System.out.println("\n--- CONSIGNAR A MI CUENTA ---");
        Cuenta target = selectOwnedAccount(activeUser.getId(), "Ingresa el numero de tu cuenta donde deseas consignar: ");
        if (target == null) {
            return;
        }

        System.out.print("Monto a consignar: ");
        double amount = readDouble();
        if (bankService.deposit(target.getAccountNumber(), amount)) {
            System.out.println("\n[EXITO] Consignacion realizada. Nuevo estado:");
            System.out.println(bankService.getAccountByNumber(target.getAccountNumber()));
        } else {
            System.out.println("\n[ERROR] No se pudo realizar la consignacion.");
        }
    }

    private static void handleClientWithdraw(User activeUser) {
        System.out.println("\n--- RETIRAR DINERO DE MI CUENTA ---");
        Cuenta source = selectOwnedAccount(activeUser.getId(), "Ingresa el numero de tu cuenta de la cual deseas retirar: ");
        if (source == null) {
            return;
        }

        System.out.print("Monto a retirar en efectivo: ");
        double amount = readDouble();
        if (bankService.withdraw(source.getAccountNumber(), amount)) {
            System.out.println("\n[EXITO] Retiro realizado. Nuevo estado:");
            System.out.println(bankService.getAccountByNumber(source.getAccountNumber()));
        } else {
            System.out.println("\n[ERROR] Fondos insuficientes o monto invalido.");
        }
    }

    private static void handleClientTransfer(User activeUser) {
        System.out.println("\n--- TRANSFERIR A OTRO USUARIO / CUENTA ---");
        Cuenta source = selectOwnedAccount(activeUser.getId(), "Tu cuenta desde donde envias el dinero: ");
        if (source == null) {
            return;
        }

        System.out.print("Cuenta destino que recibe el dinero: ");
        String targetNumber = readString();
        System.out.print("Monto a transferir: ");
        double amount = readDouble();
        System.out.print("Descripcion / Concepto: ");
        String desc = scanner.nextLine().trim();

        if (bankService.transferBetweenAccounts(source.getAccountNumber(), targetNumber, amount, desc)) {
            System.out.println("\n[EXITO] Transferencia completada.");
            System.out.println("Tu cuenta: " + bankService.getAccountByNumber(source.getAccountNumber()));
            System.out.println("Destino:   " + bankService.getAccountByNumber(targetNumber));
        } else {
            System.out.println("\n[ERROR] No se pudo completar la transferencia (verifique cuenta destino y saldo).");
        }
    }

    private static void handleClientPayCredit(User activeUser) {
        System.out.println("\n--- PAGAR CREDITO DESDE MI CUENTA ---");
        List<Credito> credits = bankService.getCreditsByUser(activeUser.getId());
        if (credits.isEmpty()) {
            System.out.println("[AVISO] No tienes creditos registrados.");
            return;
        }
        printCreditList(credits, "");

        System.out.print("ID de tu credito a abonar: ");
        int creditId = readInt();
        Credito credit = bankService.getCreditById(creditId);
        if (credit == null || credit.getUserId() != activeUser.getId()) {
            System.out.println("[ERROR] El credito no existe o no pertenece a tu usuario.");
            return;
        }

        Cuenta source = selectOwnedAccount(activeUser.getId(), "Tu cuenta origen del pago: ");
        if (source == null) {
            return;
        }

        System.out.print("Monto del abono: ");
        double amount = readDouble();
        if (bankService.payCreditFromAccount(source.getAccountNumber(), creditId, amount)) {
            System.out.println("\n[EXITO] Abono aplicado al credito #" + creditId);
            System.out.println("Cuenta:  " + bankService.getAccountByNumber(source.getAccountNumber()));
            System.out.println("Credito: " + bankService.getCreditById(creditId));
        } else {
            System.out.println("\n[ERROR] No se pudo realizar el pago (verifique saldo o deuda pendiente).");
        }
    }

    private static User createUserFromInput() {
        System.out.print("Ingrese ID numerico (Cedula/Documento): ");
        int id = readInt();
        if (id <= 0) {
            System.out.println("[ERROR] El ID debe ser mayor que cero.");
            return null;
        }
        if (userService.selectUserById(id) != null) {
            System.out.println("[ERROR] Ya existe un usuario registrado con el ID: " + id);
            return null;
        }

        System.out.print("Ingrese Nombres: ");
        String name = readString();
        System.out.print("Ingrese Apellidos: ");
        String lastName = readString();
        System.out.print("Ingrese Correo Electronico: ");
        String email = readString();
        System.out.print("Ingrese Telefono / Celular: ");
        String phone = readString();
        System.out.print("Ingrese Clave / Password: ");
        String password = readString();
        System.out.print("Ingrese Ciudad: ");
        String city = readString();
        System.out.print("Ingrese Preferencias del cliente: ");
        String preferences = readString();

        User newUser = new User(id, name, lastName, email, phone, password, true, city, preferences);
        if (userService.createUser(newUser)) {
            System.out.println("\n[EXITO] Usuario registrado correctamente.");
            System.out.println(newUser);
            return newUser;
        }

        System.out.println("\n[ERROR] No se pudo registrar el usuario (posible email duplicado).");
        return null;
    }

    private static void updateUserById(int id) {
        User existing = userService.selectUserById(id);
        if (existing == null) {
            System.out.println("[ERROR] No se encontro usuario con ID: " + id);
            return;
        }

        System.out.println("\nDatos actuales:\n" + existing);

        System.out.print("\nNuevo Nombre (Enter para mantener '" + existing.getName() + "'): ");
        String name = readOptionalString(existing.getName());
        System.out.print("Nuevos Apellidos (Enter para mantener '" + existing.getLastName() + "'): ");
        String lastName = readOptionalString(existing.getLastName());
        System.out.print("Nuevo Email (Enter para mantener '" + existing.getEmail() + "'): ");
        String email = readOptionalString(existing.getEmail());
        System.out.print("Nuevo Telefono (Enter para mantener '" + existing.getPhone() + "'): ");
        String phone = readOptionalString(existing.getPhone());
        System.out.print("Nuevo Password (Enter para mantener actual): ");
        String password = readOptionalString(existing.getPassword());
        System.out.print("Nueva Ciudad (Enter para mantener '" + existing.getCity() + "'): ");
        String city = readOptionalString(existing.getCity());
        System.out.print("Nuevas Preferencias (Enter para mantener '" + existing.getPreferences() + "'): ");
        String preferences = readOptionalString(existing.getPreferences());

        System.out.print("Estado activo? (1 = Si, 0 = No, Enter = Mantener): ");
        String stateInput = scanner.nextLine().trim();
        boolean state = stateInput.isEmpty() ? existing.isState() : stateInput.equals("1");

        User updatedData = new User(id, name, lastName, email, phone, password, state, city, preferences);
        if (userService.updateUser(id, updatedData)) {
            System.out.println("\n[EXITO] Datos del usuario actualizados.");
            System.out.println(userService.selectUserById(id));
        } else {
            System.out.println("\n[ERROR] Error al actualizar el usuario.");
        }
    }

    private static void handleSelectUserById() {
        System.out.println("\n--- CONSULTAR USUARIO POR ID ---");
        System.out.print("Ingrese el ID a buscar: ");
        User user = userService.selectUserById(readInt());
        if (user != null) {
            System.out.println("\n[RESULTADO] Usuario encontrado:\n" + user);
        } else {
            System.out.println("\n[AVISO] No se encontro ningun usuario con ese ID.");
        }
    }

    private static void handleSelectAllUsers() {
        System.out.println("\n--- LISTADO GENERAL DE USUARIOS ---");
        ArrayList<User> list = userService.selectAllUsers();
        if (list.isEmpty()) {
            System.out.println("[AVISO] No hay usuarios registrados.");
            return;
        }

        System.out.printf("%-6s | %-20s | %-22s | %-12s | %-12s | %-8s%n",
                "ID", "NOMBRE COMPLETO", "CORREO", "TELEFONO", "CIUDAD", "ESTADO");
        System.out.println("-------------------------------------------------------------------------------------------------");
        for (User u : list) {
            System.out.printf("%-6d | %-20s | %-22s | %-12s | %-12s | %-8s%n",
                    u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), u.getCity(), u.getStateDescription());
        }
        System.out.println("Total visualizados: " + list.size());
    }

    private static void handleDeleteUser() {
        System.out.println("\n--- ELIMINAR USUARIO ---");
        System.out.print("Ingrese el ID del usuario a eliminar: ");
        int id = readInt();

        User user = userService.selectUserById(id);
        if (user == null) {
            System.out.println("[ERROR] No se encontro ningun usuario con ID: " + id);
            return;
        }

        System.out.println("Usuario a eliminar: " + user.getFullName() + " (" + user.getEmail() + ")");
        System.out.print("Confirma la eliminacion? (S/N): ");
        if (scanner.nextLine().trim().equalsIgnoreCase("S")) {
            if (userService.deleteUser(id)) {
                System.out.println("\n[EXITO] Usuario eliminado correctamente.");
            } else {
                System.out.println("\n[ERROR] No se pudo eliminar el usuario.");
            }
        } else {
            System.out.println("\n[INFO] Operacion cancelada.");
        }
    }

    private static void handleCountUsers() {
        System.out.println("\n--- TOTAL DE USUARIOS REGISTRADOS ---");
        System.out.println("Origen de datos: " + (userService.isDbConnected() ? "Base de Datos MySQL" : "Memoria Temporal"));
        System.out.println("Total de usuarios: " + userService.countUsers());
        System.out.println("Usuarios activos: " + userService.countActiveUsers());
    }

    private static Cuenta selectOwnedAccount(int userId, String prompt) {
        List<Cuenta> owned = bankService.getAccountsByUser(userId);
        if (owned.isEmpty()) {
            System.out.println("[AVISO] No tienes cuentas registradas. Abre una cuenta primero.");
            return null;
        }
        printAccountList(owned, "");
        String accNumber;
        if (owned.size() == 1) {
            String onlyAccount = owned.get(0).getAccountNumber();
            System.out.print(prompt.replace(": ", "") + " (Enter para usar '" + onlyAccount + "'): ");
            accNumber = readOptionalString(onlyAccount);
        } else {
            System.out.print(prompt);
            accNumber = readString();
        }
        Cuenta account = bankService.getAccountByNumber(accNumber);
        if (account == null || account.getUserId() != userId) {
            System.out.println("[ERROR] La cuenta no existe o no pertenece a tu usuario.");
            return null;
        }
        return account;
    }

    private static String generateUniqueAccountNumber(String prefix, int userId) {
        String candidate = prefix + "-" + userId;
        if (bankService.getAccountByNumber(candidate) == null) {
            return candidate;
        }
        int seq = 2;
        while (bankService.getAccountByNumber(candidate + "-" + seq) != null) {
            seq++;
        }
        return candidate + "-" + seq;
    }

    private static void printAccountList(List<Cuenta> accounts, String emptyMessage) {
        if (accounts.isEmpty()) {
            if (!emptyMessage.isEmpty()) {
                System.out.println("[AVISO] " + emptyMessage);
            }
            return;
        }
        for (Cuenta c : accounts) {
            System.out.println(c);
        }
    }

    private static void printCreditList(List<Credito> credits, String emptyMessage) {
        if (credits.isEmpty()) {
            if (!emptyMessage.isEmpty()) {
                System.out.println("[AVISO] " + emptyMessage);
            }
            return;
        }
        for (Credito c : credits) {
            System.out.println(c);
        }
    }

    private static void printTransactions(List<Transaccion> txs) {
        if (txs.isEmpty()) {
            System.out.println("[AVISO] No hay transacciones registradas.");
            return;
        }
        for (Transaccion tx : txs) {
            System.out.println(tx);
        }
    }

    private static int readInt() {
        while (true) {
            try {
                if (!scanner.hasNextLine()) {
                    return 0;
                }
                return Integer.parseInt(scanner.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.print("[ERROR] Ingrese un numero entero valido: ");
            }
        }
    }

    private static double readDouble() {
        while (true) {
            try {
                if (!scanner.hasNextLine()) {
                    return 0.0;
                }
                return Double.parseDouble(scanner.nextLine().trim());
            } catch (NumberFormatException e) {
                System.out.print("[ERROR] Ingrese un valor numerico valido: ");
            }
        }
    }

    private static String readString() {
        while (true) {
            if (!scanner.hasNextLine()) {
                return "";
            }
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                return line;
            }
            System.out.print("[ERROR] El campo no puede estar vacio. Ingreselo nuevamente: ");
        }
    }

    private static String readOptionalString(String currentValue) {
        if (!scanner.hasNextLine()) {
            return currentValue;
        }
        String line = scanner.nextLine().trim();
        return line.isEmpty() ? currentValue : line;
    }
}
