package com.example.api.controller;

import com.example.api.model.Product;
import com.example.api.service.IOrderProductService;
import com.example.api.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/public/product")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IOrderProductService iOrderProductService;

    @GetMapping("/list")
    public ResponseEntity<?> getAllProduct(@PageableDefault(size = 12) Pageable pageable, @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(value = "sort", defaultValue = "idProduct") String sort,
                                           @RequestParam(defaultValue = "") String search, @RequestParam(defaultValue = "-1") int typeProduct) {

        if (typeProduct == 0) {
            return new ResponseEntity<>(iOrderProductService.getBestSellerList(pageable), HttpStatus.OK);
        }
        if (typeProduct == -1) {
            pageable = PageRequest.of(page, 12, Sort.by(sort).descending());
            return new ResponseEntity<>(iProductService.findAll(search, pageable), HttpStatus.OK);
        } else {
            pageable = PageRequest.of(page, 12, Sort.by(sort).descending());
            return new ResponseEntity<>(iProductService.findAllByTypeProduct(search, typeProduct, pageable), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id) {
        return new ResponseEntity<>(iProductService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/type-product/{id}")
    public ResponseEntity<?> getProductsByTypeProduct(@PageableDefault Pageable pageable, @PathVariable int id) {
        pageable = PageRequest.of(0, 4, Sort.by("nameProduct"));
        Page<Product> products = iProductService.findProductsByTypeProduct(id, pageable);
        if (products.hasContent()) {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/find-product/{search}")
    public ResponseEntity<?> findProductByName(@PathVariable String search){
        List<Product> products = iProductService.findProduct(search);
        if (products.isEmpty()){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(products, HttpStatus.OK);
        }
    }
}
