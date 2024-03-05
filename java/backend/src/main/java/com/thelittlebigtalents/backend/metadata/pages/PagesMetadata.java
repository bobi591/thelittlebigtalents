/* (C)2023 */
package com.thelittlebigtalents.backend.metadata.pages;

import com.google.common.net.UrlEscapers;
import ru.homyakin.iuliia.Schemas;
import ru.homyakin.iuliia.Translator;

public class PagesMetadata {
    private final String pageName;
    private final String typeName;
    private final String url;

    public PagesMetadata(String pageName, String typeName, String url) {
        Translator translator = new Translator(Schemas.WIKIPEDIA);
        this.pageName = pageName;
        String[] splitClassName = typeName.split("\\.");
        this.typeName = splitClassName[splitClassName.length - 1];
        this.url = url;
    }

    public String getPageName() {
        return pageName;
    }

    public String getTypeName() {
        return typeName;
    }

    public String getUrl() {
        return url;
    }
}
