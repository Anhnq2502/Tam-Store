package com.example.api.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_order")
    private int id;
    @ManyToOne
    private Customer customer;
    @ManyToOne
    private Employee employee;
    @Column(name = "total_money", columnDefinition = "decimal(12,0)")
    private BigDecimal totalMoney;
    @Column(name = "status_payment", columnDefinition = "tinyint")
    private int statusPayment;
    @Column(name = "status_order", columnDefinition = "tinyint")
    private int statusOrder;
    @Column(name = "booking_date", columnDefinition = "date")
    private LocalDate bookingDate;
    @Column(name = "delivery_address", columnDefinition = "mediumtext")
    private String deliveryAddress;

    public Order() {
    }

    public Order(int id, Customer customer, Employee employee, BigDecimal totalMoney, int statusPayment, int statusOrder, LocalDate bookingDate, String deliveryAddress) {
        this.id = id;
        this.customer = customer;
        this.employee = employee;
        this.totalMoney = totalMoney;
        this.statusPayment = statusPayment;
        this.statusOrder = statusOrder;
        this.bookingDate = bookingDate;
        this.deliveryAddress = deliveryAddress;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    public int getStatusPayment() {
        return statusPayment;
    }

    public void setStatusPayment(int statusPayment) {
        this.statusPayment = statusPayment;
    }

    public int getStatusOrder() {
        return statusOrder;
    }

    public void setStatusOrder(int statusOrder) {
        this.statusOrder = statusOrder;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
}
