package models;

public class CuentaAhorros extends Cuenta {
    private double interestRate;

    public CuentaAhorros() {
        super();
        this.interestRate = 0.015;
    }

    public CuentaAhorros(String accountNumber, int userId, double balance, double interestRate) {
        super(accountNumber, userId, balance);
        this.interestRate = interestRate;
    }

    @Override
    public boolean retirar(double amount) {
        if (amount <= 0 || balance < amount) {
            return false;
        }
        this.balance -= amount;
        return true;
    }

    @Override
    public String getAccountType() {
        return "AHORROS";
    }

    public void aplicarRendimiento() {
        this.balance += this.balance * this.interestRate;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    @Override
    public String toString() {
        return String.format("%s | Tasa: %.2f%%", super.toString(), interestRate * 100);
    }
}
