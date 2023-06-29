package com.example.api.repository;

import com.example.api.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerRepository extends JpaRepository<Customer, Integer> {
    Boolean existsCustomerByEmail(String email);
    Customer findCustomerByEmail(String email);
    Customer findCustomerByAccount_NameAccount(String nameAccount);
}
