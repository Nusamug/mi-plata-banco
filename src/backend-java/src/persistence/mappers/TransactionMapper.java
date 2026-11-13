package persistence.mappers;

import models.Transaccion;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TransactionMapper implements RowMapper<Transaccion> {

    @Override
    public Transaccion mapRow(ResultSet rs) throws SQLException {
        Integer creditId = rs.getObject("id_credito_destino") != null ? rs.getInt("id_credito_destino") : null;
        return new Transaccion(
                rs.getInt("id_transaccion"),
                rs.getString("cuenta_origen"),
                rs.getString("cuenta_destino"),
                creditId,
                rs.getString("tipo_transaccion"),
                rs.getDouble("monto"),
                rs.getString("descripcion"),
                rs.getString("fecha_transaccion")
        );
    }
}
