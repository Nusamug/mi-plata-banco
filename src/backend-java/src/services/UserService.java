package services;

import models.Admin;
import models.User;
import persistence.dbconnection.DataBaseConnection;
import persistence.mappers.UserMapper;
import persistence.repository.UserRepository;
import persistence.repository.UserRepositoryAdapterDB;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.Optional;

public class UserService {

    private final UserRepository userRepository;
    private final ArrayList<User> memoryFallbackUsers;
    private final Admin defaultAdmin;
    private boolean isDbConnected;

    public UserService() {
        this.memoryFallbackUsers = new ArrayList<>();
        this.defaultAdmin = new Admin(1, "Administrador", "Mi Plata", "admin@banco.com",
                "3000000000", "Admin123*", true, "ADMIN", "Sistemas");
        Connection connection = DataBaseConnection.getInstance().getConnection();

        if (connection != null) {
            this.userRepository = new UserRepositoryAdapterDB(connection, new UserMapper());
            this.isDbConnected = true;
            System.out.println(">> [UserService] Modo de persistencia: BASE DE DATOS MYSQL.");
        } else {
            this.userRepository = null;
            this.isDbConnected = false;
            System.out.println(">> [UserService] Modo de persistencia: MEMORIA TEMPORAL (Fallback).");
            initSampleData();
        }
    }

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.memoryFallbackUsers = new ArrayList<>();
        this.defaultAdmin = new Admin(1, "Administrador", "Mi Plata", "admin@banco.com",
                "3000000000", "Admin123*", true, "ADMIN", "Sistemas");
        this.isDbConnected = (userRepository != null);
    }

    private void initSampleData() {
        memoryFallbackUsers.add(new User(101, "Carlos", "Restrepo", "carlos@banco.com", "3001234567",
                "Pass123*", true, "Medellín", "Notificaciones SMS"));
        memoryFallbackUsers.add(new User(102, "Valentina", "Gómez", "valentina@banco.com", "3119876543",
                "Secure456*", true, "Envigado", "Extracto digital"));
        memoryFallbackUsers.add(new User(103, "Andrés", "Montoya", "andres@banco.com", "3205557788",
                "Clave789*", true, "Bello", "Atención prioritaria"));
    }

    public boolean createUser(User user) {
        if (user == null || user.getId() <= 0) {
            return false;
        }

        if (isDbConnected && userRepository != null) {
            Optional<User> existing = userRepository.selectById(user.getId());
            if (existing.isPresent() || selectUserByEmail(user.getEmail()) != null) {
                return false;
            }
            return userRepository.save(user) != null;
        }

        if (selectUserById(user.getId()) != null || selectUserByEmail(user.getEmail()) != null) {
            return false;
        }
        return memoryFallbackUsers.add(user);
    }

    public User selectUserByEmail(String email) {
        if (email == null || email.isBlank()) {
            return null;
        }
        for (User u : selectAllUsers()) {
            if (u.getEmail().equalsIgnoreCase(email.trim())) {
                return u;
            }
        }
        return null;
    }

    public User authenticateUser(String identifier, String password) {
        if (identifier == null || identifier.isBlank() || password == null) {
            return null;
        }

        String trimmed = identifier.trim();
        User candidate = null;
        try {
            int id = Integer.parseInt(trimmed);
            candidate = selectUserById(id);
        } catch (NumberFormatException ignored) {
            candidate = selectUserByEmail(trimmed);
        }

        if (candidate != null && candidate.isState() && candidate.getPassword().equals(password)) {
            return candidate;
        }
        return null;
    }

    public Admin authenticateAdmin(String identifier, String password) {
        if (identifier == null || password == null) {
            return null;
        }
        String trimmed = identifier.trim();
        boolean idMatch = String.valueOf(defaultAdmin.getId()).equals(trimmed)
                || defaultAdmin.getEmail().equalsIgnoreCase(trimmed);
        if (idMatch && defaultAdmin.isState() && defaultAdmin.getPassword().equals(password)) {
            return defaultAdmin;
        }
        return null;
    }

    public User selectUserById(int id) {
        if (isDbConnected && userRepository != null) {
            return userRepository.selectById(id).orElse(null);
        }
        for (User user : memoryFallbackUsers) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

    public boolean updateUser(int id, User updatedData) {
        if (updatedData == null) {
            return false;
        }
        updatedData.setId(id);

        if (isDbConnected && userRepository != null) {
            return userRepository.updateUser(updatedData) != null;
        }

        User existingUser = selectUserById(id);
        if (existingUser == null) {
            return false;
        }
        existingUser.setName(updatedData.getName());
        existingUser.setLastName(updatedData.getLastName());
        existingUser.setEmail(updatedData.getEmail());
        existingUser.setPhone(updatedData.getPhone());
        existingUser.setPassword(updatedData.getPassword());
        existingUser.setState(updatedData.isState());
        existingUser.setCity(updatedData.getCity());
        existingUser.setPreferences(updatedData.getPreferences());
        return true;
    }

    public boolean deleteUser(int id) {
        if (isDbConnected && userRepository != null) {
            return userRepository.deleteById(id);
        }
        User userToDelete = selectUserById(id);
        return userToDelete != null && memoryFallbackUsers.remove(userToDelete);
    }

    public boolean deactivateUser(int id) {
        User user = selectUserById(id);
        if (user != null) {
            user.setState(false);
            return updateUser(id, user);
        }
        return false;
    }

    public int countUsers() {
        if (isDbConnected && userRepository != null) {
            return userRepository.countUsers();
        }
        return memoryFallbackUsers.size();
    }

    public int countActiveUsers() {
        int count = 0;
        for (User u : selectAllUsers()) {
            if (u.isState()) {
                count++;
            }
        }
        return count;
    }

    public ArrayList<User> selectAllUsers() {
        if (isDbConnected && userRepository != null) {
            return new ArrayList<>(userRepository.selectAll());
        }
        return new ArrayList<>(memoryFallbackUsers);
    }

    public boolean isDbConnected() {
        return isDbConnected;
    }
}
