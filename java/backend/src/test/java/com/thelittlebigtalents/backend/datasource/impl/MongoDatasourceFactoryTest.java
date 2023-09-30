/* (C)2023 */
package com.thelittlebigtalents.backend.datasource.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.thelittlebigtalents.backend.Configuration;
import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;

/** @author Boris Georgiev */
public class MongoDatasourceFactoryTest {
    final String databaseName = "databaseName";
    final String collectionName = "collectionName";
    @Mock PersistableDocument mockPersistableDocument;
    AutoCloseable openedMocks;
    MockedStatic mockedConfiguration;

    @BeforeEach
    public void setup() {
        openedMocks = MockitoAnnotations.openMocks(this);
        mockedConfiguration = mockStatic(Configuration.class);
        mockedConfiguration
                .when(Configuration::getMongodbConnectionstring)
                .thenReturn("mongodb://test12345");
    }

    @AfterEach
    public void teardown() throws Exception {
        openedMocks.close();
        mockedConfiguration.close();
    }

    @Test
    public void testNoException() {
        QueryableDatasource mongoQueryableDatasource =
                MongoDatasourceFactory.createMongoQueryableDatasource(
                        mockPersistableDocument.getClass(), databaseName, collectionName);
        assertTrue(mongoQueryableDatasource instanceof MongoDatasource);
        assertEquals(1, MongoDatasourceFactory.DATASOURCE_CACHE.size());
        QueryableDatasource mongoQueryableDatasource2 =
                MongoDatasourceFactory.createMongoQueryableDatasource(
                        mockPersistableDocument.getClass(), databaseName, collectionName);
        assertEquals(1, MongoDatasourceFactory.DATASOURCE_CACHE.size());
    }
}
