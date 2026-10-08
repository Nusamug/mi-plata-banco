package models;

/**
 * Clase Admin (Administrador) que hereda de Person.
 * Representa al personal administrativo del sistema bancario "Mi Plata".
 * Incorpora atributos especializados: rol y area.
 */
public class Admin extends Person {
    private String rol;
    private String area;

    // Constructor por defecto
    public Admin() {
        super();
        this.rol = "OPERADOR";
        this.area = "Sistemas";
    }

    // Constructor completo parametrizado
    public Admin(int id, String name, String lastName, String email, String phone,
                 String password, boolean state, String rol, String area) {
        super(id, name, lastName, email, phone, password, state);
        this.rol = rol;
        this.area = area;
    }

    // Getters y Setters
    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    @Override
    public String toString() {
        return String.format("%s | Rol: %-12s | Área: %s",
                super.toString(), rol, area);
    }
}
