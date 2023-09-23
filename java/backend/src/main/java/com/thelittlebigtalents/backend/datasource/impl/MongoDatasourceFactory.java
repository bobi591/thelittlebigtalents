/* (C)2023 */
package com.thelittlebigtalents.backend.datasource.impl;

import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import java.util.concurrent.ConcurrentHashMap;

import com.thelittlebigtalents.backend.model.impl.Navbar;
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
    private static ConcurrentHashMap<String, QueryableDatasource> queryableDatasourceCache =
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
        if (!queryableDatasourceCache.containsKey(cacheKey)) {
            queryableDatasourceCache.put(
                    cacheKey,
                    new MongoDatasource<>(persistableDocument, databaseName, collectionName, true));
        }
        return queryableDatasourceCache.get(cacheKey);
    }
}
