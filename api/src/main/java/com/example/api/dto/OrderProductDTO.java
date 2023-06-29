package com.example.api.dto;

import com.example.api.model.Product;

public class OrderProductDTO {
    private int amount;
    private Product product;

    public OrderProductDTO() {
    }

    public OrderProductDTO(int amount, Product product) {
        this.amount = amount;
        this.product = product;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
