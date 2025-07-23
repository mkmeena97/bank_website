package com.example.gatewayserver.service;

import com.example.gatewayserver.dto.RegisterRequest;
import com.example.gatewayserver.dto.ProfileUpdateRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.*;

@Service
public class KeycloakService {

    @Value("${keycloak.auth-server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.client-secret}")
    private String clientSecret;

    @Value("${keycloak.admin-username}")
    private String adminUsername;

    @Value("${keycloak.admin-password}")
    private String adminPassword;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getAdminAccessToken() {
        String tokenUrl = keycloakServerUrl + "/realms/master/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("client_id", "admin-cli");
        form.add("grant_type", "password");
        form.add("username", adminUsername);
        form.add("password", adminPassword);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Failed to get admin access token from Keycloak");
        }

        return (String) response.getBody().get("access_token");
    }

    public String createUserInKeycloak(RegisterRequest request) {
        String adminToken = getAdminAccessToken();

        String userUrl = keycloakServerUrl + "/admin/realms/" + realm + "/users";

        Map<String, Object> userPayload = new HashMap<>();
        userPayload.put("username", request.getUsername());
        userPayload.put("email", request.getEmail());
        userPayload.put("enabled", true);
        userPayload.put("emailVerified", true);
        userPayload.put("firstName", request.getFirstName() == null || request.getFirstName().isBlank() ? "FirstName" : request.getFirstName());
        userPayload.put("lastName", request.getLastName() == null || request.getLastName().isBlank() ? "LastName" : request.getLastName());

        // Custom attributes
        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("mobileNumber", List.of(request.getMobileNumber()));
        if (request.getAadhaarNumber() != null)
            attributes.put("aadhaarNumber", List.of(request.getAadhaarNumber()));
        if (request.getPanNumber() != null)
            attributes.put("panNumber", List.of(request.getPanNumber()));
        userPayload.put("attributes", attributes);

        // Credentials
        Map<String, Object> credential = new HashMap<>();
        credential.put("type", "password");
        credential.put("value", request.getPassword());
        credential.put("temporary", false);
        userPayload.put("credentials", List.of(credential));

        userPayload.put("requiredActions", List.of());

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(adminToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(userPayload, headers);

        ResponseEntity<Void> response;
        try {
            response = restTemplate.exchange(userUrl, HttpMethod.POST, entity, Void.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create user in Keycloak: " + e.getMessage(), e);
        }

        if (response.getStatusCode() != HttpStatus.CREATED) {
            throw new RuntimeException("Failed to create user in Keycloak: HTTP status " + response.getStatusCode());
        }

        String location = response.getHeaders().getLocation().toString();
        return location.substring(location.lastIndexOf("/") + 1);
    }

    public String loginAndGetToken(com.example.gatewayserver.dto.LoginRequest request) {
        String tokenUrl = keycloakServerUrl + "/realms/" + realm + "/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("client_id", clientId);
        form.add("client_secret", clientSecret);
        form.add("username", request.getUsername());
        form.add("password", request.getPassword());

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(form, headers);

        ResponseEntity<Map> tokenResponse;
        try {
            tokenResponse = restTemplate.exchange(tokenUrl, HttpMethod.POST, tokenRequest, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("Login failed: " + e.getMessage(), e);
        }

        if (!tokenResponse.getStatusCode().is2xxSuccessful() || tokenResponse.getBody() == null) {
            throw new RuntimeException("Login failed with status: " + tokenResponse.getStatusCode());
        }

        return (String) tokenResponse.getBody().get("access_token");
    }

    public void updateUserInKeycloak(String keycloakId, ProfileUpdateRequest request) {
        String adminToken = getAdminAccessToken();

        String userUrl = keycloakServerUrl + "/admin/realms/" + realm + "/users/" + keycloakId;

        Map<String, Object> userPayload = new HashMap<>();
        userPayload.put("email", request.getEmail());

        Map<String, List<String>> attributes = new HashMap<>();
        attributes.put("mobileNumber", List.of(request.getMobileNumber()));
        if (request.getAadhaarNumber() != null)
            attributes.put("aadhaarNumber", List.of(request.getAadhaarNumber()));
        if (request.getPanNumber() != null)
            attributes.put("panNumber", List.of(request.getPanNumber()));

        userPayload.put("attributes", attributes);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(adminToken);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(userPayload, headers);

        try {
            restTemplate.exchange(userUrl, HttpMethod.PUT, entity, Void.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user in Keycloak: " + e.getMessage(), e);
        }
    }

    public void sendResetEmail(String email) {
        // Here you must implement Keycloak's reset password email flow
        throw new UnsupportedOperationException("Send reset email not implemented yet.");
    }
}
