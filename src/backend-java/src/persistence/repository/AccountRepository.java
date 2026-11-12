package persistence.repository;

import models.Cuenta;

import java.util.List;
import java.util.Optional;

public interface AccountRepository {
    Cuenta save(Cuenta account);
    Optional<Cuenta> selectByNumber(String accountNumber);
    List<Cuenta> selectByUserId(int userId);
    List<Cuenta> selectAll();
    boolean updateBalance(String accountNumber, double newBalance);
    boolean deleteByNumber(String accountNumber);
}
