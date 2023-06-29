package com.example.api.dto;

public class ConfirmPaymentVNPayDTO {
    private String statusCode;
    private int orderId;

    public ConfirmPaymentVNPayDTO() {
    }

    public ConfirmPaymentVNPayDTO(String statusCode, int orderId) {
        this.statusCode = statusCode;
        this.orderId = orderId;
    }

    public String getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(String statusCode) {
        this.statusCode = statusCode;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }
}
