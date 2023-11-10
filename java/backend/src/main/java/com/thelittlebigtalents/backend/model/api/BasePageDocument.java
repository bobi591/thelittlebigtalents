/* (C)2023 */
package com.thelittlebigtalents.backend.model.api;

public class BasePageDocument extends AbstractPersistableDocument {
    private String pageName;

    public String getPageName() {
        return this.pageName;
    }

    public void setPageName(String pageName) {
        this.pageName = pageName;
    }
}
