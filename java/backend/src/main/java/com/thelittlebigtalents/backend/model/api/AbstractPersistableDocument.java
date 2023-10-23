/* (C)2023 */
package com.thelittlebigtalents.backend.model.api;

import lombok.Getter;
import lombok.Setter;
import org.bson.BsonType;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonRepresentation;

@Getter
@Setter
public class AbstractPersistableDocument implements PersistableDocument {
    @BsonId
    @BsonRepresentation(BsonType.OBJECT_ID)
    private String id;
}
