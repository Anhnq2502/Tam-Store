package com.example.api.service;

import com.example.api.model.Customer;

import java.util.List;

public interface ICustomerService {
    Customer findById(int id);
    Customer findCustomerByEmail(String email);
}
