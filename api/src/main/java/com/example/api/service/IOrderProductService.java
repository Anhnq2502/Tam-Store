package com.example.api.service;

import com.example.api.dto.TopProductDTO;
import com.example.api.model.Order;
import com.example.api.model.OrderProduct;
import com.example.api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IOrderProductService {
    void save(OrderProduct orderProduct);
    List<List<OrderProduct>> findOrderProductsByOrderId(List<Order> orders);
    void deleteOrdersByOrderId(int id);
    Page<Product> getBestSellerList(Pageable pageable);
    List<TopProductDTO> getTop10ProductSeller(Pageable pageable);
}
