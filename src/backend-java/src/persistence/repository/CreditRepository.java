package persistence.repository;

import models.Credito;

import java.util.List;
import java.util.Optional;

public interface CreditRepository {

    Credito save(Credito credit);

    Optional<Credito> selectById(int creditId);

    List<Credito> selectByUserId(int userId);

    List<Credito> selectAll();

    boolean updateDebt(int creditId, double newDebt, String status);

    boolean deleteById(int creditId);
}
