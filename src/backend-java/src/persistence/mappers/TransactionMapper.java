package persistence.mappers;

import models.Transaccion;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TransactionMapper implements RowMapper<Transaccion> {

    @Override
    public Transaccion mapRow(ResultSet rs) throws SQLException {
        Integer creditId = rs.getObject("target_credit_id") != null ? rs.getInt("target_credit_id") : null;
        return new Transaccion(
                rs.getInt("tx_id"),
                rs.getString("source_account"),
                rs.getString("target_account"),
                creditId,
                rs.getString("tx_type"),
                rs.getDouble("amount"),
                rs.getString("description"),
                rs.getString("tx_date")
        );
    }
}
