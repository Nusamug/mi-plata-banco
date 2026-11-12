package persistence.repository;

import models.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> selectById(int id);
    List<User> selectAll();
    User updateUser(User user);
    boolean deleteById(int id);
    int countUsers();
}
