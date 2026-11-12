package models;

public abstract class Cuenta {
    protected String accountNumber;
    protected int userId;
    protected double balance;

    public Cuenta() {
    }

    public Cuenta(String accountNumber, int userId, double balance) {
        this.accountNumber = accountNumber;
        this.userId = userId;
        this.balance = balance;
    }

    public boolean consignar(double amount) {
        if (amount <= 0) {
            return false;
        }
        this.balance += amount;
        return true;
    }

    public abstract boolean retirar(double amount);

    public abstract String getAccountType();

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return String.format("Cuenta: %-10s | Tipo: %-10s | Titular ID: %-4d | Saldo: $%.2f",
                accountNumber, getAccountType(), userId, balance);
    }
}
