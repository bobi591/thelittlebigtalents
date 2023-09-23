/* (C)2023 */
package com.thelittlebigtalents.backend;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/** The configuration of the application loaded from the configuration.properties file. */
public class Configuration {
    private static final Properties PROPERTIES = new Properties();
    private static final String MONGODB_CONNECTIONSTRING = "mongodb.connectionString";

    private static void loadProperties() {
        if (PROPERTIES.isEmpty()) {
            try (InputStream is =
                    Configuration.class.getResourceAsStream("/configuration.properties")) {
                PROPERTIES.load(is);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    static {
        loadProperties();
    }

    /**
     * Retrieves the MongoDB connection string.
     *
     * @return the MongoDB connection string
     */
    public static String getMongodbConnectionstring() {
        return PROPERTIES.getProperty(MONGODB_CONNECTIONSTRING);
    }
}
