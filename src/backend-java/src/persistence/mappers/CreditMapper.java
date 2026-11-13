package persistence.mappers;

import models.Credito;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CreditMapper implements RowMapper<Credito> {

    @Override
    public Credito mapRow(ResultSet rs) throws SQLException {
        return new Credito(
                rs.getInt("id_credito"),
                rs.getInt("id_usuario"),
                rs.getDouble("monto_aprobado"),
                rs.getDouble("deuda_actual"),
                rs.getInt("plazo_meses"),
                rs.getString("estado")
        );
    }
}
