package com.example.api.service.impl;

import com.example.api.model.Employee;
import com.example.api.repository.IEmployeeRepository;
import com.example.api.service.IEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService{
    @Autowired
    private IEmployeeRepository employeeRepository;

    @Override
    public Employee findById(int id) {
        return employeeRepository.findById(id).get()
                ;
    }
}
