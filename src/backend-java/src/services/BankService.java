package services;

import models.Credito;
import models.Cuenta;
import models.CuentaAhorros;
import models.CuentaCorriente;
import models.Transaccion;
import persistence.dbconnection.DataBaseConnection;
import persistence.mappers.AccountMapper;
import persistence.mappers.CreditMapper;
import persistence.mappers.TransactionMapper;
import persistence.repository.AccountRepository;
import persistence.repository.AccountRepositoryAdapterDB;
import persistence.repository.CreditRepository;
import persistence.repository.CreditRepositoryAdapterDB;
import persistence.repository.TransactionRepository;
import persistence.repository.TransactionRepositoryAdapterDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BooleanSupplier;

public class BankService {

    private final Connection connection;
    private final AccountRepository accountRepository;
    private final CreditRepository creditRepository;
    private final TransactionRepository transactionRepository;
    private final boolean isDbConnected;

    private final List<Cuenta> memoryAccounts = new ArrayList<>();
    private final List<Credito> memoryCredits = new ArrayList<>();
    private final List<Transaccion> memoryTransactions = new ArrayList<>();
    private int nextCreditId = 3;
    private int nextTxId = 1;

    public BankService() {
        this.connection = DataBaseConnection.getInstance().getConnection();
        if (this.connection != null) {
            this.accountRepository = new AccountRepositoryAdapterDB(connection, new AccountMapper());
            this.creditRepository = new CreditRepositoryAdapterDB(connection, new CreditMapper());
            this.transactionRepository = new TransactionRepositoryAdapterDB(connection, new TransactionMapper());
            this.isDbConnected = true;
            System.out.println(">> [BankService] Modo de persistencia: BASE DE DATOS MYSQL.");
        } else {
            this.accountRepository = null;
            this.creditRepository = null;
            this.transactionRepository = null;
            this.isDbConnected = false;
            System.out.println(">> [BankService] Modo de persistencia: MEMORIA TEMPORAL (Fallback).");
            initSampleData();
        }
    }

    private void initSampleData() {
        memoryAccounts.add(new CuentaAhorros("1001-101", 101, 500000.0, 0.015));
        memoryAccounts.add(new CuentaCorriente("2001-101", 101, 200000.0, 100000.0));
        memoryAccounts.add(new CuentaAhorros("1001-102", 102, 350000.0, 0.015));
        memoryAccounts.add(new CuentaAhorros("1001-103", 103, 150000.0, 0.015));
        memoryCredits.add(new Credito(1, 101, 1000000.0, 400000.0, 12, "ACTIVO"));
        memoryCredits.add(new Credito(2, 102, 500000.0, 250000.0, 6, "ACTIVO"));
    }

    public boolean createAccount(Cuenta account) {
        if (account == null || account.getAccountNumber() == null || account.getAccountNumber().isBlank()
                || account.getBalance() < 0) {
            return false;
        }
        if (isDbConnected) {
            if (accountRepository.selectByNumber(account.getAccountNumber()).isPresent()) {
                return false;
            }
            return accountRepository.save(account) != null;
        }
        if (getAccountByNumber(account.getAccountNumber()) != null) {
            return false;
        }
        return memoryAccounts.add(account);
    }

    public Cuenta getAccountByNumber(String accountNumber) {
        if (accountNumber == null) {
            return null;
        }
        if (isDbConnected) {
            return accountRepository.selectByNumber(accountNumber).orElse(null);
        }
        for (Cuenta c : memoryAccounts) {
            if (c.getAccountNumber().equals(accountNumber)) {
                return c;
            }
        }
        return null;
    }

    public List<Cuenta> getAccountsByUser(int userId) {
        if (isDbConnected) {
            return accountRepository.selectByUserId(userId);
        }
        List<Cuenta> result = new ArrayList<>();
        for (Cuenta c : memoryAccounts) {
            if (c.getUserId() == userId) {
                result.add(c);
            }
        }
        return result;
    }

    public List<Cuenta> getAllAccounts() {
        if (isDbConnected) {
            return accountRepository.selectAll();
        }
        return new ArrayList<>(memoryAccounts);
    }

    public boolean deleteAccount(String accountNumber) {
        if (isDbConnected) {
            return accountRepository.deleteByNumber(accountNumber);
        }
        return memoryAccounts.removeIf(c -> c.getAccountNumber().equals(accountNumber));
    }

    public boolean deposit(String accountNumber, double amount) {
        Cuenta account = getAccountByNumber(accountNumber);
        if (account == null || !account.consignar(amount)) {
            return false;
        }

        Transaccion tx = new Transaccion(null, accountNumber, null, "CONSIGNACION", amount,
                "Consignacion a cuenta " + accountNumber);

        if (isDbConnected) {
            return executeAtomic(() -> accountRepository.updateBalance(accountNumber, account.getBalance())
                    && transactionRepository.save(tx) != null);
        }
        saveMemoryTransaction(tx);
        return true;
    }

    public boolean withdraw(String accountNumber, double amount) {
        Cuenta account = getAccountByNumber(accountNumber);
        if (account == null || !account.retirar(amount)) {
            return false;
        }

        Transaccion tx = new Transaccion(accountNumber, null, null, "RETIRO", amount,
                "Retiro de cuenta " + account.getAccountType() + " " + accountNumber);

        if (isDbConnected) {
            return executeAtomic(() -> accountRepository.updateBalance(accountNumber, account.getBalance())
                    && transactionRepository.save(tx) != null);
        }
        saveMemoryTransaction(tx);
        return true;
    }

    public boolean transferBetweenAccounts(String sourceAccountNumber, String targetAccountNumber,
                                           double amount, String description) {
        if (sourceAccountNumber == null || targetAccountNumber == null
                || sourceAccountNumber.equals(targetAccountNumber) || amount <= 0) {
            return false;
        }

        Cuenta source = getAccountByNumber(sourceAccountNumber);
        Cuenta target = getAccountByNumber(targetAccountNumber);
        if (source == null || target == null) {
            return false;
        }

        if (!source.retirar(amount)) {
            return false;
        }
        target.consignar(amount);

        String note = (description == null || description.isBlank())
                ? "Transferencia de " + sourceAccountNumber + " a " + targetAccountNumber
                : description;
        Transaccion tx = new Transaccion(sourceAccountNumber, targetAccountNumber, null,
                "TRANSFERENCIA", amount, note);

        if (isDbConnected) {
            return executeAtomic(() ->
                    accountRepository.updateBalance(sourceAccountNumber, source.getBalance())
                            && accountRepository.updateBalance(targetAccountNumber, target.getBalance())
                            && transactionRepository.save(tx) != null);
        }
        saveMemoryTransaction(tx);
        return true;
    }

    public Credito requestCredit(int userId, double approvedAmount, int termMonths) {
        if (userId <= 0 || approvedAmount <= 0 || termMonths <= 0) {
            return null;
        }

        Credito credit = new Credito(0, userId, approvedAmount, approvedAmount, termMonths, "ACTIVO");
        if (isDbConnected) {
            return creditRepository.save(credit);
        }

        credit.setCreditId(nextCreditId++);
        memoryCredits.add(credit);
        return credit;
    }

    public boolean payCreditFromAccount(String sourceAccountNumber, int creditId, double amount) {
        if (sourceAccountNumber == null || amount <= 0) {
            return false;
        }

        Cuenta source = getAccountByNumber(sourceAccountNumber);
        Credito credit = getCreditById(creditId);
        if (source == null || credit == null) {
            return false;
        }
        // Validar abono permitido antes de descontar de la cuenta origen
        if ("PAGADO".equalsIgnoreCase(credit.getStatus()) || amount > credit.getCurrentDebt()) {
            return false;
        }
        if (!source.retirar(amount)) {
            return false;
        }
        credit.abonarPago(amount);

        Transaccion tx = new Transaccion(sourceAccountNumber, null, creditId, "PAGO_CREDITO", amount,
                "Pago a credito #" + creditId + " desde cuenta " + sourceAccountNumber);

        if (isDbConnected) {
            return executeAtomic(() ->
                    accountRepository.updateBalance(sourceAccountNumber, source.getBalance())
                            && creditRepository.updateDebt(creditId, credit.getCurrentDebt(), credit.getStatus())
                            && transactionRepository.save(tx) != null);
        }
        saveMemoryTransaction(tx);
        return true;
    }

    public Credito getCreditById(int creditId) {
        if (isDbConnected) {
            return creditRepository.selectById(creditId).orElse(null);
        }
        for (Credito c : memoryCredits) {
            if (c.getCreditId() == creditId) {
                return c;
            }
        }
        return null;
    }

    public List<Credito> getCreditsByUser(int userId) {
        if (isDbConnected) {
            return creditRepository.selectByUserId(userId);
        }
        List<Credito> result = new ArrayList<>();
        for (Credito c : memoryCredits) {
            if (c.getUserId() == userId) {
                result.add(c);
            }
        }
        return result;
    }

    public List<Credito> getAllCredits() {
        if (isDbConnected) {
            return creditRepository.selectAll();
        }
        return new ArrayList<>(memoryCredits);
    }

    public boolean deleteCredit(int creditId) {
        if (isDbConnected) {
            return creditRepository.deleteById(creditId);
        }
        return memoryCredits.removeIf(c -> c.getCreditId() == creditId);
    }

    public List<Transaccion> getAllTransactions() {
        if (isDbConnected) {
            return transactionRepository.selectAll();
        }
        List<Transaccion> ordered = new ArrayList<>();
        for (int i = memoryTransactions.size() - 1; i >= 0; i--) {
            ordered.add(memoryTransactions.get(i));
        }
        return ordered;
    }

    public List<Transaccion> getTransactionsByAccount(String accountNumber) {
        if (isDbConnected) {
            return transactionRepository.selectByAccount(accountNumber);
        }
        List<Transaccion> result = new ArrayList<>();
        for (int i = memoryTransactions.size() - 1; i >= 0; i--) {
            Transaccion tx = memoryTransactions.get(i);
            if (accountNumber.equals(tx.getSourceAccount()) || accountNumber.equals(tx.getTargetAccount())) {
                result.add(tx);
            }
        }
        return result;
    }

    public boolean isDbConnected() {
        return isDbConnected;
    }

    private boolean executeAtomic(BooleanSupplier operation) {
        try {
            connection.setAutoCommit(false);
            boolean success = operation.getAsBoolean();
            if (success) {
                connection.commit();
                return true;
            }
            connection.rollback();
            return false;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Transaccion revertida: " + e.getMessage());
            try {
                connection.rollback();
            } catch (SQLException rollbackEx) {
                System.err.println(">> [DB ERROR] Rollback: " + rollbackEx.getMessage());
            }
            return false;
        } finally {
            try {
                connection.setAutoCommit(true);
            } catch (SQLException e) {
                System.err.println(">> [DB ERROR] AutoCommit: " + e.getMessage());
            }
        }
    }

    private void saveMemoryTransaction(Transaccion tx) {
        tx.setTxId(nextTxId++);
        tx.setTxDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        memoryTransactions.add(tx);
    }
}
