/* (C)2023 */
package com.thelittlebigtalents.backend;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import com.mongodb.client.model.Filters;
import com.thelittlebigtalents.backend.datasource.EmptyResultException;
import com.thelittlebigtalents.backend.datasource.api.QueryableDatasource;
import com.thelittlebigtalents.backend.datasource.impl.MongoDatasourceFactory;
import com.thelittlebigtalents.backend.model.impl.Footer;
import com.thelittlebigtalents.backend.model.impl.InformationPage;
import com.thelittlebigtalents.backend.model.impl.InformationPageGalleryBottom;
import com.thelittlebigtalents.backend.model.impl.Navbar;
import com.thelittlebigtalents.backend.validation.json.JsonValidationProcessor;
import com.thelittlebigtalents.backend.validation.json.JsonValidationRequest;
import java.util.Optional;
import org.bson.conversions.Bson;

/** Main point of Azure Functions for The Little Big Talents. */
public class AzureFunctions {

    public static final ObjectMapper OBJECT_MAPPER =
            new ObjectMapper()
                    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, true)
                    .configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, true);

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
                return request.createResponseBuilder(HttpStatus.OK)
                        .body(queryableDatasource.getAll().stream().findFirst().get())
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
                return request.createResponseBuilder(HttpStatus.OK)
                        .body(queryableDatasource.getAll().stream().findFirst().get())
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
                            InformationPage.class, "development", "informationPage")) {
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
                            InformationPageGalleryBottom.class,
                            "development",
                            "informationPageGalleryBottom")) {
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
            JsonValidationRequest jsonValidationRequest =
                    OBJECT_MAPPER.readValue(request.getBody().get(), JsonValidationRequest.class);
            JsonValidationProcessor jsonValidationProcessor =
                    new JsonValidationProcessor(jsonValidationRequest);
            if (jsonValidationProcessor.isValidJson()) {
                return request.createResponseBuilder(HttpStatus.OK)
                        .body("JSON Validation Passed! :)")
                        .build();
            } else {
                return request.createResponseBuilder(HttpStatus.OK)
                        .body("JSON Validation Not Passed! :(")
                        .build();
            }
        } catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST)
                    .body("JSON Validation Not Passed! :( \nReason: " + e.getMessage())
                    .build();
        }
    }
}
