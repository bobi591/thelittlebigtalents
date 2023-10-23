/* (C)2023 */
package com.thelittlebigtalents.backend.datasource.api;

import com.thelittlebigtalents.backend.datasource.EmptyResultException;
import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import java.util.List;

/**
 * Interface for implementation and description of a Queryable Datasource. For example, a MongoDB
 * datasource with connection and client
 *
 * @param <D> the type of the entity (or MongoDB document)
 * @param <Q> the type of the query parameter
 */
public interface QueryableDatasource<D extends PersistableDocument, Q> extends AutoCloseable {
    /**
     * Get records from the datasource using query.
     *
     * @param query the query
     * @return list of found records in a table or collection
     * @throws EmptyResultException when the returned result is empty
     */
    List<D> get(Q query) throws EmptyResultException;

    /**
     * Get all records from the datasource without query. <br>
     * <b>The implementation should sort the records by ID in ascending order <i>(oldest to
     * newest)</i>.</b>
     *
     * @return list of all records in a table or collection
     * @throws EmptyResultException when the returned result is empty
     */
    List<D> getAll() throws EmptyResultException;

    void insert(D toInsert);

    void update(String id, D updatedDocument);
}
