package com.example.api.dto;


import java.math.BigDecimal;
import java.util.List;

public class OrderDTO {
    private Object user;
    private List<OrderProductDTO> listProduct;
    private BigDecimal totalMoney;
    private String addressTakeOrder;

    public OrderDTO() {
    }

    public OrderDTO(Object user, List<OrderProductDTO> listProduct, BigDecimal totalMoney, String addressTakeOrder) {
        this.user = user;
        this.listProduct = listProduct;
        this.totalMoney = totalMoney;
        this.addressTakeOrder = addressTakeOrder;
    }

    public Object getUser() {
        return user;
    }

    public void setUser(Object user) {
        this.user = user;
    }

    public List<OrderProductDTO> getListProduct() {
        return listProduct;
    }

    public void setListProduct(List<OrderProductDTO> listProduct) {
        this.listProduct = listProduct;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    public String getAddressTakeOrder() {
        return addressTakeOrder;
    }

    public void setAddressTakeOrder(String addressTakeOrder) {
        this.addressTakeOrder = addressTakeOrder;
    }
}
