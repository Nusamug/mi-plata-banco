package models;

public class Transaccion {
    private int txId;
    private String sourceAccount;
    private String targetAccount;
    private Integer targetCreditId;
    private String txType;
    private double amount;
    private String description;
    private String txDate;

    public Transaccion() {
    }

    public Transaccion(int txId, String sourceAccount, String targetAccount, Integer targetCreditId,
                       String txType, double amount, String description, String txDate) {
        this.txId = txId;
        this.sourceAccount = sourceAccount;
        this.targetAccount = targetAccount;
        this.targetCreditId = targetCreditId;
        this.txType = txType;
        this.amount = amount;
        this.description = description;
        this.txDate = txDate;
    }

    public Transaccion(String sourceAccount, String targetAccount, Integer targetCreditId,
                       String txType, double amount, String description) {
        this.sourceAccount = sourceAccount;
        this.targetAccount = targetAccount;
        this.targetCreditId = targetCreditId;
        this.txType = txType;
        this.amount = amount;
        this.description = description;
    }

    public int getTxId() {
        return txId;
    }

    public void setTxId(int txId) {
        this.txId = txId;
    }

    public String getSourceAccount() {
        return sourceAccount;
    }

    public void setSourceAccount(String sourceAccount) {
        this.sourceAccount = sourceAccount;
    }

    public String getTargetAccount() {
        return targetAccount;
    }

    public void setTargetAccount(String targetAccount) {
        this.targetAccount = targetAccount;
    }

    public Integer getTargetCreditId() {
        return targetCreditId;
    }

    public void setTargetCreditId(Integer targetCreditId) {
        this.targetCreditId = targetCreditId;
    }

    public String getTxType() {
        return txType;
    }

    public void setTxType(String txType) {
        this.txType = txType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTxDate() {
        return txDate;
    }

    public void setTxDate(String txDate) {
        this.txDate = txDate;
    }

    @Override
    public String toString() {
        String detalle;
        if ("CONSIGNACION".equalsIgnoreCase(txType)) {
            detalle = "Cuenta: " + (targetAccount != null ? targetAccount : "-");
        } else if ("RETIRO".equalsIgnoreCase(txType)) {
            detalle = "Cuenta: " + (sourceAccount != null ? sourceAccount : "-");
        } else if ("PAGO_CREDITO".equalsIgnoreCase(txType)) {
            String origen = sourceAccount != null ? sourceAccount : "-";
            String credito = targetCreditId != null ? "CRED-" + targetCreditId : "-";
            detalle = "De: " + origen + " -> " + credito;
        } else {
            String origen = sourceAccount != null ? sourceAccount : "-";
            String destino = targetAccount != null ? targetAccount : "-";
            detalle = "De: " + origen + " -> A: " + destino;
        }
        return String.format("TX #%-3d | %-13s | %-22s | Monto: $%-10.2f | %s",
                txId, txType, detalle, amount, description);
    }
}
