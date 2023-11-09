/* (C)2023 */
package com.thelittlebigtalents.backend.model.impl;

import com.thelittlebigtalents.backend.model.api.AbstractPersistableDocument;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
/** The InformationPage POJO. */
public class InformationPage extends AbstractPersistableDocument {
    private String pageName;
    private String bannerMediaSrc;
    private List<InformationPageDataPart> data;

    @NoArgsConstructor
    @Getter
    @Setter
    public static class InformationPageDataPart {
        private String imageSrc;
        private String text;
    }
}
