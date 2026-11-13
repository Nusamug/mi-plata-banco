package persistence.mappers;

import models.Cuenta;
import models.CuentaAhorros;
import models.CuentaCorriente;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AccountMapper implements RowMapper<Cuenta> {

    @Override
    public Cuenta mapRow(ResultSet rs) throws SQLException {
        String type = rs.getString("tipo_cuenta");
        String number = rs.getString("numero_cuenta");
        int userId = rs.getInt("id_usuario");
        double balance = rs.getDouble("saldo");

        if ("CORRIENTE".equalsIgnoreCase(type)) {
            double overdraft = rs.getDouble("limite_sobregiro");
            return new CuentaCorriente(number, userId, balance, overdraft);
        }
        double rate = rs.getDouble("tasa_interes");
        return new CuentaAhorros(number, userId, balance, rate);
    }
}
