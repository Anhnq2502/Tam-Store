package com.example.api.service.impl;

import com.example.api.dto.TopProductDTO;
import com.example.api.model.Order;
import com.example.api.model.OrderProduct;
import com.example.api.model.Product;
import com.example.api.repository.IOrderProductRepository;
import com.example.api.service.IOrderProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderProductService implements IOrderProductService {
    @Autowired
    private IOrderProductRepository orderProductRepository;

    @Override
    public void save(OrderProduct orderProduct) {
        orderProductRepository.save(orderProduct);
    }

    @Override
    public List<List<OrderProduct>> findOrderProductsByOrderId(List<Order> orders) {
        List<List<OrderProduct>> orderProducts = new ArrayList<>();
        for (int i = 0; i < orders.size(); i++) {
            List<OrderProduct> orderProductsOfOrder = orderProductRepository.findOrderProductsByOrder_Id(orders.get(i).getId());
            orderProducts.add(orderProductsOfOrder);
        }
        return orderProducts;
    }

    @Override
    public void deleteOrdersByOrderId(int id) {
        orderProductRepository.deleteOrderProductsByOrder_Id(id);
    }

    @Override
    public Page<Product> getBestSellerList(Pageable pageable) {
        return orderProductRepository.getBestSellerList(pageable);
    }

    @Override
    public List<TopProductDTO> getTop10ProductSeller(Pageable pageable) {
        return orderProductRepository.getTop10ProductSeller(pageable);
    }
}