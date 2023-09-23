/* (C)2023 */
package com.thelittlebigtalents.backend.model.impl;

import java.util.List;

import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
/** The InformationPage POJO. */
public class InformationPage implements PersistableDocument {
    private String pageName;
    private List<InformationPageDataPart> data;

    @NoArgsConstructor
    @Getter
    @Setter
    public static class InformationPageDataPart {
        private String imageSrc;
        private String text;
    }
}
