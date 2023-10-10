/* (C)2023 */
package com.thelittlebigtalents.backend.validation.json;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.thelittlebigtalents.backend.AzureFunctions;
import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import com.thelittlebigtalents.backend.validation.ValidationException;
import org.apache.commons.lang3.StringUtils;

/** This class carries the JSON Validation process. */
public class JsonValidationProcessor {
    private final JsonValidationRequest jsonValidationRequest;
    private final ObjectMapper objectMapper;

    public JsonValidationProcessor(JsonValidationRequest jsonValidationRequest) {
        this.jsonValidationRequest = jsonValidationRequest;
        this.objectMapper = AzureFunctions.OBJECT_MAPPER;
    }

    /**
     * Run JSON validation and indicates whether the JSON is valid {@link PersistableDocument} or
     * not.
     *
     * @return true if JSON is valid, false if not
     * @throws ValidationException an error during JSON validation, like missing data or bad request
     */
    public boolean isValidJson() throws ValidationException {
        if (StringUtils.isBlank(jsonValidationRequest.getJson())
                || StringUtils.isBlank(jsonValidationRequest.getClassName())) {
            throw new ValidationException("Invalid JSON Validation Request.");
        }
        try {
            if (this.jsonValidationRequest.getJson().contains("\"\"")
                    || this.jsonValidationRequest.getJson().contains("null")) {
                throw new ValidationException("There is an empty (null) field.");
            }
            Class requiredClass = Class.forName(jsonValidationRequest.getClassName());
            Object parsedObject =
                    this.objectMapper.readValue(
                            this.jsonValidationRequest.getJson(), requiredClass);
            return parsedObject instanceof PersistableDocument;
        } catch (Exception e) {
            throw new ValidationException(e.getMessage());
        }
    }

    /**
     * Validates the JSON using {@link JsonValidationProcessor#isValidJson()} and creates the {@link
     * PersistableDocument} object.
     *
     * @return the parsed persistable document
     * @throws ValidationException an error during JSON validation, like missing data or bad request
     */
    public PersistableDocument createPersistableDocument() throws ValidationException {
        try {
            isValidJson();
            Class requiredClass = Class.forName(jsonValidationRequest.getClassName());
            Object parsedObject =
                    this.objectMapper.readValue(
                            this.jsonValidationRequest.getJson(), requiredClass);
            return (PersistableDocument) parsedObject;
        } catch (Exception e) {
            throw new ValidationException(e.getMessage());
        }
    }
}
