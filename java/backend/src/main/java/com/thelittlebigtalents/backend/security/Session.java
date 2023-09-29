/* (C)2023 */
package com.thelittlebigtalents.backend.security;

/** The session object that is provided to the authenticated user. */
public class Session {
    private long secondsExpiry;
    private String username;

    public Session() {}

    public Session(long secondsExpiry, String username) {
        this.secondsExpiry = secondsExpiry;
        this.username = username;
    }

    public void setSecondsExpiry(long secondsExpiry) {
        this.secondsExpiry = secondsExpiry;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getSecondsExpiry() {
        return this.secondsExpiry;
    }

    public String getUsername() {
        return username;
    }
}
