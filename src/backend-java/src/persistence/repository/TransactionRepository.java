package persistence.repository;

import models.Transaccion;

import java.util.List;

public interface TransactionRepository {

    Transaccion save(Transaccion tx);

    List<Transaccion> selectAll();

    List<Transaccion> selectByAccount(String accountNumber);
}
