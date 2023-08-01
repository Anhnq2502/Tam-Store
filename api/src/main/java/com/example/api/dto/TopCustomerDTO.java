package com.example.api.dto;

import com.example.api.model.Customer;
import com.example.api.model.Employee;

import java.math.BigDecimal;

public class TopCustomerDTO {
    private Customer customer;
    private Employee employee;
    private BigDecimal totalMoney;

    public TopCustomerDTO() {
    }

    public TopCustomerDTO(Employee employee, BigDecimal totalMoney) {
        this.employee = employee;
        this.totalMoney = totalMoney;
    }
    public TopCustomerDTO(Customer customer, BigDecimal totalMoney) {
        this.customer = customer;
        this.totalMoney = totalMoney;
    }
    public TopCustomerDTO(Customer customer, Employee employee, BigDecimal totalMoney) {
        this.customer = customer;
        this.employee = employee;
        this.totalMoney = totalMoney;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }
}