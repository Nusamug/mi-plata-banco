package persistence.dbconnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DataBaseConnection {

    private static DataBaseConnection instance;
    private Connection connection;

    private static final String DEFAULT_URL = "jdbc:mysql://localhost:3306/mi_plata_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Bogota";
    private static final String DEFAULT_USER = "root";
    private static final String DEFAULT_PASSWORD = "";

    private DataBaseConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            this.connection = DriverManager.getConnection(DEFAULT_URL, DEFAULT_USER, DEFAULT_PASSWORD);
            System.out.println(">> [DB] Conexión establecida con MySQL ('mi_plata_db').");
        } catch (ClassNotFoundException e) {
            System.err.println(">> [DB ERROR] Driver de MySQL no encontrado: " + e.getMessage());
            this.connection = null;
        } catch (SQLException e) {
            System.err.println(">> [DB AVISO] No se pudo conectar a MySQL en localhost:3306/mi_plata_db: " + e.getMessage());
            this.connection = null;
        }
    }

    public static synchronized DataBaseConnection getInstance() {
        if (instance == null) {
            instance = new DataBaseConnection();
        }
        return instance;
    }

    public Connection getConnection() {
        try {
            if (this.connection == null || this.connection.isClosed()) {
                try {
                    this.connection = DriverManager.getConnection(DEFAULT_URL, DEFAULT_USER, DEFAULT_PASSWORD);
                } catch (SQLException ignored) {
                }
            }
        } catch (SQLException e) {
            System.err.println(">> Error verificando conexión: " + e.getMessage());
        }
        return this.connection;
    }

    public boolean isConnected() {
        try {
            return this.connection != null && !this.connection.isClosed();
        } catch (SQLException e) {
            return false;
        }
    }
}
