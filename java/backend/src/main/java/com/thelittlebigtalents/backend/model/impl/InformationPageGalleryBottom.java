/* (C)2023 */
package com.thelittlebigtalents.backend.model.impl;

import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
/** The InformationPageGalleryBottom POJO. */
public class InformationPageGalleryBottom implements PersistableDocument {
    private String pageName;
    private String text;
    private List<String> galleryImgSrcs;
}
