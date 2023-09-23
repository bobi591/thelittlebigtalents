/* (C)2023 */
package com.thelittlebigtalents.backend;

/** The configuration of the application loaded from the Azure App Settings. */
public class Configuration {
    private static final String MONGODB_CONNECTION_STRING = "MONGODB_CONN_STRING";

    /**
     * Retrieves the MongoDB connection string.
     *
     * @return the MongoDB connection string
     */
    public static String getMongodbConnectionstring() {
        return System.getenv(MONGODB_CONNECTION_STRING);
    }
}
