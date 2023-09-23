/* (C)2023 */
package com.thelittlebigtalents.backend.datasource;

/** Exception occurring when a datasource method does not return any records. */
public class EmptyResultException extends Exception {
    public EmptyResultException() {
        super();
    }

    public EmptyResultException(String message) {
        super(message);
    }
}
