package models;

public class Person {
    private int id;
    private String name;
    private String lastName;
    private String email;
    private String phone;
    private String password;
    private boolean state;

    public Person() {
        this.state = true;
    }

    public Person(int id, String name, String lastName, String email, String phone, String password, boolean state) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFullName() {
        return name + " " + lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isState() {
        return state;
    }

    public void setState(boolean state) {
        this.state = state;
    }

    public String getStateDescription() {
        return state ? "ACTIVO" : "INACTIVO";
    }

    @Override
    public String toString() {
        return String.format("ID: %-4d | Nombre: %-20s | Email: %-22s | Tel: %-12s | Estado: %s",
                id, getFullName(), email, phone, getStateDescription());
    }
}
