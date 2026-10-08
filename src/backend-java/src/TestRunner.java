import models.User;
import services.UserService;

/**
 * Clase de prueba automatizada para verificar la vertical User
 * y generar evidencia de ejecución para la entrega de Back-end.
 */
public class TestRunner {
    public static void main(String[] args) {
        System.out.println("==================================================================");
        System.out.println("   SUITE DE PRUEBAS AUTOMATIZADAS - VERTICAL DE USUARIO (JAVA)    ");
        System.out.println("==================================================================");

        UserService service = new UserService();
        int passed = 0;
        int total = 5;

        // 1. Prueba: countUsers() inicial
        System.out.print("\n[TEST 1] Verificando countUsers() inicial (esperado: 3)... ");
        if (service.countUsers() == 3) {
            System.out.println("PASO (OK)");
            passed++;
        } else {
            System.out.println("FALLO");
        }

        // 2. Prueba: selectUserById()
        System.out.print("[TEST 2] Verificando selectUserById(101) (Carlos Restrepo)... ");
        User u101 = service.selectUserById(101);
        if (u101 != null && u101.getName().equals("Carlos")) {
            System.out.println("PASO (OK) -> " + u101.getFullName() + " [" + u101.getCity() + "]");
            passed++;
        } else {
            System.out.println("FALLO");
        }

        // 3. Prueba: createUser()
        System.out.print("[TEST 3] Verificando createUser() con nuevo usuario (ID 104)... ");
        User nuevo = new User(104, "Mariana", "Perez", "mariana@banco.com", "3154443322",
                "ClaveSegura*", true, "Sabaneta", "Extracto físico");
        boolean created = service.createUser(nuevo);
        if (created && service.countUsers() == 4 && service.selectUserById(104) != null) {
            System.out.println("PASO (OK) -> Total usuarios ahora: " + service.countUsers());
            passed++;
        } else {
            System.out.println("FALLO");
        }

        // 4. Prueba: updateUser()
        System.out.print("[TEST 4] Verificando updateUser() sobre ID 104... ");
        User actualizacion = new User(104, "Mariana", "Perez R.", "mariana.perez@banco.com", "3159998877",
                "NuevaClave*", true, "Itagüí", "Extracto digital");
        boolean updated = service.updateUser(104, actualizacion);
        User verificado = service.selectUserById(104);
        if (updated && verificado.getCity().equals("Itagüí") && verificado.getPhone().equals("3159998877")) {
            System.out.println("PASO (OK) -> Ciudad actualizada a: " + verificado.getCity());
            passed++;
        } else {
            System.out.println("FALLO");
        }

        // 5. Prueba: deleteUser()
        System.out.print("[TEST 5] Verificando deleteUser() sobre ID 104... ");
        boolean deleted = service.deleteUser(104);
        if (deleted && service.selectUserById(104) == null && service.countUsers() == 3) {
            System.out.println("PASO (OK) -> Total usuarios restaurado a: " + service.countUsers());
            passed++;
        } else {
            System.out.println("FALLO");
        }

        System.out.println("\n------------------------------------------------------------------");
        System.out.println(" RESULTADO FINAL: " + passed + "/" + total + " pruebas superadas exitosamente.");
        System.out.println("------------------------------------------------------------------");
    }
}
