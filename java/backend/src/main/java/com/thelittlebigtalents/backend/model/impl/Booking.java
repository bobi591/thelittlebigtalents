/* (C)2024 */
package com.thelittlebigtalents.backend.model.impl;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.thelittlebigtalents.backend.model.api.AbstractPersistableDocument;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Booking extends AbstractPersistableDocument {
    private String parentName;
    private String parentEmail;
    private String parentPhone;
    private String studentName;
    private int studentAge;

    @JsonProperty(value = "isContacted")
    private boolean isContacted;

    private String notes;
}
