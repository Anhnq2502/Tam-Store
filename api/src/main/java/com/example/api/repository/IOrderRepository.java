package com.example.api.repository;

import com.example.api.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IOrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findOrdersByCustomer_Id(int id);
    List<Order> findOrdersByEmployee_Id(int id);
}
