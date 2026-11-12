package models;

public class CuentaCorriente extends Cuenta {
    private double overdraftLimit;

    public CuentaCorriente() {
        super();
        this.overdraftLimit = 100000.0;
    }

    public CuentaCorriente(String accountNumber, int userId, double balance, double overdraftLimit) {
        super(accountNumber, userId, balance);
        this.overdraftLimit = overdraftLimit;
    }

    @Override
    public boolean retirar(double amount) {
        if (amount <= 0 || (balance + overdraftLimit) < amount) {
            return false;
        }
        this.balance -= amount;
        return true;
    }

    @Override
    public String getAccountType() {
        return "CORRIENTE";
    }

    public double getOverdraftLimit() {
        return overdraftLimit;
    }

    public void setOverdraftLimit(double overdraftLimit) {
        this.overdraftLimit = overdraftLimit;
    }

    public double getAvailableFunds() {
        return balance + overdraftLimit;
    }

    @Override
    public String toString() {
        return String.format("%s | Sobregiro: $%.2f | Disponible Total: $%.2f",
                super.toString(), overdraftLimit, getAvailableFunds());
    }
}
