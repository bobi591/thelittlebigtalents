/* (C)2023 */
package com.thelittlebigtalents.backend.security;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

import com.thelittlebigtalents.backend.Configuration;
import com.thelittlebigtalents.backend.datasource.EmptyResultException;
import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.datasource.impl.MongoDatasourceFactory;
import com.thelittlebigtalents.backend.model.impl.User;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.time.Instant;
import java.util.List;
import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import org.bson.conversions.Bson;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.MockitoAnnotations;

/** @author Boris Georgiev */
public class AuthenticationServiceTest {
    @Mock QueryableDatasource<User, Bson> mockedQueryableDatasource;
    private final AuthenticationService sut = new AuthenticationService();
    AutoCloseable openedMocks;
    MockedStatic mockedConfiguration;
    MockedStatic mockedMongoDatasourceFactory;

    @BeforeEach
    public void setup() throws EmptyResultException {
        openedMocks = MockitoAnnotations.openMocks(this);
        mockedConfiguration = mockStatic(Configuration.class);
        mockedMongoDatasourceFactory = mockStatic(MongoDatasourceFactory.class);
        mockedConfiguration
                .when(Configuration::getSecurityPrivateKey)
                .thenReturn(
                        "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEpS39w6z9zeGl"
                                + "G7Bem6FXzpNYDtdyejovo5j/+N+0vAocZ9PnC/p9C9fZqldYtVwbG4gpnikBQKzq"
                                + "oJKgrSZUfgMlazeLm0E9dIBLvY3aeH7j28mnt4D5lxH4GTRqgRf68SZFdDF1G7KX"
                                + "3t8ipb59hOBoBwY4poX33HTH+JuXZv3KZEubWna3Edwtvmg5wp7xPByZAi80Y5oK"
                                + "mP7i2mHitCcr7hkfasAjRA8gtiGdAHWaRmuo/6xFtMZ190vGE6mS+FcQlNPZ2em2"
                                + "lHSltd6lT6P2XBw/SIKQZtUbjQwXjwPJjSWbdwvhymftBXNCZoQHP9p0zZ8Vkeet"
                                + "7vRBkD4XAgMBAAECggEAJsBybsbH6YBQDkyFli9PPVGNQdYy6PFjVA4GUbNGyoQf"
                                + "7fccEDURGOFjmRZzfhzHWOQ1EhaD+CY5rUcVfiqBGjd3AUG+wXlIAwdZXROux7Xl"
                                + "M5wVgkKsXQNDXEQDS1XDVwV8yEUclfpuWHVoPZiyEGRGINn5hOJ0FiNQtDOu3cfq"
                                + "Y6RN5Q8qnjDFnlHmW/Gf7eguob0+o+VqawpgnTPjSQdNYPguxOKE1P5uWbASybGq"
                                + "iADp1Ym8bFNis0ZluKVOpjvCFufmlPcg5G1CPjuGb8yjK48kCgUesstwasoCftkx"
                                + "AbUlAvOTxBnRvHxmyvrJ1VVfNufk0HMTYc3bzMpduQKBgQDxPpvmXp8X+L+e0IGL"
                                + "pTZqnBBj2D67n0gG/OpcJBKdeuNs2XI1SsX5CpQKNOAgTMFDBN5OOoEE/aki7xmw"
                                + "mVRYvcOnIOAeeH5M5IxU81r6n97USOg+5CJW9suNIxwXSi7ouAvu0mXvRFS4LBI+"
                                + "BknDMm+cfQnPbch7/ODHk85jJQKBgQDQrDzCX4m4/Evwq+F9LjUcBT8i8MZMXzX4"
                                + "kn43txlsfzuy2A18siXYA6GpTU/NJZTDqq/GPvNTdA3MgWSS2UbVEuxUs+dDuV91"
                                + "+nIUF1Ub+NovZMeAVCEFrrHBRqt8FvDUEXtfQoYbNs9sbrTIgQqZnwNAt7LFFWJj"
                                + "w+a3icb1iwKBgQC5AW2nfnr9dDrnfTlLsXiIy4RaPZTmZ+Fh0oWcAeHwuTQ93ogS"
                                + "THSEZ1NefGxA+Pvg/JPLZFxbSnhyHPETmJKxt12bBsA5PeiF6WOhJjtoJkBJhlvt"
                                + "FyEqlftGEl3Rkodk2vfzv5CCrGFYGBwpSsM4ma40UUO7upJcW3K6OyS0rQKBgC9b"
                                + "NzrBZcb2cuF+kGDRULo4MpjiXY5NeTkdPcm1Iu7tfQXcZEstPstkH5cFdZvP8I/r"
                                + "N5LdDGmfB9amcsWky59leP7MCSrkcdabbLJEjUsY0aM50tC7xva8K5j6ScaSijsG"
                                + "cKIwvbCFYtNv2FU8e8RbQui4B7kUXkzX049JlD57AoGAV9vneS2+TmByFm543dUI"
                                + "6Hc6k1V/ZdXDqTJG4v7UEahHbw2L+MbsuK2zZVF15nK0bR4UV4gMMZx7DG/SaxKe"
                                + "ffguIhhnetCD4POHKgXinvotG8l5lFKt82jG+wt/PXr8mrKfdzojyjZ2uJRiGvXF"
                                + "fXXfWYLSDeHiEoArNayqqi0=");
        User user = new User();
        user.setPassword("test");
        user.setUsername("test");
        when(mockedQueryableDatasource.get(any(Bson.class))).thenReturn(List.of(user));
        mockedMongoDatasourceFactory
                .when(
                        () ->
                                MongoDatasourceFactory.createMongoQueryableDatasource(
                                        eq(User.class), anyString(), anyString()))
                .thenReturn(mockedQueryableDatasource);
    }

    @AfterEach
    public void teardown() throws Exception {
        openedMocks.close();
        mockedConfiguration.close();
        mockedMongoDatasourceFactory.close();
    }

    @Test
    public void testUserDecryption()
            throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException,
                    InvalidKeySpecException, BadPaddingException, IOException, InvalidKeyException {
        final String encryptedUser =
                "DzmzT3PW3sT5LkxJji2oeVT+xUd6YH3+ntKH1HHrQzf2sqpviBMnAyKUMKLPS/"
                        + "jjIfN+JzJkVNl2FCJAMsu9AFlFMqRxpfTJx0oDn6DBZfA5NYt0bLeHcG/"
                        + "77xBMJyVv68DSzjDrnknZSZZs+SIQRYEnNzaTtZMOOX5rXZBSy+g7bu/AZ4uZ/"
                        + "+0kUqgY6eg0A3/iNJxTiQnb0Nkr/gU56IggPhsdYFSqeHo6h4EeddUl59RhnffvoJj"
                        + "5AuUSijm1lnsi9+pqWBtLAmkiNbqQwe4nk/rYbgZeSxnii4cwy9goS6wGHVpP4jehv"
                        + "N5l6DrUg6Ye1AJTEUo/wyf24Ol0Rg==";
        User decryptedUser = sut.decryptJsonString(User.class, encryptedUser);
        assertEquals("test123", decryptedUser.getUsername());
        assertEquals("test123", decryptedUser.getPassword());
    }

    @Test
    public void testSessionRenewal() throws AuthenticationException {
        long sessionCreation = Instant.now().plusSeconds(50).getEpochSecond();
        Session incomingSession = new Session(sessionCreation, "test123");
        Session renewedSession = sut.renewSession(incomingSession);
        assertTrue(sessionCreation < renewedSession.getSecondsExpiry());
    }

    @Test
    public void testSessionRenewalFailure() {
        long sessionCreation = Instant.now().minusSeconds(50).getEpochSecond();
        Session incomingSession = new Session(sessionCreation, "test123");
        assertThrows(AuthenticationException.class, () -> sut.renewSession(incomingSession));
    }

    @Test
    public void testLogin() throws AuthenticationException {
        User userToLogin = new User();
        userToLogin.setUsername("test");
        userToLogin.setPassword("test");
        assertTrue(sut.login(userToLogin).getSecondsExpiry() > Instant.now().getEpochSecond());
    }

    @Test
    public void testLoginFailure() throws EmptyResultException {
        User userToLogin = new User();
        userToLogin.setUsername("test");
        userToLogin.setPassword("test");
        when(mockedQueryableDatasource.get(any(Bson.class))).thenThrow(EmptyResultException.class);
        assertThrows(AuthenticationException.class, () -> sut.login(userToLogin));
    }
}
