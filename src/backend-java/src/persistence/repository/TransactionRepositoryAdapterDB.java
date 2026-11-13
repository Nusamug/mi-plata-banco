package persistence.repository;

import models.Transaccion;
import persistence.mappers.RowMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

public class TransactionRepositoryAdapterDB implements TransactionRepository {

    private final Connection connection;
    private final RowMapper<Transaccion> rowMapper;

    public TransactionRepositoryAdapterDB(Connection connection, RowMapper<Transaccion> rowMapper) {
        this.connection = connection;
        this.rowMapper = rowMapper;
    }

    @Override
    public Transaccion save(Transaccion tx) {
        String sql = "INSERT INTO transacciones (cuenta_origen, cuenta_destino, id_credito_destino, tipo_transaccion, monto, descripcion) " +
                     "VALUES (?, ?, ?, ?, ?, ?)";

        try (PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            if (tx.getSourceAccount() != null) {
                ps.setString(1, tx.getSourceAccount());
            } else {
                ps.setNull(1, Types.VARCHAR);
            }

            if (tx.getTargetAccount() != null) {
                ps.setString(2, tx.getTargetAccount());
            } else {
                ps.setNull(2, Types.VARCHAR);
            }

            if (tx.getTargetCreditId() != null) {
                ps.setObject(3, tx.getTargetCreditId(), Types.INTEGER);
            } else {
                ps.setNull(3, Types.INTEGER);
            }

            ps.setString(4, tx.getTxType());
            ps.setDouble(5, tx.getAmount());
            ps.setString(6, tx.getDescription());
            ps.executeUpdate();

            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) {
                    tx.setTxId(keys.getInt(1));
                }
            }
            return tx;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Registrar transaccion: " + e.getMessage());
            return null;
        }
    }

    @Override
    public List<Transaccion> selectAll() {
        List<Transaccion> list = new ArrayList<>();
        String sql = "SELECT * FROM transacciones ORDER BY id_transaccion DESC";

        try (PreparedStatement ps = connection.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(rowMapper.mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Listar transacciones: " + e.getMessage());
        }

        return list;
    }

    @Override
    public List<Transaccion> selectByAccount(String accountNumber) {
        List<Transaccion> list = new ArrayList<>();
        String sql = "SELECT * FROM transacciones WHERE cuenta_origen = ? OR cuenta_destino = ? ORDER BY id_transaccion DESC";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            ps.setString(2, accountNumber);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(rowMapper.mapRow(rs));
                }
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Consultar transacciones de " + accountNumber + ": " + e.getMessage());
        }

        return list;
    }
}
