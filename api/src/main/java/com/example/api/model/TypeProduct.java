package com.example.api.model;

import javax.persistence.*;

@Entity
@Table(name = "type_product")
public class TypeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_type_product")
    private int id;
    @Column(name = "name_type_product", columnDefinition = "varchar(255)")
    private String nameTypeProduct;

    public TypeProduct() {
    }

    public TypeProduct(int id, String nameTypeProduct) {
        this.id = id;
        this.nameTypeProduct = nameTypeProduct;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameTypeProduct() {
        return nameTypeProduct;
    }

    public void setNameTypeProduct(String nameTypeProduct) {
        this.nameTypeProduct = nameTypeProduct;
    }
}
