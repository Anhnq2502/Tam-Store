package com.example.api.service.impl;

import com.example.api.model.Role;
import com.example.api.repository.IRoleRepository;
import com.example.api.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepository roleRepository;
    @Override
    public Role findRoleByNameRole(String nameRole) {
        return roleRepository.findRoleByNameRole(nameRole);
    }
}
