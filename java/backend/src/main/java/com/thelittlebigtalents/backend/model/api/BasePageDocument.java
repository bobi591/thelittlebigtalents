/* (C)2023 */
package com.thelittlebigtalents.backend.model.api;

public class BasePageDocument extends AbstractPersistableDocument {

    private String url;
    private String pageName;
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPageName() {
        return pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }
}
