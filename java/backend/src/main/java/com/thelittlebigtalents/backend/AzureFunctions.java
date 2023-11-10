/* (C)2023 */
package com.thelittlebigtalents.backend;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import com.mongodb.client.model.Filters;
import com.thelittlebigtalents.backend.datasource.EmptyResultException;
import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.datasource.impl.MongoDatasourceFactory;
import com.thelittlebigtalents.backend.metadata.pages.PagesMetadata;
import com.thelittlebigtalents.backend.model.api.BasePageDocument;
import com.thelittlebigtalents.backend.model.api.PersistableDocument;
import com.thelittlebigtalents.backend.model.impl.*;
import com.thelittlebigtalents.backend.security.AuthenticationService;
import com.thelittlebigtalents.backend.security.Session;
import com.thelittlebigtalents.backend.validation.json.JsonValidationProcessor;
import com.thelittlebigtalents.backend.validation.json.JsonValidationRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.apache.commons.text.CaseUtils;
import org.bson.conversions.Bson;

/** Main point of Azure Functions for The Little Big Talents. */
public class AzureFunctions {

    public static final ObjectMapper OBJECT_MAPPER =
            new ObjectMapper()
                    .enable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                    .enable(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES)
                    .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                    .registerModule(new JavaTimeModule());

    @FunctionName("getFooterData")
    public HttpResponseMessage getFooterData(
            @HttpTrigger(
                            name = "getFooterData",
                            methods = {HttpMethod.GET},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");
        try {
            try (QueryableDatasource<Footer, Bson> queryableDatasource =
                    MongoDatasourceFactory.createMongoQueryableDatasource(
                            Footer.class, "development", "footer")) {
                // Get the latest element from stream
                List<Footer> retrievedData = queryableDatasource.getAll();
                return request.createResponseBuilder(HttpStatus.OK)
                        .body(
                                retrievedData.stream()
                                        .skip(retrievedData.size() - 1)
                                        .findFirst()
                                        .get())
                        .build();
            }
        } catch (EmptyResultException emptyResultException) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @FunctionName("getNavbarData")
    public HttpResponseMessage getNavbarData(
            @HttpTrigger(
                            name = "getNavbarData",
                            methods = {HttpMethod.GET},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");
        try {
            try (QueryableDatasource<Navbar, Bson> queryableDatasource =
                    MongoDatasourceFactory.createMongoQueryableDatasource(
                            Navbar.class, "development", "navbar")) {
                // Get the latest element from stream
                List<Navbar> retrievedData = queryableDatasource.getAll();
                return request.createResponseBuilder(HttpStatus.OK)
                        .body(
                                retrievedData.stream()
                                        .skip(retrievedData.size() - 1)
                                        .findFirst()
                                        .get())
                        .build();
            }
        } catch (EmptyResultException emptyResultException) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @FunctionName("getInformationPageData")
    public HttpResponseMessage getInformationPageData(
            @HttpTrigger(
                            name = "getInformationPageData",
                            methods = {HttpMethod.GET},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");
        String pageName = request.getQueryParameters().getOrDefault("pageName", null);
        if (pageName == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("Missing page name query parameter.")
                    .build();
        }
        try {
            try (QueryableDatasource<InformationPage, Bson> queryableDatasource =
                    MongoDatasourceFactory.createMongoQueryableDatasource(
                            InformationPage.class, "development", "page")) {
                return request.createResponseBuilder(HttpStatus.OK)
                        .body(
                                queryableDatasource.get(Filters.eq("pageName", pageName)).stream()
                                        .findFirst()
                                        .get())
                        .build();
            }
        } catch (EmptyResultException emptyResultException) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @FunctionName("getInformationPageGalleryBottomData")
    public HttpResponseMessage getInformationPageGalleryBottomData(
            @HttpTrigger(
                            name = "getInformationPageGalleryBottomData",
                            methods = {HttpMethod.GET},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");
        String pageName = request.getQueryParameters().getOrDefault("pageName", null);
        if (pageName == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("Missing page name query parameter.")
                    .build();
        }
        try {
            try (QueryableDatasource<InformationPageGalleryBottom, Bson> queryableDatasource =
                    MongoDatasourceFactory.createMongoQueryableDatasource(
                            InformationPageGalleryBottom.class, "development", "page")) {
                return request.createResponseBuilder(HttpStatus.OK)
                        .body(
                                queryableDatasource.get(Filters.eq("pageName", pageName)).stream()
                                        .findFirst()
                                        .get())
                        .build();
            }
        } catch (EmptyResultException emptyResultException) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @FunctionName("validateJson")
    public HttpResponseMessage validateJson(
            @HttpTrigger(
                            name = "validateJson",
                            methods = {HttpMethod.POST},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        if (request.getBody().isEmpty()) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST).build();
        }

        try {
            convertJsonToPersistableDocument(request.getBody().get());
            return request.createResponseBuilder(HttpStatus.OK)
                    .body("JSON Validation Passed! :)")
                    .build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("JSON Validation Not Passed! :( \nReason: " + e.getMessage())
                    .build();
        }
    }

    @FunctionName("saveJson")
    public HttpResponseMessage saveJson(
            @HttpTrigger(
                            name = "saveJson",
                            methods = {HttpMethod.POST},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        if (request.getBody().isEmpty()) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST).build();
        }
        try {
            PersistableDocument document =
                    convertJsonToPersistableDocument(request.getBody().get());
            try (QueryableDatasource datasource =
                    MongoDatasourceFactory.createMongoQueryableDatasource(
                            document.getClass(),
                            "development",
                            CaseUtils.toCamelCase(document.getClass().getTypeName(), false))) {
                datasource.insert(document);
            }
            return request.createResponseBuilder(HttpStatus.OK)
                    .body("JSON Validation Passed & Data is Saved! :)")
                    .build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("JSON Validation Not Passed! :( \nReason: " + e.getMessage())
                    .build();
        }
    }

    @FunctionName("updateJson")
    public HttpResponseMessage updateJson(
            @HttpTrigger(
                            name = "updateJson",
                            methods = {HttpMethod.POST},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        if (request.getBody().isEmpty()) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST).build();
        }
        try {
            PersistableDocument document =
                    convertJsonToPersistableDocument(request.getBody().get());
            try (QueryableDatasource datasource =
                    MongoDatasourceFactory.createMongoQueryableDatasource(
                            document.getClass(),
                            "development",
                            CaseUtils.toCamelCase(document.getClass().getTypeName(), false))) {
                datasource.update(document.getId(), document);
            }
            return request.createResponseBuilder(HttpStatus.OK)
                    .body("JSON Validation Passed & Data is Saved! :)")
                    .build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("JSON Validation Not Passed! :( \nReason: " + e.getMessage())
                    .build();
        }
    }

    private PersistableDocument convertJsonToPersistableDocument(String requestBody)
            throws Exception {
        JsonValidationRequest jsonValidationRequest =
                OBJECT_MAPPER.readValue(requestBody, JsonValidationRequest.class);
        JsonValidationProcessor jsonValidationProcessor =
                new JsonValidationProcessor(jsonValidationRequest);
        return jsonValidationProcessor.createPersistableDocument();
    }

    @FunctionName("createSession")
    public HttpResponseMessage createSession(
            @HttpTrigger(
                            name = "createSession",
                            methods = {HttpMethod.POST},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");
        if (request.getBody().isEmpty()) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("Missing or incomplete user information.")
                    .build();
        }
        try {
            AuthenticationService authenticationService = new AuthenticationService();
            User user =
                    authenticationService.decryptJsonString(User.class, request.getBody().get());
            Session session = authenticationService.login(user);
            return request.createResponseBuilder(HttpStatus.OK)
                    .body(OBJECT_MAPPER.writeValueAsString(session))
                    .build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage())
                    .build();
        }
    }

    @FunctionName("refreshSession")
    public HttpResponseMessage refreshSession(
            @HttpTrigger(
                            name = "refreshSession",
                            methods = {HttpMethod.POST},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");
        if (request.getBody().isEmpty()) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("Missing session information.")
                    .build();
        }
        try {
            AuthenticationService authenticationService = new AuthenticationService();
            Session receivedSession =
                    authenticationService.decryptJsonString(Session.class, request.getBody().get());
            Session newSession = authenticationService.renewSession(receivedSession);
            return request.createResponseBuilder(HttpStatus.OK)
                    .body(OBJECT_MAPPER.writeValueAsString(newSession))
                    .build();
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage())
                    .build();
        }
    }

    @FunctionName("getPagesMetadata")
    public HttpResponseMessage getPagesMetadata(
            @HttpTrigger(
                            name = "getMetadataMap",
                            methods = {HttpMethod.GET},
                            authLevel = AuthorizationLevel.FUNCTION)
                    HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");
        try (QueryableDatasource<BasePageDocument, ?> datasource =
                MongoDatasourceFactory.createMongoQueryableDatasource(
                        BasePageDocument.class, "development", "page")) {
            List<PagesMetadata> result = new ArrayList<>();
            datasource
                    .getAll()
                    .forEach(e -> result.add(new PagesMetadata(e.getPageName(), e.getTypeName())));
            return request.createResponseBuilder(HttpStatus.OK).body(result).build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
