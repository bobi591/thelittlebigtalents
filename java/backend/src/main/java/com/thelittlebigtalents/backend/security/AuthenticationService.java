/* (C)2023 */
package com.thelittlebigtalents.backend.security;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import com.thelittlebigtalents.backend.datasource.EmptyResultException;
import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.datasource.impl.MongoDatasourceFactory;
import com.thelittlebigtalents.backend.model.impl.User;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.apache.commons.codec.digest.DigestUtils;
import org.bson.conversions.Bson;

/**
 * The authentication service which produces a {@link Session} if the provided credentials are
 * valid.
 */
public class AuthenticationService {
    public Session login(User user) throws AuthenticationException {
        try {
            try (QueryableDatasource<User, Bson> queryableDatasource =
                    MongoDatasourceFactory.createMongoQueryableDatasource(
                            User.class, "development", "user")) {
                queryableDatasource.get(
                        and(
                                eq("username", user.getUsername()),
                                eq("password", DigestUtils.sha256Hex(user.getPassword()))));
            }
            return new Session(Instant.now().plus(1, ChronoUnit.MINUTES), user.getUsername());
        } catch (EmptyResultException e) {
            throw new AuthenticationException("The provided credentials are incorrect.");
        } catch (Exception e) {
            throw new AuthenticationException(e.getMessage());
        }
    }
}
