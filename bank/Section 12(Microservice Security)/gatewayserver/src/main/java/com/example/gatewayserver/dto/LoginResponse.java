package com.example.gatewayserver.dto;

/**
 * Response returned after successful login.
 */
public class LoginResponse {
    private String token;
    private String mobileNumber;
    private String firstName;
    private String email;
    private String role;

    public LoginResponse() {
    }

    public LoginResponse(String token, String mobileNumber, String firstName, String email, String role) {
        this.token = token;
        this.mobileNumber = mobileNumber;
        this.firstName = firstName;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
