package persistence.mappers;

import models.Credito;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CreditMapper implements RowMapper<Credito> {

    @Override
    public Credito mapRow(ResultSet rs) throws SQLException {
        return new Credito(
                rs.getInt("credit_id"),
                rs.getInt("user_id"),
                rs.getDouble("approved_amount"),
                rs.getDouble("current_debt"),
                rs.getInt("term_months"),
                rs.getString("status")
        );
    }
}
