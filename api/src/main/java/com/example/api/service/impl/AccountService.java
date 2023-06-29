package com.example.api.service.impl;

import com.example.api.model.Account;
import com.example.api.repository.IAccountRepository;
import com.example.api.repository.ICustomerRepository;
import com.example.api.repository.IEmployeeRepository;
import com.example.api.service.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements IAccountService {
    @Autowired
    private IAccountRepository accountRepository;
    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private IEmployeeRepository employeeRepository;

    @Override
    public Account findAccountByNameAccount(String name) {
        return accountRepository.findAccountByNameAccount(name);
    }

    @Override
    public Boolean existByNameAccount(String name) {
        return accountRepository.existsAccountByNameAccount(name);
    }

    @Override
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account findAccountUserByEmail(String email) {
        return null;
    }

    @Override
    public Account findById(int id) {
        return accountRepository.findById(id).get();
    }

    @Override
    public Boolean checkEmailExist(String email) {
        if (customerRepository.existsCustomerByEmail(email) || employeeRepository.existsEmployeeByEmail(email))
            return true;
        return false;
    }

    @Override
    public Account findAccountByEmail(String email) {
        Account account = null;
        try {
            account = employeeRepository.findEmployeeByEmail(email).getAccount();
            if (account == null) {
                account = customerRepository.findCustomerByEmail(email).getAccount();
            }
        } catch (NullPointerException e) {
            System.out.println(e);
        } finally {
            return account;
        }
    }

    @Override
    public Object findUserByNameAccount(String nameAccount) {
        Object user = null;
        try {
            user = employeeRepository.findEmployeeByAccount_NameAccount(nameAccount);
            if (user == null) {
                user = customerRepository.findCustomerByAccount_NameAccount(nameAccount);
            }
        } catch (NullPointerException e) {
        } finally {
            return user;
        }
    }
}
