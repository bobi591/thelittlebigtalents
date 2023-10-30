/* (C)2023 */
package com.thelittlebigtalents.backend.model.api;

import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;

/** Interface used for description of persistable objects in {@link QueryableDatasource}. */
public interface PersistableDocument {
    String getId();

    String getClassName();
}
