/* (C)2023 */
package com.thelittlebigtalents.backend.datasource.impl;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.thelittlebigtalents.backend.Configuration;
import com.thelittlebigtalents.backend.datasource.EmptyResultException;
import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import java.util.LinkedList;
import java.util.List;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.conversions.Bson;

/**
 * Implementation of the MongoDB Datasource.
 *
 * @param <T> the type of the requeste MongoDB document which implements the {@link
 *     PersistableDocument} interface
 */
class MongoDatasource<T extends PersistableDocument> implements QueryableDatasource<T, Bson> {
    private final MongoClient mongoClient;
    private final String databaseName;
    private final String collectionName;
    private final Class<T> persistableDocument;
    private boolean isCached;

    /**
     * Constructor available for the Factory.
     *
     * @param persistableDocument the class of the required MongoDB document for this datasource
     * @param databaseName the name of the MongoDB database
     * @param collectionName the name of the MongoDB collection
     * @param isCached indicator whether this instance of a datasource should be cached or the
     *     internal MongoDB resources can be released with the {@link AutoCloseable#close()} method
     */
    MongoDatasource(
            Class<T> persistableDocument,
            String databaseName,
            String collectionName,
            boolean isCached) {
        this(persistableDocument, databaseName, collectionName);
        this.isCached = isCached;
    }

    /**
     * Constructor available for the Factory. The instance build with this constructor will dispose
     * internal MongoDB resource with the {@link AutoCloseable#close()} method.
     *
     * @param persistableDocument the class of the required MongoDB document for this datasource
     * @param databaseName the name of the MongoDB database
     * @param collectionName the name of the MongoDB collection
     */
    MongoDatasource(Class<T> persistableDocument, String databaseName, String collectionName) {
        List<Class> allClasses = new LinkedList<>(List.of(persistableDocument));
        allClasses.addAll(List.of(persistableDocument.getClasses()));
        PojoCodecProvider pojoCodecProvider =
                PojoCodecProvider.builder().register(allClasses.toArray(new Class[0])).build();
        CodecRegistry registry =
                CodecRegistries.fromRegistries(
                        MongoClientSettings.getDefaultCodecRegistry(),
                        CodecRegistries.fromProviders(pojoCodecProvider));
        MongoClientSettings clientSettings =
                MongoClientSettings.builder()
                        .applyConnectionString(
                                new ConnectionString(Configuration.getMongodbConnectionstring()))
                        .codecRegistry(registry)
                        .build();
        this.mongoClient = MongoClients.create(clientSettings);
        this.databaseName = databaseName;
        this.collectionName = collectionName;
        this.persistableDocument = persistableDocument;
        this.isCached = false;
    }

    @Override
    public List<T> get(Bson query) throws EmptyResultException {
        List<T> result = new LinkedList<>();
        MongoCollection<T> collection =
                mongoClient
                        .getDatabase(databaseName)
                        .getCollection(collectionName, persistableDocument);
        collection.find(query).forEach(result::add);
        if (result.isEmpty()) {
            throw new EmptyResultException();
        }
        return result;
    }

    @Override
    public List<T> getAll() throws EmptyResultException {
        List<T> result = new LinkedList<>();
        MongoCollection<T> collection =
                mongoClient
                        .getDatabase(databaseName)
                        .getCollection(collectionName, persistableDocument);
        collection.find().forEach(result::add);
        if (result.isEmpty()) {
            throw new EmptyResultException();
        }
        return result;
    }

    @Override
    public void close() {
        if (!isCached) {
            this.mongoClient.close();
        }
    }
}
