package com.example.api.controller;

import com.example.api.service.IOrderProductService;
import com.example.api.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/admin/statistic")
public class StatisticController {
    @Autowired
    private IOrderProductService orderProductService;
    @Autowired
    private IOrderService orderService;
    @GetMapping("/top-product")
    public ResponseEntity<?> getTop10ProductSeller(@PageableDefault Pageable pageable) {
        return new ResponseEntity<>(orderProductService.getTop10ProductSeller(pageable), HttpStatus.OK);
    }
    @GetMapping("/top-customer")
    public ResponseEntity<?> getTop10CustomerBuyer(@PageableDefault Pageable pageable) {
        return new ResponseEntity<>(orderService.getTopCustomerBuyer(pageable), HttpStatus.OK);
    }
}