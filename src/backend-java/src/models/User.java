package models;

/**
 * Clase User (Usuario / Cliente) que hereda de Person.
 * Representa a un cliente del banco "Mi Plata".
 * Incorpora atributos especializados: city y preferences.
 */
public class User extends Person {
    private String city;
    private String preferences;

    // Constructor por defecto
    public User() {
        super();
        this.city = "No especificada";
        this.preferences = "Estándar";
    }

    // Constructor completo parametrizado
    public User(int id, String name, String lastName, String email, String phone,
                String password, boolean state, String city, String preferences) {
        super(id, name, lastName, email, phone, password, state);
        this.city = city;
        this.preferences = preferences;
    }

    // Getters y Setters
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPreferences() {
        return preferences;
    }

    public void setPreferences(String preferences) {
        this.preferences = preferences;
    }

    @Override
    public String toString() {
        return String.format("%s | Ciudad: %-12s | Preferencias: %s",
                super.toString(), city, preferences);
    }
}
