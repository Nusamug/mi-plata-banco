package models;

public class Credito {
    private int creditId;
    private int userId;
    private double approvedAmount;
    private double currentDebt;
    private int termMonths;
    private String status;

    public Credito() {
        this.status = "ACTIVO";
    }

    public Credito(int creditId, int userId, double approvedAmount, double currentDebt, int termMonths, String status) {
        this.creditId = creditId;
        this.userId = userId;
        this.approvedAmount = approvedAmount;
        this.currentDebt = currentDebt;
        this.termMonths = termMonths;
        this.status = status;
    }

    public boolean abonarPago(double amount) {
        if (amount <= 0 || currentDebt <= 0 || amount > currentDebt) {
            return false;
        }
        this.currentDebt -= amount;
        if (this.currentDebt == 0) {
            this.status = "PAGADO";
        }
        return true;
    }

    public int getCreditId() {
        return creditId;
    }

    public void setCreditId(int creditId) {
        this.creditId = creditId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public double getApprovedAmount() {
        return approvedAmount;
    }

    public void setApprovedAmount(double approvedAmount) {
        this.approvedAmount = approvedAmount;
    }

    public double getCurrentDebt() {
        return currentDebt;
    }

    public void setCurrentDebt(double currentDebt) {
        this.currentDebt = currentDebt;
    }

    public int getTermMonths() {
        return termMonths;
    }

    public void setTermMonths(int termMonths) {
        this.termMonths = termMonths;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return String.format("Credito ID: %-3d | Titular ID: %-4d | Aprobado: $%.2f | Deuda Actual: $%.2f | Plazo: %d meses | Estado: %s",
                creditId, userId, approvedAmount, currentDebt, termMonths, status);
    }
}
