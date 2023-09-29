/* (C)2023 */
package com.thelittlebigtalents.backend;

/** The configuration of the application loaded from the Azure App Settings. */
public class Configuration {
    private static final String MONGODB_CONNECTION_STRING = "MONGODB_CONN_STRING";
    private static final String SECURITY_PRIVATE_KEY = "SECURITY_PRIVATE_KEY";

    /**
     * Retrieves the MongoDB connection string.
     *
     * @return the MongoDB connection string
     */
    public static String getMongodbConnectionstring() {
        return System.getenv(MONGODB_CONNECTION_STRING);
    }
    /**
     * Retrieves the Security private key used for decryption of user data.
     *
     * @return the Security private key
     */
    public static String getSecurityPrivateKey() {
        return System.getenv(SECURITY_PRIVATE_KEY)
                .replace("-----BEGIN PRIVATE KEY-----", "")
                .replace("-----END PRIVATE KEY-----", "")
                .replace("\n", "")
                .replace(" ", "");
    }
}
