/* (C)2023 */
package com.thelittlebigtalents.backend.model.impl;

import com.thelittlebigtalents.backend.model.api.AbstractPersistableDocument;

public class User extends AbstractPersistableDocument {
    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
