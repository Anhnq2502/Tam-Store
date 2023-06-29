package com.example.api.dto;

public class PaypalRedirectDTO {
    private String link;

    public PaypalRedirectDTO() {
    }

    public PaypalRedirectDTO(String link) {
        this.link = link;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
