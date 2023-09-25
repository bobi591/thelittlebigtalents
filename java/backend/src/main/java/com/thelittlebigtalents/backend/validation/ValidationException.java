/* (C)2023 */
package com.thelittlebigtalents.backend.validation;

/**
 * Json Validation Exception used to inform the UI that a validation was not successful and the
 * reason for that
 */
public class ValidationException extends Exception {
    public ValidationException() {
        super();
    }

    public ValidationException(String message) {
        super(message);
    }
}
