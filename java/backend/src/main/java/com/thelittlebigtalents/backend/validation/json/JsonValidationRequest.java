/* (C)2023 */
package com.thelittlebigtalents.backend.validation.json;

import com.fasterxml.jackson.annotation.JsonProperty;

/** The JSON Validation Request from the external party. */
public class JsonValidationRequest {
    @JsonProperty(required = true)
    private String className;

    @JsonProperty(required = true)
    private String json;

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }
}
