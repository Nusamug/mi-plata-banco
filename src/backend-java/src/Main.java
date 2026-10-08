import models.User;
import services.UserService;

import java.util.ArrayList;
import java.util.Scanner;

/**
 * Clase principal Main para el backend del sistema bancario "Mi Plata".
 * Implementa el menú interactivo por consola menuUser() evaluado en el Momento 2.
 */
public class Main {
    private static final Scanner scanner = new Scanner(System.in);
    private static final UserService userService = new UserService();

    public static void main(String[] args) {
        System.out.println("===============================================================");
        System.out.println("   SISTEMA BANCARIO 'MI PLATA' - MODULO BACK-END (JAVA)");
        System.out.println("   Desarrollador: Back-end Engineer | CESDE Desarrollo Software");
        System.out.println("===============================================================");
        menuUser();
    }

    /**
     * Menú interactivo por consola para la gestión vertical de usuarios (CRUD).
     */
    public static void menuUser() {
        int option = -1;

        do {
            System.out.println("\n---------------------------------------------------------------");
            System.out.println("                   MENU DE GESTION DE USUARIOS                 ");
            System.out.println("---------------------------------------------------------------");
            System.out.println(" 1. Registrar nuevo usuario (createUser)");
            System.out.println(" 2. Consultar usuario por ID (selectUserById)");
            System.out.println(" 3. Listar todos los usuarios (selectAll)");
            System.out.println(" 4. Actualizar datos de usuario (updateUser)");
            System.out.println(" 5. Eliminar usuario (deleteUser)");
            System.out.println(" 6. Conteo total de usuarios (countUsers)");
            System.out.println(" 7. Salir del sistema");
            System.out.println("---------------------------------------------------------------");
            System.out.print("Seleccione una opcion [1-7]: ");

            option = readInt();

            switch (option) {
                case 1:
                    handleCreateUser();
                    break;
                case 2:
                    handleSelectUserById();
                    break;
                case 3:
                    handleSelectAllUsers();
                    break;
                case 4:
                    handleUpdateUser();
                    break;
                case 5:
                    handleDeleteUser();
                    break;
                case 6:
                    handleCountUsers();
                    break;
                case 7:
                    System.out.println("\n[INFO] Saliendo del modulo de gestion de usuarios. ¡Hasta pronto!");
                    break;
                default:
                    System.out.println("\n[ERROR] Opcion no valida. Ingrese un numero entre 1 y 7.");
            }
        } while (option != 7);
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
        boolean created = userService.createUser(newUser);

        if (created) {
            System.out.println("\n[EXITO] Usuario registrado correctamente en el sistema.");
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
        System.out.println("\n--- LISTADO GENERAL DE USUARIOS REGISTRADOS ---");
        ArrayList<User> list = userService.selectAllUsers();

        if (list.isEmpty()) {
            System.out.println("[AVISO] No hay usuarios registrados en el sistema.");
            return;
        }

        System.out.printf("%-6s | %-20s | %-22s | %-12s | %-12s | %-8s\n",
                "ID", "NOMBRE COMPLETO", "CORREO", "TELEFONO", "CIUDAD", "ESTADO");
        System.out.println("-------------------------------------------------------------------------------------------------");
        for (User u : list) {
            System.out.printf("%-6d | %-20s | %-22s | %-12s | %-12s | %-8s\n",
                    u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), u.getCity(), u.getStateDescription());
        }
        System.out.println("-------------------------------------------------------------------------------------------------");
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

        System.out.println("\nDatos actuales:");
        System.out.println(existing);

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

        System.out.print("Estado activo? (1 = Si / Activo, 0 = No / Inactivo, Enter = Mantener): ");
        String stateInput = scanner.nextLine().trim();
        boolean state = stateInput.isEmpty() ? existing.isState() : stateInput.equals("1");

        User updatedData = new User(id, name, lastName, email, phone, password, state, city, preferences);
        boolean updated = userService.updateUser(id, updatedData);

        if (updated) {
            System.out.println("\n[EXITO] Datos del usuario actualizados satisfactoriamente.");
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
        System.out.print("¿Confirma la eliminacion? (S/N): ");
        String confirm = scanner.nextLine().trim();

        if (confirm.equalsIgnoreCase("S")) {
            boolean deleted = userService.deleteUser(id);
            if (deleted) {
                System.out.println("\n[EXITO] Usuario eliminado del sistema correctamente.");
            } else {
                System.out.println("\n[ERROR] No se pudo eliminar el usuario.");
            }
        } else {
            System.out.println("\n[INFO] Operacion de eliminacion cancelada por el usuario.");
        }
    }

    private static void handleCountUsers() {
        System.out.println("\n--- CONTEO DE USUARIOS REGISTRADOS ---");
        int total = userService.countUsers();
        int active = userService.countActiveUsers();
        int inactive = total - active;

        System.out.println("===========================================");
        System.out.println(" Total de usuarios en memoria : " + total);
        System.out.println(" Usuarios activos             : " + active);
        System.out.println(" Usuarios inactivos           : " + inactive);
        System.out.println("===========================================");
    }

    // Métodos auxiliares de lectura robusta por consola
    private static int readInt() {
        while (true) {
            try {
                String input = scanner.nextLine().trim();
                return Integer.parseInt(input);
            } catch (NumberFormatException e) {
                System.out.print("[ERROR] Debe ingresar un numero entero valido. Intente nuevamente: ");
            }
        }
    }

    private static String readString() {
        while (true) {
            String input = scanner.nextLine().trim();
            if (!input.isEmpty()) {
                return input;
            }
            System.out.print("[ERROR] El campo no puede estar vacio. Ingrese nuevamente: ");
        }
    }

    private static String readOptionalString(String defaultValue) {
        String input = scanner.nextLine().trim();
        return input.isEmpty() ? defaultValue : input;
    }
}
