package com.example.api.service;

import com.example.api.model.Order;
import com.example.api.model.OrderProduct;
import com.example.api.model.Product;

import java.util.List;

public interface IOrderProductService {
    void save(OrderProduct orderProduct);
    List<List<OrderProduct>> findOrderProductsByOrderId(List<Order> orders);
}
