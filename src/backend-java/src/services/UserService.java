package services;

import models.User;
import java.util.ArrayList;
import java.util.Optional;

/**
 * Servicio de negocio para la gestión de usuarios (Vertical User).
 * Maneja persistencia en memoria mediante ArrayList<User>.
 * Implementa los métodos evaluados:
 * - createUser()
 * - selectUserById()
 * - updateUser()
 * - deleteUser()
 * - countUsers()
 * - selectAllUsers()
 */
public class UserService {
    private final ArrayList<User> users;

    public UserService() {
        this.users = new ArrayList<>();
        initSampleData();
    }

    /**
     * Precarga datos iniciales para demostración y pruebas en consola.
     */
    private void initSampleData() {
        users.add(new User(101, "Carlos", "Restrepo", "carlos@banco.com", "3001234567",
                "Pass123*", true, "Medellín", "Notificaciones SMS"));
        users.add(new User(102, "Valentina", "Gómez", "valentina@banco.com", "3119876543",
                "Secure456*", true, "Envigado", "Extracto digital"));
        users.add(new User(103, "Andrés", "Montoya", "andres@banco.com", "3205557788",
                "Clave789*", true, "Bello", "Atención prioritaria"));
    }

    /**
     * Registra un nuevo usuario en la lista en memoria.
     * Valida que no exista otro usuario con el mismo ID o Email.
     * @param user Usuario a registrar
     * @return true si se registró exitosamente, false si ya existe duplicado.
     */
    public boolean createUser(User user) {
        if (user == null) {
            return false;
        }
        if (selectUserById(user.getId()) != null) {
            return false; // ID duplicado
        }
        for (User u : users) {
            if (u.getEmail().equalsIgnoreCase(user.getEmail())) {
                return false; // Email duplicado
            }
        }
        return users.add(user);
    }

    /**
     * Busca y obtiene un usuario por su identificador único (ID).
     * Requisito de evaluación: selectUserById()
     * @param id Identificador numérico del usuario
     * @return El objeto User si existe, o null si no se encuentra.
     */
    public User selectUserById(int id) {
        for (User user : users) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

    /**
     * Modifica los datos de un usuario existente.
     * Requisito de evaluación: updateUser()
     * @param id ID del usuario a modificar
     * @param updatedData Objeto con los nuevos datos a actualizar
     * @return true si se actualizó con éxito, false si el usuario no fue encontrado.
     */
    public boolean updateUser(int id, User updatedData) {
        User existingUser = selectUserById(id);
        if (existingUser == null || updatedData == null) {
            return false;
        }

        // Actualizar campos de la superclase Person
        existingUser.setName(updatedData.getName());
        existingUser.setLastName(updatedData.getLastName());
        existingUser.setEmail(updatedData.getEmail());
        existingUser.setPhone(updatedData.getPhone());
        existingUser.setPassword(updatedData.getPassword());
        existingUser.setState(updatedData.isState());

        // Actualizar campos propios de User
        existingUser.setCity(updatedData.getCity());
        existingUser.setPreferences(updatedData.getPreferences());

        return true;
    }

    /**
     * Elimina un usuario del sistema (eliminación física del ArrayList).
     * Requisito de evaluación: deleteUser()
     * @param id ID del usuario a eliminar
     * @return true si fue eliminado exitosamente, false si no se encontró.
     */
    public boolean deleteUser(int id) {
        User userToDelete = selectUserById(id);
        if (userToDelete != null) {
            return users.remove(userToDelete);
        }
        return false;
    }

    /**
     * Alternativa: Inactivación lógica del usuario (cambio de estado).
     * @param id ID del usuario
     * @return true si se cambió el estado, false si no existe
     */
    public boolean deactivateUser(int id) {
        User user = selectUserById(id);
        if (user != null) {
            user.setState(false);
            return true;
        }
        return false;
    }

    /**
     * Consulta el número total de usuarios registrados en el ArrayList.
     * Requisito de evaluación: countUsers()
     * @return Cantidad de usuarios
     */
    public int countUsers() {
        return users.size();
    }

    /**
     * Consulta el total de usuarios activos.
     * @return Cantidad de usuarios con state = true
     */
    public int countActiveUsers() {
        int count = 0;
        for (User u : users) {
            if (u.isState()) {
                count++;
            }
        }
        return count;
    }

    /**
     * Obtiene una copia de la lista de todos los usuarios registrados.
     * @return ArrayList<User> con todos los registros
     */
    public ArrayList<User> selectAllUsers() {
        return new ArrayList<>(users);
    }
}
