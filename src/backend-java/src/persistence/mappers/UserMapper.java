package persistence.mappers;

import models.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setName(rs.getString("nombre"));
        user.setLastName(rs.getString("apellido"));
        user.setEmail(rs.getString("correo"));
        user.setPhone(rs.getString("telefono"));
        user.setPassword(rs.getString("clave"));
        user.setState(rs.getBoolean("estado"));
        user.setCity(rs.getString("ciudad"));
        user.setPreferences(rs.getString("preferencias"));
        return user;
    }
}
