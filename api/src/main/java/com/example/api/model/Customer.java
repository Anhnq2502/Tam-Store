package com.example.api.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_customer")
    private int id;
    @Column(name = "name_customer", columnDefinition = "varchar(255)")
    private String nameCustomer;
    @Column(name = "identity_card", columnDefinition = "varchar(45)")
    private String identityCard;
    @Column(name = "email", columnDefinition = "varchar(255)")
    private String email;
    @Column(name = "phone_number", columnDefinition = "varchar(20)")
    private String phoneNumber;
    @Column(name = "address", columnDefinition = "varchar(255)")
    private String address;
    @Column(name = "path_img", columnDefinition = "text")
    private String pathImg;
    @Column(name = "gender", columnDefinition = "tinyint")
    private int gender;
    @Column(name = "date_of_birth", columnDefinition = "date")
    private LocalDate dateOfBirth;
    @OneToOne
    private Account account;

    public Customer() {
    }

    public Customer(int id, String nameCustomer, String identityCard, String email, String phoneNumber, String address, String pathImg, int gender, LocalDate dateOfBirth, Account account) {
        this.id = id;
        this.nameCustomer = nameCustomer;
        this.identityCard = identityCard;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.pathImg = pathImg;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.account = account;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public String getIdentityCard() {
        return identityCard;
    }

    public void setIdentityCard(String identityCard) {
        this.identityCard = identityCard;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPathImg() {
        return pathImg;
    }

    public void setPathImg(String pathImg) {
        this.pathImg = pathImg;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
