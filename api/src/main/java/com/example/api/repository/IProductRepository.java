package com.example.api.repository;

import com.example.api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {
    Page<Product> findProductsByNameProductContaining(String search, Pageable pageable);
    Page<Product> findProductsByNameProductContainingAndTypeProductId(String search, int typeProduct, Pageable pageable);
    Page<Product> findProductsByTypeProductId(int id, Pageable pageable);
    List<Product> findProductByNameProductContaining(String search);
}
