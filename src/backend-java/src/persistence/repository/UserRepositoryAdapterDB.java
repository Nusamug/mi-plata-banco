package persistence.repository;

import models.User;
import persistence.mappers.RowMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserRepositoryAdapterDB implements UserRepository {

    private final Connection connection;
    private final RowMapper<User> rowMapper;

    public UserRepositoryAdapterDB(Connection connection, RowMapper<User> rowMapper) {
        this.connection = connection;
        this.rowMapper = rowMapper;
    }

    @Override
    public User save(User user) {
        String sql = "INSERT INTO users (id, name, last_name, email, phone, password, state, city, preferences) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, user.getId());
            ps.setString(2, user.getName());
            ps.setString(3, user.getLastName());
            ps.setString(4, user.getEmail());
            ps.setString(5, user.getPhone());
            ps.setString(6, user.getPassword());
            ps.setBoolean(7, user.isState());
            ps.setString(8, user.getCity());
            ps.setString(9, user.getPreferences());
            ps.executeUpdate();
            return user;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Guardar usuario: " + e.getMessage());
            return null;
        }
    }

    @Override
    public Optional<User> selectById(int id) {
        String sql = "SELECT * FROM users WHERE id = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(rowMapper.mapRow(rs));
                }
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Consultar usuario ID " + id + ": " + e.getMessage());
        }

        return Optional.empty();
    }

    @Override
    public List<User> selectAll() {
        List<User> list = new ArrayList<>();
        String sql = "SELECT * FROM users ORDER BY id ASC";

        try (PreparedStatement ps = connection.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(rowMapper.mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Listar usuarios: " + e.getMessage());
        }

        return list;
    }

    @Override
    public User updateUser(User user) {
        String sql = "UPDATE users SET name = ?, last_name = ?, email = ?, phone = ?, password = ?, " +
                     "state = ?, city = ?, preferences = ? WHERE id = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, user.getName());
            ps.setString(2, user.getLastName());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getPhone());
            ps.setString(5, user.getPassword());
            ps.setBoolean(6, user.isState());
            ps.setString(7, user.getCity());
            ps.setString(8, user.getPreferences());
            ps.setInt(9, user.getId());

            if (ps.executeUpdate() > 0) {
                return user;
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Actualizar usuario ID " + user.getId() + ": " + e.getMessage());
        }

        return null;
    }

    @Override
    public boolean deleteById(int id) {
        String sql = "DELETE FROM users WHERE id = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Eliminar usuario ID " + id + ": " + e.getMessage());
        }

        return false;
    }

    @Override
    public int countUsers() {
        String sql = "SELECT COUNT(*) AS total FROM users";

        try (PreparedStatement ps = connection.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            if (rs.next()) {
                return rs.getInt("total");
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Contar usuarios: " + e.getMessage());
        }

        return 0;
    }
}
