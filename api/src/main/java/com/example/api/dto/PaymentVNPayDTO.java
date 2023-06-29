package com.example.api.dto;

public class PaymentVNPayDTO {
    private String status;
    private String message;
    private String UrlForward;
    private OrderDTO orderDTO;

    public PaymentVNPayDTO() {
    }

    public PaymentVNPayDTO(String status, String message, String urlForward) {
        this.status = status;
        this.message = message;
        UrlForward = urlForward;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUrlForward() {
        return UrlForward;
    }

    public void setUrlForward(String urlForward) {
        UrlForward = urlForward;
    }
}
