/* (C)2023 */
package com.thelittlebigtalents.backend.metadata.pages;

import com.google.common.net.UrlEscapers;
import ru.homyakin.iuliia.Schemas;
import ru.homyakin.iuliia.Translator;

public class PagesMetadata {
    private final String pageName;
    private final String typeName;
    private final String url;

    public PagesMetadata(String pageName, String typeName) {
        Translator translator = new Translator(Schemas.WIKIPEDIA);
        this.pageName = pageName;
        String[] splitClassName = typeName.split("\\.");
        this.typeName = splitClassName[splitClassName.length - 1];
        String urlTypeName = this.typeName.replaceAll("[^A-Z]", "");
        String tempUrl =
                urlTypeName
                        + "/"
                        + UrlEscapers.urlPathSegmentEscaper()
                                .escape(translator.translate(pageName.replace(" ", "")));
        this.url = tempUrl.replace("shch", "sht");
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
