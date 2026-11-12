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
            System.out.println("\n==================== MENU PRINCIPAL ====================");
            System.out.println("1. Gestion de Usuarios");
            System.out.println("2. Cuentas Bancarias y Transferencias");
            System.out.println("3. Creditos y Pagos");
            System.out.println("4. Historial de Transacciones");
            System.out.println("0. Salir");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> menuUser();
                case 2 -> menuAccounts();
                case 3 -> menuCredits();
                case 4 -> menuTransactions();
                case 0 -> System.out.println("\nGracias por utilizar Mi Plata. Hasta pronto.");
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);

        scanner.close();
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
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> handleCreateUser();
                case 2 -> handleSelectUserById();
                case 3 -> handleSelectAllUsers();
                case 4 -> handleUpdateUser();
                case 5 -> handleDeleteUser();
                case 6 -> handleCountUsers();
                case 0 -> { }
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void menuAccounts() {
        int option;
        do {
            System.out.println("\n--- CUENTAS BANCARIAS Y TRANSFERENCIAS ---");
            System.out.println("1. Crear Cuenta Bancaria (Ahorros / Corriente)");
            System.out.println("2. Listar Todas las Cuentas");
            System.out.println("3. Consultar Cuentas por Usuario");
            System.out.println("4. Consignar a Cuenta");
            System.out.println("5. Retirar de Cuenta");
            System.out.println("6. Transferir entre Usuarios / Cuentas");
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> handleCreateAccount();
                case 2 -> handleListAccounts();
                case 3 -> handleListAccountsByUser();
                case 4 -> handleDeposit();
                case 5 -> handleWithdraw();
                case 6 -> handleTransfer();
                case 0 -> { }
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void menuCredits() {
        int option;
        do {
            System.out.println("\n--- CREDITOS Y PAGOS ---");
            System.out.println("1. Solicitar Nuevo Credito");
            System.out.println("2. Listar Creditos");
            System.out.println("3. Pagar Credito desde Cuenta");
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> handleRequestCredit();
                case 2 -> handleListCredits();
                case 3 -> handlePayCredit();
                case 0 -> { }
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void menuTransactions() {
        int option;
        do {
            System.out.println("\n--- HISTORIAL DE TRANSACCIONES ---");
            System.out.println("1. Listar Todas las Transacciones");
            System.out.println("2. Consultar Movimientos por Cuenta");
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            option = readInt();

            switch (option) {
                case 1 -> printTransactions(bankService.getAllTransactions());
                case 2 -> {
                    System.out.print("Numero de cuenta: ");
                    String acc = readString();
                    printTransactions(bankService.getTransactionsByAccount(acc));
                }
                case 0 -> { }
                default -> System.out.println("\n[AVISO] Opcion no valida.");
            }
        } while (option != 0);
    }

    private static void handleCreateUser() {
        System.out.println("\n--- REGISTRAR NUEVO USUARIO ---");
        System.out.print("Ingrese ID numerico (Cedula/Documento): ");
        int id = readInt();

        if (userService.selectUserById(id) != null) {
            System.out.println("[ERROR] Ya existe un usuario registrado con el ID: " + id);
            return;
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
        } else {
            System.out.println("\n[ERROR] No se pudo registrar el usuario (posible email duplicado).");
        }
    }

    private static void handleSelectUserById() {
        System.out.println("\n--- CONSULTAR USUARIO POR ID ---");
        System.out.print("Ingrese el ID a buscar: ");
        int id = readInt();

        User user = userService.selectUserById(id);
        if (user != null) {
            System.out.println("\n[RESULTADO] Usuario encontrado:");
            System.out.println(user);
        } else {
            System.out.println("\n[AVISO] No se encontro ningun usuario con el ID: " + id);
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

    private static void handleUpdateUser() {
        System.out.println("\n--- ACTUALIZAR USUARIO ---");
        System.out.print("Ingrese el ID del usuario a modificar: ");
        int id = readInt();

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
        String confirm = scanner.nextLine().trim();

        if (confirm.equalsIgnoreCase("S")) {
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

    private static void handleCreateAccount() {
        System.out.println("\n--- CREAR CUENTA BANCARIA ---");
        System.out.print("ID del usuario titular: ");
        int userId = readInt();
        if (userService.selectUserById(userId) == null) {
            System.out.println("[ERROR] No existe usuario registrado con ID: " + userId);
            return;
        }

        System.out.print("Numero de cuenta (ej. 1001-104): ");
        String accNumber = readString();

        System.out.print("Saldo inicial: ");
        double balance = readDouble();

        System.out.println("Tipo de cuenta: 1 = Ahorros | 2 = Corriente");
        System.out.print("Seleccione tipo: ");
        int type = readInt();

        Cuenta account;
        if (type == 1) {
            account = new CuentaAhorros(accNumber, userId, balance, 0.015);
        } else if (type == 2) {
            System.out.print("Cupo de sobregiro (ej. 100000): ");
            double overdraft = readDouble();
            account = new CuentaCorriente(accNumber, userId, balance, overdraft);
        } else {
            System.out.println("[ERROR] Tipo de cuenta invalido.");
            return;
        }

        if (bankService.createAccount(account)) {
            System.out.println("\n[EXITO] Cuenta creada:");
            System.out.println(account);
        } else {
            System.out.println("\n[ERROR] No se pudo crear la cuenta (verifique numero o saldo).");
        }
    }

    private static void handleListAccounts() {
        System.out.println("\n--- LISTADO DE CUENTAS BANCARIAS ---");
        List<Cuenta> accounts = bankService.getAllAccounts();
        if (accounts.isEmpty()) {
            System.out.println("[AVISO] No hay cuentas registradas.");
            return;
        }
        for (Cuenta c : accounts) {
            System.out.println(c);
        }
    }

    private static void handleListAccountsByUser() {
        System.out.print("\nIngrese ID del usuario: ");
        int userId = readInt();
        List<Cuenta> accounts = bankService.getAccountsByUser(userId);
        if (accounts.isEmpty()) {
            System.out.println("[AVISO] El usuario " + userId + " no tiene cuentas registradas.");
            return;
        }
        for (Cuenta c : accounts) {
            System.out.println(c);
        }
    }

    private static void handleDeposit() {
        System.out.println("\n--- CONSIGNAR A CUENTA ---");
        System.out.print("Numero de cuenta destino: ");
        String accNumber = readString();
        System.out.print("Monto a consignar: ");
        double amount = readDouble();

        if (bankService.deposit(accNumber, amount)) {
            System.out.println("\n[EXITO] Consignacion realizada. Nuevo estado:");
            System.out.println(bankService.getAccountByNumber(accNumber));
        } else {
            System.out.println("\n[ERROR] No se pudo realizar la consignacion.");
        }
    }

    private static void handleWithdraw() {
        System.out.println("\n--- RETIRAR DE CUENTA ---");
        System.out.print("Numero de cuenta origen: ");
        String accNumber = readString();
        System.out.print("Monto a retirar: ");
        double amount = readDouble();

        if (bankService.withdraw(accNumber, amount)) {
            System.out.println("\n[EXITO] Retiro realizado. Nuevo estado:");
            System.out.println(bankService.getAccountByNumber(accNumber));
        } else {
            System.out.println("\n[ERROR] Fondos insuficientes o cuenta no valida.");
        }
    }

    private static void handleTransfer() {
        System.out.println("\n--- TRANSFERIR ENTRE CUENTAS ---");
        System.out.print("Cuenta origen: ");
        String source = readString();
        System.out.print("Cuenta destino: ");
        String target = readString();
        System.out.print("Monto a transferir: ");
        double amount = readDouble();
        System.out.print("Descripcion / Concepto: ");
        String desc = scanner.nextLine().trim();

        if (bankService.transferBetweenAccounts(source, target, amount, desc)) {
            System.out.println("\n[EXITO] Transferencia completada.");
            System.out.println("Origen:  " + bankService.getAccountByNumber(source));
            System.out.println("Destino: " + bankService.getAccountByNumber(target));
        } else {
            System.out.println("\n[ERROR] No se pudo completar la transferencia (verifique cuentas y fondos).");
        }
    }

    private static void handleRequestCredit() {
        System.out.println("\n--- SOLICITAR CREDITO ---");
        System.out.print("ID del usuario solicitante: ");
        int userId = readInt();
        if (userService.selectUserById(userId) == null) {
            System.out.println("[ERROR] No existe usuario registrado con ID: " + userId);
            return;
        }

        System.out.print("Monto del credito: ");
        double amount = readDouble();
        System.out.print("Plazo en meses: ");
        int termMonths = readInt();

        Credito credit = bankService.requestCredit(userId, amount, termMonths);
        if (credit != null) {
            System.out.println("\n[EXITO] Credito aprobado:");
            System.out.println(credit);
        } else {
            System.out.println("\n[ERROR] No se pudo registrar el credito.");
        }
    }

    private static void handleListCredits() {
        System.out.println("\n--- LISTADO DE CREDITOS ---");
        List<Credito> credits = bankService.getAllCredits();
        if (credits.isEmpty()) {
            System.out.println("[AVISO] No hay creditos registrados.");
            return;
        }
        for (Credito c : credits) {
            System.out.println(c);
        }
    }

    private static void handlePayCredit() {
        System.out.println("\n--- PAGAR CREDITO DESDE CUENTA ---");
        System.out.print("Cuenta origen del pago: ");
        String source = readString();
        System.out.print("ID del credito a abonar: ");
        int creditId = readInt();
        System.out.print("Monto del abono: ");
        double amount = readDouble();

        if (bankService.payCreditFromAccount(source, creditId, amount)) {
            System.out.println("\n[EXITO] Abono aplicado al credito #" + creditId);
            System.out.println("Cuenta:  " + bankService.getAccountByNumber(source));
            System.out.println("Credito: " + bankService.getCreditById(creditId));
        } else {
            System.out.println("\n[ERROR] No se pudo realizar el pago (verifique saldo, cuenta o deuda pendiente).");
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
                String line = scanner.nextLine().trim();
                return Integer.parseInt(line);
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
                String line = scanner.nextLine().trim();
                return Double.parseDouble(line);
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
