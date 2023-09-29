/* (C)2023 */
package com.thelittlebigtalents.backend.security;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import com.thelittlebigtalents.backend.AzureFunctions;
import com.thelittlebigtalents.backend.Configuration;
import com.thelittlebigtalents.backend.datasource.EmptyResultException;
import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.datasource.impl.MongoDatasourceFactory;
import com.thelittlebigtalents.backend.model.impl.User;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.spec.EncodedKeySpec;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
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

    /**
     * Decrypts the provided data to {@link User} object.
     *
     * @param data the encrypted user data
     * @return the decrypted user object
     * @throws NoSuchAlgorithmException unavailable algorithm
     * @throws InvalidKeySpecException invalid key specification
     * @throws NoSuchPaddingException unavailable padding mechanism
     * @throws InvalidKeyException invalid key format
     * @throws IllegalBlockSizeException cipher block size unmatched
     * @throws BadPaddingException data not padded properly
     * @throws IOException the data is decrypted, but is not correct JSON representation of the
     *     {@link User} object
     */
    public User decryptUserData(String data)
            throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException,
                    InvalidKeyException, IllegalBlockSizeException, BadPaddingException,
                    IOException {
        byte[] privateKeyBytes = Base64.getDecoder().decode(Configuration.getSecurityPrivateKey());
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        EncodedKeySpec privateKeySpec = new PKCS8EncodedKeySpec(privateKeyBytes);
        PrivateKey privateKey = keyFactory.generatePrivate(privateKeySpec);
        Cipher rsaCipher = Cipher.getInstance("RSA");
        rsaCipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedBytes = rsaCipher.doFinal(Base64.getDecoder().decode(data));
        return AzureFunctions.OBJECT_MAPPER.readValue(decryptedBytes, User.class);
    }
}
