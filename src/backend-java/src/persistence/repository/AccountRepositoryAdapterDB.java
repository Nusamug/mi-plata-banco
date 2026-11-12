package persistence.repository;

import models.Cuenta;
import models.CuentaAhorros;
import models.CuentaCorriente;
import persistence.mappers.RowMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class AccountRepositoryAdapterDB implements AccountRepository {

    private final Connection connection;
    private final RowMapper<Cuenta> rowMapper;

    public AccountRepositoryAdapterDB(Connection connection, RowMapper<Cuenta> rowMapper) {
        this.connection = connection;
        this.rowMapper = rowMapper;
    }

    @Override
    public Cuenta save(Cuenta account) {
        String sql = "INSERT INTO accounts (account_number, user_id, account_type, balance, overdraft_limit, interest_rate) " +
                     "VALUES (?, ?, ?, ?, ?, ?)";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, account.getAccountNumber());
            ps.setInt(2, account.getUserId());
            ps.setString(3, account.getAccountType());
            ps.setDouble(4, account.getBalance());

            double overdraft = (account instanceof CuentaCorriente) ? ((CuentaCorriente) account).getOverdraftLimit() : 0.0;
            double rate = (account instanceof CuentaAhorros) ? ((CuentaAhorros) account).getInterestRate() : 0.0;

            ps.setDouble(5, overdraft);
            ps.setDouble(6, rate);
            ps.executeUpdate();
            return account;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Crear cuenta: " + e.getMessage());
            return null;
        }
    }

    @Override
    public Optional<Cuenta> selectByNumber(String accountNumber) {
        String sql = "SELECT * FROM accounts WHERE account_number = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(rowMapper.mapRow(rs));
                }
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Consultar cuenta " + accountNumber + ": " + e.getMessage());
        }

        return Optional.empty();
    }

    @Override
    public List<Cuenta> selectByUserId(int userId) {
        List<Cuenta> list = new ArrayList<>();
        String sql = "SELECT * FROM accounts WHERE user_id = ? ORDER BY account_type";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(rowMapper.mapRow(rs));
                }
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Consultar cuentas del usuario " + userId + ": " + e.getMessage());
        }

        return list;
    }

    @Override
    public List<Cuenta> selectAll() {
        List<Cuenta> list = new ArrayList<>();
        String sql = "SELECT * FROM accounts ORDER BY user_id, account_number";

        try (PreparedStatement ps = connection.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(rowMapper.mapRow(rs));
            }
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Listar cuentas: " + e.getMessage());
        }

        return list;
    }

    @Override
    public boolean updateBalance(String accountNumber, double newBalance) {
        String sql = "UPDATE accounts SET balance = ? WHERE account_number = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setDouble(1, newBalance);
            ps.setString(2, accountNumber);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Actualizar saldo cuenta " + accountNumber + ": " + e.getMessage());
        }

        return false;
    }

    @Override
    public boolean deleteByNumber(String accountNumber) {
        String sql = "DELETE FROM accounts WHERE account_number = ?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setString(1, accountNumber);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.err.println(">> [DB ERROR] Eliminar cuenta " + accountNumber + ": " + e.getMessage());
        }

        return false;
    }
}
