package com.example.api.dto;

import com.example.api.model.Product;

public class TopProductDTO {
    private Product product;
    private Long amount;

    public TopProductDTO() {
    }

    public TopProductDTO(Product product, Long amount) {
        this.product = product;
        this.amount = amount;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}