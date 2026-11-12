package models;

public class Admin extends Person {
    private String rol;
    private String area;

    public Admin() {
        super();
        this.rol = "OPERADOR";
        this.area = "Sistemas";
    }

    public Admin(int id, String name, String lastName, String email, String phone,
                 String password, boolean state, String rol, String area) {
        super(id, name, lastName, email, phone, password, state);
        this.rol = rol;
        this.area = area;
    }

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
