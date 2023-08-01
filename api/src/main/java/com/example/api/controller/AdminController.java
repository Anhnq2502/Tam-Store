package com.example.api.controller;

import com.example.api.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class AdminController {
    @Autowired
    private IProductService iProductService;

    @GetMapping("/public/product/list-product")
    public ResponseEntity<?> getAllProduct(@PageableDefault(size = 12) Pageable pageable, @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(value = "sort", defaultValue = "idProduct") String sort,
                                           @RequestParam(defaultValue = "") String search, @RequestParam(defaultValue = "-1") int typeProduct) {
        if (typeProduct == -1) {
            pageable = PageRequest.of(page, 12, Sort.by(sort).descending());
            return new ResponseEntity<>(iProductService.findAll(search, pageable), HttpStatus.OK);
        } else {
            pageable = PageRequest.of(page, 12, Sort.by(sort).descending());
            return new ResponseEntity<>(iProductService.findAllByTypeProduct(search, typeProduct, pageable), HttpStatus.OK);
        }
    }

}
