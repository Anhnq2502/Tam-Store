package com.example.api.model;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private int idProduct;
    @Column(name = "name_product", columnDefinition = "varchar(255)")
    private String nameProduct;
    @Column(name = "pre_cost", columnDefinition = "decimal(12, 0)")
    private BigDecimal prevCost;
    @Column(name = "curr_cost", columnDefinition = "decimal(12, 0)")
    private BigDecimal currCost;
    @Column(name = "product_img")
    private String productImg;
    @Column(name = "amount_availble")
    private int amountAvailble;
    @Column(name = "label_product", columnDefinition = "varchar(255)")
    private String labelProduct;
    @Column(name = "desc_product", columnDefinition = "mediumtext")
    private String descProduct;
    @ManyToOne
    private TypeProduct typeProduct;
    @ManyToOne
    @JoinColumn(name = "manufacturer_id")
    private Manufacturer manufacturer;



    public Product() {
    }

    public Product(int idProduct, String nameProduct, BigDecimal prevCost, BigDecimal currCost, String productImg, int amountAvailble, String labelProduct, String descProduct, TypeProduct typeProduct, Manufacturer manufacturer) {
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.prevCost = prevCost;
        this.currCost = currCost;
        this.productImg = productImg;
        this.amountAvailble = amountAvailble;
        this.labelProduct = labelProduct;
        this.descProduct = descProduct;
        this.typeProduct = typeProduct;
        this.manufacturer = manufacturer;
    }

    public int getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(int idProduct) {
        this.idProduct = idProduct;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public BigDecimal getPrevCost() {
        return prevCost;
    }

    public void setPrevCost(BigDecimal prevCost) {
        this.prevCost = prevCost;
    }

    public BigDecimal getCurrCost() {
        return currCost;
    }

    public void setCurrCost(BigDecimal currCost) {
        this.currCost = currCost;
    }

    public String getProductImg() {
        return productImg;
    }

    public void setProductImg(String productImg) {
        this.productImg = productImg;
    }

    public int getAmountAvailble() {
        return amountAvailble;
    }

    public void setAmountAvailble(int amountAvailble) {
        this.amountAvailble = amountAvailble;
    }

    public String getLabelProduct() {
        return labelProduct;
    }

    public void setLabelProduct(String labelProduct) {
        this.labelProduct = labelProduct;
    }

    public String getDescProduct() {
        return descProduct;
    }

    public void setDescProduct(String descProduct) {
        this.descProduct = descProduct;
    }

    public TypeProduct getTypeProduct() {
        return typeProduct;
    }

    public void setTypeProduct(TypeProduct typeProduct) {
        this.typeProduct = typeProduct;
    }

    public Manufacturer getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }
}
