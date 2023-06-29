package com.example.api.service;

import javax.mail.MessagingException;

public interface IEmailSenderService {
    int sendCodeToConfirmEmail(String email) throws MessagingException;
}
