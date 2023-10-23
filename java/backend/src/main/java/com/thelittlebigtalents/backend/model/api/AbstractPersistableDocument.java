/* (C)2023 */
package com.thelittlebigtalents.backend.model.api;

import org.bson.BsonType;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonRepresentation;

public class AbstractPersistableDocument implements PersistableDocument {
    @BsonId
    @BsonRepresentation(BsonType.OBJECT_ID)
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
