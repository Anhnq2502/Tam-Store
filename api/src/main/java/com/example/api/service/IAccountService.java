package com.example.api.service;

import com.example.api.model.Account;

public interface IAccountService {
    Account findAccountByNameAccount(String name);
    Boolean existByNameAccount(String name);
    Account saveAccount(Account account);
    Account findAccountUserByEmail(String email);
    Account findById(int id);
    Boolean checkEmailExist(String email);
    Account findAccountByEmail(String email);
    Object findUserByNameAccount(String nameAccount);
}
