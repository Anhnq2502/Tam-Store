package com.example.api.dto;

import com.example.api.enums.StatusMessage;

public class MessageDTO {
    private String senderName;
    private String receiverName;
    private String message;
    private String date;
    private StatusMessage statusMessage;

    public MessageDTO() {
    }

    public MessageDTO(String senderName, String receiverName, String message, String date, StatusMessage statusMessage) {
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.message = message;
        this.date = date;
        this.statusMessage = statusMessage;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public StatusMessage getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(StatusMessage statusMessage) {
        this.statusMessage = statusMessage;
    }
}