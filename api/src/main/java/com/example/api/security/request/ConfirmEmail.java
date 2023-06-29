package com.example.api.security.request;

public class ConfirmEmail {
    private String email;

    public ConfirmEmail() {
    }

    public ConfirmEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
