package com.example.api.service;

import com.example.api.dto.OrderDTO;
import com.example.api.dto.TopCustomerDTO;
import com.example.api.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderService {
    Page<Order> findAllOrder(Pageable pageable);
    Order findOrderById(int id);
    void deleteOrderById(int id);
    Order saveNewOrder(Order order);
    Order payment(OrderDTO orderDTO, int statusOrder, int statusPayment);
    List<Order> findOrdersByCustomer(int id);
    List<Order> findOrdersByEmployee(int id);
    List<TopCustomerDTO> getTopCustomerBuyer(Pageable pageable);
}
