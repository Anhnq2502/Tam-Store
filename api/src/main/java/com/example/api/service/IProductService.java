package com.example.api.service;

import com.example.api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    Page<Product> findAll(String search, Pageable pageable);
    Page<Product> findAllByTypeProduct(String search,int typeProduct, Pageable pageable);
    Product findById(int id);
    Page<Product> findProductsByTypeProduct(int id, Pageable pageable);
    List<Product> findProduct(String search);
    void save (Product product);
}
