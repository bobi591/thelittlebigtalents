/* (C)2023 */
package com.thelittlebigtalents.backend.security;

import java.time.Instant;

/** The session object that is provided to the authenticated user. */
public class Session {
    private final Instant expiry;
    private final String username;

    public Session(Instant expiry, String username) {
        this.expiry = expiry;
        this.username = username;
    }

    public Instant getExpiry() {
        return expiry;
    }

    public String getUsername() {
        return username;
    }
}
