/* (C)2023 */
package com.thelittlebigtalents.backend.datasource.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.thelittlebigtalents.backend.datasource.EmptyResultException;
import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import java.util.function.Consumer;
import org.bson.conversions.Bson;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

/** @author Boris Georgiev */
public class MongoDatasourceTest {
    @Mock MongoClient mockMongoClient;
    @Mock PersistableDocument mockPersistableDocument;
    @Mock MongoDatabase mockDatabase;
    @Mock MongoCollection mockCollection;
    final String databaseName = "database";
    final String collectionName = "collection";
    AutoCloseable openedMocks;
    MongoDatasource sut;

    @BeforeEach
    public void setup() {
        openedMocks = MockitoAnnotations.openMocks(this);
        sut =
                new MongoDatasource(
                        mockMongoClient,
                        databaseName,
                        collectionName,
                        mockPersistableDocument.getClass());
        when(mockMongoClient.getDatabase(eq(databaseName))).thenReturn(mockDatabase);
        when(mockDatabase.getCollection(eq(collectionName), eq(mockPersistableDocument.getClass())))
                .thenReturn(mockCollection);
    }

    @AfterEach
    public void teardown() throws Exception {
        openedMocks.close();
    }

    /**
     * Create iterable mock that returns two mock documents.
     *
     * @return the iterable mock
     */
    private FindIterable mockFindIterable() {
        FindIterable findResult = mock(FindIterable.class);
        MongoCursor mongoCursor = mock(MongoCursor.class);
        PersistableDocument document1 = mock(PersistableDocument.class);
        PersistableDocument document2 = mock(PersistableDocument.class);
        when(mongoCursor.hasNext()).thenReturn(true).thenReturn(true).thenReturn(false);
        when(mongoCursor.next()).thenReturn(document1).thenReturn(document2).thenReturn(null);
        when(findResult.iterator()).thenReturn(mongoCursor);
        Mockito.doCallRealMethod().when(findResult).forEach(any(Consumer.class));
        return findResult;
    }

    /**
     * Create iterable mock that returns zero documents.
     *
     * @return the iterable mock
     */
    private FindIterable mockEmptyFindIterable() {
        FindIterable findResult = mock(FindIterable.class);
        MongoCursor mongoCursor = mock(MongoCursor.class);
        when(mongoCursor.hasNext()).thenReturn(false);
        when(mongoCursor.next()).thenReturn(null);
        when(findResult.iterator()).thenReturn(mongoCursor);
        Mockito.doCallRealMethod().when(findResult).forEach(any(Consumer.class));
        return findResult;
    }

    @Test
    public void testGet() throws EmptyResultException {
        FindIterable findIterable = mockFindIterable();
        when(mockCollection.find(any(Bson.class))).thenReturn(findIterable);
        assertEquals(2, sut.get(mock(Bson.class)).size());
    }

    @Test
    public void testGet_NoResults() {
        FindIterable findIterable = mockEmptyFindIterable();
        when(mockCollection.find(any(Bson.class))).thenReturn(findIterable);
        try {
            sut.get(mock(Bson.class));
        } catch (Exception e) {
            assertTrue(e instanceof EmptyResultException);
        }
    }

    @Test
    public void testGetAll() throws EmptyResultException {
        FindIterable findIterable = mockFindIterable();
        when(mockCollection.find()).thenReturn(findIterable);
        assertEquals(2, sut.getAll().size());
    }

    @Test
    public void testGetAll_NoResults() {
        FindIterable findIterable = mockEmptyFindIterable();
        when(mockCollection.find()).thenReturn(findIterable);
        try {
            sut.getAll();
        } catch (Exception e) {
            assertTrue(e instanceof EmptyResultException);
        }
    }
}
