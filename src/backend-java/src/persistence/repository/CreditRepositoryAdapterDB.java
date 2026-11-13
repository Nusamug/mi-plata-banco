package persistence.repository;

import models.Credito;
import persistence.mappers.RowMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CreditRepositoryAdapterDB implements CreditRepository {

    private final Connection connection;
    private final RowMapper<Credito> rowMapper;

    public CreditRepositoryAdapterDB(Connection connection, RowMapper<Credito> rowMapper) {
        this.connection = connection;
        this.rowMapper = rowMapper;
    }

    @Override
    public Credito save(Credito credit) {
        String sql = "INSERT INTO creditos (id_usuario, monto_aprobado, deuda_actual, plazo_meses, estado) " +
                     "VALUES (?, ?, ?, ?, ?)";

        try (PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setInt(1, credit.getUserId());
            ps.setDouble(2, credit.getApprovedAmount());
            ps.setDouble(3, credit.getCurrentDebt());
            ps.setInt(4, credit.getTermMonths());
            ps.setString(5, credit.getStatus());
            ps.executeUpdate();

            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) {
                    credit.setCreditId(keys.getInt(1));
                }
            }
            return credit;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Crear credito: " + e.getMessage());
            return null;
        }
    }

    @Override
    public Optional<Credito> selectById(int creditId) {
        String sql = "SELECT * FROM creditos WHERE id_credito = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, creditId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(rowMapper.mapRow(rs));
                }
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Consultar credito " + creditId + ": " + e.getMessage());
        }

        return Optional.empty();
    }

    @Override
    public List<Credito> selectByUserId(int userId) {
        List<Credito> list = new ArrayList<>();
        String sql = "SELECT * FROM creditos WHERE id_usuario = ? ORDER BY id_credito";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(rowMapper.mapRow(rs));
                }
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Consultar creditos del usuario " + userId + ": " + e.getMessage());
        }

        return list;
    }

    @Override
    public List<Credito> selectAll() {
        List<Credito> list = new ArrayList<>();
        String sql = "SELECT * FROM creditos ORDER BY id_credito";

        try (PreparedStatement ps = connection.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(rowMapper.mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Listar creditos: " + e.getMessage());
        }

        return list;
    }

    @Override
    public boolean updateDebt(int creditId, double newDebt, String status) {
        String sql = "UPDATE creditos SET deuda_actual = ?, estado = ? WHERE id_credito = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setDouble(1, newDebt);
            ps.setString(2, status);
            ps.setInt(3, creditId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Actualizar credito " + creditId + ": " + e.getMessage());
        }

        return false;
    }

    @Override
    public boolean deleteById(int creditId) {
        String sql = "DELETE FROM creditos WHERE id_credito = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, creditId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Eliminar credito " + creditId + ": " + e.getMessage());
        }

        return false;
    }
}
