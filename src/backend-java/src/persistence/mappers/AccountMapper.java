package persistence.mappers;

import models.Cuenta;
import models.CuentaAhorros;
import models.CuentaCorriente;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AccountMapper implements RowMapper<Cuenta> {

    @Override
    public Cuenta mapRow(ResultSet rs) throws SQLException {
        String type = rs.getString("account_type");
        String number = rs.getString("account_number");
        int userId = rs.getInt("user_id");
        double balance = rs.getDouble("balance");

        if ("CORRIENTE".equalsIgnoreCase(type)) {
            double overdraft = rs.getDouble("overdraft_limit");
            return new CuentaCorriente(number, userId, balance, overdraft);
        } else {
            double rate = rs.getDouble("interest_rate");
            return new CuentaAhorros(number, userId, balance, rate);
        }
    }
}
