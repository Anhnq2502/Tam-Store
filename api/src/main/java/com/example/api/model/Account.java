package com.example.api.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "account", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name_account"})
})
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_account")
    private int id;
    @Column(name = "name_account", columnDefinition = "varchar(255)")
    private String nameAccount;
    @Column(name = "password", columnDefinition = "mediumtext")
    private String passwordAccount;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "roles_account", joinColumns = @JoinColumn(name = "id_account"),
            inverseJoinColumns = @JoinColumn(name = "id_roles"))
    Set<Role> roles = new HashSet<>();

    public Account() {
    }

    public Account(int id, String nameAccount, String passwordAccount, Set<Role> roles) {
        this.id = id;
        this.nameAccount = nameAccount;
        this.passwordAccount = passwordAccount;
        this.roles = roles;
    }

    public Account(String nameAccount, String passwordAccount) {
        this.nameAccount = nameAccount;
        this.passwordAccount = passwordAccount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameAccount() {
        return nameAccount;
    }

    public void setNameAccount(String nameAccount) {
        this.nameAccount = nameAccount;
    }

    public String getPasswordAccount() {
        return passwordAccount;
    }

    public void setPasswordAccount(String passwordAccount) {
        this.passwordAccount = passwordAccount;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
