/* (C)2023 */
package com.thelittlebigtalents.backend.datasource.impl;

import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import com.thelittlebigtalents.backend.model.impl.Navbar;
import java.util.concurrent.ConcurrentHashMap;
import org.bson.conversions.Bson;

/**
 * Factory class for building instances of the {@link QueryableDatasource} class for specific
 * entities (or documents).
 */
public class MongoDatasourceFactory {
    /**
     * This is a mechanism that caches into the memory clients and connections in order to avoid
     * expensive and time-consuming creation operations.
     */
    static final ConcurrentHashMap<String, QueryableDatasource> DATASOURCE_CACHE =
            new ConcurrentHashMap<>();

    /**
     * Creates new or returns a cached instance of MongoDB datasource for specific document type.
     *
     * @param persistableDocument the class of the requested MongoDB document <i>(for example:
     *     {@link Navbar})</i>
     * @param databaseName the name of the mongo database
     * @param collectionName the name of the mongo collection
     * @return new or cached instance of the MongoDB datasource for the specific document
     * @param <D> the type of the requested MongoDB document that implements the {@link
     *     PersistableDocument} interface
     */
    public static <D extends PersistableDocument>
            QueryableDatasource<D, Bson> createMongoQueryableDatasource(
                    Class<D> persistableDocument, String databaseName, String collectionName) {
        String cacheKey = persistableDocument.getName();
        if (!DATASOURCE_CACHE.containsKey(cacheKey)) {
            DATASOURCE_CACHE.put(
                    cacheKey,
                    new MongoDatasource<>(persistableDocument, databaseName, collectionName, true));
        }
        return DATASOURCE_CACHE.get(cacheKey);
    }
}
