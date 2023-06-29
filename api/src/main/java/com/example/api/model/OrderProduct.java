package com.example.api.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders_product")
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    private Product product;
    @ManyToOne
    private Order order;
    private int amountProduct;
    public OrderProduct() {
    }

    public OrderProduct(Product product, Order order, int amountProduct) {
        this.product = product;
        this.order = order;
        this.amountProduct = amountProduct;
    }

    public OrderProduct(int id, Product product, Order order, int amountProduct) {
        this.id = id;
        this.product = product;
        this.order = order;
        this.amountProduct = amountProduct;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public int getAmountProduct() {
        return amountProduct;
    }

    public void setAmountProduct(int amountProduct) {
        this.amountProduct = amountProduct;
    }


}
