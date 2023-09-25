/* (C)2023 */
package com.thelittlebigtalents.backend.model.impl;

import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.bson.codecs.pojo.annotations.BsonIgnore;

@Getter
@Setter
/** The InformationPageGalleryBottom POJO. */
public class InformationPageGalleryBottom implements PersistableDocument {
    @BsonIgnore private String className = this.getClass().getName();
    private String pageName;
    private String text;
    private List<String> galleryImgSrcs;
}
