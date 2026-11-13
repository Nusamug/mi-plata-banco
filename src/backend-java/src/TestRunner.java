import models.Admin;
import models.Credito;
import models.Cuenta;
import models.CuentaAhorros;
import models.CuentaCorriente;
import models.Transaccion;
import models.User;
import services.BankService;
import services.UserService;

import java.util.List;

public class TestRunner {

    public static void main(String[] args) {
        System.out.println("=== INICIANDO PRUEBAS INTEGRALES DE MI PLATA ===\n");

        UserService userService = new UserService();
        BankService bankService = new BankService();

        int passed = 0;
        int total = 13;

        cleanupTestData(bankService, userService);

        if (userService.isDbConnected() && bankService.isDbConnected()) {
            System.out.println("[PASS] 1. Conexion activa a MySQL (mi_plata_db)");
            passed++;
        } else {
            System.out.println("[FAIL] 1. Conexion activa a MySQL (se esperaba BD conectada)");
        }

        if (userService.countUsers() >= 3 && userService.selectUserById(101) != null) {
            System.out.println("[PASS] 2. Datos semilla de usuarios cargados (" + userService.countUsers() + ")");
            passed++;
        } else {
            System.out.println("[FAIL] 2. Datos semilla de usuarios");
        }

        User byId = userService.authenticateUser("101", "Pass123*");
        User byEmail = userService.authenticateUser("carlos@banco.com", "Pass123*");
        User wrongPass = userService.authenticateUser("101", "ClaveMala");
        Admin adminOk = userService.authenticateAdmin("admin@banco.com", "Admin123*");
        Admin adminBad = userService.authenticateAdmin("admin@banco.com", "Wrong");
        if (byId != null && byEmail != null && wrongPass == null && adminOk != null && adminBad == null) {
            System.out.println("[PASS] 3. Autenticacion de Cliente (ID/Email) y Administrador");
            passed++;
        } else {
            System.out.println("[FAIL] 3. Autenticacion de Cliente y Administrador");
        }

        User testUser = new User(104, "Prueba", "Backend", "prueba104@banco.com", "3000001122",
                "Secret1*", true, "Medellin", "Digital");
        boolean userCreated = userService.createUser(testUser);
        User updatedPayload = new User(104, "Prueba Editada", "Backend", "prueba104@banco.com", "3000001122",
                "Secret1*", true, "Envigado", "SMS");
        boolean userUpdated = userService.updateUser(104, updatedPayload);
        User fetchedUser = userService.selectUserById(104);

        if (userCreated && userUpdated && fetchedUser != null && "Envigado".equals(fetchedUser.getCity())) {
            System.out.println("[PASS] 4. CRUD de usuario (Crear + Actualizar + Consultar)");
            passed++;
        } else {
            System.out.println("[FAIL] 4. CRUD de usuario");
        }

        boolean savingsCreated = bankService.createAccount(new CuentaAhorros("9991-104", 104, 100000.0, 0.015));
        boolean checkingCreated = bankService.createAccount(new CuentaCorriente("9992-104", 104, 50000.0, 100000.0));
        if (savingsCreated && checkingCreated) {
            System.out.println("[PASS] 5. Creacion de cuentas Ahorros y Corriente");
            passed++;
        } else {
            System.out.println("[FAIL] 5. Creacion de cuentas");
        }

        boolean savingsOverRetire = bankService.withdraw("9991-104", 150000.0);
        boolean checkingOverdraftRetire = bankService.withdraw("9992-104", 120000.0);
        Cuenta checkingAfter = bankService.getAccountByNumber("9992-104");

        if (!savingsOverRetire && checkingOverdraftRetire && checkingAfter != null
                && Math.abs(checkingAfter.getBalance() - (-70000.0)) < 0.01) {
            System.out.println("[PASS] 6. Polimorfismo en retiro (Ahorros rechaza, Corriente usa sobregiro)");
            passed++;
        } else {
            System.out.println("[FAIL] 6. Polimorfismo en retiro");
        }

        boolean restoredChecking = bankService.deposit("9992-104", 120000.0);
        Cuenta checkingRestored = bankService.getAccountByNumber("9992-104");
        if (restoredChecking && checkingRestored != null && Math.abs(checkingRestored.getBalance() - 50000.0) < 0.01) {
            System.out.println("[PASS] 7. Consignacion a cuenta corriente restaurada a $50000.00");
            passed++;
        } else {
            System.out.println("[FAIL] 7. Consignacion a cuenta");
        }

        Cuenta targetBefore = bankService.getAccountByNumber("1001-102");
        double initialTargetBalance = targetBefore != null ? targetBefore.getBalance() : -1;
        boolean transferredOut = bankService.transferBetweenAccounts("9991-104", "1001-102", 40000.0, "Transferencia prueba");
        Cuenta sourceAfterTx = bankService.getAccountByNumber("9991-104");
        Cuenta targetAfterTx = bankService.getAccountByNumber("1001-102");
        boolean revertedTransfer = bankService.transferBetweenAccounts("1001-102", "9991-104", 40000.0, "Reversion prueba");

        if (transferredOut && revertedTransfer && sourceAfterTx != null && targetAfterTx != null
                && Math.abs(sourceAfterTx.getBalance() - 60000.0) < 0.01
                && Math.abs(targetAfterTx.getBalance() - (initialTargetBalance + 40000.0)) < 0.01) {
            System.out.println("[PASS] 8. Transferencia atomica entre usuarios (104 <-> 102)");
            passed++;
        } else {
            System.out.println("[FAIL] 8. Transferencia entre usuarios");
        }

        Credito credit = bankService.requestCredit(104, 150000.0, 6);
        if (credit != null && credit.getCreditId() > 0 && Math.abs(credit.getCurrentDebt() - 150000.0) < 0.01) {
            System.out.println("[PASS] 9. Solicitud de credito independiente (ID #" + credit.getCreditId() + ")");
            passed++;
        } else {
            System.out.println("[FAIL] 9. Solicitud de credito");
        }

        boolean creditPaid = false;
        if (credit != null) {
            boolean rejectOverpay = bankService.payCreditFromAccount("9991-104", credit.getCreditId(), 200000.0);
            boolean partialPay = bankService.payCreditFromAccount("9991-104", credit.getCreditId(), 50000.0);
            boolean fundAccount = bankService.deposit("9991-104", 50000.0);
            boolean finalPay = bankService.payCreditFromAccount("9991-104", credit.getCreditId(), 100000.0);
            Credito updatedCredit = bankService.getCreditById(credit.getCreditId());

            if (!rejectOverpay && partialPay && fundAccount && finalPay && updatedCredit != null
                    && updatedCredit.getCurrentDebt() == 0.0 && "PAGADO".equals(updatedCredit.getStatus())) {
                creditPaid = true;
            }
        }
        if (creditPaid) {
            System.out.println("[PASS] 10. Pago de credito por transferencia hasta quedar PAGADO");
            passed++;
        } else {
            System.out.println("[FAIL] 10. Pago de credito por transferencia");
        }

        List<Transaccion> history = bankService.getTransactionsByAccount("9991-104");
        boolean hasTransfer = history.stream().anyMatch(t -> "TRANSFERENCIA".equals(t.getTxType()));
        boolean hasCreditPay = history.stream().anyMatch(t -> "PAGO_CREDITO".equals(t.getTxType()));
        if (hasTransfer && hasCreditPay) {
            System.out.println("[PASS] 11. Registro de historial de transacciones en BD (" + history.size() + " movimientos)");
            passed++;
        } else {
            System.out.println("[FAIL] 11. Registro de historial de transacciones");
        }

        List<Transaccion> user104History = bankService.getTransactionsByUser(104);
        if (user104History.size() >= history.size()) {
            System.out.println("[PASS] 12. Consulta consolidada de movimientos por usuario (" + user104History.size() + ")");
            passed++;
        } else {
            System.out.println("[FAIL] 12. Consulta consolidada por usuario");
        }

        if (credit != null) {
            bankService.deleteCredit(credit.getCreditId());
        }
        boolean cleaned = cleanupTestData(bankService, userService) && userService.selectUserById(104) == null;
        if (cleaned) {
            System.out.println("[PASS] 13. Limpieza y eliminacion de datos de prueba");
            passed++;
        } else {
            System.out.println("[FAIL] 13. Limpieza de datos de prueba");
        }

        System.out.println("\n=== RESUMEN: " + passed + " / " + total + " PRUEBAS SUPERADAS ===");
        if (passed != total) {
            System.exit(1);
        }
    }

    private static boolean cleanupTestData(BankService bankService, UserService userService) {
        bankService.deleteAccount("9991-104");
        bankService.deleteAccount("9992-104");
        for (Credito c : bankService.getCreditsByUser(104)) {
            bankService.deleteCredit(c.getCreditId());
        }
        userService.deleteUser(104);
        return true;
    }
}
